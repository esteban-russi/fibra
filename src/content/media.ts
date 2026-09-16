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

const UNSPLASH = 'https://unsplash.com/license'
const CC_BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0/deed.en'
const CC_BY_SA_2 = 'https://creativecommons.org/licenses/by-sa/2.0/deed.en'
const PUBLIC_DOMAIN = 'https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain'

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
    src: '/media/texturas-textiles.webp',
    width: 2747,
    height: 1847,
    file: 'IMG_5544.png',
    author: 'FIBRA',
    licence: 'Archivo del proyecto',
    licenceUrl: '#',
    sourceUrl: '#',
    alt: {
      en: 'A close view of woven textile surfaces in yellow, coral, brown, green and blue.',
      es: 'Detalle de superficies textiles tejidas en amarillo, coral, café, verde y azul.',
    },
    caption: {
      en: 'Textile surfaces shown in close detail, revealing changes in colour, texture and weave.',
      es: 'Superficies textiles vistas en detalle, donde se revelan los cambios de color, textura y tejido.',
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
  telarManos: {
    id: 'telarManos',
    src: '/media/telar-varas.webp',
    width: 1600,
    height: 1067,
    file: 'felipe-mendoza-QZo-EW1Pnp0-unsplash.jpg',
    author: 'Felipe Mendoza',
    licence: 'Unsplash License',
    licenceUrl: UNSPLASH,
    // The referral parameters are the form Unsplash asks attribution to take.
    sourceUrl:
      'https://unsplash.com/photos/a-woman-weaving-a-rug-with-a-wooden-stick-QZo-EW1Pnp0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    alt: {
      en: 'Two hands working a striped warp on a stick loom: one holds a smooth wooden rod, the other presses the threads down. Bands of red, turquoise, black and cream run the width of the cloth.',
      es: 'Dos manos trabajan una urdimbre rayada en un telar de varas: una sostiene una vara de madera lisa y la otra presiona los hilos. Franjas rojas, turquesas, negras y crudas recorren el ancho de la tela.',
    },
    caption: {
      // Stock, not documentary: the source records no name, community or place,
      // so none is claimed. The frame shows hands and cloth, never a face.
      en: 'A stock photograph of weaving on a stick loom. The source records neither the weaver, her community nor her territory, so none is attributed here.',
      es: 'Fotografía de banco de imágenes de tejido en telar de varas. La fuente no registra el nombre de la tejedora, ni su comunidad, ni su territorio, y aquí no se le atribuye ninguno.',
    },
  },
  // ---------------------------------------------------------------------------
  // The five gestures, photographed.
  //
  // These replace the drawn loops on the technique route. None of them was made
  // in Colombia — no openly licensed photograph of each gesture exists from
  // these territories — so none of them claims to have been. Each caption says
  // where the frame was taken and what it shows, and the technique it stands
  // for is named as the gesture, not as the place. The drawn loops survive as
  // the wayfinding icons in TechniqueIcon, which is where a diagram belongs.
  //
  // `trenzar` is the exception: a Zenú sombrero vueltiao, photographed in
  // Colombia. It is the braid rather than the braiding, which is the honest
  // trade here — the openly licensed photographs of hands braiding are all of
  // other crafts in other places, and the kana bands of this crown are the
  // gesture's own record.
  // ---------------------------------------------------------------------------

  gestoHilar: {
    id: 'gestoHilar',
    src: '/media/techniques/hilar.webp',
    width: 1600,
    height: 1065,
    file: 'Flickr - DVIDSHUB - Fourth Kabul AgFair (1).jpg',
    author: 'DVIDSHUB',
    licence: 'Public domain',
    licenceUrl: PUBLIC_DOMAIN,
    sourceUrl: commons('Flickr - DVIDSHUB - Fourth Kabul AgFair (1).jpg'),
    alt: {
      en: 'A close view of two weathered hands drawing a thin thread out of loose fibre, one thumb and forefinger pinching the twist as it forms.',
      es: 'Vista cercana de dos manos curtidas estirando un hilo delgado desde la fibra suelta, con el pulgar y el índice sujetando la torsión mientras se forma.',
    },
    caption: {
      en: 'Spinning by hand, photographed in Kabul. The frame is not Colombian and does not claim to be: it is here because it shows the twist entering the thread, which is the gesture itself.',
      es: 'Hilado a mano, fotografiado en Kabul. El encuadre no es colombiano y no pretende serlo: está aquí porque muestra la torsión entrando en el hilo, que es el gesto mismo.',
    },
  },

  gestoTrenzar: {
    id: 'gestoTrenzar',
    src: '/media/techniques/trenzar.webp',
    width: 1050,
    height: 1400,
    file: 'Sombrero vueltiao de Colombia.jpg',
    author: 'Hurluberlue',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('Sombrero vueltiao de Colombia.jpg'),
    alt: {
      en: 'A sombrero vueltiao seen from directly above, its crown and brim built from concentric braided bands in black and cream, each band a plait of arrow-cane strands.',
      es: 'Un sombrero vueltiao visto desde arriba, con la copa y el ala construidas en franjas trenzadas concéntricas en negro y crudo, cada franja una trenza de hebras de caña flecha.',
    },
    caption: {
      en: 'A sombrero vueltiao. Every ring is a single continuous braid of arrow cane, sewn round on itself; the black and cream alternation is the pinta, counted into the plait as it is made.',
      es: 'Un sombrero vueltiao. Cada anillo es una sola trenza continua de caña flecha, cosida sobre sí misma; la alternancia de negro y crudo es la pinta, contada en el trenzado a medida que se hace.',
    },
  },

  gestoTinturar: {
    id: 'gestoTinturar',
    src: '/media/techniques/tinturar.webp',
    width: 1600,
    height: 1065,
    file: '2021-09-05 AsparnZaya Museum Färber.jpg',
    author: 'Robert Kropf',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('2021-09-05 AsparnZaya Museum Färber.jpg'),
    alt: {
      en: 'Hanks of wool dyed rust, ochre, blue and cream hung in a row from a wooden beam to dry, still dripping.',
      es: 'Madejas de lana teñidas de óxido, ocre, azul y crudo colgadas en fila de una viga de madera para secar, todavía escurriendo.',
    },
    caption: {
      en: 'Wool dyed with natural colour, hung to dry. Photographed at a museum of prehistory in Lower Austria; the fibre and the botanical process are what the frame is for.',
      es: 'Lana tinturada con color natural, colgada a secar. Fotografiada en un museo de prehistoria de la Baja Austria; lo que interesa del encuadre son la fibra y el proceso botánico.',
    },
  },

  gestoUrdir: {
    id: 'gestoUrdir',
    src: '/media/techniques/urdir.webp',
    width: 1600,
    height: 1064,
    file: 'FeriadeRebozo2014 51.JPG',
    author: 'AlejandroLinaresGarcia',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('FeriadeRebozo2014 51.JPG'),
    alt: {
      en: 'Several hundred warp ends in indigo and cream run in strict parallel down a backstrap loom, tensioned between two wooden bars, the first bands of weft closing at the bottom.',
      es: 'Varios cientos de hilos de urdimbre en índigo y crudo corren en estricto paralelo por un telar de cintura, tensados entre dos varas de madera, con las primeras franjas de trama cerrando abajo.',
    },
    caption: {
      en: 'A warp under tension on a backstrap loom, photographed at the Feria del Rebozo in Tenancingo, Mexico. Counted and laid before a single weft passes.',
      es: 'Una urdimbre en tensión sobre telar de cintura, fotografiada en la Feria del Rebozo de Tenancingo, México. Contada y tendida antes de que pase una sola trama.',
    },
  },

  gestoAnudar: {
    id: 'gestoAnudar',
    src: '/media/techniques/anudar.webp',
    width: 1600,
    height: 1067,
    file: 'DEC2025 A woman from Ibeno weaving fishing net 02.jpg',
    author: 'EnnyOch',
    licence: 'CC BY-SA 4.0',
    licenceUrl: CC_BY_SA_4,
    sourceUrl: commons('DEC2025 A woman from Ibeno weaving fishing net 02.jpg'),
    alt: {
      en: 'Two hands hold a netting needle wound with yellow and blue cord and draw a knot closed against the diamond mesh of a part-finished net.',
      es: 'Dos manos sostienen una aguja de red enrollada con cordel amarillo y azul y cierran un nudo contra la malla en rombos de una red a medio terminar.',
    },
    caption: {
      en: 'Knotting a fishing net by hand in Ibeno, Nigeria. The mesh is built knot by knot, the same operation that raises a chinchorro or a carrying net here.',
      es: 'Anudado a mano de una red de pesca en Ibeno, Nigeria. La malla se construye nudo a nudo, la misma operación con que aquí se levanta un chinchorro o una red de carga.',
    },
  },

  luzMariaRetrato: {
    id: 'luzMariaRetrato',
    src: '/media/artisans/luz_rodriguez/profile.webp',
    width: 413,
    height: 512,
    file: 'luz_rodriguez/profile.webp',
    author: 'FIBRA',
    licence: 'Archivo del proyecto',
    licenceUrl: '#',
    sourceUrl: '#',
    alt: {
      en: 'Black and white studio portrait of a woman with long dark hair, looking straight at the camera. She wears a striped collared shirt under a dark jumper, with a heavy dark wool ruana drawn across both shoulders. The background is plain and pale.',
      es: 'Retrato de estudio en blanco y negro de una mujer de pelo largo y oscuro, que mira de frente a la cámara. Lleva una camisa de cuello a rayas bajo un suéter oscuro, y una ruana gruesa de lana oscura cruzada sobre los dos hombros. El fondo es liso y claro.',
    },
    caption: {
      en: 'Luz María Rodríguez Rodríguez, wearing a ruana in virgin wool.',
      es: 'Luz María Rodríguez Rodríguez, con una ruana en lana virgen.',
    },
  },
  florImbacuanRetrato: {
    id: 'florImbacuanRetrato',
    src: '/media/artisans/flor_imbacuan/profile.webp',
    width: 1024,
    height: 997,
    file: 'flor_imbacuan/profile.jpg',
    author: 'FIBRA',
    licence: 'Archivo del proyecto',
    licenceUrl: '#',
    sourceUrl: '#',
    alt: {
      en: 'A woman in Pastos dress — black hat, and a shawl and anaco banded in red, pink and black — seated before a Huanga vertical loom. Skeins of yellow, teal, green and red wool rest on a wooden stand and in a basket beside her.',
      es: 'Una mujer con vestido de Los Pastos — sombrero negro, y chal y anaco con franjas rojas, rosadas y negras — sentada ante un telar vertical Huanga. A su lado, madejas de lana amarilla, verde azulada, verde y roja sobre un caballete de madera y en un canasto.',
    },
    caption: {
      en: 'Flor Imbacuan at a Huanga vertical loom.',
      es: 'Flor Imbacuan ante un telar vertical Huanga.',
    },
  },
  aditaRetrato: {
    id: 'aditaRetrato',
    src: '/media/artisans/ada_morgante/profile.webp',
    width: 1198,
    height: 1600,
    file: 'ada_morgante/profile.jpg',
    author: 'FIBRA',
    licence: 'Archivo del proyecto',
    licenceUrl: '#',
    sourceUrl: '#',
    alt: {
      en: 'An older woman in a black polo neck, seated at a flat-bed knitting machine. Behind her a dress form, a rail of garments, paintings and a work table crowded with tools fill the workshop.',
      es: 'Una mujer mayor, de suéter negro de cuello alto, sentada ante una máquina de tejer rectilínea. Detrás, un maniquí de costura, un perchero con prendas, cuadros y una mesa de trabajo llena de herramientas ocupan el taller.',
    },
    caption: {
      en: 'Ada Morgante at the flat-bed knitting machine in her workshop.',
      es: 'Ada Morgante ante la máquina de tejer rectilínea de su taller.',
    },
  },
}

export const CREDITS: Credit[] = Object.values(MEDIA)
