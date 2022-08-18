import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MDXWrapper } from '@shared/components/mdx';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isMDX = useMemo(() => {
    return /^\/article/.test(router.pathname);
  }, [router.pathname]);  
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Lemonied</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0" />
      </Head>
      {
        isMDX ?
          <MDXWrapper>
            <Component {...pageProps} />
          </MDXWrapper> :
          <Component {...pageProps} />
      }
    </>
  );
}

export default MyApp;
