'use client';

import type { DragEvent } from 'react';
import { type FC, useCallback, useEffect } from 'react';

import type { Workflow } from '@prisma/client';
import type { Connection, Edge, Node } from '@xyflow/react';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  addEdge,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';

import type { AppNode } from '@/types/app-node';
import type { TaskType } from '@/types/task';

import createFlowNode from '@/lib/workflow/create-flow-node';
import { TaskRegistry } from '@/lib/workflow/task/registry';

import DeletableEdge from './edges/deletable-edge';
import NodeComponent from './nodes/node-component';

const nodeTypes = {
  FlowScrapeNode: NodeComponent
};
const edgeTypes = {
  default: DeletableEdge
};

const snapGrid: [number, number] = [25, 25];
const fitViewOptions = { padding: 1 };

type Props = {
  workflow: Workflow;
};

const FlowEditor: FC<Props> = ({ workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

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

      if (!connection.targetHandle) return;

      const node = nodes.find((ns) => ns.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs as Record<string, string>;

      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: ''
        }
      });
    },
    [nodes, setEdges, updateNodeData]
  );

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // Prevent self-connections
    if (connection.source == connection.target) {
      return false;
    }

    // Same taskParam type connection
    const source = nodes.find((ns) => ns.id === connection.source);
    const target = nodes.find((ns) => ns.id === connection.target);

    if (!source || !target) {
      console.log('Invalid connection: source or target node not found');
      return false;
    }

    const sourceTask = TaskRegistry[source.data.type];
    const targetTask = TaskRegistry[target.data.type];

    const output = sourceTask.outputs.find((op) => op.name === connection.sourceHandle);
    const input = targetTask.inputs.find((ip) => ip.name === connection.targetHandle);

    if (input?.type !== output?.type) {
      console.log('Invalid connection: type mismatch');
      return false;
    }

    const hasCycle = (node: Node, visited = new Set()) => {
      if (visited.has(node.id)) {
        return false;
      }

      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) {
          return true;
        }

        if (hasCycle(outgoer, visited)) {
          return true;
        }
      }

      return false;
    };

    const detectedCycle = hasCycle(target);

    if (detectedCycle) {
      console.log('Invalid connection: cycle detected');
      return false;
    }

    return true;
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        edgeTypes={edgeTypes}
        edges={edges}
        fitView
        fitViewOptions={fitViewOptions}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
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
