import puppeteer from 'puppeteer';

import type { ExecutionEnvironment } from '@/types/executor';

import waitFor from '@/lib/helper/wait-for';

import type launchBrowserTask from '../task/launch-browser';

const launchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof launchBrowserTask>
) => {
  try {
    const websiteUrl = environment.getInput('Website URL');
    console.log({ websiteUrl });
    const browser = await puppeteer.launch({
      headless: false
    });

    await waitFor(3000);

    await browser.close();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default launchBrowserExecutor;
