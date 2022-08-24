import type { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';

const Home: NextPage = () => {
  
  return (
    <>
      <SEO
        title={'甜心小鸡 - Such A Sweet Little Chicken'}
        description={'甜心小鸡的个人博客'}
        suffix={false}
      />
      <Layout>

      </Layout>
    </>
  );
};

export default Home;
