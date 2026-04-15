# Am I Shit Bro — V4 Design Spec

**Date:** 2026-04-15
**Status:** Approved

---

## What's changing

Four independent upgrades to the existing single-file `index.html`:

1. **Profile screen** — replace pill selectors with breadcrumb + circle-icon selector
2. **Result screen** — replace archetype shape + personality text with shit icon (size + color = verdict), nick-based headline
3. **Closing screen** — replace scene cards with a full-screen carousel
4. **Books screen** — dedicated screen for the fake expert bookshelf

---

## 1. Profile screen — breadcrumb circle selector

### Layout

Single fixed slot above the breadcrumb bar. Options render inside the slot and crossfade in place as the user progresses. No page transition.

```
[ options slot — 100px tall, content swaps here ]

  Gender  /  Age  /  Nick
```

### Breadcrumb states

- **Active** — white text, pink (`#e96fff`) underline
- **Done** — dim grey, tappable to go back and re-pick
- **Pending** — barely visible (`#252535`)

### Step 1 — Gender (3 circle icons, one row)

| Icon | Color | Label |
|------|-------|-------|
| ♂ in blue circle `#5b8dee` | filled | Male |
| ♀ in pink circle `#e96fff` | filled | Female |
| ☯ in teal circle `#4ecdc4` | filled | Chaos |

Circle size: 56×56px. On hover: scale 1.28, drop-shadow, border lights up.

### Step 2 — Age (3 circle icons, one row, same slot)

| Icon | Color | Label |
|------|-------|-------|
| 🌱 in green circle `#a8e063` | filled | Young |
| 🧑 in yellow circle `#ffd166` | filled | Man/Woman |
| 🧓 in orange circle `#ff9a3c` | filled | Kinda old |

Same circle style as gender. Crossfades in replacing gender options.

### Step 3 — Nick (text input, same slot)

Large centered text input (`font-size: 1.7rem`, no border box, just bottom border). Placeholder: `"Dave?"`. Max 12 chars. Bottom border turns green (`#7bf1a8`) on focus. Breadcrumb shows blinking green cursor while empty, fills with typed value.

### Completion

When all 3 done: **go! →** button fades up below breadcrumb (gradient pill, same style as existing `btn-primary`).

### Back-navigation

Tapping a done breadcrumb item resets that step and all subsequent steps, re-shows that step's options in the slot.

---

## 2. Result screen — shit icon verdict

### Remove

- Archetype geometric shape (`#result-shape`)
- Archetype name (`#result-name`)  
- Taglines (`#result-taglines`)
- Taste section (`.taste-section`)
- Score line (`#result-score`)

### Keep

- Save card button (`btn-save`) — downloadable PNG still useful
- Retake button (`btn-retake`)
- "so what? →" button

### Add

**Headline:** `[nick], you little [label]` — large, centered, white.

Nick comes from profile. Label is derived from shit tier:

| Tier | Size class | Color | Label |
|------|-----------|-------|-------|
| Score ≤ 2  | `.shit-sm` | SHIT_GOLDEN | `golden shit` |
| Score 3–8  | `.shit-sm` | SHIT_BROWN  | `brown shit` |
| Score 9–14 | `.shit-md` | SHIT_BROWN  | `real brown shit` |
| Score 15–19| `.shit-md` | SHIT_NOIR   | `dark shit` |
| Score 20–24| `.shit-lg` | SHIT_NOIR   | `serious dark shit` |
| Score 25–30| `.shit-lg` | SHIT_NOIR   | `absolute dark monster` |

**Shit icon:** canvas rendered via existing `drawShit()`, centered, size per tier above.

**Score line:** keep as small grey subtext below icon: `SHIT SCORE: X / 30`

### Download card

Update `downloadCard()` to render nick + label instead of archetype name + taglines.

---

## 3. Closing screen — full-screen carousel

### Replace

Current scene cards (stacked vertical scroll) → horizontal carousel, one scene per slide, full viewport width.

### Structure

```
[ image — max 260px, centered ]
[ story copy — centered, max 420px ]
[ ☕ ko-fi link ]

  ← •••••  →
```

### Navigation

- Left/right arrow buttons (or swipe on mobile)
- Dot indicators below (5 dots, active one lit)
- Auto-advance optional (off by default)

### Scenes (unchanged copy, see V3 plan)

Scenes 1–5 with existing jesus images and copy. Scene 5 leads into books with CTA "→ the experts have thoughts".

### Ko-fi

One link per scene, same as current (`https://ko-fi.com/kokozoo`).

---

## 4. Books — dedicated screen

### New screen: `#screen-books`

Triggered by "→ the experts have thoughts" on closing carousel scene 5.

### Layout

Full screen, dark background. Header: *"Further reading. Not really."*

Books displayed as a **grid** (2 columns on mobile, 3 on desktop) instead of horizontal scroll — more readable.

Each book: same CSS-drawn spine + face design from V3, r=28 node size. Click → `startQuiz()`.

5 books unchanged from V3 spec.

Footer at bottom of books screen: *"Who reads this shit anyway?"* + retake button.

---

## Data flow

```
Profile (gender + age + nick)
  → stored in userProfile = { gender, age, nick }
  → quiz runs (unchanged)
  → finaliseScore() → showResult()
      → nick used in headline
      → score maps to tier → shit icon size + color + label
  → "so what?" → closing carousel
  → scene 5 CTA → books screen
```

---

## Files changed

Only `index.html`. No new files. No dependencies.

---

## Out of scope

- No backend, no persistence across sessions
- No sharing / social integration
- No sound / haptics
- Quiz questions unchanged
- Scoring logic unchanged
