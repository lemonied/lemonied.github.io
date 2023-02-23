import { Button } from '@shared/components/button';
import { combineClass, randomStr } from '@shared/utils';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mergeScan, Subject, interval, takeUntil, tap, mergeMap, of } from 'rxjs';
import styles from './downloader.module.scss';

// 模拟下载过程
const virtualDownload = (onProgress: (percent: number) => void) => {
  const subject = new Subject<void>();
  let percent = 0;
  const speed = Math.random() * 0.3;
  return interval(1000).pipe(
    tap(() => {
      percent = Math.min(1, percent + speed);
      onProgress(percent);
      if (percent >= 1) {
        subject.next();
        subject.complete();
      }
    }),
    takeUntil(subject),
  );
};

interface VirtualFile {
  name: string;
  percent: number;
  status: 'done' | 'waiting' | 'pending';
}

const Downloader: FC = () => {

  const [files, setFiles] = useState<VirtualFile[]>([]);

  const downloadTrigger = useRef(useMemo(() => {
    return new Subject<string>();
  }, []));

  const onClick = useCallback(() => {
    const filename = `${randomStr(files.length + 1)}.zip`; // 随机模拟一个文件名
    downloadTrigger.current.next(filename);
  }, [files.length]);

  useEffect(() => {
    const subscription = downloadTrigger.current.pipe(
      mergeMap(name => {
        const newFile: VirtualFile = {
          name,
          percent: 0,
          status: 'waiting',
        };
        setFiles(prev => {
          const next = [...prev];
          next.push(newFile);
          return next;
        });
        return of(newFile);
      }),
      mergeScan((acc, value) => {
        return virtualDownload(percent => {
          value.percent = percent;
          value.status = percent < 1 ? 'pending' : 'done';
          setFiles(prev => [...prev]);
        });
      }, 0, 3),
    ).subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

export { Downloader };
