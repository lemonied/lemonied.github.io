export function sleep(millisecond = 1000, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve();
      signal?.removeEventListener('abort', onAbort);
    }, millisecond);
    const onAbort = function(ev: Event) {
      clearTimeout(timeout);
      reject(ev);
      signal?.removeEventListener('abort', onAbort);
    };
    signal?.addEventListener('abort', onAbort);
  });
}
