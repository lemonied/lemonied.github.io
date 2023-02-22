import { Observable, Subject, Subscription } from 'rxjs';
import { DependencyList, useEffect, useState } from 'react';

export const useSubject = <T=void, O=unknown>(factory: (action: Subject<T>) => Observable<O>, deps: DependencyList) => {

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
    return () => subject.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return action;
};
