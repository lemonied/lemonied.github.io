import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

const externalReact = process.env.NODE_ENV === 'development' ?
  '//unpkg.com/react@18.2.0/umd/react.development.js' :
  '//unpkg.com/react@18.2.0/umd/react.production.min.js';

const externalReactDOM = process.env.NODE_ENV === 'development' ?
  '//unpkg.com/react-dom@18.2.0/umd/react-dom.development.js' :
  '//unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js';

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
          <Script src={externalReact} strategy='beforeInteractive' />
          <Script src={externalReactDOM} strategy='beforeInteractive' />
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