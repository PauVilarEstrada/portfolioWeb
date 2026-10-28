# Portfolio v2 — interactive redesign

Approved in chat on 2026-10-28. Project pages (`/projects/*`) and the Experience page stay as they are.

## Goals
- Home keeps its structure but gains an authored, interactive identity (less "AI template").
- Projects index becomes a table-style list; no screenshots in the index.
- Contact copy no longer says "not looking for a job"; it offers collaborations, AI training and specific projects.
- Light/dark theme, fixed navbar, page-transition curtain, more technologies, corrected role.

## Role (everywhere)
ES: "Responsable y coordinador de IA · Consultor IT en Brontobyte Cloud".
EN: "AI Lead & Coordinator · IT Consultant at Brontobyte Cloud".

## Home
1. **Intro loader** (first visit per session, skippable by click/key, ~2.5 s): low-poly three.js water polo pool (animated water shader, lanes, two goals, a goalkeeper in a cap with number 1 who makes a save) with a 0→100 counter; camera dives into the water and hands over to the hero. Lighter on mobile. Skipped under `prefers-reduced-motion`.
2. **Hero background** (three.js): particles assemble into the "PV" monogram and scatter/flow with the pointer; around it a 3D node graph with brand marks (n8n, Python, OpenAI-style LLM node labelled "LLM privado", Microsoft 365, Google Workspace, Zoho…) whose edges carry data pulses into PV. Existing hero copy stays on top. Static fallback without WebGL or with reduced motion.
3. **Water polo mini-game** in the sport section: drag/flick to shoot penalties; the goalkeeper (Pau) dives; scoreboard "Pau ha parado X de Y". Lazy-loaded.
4. Tools: extended list (Java, JavaScript, HTML/CSS, C#/Unity, Flask, Hibernate, SQLite, Bash, Ollama/local LLMs, Google Workspace, Bitdefender GravityZone, Zoho, VirtualBox…).

## Site-wide
- **Theme**: light by default, toggle in the navbar, stored in localStorage, `data-theme` on `<html>`; all colours from tokens with a dark set.
- **Navbar**: always fixed (no hide-on-scroll).
- **Page transition**: curtain sweeps in with the destination page name, route swaps under it, curtain leaves. Reduced motion → plain fade.
- **Details**: live local time (Europe/Madrid) in the footer, numbered project index, refined micro-interactions.

## Projects index
Filters (All / AI & data / Web / Games & mobile) kept. Rows: index number, logo disc in project colour, name, category, stack, status, arrow; whole row is the link; hover highlights row. Mobile: compact two-line rows.

## Contact
Lead: open to collaborations, AI training and specific projects. Two routes: private AI & IT for companies through Brontobyte Cloud; AI training (companies and individuals) and custom development directly. "Good reasons to write" → "How can I help?". Footer copy aligned.

## Tech
- three.js loaded only on Home via dynamic import, after first paint.
- Brand marks from `simple-icons` (CC0) where available; plain labels otherwise.
- Verification: lint, build, Playwright sweep (routes × widths × languages × themes) for overflow and console errors, WebGL fallback check, interaction checks (theme toggle, curtain, loader skip, game).
