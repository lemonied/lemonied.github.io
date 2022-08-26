import { useMemo, useRef } from 'react';
import { debounce } from '@shared/helpers/utils';

export const useDebounce = <T extends Function>(fn: T, delay = 500) => {
  const ref = useRef<T>();
  ref.current = fn;
  return useMemo(() => {
    return debounce((...args: any[]) => {
      ref.current?.(...args);
    }, delay);
  }, [delay]) as [() => void, T];
};
