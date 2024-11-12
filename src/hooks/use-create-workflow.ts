import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createWorkflow } from '@/actions/workflows';

import type { CreateWorkflowSchema } from '@/schema/workflow';
import { createWorkflowSchema } from '@/schema/workflow';

const useCreateWorkflow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<CreateWorkflowSchema>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {}
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success('Workflow created successfully', { id: 'create-workflow' });
    },
    onError: () => {
      toast.error('Failed to create workflow', { id: 'create-workflow' });
    }
  });

  const handleToggleDialog = () => {
    form.reset();
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = useCallback(
    (values: CreateWorkflowSchema) => {
      toast.loading('Creating workflow...', { id: 'create-workflow' });
      mutate(values);
    },
    [mutate]
  );

  return {
    isOpen,
    form,
    isPending,
    handleSubmit,
    handleToggleDialog
  };
};

export default useCreateWorkflow;
