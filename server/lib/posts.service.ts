import { ParsedUrlQuery } from 'querystring';

import { getFileNames } from './files.utils';
import { parseMarkdownFileMatter, parseMarkdownFile } from './markdown.utils';
import { getPostFullPathByFileName, getPostFullPathById, getPostId, postsDirectory } from './paths.utils';

export interface PostListItemData {
  date: string
  title: string
  id: string
}

export function getSortedPostsData(): PostListItemData[] {
  const fileNames = getFileNames(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = getPostId(fileName);
    const fullPath = getPostFullPathByFileName(fileName);
    const matterResult = parseMarkdownFileMatter(fullPath);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    } as PostListItemData;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export interface PostIdParams extends ParsedUrlQuery {
  id: string
}

interface AllPostIdsItem {
  params: PostIdParams
}

export function getAllPostIds(): AllPostIdsItem[] {
  const fileNames = getFileNames(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export interface PostData {
  [p: string]: any;

  id: string;
  contentHtml: string;
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = getPostFullPathById(id);
  const { matterResult, contentHtml } = await parseMarkdownFile(fullPath);

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
