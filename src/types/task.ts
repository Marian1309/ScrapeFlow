export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT'
}

export enum TaskParamType {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE'
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
