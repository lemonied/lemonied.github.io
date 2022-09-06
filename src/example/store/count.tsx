import { FC, useMemo } from 'react';
import { map } from 'rxjs';
import styled from 'styled-components';
import { useStore } from '@shared/stores';

const Wrapper = styled.div`
  margin-bottom: 20px;
  & > *:not(:first-child){
    margin-left: 10px;
  }
`;

export const CountExample: FC = () => {
  const [state, store] = useStore(1);

  const increase = useMemo(() => {
    return store?.pipeline(
      map(v => v + 1),
    );
  }, [store]);

  const reduce = useMemo(() => {
    return store?.pipeline(
      map(v => v - 1),
    );
  }, [store]);

  return (
    <Wrapper>
      <button onClick={() => increase?.next()}>增加</button>
      <button onClick={() => reduce?.next()}>减少</button>
      <span>count: { state }</span>
    </Wrapper>
  );
};
