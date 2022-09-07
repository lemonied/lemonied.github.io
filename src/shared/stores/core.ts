import { map, merge, of, Subject } from 'rxjs';
import type { OperatorFunction } from 'rxjs';

type Effect<T> = Subject<T> | Subject<void>;

export class Store<T> {
  private original: T;
  private set$ = new Subject<T>();
  private effects = new Set<Effect<T>>();
  public change$ = this.set$.asObservable();
  public state$ = merge(
    of(null).pipe(map(() => this.original)),
    this.change$,
  );
  public get state() {
    return this.original;
  }
  constructor(defaultState: T) {
    this.original = defaultState;
    this.set$.subscribe((state) => this.original = state);
  }
  public pipeline(operator: OperatorFunction<T, T>) {
    const subject = new Subject<T>();
    subject.pipe(
      operator,
    ).subscribe(this.set$);
    this.effects.add(subject);
    return subject;
  }
  public statement(operator: OperatorFunction<T, T>) {
    return this.pipeline(source => source.pipe(
      map(() => this.state),
      operator,
    )) as unknown as Subject<void>;
  }
  /** clear up effects */
  public clear(...subjects: Effect<T>[]) {
    for (const subject of subjects) {
      subject.complete();
      this.effects.delete(subject);
    }
  }
  /** clear up all effects */
  public clearAll() {
    this.effects.forEach(v => v.complete());
    this.effects.clear();
  }
  /** destroy the instance */
  public destroy() {
    this.clearAll();
    this.set$.complete();
  }
}

export const createStore = <T>(defaultState: T) => {
  return new Store(defaultState);
};
