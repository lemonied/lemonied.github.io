import { NextPage } from 'next';
import { SEO } from '@shared/components/seo';

const Page404: NextPage = () => {
  return (
    <>
      <SEO title={'404 - Page Not Found'} description={'404 - Page Not Found'} />
      <h1>404 - Page Not Found</h1>
    </>
  );
};

export default Page404;
