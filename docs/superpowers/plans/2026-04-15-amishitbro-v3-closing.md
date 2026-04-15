# Am I Shit Bro V3 — Closing Screen Plan

**Goal:** Replace the current minimal closing screen with a full narrative experience:
5 Jesus story scenes + shit icon level display + fake expert book shelf + ko-fi donate links.

**Architecture:** All changes in `index.html` + `assets/` folder (images already committed).
Single file, no build step, no dependencies.

---

## Asset Map

| File | Role |
|------|------|
| `assets/jesus-hand.png`    | Scene 1 — offering hand |
| `assets/jesus-toilet.png`  | Scene 2 — sitting with you |
| `assets/jesus-running.png` | Scene 3 — running, pointing |
| `assets/jesus-horizon.png` | Scene 4 — staring into sunrise |
| `assets/jesus-book.png`    | Scene 5 — reading glasses, smirk |

Ko-fi URL: **PLACEHOLDER** — user to replace before launch.

---

## Task 1: Shit Icon component

Extract `drawShit()` from `shit-icon-test.html` into a reusable function in `index.html`.

- [ ] Add `drawShit(canvas, w, h, colorStops)` to the `<script>` block
- [ ] Add a `ShitIcon` CSS component: `<canvas class="shit-icon">` sized by class
- [ ] Three size classes: `.shit-sm` (36×42), `.shit-md` (72×84), `.shit-lg` (120×140)
- [ ] Four color presets as JS constants: `SHIT_GOLDEN`, `SHIT_BROWN`, `SHIT_NOIR`, `SHIT_WHITE`

---

## Task 2: Shit level badge on result screen

Show the user's shit level visually using the icon component.

- [ ] After `showResult()` renders the archetype, render a shit icon on the result screen
- [ ] Size and color based on archetype:
  - THE DECENT ONE → `.shit-sm`, SHIT_GOLDEN (you're barely shit)
  - THE FLAKE → `.shit-sm`, SHIT_BROWN
  - THE GHOST → `.shit-md`, SHIT_BROWN
  - THE LEECH → `.shit-md`, SHIT_NOIR
  - THE VOLCANO → `.shit-lg`, SHIT_NOIR
  - THE CHAOS AGENT → `.shit-lg`, SHIT_NOIR (pure darkness)
- [ ] Caption below icon: "your shit level" in small grey text
- [ ] Add canvas element `id="result-shit-icon"` to `#screen-result` HTML

---

## Task 3: Closing screen — 5 Jesus story scenes

Replace the current minimal closing screen content with the full narrative.

**Story copy per scene:**

**Scene 1 — jesus-hand.png**
> Look. You took a quiz on the internet to find out if you're a bad person.
> That already makes you better than 90% of actual shits — they never ask.
> We see you. We're here.

**Scene 2 — jesus-toilet.png**
> Every shit has its moment. You sit with it.
> You don't run from it. You don't Instagram it.
> You just... handle it. Jesus sat with people in worse places than this.
> He didn't even complain about the smell.

**Scene 3 — jesus-running.png**
> But at some point you get up.
> Because if you don't start moving, the shit follows you.
> It gets in the car. It gets on the plane. It shows up at your next relationship.
> Run. Laugh. Point forward. That's the whole method.

**Scene 4 — jesus-horizon.png**
> Stop looking at your shit.
> Seriously. Turn around. Face the sun.
> The shit is still there, yes. But so is everything else.
> You're not the shit. You're the one standing in front of it.

**Scene 5 — jesus-book.png**
> And if none of that worked — the experts have thoughts.

- [ ] Replace `.closing-body` content with 5 `.scene` cards
- [ ] Each scene: image (max-width 260px) + paragraph copy
- [ ] Alternating layout: image left / image right on desktop, stacked on mobile

---

## Task 4: Fake expert book shelf

Below the 5 scenes, render a horizontal scrollable book shelf.

**Books:**

| Cover | Title | Author | Link |
|-------|-------|--------|------|
| `#c0392b` red   | How To Grow Eat-Shit Kids For Famous Parents | Dr. Karen Obviously | → quiz |
| `#2c3e50` navy  | Is This Shit Real Or Not: Expert Analysis | Prof. J. Doesntmatter PhD | → quiz |
| `#f39c12` yellow | Carrying Your Shit Across Three Continents | A guy named Dave | → quiz |
| `#27ae60` green | The Subtle Art of Not Being A Complete Shit | Someone's Therapist | → quiz |
| `#1a1a2e` black | Shit-Free in 30 Days: A Memoir | Anonymous (obviously) | → quiz |

- [ ] Each book: CSS-drawn rectangle with spine, title, author, small shit icon
- [ ] Click any book → `startQuiz()` (retake)
- [ ] Section header: *"Further reading. Not really."*

---

## Task 5: Ko-fi donate links + footer

- [ ] Ko-fi "buy me a coffee" button after every Jesus scene card
- [ ] One persistent donate link in the footer
- [ ] Footer copy: *"Who reads this shit anyway?"*
- [ ] `[retake the quiz →]` button at very bottom
- [ ] Replace all `https://ko-fi.com/PLACEHOLDER` in the file with real URL (user provides)

---

## Self-Review Against Spec

| Requirement | Task |
|---|---|
| Shit icon reusable component | 1 |
| Shit level shown on result screen | 2 |
| 5 Jesus scenes with story copy | 3 |
| Alternating image/text layout | 3 |
| Fake book shelf, CSS-drawn | 4 |
| All book links → retake quiz | 4 |
| Ko-fi on every scene + footer | 5 |
| "Who reads this shit anyway?" footer | 5 |
| Retake button at bottom | 5 |
