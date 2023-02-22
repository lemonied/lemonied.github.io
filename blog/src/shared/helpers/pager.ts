import { getPagesByTag, tags } from './mdx';
import { MDXPage, PageSchema, TagInfo, TagWithArticles } from '@shared/models/mdx';

export const ARTICLES_SIZE = 10;
export const TAGS_SIZE = 20;
export const WITH_ARTICLES_SIZE = 5;

export const postArticles = (tag: string, page = 1, size = ARTICLES_SIZE): PageSchema<MDXPage> => {
  const articles = getPagesByTag(tag);
  const start = (page - 1) * size;
  return {
    total: articles.length,
    size,
    page,
    data: articles.slice(start, start + size),
  };
};

export const postTags = (page = 1, size = TAGS_SIZE): PageSchema<TagInfo> => {
  const start = (page - 1) * size;
  return {
    total: tags.length,
    size,
    page,
    data: Array.from(tags).slice(start, start + size),
  };
};

export const postTagsWithArticles = (page = 1, size = TAGS_SIZE, articleSize = WITH_ARTICLES_SIZE): PageSchema<TagWithArticles> => {
  const start = (page - 1) * size;
  const data = tags.map(tag => {
    const articles = postArticles(tag.value, 1, articleSize);
    return {
      tag,
      total: articles.total,
      articles: articles.data,
    };
  }).sort((a, b) =>  b.total - a.total);
  return {
    total: tags.length,
    page,
    size,
    data: data.slice(start, start + size),
  };
};
