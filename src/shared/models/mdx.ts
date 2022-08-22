export interface FrontMatter {
  updated: string;
  tag: string[];
  [prop: string]: any;
}

export interface MDXPage {
  frontMatter: FrontMatter;
  path: string;
}
