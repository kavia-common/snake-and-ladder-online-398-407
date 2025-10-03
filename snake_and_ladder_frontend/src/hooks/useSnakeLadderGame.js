import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FINAL_CELL, applyMove, resolveJump } from "../constants/board";

/**
 * Colors for up to 4 players
 */
export const PLAYER_COLORS = ["#2563EB", "#F59E0B", "#10B981", "#EF4444"];

/**
 * PUBLIC_INTERFACE
 * useSnakeLadderGame
 * A lightweight state manager for Snake and Ladder game logic
 */
export function useSnakeLadderGame() {
  /** Hook exposing game state and actions for Snake and Ladder. */
  const [playerCount, setPlayerCountState] = useState(2);
  const [mode, setModeState] = useState("pvp"); // 'pvp'|'pvc'
  const [positions, setPositions] = useState(Array(4).fill(0)); // 0 means off-board start
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState(null);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const isComputerTurn = useMemo(() => {
    if (mode !== "pvc") return false;
    // By default, player index 1 is computer
    return currentPlayer === 1;
  }, [mode, currentPlayer]);

  const players = useMemo(() => {
    return Array.from({ length: playerCount }).map((_, idx) => ({
      id: idx,
      name: mode === "pvc" && idx === 1 ? "Computer" : `Player ${idx + 1}`,
      color: PLAYER_COLORS[idx % PLAYER_COLORS.length],
      isComputer: mode === "pvc" && idx === 1,
    }));
  }, [playerCount, mode]);

  const pushHistory = useCallback((entry) => {
    setHistory((prev) => {
      const next = [entry, ...prev];
      return next.slice(0, 20);
    });
  }, []);

  const advanceTurn = useCallback(() => {
    setCurrentPlayer((p) => {
      const next = (p + 1) % playerCount;
      return next;
    });
  }, [playerCount]);

  const checkWin = useCallback((pos, idx) => {
    if (pos === FINAL_CELL) {
      setGameOver(true);
      pushHistory({
        type: "win",
        text: `${players[idx].name} reached 100 and won the game!`,
      });
      return true;
    }
    return false;
  }, [players, pushHistory]);

  const movePlayer = useCallback((idx, roll) => {
    setPositions((prev) => {
      const copy = [...prev];
      const start = copy[idx];
      const afterMove = applyMove(start, roll);
      let final = resolveJump(afterMove);
      copy[idx] = final;
      // Build a readable move history line
      let note = `${players[idx].name} rolled ${roll} and moved from ${start || 0} to ${afterMove}`;
      if (final !== afterMove) {
        note += final > afterMove ? ` and climbed to ${final} ⬆️` : ` and slid to ${final} ⬇️`;
      }
      pushHistory({ type: "move", text: note });
      return copy;
    });
  }, [players, pushHistory]);

  // PUBLIC_INTERFACE
  const rollDice = useCallback(() => {
    /** Roll a dice for current player and play the move. */
    if (gameOver) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    const cp = currentPlayer;
    movePlayer(cp, roll);
    // After state updates are scheduled, check win on next tick
    setTimeout(() => {
      setPositions((cur) => {
        const pos = cur[cp];
        const won = checkWin(pos, cp);
        if (!won) advanceTurn();
        return cur;
      });
    }, 0);
  }, [currentPlayer, movePlayer, advanceTurn, checkWin, gameOver]);

  // PUBLIC_INTERFACE
  const resetGame = useCallback(() => {
    /** Reset all state. */
    setPositions(Array(4).fill(0));
    setCurrentPlayer(0);
    setDice(null);
    setHistory([]);
    setGameOver(false);
  }, []);

  // PUBLIC_INTERFACE
  const setMode = useCallback((m) => {
    /** Set game mode: 'pvp' or 'pvc'. Resets game. */
    setModeState(m);
    resetGame();
  }, [resetGame]);

  // PUBLIC_INTERFACE
  const setPlayerCount = useCallback((n) => {
    /** Set number of players between 2 and 4. Resets game. */
    const clamped = Math.max(2, Math.min(4, Number(n) || 2));
    setPlayerCountState(clamped);
    resetGame();
  }, [resetGame]);

  // Simple AI: auto roll for computer after a short delay
  const aiTimer = useRef(null);
  useEffect(() => {
    if (!gameOver && isComputerTurn) {
      aiTimer.current && clearTimeout(aiTimer.current);
      aiTimer.current = setTimeout(() => {
        rollDice();
      }, 700);
    }
    return () => {
      aiTimer.current && clearTimeout(aiTimer.current);
    };
  }, [isComputerTurn, rollDice, gameOver]);

  return {
    state: {
      players,
      positions,
      currentPlayer,
      dice,
      history,
      gameOver,
      mode,
      playerCount,
    },
    actions: {
      rollDice,
      resetGame,
      setMode,
      setPlayerCount,
    },
  };
}
