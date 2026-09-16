import type { Localized } from '../i18n'

/**
 * The opening a visitor writes with.
 *
 * Act V hands the conversation to the workshop and stops. This is the one
 * thing the platform still supplies: a first message that asks about the
 * maker's timescale before announcing the visitor's own. It travels in the
 * wa.me link and is fully editable in WhatsApp before it is sent — the site no
 * longer previews it on the page, because the place to read a message you are
 * about to send is the client you are sending it from.
 *
 * It is what survives of the Guía de Encargo Consciente, whose accordion was
 * removed from the profile: the guidance that mattered at the moment of
 * writing is now in the message itself.
 */
export const OPENING_MESSAGE: Localized = {
  en: 'Good morning. I found your work through FIBRA and I would like to ask about a commission. I am not in a hurry and I would rather hear your timescale before I say anything about mine. Could you tell me what you are working on at the moment and whether you are taking new pieces?',
  es: 'Buenos días. Encontré su trabajo a través de FIBRA y quisiera preguntar por un encargo. No tengo afán y prefiero conocer sus tiempos antes de decir nada sobre los míos. ¿Me podría contar en qué está trabajando ahora y si está tomando piezas nuevas?',
}
