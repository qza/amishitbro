# Am I Shit Bro V2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the quiz with a profile screen (gender/age), 20 new all-original questions with multi-option + negative scoring, gender multiplier, and a closing "SO WHAT IF YOU ARE SHIT!" screen.

**Architecture:** All changes are in the single `index.html` file. Five screens: landing → profile → quiz → result → closing. JS state machine extended with `userProfile` and `rawScore`. QUESTIONS array shape changes from `{ text, weight }` to `{ text, badge, answers: [{label, score}] }`. Answer buttons are now dynamically rendered pills. Gender multiplier applied at score finalisation.

**Tech Stack:** Vanilla HTML/CSS/JS, Canvas API. No dependencies, no build step.

---

## File Map

| File | Changes |
|------|---------|
| `index.html` | All changes — CSS additions, HTML additions, full JS rewrite of data + logic |

---

## Task 1: Update QUESTIONS array and ARCHETYPES ranges

**Files:**
- Modify: `index.html`

Replace the old QUESTIONS array and update ARCHETYPES min/max ranges. Nothing else changes yet.

- [ ] **Step 1: Replace the entire QUESTIONS array**

In `index.html`, find the block starting with `const QUESTIONS = [` and ending with its closing `];`. Replace it entirely with:

```js
    const QUESTIONS = [
      {
        text: "Do you collect Tarzans in the forest between anus hole and balls?",
        badge: "DEFINITELY",
        answers: [{ label: "yeah", score: 2 }, { label: "nah", score: 0 }]
      },
      {
        text: 'Have people told you "stop shitting on me"?',
        badge: "DEFINITELY",
        answers: [{ label: "yeah", score: 2 }, { label: "nah", score: 0 }]
      },
      {
        text: "Do you do that ass movement that lifts your back upward, ready to make shit?",
        badge: "PROBABLY",
        answers: [{ label: "yeah", score: 1 }, { label: "nah", score: 0 }]
      },
      {
        text: "Do you spin your head round making disgusted faces?",
        badge: "PROBABLY",
        answers: [{ label: "yeah", score: 1 }, { label: "nah", score: 0 }]
      },
      {
        text: "Did you ever get told to eat shit? Or is this not some city shit you know?",
        badge: "DEFINITELY",
        answers: [{ label: "yeah", score: 2 }, { label: "nah", score: 0 }]
      },
      {
        text: "Do you buy watches for all your friends and you're not a football player?",
        badge: "PROBABLY",
        answers: [{ label: "yeah", score: 1 }, { label: "nah", score: 0 }]
      },
      {
        text: 'Have you ever responded: "who gives a damn if you are shit or not?"',
        badge: "DEFINITELY",
        answers: [{ label: "yeah", score: 2 }, { label: "nah", score: 0 }]
      },
      {
        text: 'Do you say often: "stop looking at me you shit!"',
        badge: "MIRROR",
        answers: [{ label: "sometimes", score: -1 }, { label: "yes", score: 0 }, { label: "no", score: 2 }]
      },
      {
        text: "Do you often find material in your anus bag (hard to clean spot)?",
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "nah", score: 1 }]
      },
      {
        text: "Are you aware that you are shit sometimes?",
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "nah", score: 2 }]
      },
      {
        text: "Do you find that shit funny and tasty?",
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "nah", score: 1 }]
      },
      {
        text: "Am I shit or you are shit?",
        badge: "MIRROR",
        answers: [{ label: "both", score: 0 }, { label: "you", score: -1 }, { label: "I", score: 2 }]
      },
      {
        text: "Do you keep a lot of shit in your iPhone or mobile?",
        badge: "PROBABLY",
        answers: [{ label: "yeah", score: 0 }, { label: "nah", score: 1 }]
      },
      {
        text: "Can you tell easily if somebody is a shit or not?",
        badge: "DEFINITELY",
        answers: [{ label: "yeah", score: 2 }, { label: "nah", score: 0 }]
      },
      {
        text: "Are you ready to go all white tonight? Party?",
        badge: "PROBABLY",
        answers: [{ label: "yeah", score: 1 }, { label: "nah", score: 0 }]
      },
      {
        text: "Do you think brown sugar is healthier than white sugar?",
        badge: "MIRROR",
        answers: [{ label: "same thing", score: 1 }, { label: "yeah", score: 0 }, { label: "nah", score: -1 }]
      },
      {
        text: 'Do you hear often: "well that is the shit of an argument"',
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "nah", score: 1 }]
      },
      {
        text: 'Do you get sometimes: "hey, that is a secret you shit"',
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "nah", score: 1 }]
      },
      {
        text: "Do you care at all about your shit friends?",
        badge: "MIRROR",
        answers: [{ label: "yeah", score: -1 }, { label: "can't tell", score: 0 }, { label: "nah", score: 1 }]
      },
      {
        text: "Do you ever say sorry you shit?",
        badge: "MIRROR",
        answers: [{ label: "yeah", score: 1 }, { label: "not like that", score: -1 }]
      },
    ];
```

- [ ] **Step 2: Update ARCHETYPES min/max ranges**

Find the six archetype objects in the ARCHETYPES array. Update only the `min` and `max` values (leave name, color, shape, taglines, tastes untouched):

```js
// THE DECENT ONE:  min: -8, max: 2,
// THE FLAKE:       min: 3,  max: 8,
// THE GHOST:       min: 9,  max: 14,
// THE LEECH:       min: 15, max: 19,
// THE VOLCANO:     min: 20, max: 24,
// THE CHAOS AGENT: min: 25, max: 30,
```

- [ ] **Step 3: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: v2 questions array and recalibrated archetype ranges"
```

---

## Task 2: Profile screen — CSS + HTML

**Files:**
- Modify: `index.html`

Add the profile screen CSS and HTML. No JS yet.

- [ ] **Step 1: Add profile CSS inside `<style>`, after the `.btn-retake:hover` rule and before `</style>`**

```css

    /* Profile */
    #screen-profile { gap: 0; padding: 40px 24px; text-align: center; }

    .profile-title {
      font-size: 1.1rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #fff;
      margin-bottom: 6px;
    }

    .profile-subtitle {
      color: #555;
      font-size: 0.8rem;
      margin-bottom: 36px;
    }

    .profile-section {
      width: 100%;
      margin-bottom: 28px;
      text-align: left;
    }

    .profile-label {
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: #555;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .pill {
      padding: 8px 18px;
      border: 1px solid #2a2a3e;
      border-radius: 24px;
      background: rgba(255,255,255,0.03);
      color: #888;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;
      user-select: none;
    }
    .pill:hover { border-color: #555; color: #ccc; }
    .pill.selected {
      border-color: #e96fff;
      color: #e96fff;
      background: rgba(233,111,255,0.1);
    }
    .pill.locked {
      border-color: #4ecdc4;
      color: #4ecdc4;
      background: rgba(78,205,196,0.1);
      cursor: default;
      opacity: 0.8;
    }

    .btn-letsgo {
      width: 100%;
      padding: 14px;
      background: linear-gradient(90deg, #e96fff, #7bf1a8);
      border: none;
      border-radius: 40px;
      color: #0d0d1a;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      letter-spacing: 0.03em;
      transition: transform 0.15s, opacity 0.15s;
      margin-top: 8px;
    }
    .btn-letsgo:hover { transform: scale(1.02); opacity: 0.92; }
    .btn-letsgo:active { transform: scale(0.97); }
    .btn-letsgo:disabled {
      opacity: 0.25;
      cursor: not-allowed;
      transform: none;
    }
```

- [ ] **Step 2: Add `#screen-profile` HTML between the landing section and the quiz section**

Find the comment `<!-- Screen 2: Quiz (populated by JS) -->` and insert this block immediately BEFORE it:

```html
  <!-- Screen 2: Profile -->
  <section id="screen-profile" class="screen">
    <p class="profile-title">QUICK PROFILE</p>
    <p class="profile-subtitle">takes 2 seconds, affects your result</p>

    <div class="profile-section">
      <p class="profile-label">gender</p>
      <div class="pill-row" id="gender-pills">
        <button class="pill" data-value="male"   onclick="selectGender(this)">Male</button>
        <button class="pill" data-value="female" onclick="selectGender(this)">Female</button>
        <button class="pill" data-value="chaos"  onclick="selectGender(this)">Chaos</button>
      </div>
    </div>

    <div class="profile-section">
      <p class="profile-label">age</p>
      <div class="pill-row" id="age-pills">
        <button class="pill" data-value="young"     onclick="selectAge(this)">Young</button>
        <button class="pill" data-value="man-woman" onclick="selectAge(this)">Man/Woman</button>
        <button class="pill" data-value="kinda-old" onclick="selectAge(this)">Kinda old</button>
      </div>
    </div>

    <button class="btn-letsgo" id="btn-letsgo" onclick="beginQuiz()" disabled>let's go →</button>
  </section>

```

- [ ] **Step 3: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: profile screen CSS and HTML"
```

---

## Task 3: Profile screen — JavaScript logic

**Files:**
- Modify: `index.html`

Add userProfile state, selectGender(), selectAge(), beginQuiz(). Wire landing to profile. Chaos auto-locks age.

- [ ] **Step 1: Update `startQuiz()` to navigate to profile screen**

Find and replace the entire `startQuiz()` function:

```js
    function startQuiz() {
      showScreen('screen-profile');
    }
```

- [ ] **Step 2: Add profile state and functions BEFORE the `startQuiz()` function**

```js
    let userProfile = { gender: null, age: null };

    function selectGender(pill) {
      document.querySelectorAll('#gender-pills .pill').forEach(function(p) {
        p.classList.remove('selected');
      });
      pill.classList.add('selected');
      userProfile.gender = pill.dataset.value;

      var agePills = document.getElementById('age-pills');

      if (userProfile.gender === 'chaos') {
        userProfile.age = 'middle-age';
        agePills.innerHTML = '<button class="pill locked">Middle age \uD83D\uDE36</button>';
      } else {
        if (userProfile.age === 'middle-age') { userProfile.age = null; }
        var youngSel    = userProfile.age === 'young'     ? ' selected' : '';
        var mwSel       = userProfile.age === 'man-woman' ? ' selected' : '';
        var kindaSel    = userProfile.age === 'kinda-old' ? ' selected' : '';
        agePills.innerHTML =
          '<button class="pill' + youngSel  + '" data-value="young"     onclick="selectAge(this)">Young</button>' +
          '<button class="pill' + mwSel     + '" data-value="man-woman" onclick="selectAge(this)">Man/Woman</button>' +
          '<button class="pill' + kindaSel  + '" data-value="kinda-old" onclick="selectAge(this)">Kinda old</button>';
      }
      updateLetsGo();
    }

    function selectAge(pill) {
      document.querySelectorAll('#age-pills .pill').forEach(function(p) {
        p.classList.remove('selected');
      });
      pill.classList.add('selected');
      userProfile.age = pill.dataset.value;
      updateLetsGo();
    }

    function updateLetsGo() {
      document.getElementById('btn-letsgo').disabled = !(userProfile.gender && userProfile.age);
    }

    function beginQuiz() {
      currentQ = 0;
      score = 0;
      renderQuestion();
      showScreen('screen-quiz');
    }

```

- [ ] **Step 3: Verify profile screen in browser**

Open `index.html`. Click "find out →". Verify:
- Profile screen appears with "QUICK PROFILE" heading
- Gender pills: Male / Female / Chaos — only one selectable, selected turns pink
- Age pills: Young / Man/Woman / Kinda old — same
- "let's go →" disabled until both selected
- Selecting Chaos → age row replaced with single teal locked "Middle age" pill
- Switching from Chaos back to Male/Female → age pills reappear, nothing selected, button disabled
- Clicking "let's go →" with both selected → navigates to quiz

- [ ] **Step 4: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: profile screen JS — gender/age selection, Chaos mechanic"
```

---

## Task 4: Quiz — multi-option answer pills, MIRROR badge, gender multiplier

**Files:**
- Modify: `index.html`

Replace hardcoded yes/no buttons with dynamic pills. Add MIRROR badge. Update renderQuestion() and answer(). Add finaliseScore() with gender multiplier.

- [ ] **Step 1: Add MIRROR badge CSS**

Find in `<style>`:
```css
    .badge-definitely { background: rgba(233, 111, 255, 0.15); color: #e96fff; }
```

Add after it:
```css
    .badge-mirror { background: rgba(78, 205, 196, 0.15); color: #4ecdc4; }
```

- [ ] **Step 2: Replace hardcoded answer buttons in `#screen-quiz` HTML**

Find:
```html
    <div class="answer-btns">
      <button class="btn-answer yes" onclick="answer(true)">✓ yeah bro, no cap</button>
      <button class="btn-answer no"  onclick="answer(false)">✗ nah that's not me</button>
    </div>
```

Replace with:
```html
    <div class="answer-btns" id="answer-btns"></div>
```

- [ ] **Step 3: Replace `renderQuestion()` with new version**

Find and replace the entire `renderQuestion()` function:

```js
    function renderQuestion() {
      var q     = QUESTIONS[currentQ];
      var total = QUESTIONS.length;

      var qText = document.getElementById('question-text');
      qText.style.opacity = '0';
      setTimeout(function() {
        qText.textContent = q.text;
        qText.style.opacity = '1';
      }, 150);

      document.getElementById('quiz-counter').textContent = (currentQ + 1) + ' / ' + total;
      document.getElementById('progress-fill').style.width = ((currentQ / total) * 100) + '%';

      var badgeMap = {
        'PROBABLY':   { text: 'PROBABLY',   cls: 'badge badge-probably'   },
        'DEFINITELY': { text: 'DEFINITELY', cls: 'badge badge-definitely' },
        'MIRROR':     { text: 'MIRROR',     cls: 'badge badge-mirror'     }
      };
      var b = badgeMap[q.badge] || badgeMap['PROBABLY'];
      var badge = document.getElementById('quiz-badge');
      badge.textContent = b.text;
      badge.className   = b.cls;

      var btns = document.getElementById('answer-btns');
      btns.innerHTML = q.answers.map(function(a, i) {
        return '<button class="btn-answer" onclick="answer(' + i + ')">' + a.label + '</button>';
      }).join('');
    }
```

- [ ] **Step 4: Replace `answer()` and add `finaliseScore()`**

Find and replace the entire `answer(isYes)` function:

```js
    function answer(idx) {
      score += QUESTIONS[currentQ].answers[idx].score;
      currentQ++;
      if (currentQ < QUESTIONS.length) {
        renderQuestion();
      } else {
        finaliseScore();
      }
    }

    function finaliseScore() {
      var multipliers = { male: 1.0, female: 1.5, chaos: 0.67 };
      var m = multipliers[userProfile.gender] || 1.0;
      score = Math.round(score * m);
      showResult();
    }
```

- [ ] **Step 5: Update quiz counter initial text in HTML**

Find:
```html
      <span class="quiz-counter" id="quiz-counter">1 / 30</span>
```

Replace with:
```html
      <span class="quiz-counter" id="quiz-counter">1 / 20</span>
```

- [ ] **Step 6: Verify quiz flow in browser**

Complete profile, reach quiz. Verify:
- Counter shows "1 / 20" and advances
- Badge shows PROBABLY (lime), DEFINITELY (pink), or MIRROR (teal) per question
- 2 or 3 answer pills per question depending on the question
- Clicking any pill immediately advances
- After 20 answers, reaches result screen
- Score on result shows "/ 30"

- [ ] **Step 7: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: multi-option answer pills, MIRROR badge, gender multiplier"
```

---

## Task 5: Result screen — score display + "so what?" button

**Files:**
- Modify: `index.html`

Update score display to / 30. Add "so what?" button. Update canvas card.

- [ ] **Step 1: Update `showResult()` score display**

Find in `showResult()`:
```js
      document.getElementById('result-score').textContent = 'SHIT SCORE: ' + score + ' / 50';
```

Replace with:
```js
      document.getElementById('result-score').textContent = 'SHIT SCORE: ' + score + ' / 30';
```

- [ ] **Step 2: Add `.btn-sowhat` CSS after `.btn-retake:hover` rule**

```css

    .btn-sowhat {
      width: 100%;
      padding: 11px;
      background: transparent;
      border: 1px solid #333;
      border-radius: 40px;
      color: #555;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.04em;
      transition: border-color 0.2s, color 0.2s;
      margin-top: 4px;
    }
    .btn-sowhat:hover { border-color: #7bf1a8; color: #7bf1a8; }
```

- [ ] **Step 3: Add "so what?" button to result screen HTML**

Find in `#screen-result`:
```html
    <div class="result-actions">
      <button class="btn-save" onclick="downloadCard()">⬇ save card</button>
      <button class="btn-retake" onclick="startQuiz()">retake</button>
    </div>
```

Replace with:
```html
    <div class="result-actions">
      <button class="btn-save" onclick="downloadCard()">⬇ save card</button>
      <button class="btn-retake" onclick="startQuiz()">retake</button>
    </div>
    <button class="btn-sowhat" onclick="showScreen('screen-closing')">so what? →</button>
```

- [ ] **Step 4: Update canvas card score display**

Find in `downloadCard()`:
```js
      ctx.fillText('SHIT SCORE: ' + score + ' / 50', SIZE / 2, 630);
```

Replace with:
```js
      ctx.fillText('SHIT SCORE: ' + score + ' / 30', SIZE / 2, 630);
```

- [ ] **Step 5: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: result score / 30, so what button, canvas card update"
```

---

## Task 6: Closing screen

**Files:**
- Modify: `index.html`

Add fifth screen — "SO WHAT IF YOU ARE SHIT!" with life coach copy.

- [ ] **Step 1: Add closing CSS inside `<style>`, after `.btn-sowhat:hover`**

```css

    /* Closing */
    #screen-closing {
      text-align: center;
      gap: 0;
      padding: 48px 24px 40px;
    }

    .closing-headline {
      font-size: clamp(1.8rem, 8vw, 2.8rem);
      font-weight: 900;
      background: linear-gradient(90deg, #e96fff, #7bf1a8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .closing-hook {
      font-size: 0.95rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 32px;
      letter-spacing: 0.02em;
    }

    .closing-body {
      color: #aaa;
      font-size: 0.9rem;
      line-height: 1.7;
      text-align: left;
      margin-bottom: 36px;
    }

    .closing-body p { margin-bottom: 16px; }
    .closing-body p:last-child { margin-bottom: 0; }

    .closing-body strong {
      color: #fff;
      font-weight: 700;
    }
```

- [ ] **Step 2: Add `#screen-closing` HTML immediately before `<script>`**

```html
  <!-- Screen 5: Closing -->
  <section id="screen-closing" class="screen">
    <h2 class="closing-headline">SO WHAT IF YOU ARE SHIT!</h2>
    <p class="closing-hook">We know you are shit. We are here to help.</p>
    <div class="closing-body">
      <p>Look. You took a quiz on the internet to find out if you're a bad person. That's either the most self-aware thing someone can do, or the most delusional. Either way — you're here.</p>
      <p>Maybe you made a bad step. Maybe the people around you never learned the lesson that turned out to be yours to carry. Maybe your DNA line has been holding that pattern for a long time and it landed on you to break it.</p>
      <p>The shit isn't funny for long. You already know that.</p>
      <p><strong>You're not broken. You're just unfinished.</strong></p>
    </div>
    <button class="btn-primary" onclick="startQuiz()" style="margin-bottom:16px">start over →</button>
    <a class="donate-link" href="https://ko-fi.com/PLACEHOLDER" target="_blank" rel="noopener">
      ☕ if this hit different, buy me a coffee
    </a>
  </section>

```

- [ ] **Step 3: Verify closing screen**

Complete quiz, click "so what? →". Verify:
- Gradient headline "SO WHAT IF YOU ARE SHIT!" fills screen top
- "We know you are shit. We are here to help." below in white
- Four grey paragraphs, last line "You're not broken. You're just unfinished." in white bold
- "start over →" gradient pill button works (returns to landing)
- Donate link at bottom

- [ ] **Step 4: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "feat: closing screen — SO WHAT IF YOU ARE SHIT"
```

---

## Task 7: Landing subtitle fix

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update subtitle from 30 to 20 questions**

Find:
```html
    <p class="subtitle">30 questions. brutal truth. no cap.</p>
```

Replace with:
```html
    <p class="subtitle">20 questions. brutal truth. no cap.</p>
```

- [ ] **Step 2: Commit**

```bash
git -C /home/z/Development/amishitbro add index.html
git -C /home/z/Development/amishitbro commit -m "chore: update landing subtitle to 20 questions"
```

---

## Self-Review Against Spec

| Spec requirement | Task |
|---|---|
| Profile screen: Male / Female / Chaos gender pills | Task 2, 3 |
| Profile screen: Young / Man/Woman / Kinda old age pills | Task 2, 3 |
| Chaos gender → age auto-locks to "Middle age" | Task 3 |
| Button disabled until both gender + age selected | Task 3 |
| userProfile = { gender, age } stored in JS state | Task 3 |
| 20 questions, new { text, badge, answers } shape | Task 1 |
| Multi-option answer pills, dynamically rendered | Task 4 |
| MIRROR badge (teal) for self-awareness trap questions | Task 4 |
| Negative scoring possible | Task 4 |
| Gender multiplier: Female x1.5, Chaos x0.67, Male x1.0 | Task 4 |
| finaliseScore() applies multiplier then calls showResult() | Task 4 |
| Archetype ranges recalibrated -8 to 30 | Task 1 |
| Score display "/ 30" on result screen | Task 5 |
| Score display "/ 30" on canvas card | Task 5 |
| "so what?" button on result screen | Task 5 |
| Closing screen with gradient headline | Task 6 |
| "We know you are shit. We are here to help." subheading | Task 6 |
| Four-paragraph life coach body copy | Task 6 |
| "You're not broken. You're just unfinished." closing line | Task 6 |
| "start over →" button on closing screen | Task 6 |
| Landing subtitle updated to 20 questions | Task 7 |
