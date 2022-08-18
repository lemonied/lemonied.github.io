
const javascripts = [
  {
    development: '//unpkg.com/react@18.2.0/umd/react.development.js',
    production: '//unpkg.com/react@18.2.0/umd/react.production.min.js',
  },
  {
    development: '//unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
    production: '//unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
  },
  {
    development: '//unpkg.com/react-transition-group@4.4.5/dist/react-transition-group.js',
    production: '//unpkg.com/browse/react-transition-group@4.4.5/dist/react-transition-group.min.js',
  },
];

const links = [
  {
    development: '//unpkg.com/@primer/css@20.4.2/dist/markdown.css',
    production: '//unpkg.com/@primer/css@20.4.2/dist/markdown.css',
  },
];

export const externalScripts = javascripts.map(v => {
  return process.env.NODE_ENV === 'development' ? v.development : v.production;
});

export const externalStyles = links.map(v => {
  return process.env.NODE_ENV === 'development' ? v.development : v.production;
});
