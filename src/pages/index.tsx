import type { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';

const Home: NextPage = () => {
  
  return (
    <>
      <SEO title={'Lemonied'} description={'甜心小鸡的个人博客'} />
      <Layout>

      </Layout>
    </>
  );
};

export default Home;
