import { FC, useEffect, useRef } from 'react';
import { dynamicQueue } from './queue-dynamic';

const DynamicQueue: FC = () => {

  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const subscription = dynamicQueue(btnRef.current!);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <button ref={btnRef}>下载</button>
    </div>
  );
};

export { DynamicQueue };
