import {
  useMemo, useState, ReactNode, useRef, forwardRef, ForwardRefExoticComponent,
  PropsWithoutRef, RefAttributes, useImperativeHandle, useCallback, FormEvent, CSSProperties,
} from 'react';
import { Field } from './Field';
import { FormContext, FormContextInterface, FormValuesContext, FormValuesMap, FormValues } from './Context';
import type { Observable } from 'rxjs';
import { concatMap, forkJoin, of, throwError } from 'rxjs';
import { Status } from './interface';
import { trailed, combineClass } from '@shared/utils';
import { FormItem } from './Item';

export interface FormInstance<T=any> {
  setItem: (name: string, value: any) => void;
  reset: (...fields: string[]) => void;
  clearValidity: (...fields: string[]) => void;
  validate: (...fields: string[]) => Observable<T>;
  readonly values: FormValuesMap;
  toJSON: FormContextInterface['toJSON'];
}
export interface FormProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onChange?: (values: FormValues) => void;
  onSubmit?: (instance: FormInstance) => void;
}
interface FormComponent extends ForwardRefExoticComponent<PropsWithoutRef<FormProps> & RefAttributes<FormInstance | undefined>> {
  Field: typeof Field;
  Item: typeof FormItem;
}
const Form = forwardRef<FormInstance, FormProps>((props, ref) => {

  const { children, onChange, onSubmit, className, style } = props;

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
    return {
      get values() {
        return formValues;
      },
      toJSON,
      setItem: trailed((callback) => {
        return (name, value, options) =>  {
          const emit = options?.emit ?? false;
          const remove = options?.remove ?? false;
          formValues = new Map(formValues.entries());
          if (remove) {
            formValues.delete(name);
          } else {
            formValues.set(name, value);
          }
          setFormValues(formValues);
          if (emit) callback(() => onChangeRef.current?.(toJSON()));
        };
      }),
      reductions: new Map(),
      invalidations: new Map(),
      validators: new Map(),
      status: new Map(),
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

  const clearValidity: FormInstance['clearValidity'] = useCallback((...args) => {
    if (args.length) {
      args.forEach(name => context.invalidations.get(name)?.());
    } else {
      context.invalidations.forEach(v => v());
    }
  }, [context]);
  
  const instance: FormInstance = useMemo(() => {
    return { setItem, reset, validate, clearValidity, values: formValues, toJSON: context.toJSON };
  }, [formValues, reset, setItem, validate, context, clearValidity]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(instance);
  }, [instance, onSubmit]);

  useImperativeHandle(ref, () => {
    return instance;
  });

  return (
    <form onSubmit={handleSubmit} className={combineClass(className)} style={style}>
      <FormValuesContext.Provider value={formValues}>
        <FormContext.Provider value={context}>{ children }</FormContext.Provider>
      </FormValuesContext.Provider>
    </form>
  );
}) as FormComponent;

Form.displayName = 'Form';
Form.Field = Field;
Form.Item = FormItem;

export { Form };
