import { render, screen } from "@testing-library/react";
import Board from "../components/Board.js";
import { getFromMatrix } from "../utils/utils.js";
import { TicTacBoard } from "./core.js";

describe("Board components", () => {
  test("initial render contain 9x9 empty square elements", () => {
    const board = new TicTacBoard();
    render(<Board board_matrix={board.matrix} />);
    const squares = screen.getAllByRole("cell");
    const first_cell = getFromMatrix(squares, 0, 0);
    expect(squares).toHaveLength(9);
    expect(first_cell).toHaveTextContent("");
  });
});
