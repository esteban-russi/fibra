import type { Localized } from '../i18n'
import type { MotionKind } from './techniques'

/**
 * Artisan stories.
 *
 * CONTENT STATUS — read before editing. FIBRA's governing rule is that
 * published material is supplied and validated by the artisans and their
 * collectives. The three profiles below are the first to satisfy it: each one
 * is built from a recorded interview with the artisan herself, edited
 * curatorially but not invented. The demonstration profiles that previously
 * stood here — invented people attached to documented crafts — have been
 * removed rather than kept alongside, so that nothing on the site is a person
 * who does not exist.
 *
 * What is hers and what is ours:
 *   - SUPPLIED by the artisan: her name, community, territory, craft, the
 *     quotations, the account of who taught her, the fibre reading, the figures
 *     and what they mean, the works and the times attached to them.
 *   - CURATORIAL: the ordering into five acts, the English translation (Spanish
 *     is the language everything was said in), and the structural notes marked
 *     as such in the hotspots.
 *   - WITHHELD: the workshop telephone numbers. Publishing a real number is a
 *     separate consent from publishing a story, and it has not been given yet.
 *     `contact.published` is false and the page says so rather than linking a
 *     placeholder as though it were live.
 *
 * Semiotic hotspots keep the same discipline as before: `communityHeld` marks a
 * meaning that belongs to the community and is published only because its
 * holder stated it. Where nothing was stated, the hotspot describes structure
 * and says that it is structural.
 *
 * No photograph is attached to any of these profiles. The site's photographic
 * registry holds openly licensed documentary images of other people and other
 * regions; using one of them as the opening image of a named living artisan
 * would misrepresent both. Drawn plates stand in until these workshops supply
 * their own images.
 */

export type Hotspot = {
  id: string
  /** Position as a percentage of the pattern plate. */
  x: number
  y: number
  name: Localized
  /** What is structurally happening at this point — verifiable from the weave. */
  structure: Localized
  /** What the figure carries. Published only when its holder has stated it. */
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
  /**
   * Provenance of the published material. `interview` means the profile was
   * built from a recorded conversation with the artisan and edited
   * curatorially — the person, the voice and the works are hers.
   */
  sourcing: 'interview'
  /** The notice this particular record carries, in its own words. */
  notice: Localized
  name: string
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
    /** Stated per artisan: not every workshop works only in natural fibre. */
    material: Localized
    /** How consent was given, in the terms in which it was given. */
    consent: Localized
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
    /**
     * Digits for wa.me / tel:. Empty while `published` is false — the UI must
     * not render a link it cannot honour.
     */
    whatsapp: string
    display: Localized
    /** True only once the artisan has authorised publication of her number. */
    published: boolean
    hours: Localized
    languages: Localized
  }
}

export const ARTISANS: Artisan[] = [
  // ===========================================================================
  // Luz María Rodríguez Rodríguez — Sutatausa, Cundinamarca
  // ===========================================================================
  {
    slug: 'luz-maria-rodriguez',
    sourcing: 'interview',
    notice: {
      en: 'Curatorial content, published for cultural visibility and the preservation of memory.',
      es: 'Contenido curatorial con fines de visibilización cultural y preservación de memoria.',
    },
    name: 'Luz María Rodríguez Rodríguez',
    community: {
      en: 'Tejilarte collective and training school — the campesina network of the Ubaté valley',
      es: 'Colectivo y Escuela de Formación Tejilarte — red campesina del valle de Ubaté',
    },
    territory: {
      en: 'Vereda Peñas de Cajón, Sutatausa, Cundinamarca',
      es: 'Vereda Peñas de Cajón, Sutatausa, Cundinamarca',
    },
    regionId: 'andina',
    craft: {
      en: 'Spinning, flat-bed machine weaving and natural dyeing',
      es: 'Hilatura, tejeduría en máquina rectilínea y tinturado natural',
    },
    openingImage: null,
    standfirst: {
      en: 'Master weaver and community leader, more than two decades into the safeguarding of textile knowledge in Cundinamarca. From her native Peñas de Cajón she has drawn spinners and weavers together across five municipalities to give the campesino craft standing against industrial terms.',
      es: 'Maestra tejedora y líder comunitaria con más de dos décadas impulsando la salvaguardia del saber textil en Cundinamarca. Desde su natal Peñas de Cajón ha articulado a hilanderas y artesanas de cinco municipios para dignificar el oficio campesino frente a las dinámicas industriales.',
    },
    quote: {
      en: 'For me a piece is authentic when the material is 100% accounted for: Elenita looked after the sheep, Marina sheared it, Florencio or Tránsito spun the wool, Luz María dyed it and José wove it.',
      es: 'Para mí una pieza auténtica es que el material sea 100% garantizado: Elenita cuidó la oveja, Marina la esquiló, Florencio o Tránsito hilaron la lana, Luz María tinturó y José la tejió.',
    },
    quoteAttribution: {
      en: 'From her interview for FIBRA',
      es: 'De su entrevista para FIBRA',
    },
    seal: {
      authorship: 'Luz María Rodríguez Rodríguez',
      affiliation: {
        en: 'Tejilarte collective and training school',
        es: 'Colectivo y Escuela de Formación Tejilarte',
      },
      origin: {
        en: 'Sutatausa, Cundinamarca, Andean region, Colombia',
        es: 'Sutatausa, Cundinamarca, Región Andina, Colombia',
      },
      material: {
        en: '100% virgin wool from local sheep, with natural and eco-friendly dyes',
        es: '100% lana virgen de oveja local, con tintes naturales y ecoamigables',
      },
      consent: {
        en: 'A pedagogical project endorsed by the network of sabedoras of the Ubaté province',
        es: 'Proyecto pedagógico avalado por la red de sabedoras de la provincia de Ubaté',
      },
    },
    taughtBy: {
      en: 'Her mother and the school and vereda tradition of Peñas de Cajón; later the master weaver Ada — “Adita” — in Bogotá for the machine, with technical advice from Artesanías de Colombia',
      es: 'Su madre y la tradición escolar y veredal de Peñas de Cajón; después la maestra Ada — «Adita» — en Bogotá para la máquina, con asesoría técnica de Artesanías de Colombia',
    },
    memory: {
      en: [
        'She started at seven. Shearing, spinning and weaving arrived as homework — the school set embroidery and she returned woven pieces instead — and the work quickly found its own use in the vereda: as a girl she made the covers that dressed the first refrigerators and the first televisions to reach those houses. The objects were new. The technique used to clothe them was not.',
        'At sixteen the CAR selected her, through the Checua project, to lead rural training, and more than twenty years as a community trainer followed. The Tejilarte festival and collective grew out of a practical problem rather than a cultural one: women in isolated veredas had the knowledge and no way to reach a market. She has since worked across Ubaté, Cucunubá, Guachetá, Carupa and Tausa, against a steady drift of hands away from the craft towards mining and the flower plantations.',
        'What she insists on is that a woollen piece is not made by a person but by a sequence. “There is a chain in getting a product made,” she says: “sometimes as many as ten hands are in that work.” Whoever raised the sheep, whoever sheared it, whoever spun, whoever dyed, whoever wove. Naming all of them is not sentiment — it is what she means by traceability, and it is the reason she can say a piece is 100% accounted for.',
      ],
      es: [
        'Empezó a los siete años. La esquilada, la hilada y la tejeduría le llegaron como tarea de la escuela — pedían bordado y ella entregaba piezas tejidas — y el trabajo encontró pronto su uso propio en la vereda: de niña hizo las fundas que vistieron las primeras neveras y los primeros televisores que llegaron a esas casas. Los objetos eran nuevos. La técnica con que se los vistió no lo era.',
        'A los dieciséis la CAR la seleccionó, a través del proyecto Checua, para liderar capacitaciones rurales, y de ahí siguieron más de veinte años como formadora comunitaria. El festival y el colectivo Tejilarte nacieron de un problema práctico antes que cultural: las mujeres de veredas aisladas tenían el saber y no tenían cómo llegar a un mercado. Desde entonces ha trabajado en Ubaté, Cucunubá, Guachetá, Carupa y Tausa, contra un desplazamiento sostenido de manos del oficio hacia la minería y los cultivos de flores.',
        'En lo que insiste es en que una pieza de lana no la hace una persona sino una secuencia. «Hay una cadena en el momento de lograr elaborar un producto», dice: «son a veces hasta 10 manos en ese trabajo». Quien crió la oveja, quien la esquiló, quien hiló, quien tinturó, quien tejió. Nombrarlos a todos no es sentimentalismo: es lo que ella entiende por trazabilidad, y es la razón por la que puede decir que una pieza está 100% garantizada.',
      ],
    },
    fibre: {
      label: {
        en: 'Virgin wool from high-Andean grazing, undyed and dyed',
        es: 'Lana virgen de oveja de pastoreo altoandino, cruda y tinturada',
      },
      fibre: 'wool',
      twist: 'Z',
      reading: {
        en: [
          'Spun on a traditional drop spindle, in Z or in S according to what the piece needs. The direction is a decision, not a habit: it sets which way the cloth wants to bias once it is off the machine.',
          'The thread is deliberately irregular. Diameter varies along its length, so it takes dye at slightly different rates, and a cloth woven from it has a depth that uniform mill yarn does not reach.',
          'The hand is rustic and very warm, and the cloth runs from medium to heavy on the machine or the loom. This is fibre for the páramo, and it is not trying to be soft.',
        ],
        es: [
          'Hilada en huso tradicional, en Z o en S según lo que la pieza necesite. La dirección es una decisión y no una costumbre: define hacia dónde va a querer sesgar la tela una vez fuera de la máquina.',
          'El hilo es deliberadamente irregular. El diámetro varía a lo largo de su recorrido, así que toma la tintura a ritmos algo distintos, y una tela tejida con él tiene una profundidad a la que el hilo industrial uniforme no llega.',
          'El tacto es rústico y de mucho abrigo, y la tela va de densidad media a pesada en máquina o en telar. Esta es fibra para el páramo, y no pretende ser suave.',
        ],
      },
    },
    hotspots: [
      {
        id: 'guardas',
        x: 28,
        y: 32,
        name: { en: 'Guardas — campesino Andean lines', es: 'Guardas y líneas campesinas andinas' },
        structure: {
          en: 'Warp and weft in undyed and dyed wool, set out in blocks of ochre and grey. The bands are counted into the warp before weaving starts and cannot be moved afterwards.',
          es: 'Urdimbre y trama en lana cruda y tinturada, dispuestas en bloques de color ocre y gris. Las franjas se cuentan en la urdimbre antes de empezar a tejer y después no se pueden mover.',
        },
        meaning: {
          en: 'As she states it: the broken landscape of the peñas, and the root of Andean grazing.',
          es: 'Según ella lo enuncia: el paisaje quebrado de las peñas y la raíz del pastoreo andino.',
        },
        communityHeld: true,
      },
      {
        id: 'crudo',
        x: 62,
        y: 48,
        name: { en: 'The undyed block', es: 'El bloque en crudo' },
        structure: {
          en: 'Wool left the colour the sheep grew it. Nothing has been added here, and the tone varies from fleece to fleece rather than from batch to batch.',
          es: 'Lana dejada en el color en que la crió la oveja. Aquí no se ha añadido nada, y el tono varía de vellón en vellón antes que de lote en lote.',
        },
        meaning: {
          en: 'Structural. The undyed passages are how a dyed piece is read: without them there is no reference against which the botanical colour can be judged.',
          es: 'Estructural. Los pasajes en crudo son la manera de leer una pieza tinturada: sin ellos no hay referencia contra la cual juzgar el color botánico.',
        },
        communityHeld: false,
      },
      {
        id: 'trama',
        x: 82,
        y: 68,
        name: { en: 'Hand-spun weft', es: 'Trama hilada a mano' },
        structure: {
          en: 'Every pass carries a thread of uneven diameter, so the cloth closes unevenly and traps air. That is where the warmth comes from — not from thickness.',
          es: 'Cada pasada lleva un hilo de diámetro desigual, así que la tela cierra de manera despareja y atrapa aire. De ahí viene el abrigo — no del grosor.',
        },
        meaning: {
          en: 'Structural. A perfectly even weft in this cloth would be evidence of industrial yarn, which is the one thing the seal on this piece rules out.',
          es: 'Estructural. Una trama perfectamente pareja en esta tela sería prueba de hilo industrial, que es justamente lo que el sello de esta pieza excluye.',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Esquilada',
        gloss: { en: 'The traditional cutting of the fleece', es: 'Corte tradicional del vellón' },
        note: {
          en: 'The first link in the chain and a separate trade from spinning. Whoever shears decides how much usable staple length the spinner will have.',
          es: 'El primer eslabón de la cadena y un oficio distinto del hilado. Quien esquila decide cuánta longitud de fibra aprovechable tendrá quien hila.',
        },
      },
      {
        term: 'Hilada',
        gloss: { en: 'The twisting of the wool', es: 'Torsión de la lana' },
        note: {
          en: 'Done on the spindle or the rueca. It is the operation that converts a fleece into something a machine can accept, and the slowest step in the sequence.',
          es: 'Se hace en huso o en rueca. Es la operación que convierte un vellón en algo que una máquina puede aceptar, y el paso más lento de la secuencia.',
        },
      },
      {
        term: 'Tejilarte',
        gloss: { en: 'The joining of knowledge and fair market', es: 'Unión de saberes y mercado justo' },
        note: {
          en: 'Her own coinage, and the name of both the collective and the festival. It names the problem it was built to solve: knowledge held in isolated veredas with no route to a buyer.',
          es: 'Un término suyo, y el nombre del colectivo y del festival a la vez. Nombra el problema para el que se construyó: saberes guardados en veredas aisladas sin ruta hacia un comprador.',
        },
      },
    ],
    techniques: ['hilar', 'tinturar', 'urdir'],
    patternPalette: ['#E6DCC9', '#4A3527', '#A8752F'],
    works: [
      {
        id: 'w1',
        title: { en: 'Manta / campesina ruana in virgin wool', es: 'Manta / ruana campesina en lana virgen' },
        technique: {
          en: 'Hand-spun, woven on a flat-bed machine and on the loom',
          es: 'Hilado a mano, tejeduría en máquina rectilínea y en telar',
        },
        materials: { en: '100% virgin wool from local sheep', es: '100% lana virgen de oveja local' },
        time: {
          en: '3 to 4 weeks — the whole chain, from shearing to finishing',
          es: '3 a 4 semanas — la cadena completa, del esquilado al acabado',
        },
        scale: { en: '180 × 140 cm', es: '180 × 140 cm' },
        context: {
          en: 'Worn for thermal protection in the páramo and in cold country. Not a display piece: it is the garment the work was invented for.',
          es: 'Indumentaria de protección térmica para el páramo y el clima frío. No es pieza de exhibición: es la prenda para la que se inventó el trabajo.',
        },
        plate: 'plain',
      },
    ],
    contact: {
      whatsapp: '',
      display: { en: 'Number not yet published', es: 'Número aún no publicado' },
      published: false,
      hours: { en: 'Monday to Friday, 8:00 to 17:00', es: 'Lunes a viernes, de 8:00 a 17:00' },
      languages: { en: 'Spanish', es: 'Español' },
    },
  },

  // ===========================================================================
  // Flor Imbacuan — Resguardo de Carlosama, Nariño
  // ===========================================================================
  {
    slug: 'flor-imbacuan',
    sourcing: 'interview',
    notice: {
      en: 'A record of intangible cultural heritage.',
      es: 'Registro de patrimonio cultural inmaterial.',
    },
    name: 'Flor Imbacuan',
    community: {
      en: 'Los Pastos indigenous people — Resguardo Indígena de Carlosama',
      es: 'Pueblo indígena de Los Pastos — Resguardo Indígena de Carlosama',
    },
    territory: {
      en: 'Resguardo Indígena de Carlosama, Nariño, on the Ecuadorian border',
      es: 'Resguardo Indígena de Carlosama, Nariño, frontera con Ecuador',
    },
    regionId: 'andina',
    craft: {
      en: 'Ancestral weaving on the Huanga vertical loom, and etnomoda',
      es: 'Tejeduría ancestral en Huanga (telar vertical) y etnomoda',
    },
    openingImage: null,
    standfirst: {
      en: 'Master weaver and indigenous designer of the Pasto people, leading a movement of healing, memory and community tourism through the collective label Amor / Etnomoda. She brought the Huanga loom back as an act of resistance and of standing for indigenous women.',
      es: 'Maestra y diseñadora indígena del pueblo Pasto que lidera un movimiento de sanación, memoria y etnoturismo a través de la marca comunitaria Amor / Etnomoda. Rescató el telar en Huanga como un acto de resistencia y de dignificación de la mujer indígena.',
    },
    quote: {
      en: 'Weaving is a conversation between the woman and the warp. The weaving feels, the weaving breathes, the weaving falls ill… I always say that weaving is giving living script to our identity as a people.',
      es: 'El tejido es un diálogo entre la mujer y la urdimbre. El tejido siente, el tejido respira, el tejido se enferma… Yo siempre digo que el tejido es darle escritura viva a nuestra identidad como pueblo.',
    },
    quoteAttribution: {
      en: 'From her interview for FIBRA',
      es: 'De su entrevista para FIBRA',
    },
    seal: {
      authorship: 'Flor Imbacuan',
      affiliation: {
        en: 'Los Pastos indigenous people — Resguardo de Carlosama, a network of 47 families',
        es: 'Pueblo indígena de Los Pastos — Resguardo de Carlosama, red de 47 familias',
      },
      origin: { en: 'Nariño, Colombia', es: 'Nariño, Colombia' },
      material: {
        en: 'Native sheep wool, Andean alpaca, cocoon silk from Cauca and bamboo fibre',
        es: 'Lana de oveja nativa, alpaca andina, seda de capullo del Cauca y fibra de bambú',
      },
      consent: {
        en: 'A process endorsed by the authorities and the sabedoras of the resguardo',
        es: 'Proceso avalado por las autoridades y las sabedoras del resguardo',
      },
    },
    taughtBy: {
      en: 'Her mother, grandmother, great-grandmother and great-great-grandmother — matrilineal transmission across four generations',
      es: 'Su madre, su abuela, su bisabuela y su tatarabuela — transmisión matrilineal a lo largo de cuatro generaciones',
    },
    memory: {
      en: [
        'She learned the craft from the womb. Four generations of women — mother, grandmother, great-grandmother, great-great-grandmother — hold the line she describes, and she is explicit that it is a line and not a school: the knowledge arrived at home, in the ordinary hours, before it had a name.',
        'What she left, she left for a reason. Coming out of an environment of violence and structural machismo, she went away to study fashion design, and returned to the resguardo in 2011 to find the Huanga loom on the point of disappearing. Reviving it meant going house by house to convince the sabedoras that the loom was worth setting up again. Forty-seven families are in the network that came out of those conversations.',
        'The workshops now run in the homes, with children and young people, and she is direct about what they are for: suicide and youth violence in the resguardo are the problem the weaving is set against. “More than a ruana, it is building life,” she says. The teaching is the work; the garment is what the work leaves behind.',
      ],
      es: [
        'Aprendió el oficio desde el vientre materno. Cuatro generaciones de mujeres — madre, abuela, bisabuela, tatarabuela — sostienen el linaje que describe, y es explícita en que se trata de un linaje y no de una escuela: el saber llegó en la casa, en las horas corrientes, antes de tener nombre.',
        'Lo que dejó, lo dejó por una razón. Saliendo de un entorno de violencia y machismo estructural, se fue a estudiar diseño de modas, y regresó al resguardo en 2011 para encontrar el telar en Huanga a punto de desaparecer. Revivirlo significó ir casa por casa a convencer a las sabedoras de que valía la pena volver a armarlo. Cuarenta y siete familias componen la red que salió de esas conversaciones.',
        'Los talleres funcionan hoy en los hogares, con niños y jóvenes, y ella es directa sobre para qué son: el suicidio y la violencia juvenil en el resguardo son el problema contra el que se pone el tejido. «Más que una ruana, es construir vida», dice. La enseñanza es el trabajo; la prenda es lo que el trabajo deja atrás.',
      ],
    },
    fibre: {
      label: {
        en: 'Native sheep wool, southern Andean alpaca and cocoon silk',
        es: 'Lana de oveja nativa, alpaca del sur andino y seda de capullo',
      },
      fibre: 'wool',
      twist: 'S',
      reading: {
        en: [
          'Spun and tizado by hand, in the ancestral manner. The loom itself uses no electricity and no fuel, so every variable in the thread is set by hand before it reaches the warp.',
          'Alpaca and sheep wool are not interchangeable here. Alpaca carries the drape; the sheep wool carries the body and the warmth. Which one dominates a piece is decided at the warping stage.',
          'The finished cloth is dense and structured, with a heavy fall and thermal body that holds its shape. A Huanga piece hangs from the shoulder rather than following it.',
        ],
        es: [
          'Hilado y tizado a mano, a la manera ancestral. El telar mismo no usa electricidad ni combustibles, así que cada variable del hilo se fija con la mano antes de llegar a la urdimbre.',
          'La alpaca y la lana de oveja no son intercambiables aquí. La alpaca lleva la caída; la lana de oveja lleva el cuerpo y el abrigo. Cuál domina una pieza se decide en el urdido.',
          'La tela terminada es densa y estructurada, de gran caída y con un cuerpo térmico que sostiene la forma. Una pieza en Huanga cuelga del hombro antes que seguirlo.',
        ],
      },
    },
    hotspots: [
      {
        id: 'sol-de-los-pastos',
        x: 30,
        y: 30,
        name: { en: 'Sol de los Pastos', es: 'Sol de los Pastos' },
        structure: {
          en: 'An eight-pointed star counted into the vertical warp. Because the Huanga is worked upward from the bottom, the figure must be resolved symmetrically in both directions from a centre the weaver has to establish before she reaches it.',
          es: 'Una estrella de ocho puntas contada en la urdimbre vertical. Como la Huanga se trabaja de abajo hacia arriba, la figura debe resolverse simétricamente en ambos sentidos desde un centro que quien teje ha de establecer antes de llegar a él.',
        },
        meaning: {
          en: 'As stated by her: the cosmovision of the Pasto people — the centre of the universe and the agricultural cycle.',
          es: 'Según ella lo enuncia: la cosmovisión del pueblo Pasto — el centro del universo y el ciclo agrícola.',
        },
        communityHeld: true,
      },
      {
        id: 'churo-cosmico',
        x: 64,
        y: 52,
        name: { en: 'Churo Cósmico — the spiral', es: 'Churo Cósmico — la espiral' },
        structure: {
          en: 'A spiral built by displacing the figure one count per row, so the curve is an accumulation of straight steps. It is unforgiving: a single miscount unwinds the whole turn.',
          es: 'Una espiral construida desplazando la figura un punto por hilera, de modo que la curva es una acumulación de pasos rectos. No perdona: un solo error de cuenta desenrolla la vuelta entera.',
        },
        meaning: {
          en: 'As stated by her: origin, circular time, the return, and the evolution of life.',
          es: 'Según ella lo enuncia: el origen, el tiempo circular, el retorno y la evolución de la vida.',
        },
        communityHeld: true,
      },
      {
        id: 'dualidad',
        x: 84,
        y: 74,
        name: { en: 'Dualidad', es: 'Dualidad' },
        structure: {
          en: 'Contrasting colours interlaced so that neither reads as ground and neither as figure. The pairing is held across the whole width rather than applied as a border.',
          es: 'Colores contrastantes entrelazados de modo que ninguno se lee como fondo y ninguno como figura. La pareja se sostiene a lo ancho de toda la pieza y no se aplica como un borde.',
        },
        meaning: {
          en: 'As stated by her: cosmic balance — the two halves that require each other.',
          es: 'Según ella lo enuncia: el equilibrio cósmico — las dos mitades que se requieren mutuamente.',
        },
        communityHeld: true,
      },
    ],
    glossary: [
      {
        term: 'Huanga',
        gloss: { en: 'The traditional vertical loom of Los Pastos', es: 'Telar vertical tradicional de Los Pastos' },
        note: {
          en: 'A wooden frame worked standing, upward from the bottom edge, with no electricity and no fuel. It was close to disappearing in Carlosama before 2011.',
          es: 'Una estructura de madera que se trabaja de pie, de abajo hacia arriba, sin electricidad ni combustibles. Estuvo cerca de desaparecer en Carlosama antes de 2011.',
        },
      },
      {
        term: 'Churo',
        gloss: { en: 'Cosmic spiral', es: 'Espiral cósmica' },
        note: {
          en: 'A figure of the Pasto repertoire. Its reading is community-held knowledge and appears here because she stated it.',
          es: 'Una figura del repertorio Pasto. Su lectura es saber comunitario y aparece aquí porque ella la enunció.',
        },
      },
      {
        term: 'Pañolón / Anaco / Follado',
        gloss: { en: 'Ceremonial and everyday dress', es: 'Indumentaria ceremonial y cotidiana' },
        note: {
          en: 'The named garments of the territory. Each has its own construction, and the distinction between ceremonial and everyday is not a matter of decoration.',
          es: 'Las prendas con nombre del territorio. Cada una tiene su propia construcción, y la distinción entre lo ceremonial y lo cotidiano no es asunto de adorno.',
        },
      },
    ],
    techniques: ['urdir', 'hilar', 'tinturar'],
    patternPalette: ['#E9DECB', '#2B2733', '#C1352F'],
    works: [
      {
        id: 'w1',
        title: { en: 'Ceremonial ruana in Huanga', es: 'Ruana ceremonial en Huanga' },
        technique: {
          en: 'Woven on the Huanga indigenous vertical loom',
          es: 'Tejido en telar vertical indígena Huanga',
        },
        materials: { en: 'Sheep wool and alpaca fibre', es: 'Lana de oveja y fibra de alpaca' },
        time: {
          en: '4 to 6 weeks of warping and weaving by hand',
          es: '4 a 6 semanas de urdido y tejido manual',
        },
        scale: { en: 'A single piece, fitted to the body', es: 'Pieza única, ajustada al cuerpo' },
        context: {
          en: 'A garment of warmth, of territorial identity and of spiritual protection. As she puts it: no two are alike, because each one has a soul of its own.',
          es: 'Prenda de abrigo, de identidad territorial y de protección espiritual. Como ella lo dice: no hay dos iguales, porque cada una tiene alma propia.',
        },
        plate: 'plain',
      },
    ],
    contact: {
      whatsapp: '',
      display: { en: 'Number not yet published', es: 'Número aún no publicado' },
      published: false,
      hours: {
        en: 'According to the community times of the resguardo',
        es: 'Según los tiempos comunitarios del resguardo',
      },
      languages: { en: 'Spanish', es: 'Español' },
    },
  },

  // ===========================================================================
  // Ada «Adita» — Chapinero, Bogotá D.C.
  // ===========================================================================
  {
    slug: 'adita-chapinero',
    sourcing: 'interview',
    notice: {
      en: 'A profile of teaching and of experiment.',
      es: 'Perfil formativo y experimental.',
    },
    name: 'Ada «Adita»',
    community: {
      en: 'Family workshop and academy of urban weaving, Chapinero',
      es: 'Taller y academia familiar de tejeduría urbana, Chapinero',
    },
    territory: { en: 'Chapinero, Calle 63, Bogotá D.C.', es: 'Chapinero, Calle 63, Bogotá D.C.' },
    regionId: 'andina',
    craft: {
      en: 'Hand flat-bed machine knitting, fine crochet and three-dimensional pattern-making',
      es: 'Tejeduría en máquina rectilínea manual, crochet fino y patronaje tridimensional',
    },
    openingImage: null,
    standfirst: {
      en: 'Teacher of generations of designers and weavers in Bogotá. Self-taught, and exceptional at it: she translates complex sketches and period silhouettes straight onto the knitting machine, and defends weaving as a rigorous profession rather than a pastime.',
      es: 'Maestra de generaciones de diseñadores y tejedoras en Bogotá. Autodidacta y excepcional en ello: traduce bocetos complejos y siluetas de época directamente a la máquina de tejer, y defiende el tejido como una profesión rigurosa y no como un pasatiempo.',
    },
    quote: {
      en: 'I like working very fine things, veil-like; I like transparency, I like it not to come out heavy… The simple machine is very versatile and a delight to explore. In teaching, one passes on the knowledge so that whoever wants to learn can make a living from it.',
      es: 'A mí me gusta trabajar cosas muy finitas, tipo velos; me gusta la transparencia, que no quede pesado… La máquina sencilla es muy versátil y deliciosa de explorar. Al enseñar uno transmite el conocimiento para que el que quiera aprender pueda vivir de él.',
    },
    quoteAttribution: {
      en: 'From her interview for FIBRA',
      es: 'De su entrevista para FIBRA',
    },
    seal: {
      authorship: 'Ada «Adita»',
      affiliation: {
        en: 'Family workshop and academy of urban weaving, Chapinero',
        es: 'Taller y academia familiar de tejeduría urbana, Chapinero',
      },
      origin: {
        en: 'Bogotá D.C., Cundinamarca, Andean region, Colombia',
        es: 'Bogotá D.C., Cundinamarca, Región Andina, Colombia',
      },
      material: {
        en: 'Extra-fine yarns, silks, cottons and light blends for veils — not exclusively natural fibre, and stated as such',
        es: 'Hilos extrafinos, sedas, algodones y mezclas livianas para velos — no exclusivamente fibra natural, y así se declara',
      },
      consent: {
        en: 'Independent pedagogical knowledge, passed on by word of mouth',
        es: 'Saber pedagógico independiente, transmitido de voz a voz',
      },
    },
    taughtBy: {
      en: 'Her elder sister, for crochet; the machine she learned by watching her mother’s; and continuous empirical experiment alongside her sisters Laura and Fabiola',
      es: 'Su hermana mayor, para el crochet; la máquina la aprendió observando la de su madre; y experimentación empírica continua junto a sus hermanas Laura y Fabiola',
    },
    memory: {
      en: [
        'It began as play. She and her sisters dressed dolls for home theatre productions, and the clothes had to fit a body and hold together — which is, in miniature, the whole problem of the trade. Crochet came from her elder sister. Nobody set out to train her.',
        'When her mother acquired one of the first industrial machines to reach the country, Adita learned it in secret, watching the mechanism rather than being shown it. That is the origin of her particular refusal: she will not work from punched cards. Cards impose the pattern from outside, and she would rather the fingers and the mechanical buttons govern the openwork, because that is where a design can still change while it is being made.',
        'The workshop on the 63 has since been an epicentre of experiment rather than a production floor. Artisans from several regions and young students have come through it, and the pieces that leave it are often co-authored — a designer arrives with a silhouette that has no obvious construction, and she finds one. Her insistence throughout is that this is a profession with its own rigour, and that treating it as a hobby is what keeps it underpaid.',
      ],
      es: [
        'Empezó jugando. Con sus hermanas vestía muñecos para obras de teatro caseras, y la ropa tenía que caber en un cuerpo y sostenerse — que es, en miniatura, el problema entero del oficio. El crochet vino de su hermana mayor. Nadie se propuso formarla.',
        'Cuando su madre adquirió una de las primeras máquinas industriales que llegaron al país, Adita la aprendió a escondidas, observando el mecanismo en lugar de que se lo enseñaran. De ahí viene su negativa particular: no trabaja con tarjetas perforadas. Las tarjetas imponen el patrón desde afuera, y ella prefiere que los dedos y los botones mecánicos gobiernen el calado, porque ahí es donde un diseño todavía puede cambiar mientras se hace.',
        'El taller de la 63 ha sido desde entonces un epicentro de experimentación antes que un piso de producción. Por él han pasado artesanas de varias regiones y jóvenes estudiantes, y las piezas que salen son a menudo de coautoría: llega un diseñador con una silueta que no tiene construcción evidente, y ella le encuentra una. Su insistencia, en todo momento, es que este es un oficio con rigor propio, y que tratarlo como pasatiempo es lo que lo mantiene mal pagado.',
      ],
    },
    fibre: {
      label: {
        en: 'Fine yarns, silks and light wools for high-gauge machines',
        es: 'Hilos delgados, sedas y lanas finas para máquinas de alta galga',
      },
      fibre: 'cotton',
      twist: 'Z',
      reading: {
        en: [
          'A fine, even twist — the opposite requirement to hand-spun wool. A high-gauge needle bed will not accept an irregular thread, so the regularity here is a condition of the machine rather than an aesthetic choice.',
          'The finished hand is a transparent veil: light fall, fluidity, and open work where the stitches have been moved by hand.',
          'Density is deliberately low. She works against weight, and a piece that comes out heavy is, by her own account, a piece that has failed.',
        ],
        es: [
          'Una torsión fina y pareja — la exigencia contraria a la de la lana hilada a mano. Una cama de agujas de alta galga no acepta un hilo irregular, así que aquí la regularidad es una condición de la máquina antes que una elección estética.',
          'El tacto terminado es un velo transparente: caída ligera, fluidez, y calados abiertos donde los puntos se han movido a mano.',
          'La densidad es deliberadamente baja. Ella trabaja contra el peso, y una pieza que sale pesada es, según sus propias palabras, una pieza que falló.',
        ],
      },
    },
    hotspots: [
      {
        id: 'velo',
        x: 26,
        y: 28,
        name: { en: 'Veil stitch / hand openwork', es: 'Puntada en velo / calado manual' },
        structure: {
          en: 'Stitches lifted and re-hung by hand on the needle bed to open a transparency. Nothing in the machine produces this; it is done between rows, one point at a time.',
          es: 'Puntos levantados y vueltos a colgar a mano sobre la cama de agujas para abrir una transparencia. La máquina no produce esto por sí sola; se hace entre hileras, punto por punto.',
        },
        meaning: {
          en: 'Her own device, not a traditional figure. The transparency is the point of the piece rather than an ornament applied to it.',
          es: 'Un recurso suyo, no una figura tradicional. La transparencia es el asunto de la pieza y no un ornamento aplicado sobre ella.',
        },
        communityHeld: false,
      },
      {
        id: 'menguados',
        x: 60,
        y: 50,
        name: { en: 'Menguados and circular forms', es: 'Menguados y hormas circulares' },
        structure: {
          en: 'Stitches reduced on the machine to shape armholes, necklines and three-dimensional fall without a seam. The garment acquires its volume as it is knitted, not afterwards at the cutting table.',
          es: 'Reducción de puntos en máquina para lograr sisas, escotes y caídas tridimensionales sin costura. La prenda adquiere su volumen mientras se teje, no después en la mesa de corte.',
        },
        meaning: {
          en: 'Structural. This is the technique that lets a sketch be answered directly on the machine, and it is what she is sought out for.',
          es: 'Estructural. Es la técnica que permite responder un boceto directamente en la máquina, y es aquello por lo que la buscan.',
        },
        communityHeld: false,
      },
      {
        id: 'anos-veinte',
        x: 82,
        y: 72,
        name: { en: 'Nineteen-twenties structure / lace', es: 'Estructura años veinte / encaje' },
        structure: {
          en: 'Historical silhouettes and couture textures rebuilt in knit. A cut-and-sewn structure has to be re-derived as a sequence of rows before it can exist on a needle bed.',
          es: 'Siluetas históricas y texturas de alta costura reconstruidas en tejido. Una estructura de corte y confección tiene que volver a deducirse como una secuencia de hileras antes de poder existir en una cama de agujas.',
        },
        meaning: {
          en: 'Her own repertoire. “What is authentic,” she says, “is what you create with your own head — a garment you know nobody else is going to have.”',
          es: 'Repertorio propio. «Para mí lo auténtico es lo que tú creas con tu propia cabeza», dice, «una prenda que sabes que nadie más va a tener».',
        },
        communityHeld: false,
      },
    ],
    glossary: [
      {
        term: 'Máquina sencilla',
        gloss: {
          en: 'The manual, non-computerised machine where the hand governs the openwork',
          es: 'La máquina manual, no computarizada, donde la mano gobierna el calado',
        },
        note: {
          en: 'Needles are manipulated by buttons rather than by punched cards. Slower, and the only way the pattern stays negotiable while the piece is on the bed.',
          es: 'Las agujas se manipulan por botones y no por tarjetas perforadas. Más lento, y la única manera de que el patrón siga siendo negociable mientras la pieza está en la cama.',
        },
      },
      {
        term: 'Velo',
        gloss: { en: 'An ultra-fine translucent knit', es: 'Tejido ultrafino translúcido' },
        note: {
          en: 'Her preferred register. It is harder than a dense knit, because there is less structure holding the errors out of sight.',
          es: 'Su registro preferido. Es más difícil que un tejido denso, porque hay menos estructura sosteniendo los errores fuera de la vista.',
        },
      },
      {
        term: 'Maquila vs. taller',
        gloss: { en: 'The single piece against the production run', es: 'La pieza única frente a la serie masiva' },
        note: {
          en: 'The distinction she works by. A maquila reproduces a specification; a taller answers a problem, and charges for having answered it.',
          es: 'La distinción con la que trabaja. Una maquila reproduce una especificación; un taller resuelve un problema, y cobra por haberlo resuelto.',
        },
      },
    ],
    techniques: ['urdir', 'anudar'],
    patternPalette: ['#F4EDE1', '#3B3A38', '#C9B9A2'],
    works: [
      {
        id: 'w1',
        title: {
          en: 'Dress / sheer garment in openwork knit',
          es: 'Vestido / prenda vaporosa en tejido calado',
        },
        technique: {
          en: 'Knitted on the hand flat-bed machine, openwork formed by menguado',
          es: 'Tejido en máquina rectilínea manual, con calados por menguado',
        },
        materials: { en: 'Fine soft yarn / light blend', es: 'Hilado fino suave / mezcla liviana' },
        time: {
          en: '2 to 3 weeks of modelling and knitting directly on the machine',
          es: '2 a 3 semanas de modelado y tejido directo en máquina',
        },
        scale: { en: 'Made to measure on the body', es: 'Prenda a medida sobre el cuerpo' },
        context: {
          en: 'Light dress, bridal wear, and garments where formal sensitivity is the whole brief.',
          es: 'Indumentaria ligera, trajes de novia y prendas en las que la sensibilidad formal es todo el encargo.',
        },
        plate: 'net',
      },
    ],
    contact: {
      whatsapp: '',
      display: { en: 'Number not yet published', es: 'Número aún no publicado' },
      published: false,
      hours: {
        en: 'Monday to Friday, workshop hours',
        es: 'Lunes a viernes, en jornada de taller',
      },
      languages: { en: 'Spanish', es: 'Español' },
    },
  },
]

export const ARTISAN_BY_SLUG = new Map(ARTISANS.map((a) => [a.slug, a]))

export function artisansInRegion(regionId: string): Artisan[] {
  return ARTISANS.filter((a) => a.regionId === regionId)
}
