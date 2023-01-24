import { useState } from "react";
import { create_board } from "../utils/utils";

export default function Board() {
  const board_matrix = create_board();
  return (
    <div>
      {board_matrix.map((row, i) => (
        <Row key={i}>
          {row.map((element, j) => (
            <Cell key={`${i}-${j}`} colnum={j} rownum={i}>
              {element}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  );
}

export function Row({ children }) {
  return <div role="row">{children}</div>;
}

export function Cell({ colnum, rownum, children }) {
  return (
    <span role="cell" aria-colindex={colnum} aria-rowindex={rownum}>
      {children}
    </span>
  );
}
