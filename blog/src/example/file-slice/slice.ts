import SparkMD5 from 'spark-md5';
import { Observable } from 'rxjs';

export interface SlicedFile {
  md5: string;
  chunks: Blob[];
}

export function fileSlice(file: File, sliceSize: number/* byte */) {
  return new Observable<[number, SlicedFile | null]>(subscriber => {
    const spark = new SparkMD5.ArrayBuffer();
    const maxCount = Math.ceil(file.size / sliceSize);
    const chunks: Blob[] = [];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      spark.append(e.target!.result as ArrayBuffer);
      loadNext();
    };
    fileReader.onerror = (err) => {
      subscriber.error(err);
    };
    const loadNext = () => {
      if (chunks.length < maxCount) {
        const start = chunks.length * sliceSize;
        subscriber.next([Math.min(1, start / file.size), null]);
        const end = Math.min(start + sliceSize, file.size);
        const blob = file.slice(start, end);
        fileReader.readAsArrayBuffer(blob);
        chunks.push(blob);
      } else {
        subscriber.next([1, { md5: spark.end(), chunks }]);
        subscriber.complete();
      }
    };
    loadNext();
    return {
      unsubscribe() {
        fileReader.abort();
      },
    };
  });
}
