import { render, screen } from "@testing-library/react";
import { create_board, getFromMatrix } from "./utils.js";

function Foo() {
  return (
    <>
      <span role="cell" aria-colindex="0" aria-rowindex="0"></span>
      <span role="cell" aria-colindex="1" aria-rowindex="0">
        x
      </span>
    </>
  );
}

describe("utils", () => {
  test("create_board() should return 9x9 board matrix", () => {
    const board_matrix = create_board();
    let counter = 0;
    for (let row of board_matrix) {
      for (let cell of row) {
        counter += 1;
      }
    }

    expect(counter).toBe(9);
  });

  test("getFromMatrix should get item by rownum x colnum", () => {
    render(<Foo />);
    const items = screen.getAllByRole("cell");
    const item = getFromMatrix(items, 0, 1);
    expect(item).toHaveTextContent("x");
  });
});
