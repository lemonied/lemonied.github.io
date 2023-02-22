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
import { Button } from '@shared/components/button';
import { Picture } from '@shared/components/picture';

const Wrapper = styled(ShadowCard)`
  font-size: 1rem;
  overflow: hidden;
  a{
    &:hover{
      opacity: .8;
    }
  }
  .poster{
    position: relative;
    .title{
      margin: 0;
      padding: 10px 20px 0 20px;
      font-size: 1.2em;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .content{
    margin: 0;
    padding: 20px;
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
                <Wrapper key={ v.tag.value }>
                  <div className={'poster'}>
                    <Picture src={v.tag.poster} ratio={0.6} />
                    <h2 className={'title'}>
                      <Link href={`/list/${v.tag.value}`}>
                        <Button type={'primary'}>{ v.tag.value }</Button>
                      </Link>
                    </h2>
                  </div>
                  <div className={'content'}>
                    {
                      v.articles.map(v => {
                        return (
                          <Link href={v.path} key={v.path}>
                            <Button>{ v.frontMatter.title }</Button>
                          </Link>
                        );
                      })
                    }
                  </div>
                </Wrapper>
              );
            })
          }
          {
            tags.data.length < 4 ?
              new Array(4 - tags.data.length).fill(null).map((_, k) => (<div key={k} />)) :
              null
          }
        </Grid>
        <Pagination
          className={styles['pagination']}
          page={tags.page}
          total={tags.total}
          size={tags.size}
          wrapper={(button, page) => (
            <Link href={`/tag${page > 1 ? `/${page}` : ''}`} >{ button }</Link>
          )}
        />
      </Layout>
    </>
  );
};
