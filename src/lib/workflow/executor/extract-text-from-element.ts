import * as cheerio from 'cheerio';

import type { ExecutionEnvironment } from '@/types/executor';

import type extractTextFromElementTask from '../task/extract-text-from-element';

const extractTextFromElementExecutor = async (
  environment: ExecutionEnvironment<typeof extractTextFromElementTask>
) => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      console.error('No selector provided');
      return false;
    }

    const html = environment.getInput('HTML');
    if (!html) {
      console.error('No HTML provided');
      return false;
    }

    const $ = cheerio.load(html);

    const element = $(selector);

    if (element.length === 0) {
      console.error('Element not found', selector);
      return false;
    }

    const extractedText = $.text(element);
    console.log('@@Extracted text', extractedText);
    if (!extractedText) {
      console.error('No text found in element', selector);
      return false;
    }

    environment.setOutput('Extracted text', extractedText);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default extractTextFromElementExecutor;
