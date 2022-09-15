export function randomStr(prefix: string | number, length = 5) {
  return `${prefix}_${Math.random().toString(36).slice(2, 2 + length)}`;
}
