import { FC, useCallback } from 'react';
import { compose } from '@shared/utils';

/* eslint-disable no-console */
const f = compose<any>([async function(ctx, next) {
  ctx.a = 'a';
  console.log('第一个， next之前');
  await next();
  console.log('第一个， next之后');
}, async function(ctx, next) {
  ctx.b = 'b';
  console.log('第二个， next之前');
  await next();
  console.log('第二个， next之后');
}, async function(ctx, next) {
  ctx.c = 'c';
  console.log('第三个， next之前');
  await next();
  console.log('第三个， next之后');
}]);

export const ComposeExample: FC = () => {

  const test = useCallback(() => {
    f({}).then(ctx => {
      console.log(ctx);
    });
  }, []);

  return (
    <button onClick={test}>点击执行</button>
  );
};
