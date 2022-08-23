import { MDXComponents } from 'mdx/types';
import { Code } from './Code';

export const components: MDXComponents = {
  pre: (props: any) => props.children,
  code: Code as any,
};
