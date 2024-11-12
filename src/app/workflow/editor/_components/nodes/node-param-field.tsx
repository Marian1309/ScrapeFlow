'use client';

import type { FC } from 'react';
import { useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';

import type { AppNode } from '@/types/app-node';
import type { TaskParam } from '@/types/task';
import { TaskParamType } from '@/types/task';

import BrowserInstanceParam from './param/browser-instance-param';
import StringParam from './param/string-param';

type Props = {
  nodeId: string;
  param: TaskParam;
};

const NodeParamField: FC<Props> = ({ nodeId, param }) => {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as AppNode;

  const value = node?.data?.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue
        }
      });
    },
    [node.data.inputs, nodeId, param.name, updateNodeData]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam onChange={updateNodeParamValue} param={param} value={value} />;
    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
