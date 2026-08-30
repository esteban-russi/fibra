/**
 * Interaction + accessibility verification.
 * Drives real keyboard and pointer input against the running dev server and
 * asserts the behaviours the specification requires, rather than eyeballing.
 */
import puppeteer from 'puppeteer-core'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.env.BASE ?? 'http://localhost:5173'
const results = []
const ok = (n, c, d = '') => results.push(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`)

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--enable-unsafe-swiftshader', '--use-gl=swiftshader'],
})
const p = await b.newPage()
const errors = []
p.on('pageerror', (e) => errors.push(String(e)))
p.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
await p.setViewport({ width: 1440, height: 900 })

/* ---------- 1. Language switching ---------- */
await p.goto(BASE + '/atlas', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 500))
const enTitle = await p.$eval('h1, h2', (el) => el.textContent.trim())
await p.click('button[role="radio"][aria-checked="false"]')
await new Promise((r) => setTimeout(r, 400))
const esTitle = await p.$eval('h1, h2', (el) => el.textContent.trim())
const htmlLang = await p.$eval('html', (el) => el.lang)
ok('language switch changes content', enTitle !== esTitle, `${enTitle} -> ${esTitle}`)
ok('language switch sets html lang', htmlLang === 'es', `lang=${htmlLang}`)
const persisted = await p.evaluate(() => localStorage.getItem('fibra.lang'))
ok('language choice persists', persisted === 'es', `stored=${persisted}`)
await p.click('button[role="radio"][aria-checked="false"]')
await new Promise((r) => setTimeout(r, 300))

/* ---------- 2. Drawer: open by keyboard, trap, Escape ---------- */
await p.goto(BASE + '/atlas', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 500))
const band = await p.$('ul[aria-label] button[aria-expanded]')
await band.focus()
await p.keyboard.press('Enter')
await new Promise((r) => setTimeout(r, 800))
const dialogOpen = await p.$('[role="dialog"]')
ok('drawer opens from keyboard', !!dialogOpen)
const modal = await p.$eval('[role="dialog"]', (el) => el.getAttribute('aria-modal'))
ok('drawer is aria-modal', modal === 'true')
const labelled = await p.$eval('[role="dialog"]', (el) => {
  const id = el.getAttribute('aria-labelledby')
  return id && !!document.getElementById(id)?.textContent?.trim()
})
ok('drawer has a real accessible name', !!labelled)
const focusInside = await p.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))
ok('focus moves into drawer on open', focusInside)
// Tab many times: focus must never escape the dialog.
let escaped = false
for (let i = 0; i < 40; i++) {
  await p.keyboard.press('Tab')
  const inside = await p.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))
  if (!inside) { escaped = true; break }
}
ok('focus stays trapped in drawer', !escaped)
const scrollLocked = await p.evaluate(() => getComputedStyle(document.body).overflow === 'hidden')
ok('background scroll locked while drawer open', scrollLocked)
await p.keyboard.press('Escape')
await new Promise((r) => setTimeout(r, 1200))
ok('Escape closes drawer', !(await p.$('[role="dialog"]')))
const restored = await p.evaluate(() => document.activeElement?.getAttribute('aria-expanded') !== null)
ok('focus returns to the band on close', restored)
const unlocked = await p.evaluate(() => getComputedStyle(document.body).overflow !== 'hidden')
ok('scroll lock released on close', unlocked)

/* ---------- 3. Drawer: click outside closes ---------- */
await p.goto(BASE + '/atlas/andina', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 900))
ok('drawer is deep-linkable', !!(await p.$('[role="dialog"]')))
await p.mouse.click(720, 60)
await new Promise((r) => setTimeout(r, 1200))
ok('click outside closes drawer', !(await p.$('[role="dialog"]')))

/* ---------- 4. Hotspots by keyboard ---------- */
await p.goto(BASE + '/artisans/werregue-wounaan', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 800))
// scope to Act III: the header menu toggle and the Act V guide accordion also
// carry aria-expanded, and matching them made this assert the wrong control.
const hs = await p.$$('#act-3 button[aria-expanded][aria-controls]')
ok('hotspot markers are buttons', hs.length >= 3, `${hs.length} found`)
if (hs.length) {
  await hs[0].focus()
  await p.keyboard.press('Enter')
  await new Promise((r) => setTimeout(r, 500))
  const expanded = await p.evaluate(() => document.activeElement?.getAttribute('aria-expanded'))
  ok('hotspot opens from keyboard', expanded === 'true')
}

/* ---------- 5. Zoom lens keyboard ---------- */
const slider = await p.$('input[type="range"]')
ok('zoom exposes a range control', !!slider)
if (slider) {
  const before = await p.$eval('input[type="range"]', (el) => el.value)
  await slider.focus()
  await p.keyboard.press('ArrowRight')
  await p.keyboard.press('ArrowRight')
  await new Promise((r) => setTimeout(r, 250))
  const after = await p.$eval('input[type="range"]', (el) => el.value)
  ok('zoom responds to arrow keys', before !== after, `${before} -> ${after}`)
}

/* ---------- 6. Skip link ---------- */
await p.goto(BASE + '/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 400))
await p.keyboard.press('Tab')
const firstStop = await p.evaluate(() => document.activeElement?.textContent?.trim())
ok('skip link is the first tab stop', /skip|contenido/i.test(firstStop ?? ''), firstStop)

/* ---------- 7. Images all have alt text ---------- */
for (const path of ['/', '/atlas/caribe', '/artisans/telar-wayuu', '/credits']) {
  await p.goto(BASE + path, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 700))
  const bad = await p.$$eval('img', (els) => els.filter((e) => !e.getAttribute('alt')).length)
  ok(`every image has alt (${path})`, bad === 0, `${bad} missing`)
  const broken = await p.$$eval('img', (els) => els.filter((e) => e.complete && e.naturalWidth === 0).length)
  ok(`no broken images (${path})`, broken === 0, `${broken} broken`)
}

/* ---------- 8. Internal links all resolve ---------- */
await p.goto(BASE + '/', { waitUntil: 'networkidle2' })
const hrefs = await p.$$eval('a[href^="/"]', (els) => [...new Set(els.map((e) => e.getAttribute('href')))])
const routes = ['/', '/atlas', '/techniques', '/artisans', '/credits']
const bad = []
for (const h of hrefs) {
  const base = h.split('#')[0]
  const known =
    routes.includes(base) ||
    /^\/atlas\/[a-z]+$/.test(base) ||
    /^\/techniques\/[a-z]+$/.test(base) ||
    /^\/artisans\/[a-z-]+$/.test(base)
  if (!known) bad.push(h)
}
ok('no unknown internal links on home', bad.length === 0, bad.join(', '))

/* ---------- 9. Reduced motion ---------- */
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await p.goto(BASE + '/techniques', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 700))
const paused = await p.$$eval('svg', (els) => els.some((e) => e.classList.contains('motion-paused')))
ok('technique loops pause under reduced motion', paused)
const toggleDisabled = await p.$eval('button[aria-pressed]', (el) => el.disabled)
ok('motion toggle disabled under reduced motion', toggleDisabled === true)

/* ---------- 10. Positioning: no commerce patterns ---------- */
await p.emulateMediaFeatures([])
const commerce = []
for (const path of ['/', '/atlas', '/techniques', '/artisans', '/artisans/telar-wayuu']) {
  await p.goto(BASE + path, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 700))
  const found = await p.evaluate(() => {
    const text = document.body.innerText
    const hits = []
    // A price, a cart, or a checkout would each contradict the positioning.
    if (/\b(add to (cart|basket)|buy now|checkout|shopping cart|a[ñn]adir al carrito|comprar ahora)\b/i.test(text)) hits.push('commerce phrase')
    if (/(?:^|\s)(?:COP\s*)?\$\s?\d/.test(text)) hits.push('price')
    if (document.querySelector('[class*="cart" i], [id*="cart" i], [aria-label*="cart" i]')) hits.push('cart element')
    return hits
  })
  if (found.length) commerce.push(`${path}: ${found.join(', ')}`)
}
ok('no cart, checkout or price anywhere', commerce.length === 0, commerce.join(' | '))

/* ---------- 11. Direct contact is a real wa.me link with a message ---------- */
await p.goto(BASE + '/artisans/werregue-wounaan', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 800))
const wa = await p.$eval('a[href^="https://wa.me/"]', (a) => a.getAttribute('href'))
ok('WhatsApp CTA carries a prefilled message', /wa\.me\/\d+\?text=.{40,}/.test(wa ?? ''))
const tel = await p.$('a[href^="tel:"]')
ok('a telephone route is offered alongside', !!tel)

/* ---------- 12. Reduced motion draws the thread fully ---------- */
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await p.goto(BASE + '/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 900))
const threadDrawn = await p.evaluate(() => {
  const paths = [...document.querySelectorAll('svg path')].filter((el) => el.getAttribute('stroke'))
  if (!paths.length) return false
  // With motion reduced nothing should be held back by a dash offset.
  return paths.every((el) => {
    const d = getComputedStyle(el).strokeDashoffset
    return d === '0px' || d === 'none' || d === ''
  })
})
ok('thread renders complete under reduced motion', threadDrawn)

await b.close()
console.log(results.join('\n'))
const fails = results.filter((r) => r.startsWith('FAIL'))
console.log(`\n${results.length - fails.length}/${results.length} passed`)
if (errors.length) console.log('\nJS ERRORS:\n' + [...new Set(errors)].join('\n'))
