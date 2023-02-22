import { FC, useMemo } from 'react';
import styles1 from './demo1.module.scss';
import styles2 from './demo2.module.scss';
import styles3 from './demo3.module.scss';
import styled from 'styled-components';

const getStyles = (num: number) => {
  const list = [styles1, styles2, styles3];
  return list[num % list.length];
};

const Wrapper = styled.div`
  .item{
    border: 1px solid #d9d9d9;
    text-align: center;
    font-size: 2rem;
    line-height: 4em;
  }
`;

interface Props {
  styl: number;
}
export const GridExample: FC<Props> = (props) => {

  const { styl = 0 } = props;

  const styles = useMemo(() => {
    return getStyles(styl);
  }, [styl]);

  return (
    <Wrapper className={styles.container} style={{ marginBottom: 20 }}>
      {
        new Array(10).fill(1).map((_, k) => (
          <div key={k} className={'item'}>
            <span>{k + 1}</span>
          </div>
        ))
      }
    </Wrapper>
  );
};
