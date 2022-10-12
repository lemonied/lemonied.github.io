import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { getPagesByTag, tags } from '@shared/helpers/mdx';
import { MDXPage, PageSchema } from '@shared/models/mdx';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import {
  ARTICLES_SIZE,
  postArticles,
} from '@shared/helpers/pager';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';
import { ShadowCard } from '@shared/components/card';
import styles from './styles.module.scss';
import { moment8 } from '@shared/utils';
import { Pagination } from '@shared/components/pagination';

interface ListPageProps {
  pages: PageSchema<MDXPage>;
  tag: string;
}
const ListPage: NextPage<ListPageProps> = (props) => {

  const { pages, tag } = props;

  return (
    <>
      <SEO title={tag} description={`笔记分类：${tag}`} />
      <Layout>
        <ol className={styles['list']}>
          {
            pages.data.map(v => {
              return (
                <li key={v.path}>
                  <ShadowCard className={styles['item']}>
                    <div className={styles['title']}>
                      <h2 className={styles['link']}>
                        <Link href={v.path}>
                          <a>{ v.frontMatter.title }</a>
                        </Link>
                      </h2>
                      <div className={styles['time']}>{ moment8(v.frontMatter.updated).format('YYYY-MM-DD') }</div>
                    </div>
                    {
                      v.frontMatter.description ?
                        <p className={styles['desc']}>{ v.frontMatter.description }</p> :
                        null
                    }
                  </ShadowCard>
                </li>
              );
            })
          }
        </ol>
        <Pagination
          className={styles['pagination']}
          page={pages.page}
          total={pages.total}
          size={pages.size}
          wrapper={(button, page) => (
            <Link href={`/list/${tag}${page > 1 ? `/${page}` : ''}`} >
              <a>{ button }</a>
            </Link>
          )}
        />
      </Layout>
    </>
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
      tag,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const list = Array.from(tags);
  return {
    paths: list.reduce((previousValue, tag, currentIndex, array) => {
      const tagPages = getPagesByTag(tag.value);
      const maxPage = Math.ceil(tagPages.length / ARTICLES_SIZE);
      for (let i = 0; i < maxPage; i += 1) {
        if (i === 0) {
          previousValue.push({
            params: { slug: [tag.value] },
          });
        } else {
          previousValue.push({
            params: { slug: [tag.value, `${i + 1}`] },
          });
        }
      }
      return previousValue;
    }, [] as Array<{ params: ParsedUrlQuery }>),
    fallback: false,
  };
};
