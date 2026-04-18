# Am I Shit Bro?

A brutally honest personality quiz. Are you shit, bro?

## Customize

### Add your own questions
Edit the `questions` array in `index.html` — each question needs a `text` (string) and `answers` (array of objects with `text` and `score`). That's it.

### Make your own quiz
Fork this repo and swap out the questions, title, and archetypes. The scoring system is generic — you can theme it however you want.

## Deploy

Live at **https://qza.github.io/amishitbro/** (EN) and **/sr/** (Serbian).

### To fork and deploy your own
1. Push this repo to GitHub
2. Settings → Pages → Source: `main` / `(root)`
3. Done. Live at `https://<your-user>.github.io/amishitbro`

### Netlify (alternative)
Drag the folder into netlify.com/drop. Done.

## Analytics

Uses [GoatCounter](https://www.goatcounter.com) — cookieless, no PII, **no consent banner required** under GDPR.

Four custom events track the funnel that matters:
- `quiz_start` — user enters the profile/quiz flow
- `quiz_complete` — result screen renders
- `kofi_click/<placement>` — Ko-fi click, with placement (`landing`, `result`, `closing`, `bookmodal`) so you see which CTA slot actually earns coffees
- `src/<channel>` — set via `?src=` URL param (e.g. `?src=yt`, `?src=viber`) so you know which distribution channel drives traffic

When sharing, always tag the URL with `?src=<channel>`. Examples:
- YouTube Community post: `https://qza.github.io/amishitbro/?src=yt`
- Viber: `?src=viber`
- Instagram bio: `?src=ig`

To point analytics at your own GoatCounter instance, change the `data-goatcounter` URL in `index.html`.

## Donate URL
Replace `https://ko-fi.com/zeebrojungle` in `index.html` with your own Ko-fi or Buy Me a Coffee URL.
