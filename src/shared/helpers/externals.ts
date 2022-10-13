
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
    development: '//unpkg.com/rxjs@7.5.6/dist/bundles/rxjs.umd.js',
    production: '//unpkg.com/rxjs@7.5.6/dist/bundles/rxjs.umd.min.js',
  },
  {
    development: '//unpkg.com/immutable@4.1.0/dist/immutable.js',
    production: '//unpkg.com/immutable@4.1.0/dist/immutable.min.js',
  },
  {
    development: '//unpkg.com/react-transition-group@4.4.5/dist/react-transition-group.js',
    production: '//unpkg.com/react-transition-group@4.4.5/dist/react-transition-group.min.js',
  },
  {
    development: '//unpkg.com/moment@2.29.4/moment.js',
    production: '//unpkg.com/moment@2.29.4/min/moment.min.js',
  },
  {
    development: '//unpkg.com/moment@2.29.4/locale/zh-cn.js',
    production: '//unpkg.com/moment@2.29.4/locale/zh-cn.js',
  },
  {
    development: '//unpkg.com/nprogress@0.2.0/nprogress.js',
    production: '//unpkg.com/nprogress@0.2.0/nprogress.js',
  },
  {
    development: '//unpkg.com/jsqr@1.4.0/dist/jsQR.js',
    production: '//unpkg.com/jsqr@1.4.0/dist/jsQR.js',
  },
  {
    development: '//unpkg.com/qrcode@1.5.1/build/qrcode.js',
    production: '//unpkg.com/qrcode@1.5.1/build/qrcode.js',
  },
];

const links = [
  {
    development: '//unpkg.com/@primer/css@20.4.2/dist/markdown.css',
    production: '//unpkg.com/@primer/css@20.4.2/dist/markdown.css',
  },
  {
    development: '//unpkg.com/nprogress@0.2.0/nprogress.css',
    production: '//unpkg.com/nprogress@0.2.0/nprogress.css',
  },
];

export const externalScripts = javascripts.map(v => {
  return process.env.NODE_ENV === 'development' ? v.development : v.production;
});

export const externalStyles = links.map(v => {
  return process.env.NODE_ENV === 'development' ? v.development : v.production;
});
