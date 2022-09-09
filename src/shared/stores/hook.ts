import { type Store, createStore } from './core';
import { DependencyList, useEffect, useMemo, useRef, useState } from 'react';
import { Observable, Subject, Subscription } from 'rxjs';

export const useStore = <T>(defaultState: T): [T, Store<T>] => {

  const defaultRef = useRef(defaultState);
  const storeRef = useRef(useMemo(() => createStore(defaultRef.current), []));
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const instance = storeRef.current;
    Object.assign(instance, createStore(storeRef.current.state));
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

export const useAction = <T=void, O=unknown>(factory: (action: Subject<T>) => Observable<O>, deps: DependencyList) => {

  const [action, setAction] = useState<Subject<T>>();

  useEffect(() => {
    let subscription: Subscription | null = null;
    if (action) {
      subscription = factory(action).subscribe();
    }
    return () => subscription?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  useEffect(() => {
    const subject = new Subject<T>();
    setAction(subject);
    return () => {
      subject.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return action;
};
