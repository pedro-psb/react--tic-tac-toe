import Board from "./Board.js";
import { TicTacBoard } from "./core.js";

export function BoardMockup() {
  const board1 = new TicTacBoard();
  const board2 = new TicTacBoard();
  const board3 = new TicTacBoard();
  const board4 = new TicTacBoard();
  board2.markCell(0, 0);

  board3.markCell(0, 0);
  board3.markCell(0, 1);
  board3.markCell(0, 2);

  board4.markCell(0, 0);
  board4.markCell(1, 0);
  board4.markCell(0, 1);
  board4.markCell(1, 1);
  board4.markCell(0, 2);
  const highlight_matrix = TicTacBoard.initGame().matrix;
  highlight_matrix[0][0] = "X";
  highlight_matrix[0][1] = "X";
  highlight_matrix[0][2] = "X";

  return (
    <div className="App">
      <Board board_matrix={board1.game_state.matrix} />
      <hr />
      <Board board_matrix={board2.game_state.matrix} />
      <hr />
      <Board board_matrix={board3.game_state.matrix} />
      <hr />
      <Board
        board_matrix={board4.game_state.matrix}
        highlight_matrix={highlight_matrix}
      />
      <hr />
      <Board
        board_matrix={board4.game_state.matrix}
        highlight_matrix={highlight_matrix}
        theme="tie"
      />
    </div>
  );
}
