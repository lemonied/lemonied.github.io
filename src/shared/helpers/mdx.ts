import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { formatMatter } from '@shared/helpers/matter';
import { MDXPage, TagInfo } from '@shared/models/mdx';
import tagsJSON from '@/config/tags.json';

export const defaultPoster = 'https://lemonied-1258997133.cos.ap-nanjing.myqcloud.com/tags/pai.jpg';

function getPoster(tag: keyof typeof tagsJSON) {
  return tagsJSON[tag]?.poster ?? defaultPoster;
}

function toPosixPath(str: string) {
  return str.replace(/\\/g, '/');
}

const MDX_PATH = path.resolve(process.cwd(), './src/pages/article');

const MDX_PATH_POSIX = toPosixPath(MDX_PATH);

/** Get all articles ant reverse by last update time */
export const getPages = () => {
  const files = glob.sync(
    toPosixPath(
      path.resolve(MDX_PATH_POSIX, '**/*.mdx'),
    ),
  );
  return files.map(file => {
    const { data } = formatMatter(
      fs.readFileSync(file, { encoding: 'utf-8' }),
      file,
    );
    const pathname = toPosixPath(
      path.relative(MDX_PATH, path.resolve(file)),
    ).replace(/(\/index|)\.mdx$/, '');
    return {
      frontMatter: data,
      path: `/article/${pathname}`,
    } as MDXPage;
  }).sort((a, b) => {
    return new Date(b.frontMatter.updated) > new Date(a.frontMatter.updated) ? 1 : -1;
  });
};

export const mdxPages = getPages();

/** Get all tags */
function getAllTags() {
  const tags = new Set<string>();
  for (const page of mdxPages) {
    page.frontMatter.tag.map(v => v.trim()).filter(Boolean).forEach(v => tags.add(v));
  }
  const ret = [] as TagInfo[];
  ret.push(...Array.from(tags).map(value => ({
    value,
    poster: getPoster(value as keyof typeof tagsJSON),
  })));
  return ret;
}

export const tags = getAllTags();

/** Get all pages by tag */
export function getPagesByTag(tag: string) {
  return mdxPages.filter(v => v.frontMatter.tag.includes(tag));
}
