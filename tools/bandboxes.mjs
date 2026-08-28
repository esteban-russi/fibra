/** Screenshots the atlas with band text hidden, and emits the text boxes so the
 *  ground behind each label can be sampled from the real pixels. */
import puppeteer from 'puppeteer-core'
import { writeFileSync } from 'node:fs'
const OUT = process.env.OUT
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-gl=swiftshader'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 950 })
await p.goto(process.env.URL ?? 'http://localhost:5173/atlas', { waitUntil: 'networkidle2' })
await new Promise(r => setTimeout(r, 1200))
await p.evaluate((sel) => { window.__SEL__ = sel }, process.env.SEL ?? 'ul[aria-label] button')
const boxes = await p.evaluate(() => {
  const out = []
  document.querySelectorAll(window.__SEL__).forEach(btn => {
    btn.querySelectorAll('*').forEach(el => {
      // Skip visually-hidden labels: they carry text but paint nothing.
      const cs0 = getComputedStyle(el)
      if (cs0.clipPath && cs0.clipPath !== 'none') return
      if (el.className && el.className.toString().includes('sr-only')) return
      const txt = el.childNodes.length && [...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim())
      if (!txt) return
      // Measure the glyph run, not the element box: these labels sit in block
      // spans that stretch the full band, so the element box includes a lot of
      // empty band to the right and would report a worst case that no text
      // actually occupies.
      const node = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim())
      const range = document.createRange()
      range.selectNodeContents(node)
      for (const r of range.getClientRects()) {
        if (r.width < 8 || r.height < 6) continue
        out.push({
          text: node.textContent.trim().slice(0, 30),
          x: Math.round(r.x), y: Math.round(r.y),
          w: Math.round(r.width), h: Math.round(r.height),
          colour: getComputedStyle(el).color,
          size: parseFloat(getComputedStyle(el).fontSize),
        })
      }
    })
  })
  return out
})
writeFileSync(OUT + '/bandboxes.json', JSON.stringify(boxes, null, 1))
await p.evaluate(() => document.querySelectorAll(window.__SEL__ + ' span, ' + window.__SEL__ + ' h2, ' + window.__SEL__ + ' p').forEach(el => { el.style.color='transparent' }))
await new Promise(r => setTimeout(r, 400))
await p.screenshot({ path: OUT + '/atlas-ground.png' })
await b.close()
console.log('boxes:', boxes.length)
