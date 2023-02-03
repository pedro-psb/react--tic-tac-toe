import { useHandleMark } from "./Game";
import "./style.css";

export default function Board({
  board_matrix,
  highlight_matrix = null,
  theme = null,
}) {
  // TODO the highlighting style can be merged into style_mod
  const cell_style_mod = theme === "tie" ? "tie" : "default";
  return (
    <div role="table">
      {board_matrix.map((row, i) => (
        <Row key={i}>
          {row.map((element, j) => (
            <Cell
              key={`${i}-${j}`}
              colnum={j}
              rownum={i}
              highlighted={highlight_matrix && Boolean(highlight_matrix[i][j])}
              style_mod={cell_style_mod}
            >
              {element}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  );
}

export function Row({ children }) {
  return (
    <div className="row" role="row">
      {children}
    </div>
  );
}

export function Cell({
  colnum,
  rownum,
  children,
  highlighted = false,
  style_mod = "default",
}) {
  const handler = useHandleMark();
  return (
    <span
      role="cell"
      aria-colindex={colnum}
      aria-rowindex={rownum}
      onClick={() => handler(rownum, colnum)}
      className={
        highlighted ? `cell-${style_mod} cell-highlighted` : `cell-${style_mod}`
      }
    >
      <span role="button">{children}</span>
    </span>
  );
}
