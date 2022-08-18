import { FC, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { Code } from './Code';
import { useRouter } from 'next/router';

const components = {
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

interface MDXWrapperProps {
  children?: ReactNode;
}
const MDXWrapper: FC<MDXWrapperProps> = (props) => {

  const { children } = props;

  const router = useRouter();

  const notMDX = useMemo(() => {
    return !/^\/article/.test(router.pathname);
  }, [router.pathname]);

  if (notMDX) {
    return (
      <>{ children }</>
    );
  }

  return (
    <Wrapper className='markdown-body'>
      <MDXProvider components={components}>{ children }</MDXProvider>
    </Wrapper>
  );
};

export { MDXWrapper };


