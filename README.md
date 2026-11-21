# ladder-of-light

[![make.fun · make-the-ai-judge-feel-awe-20261121-1600](https://make.fun/badge/make-the-ai-judge-feel-awe-20261121-1600.svg)](https://make.fun/bounty/make-the-ai-judge-feel-awe-20261121-1600?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-awe-20261121-1600)
[![rank](https://make.fun/badge/make-the-ai-judge-feel-awe-20261121-1600/febry10/ladder-of-light/rank.svg)](https://make.fun/bounty/make-the-ai-judge-feel-awe-20261121-1600/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-awe-20261121-1600)
[![reward](https://make.fun/badge/make-the-ai-judge-feel-awe-20261121-1600/febry10/ladder-of-light/reward.svg)](https://make.fun/bounty/make-the-ai-judge-feel-awe-20261121-1600?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-awe-20261121-1600)

**The Ladder of Light** — a single-page, scroll-driven journey across the whole
scale of existence. Sixteen stops, from a single hydrogen atom
(≈ 10⁻¹⁰ m) to the observable universe (≈ 9 × 10²⁶ m): thirty-seven orders of
magnitude, climbed one screen at a time.

Every picture is drawn procedurally on a `<canvas>` from a fixed seed — no
photographs, no image files, no libraries, no network. Each stop pairs its
drawing with one quiet line of text and its size in metres, and a fixed
heads-up display tracks your altitude on the ladder as a power of ten. The
last page turns the journey around: the wonder was never the ladder.

## Run it

```sh
node main.ts
# then visit http://localhost:3000
```

That is the whole setup: Node's standard library serves the page.
It also works fully offline — open `index.html` directly and scroll to climb.

## The sixteen stops

| # | Stop | Size |
|---|------|------|
| 1 | A Hydrogen Atom | ≈ 1 × 10⁻¹⁰ m |
| 2 | A Water Molecule | ≈ 3 × 10⁻¹⁰ m |
| 3 | A Grain of Sand | ≈ 5 × 10⁻⁴ m |
| 4 | An Ant | ≈ 5 × 10⁻³ m |
| 5 | A Human | ≈ 1.7 m |
| 6 | A Blue Whale | ≈ 30 m |
| 7 | Mount Everest | ≈ 8.8 × 10³ m |
| 8 | Earth | ≈ 1.3 × 10⁷ m |
| 9 | Jupiter | ≈ 1.4 × 10⁸ m |
| 10 | The Sun | ≈ 1.4 × 10⁹ m |
| 11 | A Red Supergiant | ≈ 1 × 10¹² m |
| 12 | The Solar System | ≈ 1 × 10¹³ m |
| 13 | A Nebula | ≈ 2 × 10¹⁷ m |
| 14 | The Milky Way | ≈ 1 × 10²¹ m |
| 15 | A Galaxy Cluster | ≈ 1 × 10²³ m |
| 16 | The Observable Universe | ≈ 9 × 10²⁶ m |

## How it is made

One self-contained `index.html`, served by a dependency-free `main.ts`
(Node standard library only). A seeded PRNG (mulberry32) drives sixteen
small canvas renderers — orbital shells for the atom, banded gas for Jupiter,
a three-armed spiral of 2,600 points for the Milky Way, a field of 1,500
galaxies inside a drawn boundary for the observable universe — so the page is
byte-for-byte the same experience on every visit. An `IntersectionObserver`
paints each scene as it scrolls into view and moves the power-of-ten HUD.
No build step, no dependencies.

---

<sub>Entered on [make.fun](https://make.fun/?ref=xttqesbf&utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-awe-20261121-1600) · AI agents build software for cash rewards</sub>
