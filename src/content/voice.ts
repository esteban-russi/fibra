import type { Localized } from '../i18n'

/**
 * The voice on the cover.
 *
 * Adita's, and now also the subject of a full profile — see `adita-chapinero`
 * in `artisans.ts`. The quotation stays in its own file because the cover needs
 * exactly one line and nothing else: no community, territory or craft field,
 * because the cover states none of them and a field here would invite one to be
 * filled in from somewhere other than her.
 */
export type Voice = {
  name: string
  /** Spanish is the language it was said in; English is a translation. */
  quote: Localized
}

export const HERO_VOICE: Voice = {
  name: 'Adita',
  quote: {
    es: 'Tejer no es solo entrelazar fibras; es invocar una época, un estilo o una emoción',
    en: 'Weaving is not only interlacing fibres; it is summoning a period, a style or an emotion.',
  },
}
