import { Button } from 'antd';
import { combineClass, Queue, randomStr } from '@shared/utils';
import { FC, useCallback, useState, useRef, useMemo } from 'react';
import styles from './downloader.module.scss';

const virtualDownload = (cb?: (percent: number) => void) => {
  let interval: number | undefined;
  let rejected: ((reason?: any) => void) | undefined;
  const cancel = () => {
    window.clearInterval(interval);
    rejected?.('cancel');
  };
  const promised = () => new Promise<void>((resolve, reject) => {
    rejected = reject;
    const speed = Math.random() * 0.3;
    let percent = 0;
    cb?.(percent);
    const interval = window.setInterval(() => {
      percent = Math.min(percent + speed, 1);
      cb?.(percent);
      if (percent >= 1) {
        window.clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
  
  return [promised, cancel] as [typeof promised, typeof cancel];
};

interface VirtualFile {
  name: string;
  percent: number;
  status: 'done' | 'waiting' | 'pending';
}

const DownloaderPromise: FC = () => {

  const [files, setFiles] = useState<VirtualFile[]>([]);

  const downloadTrigger = useRef(useMemo(() => {
    return new Queue(3);
  }, []));

  const onClick = useCallback(() => {
    const filename = `${randomStr(files.length + 1)}.zip`; // 随机模拟一个文件名
    const newFile: VirtualFile = {
      name: filename,
      percent: 0,
      status: 'waiting',
    };
    setFiles(prev => {
      const next = [...prev];
      next.push(newFile);
      return next;
    });
    const [promised] = virtualDownload(percent => {
      newFile.percent = percent;
      newFile.status = percent >= 1 ? 'done' : 'pending';
      setFiles(prev => [...prev]);
    });
    downloadTrigger.current.enqueue(promised);
  }, [files.length]);

  return (
    <div>
      <div>
        <Button onClick={onClick}>添加下载任务</Button>
        <span>点击左侧按钮添加任务</span>
      </div>
      <ul className={styles.list}>
        {
          files.map(v => {
            return (
              <li key={v.name}>
                <span>{v.name}</span>
                <span className={styles.percent}>{(v.percent * 100).toFixed(2)}%</span>
                <span
                  className={combineClass(styles[v.status])}
                >{v.status === 'waiting' ? '等待中' : v.status === 'pending' ? '下载中' : '已完成'}</span>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export { DownloaderPromise };
