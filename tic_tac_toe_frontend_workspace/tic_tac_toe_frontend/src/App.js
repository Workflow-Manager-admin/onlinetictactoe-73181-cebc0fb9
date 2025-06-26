import React, { useState } from "react";
import "./App.css";

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
 * X SVG Component (bold orange-red with thick, rounded ends)
 */
function XMark() {
  return (
    <span className="ttt-x-outer">
      <span className="ttt-x-glow" />
      <span className="ttt-x">
        <svg viewBox="0 0 100 100" aria-label="X">
          <line x1="15" y1="15" x2="85" y2="85" />
          <line x1="85" y1="15" x2="15" y2="85" />
        </svg>
      </span>
    </span>
  );
}

/**
 * PUBLIC_INTERFACE
 * O SVG Component (thick, matte black, rounded)
 */
function OMark() {
  return (
    <span className="ttt-o-outer">
      <span className="ttt-o-glow" />
      <span className="ttt-o">
        <svg viewBox="0 0 100 100" aria-label="O">
          <ellipse cx="50" cy="50" rx="35" ry="35" />
        </svg>
      </span>
    </span>
  );
}

/**
 * PUBLIC_INTERFACE
 * Cell for Tic Tac Toe (button for accessibility)
 */
function Cell({ value, onClick, disabled }) {
  let child = null;
  if (value === "X") child = <XMark />;
  else if (value === "O") child = <OMark />;
  return (
    <button
      className="ttt-cell"
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={value ? `Mark: ${value}` : "Unmarked cell"}
      tabIndex={value ? -1 : 0}
      type="button"
    >
      {child}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board (3x3 grid with thick grid dividers)
 */
function Board({ board, onCellClick, gameOver }) {
  return (
    <div className="ttt-board">
      <div className="ttt-grid" role="grid" aria-label="Tic Tac Toe board">
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => onCellClick(idx)}
            disabled={gameOver}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Game status at top
 */
function GameStatus({ status }) {
  return <div className="game-status">{status}</div>;
}

/**
 * PUBLIC_INTERFACE
 * Reset Game button
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
 * Main App component
 */
function App() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  let status = "";
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
    <div className="App">
      <div className="ttt-center">
        <GameStatus status={status} />
        <Board
          board={board}
          onCellClick={handleCellClick}
          gameOver={!!winner}
        />
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
}

export default App;
