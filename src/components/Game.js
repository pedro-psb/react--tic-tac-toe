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
  const messages = gameState.messages;

  function handleMarkTile(row, col) {
    const new_state = board.markCell(row, col);
    setGameState(new_state);
  }

  return (
    <HandleMarkCtx.Provider value={handleMarkTile}>
      <Board board_matrix={gameState.matrix} />
      {messages &&
        messages.map((msg, i) => (
          <p key={i}>
            {msg.type}: {msg.content}
          </p>
        ))}
    </HandleMarkCtx.Provider>
  );
}
