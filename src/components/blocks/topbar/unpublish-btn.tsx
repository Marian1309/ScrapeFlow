'use client';

import type { FC } from 'react';

import { DownloadIcon } from 'lucide-react';

import useUnpublish from '@/hooks/use-unpublish';

import { Button } from '@/components/ui/button';

type Props = {
  workflowId: string;
};

const UnpublishBtn: FC<Props> = ({ workflowId }) => {
  const { handleClick, isPending } = useUnpublish({ workflowId });

  return (
    <Button
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={handleClick}
      variant="outline"
    >
      <DownloadIcon className="stroke-orange-500-600" />
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;
