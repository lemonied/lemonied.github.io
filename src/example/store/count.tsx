import { FC } from 'react';
import styled from 'styled-components';
import { useAction, useStore } from '@shared/stores';

const Wrapper = styled.div`
  margin-bottom: 20px;
  & > *:not(:first-child){
    margin-left: 10px;
  }
`;

export const CountExample: FC = () => {
  const [state, store] = useStore(1);

  const [increase] = useAction((action) => action.pipe(
    store.map(() => store.state + 1),
  ).subscribe(), [store]);

  const [reduce] = useAction((action) => action.pipe(
    store.map(() => store.state - 1),
  ).subscribe(), [store]);

  return (
    <Wrapper>
      <button onClick={() => increase?.next()}>增加</button>
      <button onClick={() => reduce?.next()}>减少</button>
      <span>count: { state }</span>
    </Wrapper>
  );
};
