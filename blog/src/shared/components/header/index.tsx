import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Search } from './search';

const Header: FC = () => {
  return (
    <header className={styles['header']}>
      <nav>
        <div className={styles['nav-list']}>
          <Link href={'/'}>首页</Link>
          <Link href={'/tag'}>我的笔记</Link>
          <a
            href="/use-modal-service"
            target="_blank"
            title="更简单的使用antd modal"
          >useModalService</a>
          <a
            href="/bello"
            target="_blank"
            title="基于antd的表单差异对比组件"
          >bello</a>
          <Link href={'/about'}>关于我们</Link>
        </div>
      </nav>
      <Search className={styles['search']} />
    </header>
  );
};

export { Header };
