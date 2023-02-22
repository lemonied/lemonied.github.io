import { createContext } from 'react';
import type { Observable } from 'rxjs';
import { Status } from './interface';

export type FormValues = Record<string, any>;

export type FormValuesMap = Map<string, any>;

export const FormValuesContext = createContext<FormValuesMap | null>(null);

export interface FormContextInterface {
  readonly values: FormValuesMap;
  setItem: (name: string, value: any, options?: {
    emit?: boolean;
    remove?: boolean;
  }) => void;
  toJSON: () => FormValues;
  reductions: Map<string, () => void>;
  invalidations: Map<string, () => void>;
  validators: Map<string, () => Observable<Status>>;
  status: Map<string, Status>;
}

export const FormContext = createContext<FormContextInterface | null>(null);
