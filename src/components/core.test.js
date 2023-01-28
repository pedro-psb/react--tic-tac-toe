import { TicTacBoard } from "./core.js";

describe("TicTacBoard core functionality", () => {
  it("initializes succesfully", () => {
    const board = TicTacBoard.initGame();
    let size = 0;
    board.matrix.forEach((i) =>
      i.forEach((j) => {
        size += 1;
      })
    );
    expect(size).toBe(9);
    expect(board.matrix[0][0]).toBe(null);
  });

  it("can mark X and O alternatively", () => {
    const board = new TicTacBoard();

    let game_state = board.markCell(1, 1);
    expect(game_state.matrix[0][0]).toBe("X");

    game_state = board.markCell(1, 2);
    expect(game_state.matrix[0][1]).toBe("O");

    game_state = board.markCell(1, 3);
    expect(game_state.matrix[0][2]).toBe("X");
  });

  it("can't override a already marked cell", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(1, 1);
    expect(game_state.matrix[0][0]).toBe("X");
    expect(() => board.markCell(1, 1)).toThrow();
  });

  it("correctly check row win", () => {
    const board = new TicTacBoard();

    let game_state = board.markCell(1, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(2, 1);
    game_state = board.markCell(1, 2);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(2, 2);
    game_state = board.markCell(1, 3);
    expect(game_state.winner).toBe("X");
  });

  it("correctly check col win", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(1, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(1, 2);
    game_state = board.markCell(2, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(2, 2);
    game_state = board.markCell(3, 1);
    expect(game_state.winner).toBe("X");
  });

  it("correctly check diagonal win", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(1, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(2, 1);
    game_state = board.markCell(2, 2);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(3, 1);
    game_state = board.markCell(3, 3);
    expect(game_state.winner).toBe("X");
  });

  it("finishes the game if it is a tie", () => {
    const board = new TicTacBoard();

    let game_state = board.markCell(1, 1);
    game_state = board.markCell(2, 2);
    game_state = board.markCell(3, 3);

    game_state = board.markCell(1, 2);
    game_state = board.markCell(1, 3);
    game_state = board.markCell(3, 1);
    game_state = board.markCell(3, 2);

    game_state = board.markCell(2, 3);
    game_state = board.markCell(2, 1);
    expect(game_state.winner).toBe("tie");
  });
});
