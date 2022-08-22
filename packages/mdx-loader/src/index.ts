import type { NextConfig } from 'next';
import type { Options } from '@mdx-js/loader';
import emoji from 'remark-emoji';
import gfm from 'remark-gfm';
import { codeImport } from 'remark-code-import';
import loader from './loader';

const mdx = (nextConfig: NextConfig) => {
  const mdxOptions: Options = {
    remarkPlugins: [
      // https://github.com/rhysd/remark-emoji
      emoji,
      // https://github.com/remarkjs/remark-gfm
      gfm,
      // https://github.com/kevin940726/remark-code-import
      codeImport,
    ],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  };
  const mdxConfig: NextConfig = {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: __filename,
            options: mdxOptions,
          },
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
  return Object.assign({}, nextConfig, mdxConfig);
};

export { mdx };

export default loader;
