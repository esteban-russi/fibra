import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { ConductorThread } from '../components/graphics/ConductorThread'
import { WeavePlate } from '../components/graphics/WeavePlate'
import { SectionHeading } from '../components/ui/primitives'
import { MEDIA } from '../content/media'
import { REGIONS } from '../content/regions'
import { ARTISANS } from '../content/artisans'
import { HERO_VOICE } from '../content/voice'
import { cn } from '../lib/cn'
import { scrollToY } from '../lib/scroll'

/** Slower than the 1500ms the Atlas chevron uses: this trip is a full cover
 *  screen, and the copy asks the visitor to follow the thread, not skip it. */
const SLOW_DESCENT_MS = 2400

export function Home() {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  // Objects, not a portrait: the cover photograph is of pieces, so the voice
  // beside it is not read as a likeness of the person speaking. The cover shows
  // it uncredited — it is the project's own archive image, and the credits route
  // still carries every third-party photograph's attribution.
  const hero = MEDIA.werregueVasijas
  const voice = HERO_VOICE

  // The cover fills the first screen, so its secondary link descends rather
  // than jumps — slower than the browser's `smooth`, whose duration is fixed by
  // the engine. Falling through to the plain anchor covers reduced motion and
  // any modified click (new tab, copy link).
  const storiesRef = useRef<HTMLElement>(null)
  const toStories = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = storiesRef.current
      if (!el || reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      // The landing offset stays declared in the element's scroll-mt class.
      const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      scrollToY(el.getBoundingClientRect().top + window.scrollY - offset, SLOW_DESCENT_MS)
      history.replaceState(null, '', '#cinco-actos')
      el.focus({ preventScroll: true })
    },
    [reduced],
  )

  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px -8% 0px' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <>
      {/* Cover: one voice, no catalogue. */}
      <section className="relative min-h-[92svh] overflow-hidden bg-ink text-canvas">
        <img
          src={hero.src}
          alt={pick(hero.alt)}
          width={hero.width}
          height={hero.height}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[54%_42%] opacity-[0.52]"
        />
        <div aria-hidden="true" className="scrim-bottom absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent"
        />

        <div className="relative mx-auto flex min-h-[92svh] max-w-[86rem] flex-col justify-end px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-8 sm:pb-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="eyebrow !text-canvas/65">{t('home.eyebrow')}</p>

            <div className="mt-7">
              <span aria-hidden="true" className="block font-serif text-5xl leading-none text-canvas/25">&ldquo;</span>
              <blockquote className="-mt-3 text-pretty font-serif text-[1.5rem] italic leading-[1.24] text-canvas sm:text-[2.125rem] sm:leading-[1.2] lg:text-[2.625rem]">
                {pick(voice.quote)}
              </blockquote>
              <p className="mt-5 text-sm text-canvas/70">{voice.name}</p>
            </div>

            <p className="mt-8 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-canvas/78 sm:text-base">
              {t('home.hero.curatorial')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/artisans"
                className="group inline-flex items-center gap-2.5 rounded-sm bg-canvas px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-caribe"
              >
                {t('home.hero.cta')}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#cinco-actos"
                onClick={toStories}
                className="group inline-flex items-center gap-2 rounded-sm py-3.5 text-sm text-canvas/60 transition-colors hover:text-canvas"
              >
                <ArrowDown size={15} aria-hidden="true" className={cn(!reduced && 'animate-bounce')} />
                <span className="underline decoration-canvas/20 decoration-1 underline-offset-4 transition-colors group-hover:decoration-canvas/60">
                  {t('home.hero.scroll')}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stories. Where the cover's secondary link lands: the id keeps the plain
          anchor working, the ref feeds the eased descent, and the offset is
          declared here so both arrive at the same place. */}
      <section
        id="cinco-actos"
        ref={storiesRef}
        tabIndex={-1}
        className="mx-auto max-w-[86rem] scroll-mt-[calc(var(--header-h)+1.5rem)] px-5 pb-12 pt-24 outline-none sm:px-8 sm:pb-16 sm:pt-32"
      >
        <motion.div {...rise}>
          <SectionHeading
            eyebrow={t('home.artisans.eyebrow')}
            title={t('home.artisans.title')}
            lede={t('home.artisans.lede')}
            className="mb-14"
          />
        </motion.div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTISANS.map((a) => {
            const region = REGIONS.find((r) => r.id === a.regionId)
            return (
              <motion.li key={a.slug} {...rise}>
                <Link
                  to={`/artisans/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-canvas transition-colors hover:border-ash"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    {a.openingImage ? (
                      <img
                        src={MEDIA[a.openingImage].src}
                        alt={pick(MEDIA[a.openingImage].alt)}
                        width={MEDIA[a.openingImage].width}
                        height={MEDIA[a.openingImage].height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <WeavePlate kind="plain" palette={a.patternPalette} seed={a.slug} />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-1.5 w-full"
                      style={{ background: region?.colour }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-[1.625rem] leading-snug text-bordeaux">{a.name}</h3>
                    <p className="mt-1.5 text-sm text-clay">{pick(a.craft)}</p>
                    <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink/70">{pick(a.standfirst)}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-bordeaux">
                      {t('drawer.viewProfile')}
                      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </section>

      {/* The thread runs the length of this block and frays at mid-height. */}
      <div className="relative">
        <ConductorThread frayAt={0.3} />

        <section className="relative mx-auto max-w-[86rem] px-5 py-12 sm:px-8 sm:py-16">
          <motion.div {...rise} className="mx-auto max-w-xl text-center">
            {/* Ground painted behind the line so the thread passes behind the type. */}
            <p className="text-pretty bg-canvas px-6 py-3 font-serif text-xl italic leading-relaxed text-clay sm:text-2xl">
              {t('home.thread.note')}
            </p>
          </motion.div>
        </section>

        {/* The two routes the strands lead to. */}
        <section className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 sm:pb-32">
          <motion.div {...rise}>
            <div className="mx-auto mb-14 w-fit max-w-3xl bg-canvas px-8 py-4">
              <SectionHeading
                title={t('home.paths.title')}
                lede={t('home.paths.lede')}
                align="center"
              />
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div {...rise}>
              <PathCard
                to="/techniques"
                title={t('home.path.techniques.title')}
                desc={t('home.path.techniques.desc')}
                cta={t('home.path.techniques.cta')}
                visual={
                  <img
                    src={MEDIA.telarManos.src}
                    alt={pick(MEDIA.telarManos.alt)}
                    width={MEDIA.telarManos.width}
                    height={MEDIA.telarManos.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                }
              />
            </motion.div>

            <motion.div {...rise}>
              <PathCard
                to="/atlas"
                title={t('home.path.territory.title')}
                desc={t('home.path.territory.desc')}
                cta={t('home.path.territory.cta')}
                visual={
                  <img
                    src={MEDIA.werregueVasijas.src}
                    alt={pick(MEDIA.werregueVasijas.alt)}
                    width={MEDIA.werregueVasijas.width}
                    height={MEDIA.werregueVasijas.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                }
              />
            </motion.div>
          </div>
        </section>
      </div>

      {/* What the name means, and the three ideas it carries. */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <motion.div {...rise}>
              <SectionHeading title={t('home.identity.title')} />
              <div className="mt-6 max-w-lg space-y-4 text-pretty text-[1.0625rem] leading-[1.75] text-ink/80">
                <p>{t('home.identity.body.1')}</p>
                <p>{t('home.identity.body.2')}</p>
                <p>{t('home.identity.body.3')}</p>
              </div>
            </motion.div>

            <motion.dl {...rise} className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-1">
              {[
                { t: t('home.identity.a.t'), b: t('home.identity.a.b') },
                { t: t('home.identity.b.t'), b: t('home.identity.b.b') },
                { t: t('home.identity.c.t'), b: t('home.identity.c.b') },
              ].map((row, i) => (
                <div key={row.t} className="bg-canvas px-6 py-7 sm:px-8">
                  <dt className="flex items-baseline gap-3 font-serif text-lg text-bordeaux">
                    <span aria-hidden="true" className="text-xs tabular-nums text-ash">
                      0{i + 1}
                    </span>
                    {row.t}
                  </dt>
                  <dd className="mt-2 pl-7 text-pretty text-sm leading-relaxed text-clay">{row.b}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

    </>
  )
}

function PathCard({
  to,
  title,
  desc,
  cta,
  visual,
}: {
  to: string
  title: string
  desc: string
  cta: string
  visual: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-canvas transition-all duration-500 hover:border-ash hover:shadow-[0_18px_50px_-32px_rgba(46,27,30,0.5)]"
    >
      <div className="h-52 overflow-hidden border-b border-line sm:h-64">{visual}</div>
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <h3 className="font-serif text-2xl leading-tight text-bordeaux sm:text-[1.75rem]">{title}</h3>
        <p className="mt-3.5 flex-1 text-pretty text-[0.9375rem] leading-relaxed text-clay">{desc}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-bordeaux">
          {cta}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  )
}
