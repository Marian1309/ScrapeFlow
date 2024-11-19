'use client';

import type { FC } from 'react';

import { UploadIcon } from 'lucide-react';

import usePublish from '@/hooks/use-publish';

import { Button } from '@/components/ui/button';

type Props = {
  workflowId: string;
};

const PublishBtn: FC<Props> = ({ workflowId }) => {
  const { handleClick, isPending } = usePublish({ workflowId });

  return (
    <Button
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={handleClick}
      variant="outline"
    >
      <UploadIcon className="stroke-green-600" />
      Publish
    </Button>
  );
};

export default PublishBtn;
