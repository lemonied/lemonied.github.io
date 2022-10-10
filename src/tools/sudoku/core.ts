import { sleep } from '@shared/utils';

class Sudoku {
  static readonly nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  static readonly square = 9;
  static generateEmptyBoards() {
    return new Array(Sudoku.square).fill(null).map(() => new Array(Sudoku.square).fill(null)) as (null | number)[][];
  }
  private row = 0;
  private column = 0;
  private original = Sudoku.generateEmptyBoards();
  private direction: 'forward' | 'back' = 'forward';

  public boards = Sudoku.generateEmptyBoards();

  constructor(boards: (null | number)[][] = []) {
    this.init(boards);
  }

  public init(boards: (null | number)[][]) {
    for (let i = 0; i < this.original.length; i += 1) {
      for (let j = 0; j < this.original[i].length; j += 1) {
        this.original[i][j] = boards?.[i]?.[j] ?? null;
      }
    }
    this.reset();
  }
  public reset() {
    this.row = 0;
    this.column = 0;
    this.boards = this.original.map(row => [...row]);
  }
  public fill() {
    if (this.original[this.row][this.column] === null) {
      const rows = this.boards[this.row];
      const columns = this.boards.map(row => row[this.column]);
      const startColumn = this.column - this.column % 3;
      const startRow = this.row - this.row % 3;
      const squares = this.boards.reduce((pre, current, index) => {
        if (index >= startRow && index < startRow + 3) {
          pre.push(...current.slice(startColumn, startColumn + 3));
        }
        return pre;
      }, [] as (number | null)[]);
      const availableNums = Sudoku.nums.filter(num => !rows.includes(num) && !columns.includes(num) && !squares.includes(num));
      const available = availableNums.find(num => {
        const current = this.boards[this.row][this.column];
        return current === null || num > current;
      });
      if (available) {
        this.boards[this.row][this.column] = available;
        this.direction = 'forward';
      } else {
        this.boards[this.row][this.column] = null;
        this.direction = 'back';
      }
    }
  }
  public async async(cb?: (boards: (number | null)[][]) => void, millisecond = 0) {
    this.reset();
    while (this.row < Sudoku.square && this.row >= 0) {
      if (this.column > Sudoku.square - 1) {
        this.row += 1;
        this.column = 0;
        continue;
      }
      if (this.column < 0) {
        this.row -= 1;
        this.column = Sudoku.square - 1;
        continue;
      }
      this.fill();
      await sleep(millisecond);
      this.column = this.direction === 'forward' ? this.column + 1 : this.column - 1;
      cb?.(this.boards);
    }
    if (this.row < 0) {
      throw new Error('无解');
    }
  }
}

export { Sudoku };
