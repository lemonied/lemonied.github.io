import type { Observable } from 'rxjs';

export interface FormControlled<T> {
  value?: T;
  onChange?(e: T): void;
}

interface RuleRequired {
  required?: boolean;
  message?: string;
}
interface RuleValidator {
  (value: any): null | string | Promise<null | string> | Observable<null | string>;
}
export type Rule = RuleRequired | RuleValidator;

export interface Status {
  state: 'valid' | 'invalid' | 'pending' | 'initial';
  name: string;
  message?: string;
}

