'use client';

import type { FC } from 'react';

import type { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';

import { WorkflowStatus } from '@/types/workflow';

import { Topbar } from '@/components/blocks';

import FlowEditor from './flow-editor';
import TaskMenu from './task-menu';

type Props = { workflow: Workflow };

const Editor: FC<Props> = ({ workflow }) => {
  return (
    <ReactFlowProvider>
      <Topbar
        isPublished={workflow.status === WorkflowStatus.PUBLISHED}
        subtitle={workflow.name}
        title="Workflow Editor"
        workflowId={workflow.id}
      />

      <div className="flex h-full w-full flex-col overflow-hidden">
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
