'use client';

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  nodeId: string;
};

const NodeCard: FC<Props> = ({ children, nodeId }) => {
  return <div>{children}</div>;
};

export default NodeCard;
