import { FC } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  suffix?: boolean;
}
const SEO: FC<SEOProps> = (props) => {
  const { title, description, suffix = true } = props;
  return (
    <Head>
      <title>{ `${title}${suffix ? ' - 甜心小鸡的个人空间' : ''}` }</title>
      <meta name={'description'} content={description} />
      <meta name={'og:title'} content={title} />
      <meta name={'og:description'} content={description} />
    </Head>
  );
};

export { SEO };
