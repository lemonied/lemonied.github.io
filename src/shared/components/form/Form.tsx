import {
  useMemo, useState, ReactNode, useRef, forwardRef, ForwardRefExoticComponent,
  PropsWithoutRef, RefAttributes, useImperativeHandle, useCallback, FormEvent,
} from 'react';
import { FormItem } from './Item';
import { FormContext, FormContextInterface, FormValuesContext, FormValuesMap } from './Context';
import type { Observable } from 'rxjs';
import { concatMap, forkJoin, of, throwError } from 'rxjs';
import { Status, FormValues } from './interface';
import { debounce } from '@shared/helpers/utils';

export interface FormInstance<T=any> {
  setItem: (name: string, value: any) => void;
  reset: (...fields: string[]) => void;
  validate: (...fields: string[]) => Observable<T>;
}
export interface FormProps {
  children?: ReactNode;
  onChange?: (values: FormValues) => void;
  onSubmit?: (instance: FormInstance) => void;
}
interface FormComponent extends ForwardRefExoticComponent<PropsWithoutRef<FormProps> & RefAttributes<FormInstance | undefined>> {
  Item: typeof FormItem;
}
const Form = forwardRef<FormInstance, FormProps>((props, ref) => {

  const { children, onChange, onSubmit } = props;

  const [formValues, setFormValues] = useState<FormValuesMap>(new Map());
  const formValuesRef = useRef(formValues);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const context = useMemo<FormContextInterface>(() => {
    let formValues: FormValuesMap = formValuesRef.current;
    const toJSON = () => {
      return Array.from(formValues.entries()).reduce((prev, currentValue) => {
        const [key, val] = currentValue;
        Object.assign(prev, { [key]: val });
        return prev;
      }, {} as FormValues);
    };
    const [emitChange] = debounce(() => {
      onChangeRef.current?.(toJSON());
    }, 0);
    return {
      toJSON,
      setItem(name, value, options) {
        const emit = options?.emit ?? false;
        const remove = options?.remove ?? false;
        formValues = new Map(formValues.entries());
        if (remove) {
          formValues.delete(name);
        } else {
          formValues.set(name, value);
        }
        setFormValues(formValues);
        if (emit) emitChange();
      },
      reductions: new Map(),
      validators: new Map(),
    };
  }, []);

  const reset: FormInstance['reset'] = useCallback((...fields) => {
    if (fields.length) {
      fields.forEach(key => context.reductions.get(key)?.());
    } else {
      context.reductions.forEach(v => v());
    }
  }, [context]);

  const validate: FormInstance['validate'] = useCallback((...fields) => {
    let values = context.toJSON();
    let obs: Observable<Status>[];
    if (fields.length) {
      obs = fields.map(key => context.validators.get(key)).filter(Boolean).map(v => v!());
      values = fields.reduce((previousValue, key) => Object.assign(previousValue, { [key]: values[key] }), {} as FormValues);
    } else {
      obs = Array.from(context.validators.values()).map(v => v());
    }
    return forkJoin(obs).pipe(
      concatMap(results => {
        if (results.every(v => v.state === 'valid')) {
          return of(values);
        }
        return throwError(() => results.filter(v => v.state === 'invalid'));
      }),
    );
  }, [context]);

  const setItem: FormInstance['setItem'] = useCallback((...args) => {
    return context.setItem(...args);
  }, [context]);
  
  const instance: FormInstance = useMemo(() => {
    return { setItem, reset, validate };
  }, [reset, setItem, validate]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(instance);
  }, [instance, onSubmit]);

  useImperativeHandle(ref, () => {
    return instance;
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormValuesContext.Provider value={formValues}>
        <FormContext.Provider value={context}>{ children }</FormContext.Provider>
      </FormValuesContext.Provider>
    </form>
  );
}) as FormComponent;

Form.displayName = 'Form';

Form.Item = FormItem;

export { Form };
