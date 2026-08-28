import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { SectionHeading } from '../components/ui/primitives'

export function NotFound() {
  const { t } = useI18n()

  const ways = [
    { to: '/', label: t('common.notFound.home') },
    { to: '/atlas', label: t('nav.atlas') },
    { to: '/gestures', label: t('nav.gestures') },
    { to: '/artisans', label: t('nav.artisans') },
  ]

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-32 pt-[calc(var(--header-h)+6rem)] sm:px-8">
      <div className="max-w-2xl">
        <svg viewBox="0 0 200 60" className="mb-10 h-14 w-56 text-ash" aria-hidden="true" focusable="false">
          <path d="M0 30 H 96" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M96 30 q 14 -9 26 -3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M96 30 q 16 4 30 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M96 30 q 20 -2 38 -8" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35" />
        </svg>

        <SectionHeading title={t('common.notFound.title')} lede={t('common.notFound.body')} />

        <ul className="mt-10 flex flex-wrap gap-3">
          {ways.map((w) => (
            <li key={w.to}>
              <Link
                to={w.to}
                className="inline-flex items-center rounded-sm border border-line px-5 py-3 text-sm text-bordeaux transition-colors hover:border-ash hover:bg-surface/60"
              >
                {w.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
