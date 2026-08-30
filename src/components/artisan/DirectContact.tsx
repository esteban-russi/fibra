import { useState } from 'react'
import { ChevronDown, MessageCircle, Phone } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useI18n } from '../../i18n'
import { Badge } from '../ui/primitives'
import { GUIDE, OPENING_MESSAGE } from '../../content/guide'
import type { Artisan } from '../../content/artisans'

/**
 * Act V — direct contact, and the Guide to a Conscious Commission.
 *
 * The conversion model is the whole product decision: there is no cart, no
 * checkout and no commission. This module hands the visitor to the workshop
 * and gets out of the way. The pre-written opening is shown in full before it
 * is sent, because a message that goes out in someone's name should be one
 * they have actually read.
 *
 * The number is a non-routable placeholder while the profiles are
 * demonstrations, and says so rather than pretending otherwise.
 */
export function DirectContact({ artisan }: { artisan: Artisan }) {
  const { t, pick, lang } = useI18n()
  const [openPoint, setOpenPoint] = useState<string | null>(GUIDE[0].id)

  const message = pick(OPENING_MESSAGE)
  const waHref = `https://wa.me/${artisan.contact.whatsapp}?text=${encodeURIComponent(message)}`
  const telHref = `tel:+${artisan.contact.whatsapp}`

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      {/* --- the contact itself --- */}
      <div>
        <h3 className="font-serif text-3xl leading-tight text-bordeaux sm:text-4xl">{t('contact.title')}</h3>
        <p className="mt-5 max-w-lg text-pretty leading-relaxed text-clay">{t('contact.lede')}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-bordeaux px-6 py-4 text-sm font-medium text-canvas transition-colors hover:bg-clay"
          >
            <MessageCircle size={17} aria-hidden="true" />
            {t('contact.whatsapp')}
          </a>
          <a
            href={telHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-line px-6 py-4 text-sm font-medium text-bordeaux transition-colors hover:border-ash hover:bg-surface/60"
          >
            <Phone size={16} aria-hidden="true" />
            {t('contact.call')}
            <span className="font-mono text-xs text-muted">{artisan.contact.display}</span>
          </a>
        </div>

        <p className="mt-4">
          <Badge tone="warn">{t('contact.demoNote')}</Badge>
        </p>

        <div className="mt-8 rounded-sm border border-line bg-surface/45 p-5">
          <p className="text-[0.8125rem] leading-relaxed text-clay">{t('contact.prefilled')}</p>
          <p
            lang={lang}
            className="mt-3 border-l-2 border-ash pl-4 text-pretty text-sm italic leading-relaxed text-ink/80"
          >
            {message}
          </p>
        </div>

        <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="eyebrow mb-1.5">{t('contact.hours')}</dt>
            <dd className="text-sm text-ink/80">{pick(artisan.contact.hours)}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">{t('contact.language')}</dt>
            <dd className="text-sm text-ink/80">{pick(artisan.contact.languages)}</dd>
          </div>
        </dl>

        <p className="mt-6 font-serif text-lg italic leading-snug text-bordeaux">{t('contact.nocommission')}</p>
      </div>

      {/* --- the guide --- */}
      <div>
        <h3 className="font-serif text-2xl leading-tight text-bordeaux sm:text-[1.75rem]">{t('guide.title')}</h3>
        <p className="mt-4 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-clay">{t('guide.lede')}</p>

        <ul className="mt-7 divide-y divide-line border-y border-line">
          {GUIDE.map((point, i) => {
            const open = openPoint === point.id
            return (
              <li key={point.id}>
                <h4>
                  <button
                    type="button"
                    onClick={() => setOpenPoint(open ? null : point.id)}
                    aria-expanded={open}
                    aria-controls={`guide-${point.id}`}
                    className="flex w-full items-start gap-4 py-4 text-left"
                  >
                    <span aria-hidden="true" className="mt-1 font-mono text-xs tabular-nums text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-serif text-lg leading-snug text-bordeaux">{pick(point.title)}</span>
                    <ChevronDown
                      size={17}
                      aria-hidden="true"
                      className={cn('mt-1 shrink-0 text-clay transition-transform duration-300', open && 'rotate-180')}
                    />
                  </button>
                </h4>
                <div id={`guide-${point.id}`} hidden={!open} className="pb-5 pl-10 pr-2">
                  <p className="text-pretty text-sm leading-relaxed text-ink/78">{pick(point.body)}</p>
                  {point.say && (
                    <p className="mt-3.5 border-l-2 border-caribe/60 bg-caribe/8 py-2.5 pl-4 pr-3 text-pretty text-sm italic leading-relaxed text-ink/80">
                      {pick(point.say)}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
