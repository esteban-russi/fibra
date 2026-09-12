import type { Localized } from '../i18n'

/**
 * The voice on the cover.
 *
 * Flor Imbacuan's, and also the subject of a full profile — see `flor-imbacuan`
 * in `artisans.ts`, where this line appears inside her longer testimony. The
 * quotation stays in its own file because the cover needs exactly one line and
 * nothing else: no community, territory or craft field, because the cover states
 * none of them and a field here would invite one to be filled in from somewhere
 * other than her.
 */
export type Voice = {
  name: string
  /** Spanish is the language it was said in; English is a translation. */
  quote: Localized
}

export const HERO_VOICE: Voice = {
  name: 'Flor Imbacuan',
  quote: {
    es: 'El tejido es darle escritura viva a nuestra identidad como pueblo.',
    en: 'Weaving is giving living script to our identity as a people.',
  },
}
