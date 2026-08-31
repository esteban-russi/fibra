import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { cn } from '../lib/cn'
import { scrollToY } from '../lib/scroll'
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
  const reduced = useReducedMotion()
  const regionsRef = useRef<HTMLDivElement>(null)
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

  // The chevron is the only scroll affordance on a first screen the map fills.
  const toRegions = useCallback(() => {
    const el = regionsRef.current
    if (!el) return
    // The landing offset stays declared in the element's scroll-mt class.
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const target = el.getBoundingClientRect().top + window.scrollY - offset
    if (reduced) window.scrollTo(0, target)
    else scrollToY(target)
  }, [reduced])

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
            className="mx-auto w-full max-w-[22rem] object-contain sm:max-w-[28rem] lg:max-h-[calc(100svh-var(--header-h)-9rem)] lg:max-w-none"
          />
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={toRegions}
            aria-label={t('atlas.scroll')}
            className="p-2 text-ash transition-colors hover:text-bordeaux"
          >
            <ChevronDown
              size={30}
              strokeWidth={1.25}
              aria-hidden="true"
              className={cn(!reduced && 'animate-bounce')}
            />
          </button>
        </div>

        {/* The bands themselves, centred beneath the introduction. */}
        <div
          ref={regionsRef}
          className="mx-auto mt-10 w-full max-w-4xl scroll-mt-[calc(var(--header-h)+1.5rem)] sm:mt-12"
        >
          <AtlasMap selected={selected} onSelect={open} />
        </div>
      </div>

      <RegionDrawer region={selected} onClose={close} />
    </>
  )
}
