import { FC, useMemo } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  tags?: string[];
  suffix?: boolean;
}
const SEO: FC<SEOProps> = (props) => {
  const { title, description, tags, suffix = true } = props;
  
  const fullTitle = useMemo(() => {
    return `${title}${suffix ? ' - Chicken Man' : ''}`;
  }, [suffix, title]);

  return (
    <Head>
      <title>{ fullTitle }</title>
      <meta name={'description'} content={description} />
      <meta name={'og:title'} content={fullTitle} />
      <meta name={'og:description'} content={description} />
      <meta name={'og:image'} content={`${process.env.BASE_PATH}favicon.ico`} />
      {/* https://docsearch.algolia.com/docs/legacy/required-configuration */}
      {
        tags ?
          <meta name="docsearch:tags" content={tags.join(',')} /> :
          null
      }
    </Head>
  );
};

export { SEO };
