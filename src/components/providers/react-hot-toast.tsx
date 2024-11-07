import type { FC, PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

type Props = PropsWithChildren;

const ReactHotToastProvider: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ReactHotToastProvider;
