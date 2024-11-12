'use client';

import { type FC, useEffect } from 'react';

import type { Workflow } from '@prisma/client';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';

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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setViewport } = useReactFlow();

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

  return (
    <div className="h-full w-full">
      <ReactFlow
        edges={edges}
        fitViewOptions={fitViewOptions}
        nodeTypes={NodeTypes}
        nodes={nodes}
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
