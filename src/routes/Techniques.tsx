import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { TechniqueLoop } from '../components/graphics/TechniqueLoop'
import { Prose, SectionHeading } from '../components/ui/primitives'
import { TECHNIQUES, TECHNIQUE_BY_SLUG } from '../content/techniques'
import { REGIONS } from '../content/regions'

/**
 * The transversal route: navigation by the act of making.
 *
 * Motion is opt-out twice over. It stops automatically when the visitor's system
 * asks for reduced motion, and there is an explicit control regardless — some
 * people want the loops still without having set an OS preference, and the
 * drawings are legible in either state.
 */
export function Techniques() {
  const { t, pick } = useI18n()
  const { slug } = useParams()
  const reduced = useReducedMotion()
  const [wanted, setWanted] = useState(true)
  const playing = wanted && !reduced

  const focused = TECHNIQUE_BY_SLUG.get(slug ?? '') ?? TECHNIQUES[0]

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={t('techniques.eyebrow')} title={t('techniques.title')} lede={t('techniques.lede')} />

        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={() => setWanted((v) => !v)}
            disabled={reduced}
            aria-pressed={playing}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors',
              reduced ? 'cursor-not-allowed text-ash' : 'text-clay hover:border-ash hover:text-bordeaux',
            )}
          >
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            {playing ? t('techniques.pause') : t('techniques.play')}
          </button>
          {reduced && <p className="max-w-[16rem] text-xs leading-relaxed text-muted">{t('techniques.reduced')}</p>}
        </div>
      </div>

      {/* The grid of motion studies. */}
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUES.map((g, i) => {
          const active = g.slug === focused.slug
          return (
            <motion.li
              key={g.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/techniques/${g.slug}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group flex h-full flex-col overflow-hidden rounded-sm border bg-canvas transition-colors',
                  active ? 'border-bordeaux' : 'border-line hover:border-ash',
                )}
              >
                <div className="relative aspect-[5/4] border-b border-line bg-surface/60">
                  <TechniqueLoop kind={g.id} playing={playing} label={pick(g.motionAlt)} />
                  {/* Chipped rather than bare: the label sits over drawn line
                      work, and unbacked small caps lose contrast against it. */}
                  <span className="absolute left-3 top-3 rounded-full bg-canvas/85 px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.16em] text-clay backdrop-blur-[1px]">
                    {t('techniques.motion')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-2xl text-bordeaux">
                    {g.term}
                    <span className="ml-2.5 text-base font-normal italic text-muted">— {pick(g.gloss)}</span>
                  </h2>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/75">{pick(g.lede)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-bordeaux">
                    {t('common.readMore')}
                    <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.li>
          )
        })}
      </ul>

      {/* The focused technique, read in full. */}
      <article
        id="technique-detail"
        aria-labelledby="technique-detail-title"
        className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16"
      >
        <div>
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <div className="aspect-square overflow-hidden rounded-sm border border-line bg-surface/60">
              <TechniqueLoop kind={focused.id} playing={playing} label={pick(focused.motionAlt)} />
            </div>
            <p className="mt-4 text-pretty text-[0.8125rem] leading-relaxed text-clay">{pick(focused.motionAlt)}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">{t('techniques.eyebrow')}</p>
          <h2 id="technique-detail-title" className="mt-3 font-serif text-4xl text-bordeaux sm:text-5xl">
            {focused.term}
          </h2>
          <p className="mt-2 font-serif text-xl italic text-muted">{pick(focused.gloss)}</p>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-clay">{pick(focused.lede)}</p>

          <Prose paragraphs={pick(focused.body)} className="mt-8 max-w-2xl" />

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow mb-2">{t('techniques.materials')}</dt>
              <dd className="space-y-1 text-sm text-ink/80">
                {pick(focused.materials).map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">{t('techniques.regions')}</dt>
              <dd className="flex flex-wrap gap-2">
                {focused.regions.map((id) => {
                  const r = REGIONS.find((x) => x.id === id)
                  if (!r) return null
                  return (
                    <Link
                      key={id}
                      to={`/atlas/${r.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-ink/80 transition-colors hover:border-ash hover:text-bordeaux"
                    >
                      <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: r.colour }} />
                      {pick(r.name)}
                    </Link>
                  )
                })}
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">{t('techniques.tempo')}</dt>
              <dd className="text-sm italic text-ink/80">{pick(focused.tempo)}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  )
}
