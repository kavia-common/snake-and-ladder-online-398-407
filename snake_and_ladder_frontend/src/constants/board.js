/**
 * Board constants and helpers for Snake and Ladder
 */
export const BOARD_SIZE = 10;
export const FINAL_CELL = 100;

// Snakes and Ladders mapping
// Ladders: start < end; Snakes: start > end
export const LADDERS = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  28: 84,
  36: 44,
  51: 67,
  71: 91
};

export const SNAKES = {
  27: 1,
  21: 9,
  51: 19,
  56: 53,
  72: 52,
  92: 88,
  94: 75,
  95: 56,
  97: 78
};

// Combined map for quick lookup; ladders first preference
export const JUMPS = {
  ...Object.fromEntries(Object.entries(LADDERS).map(([k, v]) => [Number(k), Number(v)])),
  ...Object.fromEntries(Object.entries(SNAKES).map(([k, v]) => [Number(k), Number(v)])),
};

/**
 * Get board cell for row and col considering zig-zag (bottom row is row 0).
 * Row 0 holds cells 1..10 left->right, row 1 is 20..11 right->left, etc.
 */
// PUBLIC_INTERFACE
export function cellNumberFor(row, col) {
  /** Returns the 1-based cell number at (row, col) for a 10x10 zig-zag board. */
  const base = row * BOARD_SIZE;
  const isEvenRow = row % 2 === 0; // bottom row is even (0)
  if (isEvenRow) {
    return base + col + 1;
  }
  // reversed order
  return base + (BOARD_SIZE - col);
}

/**
 * Convert cell number (1..100) to row/col for rendering
 */
// PUBLIC_INTERFACE
export function toRowCol(cell) {
  /** Converts a 1-based cell index to zero-based row/col on a zig-zag board. */
  const zero = cell - 1;
  const row = Math.floor(zero / BOARD_SIZE);
  const idxInRow = zero % BOARD_SIZE;
  const isEvenRow = row % 2 === 0;
  const col = isEvenRow ? idxInRow : BOARD_SIZE - 1 - idxInRow;
  return { row, col };
}

/**
 * Ensure move stays within 1..100; exact roll required to land on 100.
 * If overshoots, stays at previous.
 */
// PUBLIC_INTERFACE
export function applyMove(current, dice) {
  /** Returns the next cell considering exact 100 requirement. */
  const tentative = current + dice;
  if (tentative > FINAL_CELL) return current;
  return tentative;
}

/**
 * Apply snake or ladder if present.
 */
// PUBLIC_INTERFACE
export function resolveJump(cell) {
  /** Returns the final cell after applying a snake or ladder if available. */
  if (JUMPS[cell] != null) return JUMPS[cell];
  return cell;
}
