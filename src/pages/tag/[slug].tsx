import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { tags } from '@shared/helpers/mdx';
import { ParsedUrlQuery } from 'querystring';
import {
  postTagsWithArticles,
  TAGS_SIZE,
  WITH_ARTICLES_SIZE,
} from '@shared/helpers/pager';
import { TagPage, TagPageProps } from '@shared/components/tag-page';

const TagOtherPage: NextPage<TagPageProps> = (props) => {
  return <TagPage { ...props } />;
};

export default TagOtherPage;

export const getStaticProps: GetStaticProps<TagPageProps> = (context) => {

  const pager = Number(context.params?.slug || 1);

  return {
    props: {
      tags: postTagsWithArticles(pager, TAGS_SIZE, WITH_ARTICLES_SIZE),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {

  const paths: Array<{ params: ParsedUrlQuery }> = [];
  for (let i = 1; i < Math.ceil(tags.length / TAGS_SIZE); i += 1) {
    paths.push({
      params: { slug: `${i + 1}` },
    });
  }

  return { paths, fallback: false };
};
