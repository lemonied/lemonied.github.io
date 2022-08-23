import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <header className={styles['header']}>
      <nav>
        <div className={styles['nav-list']}>
          <Link href={'/'}>首页</Link>
          <Link href={'/tag/1'}>我的笔记</Link>
          <Link href={'/about'}>关于我们</Link>
        </div>
      </nav>
    </header>
  );
};

export { Header };
