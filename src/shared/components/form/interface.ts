import type { Observable } from 'rxjs';

export interface FormControlled<T> {
  value?: T
  onChange?(e: T): void;
}

export type FormValues = Record<string, any>;

interface RuleRequired {
  required?: boolean;
  message?: string;
}
interface RuleValidator {
  (value: any): null | string | Promise<null | string> | Observable<null | string>;
}
export type Rule<T=any> = RuleRequired | RuleValidator;

export interface Status {
  state: 'valid' | 'invalid' | 'pending' | 'initial';
  name: string;
  message?: string;
}

