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
