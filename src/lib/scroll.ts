/**
 * An eased scroll, slower than the browser's native `behavior: 'smooth'`.
 *
 * The native duration is fixed by the engine and lands hard at the end of a
 * long trip. This runs a cubic ease over a duration we choose, and yields the
 * moment the reader touches the wheel, a key or the screen — an animation that
 * fights the person scrolling is worse than no animation at all.
 */
export function scrollToY(target: number, duration = 1500): void {
  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 1) return

  let frame = 0
  const began = performance.now()

  const stop = () => {
    cancelAnimationFrame(frame)
    for (const event of ['wheel', 'touchstart', 'keydown'] as const) {
      window.removeEventListener(event, stop)
    }
  }

  const step = (now: number) => {
    const p = Math.min(1, (now - began) / duration)
    // easeInOutCubic: leaves and arrives at rest, no jolt at either end.
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
    window.scrollTo(0, start + distance * eased)
    if (p < 1) frame = requestAnimationFrame(step)
    else stop()
  }

  for (const event of ['wheel', 'touchstart', 'keydown'] as const) {
    window.addEventListener(event, stop, { passive: true })
  }
  frame = requestAnimationFrame(step)
}
