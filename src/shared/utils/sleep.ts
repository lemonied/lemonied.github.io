export function sleep(millisecond = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond);
  });
}
