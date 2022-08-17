/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  reactStrictMode: process.env.NODE_ENV === 'development',
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    if (!isServer) {
      config.externals = {
        'react': 'React',
        'react-dom': 'ReactDOM',
      };
    }
    return config;
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
