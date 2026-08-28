import { useCallback, useRef, useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useI18n } from '../../i18n'
import { FibreStudy } from '../graphics/FibreStudy'
import type { FibreReading } from '../../content/artisans'

/**
 * Sensory translation — progressive magnification of the fibre.
 *
 * A screen cannot transmit touch, so the compensation is magnification: at each
 * step more of what a hand would have reported becomes visible — ply angle,
 * diameter variance, surface, loose ends. The drawn study reveals successive
 * detail layers as the magnification rises rather than simply scaling pixels,
 * which is what a real loupe does and what a photographic zoom cannot.
 *
 * Three input methods, all first-class: drag or touch to move through the
 * fibre, a range control for magnification that works from the keyboard, and
 * arrow keys to pan once the viewport itself is focused.
 */
const MIN = 1
const MAX = 6

export function ZoomLens({ fibre }: { fibre: FibreReading }) {
  const { t, pick } = useI18n()
  const [zoom, setZoom] = useState(1.6)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const origin = useRef({ px: 0, py: 0, x: 0, y: 0 })

  // Pan is clamped so the study always covers the viewport — no empty edges.
  const clamp = useCallback((next: { x: number; y: number }, z: number) => {
    const limit = Math.max(0, (z - 1) / (2 * z))
    return {
      x: Math.min(limit, Math.max(-limit, next.x)),
      y: Math.min(limit, Math.max(-limit, next.y)),
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    setDragging(true)
    origin.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const rect = box.current?.getBoundingClientRect()
    if (!rect) return
    const dx = (e.clientX - origin.current.px) / rect.width
    const dy = (e.clientY - origin.current.py) / rect.height
    setPos(clamp({ x: origin.current.x + dx, y: origin.current.y + dy }, zoom))
  }

  const endDrag = () => setDragging(false)

  const nudge = (dx: number, dy: number) => setPos((p) => clamp({ x: p.x + dx, y: p.y + dy }, zoom))

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 0.06
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        nudge(step, 0)
        break
      case 'ArrowRight':
        e.preventDefault()
        nudge(-step, 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        nudge(0, step)
        break
      case 'ArrowDown':
        e.preventDefault()
        nudge(0, -step)
        break
      case '+':
      case '=':
        e.preventDefault()
        changeZoom(zoom + 0.6)
        break
      case '-':
        e.preventDefault()
        changeZoom(zoom - 0.6)
        break
    }
  }

  const changeZoom = (next: number) => {
    const z = Math.min(MAX, Math.max(MIN, Number(next.toFixed(2))))
    setZoom(z)
    setPos((p) => clamp(p, z))
  }

  const reset = () => {
    setZoom(1.6)
    setPos({ x: 0, y: 0 })
  }

  const level = Math.round(zoom * 10) / 10

  return (
    <div>
      <div
        ref={box}
        tabIndex={0}
        role="group"
        aria-label={`${t('zoom.title')} — ${pick(fibre.label)}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className={cn(
          'relative aspect-[4/3] w-full touch-none overflow-hidden rounded-sm border border-line bg-surface',
          zoom > 1 && (dragging ? 'cursor-grabbing' : 'cursor-grab'),
        )}
      >
        <div
          className="h-full w-full will-change-transform"
          style={{
            transform: `scale(${zoom}) translate(${pos.x * 100}%, ${pos.y * 100}%)`,
            transition: dragging ? 'none' : 'transform 260ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <FibreStudy kind={fibre.fibre} twist={fibre.twist} zoom={zoom} />
        </div>

        {/* Scale reference: the bar restates the magnification in the graphic. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-sm bg-ink/65 px-2.5 py-1.5 text-[0.6875rem] text-canvas backdrop-blur-sm"
        >
          <span className="block h-px bg-canvas" style={{ width: `${Math.max(10, 54 / zoom)}px` }} />
          ×{level.toFixed(1)}
        </div>

        <p className="pointer-events-none absolute right-3 top-3 max-w-[60%] rounded-sm bg-ink/60 px-2.5 py-1.5 text-right text-[0.6875rem] leading-snug text-canvas backdrop-blur-[1px]">
          {t('zoom.instruction')}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => changeZoom(zoom - 0.6)}
          disabled={zoom <= MIN}
          className="grid h-10 w-10 place-items-center rounded-sm border border-line text-clay transition-colors hover:border-ash hover:text-bordeaux disabled:opacity-40"
        >
          <span className="sr-only">{t('zoom.out')}</span>
          <Minus size={16} aria-hidden="true" />
        </button>

        <label className="flex min-w-[10rem] flex-1 items-center gap-3 text-sm text-clay">
          <span className="shrink-0">{t('zoom.level')}</span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={0.1}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            aria-valuetext={`×${level.toFixed(1)}`}
            className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-line accent-bordeaux"
          />
          <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-ink/70">×{level.toFixed(1)}</span>
        </label>

        <button
          type="button"
          onClick={() => changeZoom(zoom + 0.6)}
          disabled={zoom >= MAX}
          className="grid h-10 w-10 place-items-center rounded-sm border border-line text-clay transition-colors hover:border-ash hover:text-bordeaux disabled:opacity-40"
        >
          <span className="sr-only">{t('zoom.in')}</span>
          <Plus size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={reset}
          className="grid h-10 w-10 place-items-center rounded-sm border border-line text-clay transition-colors hover:border-ash hover:text-bordeaux"
        >
          <span className="sr-only">{t('zoom.reset')}</span>
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-7">
        <h4 className="eyebrow mb-3">{t('zoom.reading')}</h4>
        <p className="mb-3 font-serif text-lg text-bordeaux">{pick(fibre.label)}</p>
        <ul className="space-y-2.5">
          {pick(fibre.reading).map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/78">
              <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-ash" />
              <span className="text-pretty">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
