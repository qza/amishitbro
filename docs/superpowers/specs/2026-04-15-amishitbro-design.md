# Am I Shit Bro — Design Spec
**Date:** 2026-04-15  
**Status:** Approved

---

## Problem Statement

A fun, brutally honest personality quiz that tells you how much of a shit person you are — in slang. The result is a shareable Instagram-ready card with a generated shape, color, archetype name, and 3 punchy lines. Built to own the space fast, then iterate aggressively.

---

## Acceptance Criteria

- User completes 30 yes/no questions and receives an archetype result
- Result card is downloadable as a 1:1 PNG for Instagram
- Site is fully static — no backend, no cost to run
- Deploys to GitHub Pages or Netlevel in minutes
- Donate button present on landing and result screens
- Mobile-first, works on phone

---

## Out of Scope (MVP)

- User accounts / history
- Claude API integration (V2)
- "Rate your friend" mode (V2)
- Leaderboard (V2)
- Analytics beyond basic page views

---

## Visual Design

**Style:** Dark gradient, sleek, neon accents  
**Background:** Deep navy/purple gradient (`#1a1a2e` → `#16213e`)  
**Accent colors:** Neon pink `#e96fff`, mint green `#7bf1a8`  
**Font:** System sans-serif, bold weights  
**Shape:** Each archetype has a unique CSS clip-path shape + color  

---

## Architecture

Single HTML file (`index.html`) with embedded CSS and JS. No build step, no dependencies, no backend.

```
amishitbro/
├── index.html        ← entire app
└── README.md
```

Deployed as a static site (GitHub Pages / Netlify).

---

## Screens

### Screen 1 — Landing
- Large title: "AM I SHIT BRO?"
- One-liner: "30 questions. brutal truth. no cap."
- Gradient CTA button: "find out →"
- Subtle donate link at bottom (Ko-fi or Buy Me a Coffee)

### Screen 2 — Quiz
- One question at a time, smooth CSS transition between questions
- Progress bar (gradient fill)
- Question type badge: **PROBABLY** (1pt) or **DEFINITELY** (2pts)
- Statement phrased as a behaviour, e.g. "You've left someone on read for 3 days on purpose"
- Two answer buttons: "✓ yeah bro, no cap" / "✗ nah that's not me"
- No back button (keeps it fast and honest)

### Screen 3 — Result
- Archetype shape (CSS clip-path) in archetype color, centered
- Archetype name in large bold text (archetype color)
- Score: "SHIT SCORE: 38 / 50" (mint green)
- 3 punchy taglines (one per line, grey text)
- "⬇ save card" button — triggers Canvas PNG download (1080×1080px)
- "retake" ghost button
- Donate link

---

## Quiz Structure

**Total questions:** 30  
**Scoring:**
- 10 × "PROBABLY" questions = 1pt each (max 10)
- 20 × "DEFINITELY" questions = 2pts each (max 40)
- **Max score: 50**

**Question categories (mixed throughout):**
- Social behaviour (ghosting, canceling plans, being late)
- Relationships (loyalty, communication, effort)
- Lifestyle (hygiene, work ethic, money, excuses)

**Question order:** PROBABLY and DEFINITELY questions interleaved, ordered from mild to spicy.

---

## Archetypes

Score ranges map to one of 6 archetypes. Each has: name, shape, color, score range, 3 taglines, taste descriptors (what it's like to be around you).

| Archetype | Score | Shape | Color | Vibe |
|---|---|---|---|---|
| **The Decent One** | 0–8 | Circle | Mint `#7bf1a8` | "wait, you're actually okay?" |
| **The Flake** | 9–16 | Half-circle / blob | Lime `#a8e063` | unreliable but harmless |
| **The Ghost** | 17–24 | Circle with gap | Teal `#4ecdc4` | present but not really there |
| **The Leech** | 25–32 | Diamond rotated | Purple `#e96fff` | takes more than gives |
| **The Volcano** | 33–41 | Triangle | Red `#ff6b6b` | explosive, spicy to be around |
| **The Chaos Agent** | 42–50 | Irregular polygon | Orange `#ff9a3c` | pure entropy, certified shit |

### Archetype Detail — Example (The Volcano)

**Taglines:**
- "spicy to be around 🌶️"
- "your friends text in group chats about u"
- "a walking red flag parade tbh"

**Taste descriptors:**
- *As a friend:* exhausting but never boring
- *At work:* the one who derails standups
- *To date:* a rollercoaster with no seatbelt

---

## Result Card (Canvas PNG)

- Size: 1080×1080px (Instagram square)
- Background: same dark gradient as site
- Archetype shape: large, centered, ~300×300px
- Archetype name: bold, large, archetype color
- Score line: mint green
- 3 taglines: white/grey, stacked
- Site URL watermark bottom right: `amishitbro.com`
- Download triggered by "save card" button via `canvas.toBlob()`

---

## Donate Button

- Link to Ko-fi or Buy Me a Coffee (user provides URL)
- Appears on: landing screen (subtle, footer) and result screen (after card download)
- Copy: "☕ if this hit too hard, buy me a coffee"

---

## V2 Roadmap (Post-Launch)

1. **Claude API batch processing** — collect anonymous answer sets, run on schedule to generate new archetypes and refine taglines. New archetypes drop as "updates".
2. **Expand to 12–16 archetypes** — Claude suggests new types from real answer patterns
3. **"Rate your friend" mode** — answer on behalf of someone, send them the result (viral mechanic)
4. **Leaderboard** — "This week 43% of people are The Ghost"
5. **Answer analytics** — which questions are most commonly answered yes/no

---

## Open Questions

- Ko-fi vs Buy Me a Coffee — user to provide donation URL
- Domain: `amishitbro.com` (to be registered)
- Hosting: GitHub Pages (free) or Netlify (free tier)
