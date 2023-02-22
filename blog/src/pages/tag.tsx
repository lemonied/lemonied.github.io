import {
  GetStaticProps,
  NextPage,
} from 'next';
import {
  postTagsWithArticles,
  TAGS_SIZE,
  WITH_ARTICLES_SIZE,
} from '@shared/helpers/pager';
import { TagPage, TagPageProps } from '@shared/components/tag-page';

const TagFirstPage: NextPage<TagPageProps> = (props) => {
  return <TagPage { ...props } />;
};

export default TagFirstPage;

export const getStaticProps: GetStaticProps<TagPageProps> = () => {
  return {
    props: {
      tags: postTagsWithArticles(1, TAGS_SIZE, WITH_ARTICLES_SIZE),
    },
  };
};
