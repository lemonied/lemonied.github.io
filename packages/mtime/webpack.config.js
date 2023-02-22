const path = require('path');
const webpack = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'dist/index.js',
    library: {
      type: 'commonjs',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: '16' },
              },
            ],
            [
              '@babel/preset-typescript',
            ],
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: true,
      banner: '#!/usr/bin/env node',
    }),
  ],
};

module.exports = config;
