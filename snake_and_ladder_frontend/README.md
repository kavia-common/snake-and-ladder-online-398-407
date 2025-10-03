# Snake & Ladder Frontend (React)

Modern, responsive Snake and Ladder game built with React and the Ocean Professional theme.

## Features
- Play vs Player (PvP) or vs Computer (PvC, Player 2 is the computer)
- 2 to 4 players (default 2)
- 10x10 zig-zag board with snakes and ladders markers
- Exact roll required to land on 100
- Move history (last 20)
- Accessible controls and tokens
- Modern UI with gradients, shadows, and smooth transitions

## Run
- npm start
- Visit http://localhost:3000

## Structure
- src/App.jsx: App entry and layout (Header, GameBoard, Sidebar, Footer)
- src/hooks/useSnakeLadderGame.js: Game logic and state
- src/constants/board.js: Board helpers and snakes/ladders mapping
- src/components/*: UI components
- src/styles/theme.css: Theme variables and UI styles

## Theme (Ocean Professional)
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
- Gradient: from-blue-500/10 to gray-50

Enjoy the game!
