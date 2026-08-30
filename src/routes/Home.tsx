import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { ConductorThread } from '../components/graphics/ConductorThread'
import { WeavePlate } from '../components/graphics/WeavePlate'
import { TechniqueLoop } from '../components/graphics/TechniqueLoop'
import { Eyebrow, SectionHeading, Testimony, ThreadRule } from '../components/ui/primitives'
import { MEDIA } from '../content/media'
import { TECHNIQUES } from '../content/techniques'
import { REGIONS } from '../content/regions'
import { ARTISANS } from '../content/artisans'
import { cn } from '../lib/cn'

export function Home() {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  // The cover pairs a photograph with a first-person quotation, so the two must
  // agree and must not imply each other falsely. The chronicles are
  // demonstrations with invented quotations, so the cover image is deliberately
  // one of objects rather than of an identifiable person: no real individual is
  // put next to words they never said. The image and the voice are also from
  // the same tradition, which a mismatched pairing would quietly misrepresent.
  const hero = MEDIA.werregueVasijas
  const voice = ARTISANS[2]

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
      {/* ---------------------------------------------------------------
          Act of arrival. A single human fragment, not a catalogue.
      --------------------------------------------------------------- */}
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
              <span aria-hidden="true" className="block font-serif text-6xl leading-none text-canvas/25">&ldquo;</span>
              <blockquote className="-mt-4 text-balance font-serif text-[2rem] italic leading-[1.16] text-canvas sm:text-[2.75rem] lg:text-[3.25rem]">
                {pick(voice.quote)}
              </blockquote>
              <p className="mt-5 text-sm text-canvas/70">
                {voice.name} · {pick(voice.community)} ·{' '}
                <span className="text-caribe/90">{pick(voice.quoteAttribution)}</span>
              </p>
            </div>

            <p className="mt-9 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-canvas/78 sm:text-base">
              {t('home.hero.curatorial')}
            </p>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-canvas/45">
              {t('home.hero.credit')}:{' '}
              <a
                href={hero.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-canvas/25 underline-offset-2 hover:text-canvas/70"
              >
                {hero.author}
              </a>
              ,{' '}
              <a
                href={hero.licenceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-canvas/25 underline-offset-2 hover:text-canvas/70"
              >
                {hero.licence}
              </a>
              . {pick(hero.caption)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to={`/artisans/${voice.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-sm bg-canvas px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-caribe"
              >
                {t('home.hero.cta')}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="inline-flex items-center gap-2 text-sm text-canvas/60">
                <ArrowDown size={15} aria-hidden="true" className={cn(!reduced && 'animate-bounce')} />
                {t('home.hero.scroll')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          The thread runs the length of this block and frays at mid-height.
      --------------------------------------------------------------- */}
      <div className="relative">
        <ConductorThread frayAt={0.3} />

        <section className="relative mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
          <motion.div {...rise} className="mx-auto max-w-xl text-center">
            {/* The page ground is painted behind this line so the thread passes
                cleanly behind the text instead of crossing the letterforms. */}
            <p className="text-pretty bg-canvas px-6 py-3 font-serif text-xl italic leading-relaxed text-clay sm:text-2xl">
              {t('home.thread.note')}
            </p>
          </motion.div>
        </section>

        {/* The two routes the strands lead to. */}
        <section className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 sm:pb-32">
          <motion.div {...rise}>
            {/* Same knockout as the note above: the thread should pass behind
                the type, never across the letterforms. */}
            <div className="mx-auto mb-14 w-fit max-w-3xl bg-canvas px-8 py-4">
              <SectionHeading
                eyebrow={t('home.paths.eyebrow')}
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
                  <div className="grid h-full grid-cols-3 gap-px bg-line/40">
                    {TECHNIQUES.slice(0, 3).map((g) => (
                      <div key={g.id} className="flex items-center justify-center bg-surface p-3">
                        <TechniqueLoop
                          kind={g.id}
                          playing={!reduced}
                          label={pick(g.motionAlt)}
                          ink="#6E3A41"
                          accent="#E5A93C"
                        />
                      </div>
                    ))}
                  </div>
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
                  <div className="flex h-full">
                    {REGIONS.map((r) => (
                      <div key={r.id} className="relative h-full flex-1 overflow-hidden" style={{ background: r.colour }}>
                        <div className="absolute inset-0 opacity-30">
                          <WeavePlate kind={r.weave} palette={[r.colour, '#FFFDF5', '#2E1B1E']} seed={r.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </motion.div>
          </div>
        </section>
      </div>

      {/* ---------------------------------------------------------------
          The stance. Said plainly, because it is the product decision.
      --------------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <motion.div {...rise}>
              <SectionHeading eyebrow={t('home.stance.eyebrow')} title={t('home.stance.title')} />
              <p className="mt-6 max-w-lg text-pretty text-[1.0625rem] leading-[1.75] text-ink/80">
                {t('home.stance.body')}
              </p>
            </motion.div>

            <motion.dl {...rise} className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-1">
              {[
                { t: t('home.stance.a.t'), b: t('home.stance.a.b') },
                { t: t('home.stance.b.t'), b: t('home.stance.b.b') },
                { t: t('home.stance.c.t'), b: t('home.stance.c.b') },
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

      {/* ---------------------------------------------------------------
          Chronicles.
      --------------------------------------------------------------- */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
        <motion.div {...rise}>
          <SectionHeading
            eyebrow={t('home.artisans.eyebrow')}
            title={t('home.artisans.title')}
            lede={t('home.artisans.lede')}
            className="mb-14"
          />
        </motion.div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    <p className="eyebrow">{pick(region?.name ?? { en: '', es: '' })}</p>
                    <h3 className="mt-2 font-serif text-xl leading-snug text-bordeaux">{a.name}</h3>
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

        <ThreadRule className="mt-20" />

        <motion.div {...rise} className="mx-auto mt-16 max-w-2xl text-center">
          <Eyebrow className="mb-4">{t('footer.ethics')}</Eyebrow>
          <Testimony quote={t('footer.ethics.2')} />
        </motion.div>
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
