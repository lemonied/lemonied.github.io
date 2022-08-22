import { FC, ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { Code } from './Code';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MDXComponents } from 'mdx/types';
import moment from 'moment';
import { FrontMatter } from '@shared/models/mdx';

const components: MDXComponents = {
  pre: (props: any) => props.children,
  code: Code as any,
};

const Wrapper = styled.div`
  --color-border-default: #C5CEDE;
  --color-canvas-subtle: #F5F7FA;
  --color-danger-fg: #cf222e;
  --color-fg-muted: #57606a;
  --color-fg-default: #24292f;
  --color-border-muted: hsla(210,18%,87%,1);
  --color-canvas-default: #ffffff;
  --color-neutral-muted: rgba(175,184,193,0.2);
  --color-accent-emphasis: #0969da;
`;

const ArticleWrapper = styled.article`
  padding: 20px;
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

  const router = useRouter();

  const notMDX = useMemo(() => {
    return !/^\/article/.test(router.pathname);
  }, [router.pathname]);

  if (notMDX) {
    return children;
  }

  return (
    <>
      <Head>
        <title>{ frontMatter.title || '' }</title>
      </Head>
      <ArticleWrapper>
        <h1>{ frontMatter.title }</h1>
        <p>
          <span>更新时间：{ moment(frontMatter.updated).format('YYYY-MM-DD HH:mm:ss') }</span>
          <span>标签：{ frontMatter.tag.join(',') }</span>
        </p>
        <Wrapper className='markdown-body'>
          <MDXProvider components={components}>{ children }</MDXProvider>
        </Wrapper>
      </ArticleWrapper>
    </>
  );
};

export { MDXWrapper };


