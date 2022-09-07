import { Store } from './core';
import { useEffect, useRef, useState } from 'react';

export const useStore = <T>(defaultState: T | Store<T>) => {
  const [store, setStore] = useState<Store<T>>();
  const defaultRef = useRef(defaultState);
  const effectsRef = useRef<Store<T>['effects']>(new Set());

  const [state, setState] = useState(defaultState instanceof Store ? defaultState.state : defaultState);

  useEffect(() => {
    const isGlobal = defaultRef.current instanceof Store;
    const instance = (isGlobal ? defaultRef.current : new Store(defaultRef.current)) as Store<T>;

    const effects = effectsRef.current;
    if (isGlobal) {
      // 全局Store需要记录发生在组件内的pipeline副作用，以便组件销毁时清除
      const pipeline = instance.pipeline;
      instance.pipeline = (operator) => {
        const subject = pipeline.call(instance, operator);
        effects.add(subject);
        return subject;
      };
    }
    setStore(instance);
    return () => {
      if (isGlobal) {
        // 清理组件内产生的副作用
        instance.clear(...Array.from(effects));
        effects.clear();
      } else {
        // 组件内创建的Store需要随着组件销毁而销毁
        instance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const subscription = store?.change$.subscribe(res => setState(res));
    return () => subscription?.unsubscribe();
  }, [store]);

  return [state, store] as [typeof state, typeof store];
};
