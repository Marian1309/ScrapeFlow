import type { Registry } from '@/types/registry';

import extractTextFromElementTask from './extract-text-from-element';
import launchBrowserTask from './launch-browser';
import pageToHtmlTask from './page-to-html';

export const TaskRegistry = {
  LAUNCH_BROWSER: launchBrowserTask,
  PAGE_TO_HTML: pageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: extractTextFromElementTask
} satisfies Registry;
