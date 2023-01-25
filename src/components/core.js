// includes the core logic for tic-tac-toe
import { wins } from "../utils/utils";

export class TicTacBoard {
  #matrix;
  #winner;
  #moves;
  constructor(matrix_array = null, x_turn = true) {
    this.#matrix = matrix_array ? matrix_array : this.#init_matrix();
    this.x_turn = x_turn;
    this.#winner = null;
    this.#moves = 0;
  }

  // API

  markCell(row, col) {
    let cell = this.getCell(row, col);
    if (!cell.isMarked()) {
      if (this.x_turn) {
        cell.markX();
      } else {
        cell.markO();
      }
      this.#moves += 1;
      this.x_turn = !this.x_turn;
      this.#check_for_win();
    } else {
      throw Error("cell already marked");
    }
  }

  // 1 indexed value
  // consider creating a static method for this and protecting getCell
  getCell(row, col) {
    this.#validate(row, col);
    if (this.#winner) {
      throw Error("Game is already over");
    }
    return this.#matrix[row - 1][col - 1];
  }

  // Getter and setter

  // considering returning a copy to protect from external side-effects
  // on the board internal structure
  get matrix() {
    return [...this.#matrix.map((row) => row.map((cell) => cell.mark))];
  }

  get winner() {
    return this.#winner;
  }

  // Utils

  // TODO imporve this to check only row,col and diagonal of current move pos
  #check_for_win() {
    if (this.#moves > 4 && this.#moves < 9) {
      for (const win of wins) {
        const first_mark = this.getCell(win[0][0], win[0][1]).mark;
        const second_mark = this.getCell(win[1][0], win[1][1]).mark;
        const third_mark = this.getCell(win[2][0], win[2][1]).mark;
        const has_win =
          first_mark === second_mark && second_mark === third_mark;
        if (has_win) {
          this.#winner = first_mark;
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

  #validate(row, col) {
    if (row - 1 > 2 || col - 1 > 2) {
      throw Error("Invalid row/col indexes. Board sizes is 3x3");
    }
  }

  // Static
}

export class Tile {
  #state;
  constructor() {
    this.#state = null;
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
