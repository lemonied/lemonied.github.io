interface Task<T>{
  (): Promise<T>;
}

export class Queue<T=any>{
  private concurrent: number;
  private tasks: Task<T>[] = [];
  private pending = new Set<ReturnType<Task<T>>>();
  private status: 0 | 1 = 1;
  constructor(concurrent = 3) {
    this.concurrent = concurrent;
  }
  private check() {
    if (this.status === 1) {
      const count = this.concurrent - this.pending.size;
      this.tasks.splice(0, count).forEach(fn => {
        const ret = fn();
        ret.finally(() => {
          this.pending.delete(ret);
          this.check();
        });
        this.pending.add(ret);
      });
    }
  }
  public setConcurrent(concurrent: number) {
    this.concurrent = concurrent;
    this.check();
  }
  public addTask(...tasks: Task<T>[]) {
    this.tasks.push(...tasks);
    this.check();
  }
  public start() {
    this.status = 1;
    this.check();
  }
  public stop() {
    this.status = 0;
  }
}
