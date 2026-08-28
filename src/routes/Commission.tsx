import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { SectionHeading, Testimony, ThreadRule } from '../components/ui/primitives'
import { GUIDE, OPENING_MESSAGE } from '../content/guide'
import { ARTISANS } from '../content/artisans'

/**
 * The Guide to a Conscious Commission as a standalone route.
 *
 * The same content appears inside Act V of every chronicle. It also lives here
 * on its own because it is the thing worth linking to on its own — it is the
 * platform's actual position on how this exchange should work, and it should
 * not require entering someone's profile to read.
 */
export function Commission() {
  const { t, pick } = useI18n()

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <SectionHeading eyebrow={t('nav.commission')} title={t('guide.title')} lede={t('guide.lede')} />

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <ol className="space-y-12">
          {GUIDE.map((point, i) => (
            <li key={point.id} className="grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
              <p aria-hidden="true" className="font-mono text-sm tabular-nums text-muted sm:pt-2">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h2 className="font-serif text-2xl leading-snug text-bordeaux">{pick(point.title)}</h2>
                <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-[1.75] text-ink/80">
                  {pick(point.body)}
                </p>
                {point.say && (
                  <figure className="mt-5 max-w-xl border-l-2 border-caribe/60 bg-caribe/8 py-3 pl-5 pr-4">
                    <figcaption className="mb-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-[#7A5410]">
                      {t('guide.step')}
                    </figcaption>
                    <p className="text-pretty italic leading-relaxed text-ink/85">{pick(point.say)}</p>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>

        <aside className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:h-fit">
          <div className="rounded-sm border border-line bg-surface/45 p-6 sm:p-7">
            <h2 className="eyebrow mb-3">{t('contact.prefilled')}</h2>
            <p className="border-l-2 border-ash pl-4 text-pretty italic leading-relaxed text-ink/82">
              {pick(OPENING_MESSAGE)}
            </p>
            <p className="mt-6 text-pretty text-sm leading-relaxed text-clay">{t('contact.lede')}</p>
          </div>

          <ThreadRule className="my-9" />

          <h2 className="eyebrow mb-4">{t('artisans.title')}</h2>
          <ul className="space-y-2.5">
            {ARTISANS.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/artisans/${a.slug}#act-5`}
                  className="group flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 text-sm"
                >
                  <span className="text-ink/80 group-hover:text-bordeaux">{a.name}</span>
                  <span className="shrink-0 text-xs text-muted">{pick(a.craft)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Testimony quote={t('contact.nocommission')} />
          </div>
        </aside>
      </div>
    </div>
  )
}
