import mdx from '@next/mdx';
import gfm from 'remark-gfm';
import { codeImport } from 'remark-code-import';
import emoji from 'remark-emoji';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  reactStrictMode: process.env.NODE_ENV === 'development',
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['tsx', 'mdx'],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    if (!isServer) {
      config.externals = {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-transition-group': 'ReactTransitionGroup',
      };
    }
    return config;
  },
};

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      emoji,
      codeImport,
      gfm,
    ],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

export default withMDX(nextConfig);
