import { map, merge, of, Subject } from 'rxjs';
import type { OperatorFunction } from 'rxjs';

interface SubjectLike {
  complete(): void;
}

export class Store<T> {
  private original: T;
  private set$ = new Subject<T>();
  private effects = new Set<SubjectLike>();
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
  public pipeline<I>(operator: OperatorFunction<I, T>) {
    const subject = new Subject<I>();
    subject.pipe(
      operator,
    ).subscribe(this.set$);
    this.effects.add(subject);
    return subject;
  }
  public statement(operator: OperatorFunction<T, T>) {
    return this.pipeline<void>(source => source.pipe(
      map(() => this.state),
      operator,
    ));
  }
  /** clear up effects */
  public clear(...subjects: SubjectLike[]) {
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
