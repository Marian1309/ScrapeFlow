'use client';

import type { DragEvent } from 'react';
import { type FC, useCallback, useEffect } from 'react';

import type { Workflow } from '@prisma/client';
import type { Connection, Edge } from '@xyflow/react';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';

import type { AppNode } from '@/types/app-node';
import type { TaskType } from '@/types/task';

import createFlowNode from '@/lib/workflow/create-flow-node';

import NodeComponent from './nodes/node-component';

const NodeTypes = {
  FlowScrapeNode: NodeComponent
};

const snapGrid: [number, number] = [25, 25];
const fitViewOptions = { padding: 1 };

type Props = {
  workflow: Workflow;
};

const FlowEditor: FC<Props> = ({ workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;

      const { x = 0, y = 0, zoom = 1 } = flow.viewport;

      setViewport({ x, y, zoom });
    } catch (error: unknown) {
      toast.error('Something went wrong');
    }
  }, [setEdges, setNodes, setViewport, workflow.definition]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData('application/reactflow');

      if (typeof taskType === 'undefined' || !taskType) return;

      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      });

      const newDone = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newDone));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        edges={edges}
        fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={NodeTypes}
        nodes={nodes}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        snapGrid={snapGrid}
        snapToGrid
      >
        <Controls fitViewOptions={fitViewOptions} position="top-left" />
        <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
