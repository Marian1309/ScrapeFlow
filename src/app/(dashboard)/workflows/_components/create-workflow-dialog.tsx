'use client';

import type { FC } from 'react';

import { Layers2Icon, Loader2 } from 'lucide-react';

import useCreateWorkflow from '@/hooks/use-create-workflow';

import { Button } from '@/components/ui/button';
import { CustomDialogHeader } from '@/components/ui/custom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = { triggerText?: string };

const CreateWorkflowDialog: FC<Props> = ({ triggerText }) => {
  const { isOpen, form, isPending, handleSubmit, handleToggleDialog } =
    useCreateWorkflow();

  return (
    <Dialog onOpenChange={handleToggleDialog} open={isOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          subtitle="Start building your workflow."
          title="Create workflow"
        />

        <div className="p-6">
          <Form {...form}>
            <form className="w-full space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1 flex-between">
                      <p>Name</p>

                      <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1 flex-between">
                      <p>Description</p>

                      <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>

                    <FormDescription>
                      Provide a brief description of what your workflow does. <br /> This
                      is optional but can help you remember the workflow&apos;s purpose.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={isPending} type="submit">
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
