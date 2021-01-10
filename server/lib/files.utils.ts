import fs from 'fs';

export function getFileContents(fullPath: string) {
  return fs.readFileSync(fullPath, 'utf8');
}

export function getFileNames(directory: string) {
  return fs.readdirSync(directory);
}
