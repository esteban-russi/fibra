import { useI18n } from '../i18n'
import { SectionHeading, ThreadRule } from '../components/ui/primitives'
import { WeavePlate } from '../components/graphics/WeavePlate'
import { CREDITS } from '../content/media'
import { REGIONS } from '../content/regions'

/**
 * Provenance.
 *
 * A platform whose whole argument is about authorship has to be able to account
 * for its own material, so this route is generated directly from the media
 * registry rather than maintained by hand — a photograph cannot appear on the
 * site without appearing here with its author and licence. It also states
 * plainly which parts of the editorial content are documented and which are
 * demonstration structure awaiting artisan-supplied material.
 */
export function Credits() {
  const { t, pick } = useI18n()

  const contentStatus = [
    {
      what: { en: 'Regions, materials, extraction, techniques', es: 'Regiones, materiales, extracción, técnicas' },
      status: {
        en: 'Documented traditions, written from the published record. Not community-validated.',
        es: 'Tradiciones documentadas, escritas a partir del registro publicado. Sin validación comunitaria.',
      },
    },
    {
      what: { en: 'The five techniques', es: 'Las cinco técnicas' },
      status: {
        en: 'Documented technique, described structurally.',
        es: 'Técnica documentada, descrita de manera estructural.',
      },
    },
    {
      what: { en: 'Artisan names, quotations, works and contact', es: 'Nombres, citas, obras y contacto de los artesanos' },
      status: {
        en: 'Invented. Demonstration content, marked as such on every profile. No real person is depicted or represented.',
        es: 'Inventados. Contenido de demostración, señalado como tal en cada perfil. No se representa a ninguna persona real.',
      },
    },
    {
      what: { en: 'Meaning of specific traditional figures', es: 'Significado de figuras tradicionales concretas' },
      status: {
        en: 'Not published. Named as community-held knowledge wherever a figure appears.',
        es: 'No publicado. Señalado como saber comunitario dondequiera que aparece una figura.',
      },
    },
  ]

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <SectionHeading eyebrow={t('credits.eyebrow')} title={t('credits.title')} lede={t('credits.lede')} />

      {/* --- photography --- */}
      <section className="mt-16" aria-labelledby="credits-images">
        <h2 id="credits-images" className="font-serif text-2xl text-bordeaux sm:text-3xl">
          {t('credits.images')}
        </h2>
        <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-clay">{t('credits.images.lede')}</p>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CREDITS.map((c) => (
            <li key={c.id} className="flex flex-col overflow-hidden rounded-sm border border-line">
              <img
                src={c.src}
                alt={pick(c.alt)}
                width={c.width}
                height={c.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-pretty text-sm leading-relaxed text-ink/80">{pick(c.caption)}</p>
                <dl className="mt-4 space-y-1.5 border-t border-line/70 pt-4 text-[0.8125rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{t('credits.author')}</dt>
                    <dd className="text-right text-ink/80">{c.author}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{t('credits.licence')}</dt>
                    <dd className="text-right">
                      <a
                        href={c.licenceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-bordeaux underline decoration-line underline-offset-2"
                      >
                        {c.licence}
                      </a>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{t('credits.source')}</dt>
                    <dd className="min-w-0 text-right">
                      <a
                        href={c.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="break-words text-bordeaux underline decoration-line underline-offset-2"
                      >
                        Wikimedia Commons
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ThreadRule className="my-16" />

      {/* --- drawn graphics --- */}
      <section aria-labelledby="credits-graphics">
        <h2 id="credits-graphics" className="font-serif text-2xl text-bordeaux sm:text-3xl">
          {t('credits.graphics')}
        </h2>
        <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-clay">{t('credits.graphics.lede')}</p>

        <ul className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {REGIONS.map((r) => (
            <li key={r.id} className="overflow-hidden rounded-sm border border-line">
              <div className="aspect-square">
                <WeavePlate kind={r.weave} palette={[r.colour, '#FFFDF5', '#2E1B1E']} seed={r.id} />
              </div>
              <p className="px-3 py-2.5 text-[0.75rem] leading-snug text-clay">
                <span className="block text-ink/80">{pick(r.name)}</span>
                <span className="font-mono text-[0.6875rem] text-muted">{r.weave}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ThreadRule className="my-16" />

      {/* --- editorial content status --- */}
      <section aria-labelledby="credits-content">
        <h2 id="credits-content" className="font-serif text-2xl text-bordeaux sm:text-3xl">
          {t('credits.content')}
        </h2>

        <dl className="mt-8 max-w-4xl divide-y divide-line border-y border-line">
          {contentStatus.map((row) => (
            <div key={pick(row.what)} className="grid gap-2 py-5 sm:grid-cols-[18rem_1fr] sm:gap-8">
              <dt className="font-serif text-lg leading-snug text-bordeaux">{pick(row.what)}</dt>
              <dd className="text-pretty text-sm leading-relaxed text-ink/78">{pick(row.status)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-3xl border-l-2 border-ash pl-5 text-pretty font-serif text-lg italic leading-relaxed text-clay">
          {t('footer.ethics.1')}
        </p>
      </section>
    </div>
  )
}
