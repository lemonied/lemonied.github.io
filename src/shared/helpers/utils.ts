export function combineClass(...args: Array<{ [prop: string]: boolean | null | number | undefined } | string | null | undefined>) {
  return args.reduce<string[]>((prev, current) => {
    if (current) {
      if (typeof current === 'object') {
        Object.keys(current).forEach(key => {
          if (current[key]) {
            prev.push(key);
          }
        });
      } else {
        prev.push(current);
      }
    }
    return prev;
  }, []).join(' ');
}

export function randomStr(prefix: string | number, length = 5) {
  return `${prefix}_${Math.random().toString(36).slice(2, 2 + length)}`;
}

export function sleep(millisecond = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond);
  });
}

export class Token<T=any> {
  public promise: Promise<T>;
  public resolve!: (value: T | PromiseLike<T>) => void;
  public reject!: (reason?: any) => void;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export function debounce<T extends Function>(fn: T, delay: number) {
  let timer: number;
  return () => {
    if (typeof timer !== 'undefined') {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(fn, delay);
  };
}
