import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import {
  externalScripts,
  externalStyles,
} from '@shared/helpers/externals';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang={'zh-cn'}>
        <Head>
          {
            externalStyles.map(v => (
              <link key={v} rel="stylesheet" href={v} />
            ))
          }
          {
            externalScripts.map(v => (
              <Script key={v} src={v} strategy='beforeInteractive' />
            ))
          }
          {
            process.env.NODE_ENV === 'development' && process.env.VCONSOLE ?
              <Script key={'v-console'} src={'//unpkg.com/vconsole@latest/dist/vconsole.min.js'} strategy={'beforeInteractive'} /> :
              null
          }
          {
            process.env.NODE_ENV === 'development' && process.env.VCONSOLE ?
              <Script
                id={'vConsoleInstance'}
                key={'v-console-instance'}
                strategy={'afterInteractive'}
                dangerouslySetInnerHTML={{ __html: 'var vConsole = new window.VConsole();' }}
              /> :
              null
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
