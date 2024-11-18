import type { FC, ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
};

const ExecutionLabel: FC<Props> = ({ label, value, icon }) => {
  const Icon = icon;
  return (
    <div className="flex-between py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon className="stroke-muted-foreground/80" size={20} />
        <span>{label}</span>
      </div>

      <div className="font-semibold capitalize flex gap-2 items-center">{value}</div>
    </div>
  );
};

export default ExecutionLabel;
