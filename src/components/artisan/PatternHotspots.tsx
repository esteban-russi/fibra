import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useI18n } from '../../i18n'
import { useReducedMotion } from '../../lib/hooks'
import { WeavePlate } from '../graphics/WeavePlate'
import type { PlateKind } from '../graphics/WeavePlate'
import { Badge } from '../ui/primitives'
import type { GlossaryEntry, Hotspot } from '../../content/artisans'

/**
 * Interactive semiotic narrative.
 *
 * Markers sit on the cloth and open a note about the figure beneath them. The
 * notes separate two things that are usually collapsed together: what is
 * structurally happening at that point, which anyone can verify by looking, and
 * what the figure carries, which in these traditions is knowledge held and
 * taught within the community. Where the second is community-held it is marked
 * as such and no interpretation is asserted — inventing cosmology for a real
 * people's real design is precisely the extractivism this project exists against.
 *
 * Every marker is a button in the tab order, so the module works identically
 * from a mouse, a keyboard and a touchscreen. Targets are 44px on coarse
 * pointers even though the dot they centre on is much smaller.
 */
type Props = {
  hotspots: Hotspot[]
  glossary: GlossaryEntry[]
  plate: PlateKind
  palette: string[]
  seed: string
}

export function PatternHotspots({ hotspots, glossary, plate, palette, seed }: Props) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)
  const panelId = useId()

  const open = hotspots.find((h) => h.id === openId) ?? null

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
          <WeavePlate kind={plate} palette={palette} seed={seed} />

          {hotspots.map((h, i) => {
            const active = openId === h.id
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setOpenId(active ? null : h.id)}
                aria-expanded={active}
                aria-controls={panelId}
                className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className="sr-only">{t('hotspots.marker', { n: i + 1, name: pick(h.name) })}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid h-7 w-7 place-items-center rounded-full text-[0.6875rem] font-semibold tabular-nums transition-all duration-300',
                    active
                      ? 'scale-110 bg-bordeaux text-canvas shadow-lg'
                      : 'bg-canvas/92 text-bordeaux shadow-md ring-1 ring-bordeaux/25 hover:scale-110',
                  )}
                >
                  {i + 1}
                </span>
                {!reduced && !active && (
                  <span
                    aria-hidden="true"
                    className="absolute h-7 w-7 animate-ping rounded-full bg-canvas/40"
                    style={{ animationDuration: '3.5s', animationDelay: `${i * 0.9}s` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <p className="mt-3 text-[0.8125rem] leading-relaxed text-clay">
          {hotspots.length} {t('hotspots.markersLabel')}
        </p>
      </div>

      <div id={panelId} className="min-w-0">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.article
              key={open.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-sm border border-line bg-surface/45 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-serif text-xl leading-snug text-bordeaux">{pick(open.name)}</h4>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="-mr-1.5 -mt-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-clay transition-colors hover:bg-canvas hover:text-bordeaux"
                >
                  <span className="sr-only">{t('hotspots.close')}</span>
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-ink/80">{pick(open.structure)}</p>

              <h5 className="eyebrow mb-2 mt-6">{t('hotspots.meaning')}</h5>
              <p className="text-pretty text-sm leading-relaxed text-ink/80">{pick(open.meaning)}</p>

              {open.communityHeld && (
                <div className="mt-5">
                  <Badge tone="warn">{t('hotspots.communityHeld')}</Badge>
                </div>
              )}
            </motion.article>
          ) : (
            <motion.div
              key="empty"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-sm border border-dashed border-line p-6"
            >
              <p className="text-pretty text-sm leading-relaxed text-clay">{t('hotspots.instruction')}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-8" aria-labelledby={`${panelId}-glossary`}>
          <h4 id={`${panelId}-glossary`} className="eyebrow mb-4">
            {t('hotspots.glossary')}
          </h4>
          <dl className="divide-y divide-line/70 border-y border-line/70">
            {glossary.map((g) => (
              <div key={g.term} className="py-4">
                <dt className="font-serif text-base text-bordeaux">
                  {g.term}
                  <span className="ml-2 text-sm font-normal italic text-muted">{pick(g.gloss)}</span>
                </dt>
                <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-ink/72">{pick(g.note)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}
