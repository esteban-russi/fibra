/**
 * Visual + console verification harness.
 * Drives the system Chrome over CDP, captures screenshots at a set of widths,
 * and reports any console errors or failed requests it sees on the way.
 */
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.env.BASE ?? 'http://localhost:5173'
const OUT = process.env.OUT ?? './shots'
mkdirSync(OUT, { recursive: true })

// pages: label|path|width|height|fullPage|actions
const specs = JSON.parse(process.env.SPECS ?? '[]')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell' in puppeteer ? true : true,
  // backdrop-filter needs a compositor: with --disable-gpu the drawer scrim
  // silently fails to paint in headless, which looks like a real bug and is not.
  args: [
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--enable-unsafe-swiftshader',
    '--use-gl=swiftshader',
  ],
  defaultViewport: null,
})

const problems = []

for (const s of specs) {
  const page = await browser.newPage()
  await page.setViewport({ width: s.w ?? 1440, height: s.h ?? 900, deviceScaleFactor: 1 })

  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      problems.push(`[${s.label}] console.${m.type()}: ${m.text().slice(0, 300)}`)
    }
  })
  page.on('pageerror', (e) => problems.push(`[${s.label}] pageerror: ${String(e).slice(0, 300)}`))
  page.on('requestfailed', (r) =>
    problems.push(`[${s.label}] requestfailed: ${r.url().slice(0, 160)} — ${r.failure()?.errorText}`),
  )
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`[${s.label}] HTTP ${r.status()}: ${r.url().slice(0, 160)}`)
  })

  if (s.lang) {
    await page.evaluateOnNewDocument((l) => {
      try { localStorage.setItem('fibra.lang', l) } catch {}
    }, s.lang)
  }
  await page.goto(BASE + s.path, { waitUntil: 'networkidle2', timeout: 45000 })
  // Settle fonts and layout.
  await page.evaluate(() => document.fonts?.ready)
  await new Promise((r) => setTimeout(r, s.settle ?? 700))

  if (s.eval) await page.evaluate(new Function(s.eval))
  if (s.click) {
    for (const sel of [].concat(s.click)) {
      const el = await page.$(sel)
      if (el) {
        await el.click()
        await new Promise((r) => setTimeout(r, 650))
      } else problems.push(`[${s.label}] click target not found: ${sel}`)
    }
  }
  if (s.scroll) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), s.scroll)
    await new Promise((r) => setTimeout(r, 700))
  }

  await page.screenshot({ path: `${OUT}/${s.label}.png`, fullPage: !!s.full })
  await page.close()
}

await browser.close()
if (problems.length) {
  console.log('--- PROBLEMS ---')
  for (const p of [...new Set(problems)]) console.log(p)
} else {
  console.log('--- NO CONSOLE ERRORS / FAILED REQUESTS ---')
}
