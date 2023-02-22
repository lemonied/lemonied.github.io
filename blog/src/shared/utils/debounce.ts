import { useMemo, useRef } from 'react';

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: number;
  const cancel = () => {
    window.clearTimeout(timer);
  };
  const callback = (...args: any[]) => {
    cancel();
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
  return [callback, cancel];
}

export const useDebounce = <T extends (...args: any[]) => any>(fn: T, delay = 500) => {
  const ref = useRef<T>();
  ref.current = fn;
  return useMemo(() => {
    return debounce((...args: any[]) => {
      ref.current?.(...args);
    }, delay);
  }, [delay]) as [T, () => void];
};
