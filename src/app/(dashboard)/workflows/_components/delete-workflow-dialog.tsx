'use client';

import type { FC } from 'react';

import useDeleteWorkflow from '@/hooks/use-delete-workflow';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  workflowName: string;
  workflowId: string;
};

const DeleteWorkflowDialog: FC<Props> = ({
  isOpen,
  setIsOpen,
  workflowName,
  workflowId
}) => {
  const { handleWorkflowDelete, textConfirm, setTextConfirm, deleteMutation } =
    useDeleteWorkflow({ workflowId });

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutelu sure?</AlertDialogTitle>

          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover it.
            <div className="flex flex-col gap-2 py-4">
              <p>
                If you are sure, enter <b className="text-black">`{workflowName}`</b> to
                confirm.
              </p>

              <Input
                onChange={(e) => setTextConfirm(e.target.value)}
                onKeyDown={(e) => {
                  if ((textConfirm === workflowName && e.key) === 'Enter') {
                    handleWorkflowDelete(e);
                  }
                }}
                value={textConfirm}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setTextConfirm('')}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={textConfirm !== workflowName || deleteMutation.isPending}
            onClick={handleWorkflowDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
