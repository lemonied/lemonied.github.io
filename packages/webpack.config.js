const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../src/shared'),
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
};

/**
 * @param {import('webpack').Configuration} source
 * @param {import('webpack').Configuration} target
 * @return {import('webpack').Configuration}
 * */
function shallowMerge(source, target) {
  return Object.assign({}, source, target);
}

/**
 * @param { string } library
 * @return { import('webpack').Configuration }
 * */
function makeLibrary(library) {
  return shallowMerge(config, {
    entry: path.resolve(__dirname, `./${library}/src/index.ts`),
    output: {
      path: path.resolve(__dirname, './'),
      filename: `${library}/dist/index.js`,
      library: {
        type: 'commonjs',
      },
    },
  });
}

module.exports = [
  makeLibrary('mdx-loader'),
];
