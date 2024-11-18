import { useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

import type { AppNode } from '@/types/app-node';

import flowToExecutionPlan, {
  FlowToExecutionPlanValidationError
} from '@/lib/workflow/execution-plan';

import useFlowValidation from '@/context/use-flow-validation';

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('No entry point found');
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error('Not all inputs values are set');
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error('Unknown error');
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan, error } = flowToExecutionPlan(nodes as AppNode[], edges);

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [toObject, clearErrors, handleError]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
