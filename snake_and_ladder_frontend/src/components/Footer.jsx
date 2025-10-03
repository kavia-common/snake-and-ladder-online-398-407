import React from "react";

/**
 * PUBLIC_INTERFACE
 * Footer: shows rules and history
 */
export default function Footer({ history }) {
  /** Footer with concise rules and move history. */
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="rules">
          <div><strong>Rules:</strong> Roll a dice to move forward. Land exactly on 100 to win. Ladders climb you up; snakes take you down.</div>
          <div>In PvC, Player 2 is a computer and will auto-roll. Overshooting 100 means you stay in place.</div>
          <div className="hint">Accessibility tip: Use <span className="kbd">Tab</span> to focus controls, <span className="kbd">Enter</span> to activate.</div>
        </div>
        <div>
          <div className="caption" style={{ fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Recent moves</div>
          <div className="history" aria-live="polite">
            {history.length === 0 && <div className="hint">No moves yet. Start by rolling the dice.</div>}
            {history.map((h, idx) => (
              <div key={idx} className="history-item">
                <span>{h.text}</span>
                <span className="hint">{h.type === "win" ? "🏁" : "🎲"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
