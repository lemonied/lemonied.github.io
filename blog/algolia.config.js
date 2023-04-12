const algoliaConfig = {
  index_name: process.env.ALGOLIA_INDEX_KEY ?? 'blog',
  start_urls: [process.env.SITE_URL ?? 'https://www.lemonied.cn'],
  selectors: {
    lvl0: '.article-title',
    lvl1: '.markdown-body h1',
    lvl2: '.markdown-body h2',
    lvl3: '.markdown-body h3',
    lvl4: '.markdown-body h4',
    lvl5: '.markdown-body h5',
    lvl6: '.markdown-body h6',
    tags: '.article-tag',
    text: 'article p,article ol,article ul',
  },
};

process.stdout.write(JSON.stringify(algoliaConfig));
