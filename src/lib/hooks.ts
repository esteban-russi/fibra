import { useEffect, useRef, useState } from 'react'

/** Tracks a media query, SSR-safe and updating on change. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Freezes background scroll while the bottom drawer is open, compensating for
 * the scrollbar so the map underneath does not jump sideways.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement } = document
    const gap = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [locked])
}

/** Calls `onEscape` while `active`. Used by the drawer and the zoom lens. */
export function useEscape(active: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onEscape])
}

/** Measures an element with a ResizeObserver. Used where SVG must be drawn in
 *  real pixels rather than a scaled viewBox — scaling would distort stroke
 *  weight, and the conductor thread has to keep a constant weight at any width. */
export function useElementSize<T extends HTMLElement>(): [React.RefObject<T | null>, { width: number; height: number }] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      setSize((prev) =>
        Math.abs(prev.width - box.width) < 1 && Math.abs(prev.height - box.height) < 1
          ? prev
          : { width: box.width, height: box.height },
      )
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, size]
}

/**
 * Reports which of a set of sections is currently the reading position.
 * Used by the story's act rail; deliberately biased to the upper third of
 * the viewport so the rail marks what you are reading, not what is about to
 * scroll into view.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const seen = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio)
        let best: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of seen) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best && bestRatio > 0) setActive(best)
      },
      { rootMargin: '-12% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Traps Tab inside a container while `active`, and restores focus to whatever
 * had it when the container closes. Required for the region drawer: it is a
 * modal surface, and a keyboard visitor who tabs out of it into the map behind
 * has no way of knowing where they are.
 */
export function useFocusTrap(active: boolean, container: React.RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (!active) return
    const node = container.current
    if (!node) return

    const previous = document.activeElement as HTMLElement | null

    // Move focus in on open, preferring an explicit initial target.
    const initial =
      node.querySelector<HTMLElement>('[data-autofocus]') ??
      node.querySelector<HTMLElement>(FOCUSABLE) ??
      node
    window.requestAnimationFrame(() => initial.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [active, container])
}
