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
import { MEDIA, backdropFor } from '../content/media'
import type { Credit } from '../content/media'
import { TechniqueIcon } from '../components/graphics/TechniqueIcon'
import { DirectContact } from '../components/artisan/DirectContact'
import { Prose } from '../components/ui/primitives'

/**
 * The story: five acts read as one continuous descent.
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
  return <Story key={artisan.slug} artisan={artisan} />
}

function Story({ artisan }: { artisan: Artisan }) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const ids = useMemo(() => ACTS.map((a) => a.id), [])
  const active = useActiveSection(ids)
  const region = REGIONS.find((r) => r.id === artisan.regionId)
  const accent = region?.colour ?? '#6E3A41'
  const backdrop = backdropFor(artisan.slug)

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
      {/*
        One screen, one claim: this is her, this is where the work comes from.
        The backdrop is real cloth, photographed — a drawn plate stood here
        before and read as decoration. It is texture and nothing more: the
        registry entry says whose frame it is and that it documents no weaver
        and no place, which is the only condition on which a photograph can sit
        behind a named person without being read as hers. The scrim over it is
        15% lighter than it was, so the interlacement is legible as cloth rather
        than as a dark wash. Everything the summary card states appears exactly
        once; the region, the craft and the community used to be repeated three
        ways above the fold.
      */}
      <section id="act-1" aria-labelledby="act-1-title" className="relative overflow-hidden bg-ink text-canvas">
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src={backdrop.src}
            alt=""
            width={backdrop.width}
            height={backdrop.height}
            decoding="async"
            className="h-full w-full object-cover opacity-[0.62]"
          />
          <div className="scrim-bottom absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/72 via-ink/60 to-ink/47" />
        </div>

        <div className="relative mx-auto max-w-[86rem] px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-8 sm:pb-20 sm:pt-[calc(var(--header-h)+4.5rem)]">
          <Link
            to="/artisans"
            className="inline-flex items-center gap-2 text-sm text-canvas/70 transition-colors hover:text-canvas"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t('artisan.back')}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
            <div>
              <h1
                id="act-1-title"
                className="text-balance font-serif text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
              >
                {artisan.name}
              </h1>

              <IdentityCard artisan={artisan} accent={accent} />

              <p className="mt-8 max-w-xl text-pretty leading-relaxed text-canvas/78">{pick(artisan.standfirst)}</p>
            </div>

            <div className="lg:pt-2">
              <Portrait artisan={artisan} backdrop={backdrop} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- The voice, between the acts ----------------
        Her own words stand alone between the opening and the account of where
        she learned, on the page's own ground rather than over the hero. The
        curatorial voice does not surround it on either side. */}
      <section aria-label={t('artisan.voice')} className="border-y border-line bg-surface/40">
        <figure className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl border-l-2 pl-6 sm:pl-8" style={{ borderColor: accent }}>
            <blockquote className="text-pretty font-serif text-2xl italic leading-[1.32] text-bordeaux sm:text-[2rem]">
              {pick(artisan.quote)}
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">
              {artisan.name} · {pick(artisan.quoteAttribution)}
            </figcaption>
          </div>
        </figure>
      </section>

      {/* The act rail plus the body of the story. */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <ActRail active={active} accent={accent} />

          <div className="min-w-0 pb-8">
            {/* =============== ACT II — territory and memory =============== */}
            <Act id="act-2" index={1} accent={accent}>
              <motion.div {...rise} className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
                <Prose paragraphs={pick(artisan.memory)} />
                <aside className="lg:pt-2">
                  <div className="rounded-sm border border-line bg-surface/45 p-6">
                    <h3 className="eyebrow mb-2">{t('artisan.craft')}</h3>
                    <p className="font-serif text-lg text-bordeaux">{pick(artisan.craft)}</p>
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
              {/*
                The gestures this workshop actually performs, each one a round
                photograph of the work rather than a diagram. Round because the
                row is a set of people's hands, not a set of cards: the circle
                crops to the gesture and keeps five very different frames
                reading as one row.
              */}
              <motion.div {...rise}>
                <h3 className="font-serif text-2xl text-bordeaux sm:text-[1.75rem]">{t('techniquevideo.title')}</h3>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-clay">{t('techniquevideo.lede')}</p>

                <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-9">
                  {artisan.techniques.map((id) => {
                    const g = TECHNIQUES.find((x) => x.id === id)
                    if (!g) return null
                    const photo = MEDIA[g.photo]
                    return (
                      <li key={id}>
                        <Link to={`/techniques/${g.slug}`} className="group flex w-36 flex-col items-center text-center">
                          <span className="relative block h-36 w-36 overflow-hidden rounded-full border border-line bg-surface/60">
                            <img
                              src={photo.src}
                              alt={pick(photo.alt)}
                              width={photo.width}
                              height={photo.height}
                              loading="lazy"
                              decoding="async"
                              style={{
                                transformOrigin: g.focus?.origin,
                                ['--photo-zoom' as string]: g.focus?.zoom ?? 1,
                              }}
                              className="h-full w-full scale-[var(--photo-zoom,1)] object-cover transition-transform duration-700 group-hover:scale-[calc(var(--photo-zoom,1)*1.07)]"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full ring-1 ring-inset transition-colors"
                              style={{ ['--tw-ring-color' as string]: `${accent}55` }}
                            />
                          </span>
                          <span className="mt-4 flex items-center gap-2 font-serif text-lg text-bordeaux">
                            <TechniqueIcon kind={g.id} size={22} ringed={false} className="text-bordeaux" />
                            {g.term}
                          </span>
                          <span className="mt-0.5 text-sm leading-snug text-clay">{pick(g.gloss)}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </Act>

            {/* =============== ACT IV — works of the workshop =============== */}
            {/*
              The pieces themselves, photographed by the workshops, in a plain
              grid. No record, no metadata, no caption standing under the image
              competing with it — the name arrives on hover, over the photograph
              it belongs to, and leaves again. What a garment is is something
              you see; the times and the scales the artisans gave are still in
              `artisans.ts`, and would need their own surface to come back.

              The name is in the DOM whether or not it is revealed, so a screen
              reader reads it with the image, and on a touch screen — where
              there is no hover to give — it simply stays visible.
            */}
            <Act id="act-4" index={3} accent={accent}>
              <motion.ul {...rise} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {artisan.gallery.map((piece) => {
                  const photo = MEDIA[piece.image]
                  if (!photo) return null
                  return (
                    <li key={piece.id}>
                      <figure className="group relative overflow-hidden rounded-sm border border-line bg-surface/40">
                        <img
                          src={photo.src}
                          alt={pick(photo.alt)}
                          width={photo.width}
                          height={photo.height}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <figcaption className="pointer-events-none absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-coarse:opacity-100 sm:p-5">
                          <span aria-hidden="true" className="absolute inset-0 bg-ink/30" />
                          <span aria-hidden="true" className="scrim-bottom absolute inset-x-0 bottom-0 h-3/5" />
                          <span className="relative text-pretty font-serif text-lg leading-tight text-canvas sm:text-xl">
                            {pick(piece.name)}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  )
                })}
              </motion.ul>
            </Act>

            {/* =============== ACT V — direct contact =============== */}
            <Act id="act-5" index={4} accent={accent} titled={false}>
              <motion.div {...rise}>
                <DirectContact artisan={artisan} headingId="act-5-title" />
              </motion.div>
            </Act>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * The summary card: the four facts a reader needs before the story starts.
 *
 * These are the claims the Traceability Seal used to make in its own panel —
 * community affiliation, geographic origin, raw material — stated once, in the
 * artisan's own terms, at the point where they are first useful. They are hers
 * rather than the site's: not every workshop works only in natural fibre, and
 * the material line says what she says it says.
 *
 * The techniques carry their drawn marks. At this size a photograph would be
 * unreadable and a bare list of five verbs reads as a footnote; the marks make
 * the row scannable and tie it to the technique route it links into.
 */
function IdentityCard({ artisan, accent }: { artisan: Artisan; accent: string }) {
  const { t, pick } = useI18n()

  const rows: { k: string; v: React.ReactNode }[] = [
    { k: t('artisan.community'), v: pick(artisan.seal.affiliation) },
    { k: t('seal.origin'), v: pick(artisan.seal.origin) },
    { k: t('seal.material'), v: pick(artisan.seal.material) },
  ]

  return (
    <div className="mt-8 max-w-xl rounded-sm border border-line bg-canvas p-5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.8)] sm:p-6">
      <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.k}>
            <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{r.k}</dt>
            <dd className="mt-1.5 text-pretty text-sm leading-snug text-ink/85">{r.v}</dd>
          </div>
        ))}

        <div>
          <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{t('artisan.techniques')}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {artisan.techniques.map((id) => {
              const g = TECHNIQUES.find((x) => x.id === id)
              if (!g) return null
              return (
                <Link
                  key={id}
                  to={`/techniques/${g.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 text-xs text-ink/85 transition-colors hover:border-ash hover:text-bordeaux"
                >
                  <TechniqueIcon kind={g.id} size={24} className="text-bordeaux" />
                  {g.term}
                </Link>
              )
            })}
          </dd>
        </div>
      </dl>

      <p className="mt-5 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-clay">
        <span className="text-ink/80">{t('seal.authorship')}:</span> {artisan.seal.authorship}. {pick(artisan.seal.consent)}.
      </p>

      <span aria-hidden="true" className="mt-5 block h-0.5 w-10 rounded-full" style={{ background: accent }} />
    </div>
  )
}

/**
 * Her portrait, or the cloth that stands in for one.
 *
 * A profile with no supplied photograph gets woven ground rather than a
 * borrowed face — the same cloth as the backdrop behind it, so the empty slot
 * reads as a gap in the page rather than as a second image. The substitution is
 * stated rather than hidden: a reader who sees cloth here should know that it
 * means no portrait has been given yet, not that one is loading.
 */
function Portrait({ artisan, backdrop }: { artisan: Artisan; backdrop: Credit }) {
  const { t, pick } = useI18n()
  const credit = artisan.portrait ? MEDIA[artisan.portrait] : null

  if (!credit) {
    return (
      <figure className="overflow-hidden rounded-sm border border-canvas/20">
        <div className="relative aspect-[4/5]">
          <img
            src={backdrop.src}
            alt=""
            width={backdrop.width}
            height={backdrop.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/30" />
        </div>
        <figcaption className="bg-ink/45 px-4 py-3 text-[0.75rem] leading-relaxed text-canvas/60">
          {t('artisan.noPortrait')}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="overflow-hidden rounded-sm border border-canvas/20 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)]">
      <img
        src={credit.src}
        alt={pick(credit.alt)}
        width={credit.width}
        height={credit.height}
        fetchPriority="high"
        decoding="async"
        className="aspect-[4/5] w-full object-cover object-center"
      />
    </figure>
  )
}

/**
 * One act: the rule, the numeral, and the act's own title.
 *
 * `titled={false}` suppresses that title for an act whose content already
 * opens with a heading of its own — act V says "Hable con el taller" and does
 * not also need to be announced as "El Contacto Directo y el Encargo Ético"
 * directly above it. The act name still identifies it in the rail. The section
 * keeps pointing at `<id>-title`, so whichever element carries that id is the
 * one that names the section.
 */
function Act({
  id,
  index,
  accent,
  titled = true,
  children,
}: {
  id: string
  index: number
  accent: string
  titled?: boolean
  children: React.ReactNode
}) {
  const { t } = useI18n()
  const act = ACTS[index]
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+2rem)] pt-20 sm:pt-28">
      <header className={titled ? 'mb-10' : 'mb-7'}>
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8" style={{ background: accent }} />
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
            {t('artisan.act')} {t(act.roman)}
          </span>
        </p>
        {titled && (
          <h2
            id={`${id}-title`}
            className="mt-3 text-balance font-serif text-3xl leading-tight text-bordeaux sm:text-[2.5rem]"
          >
            {t(act.title)}
          </h2>
        )}
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
