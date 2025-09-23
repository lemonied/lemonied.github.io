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

  private runNext() {
    if (this.status === 1 && this.size() > 0 && this.concurrent > this.pending.size) {
      const task = this.dequeue()!();
      task.finally(() => {
        this.pending.delete(task);
        this.runNext();
      });
      this.pending.add(task);
      this.runNext();
      return task;
    }
  }

  public async run(tasks: Task<T>[]) {
    const data = tasks.map((task) => {
      let resolved: (result: T) => void;
      const promise = new Promise<T>((resolve) => {
        resolved = resolve;
      });
      return {
        task: async () => {
          const ret = await task();
          resolved(ret);
          return ret;
        },
        promise,
      };
    });
    this.tasks.push(
      ...data.map((v) => v.task),
    );
    this.runNext();
    return await Promise.all(data.map((v) => v.promise));
  }

  public setConcurrent(concurrent: number) {
    this.concurrent = concurrent;
    this.runNext();
  }

  public enqueue(...tasks: Task<T>[]) {
    this.tasks.push(...tasks);
    this.runNext();
  }

  public dequeue() {
    return this.tasks.shift();
  }

  public start() {
    this.status = 1;
    this.runNext();
  }

  public stop() {
    this.status = 0;
  }

  public clear() {
    return this.tasks.splice(0, this.tasks.length);
  }

  public size() {
    return this.tasks.length;
  }

}
