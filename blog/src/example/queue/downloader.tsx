import { Button } from 'antd';
import { combineClass, randomStr } from '@shared/utils';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Subject, interval, tap, mergeMap, of, concat, takeWhile, Observable, scan } from 'rxjs';
import styles from './downloader.module.scss';

// 模拟下载过程
const virtualDownload = () => {
  const speed = Math.random() * 0.3;
  return interval(1000).pipe(
    scan((acc) => Math.min(1, acc + speed), 0),
    mergeMap((percent) => {
      if (percent >= 1) {
        return concat(of(percent), of(null));
      }
      return of(percent);
    }),
    takeWhile(v => typeof v === 'number'),
  ) as Observable<number>;
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
      mergeMap((value) => {
        return virtualDownload().pipe(
          tap((percent) => {
            value.percent = percent;
            value.status = percent < 1 ? 'pending' : 'done';
            setFiles(prev => [...prev]);
          }),
        );
      }, 3), // 3为最大并发数
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
