import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { FrontMatter } from '@shared/models/mdx';
import { components } from './components';
import { Layout } from '@shared/components/layout';
import Link from 'next/link';
import { SEO } from '@shared/components/seo';
import { moment8 } from '@shared/utils';
import styles from './styles.module.scss';
import { Button } from '@shared/components/button';

const MarkdownBody = styled.div`
  --color-border-default: #C5CEDE;
  --color-canvas-subtle: #F5F7FA;
  --color-danger-fg: #cf222e;
  --color-fg-muted: #57606a;
  --color-fg-default: #24292f;
  --color-border-muted: hsla(210,18%,87%,1);
  --color-canvas-default: #ffffff;
  --color-neutral-muted: rgba(175,184,193,0.2);
  --color-accent-emphasis: #0969da;
  &.markdown-body{
    font-size: 1rem;
  }
  details{
    margin-top: 0;
    margin-bottom: 16px;
    &[open]{
      summary{
        margin-bottom: 10px;
      }
    }
    summary{
      cursor: pointer;
      display: list-item;
      &:focus{
        outline: none;
        box-shadow: none;
      }
    }
  }
  table{
    border-collapse: collapse;
    tr{
      border-top: none;
    }
  }
`;

const ArticleWrapper = styled.article`
  & > h1{
    font-size: 2.5em;
    margin: 0;
  }
  & > p {
    line-height: 1.2em;
    margin: 10px 0 20px 0;
    & > *:not(:first-child){
      margin-left: 10px;
    }
  }
  a{
    color: var(--color-link);
    &:hover{
      color: var(--color-link-hover);
    }
    &:active{
      color: var(--color-link-active);
    }
  }
`;

interface MDXWrapperProps {
  children: ReactElement;
  frontMatter: FrontMatter;
}
const MDXWrapper: FC<MDXWrapperProps> = (props) => {

  const {
    children,
    frontMatter,
  } = props;

  return (
    <>
      <SEO
        title={frontMatter.title || ''}
        description={frontMatter.description || frontMatter.title || ''}
      />
      <Layout mainClassName={styles['article-main']}>
        <ArticleWrapper>
          <h1>{ frontMatter.title }</h1>
          <p>
            <span>???????????????{ moment8(frontMatter.updated).format('YYYY-MM-DD HH:mm:ss') }</span>
            <span>
              <span>?????????</span>
              {
                frontMatter.tag.map((tag, k) => {
                  return (
                    <Link key={tag} href={`/list/${tag}`} >
                      <Button>{ tag }</Button>
                    </Link>
                  );
                })
              }
            </span>
          </p>
          <MarkdownBody className='markdown-body'>
            <MDXProvider components={components}>{ children }</MDXProvider>
          </MarkdownBody>
        </ArticleWrapper>
      </Layout>
    </>
  );
};

export { MDXWrapper };


