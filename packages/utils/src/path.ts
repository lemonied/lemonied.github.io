export function toPosixPath(str: string) {
  return str.replace(/\\/g, '/');
}
