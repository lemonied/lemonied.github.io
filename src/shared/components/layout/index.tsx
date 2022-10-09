import { CSSProperties, FC, ReactNode } from 'react';
import styles from './styles.module.scss';
import { Header } from '@shared/components/header';
import { combineClass } from '@shared/utils';

interface LayoutProps {
  children?: ReactNode;
  mainClassName?: string;
  mainStyle?: CSSProperties;
}
const Layout: FC<LayoutProps> = (props) => {

  const { children, mainClassName, mainStyle } = props;

  return (
    <section className={styles['layout']}>
      <Header />
      <main
        className={combineClass(styles['main'], mainClassName)}
        style={mainStyle}
      >{ children }</main>
    </section>
  );
};

export { Layout };
