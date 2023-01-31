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

  function handleReset() {
    setGameState(TicTacBoard.initGame());
  }

  return (
    <div id="container">
      <HandleMarkCtx.Provider value={handleMarkTile}>
        <div>
          <h1>Tic Tac Toe</h1>
        </div>
        <div className="col">
          <Board
            board_matrix={gameState.matrix}
            highlight_matrix={gameState.highligh_matrix}
          />
        </div>
        <div className="col">
          <button onClick={handleReset}>Reset</button>
        </div>
        {messages.length !== 0 && (
          <div id="messages" className="col">
            {messages.map((msg, i) => (
              <p key={i}>
                {msg.type}: {msg.content}
              </p>
            ))}
          </div>
        )}
      </HandleMarkCtx.Provider>
    </div>
  );
}
