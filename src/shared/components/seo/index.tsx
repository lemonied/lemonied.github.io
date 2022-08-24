import { FC } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
}
const SEO: FC<SEOProps> = (props) => {
  const { title, description } = props;
  return (
    <Head>
      <title>{ title }</title>
      <meta name={'description'} content={description} />
      <meta name={'og:title'} content={title} />
      <meta name={'og:description'} content={description} />
    </Head>
  );
};

export { SEO };
