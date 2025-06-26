import React, { useState, useEffect } from "react";
import "./App.css";

// Neon style variables based on the design notes.
const rootCSSVars = {
  "--bg-board": "#250050",
  "--bg-cell": "#391f5f",
  "--mark-x": "#68b8ff",
  "--mark-x-glow": "#1fcae1",
  "--mark-o": "#ff3eaf",
  "--mark-o-glow": "#ff7beb",
};

/**
 * Returns "X", "O", "Draw", or null (if game is ongoing)
 */
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diags
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell)) return "Draw";
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Neon X SVG Component
 */
function NeonX() {
  return (
    <svg
      width="80%"
      height="80%"
      viewBox="0 0 100 100"
      className="mark-x"
      aria-label="X"
    >
      <g
        style={{
          filter:
            "drop-shadow(0 0 6px var(--mark-x-glow)) drop-shadow(0 0 18px var(--mark-x-glow))",
        }}
      >
        <line
          x1="18"
          y1="18"
          x2="82"
          y2="82"
          stroke="var(--mark-x)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <line
          x1="82"
          y1="18"
          x2="18"
          y2="82"
          stroke="var(--mark-x)"
          strokeWidth="13"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 * Neon O SVG Component
 */
function NeonO() {
  return (
    <svg
      width="80%"
      height="80%"
      viewBox="0 0 100 100"
      className="mark-o"
      aria-label="O"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="34"
        ry="34"
        fill="none"
        stroke="var(--mark-o)"
        strokeWidth="13"
        filter="drop-shadow(0 0 6px var(--mark-o-glow)) drop-shadow(0 0 18px var(--mark-o-glow))"
      />
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 * Game Cell
 */
function Cell({ value, onClick, disabled }) {
  let content = null;
  if (value === "X") content = <NeonX />;
  else if (value === "O") content = <NeonO />;
  return (
    <button
      className="cell"
      onClick={onClick}
      disabled={!!value || disabled}
      aria-label={value ? `Mark: ${value}` : "Empty cell"}
      tabIndex={value ? -1 : 0}
      type="button"
    >
      {content}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * TicTacToe Board
 */
function Board({ board, onCellClick, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((cell, idx) => (
        <Cell
          key={idx}
          value={cell}
          onClick={() => onCellClick(idx)}
          disabled={gameOver}
        />
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Status Display
 */
function GameStatus({ status }) {
  return (
    <div className="game-status">
      <span>{status}</span>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Reset Button
 */
function ResetButton({ onClick }) {
  return (
    <button className="reset-btn" onClick={onClick} type="button">
      Reset Game
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main App Component for Tic Tac Toe
 */
function App() {
  // Apply CSS variables for board theme
  useEffect(() => {
    Object.entries(rootCSSVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  let status;
  if (winner === "X") status = "Winner: X";
  else if (winner === "O") status = "Winner: O";
  else if (winner === "Draw") status = "Draw!";
  else status = `Next: ${isXNext ? "X" : "O"}`;

  function handleCellClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setBoard(emptyBoard);
    setIsXNext(true);
  }

  return (
    <div
      className="App neon-ttt"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #1d0036 0%, #250050 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <main
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "3vh",
        }}
      >
        <GameStatus status={status} />
        <Board board={board} onCellClick={handleCellClick} gameOver={!!winner} />
        <ResetButton onClick={handleReset} />
      </main>
    </div>
  );
}

export default App;
