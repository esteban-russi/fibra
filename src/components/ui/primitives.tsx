import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { useI18n } from '../../i18n'
import type { Localized } from '../../i18n'
import { MEDIA } from '../../content/media'

/** Small-caps editorial label used above every section heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  id,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  className?: string
  id?: string
}) {
  return (
    <header className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-balance text-3xl leading-[1.08] font-medium sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {lede && <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-clay sm:text-lg">{lede}</p>}
    </header>
  )
}

/**
 * First-person testimony. Kept typographically distinct from the curatorial
 * voice throughout — the specification's rule is that the curatorial voice
 * accompanies the artisan's voice but never replaces it, and the two are never
 * allowed to look the same on the page.
 */
export function Testimony({
  quote,
  attribution,
  className,
}: {
  quote: string
  attribution?: ReactNode
  className?: string
}) {
  return (
    <figure className={cn('relative', className)}>
      <span aria-hidden="true" className="absolute -left-1 -top-6 font-serif text-6xl leading-none text-line select-none">
        &ldquo;
      </span>
      <blockquote className="relative text-pretty font-serif text-xl italic leading-[1.45] text-bordeaux sm:text-2xl lg:text-[1.75rem]">
        {quote}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">{attribution}</figcaption>
      )}
    </figure>
  )
}

/** Long-form curatorial prose. Deliberately plainer than Testimony. */
export function Prose({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={cn('space-y-5 text-[1.0625rem] leading-[1.75] text-ink/85', className)}>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-pretty">
          {p}
        </p>
      ))}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'warn' | 'solid'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em]',
        tone === 'neutral' && 'bg-surface text-clay',
        tone === 'warn' && 'bg-caribe/18 text-[#7A5410] ring-1 ring-caribe/40',
        tone === 'solid' && 'bg-bordeaux text-canvas',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * A photograph with its licence obligations attached.
 *
 * Several of the source images are share-alike licensed, so attribution is not
 * optional and is rendered next to the image rather than buried on a credits
 * page — which the credits route also carries in full. Crops are done with
 * object-position so no derivative of the original is ever created.
 */
export function CreditedImage({
  id,
  className,
  imgClassName,
  position = 'center',
  showCaption = true,
  priority = false,
  sizes,
}: {
  id: string
  className?: string
  imgClassName?: string
  position?: string
  showCaption?: boolean
  priority?: boolean
  sizes?: string
}) {
  const { pick } = useI18n()
  const credit = MEDIA[id]
  if (!credit) return null

  return (
    <figure className={cn('group', className)}>
      <div className="relative overflow-hidden bg-surface">
        <img
          src={credit.src}
          width={credit.width}
          height={credit.height}
          alt={pick(credit.alt)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          style={{ objectPosition: position }}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </div>
      {showCaption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-clay">
          {pick(credit.caption)}{' '}
          <span className="text-muted">
            —{' '}
            <a
              href={credit.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-line underline-offset-2 hover:text-bordeaux"
            >
              {credit.author}
            </a>
            ,{' '}
            <a
              href={credit.licenceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-line underline-offset-2 hover:text-bordeaux"
            >
              {credit.licence}
            </a>
          </span>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Where the material on a profile comes from.
 *
 * It states the provenance of what is published rather than warning the reader
 * off it: the stories are supplied by the artisans, the translation and the
 * ordering are ours, and the parts that are withheld are named. `notice` is the
 * line the individual record carries in its own words, appended when a profile
 * has one.
 */
export function ProvenanceNotice({ notice, compact = false }: { notice?: Localized; compact?: boolean }) {
  const { t, pick } = useI18n()
  if (compact) {
    return (
      <Badge tone="neutral">
        <span aria-hidden="true">◆</span>
        {t('provenance.badge')}
      </Badge>
    )
  }
  return (
    <aside
      className="rounded-sm border-l-2 border-andina/70 bg-surface/60 px-5 py-4 text-sm leading-relaxed text-ink/80"
      aria-label={t('provenance.title')}
    >
      <p className="mb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bordeaux">
        {t('provenance.title')}
      </p>
      <p className="text-pretty">{t('provenance.body')}</p>
      {notice && <p className="mt-2 text-pretty italic text-clay">{pick(notice)}</p>}
    </aside>
  )
}

/** A horizontal rule that reads as a woven edge rather than a border. */
export function ThreadRule({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <svg width="26" height="8" viewBox="0 0 26 8" className="shrink-0 text-ash" focusable="false">
        <path d="M1 4 Q 5 0 9 4 T 17 4 T 25 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
