'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { Layers2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CustomDialogHeader } from '@/components/ui/custom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type Props = {
  triggerText?: string;
};

const CreateWorkflowDialog: FC<Props> = ({ triggerText }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          subtitle="Start building your workflow."
          title="Create workflow"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
