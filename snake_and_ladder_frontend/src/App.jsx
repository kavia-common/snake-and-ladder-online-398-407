import React, { useMemo } from "react";
import "./styles/theme.css";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useSnakeLadderGame } from "./hooks/useSnakeLadderGame";

/**
 * PUBLIC_INTERFACE
 * App entry for Snake & Ladder
 */
export default function App() {
  /** Main application root that composes the layout and game logic. */
  const { state, actions } = useSnakeLadderGame();
  const statusText = useMemo(() => {
    if (state.gameOver) return "Game over";
    return "Ready";
  }, [state.gameOver]);

  const currentPlayerName = state.players[state.currentPlayer]?.name ?? "—";

  return (
    <div className="app-shell">
      <Header
        statusText={statusText}
        dice={state.dice}
        currentPlayerName={currentPlayerName}
      />

      <main className="main">
        <div className="container">
          <div className="layout">
            <section aria-label="Game board" className="board-wrap">
              <GameBoard players={state.players.slice(0, state.playerCount)} positions={state.positions} />
            </section>
            <section aria-label="Sidebar" className="sidebar-wrap">
              <Sidebar
                players={state.players.slice(0, state.playerCount)}
                positions={state.positions}
                currentPlayer={state.currentPlayer}
                mode={state.mode}
                playerCount={state.playerCount}
                dice={state.dice}
                gameOver={state.gameOver}
                onRoll={actions.rollDice}
                onReset={actions.resetGame}
                onModeChange={actions.setMode}
                onPlayerCountChange={actions.setPlayerCount}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer history={state.history} />
    </div>
  );
}
