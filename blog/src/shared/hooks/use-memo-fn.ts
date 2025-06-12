import React from 'react';

export const useMemoFn = <T extends ((...args: any[]) => any)>(fn: T) => {
  const fnRef = React.useRef(fn);
  fnRef.current = React.useMemo(() => fn, [fn]);

  return React.useCallback((...args: any[]) => {
    return fnRef.current(...args);
  }, []) as T;
};
