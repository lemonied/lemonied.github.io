import { FC } from 'react';
import styled from 'styled-components';
import { createStore, useRxState, useAction } from '@shared/stores';
import { debounce, delay, of, switchMap, timer } from 'rxjs';

const Wrapper = styled.div`
  margin-bottom: 20px;
  & > *:not(:first-child){
    margin-left: 10px;
  }
`;

const store = createStore(''); // 也可以在组件外创建，这样就可以全局共享状态数据了

export const DebounceExample: FC = () => {

  const state = useRxState(store);

  const [action] = useAction<string>((action) => action.pipe(
    debounce(() => timer(500)), // 500毫秒内的按键，只有最后一次会被触发
    switchMap((res) => of(res).pipe(delay(Math.random() * 1000))), // 模拟接口返回延迟，随机 0ms - 1000ms
    store.tap,
  ).subscribe(), []);

  return (
    <Wrapper>
      <input type="text" placeholder={'请输入关键字'} onChange={e => action?.next(e.target.value)} />
      <span>value: {state}</span>
    </Wrapper>
  );
};
