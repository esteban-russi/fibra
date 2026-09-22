import type { Localized } from '../i18n'

/**
 * Bitácora — the journal.
 *
 * The rest of the archive is written to stand still: a technique, a territory,
 * a workshop. This surface is for what moves — a festival that happens on a
 * date, a workshop that opens its doors, an encounter that will not repeat in
 * the same form. Entries are dated and are not revised into the permanent
 * record; a piece stays as it was published.
 *
 * CONTENT STATUS — the same governing rule applies as everywhere else on the
 * site: what is published is supplied and validated by the people it is about.
 *   - SUPPLIED by Luz María Rodríguez and the Tejilarte collective: the
 *     quotations, the account of how Tejilarte began, the programme of
 *     stations, the dates, the invitation and the channel to reach them.
 *   - SUPPLIED by the collective: every photograph and the video, published by
 *     courtesy rather than under an open licence — see `src/content/media.ts`.
 *   - CURATORIAL: the ordering, the section headings, and the English
 *     translation. Spanish is the language all of this was said in.
 *
 * Nothing here is placeholder. When a second entry is added it goes in front of
 * this one and `JOURNAL_ENTRIES` stays newest-first.
 */

/** One block of an entry's body. The set is small on purpose: a magazine page
 *  that can be typeset consistently, not a freeform page builder. */
export type JournalBlock =
  | { kind: 'prose'; paragraphs: Localized<string[]> }
  | { kind: 'quote'; text: Localized; attribution?: string }
  /** A labelled run — the three cultural axes, the four festival stations. */
  | { kind: 'entries'; numbered?: boolean; entries: { id: string; label: Localized; text: Localized }[] }

export type JournalSection = {
  id: string
  title: Localized
  lede?: Localized
  blocks: JournalBlock[]
  /**
   * What is held in the rail beside the section while it is read. Every
   * section of a piece should carry one: a column of type alone on a wide
   * screen reads as a page that was never finished.
   */
  aside?: { kind: 'photo'; media: string } | { kind: 'video' }
  /** Set the section apart on its own ground — used for the invitation, which
   *  is addressed to the reader rather than being reported to them. */
  feature?: boolean
}

export type JournalEntry = {
  slug: string
  /** Volume line above the headline, set in the entry's own words. */
  eyebrow: Localized
  headline: Localized
  /** The short summary the cover card carries. */
  standfirst: Localized
  /** Where and when the piece is set — printed under the headline. */
  dateline: Localized
  /** Region id, so the entry takes the colour of the territory it comes from. */
  regionId: string
  /** Key into MEDIA for the opening photograph. */
  hero: string
  sections: JournalSection[]
  /** The strip of photographs closing the piece. */
  gallery: { media: string; caption: Localized }[]
  /** Practical rows — the traveller's guide. */
  facts: { id: string; label: Localized; value: Localized; href?: string; linkText?: string }[]
}

/** The journal's own masthead: what the section is, shown on the cover. */
export const JOURNAL_INTRO: { title: Localized; lede: Localized } = {
  title: {
    en: 'Weaves in motion: stories, encounters and territory',
    es: 'Tramas en movimiento: historias, encuentros y territorio',
  },
  lede: {
    en: 'Weaving is not static; it is transformed by every encounter, by the new workshops opening their doors, and by the hands that keep reimagining fibre in each region.',
    es: 'El tejido no es estático; se transforma con cada encuentro, con los nuevos talleres que abren sus puertas y con las manos que siguen reimaginando la fibra en cada región.',
  },
}

/**
 * The video the entry carries. Held here rather than in MEDIA because MEDIA is
 * a registry of photographs; its poster frame is a still from this same file
 * and is registered there, so the credits account for it.
 */
export const TEJILARTE_VIDEO = {
  src: 'https://storage.googleapis.com/fibra-media/videos/hilo-verde.mp4',
  /** Key into MEDIA for the still used as the poster frame. */
  poster: 'journalHiloVerde',
  width: 720,
  height: 1280,
  label: {
    en: 'Two needles working a dark green wool, filmed at the festival in Sutatausa.',
    es: 'Dos agujas trabajando una lana verde oscura, filmado en el festival de Sutatausa.',
  } satisfies Localized,
}

const SUTATAUSA: JournalEntry = {
  slug: 'sutatausa-tejilarte',
  eyebrow: { en: 'LIVING JOURNAL · VOL. 01', es: 'BITÁCORA VIVA · VOL. 01' },
  headline: {
    en: 'Sutatausa: where the cold of the páramo becomes knot and memory',
    es: 'Sutatausa: donde el frío del páramo se vuelve nudo y memoria',
  },
  standfirst: {
    en: 'Tejilarte gathers the women who hold the knowledge of wool on the church steps of Sutatausa: from shearing to the spinning wheel, two days in which the craft is passed on and sold with nobody standing in between.',
    es: 'Tejilarte reúne a las sabedoras de la lana en el atrio de Sutatausa: de la esquila a la rueca, dos días en que el oficio se transmite y se vende sin nadie en medio.',
  },
  dateline: {
    en: 'Sutatausa, Cundinamarca · 19 and 20 September',
    es: 'Sutatausa, Cundinamarca · 19 y 20 de septiembre',
  },
  regionId: 'andina',
  hero: 'journalHilanderas',

  sections: [
    {
      id: 'rebeldia',
      title: { en: 'The rebellion of the needle', es: 'La rebeldía de la aguja' },
      aside: { kind: 'photo', media: 'journalTejedora' },
      blocks: [
        {
          kind: 'quote',
          attribution: 'Luz María Rodríguez',
          text: {
            en: '«The moment they started asking for sewing at school, I rebelled. I was the odd one out and I said: “I don’t want seams or embroidery on granité; I want weaving.” And they let me. So I made outfits for the dolls, for the blenders, and for the stands of those enormous televisions that arrived in the veredas when the power came in.»',
            es: '«Apenas empezaron a pedir costura en la escuela, yo me rebelé. Fui la diferente y dije: “No quiero costuras ni bordados en granité; quiero tejido”. Y me dejaron. Entonces le hacía el vestido a los muñecos, a las licuadoras y a las mesas de esos televisores inmensos que llegaban a las veredas cuando entró la energía.»',
          },
        },
        {
          kind: 'prose',
          paragraphs: {
            en: [
              'Tejilarte was born of a need that was felt and shared: «There were so many women in the houses who knew how to spin and weave, but they had nowhere to sell what they kept with such care».',
              'With the backing of her co-worker Susana and alliances with the universities, the project stopped being a dream held in one vereda and became a provincial celebration of the craft.',
            ],
            es: [
              'Tejilarte nació de una necesidad sentida y compartida: «Había tantas sabedoras en las casas que sabían hilar y tejer, pero no tenían dónde comercializar lo que guardaban con tanto esmero».',
              'Con el respaldo de su coequipera Susana y alianzas con la academia, el proyecto dejó de ser un sueño veredal para convertirse en una fiesta provincial del oficio.',
            ],
          },
        },
      ],
    },

    {
      id: 'eje-cultural',
      title: { en: 'Weaving as the axis of a culture', es: 'El tejido como eje cultural' },
      aside: { kind: 'video' },
      lede: {
        en: 'Tejilarte celebrates the warmth of wool, but it stands on everything else that sustains life in the páramo:',
        es: 'Tejilarte celebra el abrigo de la lana, pero se sostiene en todo lo que nutre la vida en el páramo:',
      },
      blocks: [
        {
          kind: 'entries',
          entries: [
            {
              id: 'sabores',
              label: { en: 'The flavours of the province', es: 'Los sabores de la provincia' },
              text: {
                en: 'Woodsmoke, piquete campesino, native potatoes from the region, maize amasijos and the sharing around the communal hearth. The food is not an annex: it is the table laid for visitors and weaving families alike.',
                es: 'Humo de leña, piquete campesino, papas nativas de la región, amasijos de maíz y el compartir alrededor del fogón comunal. La comida no es un anexo: es la mesa servida donde se sientan los visitantes y las familias tejedoras.',
              },
            },
            {
              id: 'musica',
              label: { en: 'Cultural acts and Andean music', es: 'Actos culturales y música andina' },
              text: {
                en: 'Coplas, rajaleñas, campesino storytelling and traditional dance that set the festive beat of the square.',
                es: 'Coplas, rajaleñas, cuentos campesinos y presentaciones de danza tradicional que marcan el compás festivo de la plaza.',
              },
            },
            {
              id: 'oficios',
              label: { en: 'Living crafts, no middlemen', es: 'Oficios vivos sin intermediarios' },
              text: {
                en: 'Direct sale of textile pieces, baskets and campesino craft, so that the economic value and the recognition rest entirely with the hands that worked the raw material.',
                es: 'Venta directa de piezas textiles, canastos y artesanías campesinas, asegurando que el valor económico y el reconocimiento reposen completos en las manos que trabajaron la materia prima.',
              },
            },
          ],
        },
      ],
    },

    {
      id: 'ruta',
      title: { en: 'The route of 19 and 20 September', es: 'La ruta del 19 y 20 de septiembre' },
      aside: { kind: 'photo', media: 'journalPasarelaBordada' },
      lede: {
        en: 'Across the two days of the festival, Sutatausa arranges its territory into stations, open to anyone who comes to learn and to be moved:',
        es: 'Durante los dos días del festival, Sutatausa organiza su territorio en paradas abiertas para aprender y conmoverse:',
      },
      blocks: [
        {
          kind: 'entries',
          numbered: true,
          entries: [
            {
              id: 'esquila',
              label: { en: 'Station of the sheep and the shearing', es: 'Estación de la oveja y la esquila' },
              text: {
                en: 'The start of the living chain, with respectful demonstrations of cutting the fleece and of the washing that protects the natural lanolin — the grease that makes a ruana proof against the Andean night damp.',
                es: 'El inicio de la cadena viva con demostraciones respetuosas del corte del vellón y el lavado que cuida la lanolina natural, grasa protectora que hace a la ruana impermeable al sereno andino.',
              },
            },
            {
              id: 'rueca',
              label: { en: 'Station of the spinner and the wheel', es: 'Estación de hilandera y rueca' },
              text: {
                en: 'A circle of women spinning on the campesino spindle and the spinning wheel; where you see the invisible arithmetic of gauging the thickness of a thread with the pads of the fingers.',
                es: 'Es un círculo de mujeres hilando en huso campesino y rueda de hilar; de ver la matemática invisible de calibrar el calibre del hilo con la yema de los dedos.',
              },
            },
            {
              id: 'telar',
              label: { en: 'Station of the loom and the dyes', es: 'Estación del telar y los tintes' },
              text: {
                en: 'Hot pots revealing the botanical magic of alder and walnut leaves and local husks, alongside horizontal pedal looms and work on two needles and crochet.',
                es: 'Ollas calientes revelando la magia botánica de hojas de aliso, nogal y cáscaras locales, junto a telares horizontales de pedal y tejido a dos agujas y crochet.',
              },
            },
            {
              id: 'intergeneracional',
              label: { en: 'The great intergenerational encounter', es: 'El gran encuentro intergeneracional' },
              text: {
                en: 'A series of contests in which the grandparent who holds the knowledge competes weaving in pairs with a grandchild or a niece or nephew. It is a deliberate act of resistance against the mining and the industries that displaced the craft from young hands in the veredas, sowing pride in the spinning wheel again in the new generations.',
                es: 'Serie de concursos donde el abuelo sabedor compite y teje en pareja con su nieto o su sobrino, es un acto deliberado de resistencia frente a la minería y las industrias que desplazaron el oficio juvenil en las veredas, sembrando de nuevo el orgullo por la rueca en las nuevas generaciones.',
              },
            },
          ],
        },
      ],
    },

    {
      id: 'invitacion',
      title: { en: 'An invitation, to you', es: 'Una invitación para ti' },
      feature: true,
      blocks: [
        {
          kind: 'prose',
          paragraphs: {
            en: [
              'Luz María and the Tejilarte team extend an urgent invitation to students, universities, design collectives, researchers and attentive travellers from Bogotá and from the whole country:',
            ],
            es: [
              'Luz María y el equipo de Tejilarte extienden una invitación urgente a estudiantes, universidades, colectivos de diseño, investigadores y viajeros sensibles de Bogotá y todo el país:',
            ],
          },
        },
        {
          kind: 'quote',
          attribution: 'Luz María Rodríguez',
          text: {
            en: '«We need you to come, to be tempted by it, to help us spread the word and record what happens here. There is far too much living memory kept in the veredas that is still not on the internet or in the books, and that you only understand when you sit down and listen to the weaver.»',
            es: '«Necesitamos que vengan, que se antojen, que nos ayuden a difundir y a registrar lo que pasa aquí. Hay demasiada memoria viva guardada en las veredas que todavía no está en internet ni en los libros, y que solo se entiende cuando uno se sienta a escuchar a la tejedora.»',
          },
        },
      ],
    },
  ],

  gallery: [
    {
      media: 'journalPasarelaBlanca',
      caption: {
        en: 'A ruana in undyed wool, its motifs worked in dark fleece, on the festival runway.',
        es: 'Una ruana en lana sin teñir, con los motivos trabajados en vellón oscuro, en la pasarela del festival.',
      },
    },
    {
      media: 'journalPasarelaCamel',
      caption: {
        en: 'A poncho in natural brown wool, worn with a cord strung with felted wool beads.',
        es: 'Un poncho en lana café natural, con un cordel de motas de lana afieltrada.',
      },
    },
  ],

  facts: [
    {
      id: 'cuando',
      label: { en: 'When', es: 'Cuándo' },
      value: { en: 'The weekend of 19 and 20 September.', es: 'Fin de semana del 19 y 20 de septiembre.' },
    },
    {
      id: 'donde',
      label: { en: 'Where', es: 'Dónde' },
      value: {
        en: 'Sutatausa, Cundinamarca — two hours from Bogotá, in the Ubaté valley.',
        es: 'Sutatausa, Cundinamarca (a dos horas de Bogotá, en el valle de Ubaté).',
      },
    },
    {
      id: 'canal',
      label: { en: 'Official channel', es: 'Canal oficial de novedades' },
      value: {
        en: 'Follow them closely and support the community’s own outreach.',
        es: 'Síguelos de cerca y apoya la difusión comunitaria.',
      },
      href: 'https://www.instagram.com/tejilartesutatausa',
      linkText: '@tejilartesutatausa',
    },
  ],
}

export const JOURNAL_ENTRIES: JournalEntry[] = [SUTATAUSA]

export const JOURNAL_BY_SLUG = new Map(JOURNAL_ENTRIES.map((e) => [e.slug, e]))

/** The piece the cover offers. Newest first, so this is always the head. */
export const LATEST_ENTRY = JOURNAL_ENTRIES[0]
