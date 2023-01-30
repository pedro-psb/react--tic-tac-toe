import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getFromMatrix as getCell } from "../utils/utils.js";
import Game from "./Game.js";
import { TicTacBoard } from "./core.js";

describe("Game controller", () => {
  it("Renders the game correctly", () => {
    render(<Game />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("clicking an empty cell toggles it", () => {
    render(<Game />);
    const tiles = screen.getAllByRole("cell");
    const cell = getCell(tiles, 0, 0);
    const cell2 = getCell(tiles, 1, 0);
    const cell3 = getCell(tiles, 2, 0);
    userEvent.click(cell);
    userEvent.click(cell2);
    userEvent.click(cell3);
    expect(cell).toHaveTextContent("X");
    expect(cell2).toHaveTextContent("O");
    expect(cell3).toHaveTextContent("X");
  });

  it("shows error msg when cell is clicked twice", () => {
    render(<Game />);
    const tiles = screen.getAllByRole("cell");
    const cell = getCell(tiles, 0, 0);
    userEvent.click(cell);
    userEvent.click(cell);
    expect(cell).toHaveTextContent("X");
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("hide error msg when valid move is done after an invalid one", () => {
    render(<Game />);
    const tiles = screen.getAllByRole("cell");
    const cell = getCell(tiles, 0, 0);
    const cell2 = getCell(tiles, 1, 0);
    userEvent.click(cell);
    userEvent.click(cell);
    userEvent.click(cell2);
    expect(cell).toHaveTextContent("X");
    expect(cell2).toHaveTextContent("O");
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it("winning a game freezes the board and shows won-state", () => {
    render(<Game />);
    const tiles = screen.getAllByRole("cell");
    userEvent.click(getCell(tiles, 0, 0));
    userEvent.click(getCell(tiles, 1, 0));
    userEvent.click(getCell(tiles, 0, 1));
    userEvent.click(getCell(tiles, 1, 1));
    userEvent.click(getCell(tiles, 0, 2));
    expect(screen.getByText(/w[io]n/i)).toBeInTheDocument();
    //should display error message that the game is over
    userEvent.click(getCell(tiles, 1, 2));
    expect(screen.getByText(/over/i)).toBeInTheDocument();
  });

  it("a tie game freezes the board and shows tie-state", () => {
    const board = new TicTacBoard();
    // simulate user cliking marked cell
  });
});
