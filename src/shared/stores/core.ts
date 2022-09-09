import { BehaviorSubject, catchError, distinctUntilChanged, map, skip, tap, throwError } from 'rxjs';
import type { OperatorFunction, MonoTypeOperatorFunction, Observable } from 'rxjs';

export class Store<T> {
  private behavior$: BehaviorSubject<T>;
  public change$: Observable<T>;
  public state$: Observable<T>;
  public get state() {
    return this.behavior$.value;
  }
  public get tap(): MonoTypeOperatorFunction<T> {
    return tap(v => this.set(v));
  }
  constructor(defaultState: T) {
    const behavior$ = this.behavior$ = new BehaviorSubject(defaultState);
    this.state$ = behavior$.asObservable();
    this.change$ = this.state$.pipe(
      skip(1),
      distinctUntilChanged(),
    );
  }
  public map<I>(fn: (input: I, index: number) => T): OperatorFunction<I, T> {
    return map((v, index) => {
      const ret = fn(v, index);
      this.set(ret);
      return ret;
    });
  }
  public always<I>(fn: (input: T) => T): OperatorFunction<I, T> {
    return source => source.pipe(
      this.map(() => fn(this.state)),
      catchError((err) => {
        this.set(fn(this.state));
        return throwError(() => err);
      }),
    );
  }
  public capture<I>(fn?: (err: any, input: T) => T): OperatorFunction<I, I> {
    return source => source.pipe(
      catchError((err, caught) => {
        fn && this.set(fn(err, this.state));
        return caught;
      }),
      catchError((err, caught) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return caught;
      }),
    );
  }
  public set(value: T) {
    this.behavior$.next(value);
  }
  public destroy() {
    this.behavior$.complete();
  }
}

export const createStore = <T>(defaultState: T) => {
  return new Store(defaultState);
};
