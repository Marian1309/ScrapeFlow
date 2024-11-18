'use client';

import type { FC } from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
  useReactFlow
} from '@xyflow/react';

import { Button } from '@/components/ui/button';

const DeletableEdge: FC<EdgeProps> = (props) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  const { setEdges } = useReactFlow();

  const handleEdgeDelete = () => {
    setEdges((eds) => eds.filter((e) => e.id !== props.id));
  };

  return (
    <>
      <BaseEdge markerEnd={props.markerEnd} path={edgePath} style={props.style} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all'
          }}
        >
          <Button
            className="h-5 w-5 cursor-pointer rounded-full border text-xs leading-none hover:shadow-lg"
            onClick={handleEdgeDelete}
            size="icon"
            variant="outline"
          >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
