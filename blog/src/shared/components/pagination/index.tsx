import { FC, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { combineClass } from '@shared/utils';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationProps {
  className?: string;
  page: number;
  size: number;
  total: number;
  onChange?: (page: number, size: number) => void;
  wrapper?: (button: ReactElement, page: number) => ReactNode;
}
const Pagination: FC<PaginationProps> = (props) => {

  const { className, size, total, page, onChange, wrapper } = props;
  
  const pages = useMemo(() => {
    return new Array(Math.ceil(total / size)).fill(1).map((_, key) => key + 1);
  }, [size, total]);
  
  const available = useMemo(() => {
    const index = page - 1;
    return pages.slice(
      Math.max(0, index - 5),
      Math.min(pages.length, index + 5),
    );
  }, [page, pages]);
  
  const handleChange = useCallback((page: number, size: number) => {
    onChange?.(page, size);
  }, [onChange]);
  
  const pre = useMemo(() => {
    const n = Math.max(1, page - 1);
    const child = (
      <Button
        className={styles['btn']}
        disabled={page === 1}
        type={'text'}
        onClick={() => handleChange(n, size)}
      >
        <LeftOutlined />
      </Button>
    );
    return wrapper ? wrapper(child, n) : child;
  }, [handleChange, page, size, wrapper]);

  const next = useMemo(() => {
    const n = Math.min(pages.length, page + 1);
    const child = (
      <Button
        disabled={page === pages.length}
        onClick={() => handleChange(n, size)}
        type={'text'}
      >
        <RightOutlined />
      </Button>
    );
    return wrapper ? wrapper(child, n) : child;
  }, [handleChange, page, pages, size, wrapper]);

  if (available.length <= 1) {
    return null;
  }

  return (
    <div
      className={combineClass(styles['pagination'], className)}
    >
      <div className={styles['item']} key={'pre'}>{ pre }</div>
      {
        available.map(v => {
          const child = (
            <Button
              className={styles['btn']}
              onClick={() => handleChange(v, size)}
              type={v !== page ? 'text' : 'primary'}
            >{ v }</Button>
          );
          return (
            <div key={v} className={styles['item']}>{ wrapper ? wrapper(child, v) : child }</div>
          );
        })
      }
      <div className={styles['item']} key={'next'}>{ next }</div>
    </div>
  );
};

export { Pagination };
