export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER'
}

export enum TaskParamType {
  STRING = 'STRING'
}

export type TaskParam = {
  name: string;
  type: TaskParamType;
  required?: boolean;
  helperText?: string;
  hideHandle?: boolean;
  value?: string;

  [key: string]: any;
};
