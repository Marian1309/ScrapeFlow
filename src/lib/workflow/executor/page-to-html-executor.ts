import type { ExecutionEnvironment } from '@/types/executor';

import type pageToHtmlTask from '../task/page-to-html';

const pageToHTMLExecutor = async (
  environment: ExecutionEnvironment<typeof pageToHtmlTask>
) => {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('HTML', html);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default pageToHTMLExecutor;
