'use client';

import { type FC, useId } from 'react';

import type { TaskParam } from '@/types/task';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  param: TaskParam;
};

const StringParam: FC<Props> = ({ param }) => {
  const id = useId();

  return (
    <div className="w-full space-y-1 p-1">
      <Label className="flex text-xs" htmlFor={id}>
        {param.name}
        {param.required && <span className="text-red-400">*</span>}
      </Label>

      <Input id={id} />
      {param.helperText && (
        <p className="px-2 text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
