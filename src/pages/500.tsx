import { NextPage } from 'next';
import { SEO } from '@shared/components/seo';

const Page500: NextPage = () => {
  return (
    <>
      <SEO title={'500 - Server-side error occurred'} description={'500 - Server-side error occurred'} />
      <h1>500 - Server-side error occurred</h1>
    </>
  );
};

export default Page500;
