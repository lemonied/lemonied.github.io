import { FC, useCallback } from 'react';
import { useTrailed } from '@shared/utils';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 0 20px 0;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;
export const TrailedExample: FC = () => {

  const counting = useTrailed((callback) => {
    return (num: number) => {
      // eslint-disable-next-line no-console
      console.log(num);
      callback(() => {
        // eslint-disable-next-line no-console
        console.log('Complete!');
      });
    };
  }, []);
  
  const count = useCallback((len: number) => {
    for (let i = 1; i <= len; i += 1) {
      counting(i);
    }
  }, [counting]);

  return (
    <Wrapper>
      <button onClick={() => count(5)}>5次打印</button>
      <button onClick={() => count(10)}>10次打印</button>
    </Wrapper>
  );
};
