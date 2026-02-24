export type Board = Array<Array<boolean>>;

export const initEmptyBoard = (rows: number, cols: number): Board => {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};

export const calculateNextState = (board: Board): Board => {
  const [rows, cols] = [board.length, board[0].length];
  const nextBoard = initEmptyBoard(rows, cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const prevR = (r + rows - 1) % rows;
      const nextR = (r + 1) % rows;
      const prevC = (c + cols - 1) % cols;
      const nextC = (c + 1) % cols;

      const livingNeighbors = [
        board[prevR][prevC],
        board[prevR][c],
        board[prevR][nextC],
        board[r][prevC],
        // board[r][c], // self not a neighbor
        board[r][nextC],
        board[nextR][prevC],
        board[nextR][c],
        board[nextR][nextC],
      ].reduce((acc, val, arr_) => {
        return acc + (val ? 1 : 0);
      }, 0);

      // Underpopulation: Any live cell with fewer than 2 live neighbors dies (as if by loneliness).
      // Survival: Any live cell with exactly 2 or 3 live neighbors remains alive.
      // Overpopulation: Any live cell with more than 3 live neighbors dies (as if by overcrowding).
      // Reproduction: Any dead cell with exactly 3 live neighbors becomes alive (as if by birth).
      if (livingNeighbors < 2) {
        nextBoard[r][c] = false;
      } else if (livingNeighbors > 3) {
        nextBoard[r][c] = false;
      } else if (livingNeighbors === 2) {
        nextBoard[r][c] = board[r][c];
      } else if (livingNeighbors === 3) {
        nextBoard[r][c] = true;
      }
    }
  }
  return nextBoard;
};

export default {
  initEmptyBoard,
  calculateNextState,
};

