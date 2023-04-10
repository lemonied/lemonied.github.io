
type SortRule = 'descend' | 'ascend';

// 冒泡排序（默认升序）
export function bubbleSort(list: number[], rule: SortRule = 'ascend') {
  let i = list.length - 1;
  while (i > 0) {
    let position = 0; // 记录最后一次发生交换的位置，大于position的部分说明无需排序
    for (let j = 0; j < i; j += 1) {
      const condition = rule === 'ascend' ? (list[j] > list[j + 1]) : (list[j] < list[j + 1]);
      if (condition) {
        position = j;
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
    i = position;
  }
  return list;
}

// 选择排序
export function selectionSort(list: number[], rule: SortRule = 'ascend') {
  let i = list.length - 1;
  while (i > 0) {
    let index = i;
    let target = list[i];
    for (let j = 0; j < i; j += 1) {
      if (rule === 'ascend' ? (list[j] > target) : (list[j] < target)) {
        index = j;
        target = list[j];
      }
    }
    // 每次循环都把最大/最小的值放到末尾
    list[index] = list[i];
    list[i] = target;
    i -= 1;
  }
  return list;
}
