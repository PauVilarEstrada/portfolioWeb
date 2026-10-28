# Design system — Pau Vilar portfolio

Source of truth for the visual language. Tokens live in `src/index.css` (`:root`).
Values were set during the 2026 redesign without a prior system, so treat them as the
baseline to evolve rather than fixed brand rules.

## Direction

Light, editorial and engineered. One typeface used at different widths, generous
whitespace, hairline rules instead of boxes, round shapes (pills, discs, large radii)
instead of square cards. Brontobyte Cloud green is the only accent and marks state,
never decoration.

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f3f4f0` | Page background |
| `--paper-2` | `#e8ebe5` | Image wells, code |
| `--surface` | `#ffffff` | Forms, logo discs |
| `--ink` | `#0c1611` | Text, primary buttons, active nav |
| `--ink-2` | `#44504a` | Body copy |
| `--ink-3` | `#6b766f` | Labels, meta |
| `--green` | `#2fa24f` | Accent marks (dots, badge, current item) |
| `--green-ink` | `#1a7a39` | Accent as text / hover (AA on paper) |
| `--night` | `#0c1611` | Footer, IMPLEMAI block, closing CTAs |

Project pages set `--pp-color` to the project's own colour; it only tints marks
(dots, numbers, rings), never body text.

## Type

Archivo (variable: `wdth` 62–125, `wght` 100–900). JetBrains Mono only for real code.

| Role | Size | Width / weight |
|---|---|---|
| Display (hero name) | `clamp(3.5rem, 13.2vw, 13.5rem)` | 112% / 600 |
| Page title | `clamp(3rem, 9vw, 8.5rem)` | 116% / 600 |
| Section title | `clamp(2.1rem, 4.6vw, 4rem)` | 112% / 600 |
| Lead | `clamp(1.12rem, 1.5vw, 1.35rem)` | 100% / 400 |
| Body | `1.0625rem` / 1.6 | 100% / 400 |
| Meta | `0.875rem` | 100% / 500 |

Large type uses negative tracking (−0.045em to −0.06em). Labels are sentence case.

## Layout

- 12-column grid, max width 1320px, gutter `clamp(16px, 4.5vw, 56px)`.
- Section heads: title in columns 1–7, lead in 8–12.
- Every top-level page opens with `.page-head` (giant title, rule, lead on the right).
- Project pages: sticky section title in a 4/12 column, content in 8/12.
- Breakpoints: 1024px (index columns collapse), 960/860px (two-column layouts stack), 760px (touch layouts), 520/340px (fine tuning).

## Shape

Pills (`999px`) for buttons, tags and filters; discs for logos and markers;
radii 20 / 28 / 44px for images, panels and the footer.

## Motion

- One orchestrated moment: the home hero (name lines rise, rule draws, badge spins in, copy fades).
- Route changes: 0.7s fade-and-rise on the page wrapper.
- Interaction feedback only otherwise (hover preview on the work list, arrow rotation, underline sweep).
- `prefers-reduced-motion` disables all of it.

## Components

`Navbar` (floating pill, full-screen sheet below 900px), `Footer` (contact CTA, hidden on /contact),
`WorkList` (rows with pointer-following preview), `ProjectCover`, `ProjectNav` (next project),
`.btn`, `.tag`, `.logo-disc`, `.dot-list`, `.page-head`, `.sec-head`.
