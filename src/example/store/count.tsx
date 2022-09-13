import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '@shared/stores';
import { useSubject } from '@shared/hooks/observable';

const Wrapper = styled.div`
  margin-bottom: 20px;
  & > *:not(:first-child){
    margin-left: 10px;
  }
`;

export const CountExample: FC = () => {
  const [state, store] = useStore(1);

  const increase = useSubject((action) => action.pipe(
    store.map(() => store.state + 1),
  ), [store]);

  const reduce = useSubject((action) => action.pipe(
    store.map(() => store.state - 1),
  ), [store]);

  return (
    <Wrapper>
      <button onClick={() => increase?.next()}>增加</button>
      <button onClick={() => reduce?.next()}>减少</button>
      <span>count: { state }</span>
    </Wrapper>
  );
};
