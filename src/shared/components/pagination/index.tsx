import { FC, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { combineClass } from '@shared/utils';
import { Button } from '@shared/components/button';

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
  
  const handleChange = useCallback((page: number, size: number) => {
    onChange?.(page, size);
  }, [onChange]);

  if (pages.length <= 1) {
    return null;
  }

  return (
    <div
      className={combineClass(styles['pagination'], className)}
    >
      {
        pages.map(v => {
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
    </div>
  );
};

export { Pagination };
