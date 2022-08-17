
const externals = [
  {
    development: '//unpkg.com/react@18.2.0/umd/react.development.js',
    production: '//unpkg.com/react@18.2.0/umd/react.production.min.js',
  },
  {
    development: '//unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
    production: '//unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
  },
];

export const externalScripts = externals.map(v => {
  return process.env.NODE_ENV === 'development' ? v.development : v.production;
});
