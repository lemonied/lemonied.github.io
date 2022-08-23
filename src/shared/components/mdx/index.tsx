import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import moment from 'moment';
import { FrontMatter } from '@shared/models/mdx';
import { components } from './components';
import { Layout } from '@shared/components/layout';

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
  details{
    margin-top: 0;
    margin-bottom: 16px;
    summary{
      cursor: pointer;
      display: list-item;
      &:focus{
        outline: none;
        box-shadow: none;
      }
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
      <Head>
        <title>{ frontMatter.title || '' }</title>
      </Head>
      <Layout>
        <article>
          <h1>{ frontMatter.title }</h1>
          <p>
            <span>更新时间：{ moment(frontMatter.updated).format('YYYY-MM-DD HH:mm:ss') }</span>
            <span>标签：{ frontMatter.tag.join(',') }</span>
          </p>
          <Wrapper className='markdown-body'>
            <MDXProvider components={components}>{ children }</MDXProvider>
          </Wrapper>
        </article>
      </Layout>
    </>
  );
};

export { MDXWrapper };


