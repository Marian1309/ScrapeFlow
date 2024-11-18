import type { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ParameterViewer: FC<{ paramsJSON: string; subTitle: string; title: string }> = ({
  paramsJSON,
  subTitle,
  title
}) => {
  const params = JSON.parse(paramsJSON);

  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {subTitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className="text-sm">No parameters generated by this phase</p>
          )}

          {params &&
            Object.entries(params).map(([key, value]) => (
              <div className="flex-between space-y-1" key={key}>
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">{key}</p>
                <Input className="flex-1 basis-2/3" readOnly value={`${value}`} />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParameterViewer;
