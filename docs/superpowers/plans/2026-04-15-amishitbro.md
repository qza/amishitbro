# Am I Shit Bro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file static quiz site that scores users on how much of a shit person they are and generates a downloadable Instagram-ready result card.

**Architecture:** Single `index.html` file with embedded CSS and JS — no build step, no dependencies, no backend. Three JS state-machine screens (landing → quiz → result) rendered by swapping CSS classes. Canvas API generates the downloadable PNG result card.

**Tech Stack:** Vanilla HTML/CSS/JS, Canvas API, CSS clip-path shapes, CSS transitions, GitHub Pages or Netlify for hosting.

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Entire app — HTML structure, embedded `<style>`, embedded `<script>` |
| `README.md` | Deploy instructions, donate URL placeholder |

---

## Task 1: Project scaffold + landing screen

**Files:**
- Create: `index.html`
- Create: `README.md`

- [ ] **Step 1: Create `index.html` with landing screen HTML + CSS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Am I Shit Bro?</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Screen system */
    .screen { display: none; width: 100%; max-width: 480px; padding: 32px 24px; }
    .screen.active { display: flex; flex-direction: column; align-items: center; }

    /* Landing */
    #screen-landing { text-align: center; gap: 16px; }

    .title {
      font-size: clamp(2.4rem, 10vw, 3.6rem);
      font-weight: 900;
      background: linear-gradient(90deg, #e96fff, #7bf1a8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #aaa;
      font-size: 0.95rem;
      letter-spacing: 0.04em;
      margin-bottom: 32px;
    }

    .btn-primary {
      display: inline-block;
      padding: 14px 40px;
      background: linear-gradient(90deg, #e96fff, #7bf1a8);
      border: none;
      border-radius: 40px;
      color: #0d0d1a;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      letter-spacing: 0.03em;
      transition: transform 0.15s, opacity 0.15s;
    }
    .btn-primary:hover { transform: scale(1.04); opacity: 0.92; }
    .btn-primary:active { transform: scale(0.97); }

    .donate-link {
      margin-top: 40px;
      color: #555;
      font-size: 0.8rem;
      text-decoration: none;
      transition: color 0.2s;
    }
    .donate-link:hover { color: #888; }
  </style>
</head>
<body>

  <!-- Screen 1: Landing -->
  <section id="screen-landing" class="screen active">
    <h1 class="title">AM I SHIT BRO?</h1>
    <p class="subtitle">30 questions. brutal truth. no cap.</p>
    <button class="btn-primary" onclick="startQuiz()">find out →</button>
    <a class="donate-link" href="https://ko-fi.com/PLACEHOLDER" target="_blank" rel="noopener">
      ☕ if this hits too hard, buy me a coffee
    </a>
  </section>

  <!-- Screen 2: Quiz (populated by JS) -->
  <section id="screen-quiz" class="screen"></section>

  <!-- Screen 3: Result (populated by JS) -->
  <section id="screen-result" class="screen"></section>

  <script>
    function showScreen(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function startQuiz() {
      showScreen('screen-quiz');
    }
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify landing renders correctly**

Open `index.html` in a browser (drag the file in). You should see:
- Dark gradient background filling the viewport
- "AM I SHIT BRO?" in large pink→green gradient text
- Subtitle in grey
- Gradient pill button "find out →"
- Subtle coffee link at bottom
- Clicking "find out →" shows a blank screen (quiz not built yet — expected)

- [ ] **Step 3: Create README.md**

```markdown
# Am I Shit Bro?

A brutally honest personality quiz. Are you shit, bro?

## Deploy

### GitHub Pages
1. Push this repo to GitHub
2. Settings → Pages → Source: main branch, root folder
3. Done. Live at `https://yourusername.github.io/amishitbro`

### Netlify
1. Drag the folder into netlify.com/drop
2. Done.

## Donate URL
Replace `https://ko-fi.com/PLACEHOLDER` in `index.html` with your actual Ko-fi or Buy Me a Coffee URL.
```

- [ ] **Step 4: Commit**

```bash
git init
git add index.html README.md
git commit -m "feat: scaffold + landing screen"
```

---

## Task 2: Quiz data — 30 questions

**Files:**
- Modify: `index.html` — add `QUESTIONS` constant inside `<script>`

- [ ] **Step 1: Add the QUESTIONS array to the `<script>` block (before `showScreen` function)**

```js
const QUESTIONS = [
  // PROBABLY (weight: 1) — mild behaviours
  { text: "You cancel plans the day of, pretty regularly", weight: 1 },
  { text: "You've ignored a message and 'forgot' to reply for over a week", weight: 1 },
  { text: "You talk over people without noticing", weight: 1 },
  { text: "You show up late more often than you're on time", weight: 1 },
  { text: "You give advice nobody asked for", weight: 1 },
  { text: "You've borrowed money and been slow to pay it back", weight: 1 },
  { text: "You vent to friends but tune out when it's their turn", weight: 1 },
  { text: "You leave group chats on read when it's inconvenient", weight: 1 },
  { text: "You make everything about yourself in conversations", weight: 1 },
  { text: "You say 'I'm on my way' when you haven't left yet", weight: 1 },

  // DEFINITELY (weight: 2) — spicier behaviours
  { text: "You've left someone on read for 3+ days on purpose", weight: 2 },
  { text: "You've ghosted someone you were seeing without explanation", weight: 2 },
  { text: "You talk shit about your friends to other friends", weight: 2 },
  { text: "You've used someone's insecurity against them in an argument", weight: 2 },
  { text: "You've taken credit for someone else's work", weight: 2 },
  { text: "You play victim in situations you caused", weight: 2 },
  { text: "You've cheated and not told anyone", weight: 2 },
  { text: "You cancel on people more than once for the same plan", weight: 2 },
  { text: "You guilt-trip people when they set boundaries with you", weight: 2 },
  { text: "You've borrowed something and never returned it", weight: 2 },
  { text: "You manipulate situations so things go your way", weight: 2 },
  { text: "You say you're 'not a drama person' but you always have drama", weight: 2 },
  { text: "You've lied to a close friend to avoid a hard conversation", weight: 2 },
  { text: "You treat service workers worse than you treat your boss", weight: 2 },
  { text: "You've made a joke at someone's expense and called it banter", weight: 2 },
  { text: "You know you're wrong in an argument but keep going anyway", weight: 2 },
  { text: "You disappear when friends need you but expect them when you need them", weight: 2 },
  { text: "You've promised to change a behaviour and haven't even tried", weight: 2 },
  { text: "You gaslight people into thinking they're overreacting", weight: 2 },
  { text: "You've sabotaged someone else's opportunity, even subtly", weight: 2 },
];
```

- [ ] **Step 2: Verify the array in browser console**

Open `index.html`, open DevTools console (F12), run:
```js
QUESTIONS.length                                    // → 30
QUESTIONS.filter(q => q.weight === 1).length        // → 10
QUESTIONS.filter(q => q.weight === 2).length        // → 20
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add 30 quiz questions with weights"
```

---

## Task 3: Quiz screen — rendering + answer logic

**Files:**
- Modify: `index.html` — add quiz CSS to `<style>`, add quiz HTML to `#screen-quiz`, add quiz JS to `<script>`

- [ ] **Step 1: Add quiz CSS inside the `<style>` block (after `.donate-link` styles)**

```css
/* Quiz */
#screen-quiz { gap: 0; padding: 24px 20px; justify-content: flex-start; }

.quiz-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.quiz-counter { color: #555; font-size: 0.75rem; letter-spacing: 0.06em; }

.badge {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 3px 10px;
  border-radius: 20px;
}
.badge-probably  { background: rgba(163, 230, 99, 0.15); color: #a8e063; }
.badge-definitely { background: rgba(233, 111, 255, 0.15); color: #e96fff; }

.progress-track {
  width: 100%;
  height: 3px;
  background: #1f2937;
  border-radius: 2px;
  margin-bottom: 36px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e96fff, #7bf1a8);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.question-text {
  width: 100%;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.45;
  color: #f0f0f0;
  margin-bottom: 32px;
  min-height: 80px;
  transition: opacity 0.15s;
}

.answer-btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-answer {
  width: 100%;
  padding: 14px 20px;
  border: 1px solid #2a2a3e;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  color: #e0e0e0;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
.btn-answer:hover { background: rgba(255,255,255,0.07); border-color: #444; }
.btn-answer:active { transform: scale(0.98); }
.btn-answer.yes:hover { border-color: #e96fff; color: #e96fff; }
.btn-answer.no:hover  { border-color: #7bf1a8; color: #7bf1a8; }
```

- [ ] **Step 2: Replace `<section id="screen-quiz" class="screen"></section>` with quiz HTML**

```html
<section id="screen-quiz" class="screen">
  <div class="quiz-header">
    <span class="quiz-counter" id="quiz-counter">1 / 30</span>
    <span class="badge badge-probably" id="quiz-badge">PROBABLY</span>
  </div>
  <div class="progress-track">
    <div class="progress-fill" id="progress-fill" style="width:0%"></div>
  </div>
  <p class="question-text" id="question-text"></p>
  <div class="answer-btns">
    <button class="btn-answer yes" onclick="answer(true)">✓ yeah bro, no cap</button>
    <button class="btn-answer no"  onclick="answer(false)">✗ nah that's not me</button>
  </div>
</section>
```

- [ ] **Step 3: Add quiz state + logic to `<script>` (after QUESTIONS array, before `showScreen`)**

```js
let currentQ = 0;
let score = 0;

function startQuiz() {
  currentQ = 0;
  score = 0;
  renderQuestion();
  showScreen('screen-quiz');
}

function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  const qText = document.getElementById('question-text');
  qText.style.opacity = '0';
  setTimeout(() => {
    qText.textContent = q.text;
    qText.style.opacity = '1';
  }, 150);

  document.getElementById('quiz-counter').textContent = `${currentQ + 1} / ${total}`;
  document.getElementById('progress-fill').style.width = `${(currentQ / total) * 100}%`;

  const badge = document.getElementById('quiz-badge');
  if (q.weight === 1) {
    badge.textContent = 'PROBABLY';
    badge.className = 'badge badge-probably';
  } else {
    badge.textContent = 'DEFINITELY';
    badge.className = 'badge badge-definitely';
  }
}

function answer(isYes) {
  if (isYes) score += QUESTIONS[currentQ].weight;
  currentQ++;
  if (currentQ < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}
```

- [ ] **Step 4: Add placeholder `showResult()` stub (to prevent errors)**

```js
function showResult() {
  // implemented in Task 5
  alert('Score: ' + score);
}
```

- [ ] **Step 5: Verify quiz flow in browser**

Open `index.html`, click "find out →". Verify:
- Question counter shows "1 / 30"
- Badge shows "PROBABLY" (lime) or "DEFINITELY" (pink) matching the question's weight
- Progress bar grows with each answer
- Question text fades between each question
- After 30 answers, an alert shows the final score (0–50)

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: quiz screen with progress, badges, scoring and transitions"
```

---

## Task 4: Archetypes data

**Files:**
- Modify: `index.html` — add `ARCHETYPES` constant and `getArchetype()` to `<script>`

- [ ] **Step 1: Add ARCHETYPES array to `<script>` (after QUESTIONS array, before quiz state variables)**

```js
const ARCHETYPES = [
  {
    name: "THE DECENT ONE",
    min: 0, max: 8,
    color: "#7bf1a8",
    shape: "circle",
    taglines: [
      "wait, you're actually okay? 🤔",
      "your friends genuinely like you back",
      "rare species tbh, don't waste it"
    ],
    tastes: {
      friend: "weirdly reliable, refreshing",
      work: "the one who actually follows through",
      date: "boring in the best way possible"
    }
  },
  {
    name: "THE FLAKE",
    min: 9, max: 16,
    color: "#a8e063",
    shape: "blob",
    taglines: [
      "loveable but you can't count on them 🫠",
      "3 'omw' texts and still 40 mins away",
      "good intentions, chaotic execution"
    ],
    tastes: {
      friend: "fun when they show up",
      work: "perpetually 'almost done'",
      date: "exciting until they vanish for a week"
    }
  },
  {
    name: "THE GHOST",
    min: 17, max: 24,
    color: "#4ecdc4",
    shape: "crescent",
    taglines: [
      "present but not really there 👻",
      "people wonder if they imagined you",
      "your read receipts say more than you do"
    ],
    tastes: {
      friend: "low maintenance but also just... low",
      work: "shows up, contributes nothing, disappears",
      date: "emotionally unavailable starter pack"
    }
  },
  {
    name: "THE LEECH",
    min: 25, max: 32,
    color: "#e96fff",
    shape: "diamond",
    taglines: [
      "takes more than it gives 🩸",
      "your friends are tired but too nice to say",
      "energy vampire with good vibes as cover"
    ],
    tastes: {
      friend: "draining after 2 hours",
      work: "great at delegating their own work",
      date: "their needs > your needs, always"
    }
  },
  {
    name: "THE VOLCANO",
    min: 33, max: 41,
    color: "#ff6b6b",
    shape: "triangle",
    taglines: [
      "spicy to be around 🌶️",
      "your friends text in group chats about u",
      "a walking red flag parade tbh"
    ],
    tastes: {
      friend: "exhausting but never boring",
      work: "the one who derails standups",
      date: "a rollercoaster with no seatbelt"
    }
  },
  {
    name: "THE CHAOS AGENT",
    min: 42, max: 50,
    color: "#ff9a3c",
    shape: "polygon",
    taglines: [
      "pure entropy, certified shit 💀",
      "you leave situations worse than you found them",
      "people recover from knowing you"
    ],
    tastes: {
      friend: "a trauma bond waiting to happen",
      work: "HR has a folder with your name on it",
      date: "therapy material, no cap"
    }
  }
];

function getArchetype(s) {
  return ARCHETYPES.find(a => s >= a.min && s <= a.max);
}
```

- [ ] **Step 2: Verify in browser console**

```js
getArchetype(0).name    // → "THE DECENT ONE"
getArchetype(8).name    // → "THE DECENT ONE"
getArchetype(9).name    // → "THE FLAKE"
getArchetype(33).name   // → "THE VOLCANO"
getArchetype(42).name   // → "THE CHAOS AGENT"
getArchetype(50).name   // → "THE CHAOS AGENT"
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: archetype data with taglines and taste descriptors"
```

---

## Task 5: Result screen

**Files:**
- Modify: `index.html` — add result CSS, result HTML, replace `showResult()` stub with real implementation

- [ ] **Step 1: Add result CSS inside `<style>` (after quiz styles)**

```css
/* Result */
#screen-result {
  text-align: center;
  gap: 0;
  padding: 40px 24px;
}

.archetype-shape {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
}

.shape-circle   { border-radius: 50%; }
.shape-blob     { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
.shape-crescent { clip-path: path('M 50 0 A 50 50 0 1 0 50 100 A 30 30 0 1 1 50 0 Z'); }
.shape-diamond  { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.shape-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
.shape-polygon  { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 90% 70%, 60% 100%, 40% 100%, 10% 70%, 0% 30%); }

.archetype-name {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.score-line {
  color: #7bf1a8;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

.taglines {
  list-style: none;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.taglines li { color: #aaa; font-size: 0.9rem; line-height: 1.4; }

.taste-section {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid #2a2a3e;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 28px;
  text-align: left;
}
.taste-section h3 {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: #555;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.taste-row { display: flex; gap: 8px; margin-bottom: 6px; font-size: 0.82rem; }
.taste-label { color: #666; min-width: 64px; flex-shrink: 0; }
.taste-value { color: #ccc; }

.result-actions {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 24px;
}
.btn-save {
  flex: 1;
  padding: 13px;
  background: linear-gradient(90deg, #e96fff, #7bf1a8);
  border: none;
  border-radius: 12px;
  color: #0d0d1a;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}
.btn-save:hover  { opacity: 0.88; }
.btn-save:active { transform: scale(0.97); }

.btn-retake {
  flex: 1;
  padding: 13px;
  background: transparent;
  border: 1px solid #2a2a3e;
  border-radius: 12px;
  color: #888;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.btn-retake:hover { border-color: #555; color: #bbb; }
```

- [ ] **Step 2: Replace `<section id="screen-result" class="screen"></section>` with result HTML**

```html
<section id="screen-result" class="screen">
  <div class="archetype-shape" id="result-shape"></div>
  <h2 class="archetype-name" id="result-name"></h2>
  <p class="score-line" id="result-score"></p>
  <ul class="taglines" id="result-taglines">
    <li id="tagline-0"></li>
    <li id="tagline-1"></li>
    <li id="tagline-2"></li>
  </ul>
  <div class="taste-section">
    <h3>what it's like...</h3>
    <div class="taste-row">
      <span class="taste-label">as a friend</span>
      <span class="taste-value" id="taste-friend"></span>
    </div>
    <div class="taste-row">
      <span class="taste-label">at work</span>
      <span class="taste-value" id="taste-work"></span>
    </div>
    <div class="taste-row">
      <span class="taste-label">to date</span>
      <span class="taste-value" id="taste-date"></span>
    </div>
  </div>
  <div class="result-actions">
    <button class="btn-save" onclick="downloadCard()">⬇ save card</button>
    <button class="btn-retake" onclick="startQuiz()">retake</button>
  </div>
  <a class="donate-link" href="https://ko-fi.com/PLACEHOLDER" target="_blank" rel="noopener">
    ☕ if this hit too hard, buy me a coffee
  </a>
</section>
```

- [ ] **Step 3: Replace the `showResult()` stub with real implementation**

```js
function showResult() {
  const arch = getArchetype(score);

  const shape = document.getElementById('result-shape');
  shape.style.background = arch.color;
  shape.className = 'archetype-shape shape-' + arch.shape;

  const nameEl = document.getElementById('result-name');
  nameEl.textContent = arch.name;
  nameEl.style.color = arch.color;

  document.getElementById('result-score').textContent = 'SHIT SCORE: ' + score + ' / 50';

  document.getElementById('tagline-0').textContent = arch.taglines[0];
  document.getElementById('tagline-1').textContent = arch.taglines[1];
  document.getElementById('tagline-2').textContent = arch.taglines[2];

  document.getElementById('taste-friend').textContent = arch.tastes.friend;
  document.getElementById('taste-work').textContent   = arch.tastes.work;
  document.getElementById('taste-date').textContent   = arch.tastes.date;

  showScreen('screen-result');
}
```

- [ ] **Step 4: Add placeholder `downloadCard()` stub**

```js
function downloadCard() {
  // implemented in Task 6
  alert('Card download — coming next!');
}
```

- [ ] **Step 5: Verify result screen in browser**

Complete the quiz. Verify:
- Coloured shape for the archetype (correct shape class and colour)
- Archetype name in the archetype's colour
- "SHIT SCORE: X / 50" in mint green
- 3 tagline lines in grey
- Taste descriptor rows
- "retake" restarts the quiz from question 1
- "save card" shows placeholder alert

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: result screen with archetype display and taste descriptors"
```

---

## Task 6: Canvas PNG card generator

**Files:**
- Modify: `index.html` — replace `downloadCard()` stub with full Canvas implementation

- [ ] **Step 1: Replace the `downloadCard()` stub with the full implementation**

```js
function downloadCard() {
  const arch = getArchetype(score);
  const SIZE = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, '#1a1a2e');
  bg.addColorStop(1, '#16213e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Archetype shape — centred at top third
  const cx = SIZE / 2;
  const cy = 340;
  const r  = 150;
  ctx.fillStyle = arch.color;

  if (arch.shape === 'circle' || arch.shape === 'blob') {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  } else if (arch.shape === 'crescent') {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#16213e';
    ctx.beginPath();
    ctx.arc(cx - 55, cy, r * 0.72, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = arch.color;
  } else if (arch.shape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(cx,     cy - r);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx,     cy + r);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fill();
  } else if (arch.shape === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(cx,     cy - r);
    ctx.lineTo(cx + r, cy + r);
    ctx.lineTo(cx - r, cy + r);
    ctx.closePath();
    ctx.fill();
  } else if (arch.shape === 'polygon') {
    const offsets = [0.3, 0.7, 1.0, 0.9, 0.7, 0.4, 0.1, 0.0];
    ctx.beginPath();
    offsets.forEach((v, i) => {
      const angle = (i / offsets.length) * Math.PI * 2 - Math.PI / 2;
      const pr = r * (0.7 + v * 0.3);
      const x = cx + Math.cos(angle) * pr;
      const y = cy + Math.sin(angle) * pr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  }

  // Archetype name
  ctx.fillStyle  = arch.color;
  ctx.font       = '900 72px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
  ctx.textAlign  = 'center';
  ctx.fillText(arch.name, SIZE / 2, 570);

  // Score
  ctx.fillStyle = '#7bf1a8';
  ctx.font      = '600 36px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
  ctx.fillText('SHIT SCORE: ' + score + ' / 50', SIZE / 2, 630);

  // Taglines
  ctx.fillStyle = '#aaaaaa';
  ctx.font      = '400 32px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
  arch.taglines.forEach(function(line, i) {
    ctx.fillText(line, SIZE / 2, 710 + i * 52);
  });

  // Watermark
  ctx.fillStyle  = '#333';
  ctx.font       = '400 24px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
  ctx.textAlign  = 'right';
  ctx.fillText('amishitbro.com', SIZE - 40, SIZE - 40);

  // Trigger download
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = 'amishitbro-' + arch.name.toLowerCase().replace(/\s+/g, '-') + '.png';
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
```

- [ ] **Step 2: Test card download in browser**

Complete the quiz, click "⬇ save card". A PNG file downloads. Open it and verify:
- 1080×1080px square
- Dark gradient background
- Archetype shape centred in upper half, correct colour
- Archetype name large and bold in archetype colour
- "SHIT SCORE: X / 50" in mint green
- 3 taglines in grey below
- `amishitbro.com` watermark bottom-right

Test 2 different score ranges (e.g. answer all NO for score 0 = "THE DECENT ONE", all YES for score 50 = "THE CHAOS AGENT").

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: canvas PNG card generator for Instagram sharing"
```

---

## Task 7: Screen transitions + mobile polish

**Files:**
- Modify: `index.html` — add fade animation CSS, verify mobile layout

- [ ] **Step 1: Add screen fade animation CSS (inside `<style>`, after `.donate-link` block, before `/* Quiz */`)**

```css
/* Transitions */
.screen.active {
  animation: fadeSlideIn 0.35s ease;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Verify transitions in browser**

- Hard-reload `index.html`
- Click "find out →" — should fade+slide into quiz
- Answer all 30 — should fade+slide into result screen
- Click "retake" — should fade+slide back into quiz

- [ ] **Step 3: Verify on mobile viewport**

In DevTools, toggle device toolbar (Ctrl+Shift+M), pick iPhone 12 (390×844).
- Landing: title fits, no horizontal overflow, button tappable
- Quiz: question text readable, both answer buttons full-width and large enough to tap
- Result: shape visible, all text readable, action buttons side-by-side

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: screen fade transitions and mobile layout verified"
```

---

## Task 8: Deploy

**Files:**
- No code changes — deployment steps only

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/amishitbro.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Enable GitHub Pages**

1. GitHub repo → Settings → Pages
2. Source: Deploy from branch → `main` → `/ (root)` → Save
3. Wait ~60 seconds
4. Live at `https://YOUR_USERNAME.github.io/amishitbro`

**OR Netlify (instant):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag project folder onto the page
3. Live immediately with a random URL
4. Rename to `amishitbro` in site settings → `amishitbro.netlify.app`

- [ ] **Step 3: Update donate URL**

Replace both instances of `https://ko-fi.com/PLACEHOLDER` in `index.html` with your real Ko-fi or Buy Me a Coffee URL.

```bash
git add index.html
git commit -m "chore: add donate URL"
git push
```

- [ ] **Step 4: Smoke test on real phone**

Open the live URL on your phone. Verify:
- Landing fits without horizontal scroll
- Quiz questions readable, buttons tappable
- Result card renders correctly
- "save card" downloads the PNG to your camera roll

---

## Self-Review Against Spec

| Spec requirement | Task |
|---|---|
| 30 yes/no questions | Task 2 |
| 10 PROBABLY (1pt) + 20 DEFINITELY (2pts), max 50 | Tasks 2, 3 |
| 6 archetypes: name, shape, color, taglines, tastes | Task 4 |
| Landing screen with CTA + donate link | Task 1 |
| Quiz: progress bar, badge, question, yes/no | Task 3 |
| Result: shape, name, score, taglines, tastes | Task 5 |
| Canvas PNG 1080×1080 download | Task 6 |
| Retake button | Task 5 |
| Donate link on landing + result | Tasks 1, 5 |
| `amishitbro.com` watermark | Task 6 |
| Screen transitions | Task 7 |
| Mobile-first layout | Task 7 |
| Static, zero cost, deploys fast | Task 8 |
