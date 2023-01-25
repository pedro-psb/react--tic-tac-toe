export function getFromMatrix(matrix, rownum, colnum) {
  return matrix.filter(
    (item) =>
      item.getAttribute("aria-rowindex") === `${rownum}` &&
      item.getAttribute("aria-colindex") === `${colnum}`
  )[0];
}

export function create_board() {
  let board_data = [];
  for (let i = 0; i < 3; i++) {
    board_data.push([]);
    for (let j = 0; j < 3; j++) {
      board_data[i].push(null);
    }
  }
  return board_data;
}

// wins table (1-indexed)
export const wins = [
  // rows
  [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  [
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  [
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  // cols
  [
    [1, 1],
    [2, 1],
    [3, 1],
  ],
  [
    [1, 2],
    [2, 2],
    [3, 2],
  ],
  [
    [1, 3],
    [2, 3],
    [3, 3],
  ],
  // diags
  [
    [1, 1],
    [2, 2],
    [3, 3],
  ],
  [
    [1, 3],
    [2, 2],
    [3, 1],
  ],
];
