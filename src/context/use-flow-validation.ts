import { create } from 'zustand';

import type { AppNodeMissingInputs } from '@/types/app-node';

type FlowValidationState = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: (inputs: AppNodeMissingInputs[]) => void;
  clearErrors: () => void;
};

const useFlowValidation = create<FlowValidationState>((set) => ({
  invalidInputs: [],
  setInvalidInputs: (inputs) => set({ invalidInputs: inputs }),
  clearErrors: () => set({ invalidInputs: [] })
}));

export default useFlowValidation;
