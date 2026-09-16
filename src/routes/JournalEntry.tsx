import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { Prose, ThreadRule } from '../components/ui/primitives'
import { MEDIA } from '../content/media'
import { REGIONS } from '../content/regions'
import { JOURNAL_BY_SLUG, TEJILARTE_VIDEO } from '../content/journal'
import type { JournalBlock, JournalEntry as Entry, JournalSection } from '../content/journal'
import { JOURNAL_ID } from '../lib/scroll'

/**
 * One journal entry, read as a magazine page.
 *
 * Its own route rather than an expanding panel on the cover: an entry is a long
 * read with its own photographs and its own dateline, and it has to survive
 * being linked to on its own — which is the whole point of publishing a
 * festival that people are being invited to attend.
 */
export function JournalEntry() {
  const { slug } = useParams()
  const entry = JOURNAL_BY_SLUG.get(slug ?? '')
  if (!entry) return <Navigate to={`/#${JOURNAL_ID}`} replace />
  return <Piece key={entry.slug} entry={entry} />
}

function Piece({ entry }: { entry: Entry }) {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const accent = REGIONS.find((r) => r.id === entry.regionId)?.colour ?? '#6E3A41'
  const hero = MEDIA[entry.hero]

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
      {/* The masthead. The photograph is documentary and of a public event, so
          unlike an artisan profile it can carry the headline directly. */}
      <section aria-labelledby="entry-title" className="relative overflow-hidden bg-ink text-canvas">
        <img
          src={hero.src}
          alt={pick(hero.alt)}
          width={hero.width}
          height={hero.height}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_62%] opacity-[0.42]"
        />
        <div aria-hidden="true" className="scrim-bottom absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/20" />

        <div className="relative mx-auto max-w-[86rem] px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-8 sm:pb-20 sm:pt-[calc(var(--header-h)+4.5rem)]">
          <Link
            to={`/#${JOURNAL_ID}`}
            className="inline-flex items-center gap-2 text-sm text-canvas/70 transition-colors hover:text-canvas"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {t('journal.back')}
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="eyebrow !text-canvas/70">{pick(entry.eyebrow)}</p>
            <h1
              id="entry-title"
              className="mt-5 text-balance font-serif text-[2.25rem] leading-[1.06] sm:text-5xl lg:text-[4rem]"
            >
              {pick(entry.headline)}
            </h1>
            <span aria-hidden="true" className="mt-7 block h-1 w-16" style={{ background: accent }} />
            <p className="mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-canvas/80">
              {pick(entry.standfirst)}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-canvas/60">{pick(entry.dateline)}</p>
          </div>
        </div>
      </section>

      <figcaption className="mx-auto max-w-[86rem] px-5 pt-4 text-sm leading-relaxed text-muted sm:px-8">
        {pick(hero.caption)}
      </figcaption>

      <div className="mx-auto max-w-[86rem] px-5 pb-12 sm:px-8">
        {entry.sections.map((s, i) => (
          <Section key={s.id} section={s} accent={accent} rise={rise} first={i === 0} />
        ))}

        {/* The runway that closes the festival. */}
        <motion.section {...rise} aria-labelledby="entry-gallery" className="mt-20 border-t border-line pt-14">
          <h2 id="entry-gallery" className="eyebrow mb-7">
            {t('journal.gallery')}
          </h2>
          <ul className="grid max-w-3xl gap-8 sm:grid-cols-2">
            {entry.gallery.map((g) => {
              const m = MEDIA[g.media]
              if (!m) return null
              return (
                <li key={g.media}>
                  <figure>
                    <img
                      src={m.src}
                      alt={pick(m.alt)}
                      width={m.width}
                      height={m.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full rounded-sm object-cover"
                    />
                    <figcaption className="mt-3 text-pretty text-sm leading-relaxed text-clay">
                      {pick(g.caption)}
                    </figcaption>
                  </figure>
                </li>
              )
            })}
          </ul>
        </motion.section>

        {/* The practical rows, last: everything above is why you would go. */}
        <motion.section {...rise} aria-labelledby="entry-guide" className="mt-20">
          <div className="rounded-sm border border-line bg-surface/45 p-7 sm:p-9">
            <h2 id="entry-guide" className="font-serif text-2xl text-bordeaux sm:text-3xl">
              {t('journal.guide')}
            </h2>
            <dl className="mt-7 grid gap-7 sm:grid-cols-3">
              {entry.facts.map((f) => (
                <div key={f.id}>
                  <dt className="eyebrow mb-2">{pick(f.label)}</dt>
                  <dd className="text-pretty text-[0.9375rem] leading-relaxed text-ink/80">
                    {pick(f.value)}
                    {f.href && (
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-2 inline-flex items-center gap-1.5 text-bordeaux underline decoration-line underline-offset-4 hover:decoration-bordeaux"
                      >
                        {f.linkText ?? f.href}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.section>

        <ThreadRule className="mt-16" />

        <p className="mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-clay">{t('journal.courtesy')}</p>

        <Link
          to={`/#${JOURNAL_ID}`}
          className="mt-10 inline-flex items-center gap-2 text-sm text-bordeaux underline-offset-4 hover:underline"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {t('journal.back')}
        </Link>
      </div>
    </article>
  )
}

/**
 * A section of the body. The aside photograph, where there is one, is held
 * beside the column while it is read rather than interrupting it.
 */
function Section({
  section,
  accent,
  rise,
  first,
}: {
  section: JournalSection
  accent: string
  rise: Record<string, unknown>
  first: boolean
}) {
  const { pick } = useI18n()

  const column = (
    <div className="min-w-0 max-w-2xl">
      <h2
        id={`${section.id}-title`}
        className="text-balance font-serif text-3xl leading-tight text-bordeaux sm:text-[2.25rem]"
      >
        {pick(section.title)}
      </h2>
      {section.lede && (
        <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-clay">{pick(section.lede)}</p>
      )}
      <div className="mt-8 space-y-9">
        {section.blocks.map((b, i) => (
          <Block key={i} block={b} accent={accent} />
        ))}
      </div>
    </div>
  )

  // The invitation is addressed to the reader rather than reported to them, so
  // it is taken out of the two-column rhythm and centred on its own ground.
  if (section.feature) {
    return (
      <motion.section
        {...rise}
        aria-labelledby={`${section.id}-title`}
        className="mt-20 rounded-sm border border-line bg-surface/45 px-6 py-12 sm:px-12 sm:py-16"
      >
        <div className="mx-auto max-w-2xl">{column}</div>
      </motion.section>
    )
  }

  return (
    <motion.section
      {...rise}
      aria-labelledby={`${section.id}-title`}
      className={first ? 'pt-16 sm:pt-20' : 'mt-20 border-t border-line pt-14'}
    >
      {section.aside ? (
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {column}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            {section.aside.kind === 'video' ? <VideoAside /> : <PhotoAside id={section.aside.media} />}
          </div>
        </div>
      ) : (
        column
      )}
    </motion.section>
  )
}

function PhotoAside({ id }: { id: string }) {
  const { pick } = useI18n()
  const m = MEDIA[id]
  if (!m) return null
  return (
    <figure className="mx-auto max-w-md lg:mx-0">
      <img
        src={m.src}
        alt={pick(m.alt)}
        width={m.width}
        height={m.height}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full rounded-sm object-cover"
      />
      <figcaption className="mt-3 text-pretty text-sm leading-relaxed text-clay">{pick(m.caption)}</figcaption>
    </figure>
  )
}

/**
 * The video, in the rail beside the section it belongs to.
 *
 * Vertical because that is how it was filmed — reframing it to landscape would
 * crop the hands out of their own frame — and bounded in width so a 9:16 file
 * does not stand taller than the text it accompanies. It does not autoplay:
 * nothing on this site starts moving or sounding without being asked.
 */
function VideoAside() {
  const { t, pick } = useI18n()
  const poster = MEDIA[TEJILARTE_VIDEO.poster]
  return (
    <figure className="mx-auto max-w-[19rem] lg:mx-0">
      <video
        src={TEJILARTE_VIDEO.src}
        poster={poster?.src}
        width={TEJILARTE_VIDEO.width}
        height={TEJILARTE_VIDEO.height}
        controls
        playsInline
        preload="none"
        aria-label={pick(TEJILARTE_VIDEO.label)}
        className="block aspect-[9/16] w-full rounded-sm border border-line bg-ink object-cover"
      >
        {t('journal.video.fallback')}
      </video>
      <figcaption className="mt-3 text-pretty text-sm leading-relaxed text-clay">{t('journal.watch')}</figcaption>
    </figure>
  )
}

function Block({ block, accent }: { block: JournalBlock; accent: string }) {
  const { pick } = useI18n()

  if (block.kind === 'prose') return <Prose paragraphs={pick(block.paragraphs)} />

  if (block.kind === 'quote') {
    return (
      <figure className="border-l-2 pl-6 sm:pl-8" style={{ borderColor: accent }}>
        <blockquote className="text-pretty font-serif text-xl italic leading-[1.4] text-bordeaux sm:text-[1.625rem]">
          {pick(block.text)}
        </blockquote>
        {block.attribution && (
          <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
            — {block.attribution}
          </figcaption>
        )}
      </figure>
    )
  }

  // Labelled runs. Numbered where the order is the route through the town and
  // not merely a list; the marker is the counter, never a decorative bullet.
  return (
    <ol className="space-y-7">
      {block.entries.map((e, i) => (
        <li key={e.id} className="flex gap-5">
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 font-serif text-lg leading-none"
            style={{ color: accent }}
          >
            {block.numbered ? String(i + 1).padStart(2, '0') : '—'}
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-xl text-bordeaux sm:text-[1.375rem]">{pick(e.label)}</h3>
            <p className="mt-2 text-pretty text-[1.0625rem] leading-[1.75] text-ink/85">{pick(e.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
