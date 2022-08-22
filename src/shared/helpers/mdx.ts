import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { formatMatter } from '@shared/helpers/matter';
import { MDXPage } from '@shared/models/mdx';

function toPosixPath(str: string) {
  return str.replace(/\\/g, '/');
}

const MDX_PATH = toPosixPath(
  path.resolve(process.cwd(), './src/pages/article'),
);

export const getPages = () => {
  const files = glob.sync(
    toPosixPath(
      path.resolve(MDX_PATH, '**/*.mdx'),
    ),
  );
  return files.map(file => {
    const { data } = formatMatter(
      fs.readFileSync(file, { encoding: 'utf-8' }),
      file,
    );
    const pathname = file.replace(MDX_PATH, '')
      .replace(/(index|)\.mdx$/, '');
    return {
      frontMatter: data,
      path: `/article${pathname}`,
    } as MDXPage;
  });
};

export const mdxPages = getPages();

function getAllTags() {
  const tags = new Set<string>();
  for (const page of mdxPages) {
    page.frontMatter.tag.map(v => v.trim()).filter(Boolean).forEach(v => tags.add(v));
  }
  return tags;
}

export const tags = getAllTags();

export function getPagesByTag(tag: string) {
  return mdxPages.filter(v => v.frontMatter.tag.includes(tag));
}
