import mdxLoader from '@mdx-js/loader';
import { formatMatter } from '@shared/helpers/matter';
import type { LoaderDefinition } from 'webpack';

function renderFrontMatter(obj: Record<string, string>) {
  return Object.keys(obj).map(key => {
    return `export const ${key} = ${JSON.stringify(obj[key])};`;
  }).join('\n');
}

const tpl =
`
export const getStaticProps = () => {
  return {
    props: { frontMatter },
  };
};

import { MDXWrapper } from '@shared/components/mdx';

export default (props) => <MDXWrapper {...props} />;
`;

/**
 * @see https://webpack.js.org/api/loaders/#the-loader-context
 */
const loader: LoaderDefinition = function(source) {
  const { content, data } = formatMatter(source, this.resourcePath);
  const nextContent = `export const frontMatter = ${JSON.stringify(data)};\n` +
    `${renderFrontMatter(data)}\n` +
    `${content}\n` +
    `${tpl}`;
  mdxLoader.call(this, nextContent);
};

export default loader;
