import { FC, lazy, Suspense, useState, useTransition } from 'react';
import { sleep } from '@shared/utils';
import { Button, Space } from 'antd';

// 将lazy组件再延迟2000毫秒以便更好的模拟网络延迟
const LazyExample = lazy(() => import('./lazy-example').then(res => sleep(2000).then(() => res)));

const SuspenseExample: FC = () => {

  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div>
        <Space>
          <Button onClick={() => setShow(true)}>显示</Button>
          <Button onClick={() => setShow(false)}>隐藏</Button>
          <Button
            onClick={() => {
              startTransition(() => setShow(true));
            }}
          >显示（startTransition）</Button>
          <span>{`${isPending}`}</span>
        </Space>
      </div>
      <hr />
      <Suspense fallback={<span>loading...</span>}>
        {
          show ?
            <LazyExample /> :
            <span>初始状态</span>
        }
      </Suspense>
    </>
  );
};

export { SuspenseExample };
