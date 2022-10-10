import { FC, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { combineClass } from '@shared/utils';
import { Button } from '@shared/components/button';
import { Icon } from '@shared/components/icons';

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
        className={styles['btn-icon']}
        disabled={page === 1}
        onClick={() => handleChange(n, size)}
      >
        <Icon type={'left'} />
      </Button>
    );
    return wrapper ? wrapper(child, n) : child;
  }, [handleChange, page, size, wrapper]);

  const next = useMemo(() => {
    const n = Math.min(pages.length, page + 1);
    const child = (
      <Button
        className={styles['btn-icon']}
        disabled={page === pages.length}
        onClick={() => handleChange(n, size)}
      >
        <Icon type={'right'} />
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
              type={page === v ? 'primary' : 'default'}
              className={styles['btn']}
              onClick={() => handleChange(v, size)}
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
