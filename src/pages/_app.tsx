import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MDXWrapper } from '@shared/components/mdx';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Lemonied</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
      </Head>
      <MDXWrapper {...pageProps}>
        <Component {...pageProps} />
      </MDXWrapper>
    </>
  );
}

export default MyApp;
