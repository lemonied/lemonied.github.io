import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  
  return (
    <div>
      <p>
        <Link href={'/article'}>我的笔记</Link>
      </p>
    </div>
  );
};

export default Home;
