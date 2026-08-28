import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { AtlasMap } from '../components/atlas/AtlasMap'
import { RegionDrawer } from '../components/atlas/RegionDrawer'
import { SectionHeading, ThreadRule } from '../components/ui/primitives'
import { REGIONS, REGION_BY_SLUG } from '../content/regions'
import type { Region } from '../content/regions'

/**
 * The Atlas route. The open region lives in the URL (/atlas/:slug) so a panel
 * can be linked to and the browser Back button closes it, which is what people
 * actually press to dismiss a full-width overlay on a phone.
 */
export function Atlas() {
  const { t, pick } = useI18n()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Region | null>(() => REGION_BY_SLUG.get(slug ?? '') ?? null)

  useEffect(() => {
    setSelected(REGION_BY_SLUG.get(slug ?? '') ?? null)
  }, [slug])

  const open = useCallback(
    (region: Region) => {
      setSelected(region)
      navigate(`/atlas/${region.slug}`, { preventScrollReset: true })
    },
    [navigate],
  )

  const close = useCallback(() => {
    setSelected(null)
    navigate('/atlas', { preventScrollReset: true })
  }, [navigate])

  return (
    <>
      <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
        <SectionHeading eyebrow={t('atlas.eyebrow')} title={t('atlas.title')} lede={t('atlas.lede')} className="mb-12" />

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <AtlasMap selected={selected} onSelect={open} />

          <aside aria-labelledby="atlas-legend">
            <h2 id="atlas-legend" className="eyebrow mb-4">
              {t('atlas.legend')}
            </h2>
            <ul className="space-y-3">
              {REGIONS.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => open(r)}
                    className="group flex w-full items-center gap-3 rounded-sm px-1 py-1.5 text-left transition-colors hover:bg-surface/60"
                  >
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 rounded-sm ring-1 ring-inset ring-black/10"
                      style={{ background: r.colour }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-ink/85 group-hover:text-bordeaux">{pick(r.name)}</span>
                      <span className="block font-mono text-[0.6875rem] text-muted">{r.colour}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <ThreadRule className="my-7" />

            <p className="text-pretty text-[0.8125rem] leading-relaxed text-clay">{t('atlas.note')}</p>
          </aside>
        </div>
      </div>

      <RegionDrawer region={selected} onClose={close} />
    </>
  )
}
