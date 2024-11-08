import type { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const UserWorkflowsSkeleton: FC = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton className="h-32 w-full" key={i} />
      ))}
    </div>
  );
};

export default UserWorkflowsSkeleton;
