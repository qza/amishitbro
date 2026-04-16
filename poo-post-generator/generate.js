const Anthropic = require('@anthropic-ai/sdk')
const fs = require('fs')
const path = require('path')
let open
const config = require('./config')

async function main() {
  ;({ default: open } = await import('open'))

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is not set.')
    console.error('Usage: ANTHROPIC_API_KEY=sk-... node generate.js')
    process.exit(1)
  }

  console.log('Calling Claude API...')

  const client = new Anthropic({ apiKey })

  let fact
  try {
    const message = await client.messages.create({
      model: config.model,
      max_tokens: 256,
      system: config.systemPrompt,
      messages: [{ role: 'user', content: config.userPrompt }],
    })
    const block = message.content.find(b => b.type === 'text')
    if (!block || !block.text.trim()) {
      console.error('Error: Claude returned an empty or non-text response.')
      process.exit(1)
    }
    fact = block.text.trim()
  } catch (err) {
    console.error('Error calling Claude API:', err.message)
    process.exit(1)
  }

  console.log('Generated fact:', fact)

  const templatePath = path.join(__dirname, 'template.html')
  let html
  try {
    html = fs.readFileSync(templatePath, 'utf8')
  } catch (err) {
    console.error('Error reading template.html:', err.message)
    process.exit(1)
  }

  html = html.replaceAll('{{FACT}}', escapeHtml(fact))
  html = html.replaceAll('{{SITE_URL}}', escapeHtml(config.siteUrl))

  const today = new Date().toISOString().split('T')[0]
  const outputDir = path.join(__dirname, 'output')
  fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, `post-${today}.html`)

  try {
    fs.writeFileSync(outputPath, html, 'utf8')
  } catch (err) {
    console.error('Error writing output file:', err.message)
    process.exit(1)
  }

  console.log('Saved to:', outputPath)
  console.log('Opening in browser...')

  await open(outputPath)
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

main()
