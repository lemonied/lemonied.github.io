import { finalize, map, startWith, Subject, tap } from 'rxjs';
import type { Observable, OperatorFunction } from 'rxjs';

export class Store<T> {
  private original: T;
  private set$ = new Subject<T>();
  public effects: Subject<T | void>[] = [];
  public change$ = this.set$.asObservable();
  public state$ = this.change$.pipe(source => {
    return source.pipe(
      startWith(this.original),
    );
  });
  public assign = tap<T>(v => this.set$.next(v));
  constructor(defaultState: T) {
    this.original = defaultState;
    this.set$.subscribe((state) => this.original = state);
  }
  public pipeline(...operators: OperatorFunction<T, T>[]) {
    const subject = new Subject<T | void>();
    Store.operatorChains(
      subject.pipe(
        map(v => typeof v === 'undefined' ? this.getState() : v),
        finalize(() => this.clearUpEffects(subject)),
      ),
      ...operators,
    ).pipe(this.assign).subscribe();
    this.effects.push(subject);
    return subject;
  }
  public getState() {
    return this.original;
  }
  /** clear up effects */
  public clearUpEffects(...subjects: Subject<T | void>[]) {
    if (subjects.length) {
      while (subjects.length) {
        const subject = subjects[0];
        const index = this.effects.indexOf(subject);
        if (index > -1) {
          subject.complete();
          this.effects.splice(index, 1);
        }
        subjects.shift();
      }
    } else {
      while (this.effects.length) {
        const subject = this.effects[0];
        subject.complete();
        this.effects.shift();
      }
    }
  }
  /** destroy the instance */
  public destroy() {
    this.clearUpEffects();
    this.set$.complete();
  }
  static operatorChains<T>(obs: Observable<T>, ...operators: OperatorFunction<T, T>[]): Observable<T> {
    const operator = operators[0] as (OperatorFunction<T, T> | undefined);
    if (operator) {
      return Store.operatorChains(obs.pipe(operator), ...operators.slice(1));
    }
    return obs;
  }
}

export const createStore = <T>(defaultState: T) => {
  return new Store(defaultState);
};
