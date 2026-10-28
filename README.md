# Pau Vilar — portfolio

Personal site of **Pau Vilar i Estrada**, consultant, IT & AI lead and coordinator at
[Brontobyte Cloud](https://www.brontobytecloud.com/). Live at
[pauvilarestrada.github.io/portfolioWeb](https://pauvilarestrada.github.io/portfolioWeb/).

Bilingual (Spanish / English), with pages for home, projects, experience and contact,
plus one page per project (TactiQ 360, Ultimus Defensor, NBA Vision, MINDFLOW, KDD'99,
e-commerce, Pacman and Flappy Bird).

## Stack

- React 19 + React Router 7, built with Vite 6
- Plain CSS with design tokens (see [DESIGN.md](DESIGN.md))
- `react-icons` for icons; no animation library (CSS only)
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`

## Structure

```
src/
  components/          pages and shared components
  components/myprojects/  one page per project + shared project CSS
  css/                 page and component styles
  data/projects.ts     project list (routes, covers, colours) and contact links
  i18n/                es.ts / en.ts (site) and pages.*.ts (project pages)
```

All copy lives in `src/i18n`; `es.ts` is typed against the shape of `en.ts`, so editors flag a missing key.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173/portfolioWeb/
npm run lint
npm run build
npm run deploy    # manual publish to gh-pages (CI does this on main)
```
