import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar: shows controls and players
 */
export default function Sidebar({
  players,
  positions,
  currentPlayer,
  mode,
  playerCount,
  dice,
  gameOver,
  onRoll,
  onReset,
  onModeChange,
  onPlayerCountChange,
}) {
  /** Sidebar with controls and player status. */
  const isMyTurn = (idx) => idx === currentPlayer;
  const canRoll = !gameOver && (!players[currentPlayer]?.isComputer);

  return (
    <aside className="card sidebar-card" aria-label="Sidebar controls and info">
      <div className="sidebar-section">
        <div className="caption" style={{ fontWeight: 700, color: "var(--text)" }}>Mode</div>
        <div className="radio-group" role="radiogroup" aria-label="Game mode">
          <button
            className={`radio ${mode === "pvp" ? "active" : ""}`}
            role="radio"
            aria-checked={mode === "pvp"}
            onClick={() => onModeChange("pvp")}
          >
            PvP
          </button>
          <button
            className={`radio ${mode === "pvc" ? "active" : ""}`}
            role="radio"
            aria-checked={mode === "pvc"}
            onClick={() => onModeChange("pvc")}
          >
            PvC
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="caption" style={{ fontWeight: 700, color: "var(--text)" }}>Players</div>
        <div className="select" aria-label="Player count">
          <label htmlFor="player-count" className="hint">Count</label>
          <select
            id="player-count"
            value={playerCount}
            onChange={(e) => onPlayerCountChange(Number(e.target.value))}
            aria-label="Select player count"
          >
            {[2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="player-list" style={{ marginTop: 8 }}>
          {players.slice(0, playerCount).map((p, idx) => (
            <div key={p.id} className="player-card" aria-label={`${p.name} status`}>
              <div className={`badge-ring ${isMyTurn(idx) ? "active" : ""}`} aria-hidden="true">
                <span className="badge" style={{ background: p.color }} />
              </div>
              <div className="player-left">
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>{p.name}{p.isComputer ? " 🤖" : ""}</div>
                  <div className="player-pos">Cell: {positions[p.id] || 0}</div>
                </div>
              </div>
              {isMyTurn(idx) && <span className="hint">Your turn</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="caption" style={{ fontWeight: 700, color: "var(--text)" }}>Controls</div>
        <div className="controls" role="group" aria-label="Game controls">
          <div className="control-row">
            <button
              className="btn btn-primary"
              onClick={onRoll}
              disabled={!canRoll}
              aria-label="Roll the dice"
              title={canRoll ? "Roll the dice" : "Wait for your turn"}
            >
              Roll Dice {dice ? `(${dice})` : ""}
            </button>
            <button className="btn btn-ghost" onClick={onReset} aria-label="Restart game">Restart</button>
          </div>
          <div className="hint">
            Roll is disabled on computer's turn and after game end.
          </div>
        </div>
      </div>
    </aside>
  );
}
