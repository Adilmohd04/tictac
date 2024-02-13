import { useState, useEffect, useCallback } from "react";

const AIPlayer = ({ cells, go, setGo, setCells, checkscore }) => {
  const [aiTurn, setAITurn] = useState(false);

  const handleCellChange = useCallback(
    (className, id) => {
      const nextCells = cells.map((cell, index) =>
        index === id ? className : cell
      );
      setCells(nextCells);
    },
    [cells, setCells]
  );

  const minimax = useCallback(
    (board, depth, isMaximizing, alpha, beta) => {
      const scores = {
        circle: -10,
        cross: 10,
        draw: 0,
      };

      const winner = checkscore(board, "cross");
      if (winner) {
        return scores[winner];
      }

      if (checkscore(board, "circle")) {
        return scores["circle"];
      }

      if (board.every((cell) => cell !== "")) {
        return scores["draw"];
      }

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = "cross";
            const score = minimax(board, depth + 1, false, alpha, beta);
            board[i] = "";
            bestScore = Math.max(bestScore, score);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
              break; // Alpha-Beta Pruning
            }
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = "circle";
            const score = minimax(board, depth + 1, true, alpha, beta);
            board[i] = "";
            bestScore = Math.min(bestScore, score);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) {
              break; // Alpha-Beta Pruning
            }
          }
        }
        return bestScore;
      }
    },
    [checkscore]
  );

  const calculateBestMove = useCallback(() => {
    const emptyCells = cells.reduce((acc, cell, index) => {
      if (cell === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    for (const cellIndex of emptyCells) {
      const nextCells = cells.slice();
      nextCells[cellIndex] = "cross"; // Try AI move

      // Check if AI can win with this move
      if (checkscore(nextCells, "cross") === "cross") {
        return cellIndex; // AI wins, take the winning move
      }

      // Check if player can win with this move
      if (checkscore(nextCells, "circle") === "circle") {
        continue; // Avoid allowing player to win on their next move
      }

      // Check if the move leads to a draw
      if (!nextCells.includes("")) {
        return cellIndex; // Take the move that leads to a draw
      }
    }

    // If no winning move or draw, use minimax for best move
    let bestScore = -Infinity;
    let bestMove = null;

    for (const cellIndex of emptyCells) {
      const nextCells = cells.slice();
      nextCells[cellIndex] = "cross"; // Try AI move
      const score = minimax(nextCells, 0, false, -Infinity, Infinity);
      nextCells[cellIndex] = ""; // Reset the cell

      if (score > bestScore) {
        bestScore = score;
        bestMove = cellIndex;
      }
    }

    return bestMove;
  }, [cells, checkscore, minimax]);
  useEffect(() => {
    if (go === "cross" && !aiTurn) {
      setAITurn(true);
    }
  }, [go, aiTurn]);

  useEffect(() => {
    if (aiTurn && go === "cross") {
      const bestMove = calculateBestMove();
      handleCellChange("cross", bestMove);
      setGo("circle");
      setAITurn(false);
    }
  }, [aiTurn, cells, go, calculateBestMove, handleCellChange, setGo]);

  return null;
};

export default AIPlayer;
