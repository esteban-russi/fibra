/**
 * Contrast audit.
 *
 * Two things this has to get right or it reports noise:
 *   - Chrome serialises anything produced by Tailwind's opacity modifiers as
 *     oklab(), which neither a regex nor canvas fillStyle converts, so oklab is
 *     converted to sRGB explicitly here.
 *   - A translucent layer over another translucent layer has to be composited
 *     in order from the first opaque layer upward, not folded pairwise from the
 *     top down — the latter treats a translucent backdrop as if it were opaque
 *     and reports black grounds that do not exist.
 */
import puppeteer from 'puppeteer-core'
const BASE = process.env.BASE ?? 'http://localhost:5173'
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true, args:['--no-sandbox','--enable-unsafe-swiftshader','--use-gl=swiftshader'] })
const p = await b.newPage()
await p.setViewport({ width: 1440, height: 900 })

const audit = () => {
  const g2l = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  const l2g = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)

  const oklabToRgb = (L, A, B) => {
    const l_ = L + 0.3963377774 * A + 0.2158037573 * B
    const m_ = L - 0.1055613458 * A - 0.0638541728 * B
    const s_ = L - 0.0894841775 * A - 1.291485548 * B
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    const gg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    const c = (v) => Math.max(0, Math.min(255, Math.round(l2g(Math.max(0, Math.min(1, v))) * 255)))
    return { r: c(r), g: c(gg), b: c(bb) }
  }

  const parse = (str) => {
    if (!str || str === 'transparent' || str === 'none') return null
    const nums = str.match(/-?[\d.]+/g)?.map(Number) ?? []
    if (str.startsWith('oklab')) {
      const { r, g, b } = oklabToRgb(nums[0], nums[1], nums[2])
      return { r, g, b, a: nums[3] === undefined ? 1 : nums[3] }
    }
    if (str.startsWith('rgb')) {
      if (nums.length < 3) return null
      return { r: nums[0], g: nums[1], b: nums[2], a: nums[3] === undefined ? 1 : nums[3] }
    }
    return null
  }

  const lum = (c) => 0.2126 * g2l(c.r / 255) + 0.7152 * g2l(c.g / 255) + 0.0722 * g2l(c.b / 255)
  const ratio = (x, y) => {
    const a = lum(x), b2 = lum(y)
    return (Math.max(a, b2) + 0.05) / (Math.min(a, b2) + 0.05)
  }
  /** Paint `fg` (may be translucent) onto opaque `bg`. */
  const paint = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })

  const out = []
  for (const el of document.querySelectorAll('body *')) {
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
    if (!hasText) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 2 || rect.height < 2) continue
    // Fixed chrome floats over whatever the route puts beneath it; its ground
    // is not in its ancestor chain, so a DOM-resolved background is fiction.
    // These surfaces are measured from real pixels by tools/measure.py instead.
    let fixedAncestor = el
    let isFixed = false
    while (fixedAncestor) {
      if (getComputedStyle(fixedAncestor).position === 'fixed') { isFixed = true; break }
      fixedAncestor = fixedAncestor.parentElement
    }
    if (isFixed) continue

    // Collect background layers innermost -> outermost, plus note any gradient
    // or image in the stack, which a sampled colour cannot represent.
    const layers = []
    let node = el
    let painted = false
    while (node) {
      const s = getComputedStyle(node)
      if (s.backgroundImage && s.backgroundImage !== 'none') painted = true
      const c = parse(s.backgroundColor)
      if (c && c.a > 0) {
        layers.push(c)
        if (c.a >= 0.999) break
      }
      // A scrim on a sibling is the pattern every full-bleed header here uses.
      if (
        node.parentElement &&
        node.parentElement.querySelector(':scope > img, :scope > video, :scope > span[aria-hidden][class*="gradient"], :scope > div[aria-hidden][class*="gradient"], :scope > div[aria-hidden][class*="scrim"]')
      ) painted = true
      node = node.parentElement
    }
    const base = layers[layers.length - 1]
    if (!base || base.a < 0.999) continue
    if (painted) continue // over artwork — a sampled ground would be fiction

    let bg = base
    for (let i = layers.length - 2; i >= 0; i--) bg = paint(layers[i], bg)

    const fg = parse(cs.color)
    if (!fg) continue
    const eff = fg.a < 1 ? paint(fg, bg) : fg
    const size = parseFloat(cs.fontSize)
    const large = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700)
    const need = large ? 3 : 4.5
    const r = ratio(eff, bg)
    if (r < need) {
      out.push({
        text: (el.textContent || '').trim().slice(0, 44),
        ratio: +r.toFixed(2),
        need,
        size: +size.toFixed(1),
        fg: `rgb(${Math.round(eff.r)},${Math.round(eff.g)},${Math.round(eff.b)})`,
        bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
        cls: el.className.toString().slice(0, 64),
      })
    }
  }
  return out
}

let total = 0
for (const path of ['/', '/atlas', '/atlas/caribe', '/gestures', '/artisans', '/artisans/werregue-wounaan', '/commission', '/credits']) {
  await p.goto(BASE + path, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 1000))
  const issues = await p.evaluate(audit)
  const uniq = [...new Map(issues.map((i) => [i.cls + '|' + i.ratio, i])).values()]
  total += uniq.length
  console.log(`\n=== ${path} — ${uniq.length} below AA ===`)
  for (const i of uniq.slice(0, 14)) {
    console.log(`  ${i.ratio} (need ${i.need}) ${i.size}px  "${i.text}"`)
    console.log(`     ${i.fg} on ${i.bg}   [${i.cls}]`)
  }
}
console.log(`\nTOTAL below AA: ${total}`)
await b.close()
