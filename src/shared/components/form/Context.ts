import { createContext } from 'react';
import type { Observable } from 'rxjs';
import { FormValues, Status } from './interface';

export interface FormContextInterface {
  setItem: (name: string, value: any, options?: {
    emit?: boolean;
    remove?: boolean;
  }) => void;
  toJSON: () => FormValues;
  reductions: Map<string, () => void>;
  validators: Map<string, () => Observable<Status>>;
}

export const FormContext = createContext<FormContextInterface | null>(null);

export type FormValuesMap = Map<string, any>;

export const FormValuesContext = createContext<FormValuesMap | null>(null);

