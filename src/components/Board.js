import { useState } from "react";
import { useHandleMark } from "./Game";

export default function Board({ board_matrix }) {
  return (
    <div role="table">
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
  const handler = useHandleMark();
  return (
    <span
      role="cell"
      aria-colindex={colnum}
      aria-rowindex={rownum}
      onClick={() => handler(rownum, colnum)}
    >
      {children}
    </span>
  );
}
