'use client';

import type { FC } from 'react';
import { useId, useState } from 'react';

import type { TaskParam } from '@/types/task';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  param: TaskParam;
  value: string;
  onChange: (newValue: string) => void;
};

const StringParam: FC<Props> = ({ param, value, onChange }) => {
  const [internalValue, setInternalValue] = useState<string>(value);

  const id = useId();

  return (
    <div className="w-full space-y-1 p-1">
      <Label className="flex text-xs" htmlFor={id}>
        {param.name}
        {param.required && <span className="text-red-400">*</span>}
      </Label>

      <Input
        className="text-xs"
        id={id}
        onBlur={(e) => onChange(e.target.value)}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder="Enter value"
        value={internalValue}
      />
      {param.helperText && (
        <p className="px-2 text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
