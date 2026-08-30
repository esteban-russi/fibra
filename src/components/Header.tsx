import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/cn'
import { useI18n } from '../i18n'
import type { Lang } from '../i18n'
import { useLockBodyScroll } from '../lib/hooks'

const ROUTES = [
  { to: '/atlas', key: 'nav.atlas' },
  { to: '/techniques', key: 'nav.techniques' },
  { to: '/artisans', key: 'nav.artisans' },
] as const

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const location = useLocation()

  // The cover and every chronicle open on a dark full-bleed image, so the
  // header has to invert over them or the navigation is unreadable until the
  // visitor scrolls. Anywhere else the page ground is cream and it does not.
  const overDarkHero = location.pathname === '/' || /^\/artisans\/.+/.test(location.pathname)
  const inverted = overDarkHero && !lifted && !open

  useLockBodyScroll(open)
  useEffect(() => setOpen(false), [location.pathname])

  // The header sits transparent over the cover and takes a ground once the
  // visitor has moved past it, so the hero is never boxed in by chrome.
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        lifted || open
          ? 'border-b border-line/70 bg-canvas/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[86rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          className={cn(
            'group flex items-baseline gap-2.5 font-serif text-[1.375rem] font-semibold tracking-[0.2em] transition-colors',
            inverted ? 'text-canvas' : 'text-bordeaux',
          )}
          aria-label={`${t('brand.name')} — ${t('nav.home')}`}
        >
          FIBRA
          <span
            aria-hidden="true"
            className={cn(
              'hidden h-px w-8 transition-all duration-500 group-hover:w-12 sm:block',
              inverted ? 'bg-canvas/60' : 'bg-ash',
            )}
          />
        </Link>

        <nav aria-label={t('nav.primary')} className="hidden items-center gap-1 lg:flex">
          {ROUTES.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              className={({ isActive }) =>
                cn(
                  'relative rounded-sm px-3.5 py-2 text-sm transition-colors',
                  inverted
                    ? isActive
                      ? 'text-canvas'
                      : 'text-canvas/75 hover:text-canvas'
                    : isActive
                      ? 'text-bordeaux'
                      : 'text-clay hover:text-bordeaux',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {t(r.key)}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left transition-transform duration-300',
                      inverted ? 'bg-canvas' : 'bg-bordeaux',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher inverted={inverted} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={cn(
              '-mr-1.5 inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors lg:hidden',
              inverted ? 'text-canvas' : 'text-bordeaux',
            )}
          >
            <span className="sr-only">{open ? t('nav.close') : t('nav.open')}</span>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line/70 bg-canvas lg:hidden"
      >
        <nav aria-label={t('nav.menu')} className="mx-auto max-w-[86rem] px-5 py-3 sm:px-8">
          <ul className="divide-y divide-line/60">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <NavLink
                  to={r.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 font-serif text-xl',
                      isActive ? 'text-bordeaux' : 'text-ink/80',
                    )
                  }
                >
                  {t(r.key)}
                  <span aria-hidden="true" className="text-ash">→</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

/**
 * Language switcher. Rendered as a real radio group rather than a toggle
 * button, so a screen reader announces both options and which is current, and
 * so the inactive language is nameable rather than implied.
 */
export function LanguageSwitcher({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  const { lang, setLang, t } = useI18n()

  const options: { value: Lang; short: string; full: string }[] = [
    { value: 'en', short: 'EN', full: t('lang.en') },
    { value: 'es', short: 'ES', full: t('lang.es') },
  ]

  return (
    <div
      role="radiogroup"
      aria-label={t('lang.label')}
      className={cn(
        'flex items-center rounded-full border p-0.5 transition-colors',
        inverted ? 'border-canvas/35 bg-ink/25 backdrop-blur-sm' : 'border-line bg-canvas/70',
        className,
      )}
    >
      {options.map((o) => {
        const active = lang === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(o.value)}
            className={cn(
              'relative rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.08em] transition-colors',
              active
                ? inverted
                  ? 'bg-canvas text-ink'
                  : 'bg-bordeaux text-canvas'
                : inverted
                  ? 'text-canvas/75 hover:text-canvas'
                  : 'text-clay hover:text-bordeaux',
            )}
          >
            <span aria-hidden="true">{o.short}</span>
            <span className="sr-only">{o.full}</span>
          </button>
        )
      })}
    </div>
  )
}
