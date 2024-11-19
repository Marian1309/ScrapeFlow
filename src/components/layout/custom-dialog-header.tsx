'use client';

import type { FC } from 'react';

import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';

type Props = {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const CustomDialogHeader: FC<Props> = ({
  title,
  subtitle,
  icon,
  iconClassName,
  titleClassName,
  subtitleClassName
}) => {
  const Icon = icon;

  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="mb-2 flex flex-col items-center gap-2">
          {Icon && <Icon className={cn('stroke-primary', iconClassName)} size={30} />}

          {title && <p className={cn('text-xl text-primary', titleClassName)}>{title}</p>}

          {subtitle && (
            <p className={cn('text-sm text-muted-foreground', subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      </DialogTitle>

      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
