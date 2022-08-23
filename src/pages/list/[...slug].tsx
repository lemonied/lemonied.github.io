import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { getPagesByTag, tags } from '@shared/helpers/mdx';
import { MDXPage } from '@shared/models/mdx';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import {
  ARTICLES_SIZE,
  postArticles,
} from '@shared/helpers/pager';
import { Layout } from '@shared/components/layout';

interface ListPageProps {
  pages: MDXPage[];
  size: number;
  pager: number;
}
const ListPage: NextPage<ListPageProps> = (props) => {

  const { pages } = props;

  return (
    <Layout>
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
    </Layout>
  );
};

export default ListPage;

export const getStaticProps: GetStaticProps<ListPageProps> = (context) => {

  const slug = context.params?.slug! as string[];
  const tag = slug[0];
  const pager = Number(slug[1] || 1);

  return {
    props: {
      pages: postArticles(tag, pager, ARTICLES_SIZE),
      pager,
      size: ARTICLES_SIZE,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const list = Array.from(tags);
  return {
    paths: list.reduce((previousValue, tag, currentIndex, array) => {
      const tagPages = getPagesByTag(tag);
      const maxPage = Math.ceil(tagPages.length / ARTICLES_SIZE);
      for (let i = 0; i < maxPage; i += 1) {
        if (i === 0) {
          previousValue.push({
            params: { slug: [tag] },
          });
        }
        previousValue.push({
          params: { slug: [tag, `${i + 1}`] },
        });
      }
      return previousValue;
    }, [] as Array<{ params: ParsedUrlQuery }>),
    fallback: false,
  };
};
