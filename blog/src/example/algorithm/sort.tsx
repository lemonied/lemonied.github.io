import { FC, useMemo } from 'react';
import { bubbleSort, selectionSort, insertionSort } from '@shared/utils';
import { Code } from '@shared/components/mdx/Code';

const list1 = [1, 2, 50, 42, 32, 36, 39, 69, 89, 46];

export const Sort: FC = () => {

  const list1A = useMemo(() => {
    return bubbleSort(list1.slice(), 'ascend');
  }, []);
  const list1D = useMemo(() => {
    return bubbleSort(list1.slice(), 'descend');
  }, []);

  const list2A = useMemo(() => {
    return selectionSort(list1.slice(), 'ascend');
  }, []);
  const list2D = useMemo(() => {
    return selectionSort(list1.slice(), 'descend');
  }, []);

  const list3A = useMemo(() => {
    return insertionSort(list1.slice(), 'ascend');
  }, []);
  const list3D = useMemo(() => {
    return insertionSort(list1.slice(), 'descend');
  }, []);

  return (
    <div>
      <h3>原数据</h3>
      <Code language='json'>{ JSON.stringify(list1) }</Code>
      <h3>正序</h3>
      <ol>
        <li>
          <i>冒泡</i>
          <Code language='json'>{ JSON.stringify(list1A) }</Code>
        </li>
        <li>
          <i>选择</i>
          <Code language='json'>{ JSON.stringify(list2A) }</Code>
        </li>
        <li>
          <i>插入</i>
          <Code language='json'>{ JSON.stringify(list3A) }</Code>
        </li>
      </ol>
      <h3>倒序</h3>
      <ol>
        <li>
          <i>冒泡</i>
          <Code language='json'>{ JSON.stringify(list1D) }</Code>
        </li>
        <li>
          <i>选择</i>
          <Code language='json'>{ JSON.stringify(list2D) }</Code>
        </li>
        <li>
          <i>插入</i>
          <Code language='json'>{ JSON.stringify(list3D) }</Code>
        </li>
      </ol>
    </div>
  );
};
