import { FC, memo, ReactNode, useRef, useState, useTransition } from 'react';
import { Button } from 'antd';

interface SlowItemProps {
  children?: ReactNode;
}
const SlowItem: FC<SlowItemProps> = (props) => {

  const { children } = props;
  const now = useRef(Date.now());

  while (Date.now() - now.current < 10) {
    // 强行阻塞代码10毫秒
  }

  return (
    <span>{ children }</span>
  );
};

const SlowList = memo(() => {
  return (
    <>
      {
        // 循环200次就是阻塞2秒钟
        new Array(200).fill(1).map((v, k) => {
          return (
            <SlowItem key={k}>{ k }</SlowItem>
          );
        })
      }
    </>
  );
});
SlowList.displayName = 'SlowList';

const UseTransitionList: FC = () => {

  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div>
        <Button onClick={() => setShow(true)}>展示列表(同步渲染)</Button>
        <span>同步的按钮点击后，rerender过程同步执行，所以浏览器会卡死5秒钟</span>
      </div>
      <div>
        <Button
          onClick={() => {
            startTransition(() => setShow(true));
          }}
        >展示列表(startTransition)</Button>
        <span>{ `${isPending}` }</span>
        <Button onClick={() => setShow(false)}>隐藏列表</Button>
        <span>使用startTransition，rerender过程异步执行，可以随时中断rerender过程</span>
      </div>
      {
        show ?
          <SlowList /> :
          null
      }
    </div>
  );
};

export { UseTransitionList };
