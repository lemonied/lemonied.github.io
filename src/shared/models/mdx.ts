export interface FrontMatter {
  updated: string;
  tag: string[];
  [prop: string]: any;
}

export interface MDXPage {
  frontMatter: FrontMatter;
  path: string;
}

export interface TagWithArticles {
  tag: string;
  articles: MDXPage[];
  total: number;
}

export interface PageSchema<T> {
  total: number;
  size: number;
  page: number;
  data: T[];
}
