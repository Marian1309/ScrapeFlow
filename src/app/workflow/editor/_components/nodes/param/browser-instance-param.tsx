'use client';

import type { FC } from 'react';

import type { TaskParam } from '@/types/task';

type Props = { param: TaskParam };

const BrowserInstanceParam: FC<Props> = ({ param }) => {
  return <p className="text-xs">{param.name}</p>;
};

export default BrowserInstanceParam;
