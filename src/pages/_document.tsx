import Document, {
  DocumentContext,
  DocumentInitialProps,
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
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
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