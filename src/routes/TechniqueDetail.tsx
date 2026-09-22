import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { cn } from '../lib/cn'
import { TechniqueIcon } from '../components/graphics/TechniqueIcon'
import { Prose } from '../components/ui/primitives'
import { TECHNIQUES, TECHNIQUE_BY_SLUG } from '../content/techniques'
import type { Technique } from '../content/techniques'
import { REGIONS } from '../content/regions'

/**
 * One technique, read in full.
 *
 * Its own page rather than a panel under the grid: the expanded account is the
 * substance of this route, and a reader who arrives at `urdir` should land on
 * urdir rather than scroll past four other gestures to reach it. The grid keeps
 * the short definition and hands over here.
 */
export function TechniqueDetail() {
  const { slug } = useParams()
  const technique = TECHNIQUE_BY_SLUG.get(slug ?? '')
  if (!technique) return <Navigate to="/techniques" replace />
  return <Gesture key={technique.slug} technique={technique} />
}

function TechniqueVideo({
  src,
  label,
  fallback,
}: {
  src: string
  label: string
  fallback: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden rounded-sm bg-canvas transition-opacity duration-700 ease-out',
        isPlaying ? 'border border-line opacity-100' : 'border border-transparent opacity-0',
      )}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        aria-label={label}
        className="block h-full w-full object-cover"
      >
        {fallback}
      </video>
    </div>
  )
}

function Gesture({ technique: g }: { technique: Technique }) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()

  const others = TECHNIQUES.filter((x) => x.slug !== g.slug)

  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-8% 0px -6% 0px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+2.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+3.5rem)]">
      <Link
        to="/techniques"
        className="inline-flex items-center gap-2 text-sm text-clay transition-colors hover:text-bordeaux"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {t('techniques.back')}
      </Link>

      <article aria-labelledby="gesture-title" className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        {/* The video of the gesture, held in view while the account is read. */}
        <div>
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <TechniqueVideo
              key={g.video}
              src={g.video}
              label={pick(g.gesture)}
              fallback={t('journal.video.fallback')}
            />
          </div>
        </div>

        <div>
          <p className="eyebrow">{t('techniques.eyebrow')}</p>
          <h1 id="gesture-title" className="mt-3 flex items-center gap-4 font-serif text-4xl text-bordeaux sm:text-5xl">
            <TechniqueIcon kind={g.id} size={52} className="text-bordeaux" />
            {g.term}
          </h1>
          <p className="mt-2 font-serif text-xl italic text-muted">{pick(g.gloss)}</p>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-clay">{pick(g.lede)}</p>

          <section aria-labelledby="gesture-definition" className="mt-12 border-t border-line pt-8">
            <h2 id="gesture-definition" className="eyebrow mb-3">
              {t('techniques.gesture')}
            </h2>
            <p className="max-w-2xl text-pretty font-serif text-2xl italic leading-snug text-bordeaux">
              {pick(g.gesture)}
            </p>
          </section>

          <section aria-labelledby="gesture-account" className="mt-12">
            <h2 id="gesture-account" className="eyebrow mb-4">
              {t('techniques.account')}
            </h2>
            <Prose paragraphs={pick(g.body)} className="max-w-2xl" />
          </section>

          <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow mb-2">{t('techniques.materials')}</dt>
              <dd className="space-y-1 text-sm text-ink/80">
                {pick(g.materials).map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">{t('techniques.regions')}</dt>
              <dd className="flex flex-wrap gap-2">
                {g.regions.map((id) => {
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
              <dd className="text-sm italic text-ink/80">{pick(g.tempo)}</dd>
            </div>
          </dl>
        </div>
      </article>

      {/* The route stays transversal: the other four are one click away. */}
      <motion.section {...rise} aria-labelledby="other-gestures" className="mt-24 border-t border-line pt-12">
        <h2 id="other-gestures" className="eyebrow mb-7">
          {t('techniques.others')}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                to={`/techniques/${o.slug}`}
                className="group flex h-full flex-col rounded-sm border border-line bg-canvas p-5 transition-colors hover:border-ash"
              >
                <TechniqueIcon kind={o.id} size={38} className="mb-3 text-bordeaux" />
                <h3 className="font-serif text-xl text-bordeaux">{o.term}</h3>
                <p className="mt-1.5 text-sm italic text-muted">{pick(o.gloss)}</p>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/70">{pick(o.gesture)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-bordeaux">
                  {t('common.readMore')}
                  <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  )
}
