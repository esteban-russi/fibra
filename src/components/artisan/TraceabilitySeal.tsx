import { useI18n } from '../../i18n'
import type { Artisan } from '../../content/artisans'

/**
 * The Traceability Seal.
 *
 * It names two things at once, deliberately: the individual who made the piece
 * and the collective the knowledge belongs to. Authorship without affiliation
 * erases the lineage; affiliation without authorship erases the person, which
 * is the specific mechanism by which craft work becomes anonymous.
 *
 * Rendered as a definition list rather than a graphic badge so the claims are
 * readable, translatable and available to a screen reader as statements.
 */
export function TraceabilitySeal({ artisan }: { artisan: Artisan }) {
  const { t, pick } = useI18n()

  const rows = [
    { k: t('seal.authorship'), v: artisan.seal.authorship },
    { k: t('seal.affiliation'), v: pick(artisan.seal.affiliation) },
    { k: t('seal.origin'), v: pick(artisan.seal.origin) },
    { k: t('seal.material'), v: t('seal.material.value') },
    { k: t('seal.consent'), v: artisan.seal.consentYear === '—' ? '—' : t('seal.consent.value') },
  ]

  return (
    <section
      aria-labelledby="seal-title"
      className="rounded-sm border border-line bg-canvas p-6 shadow-[0_16px_44px_-28px_rgba(46,27,30,0.6)] sm:p-7"
    >
      <div className="flex items-start gap-4">
        <SealMark />
        <div className="min-w-0">
          <h3 id="seal-title" className="font-serif text-lg leading-tight text-bordeaux">
            {t('seal.title')}
          </h3>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-clay">{t('seal.what')}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-line/70 border-t border-line/70">
        {rows.map((r) => (
          <div key={r.k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5">
            <dt className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">{r.k}</dt>
            <dd className="text-right text-sm text-ink/85">{r.v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-pretty text-[0.8125rem] leading-relaxed text-clay">{t('seal.explain')}</p>
    </section>
  )
}

/** A drawn mark: two threads crossing inside a ring — author and lineage. */
function SealMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0 text-bordeaux" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="24" cy="24" r="16.5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
      <path
        d="M13 24 Q 18.5 15 24 24 T 35 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M24 13 Q 33 18.5 24 24 T 24 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
