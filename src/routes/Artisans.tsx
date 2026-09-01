import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { SectionHeading, ProvenanceNotice } from '../components/ui/primitives'
import { WeavePlate } from '../components/graphics/WeavePlate'
import { ARTISANS } from '../content/artisans'
import { REGIONS } from '../content/regions'
import { MEDIA } from '../content/media'

export function Artisans() {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <SectionHeading eyebrow={t('artisans.eyebrow')} title={t('artisans.title')} lede={t('artisans.lede')} />

      <div className="mt-8 max-w-3xl">
        <ProvenanceNotice />
      </div>

      <ul className="mt-14 space-y-6">
        {ARTISANS.map((a, i) => {
          const region = REGIONS.find((r) => r.id === a.regionId)
          const img = a.openingImage ? MEDIA[a.openingImage] : null
          return (
            <motion.li
              key={a.slug}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/artisans/${a.slug}`}
                className="group grid overflow-hidden rounded-sm border border-line bg-canvas transition-colors hover:border-ash sm:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface sm:aspect-auto">
                  {img ? (
                    <img
                      src={img.src}
                      alt={pick(img.alt)}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <WeavePlate kind="plain" palette={a.patternPalette} seed={a.slug} />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1.5 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-1.5"
                    style={{ background: region?.colour }}
                  />
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    <span>{pick(region?.name ?? { en: '', es: '' })}</span>
                    <span aria-hidden="true" className="text-line">/</span>
                    <span>{pick(a.territory)}</span>
                  </p>

                  <h2 className="mt-3 font-serif text-[1.75rem] leading-tight text-bordeaux sm:text-4xl">{a.name}</h2>
                  <p className="mt-2 text-sm text-clay">
                    {pick(a.craft)} · {pick(a.community)}
                  </p>

                  <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-ink/78">{pick(a.standfirst)}</p>

                  <p className="mt-6 max-w-2xl border-l-2 border-line pl-4 text-pretty font-serif text-lg italic leading-snug text-clay">
                    {pick(a.quote)}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-bordeaux">
                    {t('drawer.viewProfile')}
                    <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
