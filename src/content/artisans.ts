import type { Localized } from '../i18n'
import type { MotionKind } from './techniques'

/**
 * Artisan stories.
 *
 * IMPORTANT — content status. FIBRA's governing rule is that published material
 * is supplied and validated by the artisans and their collectives. No such
 * material exists yet, so every profile below is flagged `demonstration: true`
 * and is rendered with a permanent, visible badge and an explanatory notice.
 *
 * The split is deliberate and is stated to the reader rather than hidden:
 *   - INVENTED: the person, their name, their quotations, their contact details,
 *     the individual works and the times attached to them.
 *   - DOCUMENTED: the craft, materials, extraction processes, tools, regions,
 *     technique names and structural descriptions.
 *
 * Semiotic hotspots describe construction — what the eye can verify in the
 * structure — and explicitly mark figure *meaning* as knowledge held by the
 * community rather than assigning invented cosmology to real traditions.
 */

export type Hotspot = {
  id: string
  /** Position as a percentage of the pattern plate. */
  x: number
  y: number
  name: Localized
  /** What is structurally happening at this point — verifiable from the weave. */
  structure: Localized
  /** What the figure carries. Community-held knowledge is marked, never invented. */
  meaning: Localized
  communityHeld: boolean
}

export type GlossaryEntry = {
  term: string
  gloss: Localized
  note: Localized
}

export type FibreReading = {
  label: Localized
  /** Rendered by the drawn fibre study; not a photograph. */
  fibre: 'wool' | 'cotton' | 'palm' | 'fique'
  twist: 'S' | 'Z'
  reading: Localized<string[]>
}

export type Work = {
  id: string
  title: Localized
  technique: Localized
  materials: Localized
  time: Localized
  scale: Localized
  context: Localized
  /** Drawn plate variant used for this piece. */
  plate: 'plain' | 'braid' | 'coil' | 'knot' | 'twist' | 'net'
}

export type Artisan = {
  slug: string
  demonstration: true
  name: string
  pronounNote?: Localized
  community: Localized
  territory: Localized
  regionId: string
  craft: Localized
  /** Key into MEDIA for the contextual opening image, or null for a drawn plate. */
  openingImage: string | null
  standfirst: Localized
  quote: Localized
  quoteAttribution: Localized

  seal: {
    authorship: string
    affiliation: Localized
    origin: Localized
    consentYear: string
  }

  memory: Localized<string[]>
  taughtBy: Localized

  fibre: FibreReading
  hotspots: Hotspot[]
  glossary: GlossaryEntry[]
  techniques: MotionKind[]
  patternPalette: string[]

  works: Work[]

  contact: {
    /** Deliberately non-routable placeholder — see `demonstration`. */
    whatsapp: string
    display: string
    hours: Localized
    languages: Localized
  }
}

const DEMO_NUMBER = '573000000000'

export const ARTISANS: Artisan[] = [
  {
    slug: 'trenza-zenu',
    demonstration: true,
    name: 'Rosalba Suárez Mendoza',
    community: { en: 'Zenú people', es: 'Pueblo zenú' },
    territory: { en: 'Tuchín, Córdoba', es: 'Tuchín, Córdoba' },
    regionId: 'caribe',
    craft: { en: 'Arrow-cane braiding', es: 'Trenzado en caña flecha' },
    // Material, not a person: the documentary photograph of someone scraping
    // arrow cane belongs to the Caribbean region panel with a caption saying
    // truthfully what it shows. Using it here would read as a portrait of this
    // invented individual, which is the one thing the ethics rule forbids.
    openingImage: 'canaflechaPlanta',
    standfirst: {
      en: 'Braids arrow cane at counts of twenty-one and above, and scrapes her own fibre because she does not trust anyone else to judge the width.',
      es: 'Trenza caña flecha en conteos de veintiuno y más, y raspa su propia fibra porque no confía en el juicio ajeno sobre el ancho.',
    },
    quote: {
      en: 'People ask me how long a hat takes and I never know how to answer, because they mean the sewing. The sewing is the last week.',
      es: 'La gente me pregunta cuánto tarda un sombrero y nunca sé qué responder, porque se refieren a la costura. La costura es la última semana.',
    },
    quoteAttribution: { en: 'Demonstration quotation', es: 'Cita de demostración' },
    seal: {
      authorship: 'Rosalba Suárez Mendoza',
      affiliation: { en: 'Zenú braiding lineage, Tuchín', es: 'Linaje trenzador zenú, Tuchín' },
      origin: { en: 'Tuchín, Córdoba, Colombia', es: 'Tuchín, Córdoba, Colombia' },
      consentYear: '—',
    },
    taughtBy: { en: 'Her grandmother, from the age of six', es: 'Su abuela, desde los seis años' },
    memory: {
      en: [
        'In Tuchín almost every household has a relationship with arrow cane, but the relationships are not the same. Some cut and sell the leaf. Some scrape. Some braid. Some only sew, joining the finished braid into hats. The division is old and it is economic, and it is also the reason the finest braid counts are concentrated in a small number of hands.',
        'Knowledge here passes sideways as well as down. A braider learns the basic count from whoever raised her, but the high counts — twenty-seven, thirty-one — tend to be learned later, from a neighbour or an aunt who has them, and often in exchange for something. That is worth understanding before commissioning: a fine braid is not simply more of the same work, it is access to a skill that its holders have historically had reason to guard.',
        'The braid itself is portable in a way weaving never is. It travels to the field, to the market, to a conversation on a porch. Much of the work behind a sombrero vueltiao is done in the gaps of other work, which is precisely what makes it so easy to undervalue by the hour.',
      ],
      es: [
        'En Tuchín casi todas las casas tienen una relación con la caña flecha, pero las relaciones no son iguales. Unos cortan y venden la hoja. Otros raspan. Otros trenzan. Otros solo cosen, uniendo la trenza terminada hasta formar sombreros. La división es antigua y es económica, y es también la razón por la que los conteos de trenza más finos se concentran en pocas manos.',
        'El saber aquí pasa de lado tanto como hacia abajo. Una trenzadora aprende el conteo básico de quien la crió, pero los conteos altos — veintisiete, treintaiuno — suelen aprenderse después, de una vecina o una tía que los tiene, y a menudo a cambio de algo. Conviene entenderlo antes de encargar: una trenza fina no es simplemente más de lo mismo, es acceso a una destreza que quienes la tienen han tenido razones históricas para guardar.',
        'La trenza misma es portátil de un modo que el tejido nunca lo es. Viaja al campo, al mercado, a una conversación en un corredor. Buena parte del trabajo detrás de un sombrero vueltiao se hace en los huecos de otro trabajo, que es justamente lo que lo vuelve tan fácil de subvalorar por hora.',
      ],
    },
    fibre: {
      label: { en: 'Scraped arrow cane, undyed and dyed', es: 'Caña flecha raspada, cruda y teñida' },
      fibre: 'palm',
      twist: 'Z',
      reading: {
        en: [
          'The strand is flat, not round. It has a face and a back, and it is laid so that the smooth face is always outward — which is why a good braid catches light in one direction only.',
          'Width varies by fractions of a millimetre along a single strand. Sorting for even width is a separate operation from scraping, and it is what separates a twenty-one count from a twenty-seven.',
          'The dark strands are not black but a very deep brown-purple, and they hold a slight sheen the pale strands do not. That difference in surface, not just in colour, is what makes the pattern legible from across a room.',
        ],
        es: [
          'La hebra es plana, no redonda. Tiene cara y revés, y se coloca de modo que la cara lisa quede siempre hacia afuera — por eso una buena trenza atrapa la luz en un solo sentido.',
          'El ancho varía por fracciones de milímetro a lo largo de una misma hebra. Clasificar por ancho parejo es una operación distinta del raspado, y es lo que separa un conteo de veintiuno de uno de veintisiete.',
          'Las hebras oscuras no son negras sino de un pardo violáceo muy profundo, y conservan un brillo leve que las claras no tienen. Esa diferencia de superficie, no solo de color, es lo que hace legible el patrón desde el otro lado de una sala.',
        ],
      },
    },
    hotspots: [
      {
        id: 'cross',
        x: 26,
        y: 30,
        name: { en: 'The oblique crossing', es: 'El cruce oblicuo' },
        structure: {
          en: 'Every strand runs diagonally through the braid, passing over one and under one in strict alternation. There is no thread that stays still — unlike a woven cloth, nothing here is a warp.',
          es: 'Cada hebra corre en diagonal por la trenza, pasando sobre una y bajo una en alternancia estricta. No hay ningún hilo que se quede quieto — a diferencia de una tela tejida, aquí nada es urdimbre.',
        },
        meaning: {
          en: 'Structural, not symbolic. The angle of the crossing is fixed by the strand count: more strands, shallower angle, denser braid.',
          es: 'Estructural, no simbólico. El ángulo del cruce lo fija el número de hebras: más hebras, ángulo más tendido, trenza más densa.',
        },
        communityHeld: false,
      },
      {
        id: 'pinta',
        x: 62,
        y: 46,
        name: { en: 'A pinta', es: 'Una pinta' },
        structure: {
          en: 'A figure produced by choosing which strands are dark at each crossing. Because the strand is committed the moment it crosses, the whole figure must be planned before the braid reaches it.',
          es: 'Una figura producida al escoger qué hebras van oscuras en cada cruce. Como la hebra queda comprometida en el momento de cruzar, toda la figura debe planearse antes de que la trenza llegue a ella.',
        },
        meaning: {
          en: 'Pintas are named designs within the Zenú repertoire. The names and what they refer to are held and taught within the community — FIBRA does not publish an interpretation that a collective has not supplied.',
          es: 'Las pintas son diseños con nombre dentro del repertorio zenú. Los nombres y aquello a lo que remiten se guardan y se enseñan dentro de la comunidad — FIBRA no publica una interpretación que un colectivo no haya provisto.',
        },
        communityHeld: true,
      },
      {
        id: 'edge',
        x: 84,
        y: 68,
        name: { en: 'The selvedge turn', es: 'El giro de orilla' },
        structure: {
          en: 'At each edge the outermost strand reverses direction and re-enters the braid. This turn is where tension is either kept or lost, and an uneven edge cannot be corrected once the braid is sewn.',
          es: 'En cada orilla la hebra más externa invierte su dirección y vuelve a entrar en la trenza. Ese giro es donde la tensión se conserva o se pierde, y una orilla despareja no se puede corregir una vez cosida la trenza.',
        },
        meaning: {
          en: 'A maker is often identified by the edge before the pattern. Tension habits are as individual as handwriting.',
          es: 'A menudo se identifica a quien trenzó por la orilla antes que por el patrón. Los hábitos de tensión son tan individuales como la letra.',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Pinta',
        gloss: { en: 'A named figure in the braid', es: 'Una figura con nombre en la trenza' },
        note: {
          en: 'The repertoire of pintas is extensive and regionally specific. Which ones a braider commands is part of her professional identity.',
          es: 'El repertorio de pintas es extenso y regionalmente específico. Cuáles domina una trenzadora es parte de su identidad profesional.',
        },
      },
      {
        term: 'Quinciano',
        gloss: { en: 'A fifteen-strand braid', es: 'Una trenza de quince hebras' },
        note: {
          en: 'The everyday count. Quick, hard-wearing, and the entry point at which most braiders learn.',
          es: 'El conteo corriente. Rápido, resistente, y el punto de entrada en el que aprende la mayoría.',
        },
      },
      {
        term: 'Vueltiao',
        gloss: { en: 'Turned — built by coiling the braid', es: 'Vuelto — construido enrollando la trenza' },
        note: {
          en: 'Names the construction rather than the decoration: the hat is a single long braid turned in a spiral and stitched.',
          es: 'Nombra la construcción y no el adorno: el sombrero es una sola trenza larga vuelta en espiral y cosida.',
        },
      },
    ],
    techniques: ['trenzar', 'tinturar'],
    patternPalette: ['#E7DDD7', '#3A2420', '#E5A93C'],
    works: [
      {
        id: 'w1',
        title: { en: 'Hat, twenty-seven count', es: 'Sombrero, conteo veintisiete' },
        technique: { en: 'Flat oblique braid, coiled and hand-stitched', es: 'Trenza plana oblicua, enrollada y cosida a mano' },
        materials: { en: 'Arrow cane, undyed and mud-dyed', es: 'Caña flecha, cruda y teñida en barro' },
        time: { en: 'About 5 weeks — roughly 3 of them braiding', es: 'Cerca de 5 semanas — unas 3 de ellas trenzando' },
        scale: { en: 'Brim 34 cm across', es: 'Ala de 34 cm de diámetro' },
        context: {
          en: 'Worn daily rather than displayed. It softens with use and takes the shape of the head that owns it.',
          es: 'Se usa a diario más que se exhibe. Se ablanda con el uso y toma la forma de la cabeza que lo lleva.',
        },
        plate: 'braid',
      },
      {
        id: 'w2',
        title: { en: 'Braid length, undyed', es: 'Rollo de trenza, cruda' },
        technique: { en: 'Continuous flat braid, twenty-one count', es: 'Trenza plana continua, conteo veintiuno' },
        materials: { en: 'Scraped arrow cane, sorted for width', es: 'Caña flecha raspada, clasificada por ancho' },
        time: { en: 'About 40 hours for 12 metres', es: 'Cerca de 40 horas por 12 metros' },
        scale: { en: '12 m long, 2.5 cm wide', es: '12 m de largo, 2,5 cm de ancho' },
        context: {
          en: 'Sold as material to sewers who build the hats. This is the form most of the work actually leaves the house in.',
          es: 'Se vende como material a quienes cosen los sombreros. Esta es la forma en que realmente sale de la casa la mayor parte del trabajo.',
        },
        plate: 'braid',
      },
      {
        id: 'w3',
        title: { en: 'Wide-band cuff', es: 'Manilla de banda ancha' },
        technique: { en: 'Fine braid, closed with a hidden splice', es: 'Trenza fina, cerrada con un empalme oculto' },
        materials: { en: 'Arrow cane, two tones', es: 'Caña flecha, dos tonos' },
        time: { en: 'About 9 hours', es: 'Cerca de 9 horas' },
        scale: { en: '4 cm wide', es: '4 cm de ancho' },
        context: {
          en: 'The splice is the difficult part. A visible join is the mark of a piece made in a hurry.',
          es: 'El empalme es la parte difícil. Una unión visible es la marca de una pieza hecha con prisa.',
        },
        plate: 'braid',
      },
    ],
    contact: {
      whatsapp: DEMO_NUMBER,
      display: '+57 300 000 0000',
      hours: { en: 'Mornings, before the heat', es: 'En las mañanas, antes del calor' },
      languages: { en: 'Spanish', es: 'Español' },
    },
  },

  {
    slug: 'telar-wayuu',
    demonstration: true,
    name: 'Aura Epieyú Uriana',
    community: { en: 'Wayuu people', es: 'Pueblo wayuu' },
    territory: { en: 'Alta Guajira, near Uribia', es: 'Alta Guajira, cerca de Uribia' },
    regionId: 'caribe',
    craft: { en: 'Vertical loom and single-needle work', es: 'Telar vertical y trabajo de aguja' },
    openingImage: 'wayuuWoolu',
    standfirst: {
      en: 'Works both the upright frame and the hook. Takes chinchorro commissions rarely, and only from people who have understood what the timescale means.',
      es: 'Trabaja tanto el bastidor vertical como el gancho. Acepta encargos de chinchorro rara vez, y solo de quien ha entendido lo que significa el plazo.',
    },
    quote: {
      en: 'A mochila is a conversation you can finish. A chinchorro is one you have to live inside for a season.',
      es: 'Una mochila es una conversación que se puede terminar. Un chinchorro es una en la que hay que vivir por dentro toda una temporada.',
    },
    quoteAttribution: { en: 'Demonstration quotation', es: 'Cita de demostración' },
    seal: {
      authorship: 'Aura Epieyú Uriana',
      affiliation: { en: 'Wayuu clan affiliation, Alta Guajira', es: 'Filiación clánica wayuu, Alta Guajira' },
      origin: { en: 'La Guajira, Colombia', es: 'La Guajira, Colombia' },
      consentYear: '—',
    },
    taughtBy: { en: 'Her mother and her mother’s sisters, during her seclusion', es: 'Su madre y las hermanas de su madre, durante su encierro' },
    memory: {
      en: [
        'Wayuu weaving is taught inside a specific institution. When a girl reaches puberty she enters a period of seclusion in which she is instructed by the senior women of her matrilineal family — in conduct, in obligation, in the history of her clan, and in weaving. The technique arrives inseparable from everything else that is being transmitted at the same time.',
        'That is why designs travel down family lines rather than spreading evenly. A woman commands the figures her instructors commanded. Acquiring others is possible but it is a relationship, not a purchase, and it leaves an obligation behind it.',
        'The hammock occupies a place in Wayuu life that is difficult to convey to someone who has only seen one hanging in a shop. It is where people sleep, where guests are received, where the dead are wrapped. A chinchorro made for a household is made with that whole future in mind, which is not a sentiment about craft — it is a specification about how strong it has to be.',
      ],
      es: [
        'El tejido wayuu se enseña dentro de una institución concreta. Cuando una niña llega a la pubertad entra en un periodo de encierro en el que la instruyen las mujeres mayores de su familia matrilineal — en conducta, en obligación, en la historia de su clan y en tejido. La técnica llega inseparable de todo lo demás que se transmite al mismo tiempo.',
        'Por eso los diseños viajan por líneas familiares y no se difunden de manera pareja. Una mujer domina las figuras que dominaron quienes la instruyeron. Adquirir otras es posible, pero es una relación y no una compra, y deja una obligación detrás.',
        'El chinchorro ocupa en la vida wayuu un lugar difícil de transmitir a quien solo ha visto uno colgado en una tienda. Allí se duerme, allí se recibe a los visitantes, allí se envuelve a los muertos. Un chinchorro hecho para una casa se hace con todo ese futuro en mente, lo cual no es un sentimiento sobre el oficio — es una especificación sobre cuán resistente tiene que ser.',
      ],
    },
    fibre: {
      label: { en: 'Plied cotton thread, hand-wound', es: 'Hilo de algodón retorcido, devanado a mano' },
      fibre: 'cotton',
      twist: 'S',
      reading: {
        en: [
          'Two singles plied together in the direction opposite to their own twist. That opposition is what keeps the thread from kinking back on itself while it is being worked.',
          'Under magnification the ply angle changes slightly where the spinner’s hands changed pace. In a finished mochila these variations arrive as faint horizontal bands of texture.',
          'The stitch here is a single continuous element pulled through the loop beneath it. There is no second thread — the density of the fabric is produced entirely by how tightly each loop is drawn.',
        ],
        es: [
          'Dos cabos retorcidos juntos en sentido contrario a su propia torsión. Esa oposición es lo que impide que el hilo se rice sobre sí mismo mientras se trabaja.',
          'Con aumento, el ángulo del retorcido cambia levemente donde las manos de quien hiló cambiaron de ritmo. En una mochila terminada esas variaciones llegan como franjas horizontales tenues de textura.',
          'La puntada aquí es un solo elemento continuo que se hala por el bucle inferior. No hay un segundo hilo — la densidad de la tela la produce enteramente cuán apretada se cierra cada lazada.',
        ],
      },
    },
    hotspots: [
      {
        id: 'kanas',
        x: 34,
        y: 34,
        name: { en: 'A kanas figure', es: 'Una figura kanas' },
        structure: {
          en: 'Built by changing which colour is carried on the surface stitch while the other runs hidden behind. Both threads travel the whole row; only one is visible at a time.',
          es: 'Se construye cambiando qué color va en la puntada de superficie mientras el otro corre oculto por detrás. Ambos hilos recorren toda la vuelta; solo uno es visible a la vez.',
        },
        meaning: {
          en: 'Kanas are named designs drawn from the environment and the social world of the weaver. The specific names and what they refer to are Wayuu knowledge, taught in seclusion — this platform reproduces no interpretation that a Wayuu collective has not itself provided.',
          es: 'Las kanas son diseños con nombre tomados del entorno y del mundo social de quien teje. Los nombres concretos y aquello a lo que remiten son conocimiento wayuu, enseñado en el encierro — esta plataforma no reproduce interpretación alguna que un colectivo wayuu no haya provisto por sí mismo.',
        },
        communityHeld: true,
      },
      {
        id: 'spiral',
        x: 66,
        y: 24,
        name: { en: 'The rising spiral', es: 'La espiral ascendente' },
        structure: {
          en: 'The body has no rows and no seam. It is one spiral climbing continuously, which means the pattern must shift by a fraction each revolution or it would drift sideways.',
          es: 'El cuerpo no tiene vueltas cerradas ni costura. Es una sola espiral que asciende de manera continua, lo que obliga a desplazar el patrón una fracción en cada revolución o se iría de lado.',
        },
        meaning: {
          en: 'Structural. It is also why a counting error cannot be unpicked locally — everything above it is one continuous thread.',
          es: 'Estructural. Es también la razón por la que un error de conteo no puede descoserse de manera puntual — todo lo que está encima es un solo hilo continuo.',
        },
        communityHeld: false,
      },
      {
        id: 'base',
        x: 50,
        y: 76,
        name: { en: 'The base disc', es: 'El disco de base' },
        structure: {
          en: 'Worked flat outward from a central ring, with increases spaced to keep it from cupping. The whole bag is dimensioned by the moment the maker stops increasing and starts climbing.',
          es: 'Se trabaja plano hacia afuera desde un anillo central, con aumentos espaciados para que no se acopa. Toda la bolsa queda dimensionada en el momento en que quien teje deja de aumentar y empieza a subir.',
        },
        meaning: {
          en: 'The base is the part most often judged by other weavers, and it is the part a buyer almost never looks at.',
          es: 'La base es la parte que más juzgan otras tejedoras, y la parte que casi nunca mira quien compra.',
        },
        communityHeld: false,
      },
      {
        id: 'strap',
        x: 16,
        y: 58,
        name: { en: 'The strap', es: 'La cincha' },
        structure: {
          en: 'A separate loom piece, not part of the spiral. It is woven flat on the vertical frame and joined afterwards, and it is usually the strongest element of the whole object.',
          es: 'Una pieza de telar aparte, no parte de la espiral. Se teje plana en el bastidor vertical y se une después, y suele ser el elemento más resistente de todo el objeto.',
        },
        meaning: {
          en: 'The strap is where the two techniques in this workshop meet: the frame and the needle, in one object.',
          es: 'La cincha es donde se encuentran las dos técnicas de este taller: el bastidor y la aguja, en un mismo objeto.',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Kanas',
        gloss: { en: 'The named geometric designs', es: 'Los diseños geométricos con nombre' },
        note: {
          en: 'A repertoire, not a decoration. Which kanas a weaver commands is a statement about who taught her.',
          es: 'Un repertorio, no un adorno. Cuáles kanas domina una tejedora dice quién la enseñó.',
        },
      },
      {
        term: 'Susu',
        gloss: { en: 'The everyday shoulder bag', es: 'La mochila de uso diario' },
        note: {
          en: 'Small, worked in a single spiral, and made in far greater numbers than any other Wayuu piece.',
          es: 'Pequeña, trabajada en una sola espiral, y hecha en cantidades muy superiores a las de cualquier otra pieza wayuu.',
        },
      },
      {
        term: 'Chinchorro',
        gloss: { en: 'The large hammock', es: 'La hamaca grande' },
        note: {
          en: 'A loom piece with an elaborated fringe. Months of work, and the single most demanding object in the repertoire.',
          es: 'Una pieza de telar con fleco elaborado. Meses de trabajo, y el objeto más exigente del repertorio.',
        },
      },
    ],
    techniques: ['urdir', 'anudar', 'hilar'],
    patternPalette: ['#FFFDF5', '#2A9D8F', '#E5A93C', '#6E3A41'],
    works: [
      {
        id: 'w1',
        title: { en: 'Susu with a single large figure', es: 'Susu con una sola figura grande' },
        technique: { en: 'Single-needle continuous spiral, two colours carried', es: 'Espiral continua de una aguja, dos colores portados' },
        materials: { en: 'Plied cotton thread', es: 'Hilo de algodón retorcido' },
        time: { en: 'About 2 weeks', es: 'Cerca de 2 semanas' },
        scale: { en: '28 cm tall, 26 cm across the mouth', es: '28 cm de alto, 26 cm en la boca' },
        context: {
          en: 'Carried across the body every day. It slackens into an oval with use and never returns to its made shape.',
          es: 'Se lleva cruzada al cuerpo todos los días. Con el uso se afloja hasta un óvalo y nunca vuelve a la forma con que fue hecha.',
        },
        plate: 'knot',
      },
      {
        id: 'w2',
        title: { en: 'Chinchorro with worked fringe', es: 'Chinchorro con fleco trabajado' },
        technique: { en: 'Vertical loom, with a separately built fringe', es: 'Telar vertical, con fleco construido aparte' },
        materials: { en: 'Cotton, undyed and plant-dyed', es: 'Algodón, crudo y teñido con planta' },
        time: { en: '4 to 6 months, worked alongside other obligations', es: 'De 4 a 6 meses, trabajado junto a otras obligaciones' },
        scale: { en: '2.4 m long; the fringe adds 60 cm at each end', es: '2,4 m de largo; el fleco añade 60 cm en cada extremo' },
        context: {
          en: 'Hung in the household, not stored. Where people sleep, receive visitors, and are wrapped at the end.',
          es: 'Colgado en la casa, no guardado. Donde se duerme, se recibe visita, y se envuelve al final.',
        },
        plate: 'net',
      },
      {
        id: 'w3',
        title: { en: 'Woven strap, wide', es: 'Cincha tejida, ancha' },
        technique: { en: 'Flat weave on the vertical frame', es: 'Tejido plano en el bastidor vertical' },
        materials: { en: 'Plied cotton', es: 'Algodón retorcido' },
        time: { en: 'About 20 hours', es: 'Cerca de 20 horas' },
        scale: { en: '4 cm wide, 1.4 m long', es: '4 cm de ancho, 1,4 m de largo' },
        context: {
          en: 'Made to outlast the bag it is attached to, and often transferred to a second one.',
          es: 'Hecha para durar más que la bolsa a la que se une, y a menudo se traslada a una segunda.',
        },
        plate: 'plain',
      },
    ],
    contact: {
      whatsapp: DEMO_NUMBER,
      display: '+57 300 000 0000',
      hours: { en: 'Late afternoon', es: 'A media tarde' },
      languages: { en: 'Wayuunaiki and Spanish', es: 'Wayuunaiki y español' },
    },
  },

  {
    slug: 'werregue-wounaan',
    demonstration: true,
    name: 'Elvia Chamarra Piraza',
    community: { en: 'Wounaan people', es: 'Pueblo wounaan' },
    territory: { en: 'Litoral del San Juan, Chocó', es: 'Litoral del San Juan, Chocó' },
    regionId: 'pacifica',
    craft: { en: 'Coiled werregue', es: 'Werregue anillado' },
    openingImage: 'werregueVasijas',
    standfirst: {
      en: 'Builds tightly coiled werregue vessels, and dyes her own fibre because the black has to be steeped and cannot be hurried.',
      es: 'Construye vasijas de werregue de anillado cerrado, y tiñe su propia fibra porque el negro se macera y no admite prisa.',
    },
    quote: {
      en: 'I have to see the whole thing before I start. After that I am only counting.',
      es: 'Tengo que ver la pieza entera antes de empezar. Después de eso solo estoy contando.',
    },
    quoteAttribution: { en: 'Demonstration quotation', es: 'Cita de demostración' },
    seal: {
      authorship: 'Elvia Chamarra Piraza',
      affiliation: { en: 'Wounaan community, Litoral del San Juan', es: 'Comunidad wounaan, Litoral del San Juan' },
      origin: { en: 'Chocó, Colombia', es: 'Chocó, Colombia' },
      consentYear: '—',
    },
    taughtBy: { en: 'Her mother, and later a neighbour for the fine counts', es: 'Su madre, y después una vecina para los conteos finos' },
    memory: {
      en: [
        'Werregue work is bound to a palm that does not grow everywhere and cannot be harvested freely. Fibre comes from the unopened spear at the crown of a young plant, and taking too many kills it. The rhythm of the craft is therefore set partly by the forest: a workshop that overcuts is a workshop with no material in five years.',
        'The dyeing is slow by necessity rather than by tradition. Jagua has to oxidise in air after the fibre comes out of the steep, and heating it would stiffen the fibre past the point where it will take a close stitch. A batch of black is several days in which nothing else in the sequence can advance.',
        'What is unusual about this tradition is how much of it is arithmetic. The maker cannot sketch, cannot correct, cannot approximate. She commits to a figure hundreds of stitches before it appears, and if the count is wrong the piece is wrong from that point upward. Watching someone do this and calling it decorative misses what is actually happening.',
      ],
      es: [
        'El trabajo en werregue está atado a una palma que no crece en todas partes y no se puede cosechar libremente. La fibra viene del cogollo sin abrir en la corona de una planta joven, y tomar demasiados la mata. El ritmo del oficio lo fija por tanto, en parte, el bosque: un taller que corta de más es un taller sin material en cinco años.',
        'El teñido es lento por necesidad y no por tradición. La jagua tiene que oxidarse al aire después de que la fibra sale de la maceración, y calentarla endurecería la fibra más allá del punto en que admite una puntada cerrada. Un lote de negro son varios días en los que nada más de la secuencia puede avanzar.',
        'Lo inusual de esta tradición es cuánto de ella es aritmética. Quien teje no puede bosquejar, no puede corregir, no puede aproximar. Se compromete con una figura cientos de puntadas antes de que aparezca, y si el conteo está mal la pieza está mal de ahí hacia arriba. Ver a alguien hacer esto y llamarlo decorativo es no ver lo que realmente ocurre.',
      ],
    },
    fibre: {
      label: { en: 'Werregue fibre, steeped and sun-bleached', es: 'Fibra de werregue, macerada y blanqueada al sol' },
      fibre: 'palm',
      twist: 'Z',
      reading: {
        en: [
          'The fibre is a flat ribbon split from a leaflet, and it tapers along its length. Each one is used from thick end to thin, so the stitch gauge shifts imperceptibly as a single fibre is consumed.',
          'Sun-bleaching takes the pale fibre almost to white over several days. The cream you see in a finished vessel is that bleached state, not an applied colour.',
          'Where a coil meets the one below it, the stitch passes through the wrap of the previous round. That is the whole structure — there is no core running through the piece other than the bundle each round is built on.',
        ],
        es: [
          'La fibra es una cinta plana partida de un foliolo, y se adelgaza a lo largo de su recorrido. Cada una se usa del extremo grueso al fino, de modo que el calibre de la puntada se desplaza de manera imperceptible mientras se consume una sola fibra.',
          'El blanqueo al sol lleva la fibra clara casi hasta el blanco en varios días. El crema que se ve en una vasija terminada es ese estado blanqueado, no un color aplicado.',
          'Donde un anillo se encuentra con el de abajo, la puntada atraviesa la envoltura de la vuelta anterior. Esa es toda la estructura — no hay más alma recorriendo la pieza que el haz sobre el que se construye cada vuelta.',
        ],
      },
    },
    hotspots: [
      {
        id: 'coil',
        x: 30,
        y: 62,
        name: { en: 'The coil junction', es: 'La unión del anillo' },
        structure: {
          en: 'Each stitch wraps the current bundle and passes through the round below, locking the two together. Pull rate decides everything: too loose and the vessel will not hold its shape, too tight and it will not rise.',
          es: 'Cada puntada envuelve el haz actual y atraviesa la vuelta inferior, trabando ambas. La fuerza del halado lo decide todo: demasiado floja y la vasija no sostiene la forma, demasiado apretada y no sube.',
        },
        meaning: {
          en: 'Structural. The density this produces is why a well-made werregue vessel is effectively watertight.',
          es: 'Estructural. La densidad que produce es la razón por la que una vasija de werregue bien hecha resulta prácticamente estanca.',
        },
        communityHeld: false,
      },
      {
        id: 'figure',
        x: 56,
        y: 40,
        name: { en: 'A counted figure', es: 'Una figura contada' },
        structure: {
          en: 'The figure exists only as a sequence of colour changes in the wrapping fibre. Its width in stitches must be divided evenly into the circumference of the round it sits on, and the circumference grows as the vessel widens.',
          es: 'La figura existe solo como una secuencia de cambios de color en la fibra que envuelve. Su ancho en puntadas debe dividir de manera exacta la circunferencia de la vuelta en que se asienta, y esa circunferencia crece a medida que la vasija se ensancha.',
        },
        meaning: {
          en: 'Wounaan figures name animals, plants and the relations between them. Which figure means what is Wounaan knowledge; FIBRA publishes no interpretation the community has not supplied itself.',
          es: 'Las figuras wounaan nombran animales, plantas y las relaciones entre ellos. Qué significa cada figura es conocimiento wounaan; FIBRA no publica interpretación alguna que la comunidad no haya provisto por sí misma.',
        },
        communityHeld: true,
      },
      {
        id: 'band',
        x: 74,
        y: 20,
        name: { en: 'The neck band', es: 'La franja del cuello' },
        structure: {
          en: 'Where the vessel turns inward the circumference falls, so stitches must be decreased. Figures are usually simplified to plain bands here because the arithmetic stops cooperating.',
          es: 'Donde la vasija se cierra hacia adentro la circunferencia disminuye, así que hay que reducir puntadas. Las figuras suelen simplificarse a franjas lisas aquí porque la aritmética deja de cooperar.',
        },
        meaning: {
          en: 'A reliable place to judge a maker. The transition into the neck is the hardest passage in the whole vessel.',
          es: 'Un buen lugar para juzgar a quien teje. La transición hacia el cuello es el paso más difícil de toda la vasija.',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Werregue',
        gloss: { en: 'Astrocaryum standleyanum, and its fibre', es: 'Astrocaryum standleyanum, y su fibra' },
        note: {
          en: 'The name covers the palm, the fibre and, colloquially, the objects made from it.',
          es: 'El nombre cubre la palma, la fibra y, coloquialmente, los objetos hechos con ella.',
        },
      },
      {
        term: 'Jagua',
        gloss: { en: 'Genipa americana — the black', es: 'Genipa americana — el negro' },
        note: {
          en: 'Colourless when pressed, blue-black after hours in air. It stains skin for a fortnight.',
          es: 'Incolora al prensarse, negro azulada tras horas al aire. Mancha la piel por quince días.',
        },
      },
      {
        term: 'Damagua',
        gloss: { en: 'Beaten bark cloth', es: 'Tela de corteza macerada' },
        note: {
          en: 'A separate Pacific tradition worked as sheet rather than thread, from Poulsenia bark.',
          es: 'Una tradición pacífica aparte, trabajada como lámina y no como hilo, a partir de corteza de Poulsenia.',
        },
      },
    ],
    techniques: ['tinturar', 'anudar'],
    patternPalette: ['#F2E9DC', '#2B1B16', '#9E2B25', '#607248'],
    works: [
      {
        id: 'w1',
        title: { en: 'Tall vessel with banded figures', es: 'Vasija alta con figuras en franjas' },
        technique: { en: 'Wrapped coil, counted figures', es: 'Anillado envuelto, figuras contadas' },
        materials: { en: 'Werregue fibre; jagua, achiote and plantain dyes', es: 'Fibra de werregue; tintes de jagua, achiote y plátano' },
        time: { en: 'About 4 months', es: 'Cerca de 4 meses' },
        scale: { en: '38 cm tall, 26 cm at the belly', es: '38 cm de alto, 26 cm en la panza' },
        context: {
          en: 'Made to be handled. The surface polishes slightly where it is picked up, and the polish follows the hands that use it.',
          es: 'Hecha para ser manipulada. La superficie se pule levemente donde se toma, y ese pulido sigue a las manos que la usan.',
        },
        plate: 'coil',
      },
      {
        id: 'w2',
        title: { en: 'Shallow bowl, undyed', es: 'Cuenco bajo, sin teñir' },
        technique: { en: 'Wrapped coil, no colour change', es: 'Anillado envuelto, sin cambio de color' },
        materials: { en: 'Sun-bleached werregue', es: 'Werregue blanqueado al sol' },
        time: { en: 'About 3 weeks', es: 'Cerca de 3 semanas' },
        scale: { en: '22 cm across', es: '22 cm de diámetro' },
        context: {
          en: 'With no figure to hide behind, the evenness of the stitch is the only thing on show.',
          es: 'Sin figura tras la cual esconderse, la regularidad de la puntada es lo único que queda a la vista.',
        },
        plate: 'coil',
      },
      {
        id: 'w3',
        title: { en: 'Lidded jar', es: 'Vasija con tapa' },
        technique: { en: 'Coil, with a separately built lid matched to the mouth', es: 'Anillado, con tapa construida aparte y ajustada a la boca' },
        materials: { en: 'Werregue; jagua black', es: 'Werregue; negro de jagua' },
        time: { en: 'About 5 months', es: 'Cerca de 5 meses' },
        scale: { en: '30 cm tall', es: '30 cm de alto' },
        context: {
          en: 'The lid is the test. It is built blind against a mouth that is already finished, and it either seats or it does not.',
          es: 'La tapa es la prueba. Se construye a ciegas contra una boca ya terminada, y o asienta o no asienta.',
        },
        plate: 'coil',
      },
    ],
    contact: {
      whatsapp: DEMO_NUMBER,
      display: '+57 300 000 0000',
      hours: { en: 'When the river allows the trip into town', es: 'Cuando el río permite el viaje al pueblo' },
      languages: { en: 'Woun Meu and Spanish', es: 'Woun Meu y español' },
    },
  },

  {
    slug: 'telar-boyaca',
    demonstration: true,
    name: 'Hernando Cely Barrera',
    community: { en: 'Weaving households of the Sugamuxi valley', es: 'Casas tejedoras del valle de Sugamuxi' },
    territory: { en: 'Nobsa, Boyacá', es: 'Nobsa, Boyacá' },
    regionId: 'andina',
    craft: { en: 'Pedal loom and hand spinning', es: 'Telar de pedal e hilado a mano' },
    openingImage: 'fiquePlanta',
    standfirst: {
      en: 'Weaves ruanas on a four-shaft floor loom from wool he buys as fleece and has spun in the village, because mill yarn will not give him the cloth he wants.',
      es: 'Teje ruanas en un telar de piso de cuatro lizos con lana que compra en vellón y manda hilar en el pueblo, porque el hilo industrial no le da la tela que quiere.',
    },
    quote: {
      en: 'Anyone can weave the cloth. The argument is always about the yarn.',
      es: 'La tela la teje cualquiera. La discusión siempre es por el hilo.',
    },
    quoteAttribution: { en: 'Demonstration quotation', es: 'Cita de demostración' },
    seal: {
      authorship: 'Hernando Cely Barrera',
      affiliation: { en: 'Nobsa weaving tradition, Boyacá', es: 'Tradición tejedora de Nobsa, Boyacá' },
      origin: { en: 'Nobsa, Boyacá, Colombia', es: 'Nobsa, Boyacá, Colombia' },
      consentYear: '—',
    },
    taughtBy: { en: 'His father, on the same loom', es: 'Su padre, en el mismo telar' },
    memory: {
      en: [
        'The pedal loom is not indigenous to the Andes. It came with the Spanish in the sixteenth century, along with the sheep, and it displaced older backstrap weaving over several generations. Four hundred years later it is entirely local — which is a reminder that "traditional" describes how long a practice has been held, not where it came from.',
        'What survived the transition is the preparation. The fleece is still washed cold, teased by hand and spun on a drop spindle, and that is where the character of the cloth is decided. Mill yarn is uniform; hand-spun is not, and the small variations in diameter make a woven surface that moves in light. A weaver who buys mill yarn to save time is making a different object.',
        'The ruana is the whole point of the system. Open at the front, heavy, unlined, and cut with no shaping at all — two woven panels joined with a slit. It is designed for cold that arrives at particular hours in a high valley, and it is the least fashionable garment imaginable, which is exactly why it has not changed.',
      ],
      es: [
        'El telar de pedal no es originario de los Andes. Llegó con los españoles en el siglo XVI, junto con las ovejas, y desplazó al telar de cintura más antiguo a lo largo de varias generaciones. Cuatrocientos años después es enteramente local — lo que recuerda que «tradicional» describe cuánto tiempo se ha sostenido una práctica, no de dónde vino.',
        'Lo que sobrevivió a la transición es la preparación. El vellón se sigue lavando en frío, cardando a mano e hilando en huso de caída, y ahí es donde se decide el carácter de la tela. El hilo industrial es uniforme; el hilado a mano no, y las pequeñas variaciones de diámetro hacen una superficie tejida que se mueve con la luz. Un tejedor que compra hilo industrial para ahorrar tiempo está haciendo otro objeto.',
        'La ruana es el sentido entero del sistema. Abierta al frente, pesada, sin forro, y cortada sin ninguna entalladura — dos lienzos tejidos unidos con una abertura. Está diseñada para un frío que llega a horas concretas en un valle alto, y es la prenda menos moderna que quepa imaginar, que es exactamente por lo que no ha cambiado.',
      ],
    },
    fibre: {
      label: { en: 'Hand-spun virgin wool, undyed', es: 'Lana virgen hilada a mano, sin teñir' },
      fibre: 'wool',
      twist: 'Z',
      reading: {
        en: [
          'Wool fibre is scaled along its length. Those scales are what let the yarn hold together with relatively little twist, and what make the finished cloth full slightly the first time it is washed.',
          'The diameter here wanders by perhaps a fifth either side of its average. In a mill yarn that variance would be a fault; in a ruana it is the reason the surface is not flat.',
          'The natural colour range — cream, oatmeal, grey-brown, near-black — comes from the fleeces themselves, sorted before spinning. Nothing in this reading has been dyed.',
        ],
        es: [
          'La fibra de lana tiene escamas a lo largo de su recorrido. Esas escamas son las que permiten que el hilo se sostenga con relativamente poca torsión, y las que hacen que la tela terminada se apelmace un poco en el primer lavado.',
          'El diámetro aquí oscila quizá un quinto a cada lado de su promedio. En un hilo industrial esa varianza sería un defecto; en una ruana es la razón de que la superficie no sea plana.',
          'La gama de color natural — crema, avena, pardo grisáceo, casi negro — viene de los vellones mismos, clasificados antes de hilar. Nada de lo que se ve aquí ha sido teñido.',
        ],
      },
    },
    hotspots: [
      {
        id: 'plain',
        x: 30,
        y: 36,
        name: { en: 'Plain weave', es: 'Tafetán' },
        structure: {
          en: 'One over, one under, reversing every pick. The simplest interlacement there is, and the most stable — which is why a garment meant to last decades uses it rather than something more elaborate.',
          es: 'Uno encima, uno debajo, invirtiendo en cada pasada. El entrelazado más simple que existe, y el más estable — por eso una prenda pensada para durar décadas lo usa en lugar de algo más elaborado.',
        },
        meaning: {
          en: 'Structural. In this cloth the interest is deliberately in the yarn, not the binding.',
          es: 'Estructural. En esta tela el interés está deliberadamente en el hilo, no en el ligamento.',
        },
        communityHeld: false,
      },
      {
        id: 'beat',
        x: 62,
        y: 56,
        name: { en: 'The beat', es: 'El batido' },
        structure: {
          en: 'How hard the reed is pulled after each pick decides how many wefts fit per centimetre — and therefore the weight, drape and warmth of the finished cloth. It is set by the weaver’s arm and cannot be checked except by feel.',
          es: 'Con cuánta fuerza se hala el peine tras cada pasada decide cuántas tramas caben por centímetro — y por tanto el peso, la caída y el abrigo de la tela terminada. Lo fija el brazo de quien teje y no se puede verificar sino por tacto.',
        },
        meaning: {
          en: 'Two weavers on the same loom with the same yarn will produce measurably different cloth. The beat is the signature.',
          es: 'Dos tejedores en el mismo telar y con el mismo hilo producen telas medidamente distintas. El batido es la firma.',
        },
        communityHeld: false,
      },
      {
        id: 'selvedge',
        x: 84,
        y: 30,
        name: { en: 'The selvedge', es: 'El orillo' },
        structure: {
          en: 'The weft turns here and re-enters. Too much tension pulls the cloth in and the panel narrows down its length; too little and the edge loops. Neither can be fixed afterwards.',
          es: 'Aquí la trama gira y vuelve a entrar. Demasiada tensión mete la tela hacia adentro y el lienzo se angosta a lo largo; demasiado poca y la orilla queda con bucles. Ninguna de las dos se arregla después.',
        },
        meaning: {
          en: 'The first thing an experienced buyer in Nobsa looks at, and the last thing a visitor notices.',
          es: 'Lo primero que mira un comprador con experiencia en Nobsa, y lo último que nota un visitante.',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Ruana',
        gloss: { en: 'The open highland poncho', es: 'El poncho abierto del altiplano' },
        note: {
          en: 'Two panels joined with a neck slit. No shaping, no fastening, no lining.',
          es: 'Dos lienzos unidos con una abertura de cuello. Sin entalle, sin cierre, sin forro.',
        },
      },
      {
        term: 'Cabuya',
        gloss: { en: 'Spun fique thread or rope', es: 'Hilo o soga de fique hilado' },
        note: {
          en: 'The other Andean fibre. Stiff, strong, and worked with an entirely different hand from wool.',
          es: 'La otra fibra andina. Rígida, fuerte, y trabajada con una mano completamente distinta a la de la lana.',
        },
      },
      {
        term: 'Huso',
        gloss: { en: 'The drop spindle', es: 'El huso de caída' },
        note: {
          en: 'A shaft and a weighted whorl. Carried and turned while walking, which is why it outlived the loom in many households.',
          es: 'Una vara y una tortera con peso. Se lleva y se hace girar caminando, y por eso sobrevivió al telar en muchas casas.',
        },
      },
    ],
    techniques: ['hilar', 'urdir', 'tinturar'],
    patternPalette: ['#E7DDD7', '#5C3D2E', '#B79C9B'],
    works: [
      {
        id: 'w1',
        title: { en: 'Ruana, undyed wool', es: 'Ruana, lana sin teñir' },
        technique: { en: 'Plain weave in two panels, joined by hand', es: 'Tafetán en dos lienzos, unidos a mano' },
        materials: { en: 'Hand-spun virgin wool', es: 'Lana virgen hilada a mano' },
        time: { en: 'About 3 weeks, not counting the spinning', es: 'Cerca de 3 semanas, sin contar el hilado' },
        scale: { en: '1.4 m across the shoulders', es: '1,4 m de hombro a hombro' },
        context: {
          en: 'Worn at dusk and at dawn, not through the day. It is a garment for two particular hours.',
          es: 'Se usa al anochecer y al amanecer, no durante el día. Es una prenda para dos horas concretas.',
        },
        plate: 'plain',
      },
      {
        id: 'w2',
        title: { en: 'Blanket, banded naturals', es: 'Cobija, franjas de colores naturales' },
        technique: { en: 'Plain weave with a heavy beat', es: 'Tafetán con batido pesado' },
        materials: { en: 'Wool sorted into four natural shades', es: 'Lana clasificada en cuatro tonos naturales' },
        time: { en: 'About 4 weeks', es: 'Cerca de 4 semanas' },
        scale: { en: '1.8 by 2.2 m', es: '1,8 por 2,2 m' },
        context: {
          en: 'The bands are fleece colours, not dye lots — which means the palette is limited by which sheep were shorn.',
          es: 'Las franjas son colores de vellón, no lotes de tintura — lo que significa que la paleta la limita cuáles ovejas se esquilaron.',
        },
        plate: 'plain',
      },
      {
        id: 'w3',
        title: { en: 'Fique mat', es: 'Estera de fique' },
        technique: { en: 'Coarse plain weave in cabuya', es: 'Tafetán grueso en cabuya' },
        materials: { en: 'Spun fique', es: 'Fique hilado' },
        time: { en: 'About 30 hours', es: 'Cerca de 30 horas' },
        scale: { en: '90 by 140 cm', es: '90 por 140 cm' },
        context: {
          en: 'Floor use. Fique is abrasive enough that this is one of the few things it is genuinely better than wool at.',
          es: 'Uso de piso. El fique es lo bastante abrasivo como para que esta sea una de las pocas cosas en que resulta genuinamente mejor que la lana.',
        },
        plate: 'twist',
      },
    ],
    contact: {
      whatsapp: DEMO_NUMBER,
      display: '+57 300 000 0000',
      hours: { en: 'Weekday mornings', es: 'Mañanas entre semana' },
      languages: { en: 'Spanish', es: 'Español' },
    },
  },
]

export const ARTISAN_BY_SLUG = new Map(ARTISANS.map((a) => [a.slug, a]))

export function artisansInRegion(regionId: string): Artisan[] {
  return ARTISANS.filter((a) => a.regionId === regionId)
}
