import type { Localized } from '../i18n'

/**
 * The voice on the cover.
 *
 * Real supplied material, unlike the stories in `artisans.ts`, which are
 * flagged demonstrations. It is kept in its own file so the cover never has to
 * borrow a demonstration quotation again, and so nothing here inherits the
 * demonstration badge.
 *
 * Only what has actually been supplied is recorded. There is no community,
 * territory or craft field: those are hers to state, and inventing them is the
 * one thing the ethics rule forbids. Add them here once she has given them,
 * and the cover will show them.
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
