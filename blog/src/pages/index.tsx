import type { NextPage } from 'next';
import { Layout } from '@shared/components/layout';
import { SEO } from '@shared/components/seo';

const Home: NextPage = () => {
  
  return (
    <>
      <SEO
        title={'Lemonied'}
        description={'林哥哥的个人空间'}
      />
      <Layout>

      </Layout>
    </>
  );
};

export default Home;
