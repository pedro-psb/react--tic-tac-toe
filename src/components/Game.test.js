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
    const cell = getCell(tiles, 1, 1);
    const cell2 = getCell(tiles, 2, 1);
    const cell3 = getCell(tiles, 3, 1);
    userEvent.click(cell);
    userEvent.click(cell2);
    userEvent.click(cell3);
    expect(cell).toHaveTextContent("X");
    expect(cell2).toHaveTextContent("O");
    expect(cell3).toHaveTextContent("X");
  });

  it("clicking a marked cell does not toggle it and show error msg", () => {
    // render(<Game />);
    // const tiles = screen.getAllByRole("cell");
    // const cell = getCell(tiles, 1, 1);
    // const cell2 = getCell(tiles, 2, 1);
    // const cell3 = getCell(tiles, 3, 1);
    // userEvent.click(cell);
    // userEvent.click(cell2);
    // userEvent.click(cell3);
    // expect(cell).toHaveTextContent("X");
    // expect(cell2).toHaveTextContent("O");
    // expect(cell3).toHaveTextContent("X");
  });

  it("winning a game freezes the board and shows won-state", () => {
    const board = new TicTacBoard();
    // simulate user cliking marked cell
  });

  it("a tie game freezes the board and shows tie-state", () => {
    const board = new TicTacBoard();
    // simulate user cliking marked cell
  });
});
