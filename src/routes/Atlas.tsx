import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { AtlasMap } from '../components/atlas/AtlasMap'
import { RegionDrawer } from '../components/atlas/RegionDrawer'
import { SectionHeading, ThreadRule } from '../components/ui/primitives'
import { REGION_BY_SLUG } from '../content/regions'
import type { Region } from '../content/regions'

/**
 * The Atlas route. The open region lives in the URL (/atlas/:slug) so a panel
 * can be linked to and the browser Back button closes it, which is what people
 * actually press to dismiss a full-width overlay on a phone.
 */
export function Atlas() {
  const { t } = useI18n()
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
      <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+1.25rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+2rem)]">
        {/* The words on the left, the country woven on the right. */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={t('atlas.eyebrow')} title={t('atlas.title')} lede={t('atlas.lede')} />

            <ThreadRule className="my-8" />

            <p className="max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-clay">{t('atlas.note')}</p>
          </div>

          <img
            src="/media/map.png"
            alt={t('atlas.map.alt')}
            width={1080}
            height={1440}
            decoding="async"
            // Capped against the viewport so the whole country is on the first screen.
            className="mx-auto w-full max-w-[22rem] object-contain sm:max-w-[28rem] lg:max-h-[calc(100svh-var(--header-h)-6rem)] lg:max-w-none"
          />
        </div>

        {/* The bands themselves, centred beneath the introduction. */}
        <div className="mx-auto mt-20 w-full max-w-4xl sm:mt-24">
          <AtlasMap selected={selected} onSelect={open} />
        </div>
      </div>

      <RegionDrawer region={selected} onClose={close} />
    </>
  )
}
