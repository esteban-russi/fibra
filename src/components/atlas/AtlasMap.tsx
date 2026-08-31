import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { useI18n } from '../../i18n'
import { useMediaQuery, useReducedMotion } from '../../lib/hooks'
import { WeavePlate } from '../graphics/WeavePlate'
import { REGIONS } from '../../content/regions'
import type { Region } from '../../content/regions'

/**
 * The cartography, read as a woven cloth rather than a political map.
 *
 * The specification calls for a tapiz — six chromatic bands inspired by a
 * tapestry — and that is what this is, deliberately rather than for want of a
 * silhouette: regional boundaries in Colombia are drawn differently by different
 * institutions and craft traditions cross all of them, so a hard outline would
 * assert precision the subject does not have. Each band carries the drawn
 * structure of its own principal technique behind its colour, and names the
 * departments it covers so the geography is stated in words instead of faked.
 *
 * Keyboard model: the bands are a single roving-tabindex group. Arrow keys move
 * between bands, Home and End jump to the ends, Enter or Space opens a panel.
 */
type Props = {
  selected: Region | null
  onSelect: (region: Region) => void
}

export function AtlasMap({ selected, onSelect }: Props) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)')
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (from: number, delta: number) => {
    const next = (from + delta + REGIONS.length) % REGIONS.length
    refs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        move(index, 1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        move(index, -1)
        break
      case 'Home':
        e.preventDefault()
        refs.current[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        refs.current[REGIONS.length - 1]?.focus()
        break
    }
  }

  return (
    <div>
      <motion.div
        // The map retreats slightly in scale while a panel is open, per spec.
        animate={reduced ? undefined : { scale: selected ? 0.965 : 1, opacity: selected ? 0.78 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="origin-top overflow-hidden rounded-sm border border-line"
      >
        <ul aria-label={t('atlas.map.label')} className="divide-y divide-canvas/25">
          {REGIONS.map((region, i) => {
            const active = selected?.id === region.id
            return (
              <li key={region.id}>
                <button
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  type="button"
                  onClick={() => onSelect(region)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  aria-expanded={active}
                  aria-label={t('atlas.region.select', { name: pick(region.name) })}
                  className={cn(
                    'group relative block w-full overflow-hidden text-left transition-[height] duration-500',
                    'h-[13svh] min-h-[86px] sm:h-[15svh] sm:min-h-[104px] lg:h-[16svh]',
                    active && 'ring-2 ring-inset ring-canvas',
                  )}
                  style={{ backgroundColor: region.colour }}
                >
                  {/* The band carries the drawn structure of its own technique. */}
                  <span aria-hidden="true" className="absolute inset-0 opacity-[0.28] mix-blend-soft-light">
                    <WeavePlate
                      kind={region.weave}
                      palette={[region.colour, '#FFFDF5', '#2E1B1E']}
                      seed={region.id}
                      extent={860}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/58 via-58% to-transparent to-96% transition-opacity duration-500 group-hover:opacity-90"
                  />

                  <span className="relative flex h-full items-center justify-between gap-4 px-5 sm:px-8">
                    <span className="min-w-0 max-w-2xl">
                      <span className="block font-serif text-xl leading-tight text-white drop-shadow-sm sm:text-2xl lg:text-[1.75rem]">
                        {pick(region.name)}
                      </span>
                      <span className="mt-1 line-clamp-2 max-w-md text-[0.8125rem] leading-snug text-white/78 sm:text-sm">
                        {pick(region.lede)}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        'hidden shrink-0 items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-white/85 sm:flex',
                        'transition-transform duration-500 group-hover:translate-x-1',
                      )}
                    >
                      {region.culturalBlock ? '' : '6'}
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/60 bg-ink/55 backdrop-blur-[1px]">
                        ↑
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </motion.div>

      <p className="mt-4 text-center text-sm text-clay">{coarse ? t('atlas.hint.touch') : t('atlas.hint')}</p>
    </div>
  )
}
