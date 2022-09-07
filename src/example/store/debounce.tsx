import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { createStore, useStore } from '@shared/stores';
import { debounce, delay, of, switchMap, timer } from 'rxjs';

const Wrapper = styled.div`
  margin-bottom: 20px;
  & > *:not(:first-child){
    margin-left: 10px;
  }
`;

const inputStore = createStore(''); // 也可以在组件外创建，这样就可以全局共享状态数据了

export const DebounceExample: FC = () => {

  const [state, store] = useStore(inputStore);

  const search$ = useMemo(() => {
    return store?.pipeline<string>(source => source.pipe(
      debounce(() => timer(500)), // 500毫秒内的按键，只有最后一次会被触发
      switchMap((res) => of(res).pipe(delay(Math.random() * 1000))), // 模拟接口返回延迟，随机 0ms - 1000ms
    ));
  }, [store]);

  return (
    <Wrapper>
      <input type="text" placeholder={'请输入关键字'} onChange={e => search$?.next(e.target.value)} />
      <span>value: {state}</span>
    </Wrapper>
  );
};
