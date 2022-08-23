import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { tags } from '@shared/helpers/mdx';
import { ParsedUrlQuery } from 'querystring';
import {
  ARTICLES_SIZE,
  postTagsWithArticles,
  TAGS_SIZE,
} from '@shared/helpers/pager';
import { Grid } from '@shared/components/grid';
import { ShadowCard } from '@shared/components/card';
import styled from 'styled-components';
import Link from 'next/link';
import { TagWithArticles } from '@shared/models/mdx';
import { Layout } from '@shared/components/layout';

const Wrapper = styled(ShadowCard)`
  h2{
    margin: 0;
    padding: 10px 20px 0 20px;
    font-size: 22px;
    line-height: 30px;
  }
  ul{
    margin: 0;
    padding: 20px;
  }
  li{
    list-style: none;
    font-size: 14px;
    line-height: 24px;
  }
`;

interface TagPageProps {
  tags: TagWithArticles[];
  size: number;
  pager: number;
}
const TagPage: NextPage<TagPageProps> = (props) => {

  const { tags } = props;

  return (
    <Layout>
      <Grid>
        {
          tags.map(v => {
            return (
              <Wrapper key={v.tag}>
                <h2>
                  <Link href={`/list/${v.tag}`}>{v.tag}</Link>
                </h2>
                <ul className={'content'}>
                  {
                    v.articles.map(v => {
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
              </Wrapper>
            );
          })
        }
      </Grid>
    </Layout>
  );
};

export default TagPage;

export const getStaticProps: GetStaticProps<TagPageProps> = (context) => {

  const pager = Number(context.params?.slug || 1);

  return {
    props: {
      tags: postTagsWithArticles(pager, TAGS_SIZE, ARTICLES_SIZE),
      size: TAGS_SIZE,
      pager,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {

  const paths: Array<{ params: ParsedUrlQuery }> = [];
  const maxPage = Math.max(1, tags.size);
  for (let i = 0; i < maxPage; i += 1) {
    paths.push({
      params: { slug: `${i + 1}` },
    });
  }

  return { paths, fallback: false };
};
