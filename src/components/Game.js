import { createContext, useContext, useState } from "react";
import Board from "./Board.js";
import { TicTacBoard } from "./core.js";

const HandleMarkCtx = createContext(null);
export function useHandleMark() {
  return useContext(HandleMarkCtx);
}

export default function Game() {
  const [gameState, setGameState] = useState(TicTacBoard.initGame());
  const board = new TicTacBoard({ ...gameState });

  function handleMarkTile(row, col) {
    setGameState(board.markCell(row, col));
  }

  return (
    <HandleMarkCtx.Provider value={handleMarkTile}>
      <Board board_matrix={gameState.matrix} />
    </HandleMarkCtx.Provider>
  );
}
