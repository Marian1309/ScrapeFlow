'use client';

import type { FC } from 'react';

import type { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';

import FlowEditor from './flow-editor';
import Topbar from './topbar/topbar';

type Props = {
  workflow: Workflow;
};

const Editor: FC<Props> = ({ workflow }) => {
  return (
    <ReactFlowProvider>
      <Topbar subtitle={workflow.name} title="Workflow Editor" workflowId={workflow.id} />

      <div className="flex h-full w-full flex-col overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
