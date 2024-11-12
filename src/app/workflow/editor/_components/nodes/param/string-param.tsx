'use client';

import type { FC } from 'react';
import { useEffect, useId, useState } from 'react';

import type { TaskParam } from '@/types/task';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  param: TaskParam;
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
};

const StringParam: FC<Props> = ({ param, value, onChange, disabled }) => {
  const [internalValue, setInternalValue] = useState<string>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const id = useId();

  const Component = param.variant === 'textarea' ? Textarea : Input;

  return (
    <div className="w-full space-y-1 p-1">
      <Label className="flex text-xs" htmlFor={id}>
        {param.name}
        {param.required && <span className="text-red-400">*</span>}
      </Label>

      <Component
        className="text-xs"
        disabled={disabled}
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
