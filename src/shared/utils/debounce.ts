export function debounce<T extends Function>(fn: T, delay: number) {
  let timer: number;
  const cancel = () => {
    window.clearTimeout(timer);
  };
  const callback = (...args: any[]) => {
    cancel();
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
  return [callback, cancel];
}
