import { MDXComponents } from 'mdx/types';
import { Code } from './Code';

export const components: MDXComponents = {
  pre: (props) => props.children as any,
  code: Code as any,
};
