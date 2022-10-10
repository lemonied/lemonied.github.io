import { FC } from 'react';
import { PageSchema, TagWithArticles } from '@shared/models/mdx';
import styled from 'styled-components';
import { ShadowCard } from '@shared/components/card';
import { SEO } from '@shared/components/seo';
import { Layout } from '@shared/components/layout';
import { Grid } from '@shared/components/grid';
import Link from 'next/link';
import { Pagination } from '@shared/components/pagination';
import styles from './styles.module.scss';

const Wrapper = styled(ShadowCard)`
  font-size: 1rem;
  a{
    &:hover{
      opacity: .8;
    }
  }
  h2{
    margin: 0;
    padding: 10px 20px 0 20px;
    font-size: 1.5em;
  }
  ul{
    margin: 0;
    padding: 20px;
  }
  li{
    list-style: none;
    font-size: 0.85em;
    line-height: 1.8em;
  }
`;

export interface TagPageProps {
  tags: PageSchema<TagWithArticles>;
}
export const TagPage: FC<TagPageProps> = (props) => {
  const { tags } = props;

  return (
    <>
      <SEO title={'我的笔记'} description={'笔记分类'} />
      <Layout>
        <Grid>
          {
            tags.data.map(v => {
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
        <Pagination
          className={styles['pagination']}
          page={tags.page}
          total={tags.total}
          size={tags.size}
          wrapper={(button, page) => (
            <Link href={`/tag${page > 1 ? `/${page}` : ''}`} >
              <a>{ button }</a>
            </Link>
          )}
        />
      </Layout>
    </>
  );
};
