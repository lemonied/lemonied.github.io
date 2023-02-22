import { type Store, createStore } from './core';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useStore = <T>(defaultState: () => T): [T, Store<T>] => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storeRef = useRef(useMemo(() => createStore(defaultState()), []));
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const instance = storeRef.current;
    Object.assign(instance, createStore(instance.state));
    const subscription = instance.change$.subscribe(res => setState(res));
    return () => {
      instance.destroy();
      subscription.unsubscribe();
    };
  }, []);

  return [state, storeRef.current];
};

export const useGetter = <T>(store: Store<T>) => {
  const [state, setState] = useState(store.state);
  useEffect(() => {
    const subscription = store.change$.subscribe(res => setState(res));
    return () => subscription.unsubscribe();
  }, [store]);
  return state;
};
