import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';
import { Header } from '@shared/components/header';

interface LayoutProps {
  children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {

  const { children } = props;

  return (
    <section className={styles['layout']}>
      <Header />
      <main className={styles['main']}>{ children }</main>
    </section>
  );
};

export { Layout };
