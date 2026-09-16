import { useI18n } from '../../i18n'
import { Badge } from '../ui/primitives'
import { ContactIcon } from '../graphics/ContactIcon'
import { OPENING_MESSAGE } from '../../content/message'
import type { Artisan } from '../../content/artisans'

/**
 * Act V — direct contact.
 *
 * The conversion model is the whole product decision: there is no cart, no
 * checkout and no commission. This module hands the visitor to the workshop
 * and gets out of the way, so it carries one thing — how to reach her — and
 * gives it the whole width it needs. The Guía de Encargo Consciente and the
 * preview of the pre-written message have both been removed; the message still
 * travels in the wa.me link, where it can be read and edited before it is sent.
 *
 * The number is the loudest thing on the panel. Everything else on the page
 * has been leading here, and a reader who arrives with a phone in hand should
 * find the line before they find any instructions about it.
 *
 * Publishing a workshop's telephone number is a separate consent from
 * publishing her story. While `contact.published` is false the buttons are
 * rendered inert rather than pointed at a placeholder: a dead link that looks
 * live is worse than an honest absence, and the visitor is told which consent
 * is missing. The same rule governs `contact.links` — a handle appears only
 * where the artisan gave one, never one found by searching for her name.
 */
export function DirectContact({ artisan }: { artisan: Artisan }) {
  const { t, pick } = useI18n()

  const message = pick(OPENING_MESSAGE)
  const live = artisan.contact.published && artisan.contact.whatsapp !== ''
  const waHref = `https://wa.me/${artisan.contact.whatsapp}?text=${encodeURIComponent(message)}`
  const telHref = `tel:+${artisan.contact.whatsapp}`
  const links = artisan.contact.links
  const elsewhere = Boolean(links?.instagram || links?.website)

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-20">
      {/* --- what the conversation is, said once --- */}
      <div className="lg:pt-3">
        <h3 className="text-balance font-serif text-3xl leading-tight text-bordeaux sm:text-4xl lg:text-[2.75rem]">
          {t('contact.title')}
        </h3>
        <p className="mt-6 max-w-lg text-pretty text-[1.0625rem] leading-relaxed text-clay sm:text-lg">
          {t('contact.lede')}
        </p>
      </div>

      {/* --- the line itself --- */}
      <div className="rounded-sm border border-line bg-surface/50 p-6 sm:p-8">
        <p className="eyebrow">{t('contact.line')}</p>
        <p
          className={`mt-3 font-mono text-[1.75rem] leading-none tabular-nums sm:text-[2rem] ${
            live ? 'text-bordeaux' : 'text-clay'
          }`}
        >
          {pick(artisan.contact.display)}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {live ? (
            <>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-3 rounded-sm bg-bordeaux px-6 py-4 text-sm font-medium text-canvas transition-colors hover:bg-clay"
              >
                <ContactIcon kind="whatsapp" size={24} />
                {t('contact.whatsapp')}
              </a>
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-line bg-canvas px-6 py-4 text-sm font-medium text-bordeaux transition-colors hover:border-ash hover:bg-surface"
              >
                <ContactIcon kind="phone" size={24} />
                {t('contact.call')}
              </a>
            </>
          ) : (
            <>
              <span className="inline-flex items-center justify-center gap-3 rounded-sm border border-dashed border-ash bg-surface/60 px-6 py-4 text-sm font-medium text-clay">
                <ContactIcon kind="whatsapp" size={24} />
                {t('contact.whatsapp')}
              </span>
              <span className="inline-flex items-center justify-center gap-3 rounded-sm border border-dashed border-line px-6 py-4 text-sm font-medium text-clay">
                <ContactIcon kind="phone" size={24} />
                {t('contact.call')}
              </span>
            </>
          )}
        </div>

        {!live && (
          <div className="mt-6">
            <Badge tone="warn">{t('contact.withheld')}</Badge>
            <p className="mt-3 text-pretty text-[0.8125rem] leading-relaxed text-clay">{t('contact.withheld.why')}</p>
          </div>
        )}

        {/* --- the handles she asked to be listed, and only those --- */}
        {elsewhere && (
          <div className="mt-9 border-t border-line pt-7">
            <p className="eyebrow mb-4">{t('contact.channels')}</p>
            <ul className="flex flex-wrap gap-3">
              {links?.instagram && (
                <li>
                  <ChannelLink
                    href={links.instagram}
                    kind="instagram"
                    label={t('contact.instagram')}
                    value={handle(links.instagram)}
                  />
                </li>
              )}
              {links?.website && (
                <li>
                  <ChannelLink
                    href={links.website}
                    kind="website"
                    label={t('contact.website')}
                    value={host(links.website)}
                  />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

/** One published channel: the mark, what it is, and the name it is known by. */
function ChannelLink({
  href,
  kind,
  label,
  value,
}: {
  href: string
  kind: 'instagram' | 'website'
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-center gap-3 rounded-sm border border-line bg-canvas px-4 py-3 transition-colors hover:border-ash hover:bg-surface"
    >
      <ContactIcon kind={kind} size={34} ringed className="text-bordeaux" />
      <span className="min-w-0">
        <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="block truncate text-sm text-bordeaux group-hover:underline">{value}</span>
      </span>
    </a>
  )
}

/** The @name an Instagram URL points at, so the link reads as the handle the
 *  artisan would give you rather than as a tracking-shaped URL. */
function handle(url: string): string {
  const name = url.replace(/\/+$/, '').split('/').pop()
  return name ? `@${name}` : url
}

/** A site shown by its domain: the path is where it goes, not what it is. */
function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
