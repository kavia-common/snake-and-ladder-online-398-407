import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header component
 */
export default function Header({ statusText, dice, currentPlayerName }) {
  /** Displays game status, current player, and last dice result. */
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand" aria-label="Snake and Ladder">
          <div className="brand-badge" aria-hidden="true">SL</div>
          <div>
            <div style={{ fontWeight: 800, color: "var(--text)" }}>Snake & Ladder</div>
            <div className="caption">Ocean Professional UI</div>
          </div>
        </div>
        <div className="status" role="status" aria-live="polite">
          <span className="pill">Turn: <strong style={{ marginLeft: 4 }}>{currentPlayerName}</strong></span>
          <span className="pill">Dice: <strong style={{ marginLeft: 4 }}>{dice ?? "—"}</strong></span>
          <span className="hint">{statusText}</span>
        </div>
      </div>
    </header>
  );
}
