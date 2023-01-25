import { TicTacBoard } from "./core.js";

describe("TicTacBoard core functionality", () => {
  let board = new TicTacBoard();
  beforeEach(() => {
    board = new TicTacBoard();
  });

  // Finish setup

  it("initializes succesfully", () => {
    let size = 0;
    board.matrix.forEach((i) =>
      i.forEach((j) => {
        size += 1;
      })
    );
    expect(size).toBe(9);
    expect(board.getCell(1, 1).mark).toBe(null);
  });

  it("can mark X and O alternatively", () => {
    expect(board.getCell(1, 1).mark).toBeNull();
    expect(board.getCell(1, 2).mark).toBeNull();

    board.markCell(1, 1);
    expect(board.getCell(1, 1).mark).toBe("X");

    board.markCell(1, 2);
    expect(board.getCell(1, 2).mark).toBe("O");

    board.markCell(1, 3);
    expect(board.getCell(1, 3).mark).toBe("X");
  });

  it("can't override a already marked cell", () => {
    board.markCell(1, 1);
    expect(board.getCell(1, 1).mark).toBe("X");
    expect(() => board.markCell(1, 1)).toThrow();
  });

  it("correctly check row win", () => {
    board.markCell(1, 1);
    expect(board.winner).toBe(null);
    board.markCell(2, 1);
    board.markCell(1, 2);
    expect(board.winner).toBe(null);
    board.markCell(2, 2);
    board.markCell(1, 3);
    expect(board.winner).toBe("X");
  });

  it("correctly check col win", () => {
    board.markCell(1, 1);
    expect(board.winner).toBe(null);
    board.markCell(1, 2);
    board.markCell(2, 1);
    expect(board.winner).toBe(null);
    board.markCell(2, 2);
    board.markCell(3, 1);
    expect(board.winner).toBe("X");
  });

  it("correctly check diagonal win", () => {
    board.markCell(1, 1);
    expect(board.winner).toBe(null);
    board.markCell(2, 1);
    board.markCell(2, 2);
    expect(board.winner).toBe(null);
    board.markCell(3, 1);
    board.markCell(3, 3);
    expect(board.winner).toBe("X");
  });

  it("finishes the game if it is a tie", () => {
    board.markCell(1, 1);
    board.markCell(2, 2);
    board.markCell(3, 3);

    board.markCell(1, 2);
    board.markCell(1, 3);
    board.markCell(3, 1);
    board.markCell(3, 2);

    board.markCell(2, 3);
    board.markCell(2, 1);
    expect(board.winner).toBe("tie");
  });
});
