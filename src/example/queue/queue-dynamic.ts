import { fromEvent, mergeScan, tap, timer, map } from 'rxjs';

export function dynamicQueue(dom: HTMLElement) {
  return fromEvent(dom, 'click').pipe(
    mergeScan((acc, value, index) => {
      const duration = Math.random() * 10;
      return timer(duration * 1000).pipe(
        map(() => acc + 1),
        tap(() => console.log(`第${index + 1}个下载完毕，用时${duration}秒`)),
      );
    }, 0, 2), // 0为seed，2为最大队列数
  ).subscribe();
}
