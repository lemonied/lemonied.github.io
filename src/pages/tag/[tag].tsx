import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { getPagesByTag, tags } from '@shared/helpers/mdx';
import { MDXPage } from '@shared/models/mdx';
import Link from 'next/link';

interface TagPageProps {
  pages: MDXPage[];
}
const TagPage: NextPage<TagPageProps> = (props) => {

  const { pages } = props;

  return (
    <ul>
      {
        pages.map(v => {
          return (
            <li key={v.path}>
              <Link href={v.path}>
                <a>{ v.frontMatter.title }</a>
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default TagPage;

export const getStaticProps: GetStaticProps<TagPageProps> = (context) => {

  const tag = context.params?.tag! as string;

  return {
    props: {
      pages: getPagesByTag(tag),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from(tags).map(tag => ({ params: { tag } })),
    fallback: false,
  };
};
