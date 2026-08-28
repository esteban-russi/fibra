import type { Localized } from '../i18n'

/**
 * Photographic assets, each one openly licensed and attributed.
 *
 * Rules this registry enforces by construction:
 *  - Every file carries its photographer, licence and Commons source page, so
 *    the credits route can be generated rather than hand-maintained.
 *  - `alt` is authored in both languages. It describes what is actually in the
 *    frame, never what we would like it to represent.
 *  - Files are used unmodified apart from resampling for delivery. Crops are
 *    done in CSS (object-position) so no derivative work is created — several
 *    of these are share-alike licensed.
 *  - No photograph of an identifiable person is ever attached to one of the
 *    demonstration artisan profiles. Documentary images of real people appear
 *    only where the caption says truthfully who and what they are.
 */
export type Credit = {
  id: string
  src: string
  width: number
  height: number
  /** Original file name on Wikimedia Commons. */
  file: string
  author: string
  licence: string
  licenceUrl: string
  sourceUrl: string
  alt: Localized
  caption: Localized
}

function commons(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`
}

const CC_BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0/deed.en'
const CC_BY_SA_2 = 'https://creativecommons.org/licenses/by-sa/2.0/deed.en'
const CC_BY_3 = 'https://creativecommons.org/licenses/by/3.0/deed.en'

export const MEDIA: Record<string, Credit> = {
  canaflechaRaspado: {
    id: 'canaflechaRaspado',
    src: '/media/canaflecha-raspado.webp',
    width: 1280,
    height: 853,
    file: 'Raspa caña flecha.jpg',
    author: 'María Angélica G',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Raspa caña flecha.jpg'),
    alt: {
      en: 'Seated hands drawing a long arrow-cane leaf across a blade, splitting it into fine pale strands. Cut leaves lie across the floor.',
      es: 'Unas manos sentadas pasan una hoja larga de caña flecha por una cuchilla, partiéndola en hebras finas y pálidas. Hojas cortadas cubren el suelo.',
    },
    caption: {
      en: 'Scraping arrow cane (Gynerium sagittatum) into strands — the first operation before any Zenú braid can begin.',
      es: 'Raspado de la caña flecha (Gynerium sagittatum) para obtener las hebras — la primera operación antes de que pueda empezar cualquier trenzado zenú.',
    },
  },

  canaflechaPlanta: {
    id: 'canaflechaPlanta',
    src: '/media/canaflecha-planta.webp',
    width: 1280,
    height: 960,
    file: 'Gynerium sagittatum 09.jpg',
    author: 'Layéniba',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Gynerium sagittatum 09.jpg'),
    alt: {
      en: 'A stand of arrow cane growing at the edge of cleared ground, its long blade-shaped leaves fanning out from tall stems.',
      es: 'Una mata de caña flecha creciendo al borde de un terreno despejado, con sus hojas largas en forma de lámina abriéndose desde tallos altos.',
    },
    caption: {
      en: 'Arrow cane growing. The pale inner strand used for braiding is drawn from the rib of the leaf.',
      es: 'Caña flecha en pie. La hebra interior clara que se usa para trenzar se extrae de la nervadura de la hoja.',
    },
  },

  werregueVasijas: {
    id: 'werregueVasijas',
    src: '/media/werregue-vasijas.webp',
    width: 1280,
    height: 960,
    file: 'Artesanías indígenas en werregue, Jardín Botánico La Manigua By Pilar Quintana.JPG',
    author: 'Jardín Botánico La Manigua',
    licence: 'CC BY 3.0',
    licenceUrl: CC_BY_3,
    sourceUrl: commons('Artesanías indígenas en werregue, Jardín Botánico La Manigua By Pilar Quintana.JPG'),
    alt: {
      en: 'Three rounded werregue vessels in close view. Their coiled palm-fibre walls carry banded geometric figures in deep red, black, olive and cream.',
      es: 'Tres vasijas redondeadas de werregue en primer plano. Sus paredes de fibra de palma anillada llevan figuras geométricas en franjas de rojo profundo, negro, oliva y crema.',
    },
    caption: {
      en: 'Wounaan werregue vessels. The wall is built as a continuous coil and the figures are counted into it stitch by stitch — the pattern cannot be corrected afterwards.',
      es: 'Vasijas wounaan en werregue. La pared se construye como un anillado continuo y las figuras se cuentan puntada a puntada — el patrón no se puede corregir después.',
    },
  },

  wayuuTejiendo: {
    id: 'wayuuTejiendo',
    src: '/media/wayuu-tejiendo.webp',
    width: 935,
    height: 1400,
    file: 'Artesanas Wayú.jpg',
    author: 'ROCHY HERNÁNDEZ',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Artesanas Wayú.jpg'),
    alt: {
      en: 'A Wayuu artisan sits working the rim of a mochila, both hands at the needle. The bag already carries a large eight-pointed figure in turquoise, pink, brown and cream.',
      es: 'Una artesana wayuu trabaja el borde de una mochila con ambas manos en la aguja. La bolsa ya lleva una gran figura de ocho puntas en turquesa, rosa, marrón y crema.',
    },
    caption: {
      en: 'Working the body of a mochila. The figure is held in the maker’s memory, not copied from a chart.',
      es: 'Tejiendo el cuerpo de una mochila. La figura se sostiene en la memoria de quien teje, no se copia de un patrón.',
    },
  },

  mochilasKanas: {
    id: 'mochilasKanas',
    src: '/media/mochilas-kanas.webp',
    width: 787,
    height: 1400,
    file: 'Mochilas Wayuu, Museo del Oro Tayrona. Santa Marta.jpg',
    author: 'Alex M C',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Mochilas Wayuu, Museo del Oro Tayrona. Santa Marta.jpg'),
    alt: {
      en: 'Dozens of woven mochilas ranged in rows, each one banded with a different geometric figure in saturated colour.',
      es: 'Decenas de mochilas tejidas dispuestas en filas, cada una con una figura geométrica distinta en color saturado.',
    },
    caption: {
      en: 'No two figures repeat exactly. Each kanas is a named design, and the names are inherited.',
      es: 'Ninguna figura se repite exactamente. Cada kanas es un diseño con nombre, y los nombres se heredan.',
    },
  },

  wayuuWoolu: {
    id: 'wayuuWoolu',
    src: '/media/wayuu-woolu.webp',
    width: 1050,
    height: 1400,
    file: "Wo'olu.jpg",
    author: 'Neima Paz',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Wo'olu.jpg"),
    alt: {
      en: 'A woven piece with heavy red, green and dark blue tassels hangs from the branch of a thorn tree in dry scrub.',
      es: 'Una pieza tejida con borlas gruesas rojas, verdes y azul oscuro cuelga de la rama de un árbol espinoso en el matorral seco.',
    },
    caption: {
      en: 'A tasselled piece hung in the dry forest of La Guajira, where the fibre, the dye and the finished object share one landscape.',
      es: 'Una pieza con borlas colgada en el bosque seco de La Guajira, donde la fibra, la tintura y el objeto terminado comparten un mismo paisaje.',
    },
  },

  fiquePlanta: {
    id: 'fiquePlanta',
    src: '/media/fique-planta.webp',
    width: 933,
    height: 1400,
    file: 'Fique - Cabuya (Furcraea cabuya) - Flickr - Alejandro Bayer.jpg',
    author: 'Alejandro Bayer Tamayo',
    licence: 'CC BY-SA 2.0',
    licenceUrl: CC_BY_SA_2,
    sourceUrl: commons('Fique - Cabuya (Furcraea cabuya) - Flickr - Alejandro Bayer.jpg'),
    alt: {
      en: 'A fique plant on a green Andean hillside, its rosette of stiff grey-green blades below a tall flowering stalk, with cloud forest behind.',
      es: 'Una planta de fique en una ladera andina verde, con su roseta de hojas rígidas verdegrises bajo un tallo floral alto y bosque de niebla al fondo.',
    },
    caption: {
      en: 'Fique (Furcraea) on the Andean slope. The fibre is beaten and washed out of the leaf before it can be spun into cabuya.',
      es: 'Fique (Furcraea) en la ladera andina. La fibra se desfibra y se lava de la hoja antes de poder hilarse en cabuya.',
    },
  },

  guajiraTerritorio: {
    id: 'guajiraTerritorio',
    src: '/media/guajira-territorio.webp',
    width: 1280,
    height: 855,
    file: 'Desierto - Cabo de la Vela.jpg',
    author: 'ROCHY HERNÁNDEZ',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Desierto - Cabo de la Vela.jpg'),
    alt: {
      en: 'An open thatched shelter on pale desert ground under a wide sky, with a hammock slung inside and woven bags hanging from the frame.',
      es: 'Una enramada abierta sobre suelo desértico pálido bajo un cielo amplio, con un chinchorro colgado dentro y bolsas tejidas suspendidas de la estructura.',
    },
    caption: {
      en: 'The Guajira peninsula. The hammock is not furniture here — it is the loom’s largest and most demanding output.',
      es: 'La península de la Guajira. El chinchorro no es aquí un mueble — es la pieza más grande y exigente que sale del telar.',
    },
  },

  hilosTenidos: {
    id: 'hilosTenidos',
    src: '/media/hilos-tenidos.webp',
    width: 1280,
    height: 853,
    file: "Jiitpai'.jpg",
    author: 'Cesarmiguelip',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons("Jiitpai'.jpg"),
    alt: {
      en: 'Two cones of deep red thread resting in a wide teal basin, lit from one side against dark ground.',
      es: 'Dos conos de hilo rojo profundo reposan en una vasija ancha color verde azulado, iluminados desde un lado sobre fondo oscuro.',
    },
    caption: {
      en: 'Wound thread at rest between operations — the pause between dyeing and the first row.',
      es: 'Hilo enrollado en reposo entre operaciones — la pausa entre el teñido y la primera vuelta.',
    },
  },
}

export const CREDITS: Credit[] = Object.values(MEDIA)
