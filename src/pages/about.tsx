import { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import Head from 'next/head';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>关于我们</title>
      </Head>
      <Layout>
        <div>
          <span>本项目地址：</span>
          <a href="https://github.com/lemonied/lemonied.github.io" rel={'noreferrer'}>https://github.com/lemonied/lemonied.github.io</a>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
