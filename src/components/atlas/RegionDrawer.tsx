import { useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useEscape, useFocusTrap, useLockBodyScroll, useReducedMotion } from '../../lib/hooks'
import { WeavePlate } from '../graphics/WeavePlate'
import { CreditedImage, DemonstrationNotice, Prose } from '../ui/primitives'
import { MEDIA } from '../../content/media'
import { artisansInRegion } from '../../content/artisans'
import type { Region } from '../../content/regions'

/**
 * The bottom drawer.
 *
 * Behaviour required by the specification and implemented here: it rises from
 * the bottom edge to roughly two thirds of the viewport, carries the region's
 * colour code in its header, closes on the visible X, on a click outside, and
 * on Escape — and makes no sound at any point.
 *
 * Accessibility: it is a real modal dialog. Focus moves in on open and is
 * trapped, background scroll is frozen, the heading labels the dialog, and
 * focus returns to the band that opened it. On touch the panel also accepts a
 * downward drag, which is the gesture people actually reach for.
 */
export function RegionDrawer({ region, onClose }: { region: Region | null; onClose: () => void }) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const open = region !== null
  useLockBodyScroll(open)
  useEscape(open, onClose)
  useFocusTrap(open, panel)

  return (
    <AnimatePresence>
      {region && (
        <div className="fixed inset-0 z-[60]" role="presentation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            // Opening is a spring so the panel feels lifted into place; closing
            // is a short tween, because a dismissal that takes as long as an
            // entrance feels unresponsive.
            exit={
              reduced
                ? { opacity: 0 }
                : { y: '100%', transition: { type: 'tween', duration: 0.3, ease: [0.4, 0, 1, 1] } }
            }
            transition={{ type: 'spring', stiffness: 240, damping: 32, mass: 0.8 }}
            drag={reduced ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 130 || info.velocity.y > 620) onClose()
            }}
            className="absolute inset-x-0 bottom-0 flex h-[70svh] max-h-[70svh] flex-col overflow-hidden rounded-t-xl bg-canvas shadow-[0_-24px_60px_-24px_rgba(46,27,30,0.55)] sm:h-[68svh]"
          >
            {/* Drag affordance — decorative; every action here has a real control too. */}
            <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
              <span className="h-1 w-11 rounded-full bg-line" />
            </div>

            <header
              className="relative shrink-0 overflow-hidden border-b border-line"
              style={{ backgroundColor: region.colour }}
            >
              <span aria-hidden="true" className="absolute inset-0 opacity-25 mix-blend-soft-light">
                <WeavePlate
                  kind={region.weave}
                  palette={[region.colour, '#FFFDF5', '#2E1B1E']}
                  seed={region.id}
                  extent={760}
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/58 via-62% to-black/25"
              />

              <div className="relative mx-auto flex max-w-5xl items-start justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-white/90">
                    {t('drawer.region')}
                    <span className="ml-2.5 font-mono text-white/80">{region.colour}</span>
                  </p>
                  <h2 id={titleId} className="mt-1.5 font-serif text-[1.75rem] leading-tight text-white sm:text-4xl">
                    {pick(region.name)}
                  </h2>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-white/95">
                    {pick(region.colourSource)}
                  </p>
                </div>

                <button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15 focus-visible:outline-white"
                >
                  <span className="sr-only">{t('drawer.close')}</span>
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
                <section aria-label={t('drawer.synthesis')}>
                  <h3 className="eyebrow mb-4">{t('drawer.synthesis')}</h3>
                  <Prose paragraphs={pick(region.synthesis)} className="max-w-3xl" />
                </section>

                {region.images.length > 0 && (
                  <section className="mt-12" aria-label={t('drawer.materials')}>
                    <h3 className="eyebrow mb-4">{t('drawer.materials')}</h3>
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {region.images.slice(0, 6).map((id) =>
                        MEDIA[id] ? (
                          <li key={id}>
                            <CreditedImage id={id} className="h-full" imgClassName="aspect-[4/3]" />
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </section>
                )}

                <section className="mt-12 grid gap-10 lg:grid-cols-2">
                  <div>
                    <h3 className="eyebrow mb-4">{t('drawer.materials')}</h3>
                    <dl className="space-y-5">
                      {region.materials.map((m) => (
                        <div key={pick(m.name)} className="border-l-2 pl-4" style={{ borderColor: region.colour }}>
                          <dt className="font-serif text-lg text-bordeaux">
                            {pick(m.name)}
                            {m.botanical && <span className="ml-2 text-sm italic text-muted">{m.botanical}</span>}
                          </dt>
                          <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-ink/75">{pick(m.extraction)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div>
                    <h3 className="eyebrow mb-4">{t('drawer.techniques')}</h3>
                    <dl className="space-y-5">
                      {region.techniques.map((tech) => (
                        <div key={pick(tech.name)}>
                          <dt className="font-serif text-lg text-bordeaux">{pick(tech.name)}</dt>
                          <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-ink/75">{pick(tech.note)}</dd>
                        </div>
                      ))}
                    </dl>

                    <h3 className="eyebrow mb-3 mt-9">{t('drawer.communities')}</h3>
                    <ul className="space-y-2">
                      {pick(region.peoples).map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                          <span aria-hidden="true" className="mt-2 h-px w-3.5 shrink-0" style={{ background: region.colour }} />
                          <span className="text-pretty">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="mt-12" aria-label={t('drawer.artisans')}>
                  <h3 className="eyebrow mb-4">{t('drawer.artisans')}</h3>
                  <RegionArtisans regionId={region.id} colour={region.colour} onNavigate={onClose} />
                </section>

                <div className="mt-10">
                  <DemonstrationNotice />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function RegionArtisans({
  regionId,
  colour,
  onNavigate,
}: {
  regionId: string
  colour: string
  onNavigate: () => void
}) {
  const { t, pick } = useI18n()
  const list = artisansInRegion(regionId)

  if (list.length === 0) {
    return (
      <p className="max-w-2xl text-pretty rounded-sm border border-dashed border-line px-5 py-4 text-sm leading-relaxed text-clay">
        {t('drawer.noArtisans')}
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a) => (
        <li key={a.slug}>
          <Link
            to={`/artisans/${a.slug}`}
            onClick={onNavigate}
            className="group flex h-full items-start gap-4 rounded-sm border border-line bg-surface/40 p-4 transition-colors hover:border-ash hover:bg-surface"
          >
            <span aria-hidden="true" className="mt-1 h-10 w-1 shrink-0 rounded-full" style={{ background: colour }} />
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-lg leading-snug text-bordeaux">{a.name}</span>
              <span className="mt-0.5 block text-sm text-clay">{pick(a.craft)}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-bordeaux">
                {t('drawer.viewProfile')}
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
