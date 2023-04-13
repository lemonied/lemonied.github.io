// https://docsearch.algolia.com/docs/legacy/run-your-own/
// https://docsearch.algolia.com/docs/legacy/config-file/

const algoliaConfig = {
  index_name: process.env.ALGOLIA_INDEX_KEY ?? 'blog',
  start_urls: [process.env.SITE_URL ?? 'https://www.lemonied.cn'],
  selectors: {
    lvl0: {
      selector: '.article-title',
      global: true,
    },
    lvl1: '.markdown-body h1',
    lvl2: '.markdown-body h2',
    lvl3: '.markdown-body h3',
    lvl4: '.markdown-body h4',
    lvl5: '.markdown-body h5,.markdown-body h6',
    text: 'article p,article ol,article ul',
  },
};

// 使用两次JSON.stringify是为了让特殊字符得到正确的转义
process.stdout.write(
  JSON.stringify(
    JSON.stringify(algoliaConfig),
  ),
);
