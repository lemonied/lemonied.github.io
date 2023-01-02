import { interval, merge, take, tap } from 'rxjs';

const count1 = interval(1000).pipe(
  take(10),
  tap(v => console.log(`count1:${v}`)),
);

const count2 = interval(3000).pipe(
  take(2),
  tap(v => console.log(`count2:${v}`)),
);

const count3 = interval(3000).pipe(
  take(5),
  tap(v => console.log(`count3:${v}`)),
);

const count4 = interval(2000).pipe(
  take(10),
  tap(v => console.log(`count4:${v}`)),
);

const count5 = interval(5000).pipe(
  take(5),
  tap(v => console.log(`count5:${v}`)),
);

export function startQueue() {
  // 表示同时执行以上所有observable，但最大队列数为2
  return merge(count1, count2, count3, count4, count5, 2).subscribe();
}
