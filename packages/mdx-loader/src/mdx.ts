import type { NextConfig } from 'next';
import type { Options } from '@mdx-js/loader';
import emoji from 'remark-emoji';
import gfm from 'remark-gfm';
import { codeImport } from 'remark-code-import';
import rehypeSlug from 'rehype-slug';
import { preCodeImport } from './root-import-code';

const mdx = (nextConfig: NextConfig) => {
  const mdxOptions: Options = {
    remarkPlugins: [
      // https://github.com/rhysd/remark-emoji
      emoji,
      // https://github.com/remarkjs/remark-gfm
      gfm,
      preCodeImport,
      // https://github.com/kevin940726/remark-code-import
      codeImport,
    ],
    rehypePlugins: [
      // https://github.com/rehypejs/rehype-slug
      rehypeSlug,
    ],
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
