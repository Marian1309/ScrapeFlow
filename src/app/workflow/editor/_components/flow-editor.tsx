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

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // Prevent self-connections
      if (connection.source === connection.target) {
        return false;
      }

      // Find source and target nodes
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) {
        return false;
      }

      // Check if the connection already exists
      const connectionExists = edges.some(
        (edge) =>
          edge.source === connection.source &&
          edge.target === connection.target &&
          edge.sourceHandle === connection.sourceHandle &&
          edge.targetHandle === connection.targetHandle
      );

      if (connectionExists) {
        return false;
      }

      // Prevent connections between incompatible types
      const isExtractTextNode = targetNode.type === 'ExtractTextNode';
      const isLaunchBrowserNode = sourceNode.type === 'LaunchBrowserNode';

      if (isExtractTextNode && isLaunchBrowserNode) {
        // If the target is Extract Text node and specifically its HTML input
        if (connection.targetHandle === 'html') {
          return false;
        }
      }

      // Check if the target node already has an input for this handle
      if (connection.targetHandle) {
        const existingInput = edges.find(
          (edge) =>
            edge.target === connection.target &&
            edge.targetHandle === connection.targetHandle
        );
        if (existingInput) {
          return false;
        }
      }

      // Check for circular dependencies
      const wouldCreateCycle = (
        source: string,
        target: string,
        visited = new Set<string>()
      ): boolean => {
        if (source === target) return true;
        if (visited.has(source)) return false;

        visited.add(source);

        const outgoers = getOutgoers({ id: source }, nodes, edges);
        return outgoers.some((outgoer) =>
          wouldCreateCycle(outgoer.id, target, new Set(visited))
        );
      };

      if (wouldCreateCycle(connection.target, connection.source)) {
        return false;
      }

      return true;
    },
    [nodes, edges]
  );

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
