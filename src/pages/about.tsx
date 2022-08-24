import { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';

const AboutPage: NextPage = () => {
  return (
    <>
      <SEO title={'关于我们'} description={'本网站的作者信息'} />
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
