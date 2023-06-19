import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ShadowCard } from '@shared/components/card';
import { Sudoku } from './core';
import styled from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled(ShadowCard)`
  padding: 20px;
  margin: 0 0 20px 0;
  .boards{
    border-collapse: collapse;
    .row{
      display: flex;
    }
    .item{
      width: 50px;
      height: 50px;
      vertical-align: middle;
      text-align: center;
    }
  }
`;

const SudokuDashboard: FC = () => {

  const sudoku = useMemo(() => new Sudoku([
    [null, null, null, null, 6, null, 4, null, null],
    [null, 2, null, null, 5, 1, null, null, null],
    [null, 9, null, null, null, null, 6, null, 7],
    [7, null, 5, null, null, null, 9, null, null],
    [null, null, null, 2, null, 4, null, null, null],
    [null, null, 2, null, null, null, 3, null, 6],
    [1, null, 9, null, null, null, null, 5, null],
    [null, null, null, 9, 1, null, null, 3, null],
    [null, null, 8, null, 7, null, null, null, null],
  ]), []);

  const [boards, setBoards] = useState(sudoku.boards);

  const sync = useCallback(() => {
    sudoku.async(res => {
      setBoards([...res]);
    }).catch(() => {
      // abort
    });
  }, [sudoku]);

  useEffect(() => {
    return () => sudoku.destroy();
  }, [sudoku]);

  return (
    <Wrapper>
      <table className={'boards'}>
        <tbody>
          {
            boards.map((row, key) => {
              return (
                <tr key={key} className={'row'}>
                  {
                    row.map((v, k) => {
                      return (
                        <td key={k} className={'item'}>{ v }</td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <Button onClick={sync}>开始</Button>
    </Wrapper>
  );
};

export { SudokuDashboard };
