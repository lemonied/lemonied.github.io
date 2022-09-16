import { DependencyList, useMemo } from 'react';

interface FNFactory<T>{
  (callback: (post: () => any) => void): T;
}
export function trailed<T extends (...args: any[]) => any>(fn: FNFactory<T>): T {
  let count = 0;
  const callback = (post: () => any) => {
    count += 1;
    Promise.resolve().then(() => {
      if (count > 1) return count -= 1;
      count = 0;
      post();
    });
  };
  return fn(callback);
}

export const useTrailed = <T extends (...args: any[]) => any>(fn: FNFactory<T>, deps: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => trailed(fn), deps);
};
