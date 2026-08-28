import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { UI } from './ui'
import type { UIKey } from './ui'

export type Lang = 'en' | 'es'

/** Every piece of editorial content carries both languages side by side. */
export type Localized<T = string> = { en: T; es: T }

const STORAGE_KEY = 'fibra.lang'

/** English is the primary language; Spanish is offered when the browser asks for it. */
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'es') return stored
  return navigator.languages?.some((l) => l.toLowerCase().startsWith('es')) ? 'es' : 'en'
}

type I18nValue = {
  lang: Lang
  setLang: (l: Lang) => void
  /** UI chrome lookup, with optional `{token}` interpolation. */
  t: (key: UIKey, vars?: Record<string, string | number>) => string
  /** Picks the active language out of a content object. */
  pick: <T>(value: Localized<T>) => T
}

const I18nContext = createContext<I18nValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  // Keep the document in sync so screen readers switch voice and pronunciation.
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* private mode — the choice simply does not persist */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const t = useCallback(
    (key: UIKey, vars?: Record<string, string | number>) => {
      let out: string = UI[lang][key] ?? UI.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v))
      }
      return out
    },
    [lang],
  )

  const pick = useCallback(<T,>(value: Localized<T>): T => value[lang], [lang])

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
