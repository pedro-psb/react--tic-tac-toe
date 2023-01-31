import { TicTacBoard, Tile } from "./core.js";

const row_win_moves = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
  [0, 2],
];
const tie_moves = [
  [0, 0],
  [0, 1],
  [0, 2],
  [2, 0],
  [2, 1],
  [2, 2],
  [1, 0],
  [1, 1],
  [1, 2],
];

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

    let game_state = board.markCell(0, 0);
    expect(game_state.matrix[0][0]).toBe("X");

    game_state = board.markCell(0, 1);
    expect(game_state.matrix[0][1]).toBe("O");

    game_state = board.markCell(0, 2);
    expect(game_state.matrix[0][2]).toBe("X");
  });

  it("can't override an already marked cell", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(0, 0);
    board.markCell(0, 0);
    expect(game_state.matrix[0][0]).toBe("X");
    expect(game_state.messages[0].type).toMatch(/error/i);
  });

  it("initializes Tile correctly when given 'X' or 'O'", () => {
    const tileX = new Tile("X");
    const tileO = new Tile("O");
    const tileEmpty = new Tile();

    expect(tileX.mark).toBe("X");
    expect(tileO.mark).toBe("O");
    expect(tileEmpty.mark).toBeNull();
  });

  it("initializes TicTacBoard correctly when given an {...game_state}", () => {
    const board = new TicTacBoard();
    const game_state = board.markCell(0, 0);

    const board2 = new TicTacBoard({ ...game_state });
    const game_state2 = board2.game_state;
    expect(game_state2.matrix[0][0]).toBe("X");
  });
});

describe("TicTacBoard wins", () => {
  it("correctly check row win", () => {
    const board = new TicTacBoard();

    let game_state = board.markCell(0, 0);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(1, 0);
    game_state = board.markCell(0, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(1, 1);
    game_state = board.markCell(0, 2);
    expect(game_state.winner).toBe("X");
  });

  it("correctly check col win", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(0, 0);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(0, 1);
    game_state = board.markCell(1, 0);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(1, 1);
    game_state = board.markCell(2, 0);
    expect(game_state.winner).toBe("X");
  });

  it("correctly check diagonal win", () => {
    const board = new TicTacBoard();
    let game_state = board.markCell(0, 0);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(1, 0);
    game_state = board.markCell(1, 1);
    expect(game_state.winner).toBe(null);
    game_state = board.markCell(2, 0);
    game_state = board.markCell(2, 2);
    expect(game_state.winner).toBe("X");
  });

  it("finishes the game if it is a tie", () => {
    const board = new TicTacBoard();
    tie_moves.forEach((pair) => board.markCell(pair[0], pair[1]));
    expect(board.game_state.winner).toBe("tie");
  });

  it("highlights the winning strike", () => {
    const board = new TicTacBoard();
    row_win_moves.forEach((pair) => board.markCell(pair[0], pair[1]));
    expect(board.game_state.highligh_matrix[0][0]).toBeTruthy();
    expect(board.game_state.highligh_matrix[0][1]).toBeTruthy();
    expect(board.game_state.highligh_matrix[0][2]).toBeTruthy();
    expect(board.game_state.highligh_matrix[1][0]).toBeNull();
  });
});

describe("TicTacBoard bugs", () => {
  it("should not announces winning before end", () => {
    // it was causes by wrongly asserting three null values as a win
    const board = new TicTacBoard();
    const buggy_moves = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
    ];
    buggy_moves.forEach((pos) => board.markCell(pos[0], pos[1]));
    board.markCell(1, 1);
    expect(board.game_state.winner).toBeFalsy();
  });
});
