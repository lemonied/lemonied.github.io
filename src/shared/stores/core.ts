import { map, startWith, Subject } from 'rxjs';
import type { OperatorFunction } from 'rxjs';

export class Store<T> {
  private original: T;
  private set$ = new Subject<T>();
  private effects: Array<Subject<T> | Subject<void>> = [];
  public change$ = this.set$.asObservable();
  public state$ = this.change$.pipe(source => {
    return source.pipe(
      startWith(this.original),
    );
  });
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
    this.effects.push(subject);
    return subject;
  }
  public statement(operator: OperatorFunction<T, T>) {
    return this.pipeline(source => source.pipe(
      map(() => this.state),
      operator,
    )) as unknown as Subject<void>;
  }
  /** clear up effects */
  public clear() {
    while (this.effects.length) {
      const subject = this.effects[0];
      subject.complete();
      subject.unsubscribe();
      this.effects.shift();
    }
  }
  /** destroy the instance */
  public destroy() {
    this.clear();
    this.set$.complete();
  }
}

export const createStore = <T>(defaultState: T) => {
  return new Store(defaultState);
};
