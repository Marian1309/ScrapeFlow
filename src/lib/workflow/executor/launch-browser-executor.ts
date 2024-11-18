import puppeteer from 'puppeteer';

import type { ExecutionEnvironment } from '@/types/executor';

import type launchBrowserTask from '../task/launch-browser';

const launchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof launchBrowserTask>
) => {
  try {
    const websiteUrl = environment.getInput('Website URL');

    const browser = await puppeteer.launch();

    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);

    environment.setPage(page);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};

export default launchBrowserExecutor;
