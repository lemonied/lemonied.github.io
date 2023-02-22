import { NextPage } from 'next';
import { SEO } from '@shared/components/seo';
import Link from 'next/link';

const Page404: NextPage = () => {
  return (
    <>
      <SEO title={'404 - Page Not Found'} description={'404 - Page Not Found'} />
      <h1>404 - Page Not Found</h1>
      <h2>
        <Link href={'/'}>返回首页</Link>
      </h2>
    </>
  );
};

export default Page404;
