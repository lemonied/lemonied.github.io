import { FC, useMemo } from 'react';
import { bubbleSort, selectionSort } from '@shared/utils';
import { Code } from '@shared/components/mdx/Code';

const list1 = [1, 2, 50, 42, 32, 36, 39, 69, 89, 46];

export const BubbleSort: FC = () => {

  const list1A = useMemo(() => {
    return bubbleSort(list1.slice(), 'ascend');
  }, []);

  const list1D = useMemo(() => {
    return bubbleSort(list1.slice(), 'descend');
  }, []);

  return (
    <div>
      <h3>原数据</h3>
      <Code language='json'>{ JSON.stringify(list1) }</Code>
      <h3>正序</h3>
      <Code language='json'>{ JSON.stringify(list1A) }</Code>
      <h3>倒序</h3>
      <Code language='json'>{ JSON.stringify(list1D) }</Code>
    </div>
  );
};

export const SelectionSort: FC = () => {

  const list1A = useMemo(() => {
    return selectionSort(list1.slice(), 'ascend');
  }, []);

  const list1D = useMemo(() => {
    return selectionSort(list1.slice(), 'descend');
  }, []);

  return (
    <div>
      <h3>原数据</h3>
      <Code language='json'>{ JSON.stringify(list1) }</Code>
      <h3>正序</h3>
      <Code language='json'>{ JSON.stringify(list1A) }</Code>
      <h3>倒序</h3>
      <Code language='json'>{ JSON.stringify(list1D) }</Code>
    </div>
  );
};
