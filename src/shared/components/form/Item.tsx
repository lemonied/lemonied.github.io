import {
  cloneElement, FunctionComponent, ReactElement,
  useCallback, useContext, useEffect, useMemo, useRef,
} from 'react';
import { FormContext, FormValuesContext } from './Context';
import { Rule, Status } from './interface';
import {
  concat, concatMap, from, isObservable, of, take,
  skipWhile, switchMap, takeLast, tap, throwError,
} from 'rxjs';
import type { Observable } from 'rxjs';
import { useStore } from '@shared/stores';
import { useSubject } from '@shared/hooks/observable';

interface FormItemComponent<P={}> extends FunctionComponent<P> {}
interface FormItemProps {
  name: string;
  children: ReactElement;
  defaultValue?: any;
  rules?: Rule[];
  onStatusChange?: (status: Status) => void;
}

const FormItem: FormItemComponent<FormItemProps> = (props) => {

  const { children, name, defaultValue, rules = [], onStatusChange } = props;
  const context = useContext(FormContext);
  const values = useContext(FormValuesContext);

  const refs = useRef({ context, defaultValue, rules });
  refs.current.context = context;
  refs.current.rules = rules;

  const [status, store] = useStore<Status>(() => ({ state: 'initial', name }));

  const nullVal = useMemo(() => {
    if (children.type === 'input') {
      return '';
    }
    return undefined;
  }, [children]);
  
  const value = useMemo(() => {
    return values?.get(name) ?? nullVal;
  }, [name, nullVal, values]);

  const status$ = useSubject<any>(action => action.pipe(
    tap(() => store.set({ state: 'pending', name })),
    switchMap(value => validate(refs.current.rules, value)),
    tap(() => store.set({ state: 'valid', name })),
    store.capture(err => ({ state: 'invalid', name, message: err })),
  ), [name, store]);

  const onChange = useCallback((e: any) => {
    const val = toFormValue(e);
    status$?.next(val);
    context?.setItem(name, toFormValue(e), { emit: true });
  }, [context, name, status$]);

  const reset = useCallback(() => {
    const { context, defaultValue } = refs.current;
    context?.setItem(name, toFormValue(defaultValue), { emit: true });
    return () => {
      context?.setItem(name, null, { remove: true, emit: true });
    };
  }, [name]);
  
  const validateField = useCallback(() => {
    status$?.next(value); // The status will be updated to pending synchronously
    return store.state$.pipe(
      skipWhile(v => v.state === 'pending'),
      take(1),
    );
  }, [status$, value, store]);
  
  useEffect(() => {
    context?.validators.set(name, validateField);
    return () => {
      context?.validators.delete(name);
    };
  }, [context, name, validateField]);
  
  useEffect(() => {
    context?.reductions.set(name, () => {
      reset();
    });
    return () => {
      context?.reductions.delete(name);
    };
  }, [context, name, reset]);

  useEffect(() => {
    const revert = reset();
    return () => revert();
  }, [reset]);
  
  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);
  
  return cloneElement(children, {
    onChange,
    value,
  });
};

export { FormItem };

function validate(rules: Rule[], value: any) {
  return concat(
    ...rules.map(v => {
      let obs: Observable<null | string>;
      if (typeof v === 'function') {
        const ret = v(value);
        if (isObservable(ret)) {
          obs = ret;
        } else if (ret instanceof Promise) {
          obs = from(ret);
        } else {
          obs = of(ret);
        }
      } else {
        obs = v.required && !value ? of(v.message ?? '') : of(null);
      }
      obs = obs.pipe(
        concatMap(res => res === null ? of(null) : throwError(() => res))
      );
      return obs as Observable<null>;
    }),
    of(null),
  ).pipe(takeLast(1));
}

function toFormValue(e: any) {
  if (e && e.target && Object.hasOwn(e.target, 'value')) {
    return e.target.value;
  }
  return e;
}
