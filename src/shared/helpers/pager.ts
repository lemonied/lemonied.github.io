import { getPagesByTag, tags } from './mdx';
import { TagWithArticles } from '@shared/models/mdx';

export const ARTICLES_SIZE = 20;
export const TAGS_SIZE = 20;
const WITH_ARTICLES_SIZE = 5;

export const postArticles = (tag: string, pager = 1, size = ARTICLES_SIZE) => {
  const articles = getPagesByTag(tag);
  const start = (pager - 1) * size;
  return articles.slice(start, start + size);
};

export const postTags = (pager = 1, size = TAGS_SIZE) => {
  const start = (pager - 1) * size;
  return Array.from(tags).slice(start, start + size);
};

export const postTagsWithArticles = (pager = 1, size = TAGS_SIZE, articleSize = WITH_ARTICLES_SIZE): TagWithArticles[] => {
  const start = (pager - 1) * size;
  return Array.from(tags).slice(start, start + size).map(tag => {
    return {
      tag,
      articles: postArticles(tag, 1, articleSize),
    };
  });
};
