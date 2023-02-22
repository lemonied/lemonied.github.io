import type { FrontMatter } from '@lemonied/utils';

export interface MDXPage {
  frontMatter: FrontMatter;
  path: string;
}

export interface TagInfo {
  value: string;
  poster: string;
}

export interface TagWithArticles {
  tag: TagInfo;
  articles: MDXPage[];
  total: number;
}

export interface PageSchema<T> {
  total: number;
  size: number;
  page: number;
  data: T[];
}
