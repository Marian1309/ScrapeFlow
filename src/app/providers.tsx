import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const Providers: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default Providers;
