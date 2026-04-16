# Poo Post Generator

Generates weekly funny poo science Instagram posts using Claude AI.

## Setup

```bash
cd poo-post-generator
npm install
```

## Usage

```bash
ANTHROPIC_API_KEY=sk-... node generate.js
```

Opens a browser preview of the Instagram card. Screenshot or use browser print-to-PDF to save as image.

## Customise

Edit `config.js` to change:
- `model` — Claude model to use
- `systemPrompt` — personality/expertise of the AI
- `userPrompt` — what to ask for each post
- `siteUrl` — link shown on the card

Edit `template.html` to change the visual design.
