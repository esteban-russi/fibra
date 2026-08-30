import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { ThreadRule } from './ui/primitives'

export function Footer() {
  const { t } = useI18n()

  const explore = [
    { to: '/atlas', label: t('nav.atlas') },
    { to: '/techniques', label: t('nav.techniques') },
    { to: '/artisans', label: t('nav.artisans') },
  ]
  const about = [
    { to: '/commission', label: t('guide.title') },
    { to: '/credits', label: t('credits.title') },
  ]

  return (
    <footer className="mt-24 border-t border-line bg-surface/55">
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-[0.2em] text-bordeaux">FIBRA</p>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-clay">{t('brand.tagline')}</p>

            <h2 className="eyebrow mt-9">{t('footer.ethics')}</h2>
            <ul className="mt-3 max-w-md space-y-2.5 text-sm leading-relaxed text-ink/75">
              {[t('footer.ethics.1'), t('footer.ethics.2'), t('footer.ethics.3')].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-ash" />
                  <span className="text-pretty">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={t('footer.explore')} items={explore} />
          <FooterColumn title={t('footer.about')} items={about} />
        </div>

        <ThreadRule className="mt-14" />

        <p className="mt-6 text-xs leading-relaxed text-clay">{t('footer.rights')}</p>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="text-sm text-ink/75 underline-offset-4 transition-colors hover:text-bordeaux hover:underline"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
