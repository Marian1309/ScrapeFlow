'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import CountUp from 'react-countup';

type Props = {
  value: number;
};

const ReactCountupWrapper: FC<Props> = ({ value }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return '-';
  }

  return <CountUp duration={0.5} end={value} />;
};

export default ReactCountupWrapper;
