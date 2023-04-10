import { useRef } from 'react';

export const usePrevious = <T>(value: T) => {
  const currentValue = useRef(value);
  const previousValue = useRef<T>();

  if (currentValue.current !== value) {
    previousValue.current = value;
  }

  currentValue.current = value;

  return previousValue.current;
};
