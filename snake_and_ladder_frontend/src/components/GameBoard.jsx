import React, { useMemo } from "react";
import { BOARD_SIZE, LADDERS, SNAKES, cellNumberFor } from "../constants/board";

/**
 * PUBLIC_INTERFACE
 * GameBoard component to render 10x10 board and player tokens
 */
export default function GameBoard({ players, positions }) {
  /** Renders the board with snakes/ladders markers and player tokens within cells. */
  const rows = useMemo(() => Array.from({ length: BOARD_SIZE }, (_, r) => r).reverse(), []);
  const cols = useMemo(() => Array.from({ length: BOARD_SIZE }, (_, c) => c), []);

  const tokenMap = useMemo(() => {
    const map = new Map();
    positions.forEach((pos, idx) => {
      if (idx >= players.length) return;
      if (!map.has(pos)) map.set(pos, []);
      map.get(pos).push(players[idx]);
    });
    return map;
  }, [positions, players]);

  return (
    <div className="card board-card" aria-label="Game board">
      <div className="board" role="grid" aria-rowcount={BOARD_SIZE} aria-colcount={BOARD_SIZE}>
        {rows.map((rIdx) =>
          cols.map((cIdx) => {
            const num = cellNumberFor(rIdx, cIdx);
            const hasSnake = SNAKES[num] != null;
            const hasLadder = LADDERS[num] != null;
            const tokens = tokenMap.get(num) || [];
            const startCell = num;
            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className="cell"
                role="gridcell"
                aria-label={`Cell ${startCell}${hasSnake ? ", snake" : ""}${hasLadder ? ", ladder" : ""}`}
              >
                <div className="cell-number">{startCell}</div>
                {hasSnake && <div className="marker snake" title={`Snake to ${SNAKES[num]}`}>🐍</div>}
                {hasLadder && <div className="marker ladder" title={`Ladder to ${LADDERS[num]}`}>🪜</div>}
                <div className="tokens" aria-hidden={tokens.length === 0}>
                  {tokens.map((p, i) => (
                    <div
                      key={`${startCell}-t-${p.id}-${i}`}
                      className="token"
                      style={{ background: p.color }}
                      aria-label={`${p.name} token on cell ${startCell}`}
                      aria-current="false"
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
