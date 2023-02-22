import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { fileSlice, SlicedFile } from './slice';
import { Subscription } from 'rxjs';

const UploadExample: FC = () => {

  const [process, setProcess] = useState('');
  const sliceRef = useRef<Subscription>();
  const [slicedFile, setSlicedFile] = useState<SlicedFile | null>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    if (file) {
      sliceRef.current?.unsubscribe();
      sliceRef.current = fileSlice(e.target!.files![0], 10 * 1024 * 1024).subscribe(([percent, sliced]) => {
        setProcess((percent * 100).toFixed(2));
        setSlicedFile(sliced);
      });
    }
  }, []);

  useEffect(() => {
    return () => sliceRef.current?.unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <input type="file" onChange={onChange} />
      {
        process ?
          <div style={{ padding: '10px 0' }}>正在读取：{ process }</div> :
          null
      }
      {
        slicedFile ?
          <div style={{ padding: '10px 0' }}>文件MD5值：{ slicedFile.md5 }，共切分成{ slicedFile.chunks.length }个小文件</div> :
          null
      }
    </div>
  );
};

export { UploadExample };
