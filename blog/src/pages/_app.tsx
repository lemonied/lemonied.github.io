import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import moment from 'moment';
import NProgress from 'nprogress';
import { useNProgress } from '@shared/hooks/nprogress';

moment.locale('zh-cn');

NProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }: AppProps) {

  useNProgress();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name={'renderer'} content={'webkit'} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        <link rel="icon" type="image/x-icon" href={`${process.env.BASE_PATH}favicon.ico`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log(
    `%c构建于：${moment(Number(process.env.TIMESTAMP)).format('YYYY-MM-DD HH:mm:ss')}`,
    'color: green;',
  );
}
