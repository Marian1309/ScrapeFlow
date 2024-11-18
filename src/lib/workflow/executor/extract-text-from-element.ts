import * as cheerio from 'cheerio';

import type { ExecutionEnvironment } from '@/types/executor';

import type extractTextFromElementTask from '../task/extract-text-from-element';

const extractTextFromElementExecutor = async (
  environment: ExecutionEnvironment<typeof extractTextFromElementTask>
) => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('No selector provided');
      return false;
    }

    const html = environment.getInput('HTML');
    if (!html) {
      environment.log.error('No HTML provided');
      return false;
    }

    const $ = cheerio.load(html);

    const element = $(selector);

    if (element.length === 0) {
      environment.log.error('Element not found');
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error('No text found in element');
      return false;
    }

    console.log('Extracted text:', extractedText);

    environment.setOutput('Extracted text', extractedText);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};

export default extractTextFromElementExecutor;
