'use client';

import type { FC } from 'react';

import type { TaskParam } from '@/types/task';
import { TaskParamType } from '@/types/task';

import StringParam from './param/string-param';

type Props = {
  param: TaskParam;
};

const NodeParamField: FC<Props> = ({ param }) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
