import { MDXComponents } from 'mdx/types';
import { Code } from './Code';
import { Heading } from './Heading';
import { Pre } from './Pre';

export const components: MDXComponents = {
  pre: Pre,
  code: Code,
  h1: (props) => <Heading { ...props } level={1} />,
  h2: (props) => <Heading { ...props } level={2} />,
  h3: (props) => <Heading { ...props } level={3} />,
};
