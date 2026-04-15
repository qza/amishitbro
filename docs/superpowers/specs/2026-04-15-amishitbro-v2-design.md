# Am I Shit Bro — V2 Design Spec

**Date:** 2026-04-15
**Status:** Approved for implementation

---

## Overview

V2 is a full revision of the question set and flow. The core insight: **self-awareness lowers your score. Deflection raises it.** The quiz is a mirror — the most shit move is pointing the finger outward.

"Shit" throughout is American street slang for character flaws, self-awareness, and life patterns. Not an insult — a psychological lens.

---

## Screen Flow

```
Landing → Profile → Quiz (20 questions) → Result → Closing
```

Four screens total (was three). Profile is new. Closing is new.

---

## Screen 1: Landing

No changes from V1. Dark gradient, title, subtitle, "find out →" button, donate link.

`startQuiz()` now calls `showScreen('screen-profile')` instead of `showScreen('screen-quiz')`.

---

## Screen 2: Profile (NEW)

One combined screen. Two pill-selector rows. "Let's go →" button to start quiz.

### Gender pills
- Male
- Female
- Chaos

### Age pills
- Young
- Man/Woman
- Kinda old
- **Middle age** *(only appears / auto-selects when Chaos is selected)*

**Chaos gender mechanic:** When user selects Chaos, age row is replaced with a single locked pill "Middle age" with a subtle lock icon or wink. Cannot be changed. This is the joke — Chaos people are always middle-aged.

### Validation
Both gender and age must be selected before "Let's go →" is enabled. Profile data stored in JS state (`userProfile = { gender, age }`).

### Gender score multiplier
Applied to the **final score** after all 20 questions:
- **Male** → ×1.0 (baseline)
- **Female** → ×1.5 (girls are bigger shit, scientifically proven by this quiz)
- **Chaos** → ×0.67 (÷1.5 — probably some serious mental issue, we go easy)

Result is `Math.round(rawScore * multiplier)`. Archetype lookup and display use the multiplied score.

---

## Screen 3: Quiz

### Structure changes from V1
- 20 questions (down from 30)
- Questions are no longer binary yes/no only — some have 3 options
- Scoring is no longer always positive — answers can score -1, 0, +1, +2, or +3
- Badge labels change: "PROBABLY" / "DEFINITELY" / "MIRROR" (new, for self-awareness trap questions)
- Progress bar still grows question by question

### Badge types
| Badge | Color | Meaning |
|-------|-------|---------|
| PROBABLY | lime `#a8e063` | Mild, 1pt positive |
| DEFINITELY | pink `#e96fff` | Spicy, 2pt positive |
| MIRROR | teal `#4ecdc4` | Self-awareness trap, negative scoring possible |

### The 20 Questions

Each question has an `answers` array of `{ label, score }` objects. UI renders them as pill/button options instead of binary yes/no.

| # | Question | Answers | Badge |
|---|----------|---------|-------|
| 1 | Do you collect Tarzans in the forest between anus hole and balls? | y=+2, n=0 | DEFINITELY |
| 2 | Have people told you "stop shitting on me"? | y=+2, n=0 | DEFINITELY |
| 3 | Do you do that ass movement that lifts your back upward, ready to make shit? | y=+1, n=0 | PROBABLY |
| 4 | Do you spin your head round making disgusted faces? | y=+1, n=0 | PROBABLY |
| 5 | Did you ever get told to eat shit? Or is this not some city shit you know? | y=+2, n=0 | DEFINITELY |
| 6 | Do you buy watches for all your friends and you're not a football player? | y=+1, n=0 | PROBABLY |
| 7 | Have you ever responded: "who gives a damn if you are shit or not?" | y=+2, n=0 | DEFINITELY |
| 8 | Do you say often: "stop looking at me you shit!" | sometimes=-1, yes=0, no=+2 | MIRROR |
| 9 | Do you often find material in your anus bag (hard to clean spot)? | y=-1, n=+1 | MIRROR |
| 10 | Are you aware that you are shit sometimes? | y=-1, n=+2 | MIRROR |
| 11 | Do you find that shit funny and tasty? | y=-1, n=+1 | MIRROR |
| 12 | Am I shit or you are shit? | both=0, you=-1, I=+2 | MIRROR |
| 13 | Do you keep a lot of shit in your iPhone or mobile? | y=0, n=+1 | PROBABLY |
| 14 | Can you tell easily if somebody is a shit or not? | y=+2, n=0 | DEFINITELY |
| 15 | Are you ready to go all white tonight? Party? | y=+1, n=0 | PROBABLY |
| 16 | Do you think brown sugar is healthier than white sugar? | same=+1, y=0, n=-1 | MIRROR |
| 17 | Do you hear often: "well that is the shit of an argument" | y=-1, n=+1 | MIRROR |
| 18 | Do you get sometimes: "hey, that is a secret you shit" | y=-1, n=+1 | MIRROR |
| 19 | Do you care at all about your shit friends? | y=-1, can't tell=0, n=+1 | MIRROR |
| 20 | Do you ever say sorry you shit? | y=+1, not like that=-1 | MIRROR |

### Score range
- **Minimum possible:** -8 (full self-awareness)
- **Maximum possible:** +30 (full deflection)

### Answer UI
Replace the two binary buttons with dynamic answer pills rendered from the `answers` array. Pill row, horizontally laid out, each pill selectable. Selecting one immediately advances to next question (no confirm button needed).

---

## Screen 4: Result

No structural changes from V1. Archetype name, shape, score, taglines, tastes, download card, retake.

### Recalibrated archetype score ranges

| Archetype | Range | Meaning |
|-----------|-------|---------|
| THE DECENT ONE | -8 to 2 | Self-aware, owns it |
| THE FLAKE | 3 to 8 | Mild, loveable chaos |
| THE GHOST | 9 to 14 | Present but not really there |
| THE LEECH | 15 to 19 | Takes more than gives |
| THE VOLCANO | 20 to 24 | Spicy, exhausting |
| THE CHAOS AGENT | 25 to 30 | Pure entropy, certified |

Score display changes from "SHIT SCORE: X / 50" to "SHIT SCORE: X / 30".

---

## Screen 5: Closing (NEW)

Appears after result screen. Always shown to everyone. Button on result screen: "so what?" → navigates to closing screen.

### Content

**Headline (large, loud, gradient text):**
> SO WHAT IF YOU ARE SHIT!

**Subheadline (smaller, confident):**
> We know you are shit. We are here to help.

**Body (sounds like trolling, hits like a punch 10 seconds later):**
> Look. You took a quiz on the internet to find out if you're a bad person. That's either the most self-aware thing someone can do, or the most delusional. Either way — you're here.
>
> Maybe you made a bad step. Maybe the people around you never learned the lesson that turned out to be yours to carry. Maybe your DNA line has been holding that pattern for a long time and it landed on you to break it.
>
> The shit isn't funny for long. You already know that.
>
> **You're not broken. You're just unfinished.**

**Actions:**
- "retake" button → back to landing
- donate link

---

## Canvas Card

Score display updates to "/ 30". No other changes to the PNG generator.

---

## Data Model Changes

### `userProfile` (new global)
```js
let userProfile = { gender: null, age: null };
```

### `QUESTIONS` array shape change
```js
{
  text: "question text",
  badge: "PROBABLY" | "DEFINITELY" | "MIRROR",
  answers: [
    { label: "yeah", score: 1 },
    { label: "nah", score: 0 }
  ]
}
```

### `score` variable
Same global `let score = 0`, but now can go negative.

---

## What Does NOT Change

- Single `index.html`, zero dependencies, zero backend
- All existing CSS architecture (screen system, shapes, canvas)
- Archetype names, shapes, colors, taglines, tastes
- Deploy target (GitHub Pages / Netlify)
- Donate link placeholder

---

## Out of Scope (V3)

- Claude API personalization by gender/age
- Leaderboard
- "Rate your friend" mode
- Expanding to 12-16 archetypes
