# Deploy & Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Get amishitbro.com live, shared on Instagram, and in front of real people — today.

**Architecture:** Static single-file HTML site (index.html + assets/) deployed to Cloudflare Pages (free, global CDN, instant deploys from git push). Domain pointed via Cloudflare DNS. Instagram promotion via a short Reel + Story with the link in bio.

**Tech Stack:** Cloudflare Pages (hosting), GitHub (git remote + Pages CI), Namecheap/Cloudflare Registrar (domain), Ko-fi (monetization already wired)

---

## File Map

| File | What it is |
|------|-----------|
| `index.html` | The whole app — no changes needed |
| `assets/*.png` | Jesus images — already in place |
| `.gitignore` | Add `.superpowers/` so it doesn't ship |
| `docs/superpowers/plans/` | Plans stay in repo, never served |

No new source files needed. This plan is pure infrastructure + promotion.

---

## Task 1: Clean repo for public push

**Files:**
- Create: `.gitignore`
- No test needed (git verify)

- [ ] **Step 1: Create .gitignore**

```
.superpowers/
.DS_Store
*.local
```

Save as `.gitignore` in project root.

- [ ] **Step 2: Verify nothing sensitive is tracked**

```bash
git status
git log --oneline
```

Expected: only `index.html`, `assets/`, `docs/`, `README.md`, `.gitignore` visible.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore"
```

---

## Task 2: Push to GitHub (public repo)

**Why GitHub:** Cloudflare Pages connects directly to GitHub and auto-deploys on every push. Free. No build step needed since the app is pure HTML.

- [ ] **Step 1: Create public GitHub repo**

Go to https://github.com/new
- Name: `amishitbro`
- Visibility: **Public**
- Do NOT add README/gitignore (repo already has them)
- Click "Create repository"

- [ ] **Step 2: Add remote and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/amishitbro.git
git branch -M main
git push -u origin main
```

Expected: repo visible at `github.com/YOUR_USERNAME/amishitbro`

---

## Task 3: Deploy to Cloudflare Pages

**Why Cloudflare Pages:** Free, global CDN, SSL auto, custom domain, deploys in ~30 seconds from git push.

- [ ] **Step 1: Create Cloudflare account (if needed)**

Go to https://dash.cloudflare.com/sign-up — free tier covers this completely.

- [ ] **Step 2: Connect GitHub repo**

In Cloudflare dashboard:
1. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize GitHub
3. Select `amishitbro` repo
4. Click **Begin setup**

- [ ] **Step 3: Configure build settings**

On the build config screen:
- Framework preset: **None**
- Build command: *(leave blank)*
- Build output directory: `/` (or leave blank — Cloudflare auto-detects `index.html`)
- Click **Save and Deploy**

- [ ] **Step 4: Verify deploy**

Cloudflare gives you a URL like `amishitbro.pages.dev`.
Open it. Quiz should work end-to-end.

Expected: landing screen loads, quiz runs, result shows, carousel and books work.

---

## Task 4: Get a domain (if not already owned)

**Cheapest option:** Cloudflare Registrar (at-cost pricing, ~$8-10/yr for `.com`). Alternatives: Namecheap (~$12/yr).

- [ ] **Step 1: Check if amishitbro.com is available**

Go to https://www.namecheap.com or https://dash.cloudflare.com → Registrar → search `amishitbro.com`

- [ ] **Step 2: Buy the domain**

If available on Cloudflare Registrar:
- Cloudflare dashboard → **Domain Registration** → **Register Domains** → search → buy
- Payment: credit card, ~$9-10

If buying on Namecheap:
- Buy there, then point nameservers to Cloudflare (see Task 5 alternative path)

- [ ] **Step 3: (If using Namecheap) Point nameservers to Cloudflare**

In Cloudflare dashboard:
1. **Add a Site** → enter `amishitbro.com`
2. Choose Free plan
3. Copy the two Cloudflare nameservers shown (e.g. `aria.ns.cloudflare.com`)

In Namecheap dashboard:
1. Domain list → `amishitbro.com` → **Manage** → **Nameservers** → **Custom DNS**
2. Paste both Cloudflare nameservers → Save

Propagation: 15 min – 48 hrs (usually under 1 hr)

---

## Task 5: Connect custom domain to Cloudflare Pages

- [ ] **Step 1: Add custom domain in Pages**

In Cloudflare dashboard → Workers & Pages → `amishitbro` → **Custom Domains** → **Set up a custom domain**
- Enter: `amishitbro.com`
- Also add: `www.amishitbro.com`
- Cloudflare auto-creates DNS records and provisions SSL

- [ ] **Step 2: Verify SSL and redirect**

Wait 2-5 minutes, then open `https://amishitbro.com`.
Expected: site loads over HTTPS, no cert warning.

- [ ] **Step 3: Add www → apex redirect (optional)**

In Cloudflare DNS, `www` CNAME should already point to `amishitbro.pages.dev`. If not:
- DNS → Add record → CNAME → Name: `www` → Target: `amishitbro.pages.dev`

---

## Task 6: Wire Ko-fi link in bio

The Ko-fi link (`ko-fi.com/kokozoo`) is already in the site. Now make it the Instagram bio link.

- [ ] **Step 1: Update Instagram bio link**

Instagram profile → Edit profile → **Website**: `https://amishitbro.com`

- [ ] **Step 2: Add a Linktree-style landing (optional, skip if YAGNI)**

If you want both the quiz AND Ko-fi in bio — use a free Linktree or Beacons page:
1. Go to https://beacons.ai (free)
2. Add two links: "Am I Shit Bro? →" + "Buy me a coffee ☕"
3. Put the Beacons URL in Instagram bio

---

## Task 7: Instagram Reel — the launch post

This is the highest-leverage promotion action. A 15-30 second Reel showing the quiz flow gets the most reach.

- [ ] **Step 1: Record the screen flow**

On your phone:
1. Screen record yourself going through the quiz (start → profile → 3-4 questions → result)
2. Keep it under 30 seconds
3. Pause on the result screen for 2-3 seconds ("you little golden shit")

Tools: iOS built-in screen record, or AZ Screen Recorder on Android.

- [ ] **Step 2: Edit the Reel**

In Instagram Reels editor or CapCut (free):
- Add text overlay at start: **"Am I Shit Bro? 💩"**
- Add text at end: **"link in bio → take the quiz"**
- Music: pick a trending audio in Instagram (tap the music icon, sort by Trending)

- [ ] **Step 3: Write the caption**

```
Be honest. Are you? 💩

took a quiz to find out. results were... humbling.

link in bio → amishitbro.com

#quiz #selfaware #brutalhonesty #funny #viral #fyp #amishitbro
```

- [ ] **Step 4: Post as Reel**

- Post time: **7-9pm local** (peak engagement window)
- Add to Story as well (tap "Share to Story" after posting)
- Pin to profile

---

## Task 8: Story with link sticker

Instagram Stories get direct link clicks. Do this same day as the Reel.

- [ ] **Step 1: Create Story frame**

Use Canva (free) or just the Instagram Stories editor:
- Dark background (#1a1a2e to match the site)
- Big text: **"AM I SHIT BRO? 💩"**
- Subtext: "20 questions. brutal truth. no cap."

- [ ] **Step 2: Add Link sticker**

In Stories editor → Sticker → **Link** → paste `https://amishitbro.com` → label: "take the quiz →"

- [ ] **Step 3: Post to Story**

Stories expire after 24h — repost every 2-3 days to keep traffic flowing.

---

## Task 9: Future deploys (ongoing)

Once the pipeline is set up, every code change deploys automatically.

- [ ] **Workflow for future changes:**

```bash
# make changes to index.html
git add index.html
git commit -m "feat: whatever you changed"
git push origin main
# Cloudflare auto-deploys in ~30 seconds
```

No build step, no CLI tools, no manual deploys.

---

## Launch Checklist

Before posting the Reel, verify:

- [ ] `https://amishitbro.com` loads (HTTPS, no errors)
- [ ] Quiz runs end-to-end on mobile (iPhone + Android if possible)
- [ ] Result card downloads correctly
- [ ] Carousel navigates (tap arrows + swipe)
- [ ] Books modal opens + Ko-fi link works
- [ ] Ko-fi profile is set up at `ko-fi.com/kokozoo`
- [ ] Instagram bio link updated to `amishitbro.com`

---

## Cost Summary

| Item | Cost |
|------|------|
| Cloudflare Pages hosting | Free |
| GitHub repo | Free |
| Domain `amishitbro.com` | ~$9-10/yr |
| Instagram promotion | Free (organic) |
| Ko-fi | Free (5% fee on donations) |
| **Total today** | **~$10** |
