import matter from 'gray-matter';
import fs from 'fs';
import { FrontMatter } from './models';

export function formatMatter(source: string, resourcePath: string) {
  // eslint-disable-next-line prefer-const
  let { content, data } = matter(source);
  data = Object.assign({}, data); // prevent caching
  data.updated = data.updated || fs.statSync(resourcePath).mtime.toISOString();
  data.tag = ((data.tag || '') as string).split('/').map(v => v.trim()).filter(Boolean);
  return { content, data: data as FrontMatter };
}
