# Tic Tac Toe Frontend Design Notes

## 1. Layout & Structure

- **Board Structure:**
  - 3x3 grid layout.
  - Each cell is a perfect square and evenly sized.
  - Small, consistent gaps (gutters) between the squares.
  - All cells have slightly rounded corners (border-radius ~14px estimated).
  - Overall square grid with consistent padding around the board.

- **Overall Alignment:**
  - All elements are centrally aligned.
  - The board background color visually contrasts with the cell colors for clear separation.

## 2. UI Components

- **Grid Cells:**
  - Each grid cell is a container that can be empty or display either an "X" or "O".
  - "X" and "O" are visually prominent, filling most of the cell area.
  - "X": Neon blue, thick strokes, slightly glowing effect.
  - "O": Neon pink/red, thick strokes, glowing effect.
  - Empty cells: Maintain same background as filled ones but without icon.
  - On hover (speculative for modern UIs): Subtle brightness or shadow increase.

- **No score, heading, or other visible UI in this screenshot:** Only the grid and game pieces are displayed.

## 3. Color Palette

- **Background:** Dark purple/blue gradient (`--bg-board: #250050` approximate).
- **Cell:** Slightly lighter/darker than board, distinct yet harmonious (`--bg-cell: #391f5f` approximate).
- **X Icon:** Electric/neon blue with glow (`--mark-x: #68b8ff` and `--mark-x-glow: #1fcae1`).
- **O Icon:** Neon pink/red with glow (`--mark-o: #ff3eaf` and `--mark-o-glow: #ff7beb`).
- **Cell Border:** None visible, all separation by gutter spacing.
- **Gutter/Spacing:** Board padding and cell-to-cell gaps use underlying background color.

## 4. Typography

- No standard typography is present as the only text components are large "X" and "O" rendered as styled SVG/Canvas or large text. For fallback, use:
  - Font Family: `'Helvetica Neue', Arial, sans-serif`
  - Font Weight: Bold, approx 900
  - Font Size: Fills ~80% of cell

## 5. Spacing & Sizing

- **Grid:** 3x3, each square equal size.
- **Gap between squares:** Small, ~10% of cell size (can use `gap: 8px` or similar for grid layout).
- **Padding:** Board area has internal padding; ensure board doesn't touch view boundaries.
- **Border Radius:** Cell corner radius ~14px.

## 6. Effects

- **Neon Glow:** Both "X" and "O" are rendered with a glow/shadow effect in their respective colors (box-shadow or text-shadow for SVG/text).
- **Cell Hover (recommended):** Slight increase in brightness or subtle shadow on hover, for interactivity.

## 7. Responsive Design

- The board should scale for various device widths, keeping exact 1:1 aspect ratio.
- Max width: 90vw or 360px, whichever is smaller.
- Grid cells flex or scale proportionally to fit container.

## 8. Implementation Hints

- Use CSS Grid to implement the 3x3 layout:
  ```css
  .board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
    background: var(--bg-board);
    padding: 16px;
    border-radius: 18px;
    width: min(90vw, 360px);
    aspect-ratio: 1 / 1;
    margin: 0 auto;
  }
  .cell {
    background: var(--bg-cell);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    /* Add neon effect styles as below for X/O */
  }
  ```
- Neon effects: Prefer SVG for icons, or use large bold text with strong text-shadow.

## 9. CSS Variables Reference

```css
:root {
  --bg-board: #250050;
  --bg-cell: #391f5f;
  --mark-x: #68b8ff;
  --mark-x-glow: #1fcae1;
  --mark-o: #ff3eaf;
  --mark-o-glow: #ff7beb;
}
```

---

### Component List

- Board container: `.board`
- Game cell: `.cell`
- X and O mark: `.mark-x`, `.mark-o` (SVG or styled text within cell)

---

## 10. Summary

- 3x3 neon-styled tic tac toe board.
- Glowing "X" and "O" marks, each with distinctive color glows.
- Modern, dark neon cyberpunk aesthetic.
- Purely grid, no extra UI or score in this shot.
- Use above variable palette, structure, and sizing for implementation.

