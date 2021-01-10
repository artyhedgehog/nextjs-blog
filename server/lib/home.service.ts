import { getHomeFullPath } from './paths.utils';
import { parseMarkdownFile } from './markdown.utils';

export interface HomeDescriptionData {
  [p: string]: any;

  contentHtml: string;
}


export async function getHomeDescriptionData(): Promise<HomeDescriptionData> {
  const fullPath = getHomeFullPath();
  const { matterResult, contentHtml } = await parseMarkdownFile(fullPath);

  return {
    contentHtml,
    ...matterResult.data,
  };
}
