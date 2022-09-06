import { Store } from './core';
import { useEffect, useRef, useState } from 'react';

const isStore = <T>(value: T | Store<T>): value is Store<T> => {
  return value instanceof Store;
};

export const useStore = <T>(defaultState: T | Store<T>) => {
  const [store, setStore] = useState<Store<T>>();
  const defaultRef = useRef(defaultState);

  const [state, setState] = useState(defaultState instanceof Store ? defaultState.getState() : defaultState);

  useEffect(() => {
    const instance = isStore(defaultRef.current) ? defaultRef.current : new Store(defaultRef.current);
    setStore(instance);
    const destroyable = !isStore(defaultRef.current);
    return () => {
      if (destroyable) {
        instance.destroy();
      } else {
        instance.clearUpEffects();
      }
    };
  }, []);

  useEffect(() => {
    const subscription = store?.change$.subscribe(res => setState(res));
    return () => subscription?.unsubscribe();
  }, [store]);

  return [state, store] as [typeof state, typeof store];
};
