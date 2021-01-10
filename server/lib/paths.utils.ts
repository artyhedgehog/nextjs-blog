import path from 'path';

export enum Directory {
  SERVER = 'server',
  CONTENT = 'content',
  POSTS = 'posts',
}

export enum File {
  HOME_DESCRIPTION = 'home-description.md',
}

export const postsDirectory = path.join(
  process.cwd(),
  Directory.SERVER,
  Directory.CONTENT,
  Directory.POSTS,
);

export function getPostId(fileName: string) {
  return fileName.replace(/\.md$/, '');
}

export function getPostFullPathByFileName(fileName: string) {
  return path.join(postsDirectory, fileName);
}

export function getPostFullPathById(id: string) {
  const fileName = `${ id }.md`;

  return getPostFullPathByFileName(fileName);
}

export function getHomeFullPath() {
  return path.join(process.cwd(), Directory.SERVER, Directory.CONTENT, File.HOME_DESCRIPTION);
}
