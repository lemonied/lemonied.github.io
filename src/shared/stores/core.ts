import { BehaviorSubject, distinctUntilChanged, finalize, map, skip, tap } from 'rxjs';
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
  public finalize<I>(fn: (input: T) => T): MonoTypeOperatorFunction<I> {
    return source => source.pipe(
      finalize(() => this.set(fn(this.state))),
    );
  }
  public set(value: T) {
    this.behavior$.next(value);
  }
  /** destroy the instance */
  public destroy() {
    this.behavior$.complete();
  }
}

export const createStore = <T>(defaultState: T) => {
  return new Store(defaultState);
};
