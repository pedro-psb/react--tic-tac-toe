import { render, screen } from "@testing-library/react";
import Board from "../components/Board.js";
import { getFromMatrix } from "../utils/utils.js";

describe("Board components", () => {
  test("initial render contain 9x9 empty square elements", () => {
    render(<Board />);
    const squares = screen.getAllByRole("cell");
    const first_cell = getFromMatrix(squares, 0, 0);
    expect(squares).toHaveLength(9);
    expect(first_cell).toHaveTextContent("");
  });
});
