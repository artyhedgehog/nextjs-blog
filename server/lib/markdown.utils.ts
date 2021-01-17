import matter, { GrayMatterFile } from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { HastUtilToHtmlOptions } from 'hast-util-to-html';

import { getFileContents } from './files.utils';

interface MarkdownMatterWithContent {
  matterResult: matter.GrayMatterFile<string>;
  contentHtml: string;
}

export function parseMarkdownFileMatter(fullPath: string): GrayMatterFile<string> {
  const fileContents = getFileContents(fullPath);

  // Use gray-matter to parse the post metadata section
  return matter(fileContents);
}

export async function parseMarkdownFile(fullPath: string): Promise<MarkdownMatterWithContent> {
  const matterResult = parseMarkdownFileMatter(fullPath);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().
    use<[HastUtilToHtmlOptions?]>(html).
    process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    matterResult,
    contentHtml,
  };
}

