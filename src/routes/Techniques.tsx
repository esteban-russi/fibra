import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { TechniqueIcon } from '../components/graphics/TechniqueIcon'
import { SectionHeading } from '../components/ui/primitives'
import { TECHNIQUES } from '../content/techniques'
import { MEDIA } from '../content/media'

/**
 * The transversal route: navigation by the act of making.
 *
 * Each gesture is carried by a photograph of the work rather than a drawn loop.
 * A diagram explains a mechanism; a photograph is the evidence that the hands
 * exist, which is the claim this route is actually making. The drawn mark
 * survives as the icon beside the term, where it does the wayfinding job the
 * animation was never doing.
 */
export function Techniques() {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <SectionHeading eyebrow={t('techniques.eyebrow')} title={t('techniques.title')} lede={t('techniques.lede')} />

      {/* The grid of gestures. */}
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUES.map((g, i) => (

            <motion.li
              key={g.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/techniques/${g.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-canvas transition-colors hover:border-ash"
              >
                <div className="relative aspect-[5/4] overflow-hidden border-b border-line bg-surface/60">
                  <img
                    src={MEDIA[g.photo].src}
                    alt={pick(MEDIA[g.photo].alt)}
                    width={MEDIA[g.photo].width}
                    height={MEDIA[g.photo].height}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{
                      transformOrigin: g.focus?.origin,
                      ['--photo-zoom' as string]: g.focus?.zoom ?? 1,
                    }}
                    className="h-full w-full scale-[var(--photo-zoom,1)] object-cover transition-transform duration-700 group-hover:scale-[calc(var(--photo-zoom,1)*1.04)]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="flex items-start gap-3 font-serif text-2xl text-bordeaux">
                    <TechniqueIcon kind={g.id} size={34} className="mt-0.5 text-bordeaux" />
                    <span className="min-w-0">
                      {g.term}
                      <span className="ml-2.5 text-base font-normal italic text-muted">— {pick(g.gloss)}</span>
                    </span>
                  </h2>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/75">{pick(g.lede)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-bordeaux">
                    {t('common.readMore')}
                    <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.li>
        ))}
      </ul>

    </div>
  )
}
