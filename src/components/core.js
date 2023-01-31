// includes the core logic for tic-tac-toe
import { wins } from "../utils/utils";

export class TicTacBoard {
  #matrix;
  #winner;
  #moves;

  constructor({
    matrix = null,
    winner = null,
    x_turn = true,
    moves = 0,
    highligh_matrix,
    messages = null,
  } = {}) {
    this.#matrix = matrix ? this.#load_matrix(matrix) : this.#init_matrix();
    this.x_turn = x_turn;
    this.messages = messages ? messages : [];
    this.#winner = winner ? winner : null;
    this.#moves = moves;
    this.highligh_matrix = highligh_matrix
      ? highligh_matrix
      : TicTacBoard._empty_matrix();
  }

  // API

  markCell(row, col) {
    // check for winner
    if (this.#winner) {
      this.messages.push({ type: "error", content: "Game is already over" });
      return this.game_state;
      // throw Error("Game is already over");
    }

    // mark cell
    let cell = this.getCell(row, col);
    if (!cell.isMarked()) {
      this.messages = [];
      if (this.x_turn) {
        cell.markX();
      } else {
        cell.markO();
      }
      this.#moves += 1;
      this.x_turn = !this.x_turn;
      this.#check_for_win();
    } else {
      this.messages.push({
        type: "Error",
        content: "Cell already marked",
      });
    }
    // Anyway, return game_state
    return this.game_state;
  }

  // 1 indexed value
  // consider creating a static method for this and protecting getCell
  getCell(row, col) {
    this.#validate(row, col);
    return this.#matrix[row][col];
  }

  // TODO avoid this code duplication
  static _empty_matrix() {
    return Array.from(Array(3), (row) => Array(3).fill(null));
  }

  static initGame() {
    const empty_matrix = TicTacBoard._empty_matrix();
    return {
      matrix: empty_matrix,
      highligh_matrix: empty_matrix,
      winner: null,
      x_turn: true,
      moves: 0,
      messages: [],
    };
  }

  get game_state() {
    return {
      matrix: [...this.#matrix.map((row) => row.map((cell) => cell.mark))],
      highligh_matrix: this.highligh_matrix,
      winner: this.#winner,
      x_turn: this.x_turn,
      moves: this.#moves,
      messages: this.messages,
    };
  }

  // Utils

  // TODO imporve this to check only row,col and diagonal of current move pos
  #check_for_win() {
    if (this.#moves > 4 && this.#moves < 9) {
      for (const win of wins) {
        // win check
        const first_mark = this.getCell(win[0][0], win[0][1]).mark;
        const second_mark = this.getCell(win[1][0], win[1][1]).mark;
        const third_mark = this.getCell(win[2][0], win[2][1]).mark;
        const has_win =
          first_mark &&
          first_mark === second_mark &&
          second_mark === third_mark;

        // win dispatch
        if (has_win) {
          this.#winner = first_mark;

          // highlight winning stroke
          win.forEach(
            (pair) => (this.highligh_matrix[pair[0]][pair[1]] = true)
          );

          // push message
          this.messages.push({
            type: "info",
            content: `player ${first_mark} is the winner!`,
          });
          break;
        }
      }
    } else if (this.#moves === 9) {
      this.#winner = "tie";
    }
  }

  #init_matrix() {
    let fresh_matrix = [];
    for (let i = 0; i < 3; i++) {
      fresh_matrix.push([]);
      for (let j = 0; j < 3; j++) {
        fresh_matrix[i].push(new Tile());
      }
    }
    return fresh_matrix;
  }

  // the internal matrix should contain Tile objects
  #load_matrix(matrix) {
    const internal_matrix = matrix.map((row) =>
      row.map((col) => {
        return col !== "" ? new Tile(col) : new Tile();
      })
    );
    return internal_matrix;
  }

  #validate(row, col) {
    if (row > 2 || col > 2 || row < 0 || col < 0) {
      throw Error("Invalid row/col indexes. Board sizes is 3x3");
    }
  }

  // Static
}

export class Tile {
  #state;

  constructor(state = null) {
    if (state && !"XO".includes(state)) {
      throw Error("Invalid mark");
    }
    this.#state = state;
  }

  markX() {
    this.#state = "X";
  }

  markO() {
    this.#state = "O";
  }

  isMarked() {
    return Boolean(this.#state);
  }

  get mark() {
    return this.#state;
  }

  toString() {
    return this.#state;
  }
}
