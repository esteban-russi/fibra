import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n'
import type { UIKey } from '../i18n/ui'
import { useActiveSection, useReducedMotion } from '../lib/hooks'
import { ARTISAN_BY_SLUG } from '../content/artisans'
import type { Artisan } from '../content/artisans'
import { REGIONS } from '../content/regions'
import { TECHNIQUES } from '../content/techniques'
import { MEDIA } from '../content/media'
import { WeavePlate } from '../components/graphics/WeavePlate'
import { TechniqueLoop } from '../components/graphics/TechniqueLoop'
import { ZoomLens } from '../components/artisan/ZoomLens'
import { PatternHotspots } from '../components/artisan/PatternHotspots'
import { TraceabilitySeal } from '../components/artisan/TraceabilitySeal'
import { DirectContact } from '../components/artisan/DirectContact'
import { CreditedImage, DemonstrationNotice, Prose } from '../components/ui/primitives'

/**
 * The chronicle: five acts read as one continuous descent.
 *
 * Explicitly not tabs. The specification abandons a fragmented tabbed layout in
 * favour of sequential reading, so the acts are sections of a single document
 * and the rail on the left marks position rather than switching panes — every
 * act is present in the page, in the DOM, and in a printout.
 */
const ACTS: { id: string; roman: UIKey; title: UIKey }[] = [
  { id: 'act-1', roman: 'act.1.roman', title: 'act.1.title' },
  { id: 'act-2', roman: 'act.2.roman', title: 'act.2.title' },
  { id: 'act-3', roman: 'act.3.roman', title: 'act.3.title' },
  { id: 'act-4', roman: 'act.4.roman', title: 'act.4.title' },
  { id: 'act-5', roman: 'act.5.roman', title: 'act.5.title' },
]

export function ArtisanProfile() {
  const { slug } = useParams()
  const artisan = ARTISAN_BY_SLUG.get(slug ?? '')
  if (!artisan) return <Navigate to="/artisans" replace />
  return <Chronicle key={artisan.slug} artisan={artisan} />
}

function Chronicle({ artisan }: { artisan: Artisan }) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const ids = useMemo(() => ACTS.map((a) => a.id), [])
  const active = useActiveSection(ids)
  const region = REGIONS.find((r) => r.id === artisan.regionId)
  const accent = region?.colour ?? '#6E3A41'

  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-8% 0px -6% 0px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <article>
      {/* =============== ACT I — the trace and the voice =============== */}
      <section id="act-1" aria-labelledby="act-1-title" className="relative overflow-hidden bg-ink text-canvas">
        <div className="absolute inset-0">
          {artisan.openingImage ? (
            <img
              src={MEDIA[artisan.openingImage].src}
              alt={pick(MEDIA[artisan.openingImage].alt)}
              width={MEDIA[artisan.openingImage].width}
              height={MEDIA[artisan.openingImage].height}
              fetchPriority="high"
              className="h-full w-full object-cover object-center opacity-55"
            />
          ) : (
            <div className="h-full w-full opacity-45">
              <WeavePlate kind="plain" palette={artisan.patternPalette} seed={artisan.slug} />
            </div>
          )}
          <div aria-hidden="true" className="scrim-bottom absolute inset-0" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/10" />
        </div>

        <div className="relative mx-auto max-w-[86rem] px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-8 sm:pb-20 sm:pt-[calc(var(--header-h)+4.5rem)]">
          <Link
            to="/artisans"
            className="inline-flex items-center gap-2 text-sm text-canvas/70 transition-colors hover:text-canvas"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t('artisan.back')}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] uppercase tracking-[0.18em] text-canvas/70">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                  {pick(region?.name ?? { en: '', es: '' })}
                </span>
                <span aria-hidden="true" className="text-canvas/30">/</span>
                <span>{pick(artisan.craft)}</span>
              </p>

              <h1
                id="act-1-title"
                className="mt-5 text-balance font-serif text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
              >
                {artisan.name}
              </h1>

              <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-canvas/55">{t('artisan.community')}</dt>
                  <dd className="mt-1 text-canvas/90">{pick(artisan.community)}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-canvas/55">{t('artisan.territory')}</dt>
                  <dd className="mt-1 text-canvas/90">{pick(artisan.territory)}</dd>
                </div>
              </dl>

              <p className="mt-7 max-w-xl text-pretty leading-relaxed text-canvas/78">{pick(artisan.standfirst)}</p>

              <div className="mt-10 max-w-xl border-l-2 pl-6" style={{ borderColor: accent }}>
                <blockquote className="text-pretty font-serif text-2xl italic leading-[1.3] text-canvas sm:text-[1.875rem]">
                  {pick(artisan.quote)}
                </blockquote>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-canvas/55">
                  {artisan.name} · {pick(artisan.quoteAttribution)}
                </p>
              </div>
            </div>

            <div className="lg:pb-2">
              <TraceabilitySeal artisan={artisan} />
            </div>
          </div>
        </div>
      </section>

      {/* The act rail plus the body of the chronicle. */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <ActRail active={active} accent={accent} />

          <div className="min-w-0 pb-8">
            <div className="pt-12 sm:pt-16">
              <DemonstrationNotice />
            </div>

            {/* =============== ACT II — territory and memory =============== */}
            <Act id="act-2" index={1} accent={accent}>
              <motion.div {...rise} className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
                <Prose paragraphs={pick(artisan.memory)} />
                <aside className="lg:pt-2">
                  <div className="rounded-sm border border-line bg-surface/45 p-6">
                    <h3 className="eyebrow mb-2">{t('artisan.craft')}</h3>
                    <p className="font-serif text-lg text-bordeaux">{pick(artisan.craft)}</p>
                    <h3 className="eyebrow mb-2 mt-6">{t('artisan.community')}</h3>
                    <p className="text-sm leading-relaxed text-ink/80">{pick(artisan.community)}</p>
                    <h3 className="eyebrow mb-2 mt-6">
                      {pick({ en: 'Taught by', es: 'Le enseñó' })}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/80">{pick(artisan.taughtBy)}</p>
                    {region && (
                      <Link
                        to={`/atlas/${region.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm text-bordeaux underline-offset-4 hover:underline"
                      >
                        {pick(region.name)} — {t('nav.atlas')} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </aside>
              </motion.div>
            </Act>

            {/* =============== ACT III — material and technique =============== */}
            <Act id="act-3" index={2} accent={accent}>
              <motion.div {...rise}>
                <h3 className="font-serif text-2xl text-bordeaux sm:text-[1.75rem]">{t('zoom.title')}</h3>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-clay">{t('zoom.lede')}</p>
                <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
                  <ZoomLens fibre={artisan.fibre} />
                  <div className="lg:pt-1">
                    {artisan.openingImage && (
                      <CreditedImage id={artisan.openingImage} imgClassName="aspect-[4/3]" />
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div {...rise} className="mt-20">
                <h3 className="font-serif text-2xl text-bordeaux sm:text-[1.75rem]">{t('hotspots.title')}</h3>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-clay">{t('hotspots.lede')}</p>
                <div className="mt-8">
                  <PatternHotspots
                    hotspots={artisan.hotspots}
                    glossary={artisan.glossary}
                    plate={artisan.works[0]?.plate ?? 'plain'}
                    palette={artisan.patternPalette}
                    seed={artisan.slug}
                  />
                </div>
              </motion.div>

              <motion.div {...rise} className="mt-20">
                <h3 className="font-serif text-2xl text-bordeaux sm:text-[1.75rem]">{t('techniquevideo.title')}</h3>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-clay">{t('techniquevideo.lede')}</p>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {artisan.techniques.map((id) => {
                    const g = TECHNIQUES.find((x) => x.id === id)
                    if (!g) return null
                    return (
                      <li key={id}>
                        <Link
                          to={`/techniques/${g.slug}`}
                          className="group block overflow-hidden rounded-sm border border-line transition-colors hover:border-ash"
                        >
                          <div className="aspect-[5/4] border-b border-line bg-surface/60">
                            <TechniqueLoop
                              kind={g.id}
                              playing={!reduced}
                              label={pick(g.motionAlt)}
                              ink="#6E3A41"
                              accent={accent}
                            />
                          </div>
                          <div className="p-4">
                            <p className="font-serif text-lg text-bordeaux">{g.term}</p>
                            <p className="mt-0.5 text-sm text-clay">{pick(g.gloss)}</p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </Act>

            {/* =============== ACT IV — works of the workshop =============== */}
            <Act id="act-4" index={3} accent={accent}>
              <motion.ul {...rise} className="space-y-10">
                {artisan.works.map((w, i) => (
                  <li
                    key={w.id}
                    className="grid gap-6 border-t border-line pt-10 first:border-0 first:pt-0 sm:grid-cols-[15rem_1fr] sm:gap-10"
                  >
                    <div className="overflow-hidden rounded-sm border border-line">
                      <div className="aspect-square">
                        <WeavePlate kind={w.plate} palette={artisan.patternPalette} seed={`${artisan.slug}-${w.id}`} />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-1.5 font-serif text-2xl leading-snug text-bordeaux">{pick(w.title)}</h3>
                      <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-ink/78">{pick(w.context)}</p>

                      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { k: t('works.technique'), v: pick(w.technique) },
                          { k: t('works.materials'), v: pick(w.materials) },
                          { k: t('works.time'), v: pick(w.time), emphasis: true },
                          { k: t('works.scale'), v: pick(w.scale) },
                        ].map((row) => (
                          <div key={row.k}>
                            <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted">{row.k}</dt>
                            <dd
                              className={cn(
                                'mt-1 text-sm leading-snug',
                                row.emphasis ? 'font-serif text-base italic text-bordeaux' : 'text-ink/80',
                              )}
                            >
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                ))}
              </motion.ul>

              <p className="mt-12 max-w-2xl border-l-2 border-ash pl-5 text-pretty font-serif text-lg italic leading-relaxed text-clay">
                {t('works.note')}
              </p>
            </Act>

            {/* =============== ACT V — direct contact =============== */}
            <Act id="act-5" index={4} accent={accent}>
              <motion.div {...rise}>
                <DirectContact artisan={artisan} />
              </motion.div>
            </Act>
          </div>
        </div>
      </div>
    </article>
  )
}

function Act({
  id,
  index,
  accent,
  children,
}: {
  id: string
  index: number
  accent: string
  children: React.ReactNode
}) {
  const { t } = useI18n()
  const act = ACTS[index]
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+2rem)] pt-20 sm:pt-28">
      <header className="mb-10">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8" style={{ background: accent }} />
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
            {t('artisan.act')} {t(act.roman)}
          </span>
        </p>
        <h2 id={`${id}-title`} className="mt-3 text-balance font-serif text-3xl leading-tight text-bordeaux sm:text-[2.5rem]">
          {t(act.title)}
        </h2>
      </header>
      {children}
    </section>
  )
}

/** Position marker for the continuous read. Never a tab set. */
function ActRail({ active, accent }: { active: string | null; accent: string }) {
  const { t } = useI18n()
  return (
    <nav aria-label={t('artisan.progress')} className="hidden lg:block">
      <div className="sticky top-[calc(var(--header-h)+3rem)] pt-20">
        <p className="eyebrow mb-5">{t('artisan.acts')}</p>
        <ol className="space-y-1">
          {ACTS.map((a) => {
            const on = active === a.id
            return (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={cn(
                    'group flex items-baseline gap-3 rounded-sm py-2 pr-2 text-sm transition-colors',
                    on ? 'text-bordeaux' : 'text-clay hover:text-bordeaux',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 font-mono text-xs transition-colors"
                    style={{ color: on ? accent : undefined }}
                  >
                    {t(a.roman)}
                  </span>
                  <span className="text-pretty leading-snug">{t(a.title)}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
