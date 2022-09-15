export function trailed<T extends (...args: any) => any>(
  fn: (
    callback: (post: () => any) => void,
  ) => T,
): T {
  let count = 0;
  const callback = (post: () => any) => {
    count += 1;
    Promise.resolve().then(() => {
      if (count > 1) return count -= 1;
      count = 0;
      post();
    });
  };
  return fn(callback);
}
