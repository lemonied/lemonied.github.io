const { mdx } = require('@lemonied/mdx-loader');

const BASE_PATH = process.env.BASE_PATH || '/';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_PATH,
    SITE_URL: process.env.SITE_URL,
    TIMESTAMP: Date.now(),
    APP_KEY: process.env.APP_KEY,
    SEARCH_API_KEY: process.env.SEARCH_API_KEY,
    INDEX_KEY: process.env.INDEX_KEY,
  },
  basePath: BASE_PATH.replace(/\/$/, ''),
  reactStrictMode: process.env.NODE_ENV === 'development',
  // https://github.com/vercel/next.js/issues/40601
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['tsx', 'mdx'],
  webpack: (
    config,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    if (!isServer) {
      config.externals = {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-transition-group': 'ReactTransitionGroup',
        'moment': 'moment',
        'nprogress': 'NProgress',
        'immutable': 'Immutable',
        'rxjs': 'rxjs',
        'algoliasearch': 'algoliasearch',
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
  },
};

module.exports = mdx(nextConfig);
