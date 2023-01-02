import { FC, useCallback, useEffect, useRef } from 'react';
import { startQueue } from './queue';
import { Subscription } from 'rxjs';

const QueueExample: FC = () => {

  const cancelRef = useRef<Subscription>();

  const start = useCallback(() => {
    cancelRef.current?.unsubscribe();
    cancelRef.current = startQueue();
  }, []);

  useEffect(() => {
    return () => cancelRef.current?.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <button onClick={start}>开始</button>
    </div>
  );
};

export { QueueExample };
