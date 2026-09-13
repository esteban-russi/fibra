import type { Localized } from '../i18n'

/**
 * The five techniques: the transversal route through the archive.
 *
 * The Spanish verb is the identifier in both languages: `urdir` and `warping`
 * are not equivalents, and the craft vocabulary is the precise term. English
 * carries a gloss rather than a replacement.
 *
 * `photo` is the photograph that carries the technique across the site: the
 * route, the detail page and the artisan profiles all show the same frame, so
 * a gesture is recognisable before its name is read.
 *
 * The drawn loops that used to fill those slots now live on as icons. Each was
 * authored against the real mechanics of the technique rather than being
 * decorative — the warping mark lays parallel ends and returns, the braid mark
 * crosses three strands in strict alternation, the spin mark shows draft and
 * twist entering the fibre in opposite directions — which is exactly what makes
 * them legible at 24px, where a photograph is not.
 */
export type MotionKind = 'urdir' | 'trenzar' | 'anudar' | 'tinturar' | 'hilar'

export type Technique = {
  id: MotionKind
  slug: string
  /** The craft term, kept in Spanish in both languages. */
  term: string
  gloss: Localized
  /** Key into MEDIA for the photograph of the gesture. */
  photo: string
  /**
   * How to tighten the frame when the photograph is cropped to a card or a
   * circle: a CSS scale about `origin`, expressed as a point in the rendered
   * box rather than in the file.
   *
   * Done in CSS rather than baked in. Several of these images are share-alike
   * licensed and the registry keeps every file unmodified, so a closer frame is
   * a decision the page makes and can revise, not a new derivative work.
   */
  focus?: { origin: string; zoom: number }
  lede: Localized
  /** One line naming what the gesture *is*, shown above the expanded account. */
  gesture: Localized
  body: Localized<string[]>
  materials: Localized<string[]>
  regions: string[]
  tempo: Localized
}

export const TECHNIQUES: Technique[] = [
  {
    id: 'urdir',
    slug: 'urdir',
    term: 'Urdir',
    gloss: { en: 'to warp', es: 'preparar la urdimbre' },
    photo: 'gestoUrdir',
    lede: {
      en: 'Laying the threads that will hold the tension, and tracing — before the first pass — the exact limit and the memory of the finished cloth.',
      es: 'Tender los hilos que sostendrán la tensión y trazar, antes de la primera pasada, el límite exacto y la memoria de la tela terminada.',
    },
    gesture: {
      en: 'The tracing of the destiny of the piece.',
      es: 'El trazado del destino de la pieza.',
    },
    body: {
      en: ['Warping is the act that commits. Whoever warps walks the thread between stakes or pegs, counting every pass in their head; that count admits no error, because it defines the width of the garment and the weight the loom will bear. On the vertical loom of Carlosama or under the Wayuu arbours, warping is calculating the horizon of the cloth: to tension the warp is to lay the invisible rails along which the weft will tell its story.'],
      es: ['Urdir es el acto que compromete. Quien urde camina el hilo entre estacas o clavijas contando mentalmente cada pasada; ese conteo no admite error porque define el ancho de la prenda y el peso que resistirá el telar. En el telar vertical de Carlosama o en las enramadas wayuu, urdir es calcular el horizonte del lienzo: tensar la urdimbre es tender los rieles invisibles donde la trama contará su historia.'],
    },
    materials: {
      en: ['Virgin sheep wool', 'Hand-spun cotton', 'Fique / cabuya'],
      es: ['Lana virgen de oveja', 'Algodón hilado a mano', 'Fique / cabuya'],
    },
    regions: ['andina', 'caribe'],
    tempo: { en: 'Slow, counted, unbroken', es: 'Lento, contado, sin interrupción' },
  },

  {
    id: 'trenzar',
    slug: 'trenzar',
    term: 'Trenzar',
    gloss: { en: 'to braid', es: 'entrecruzar en oblicuo' },
    photo: 'gestoTrenzar',
    // Pull in past the floor the hat was photographed on, so the card is the
    // braid and not the parquet.
    focus: { origin: '50% 46%', zoom: 1.35 },
    lede: {
      en: 'Three or more strands crossed in living alternation, guided only by the cadence of the fingers, with no frame and no tool in between.',
      es: 'Tres o más hebras cruzadas en alternancia viva, guiadas únicamente por la cadencia de los dedos, sin bastidor ni herramienta intermediaria.',
    },
    gesture: {
      en: 'The horizontal and oblique conversation with no rigid support.',
      es: 'El diálogo horizontal y oblicuo sin soporte rígido.',
    },
    body: {
      en: ['Braiding needs no loom: the tool and the tension are the hands themselves. In the Caribbean and the inter-Andean valleys, caña flecha or palm fibre is split into fine ripios that overlap in rhythm. Every geometric crossing answers to a play of light and dark — the pintas of the sombrero vueltiao — where mathematics and botany are resolved in the air, strand after strand.'],
      es: ['El trenzado no requiere telar: la herramienta y la tensión son las propias manos. En el Caribe y los valles interandinos, la fibra de caña flecha o de palma se abre en ripios finos que se sobreponen rítmicamente. Cada cruce geométrico responde a un juego de claros y oscuros (como las pintas del sombrero vueltiao) donde la matemática y la botánica se resuelven en el aire, hebra tras hebra.'],
    },
    materials: {
      en: ['Arrow cane', 'Iraca palm', 'Coconut fibre'],
      es: ['Caña flecha', 'Palma de iraca', 'Fibra de coco'],
    },
    regions: ['caribe', 'insular'],
    tempo: { en: 'Quick, even, conversational', es: 'Rápido, parejo, conversable' },
  },

  {
    id: 'anudar',
    slug: 'anudar',
    term: 'Anudar',
    gloss: { en: 'to knot', es: 'fijar por lazada' },
    photo: 'gestoAnudar',
    lede: {
      en: 'Building a plane or a net out of cords that embrace themselves; the firmness of the structure comes from the insistence of the knot.',
      es: 'Construir un plano o red a partir de cordeles que se abrazan a sí mismos; la firmeza de la estructura nace de la insistencia del nudo.',
    },
    gesture: {
      en: 'The accumulation of holding points that build volume.',
      es: 'La acumulación de puntos de sujeción que construyen volumen.',
    },
    body: {
      en: ['In the knot the strand travels neither straight nor parallel: it turns on its own axis and takes hold of the space. From the woven fishing nets of the Pacific rivers to ceremonial gauzes and fringes, knotting makes permeable surfaces possible — meshes that strain water, or dense wrappings able to carry the weight of the harvest and of everyday community life.'],
      es: ['En el nudo, la hebra no viaja recta ni paralela: gira sobre su propio eje y aprisiona el espacio. Desde las redes de pesca cesteras de los ríos del Pacífico hasta las gasas y flecos ceremoniales, anudar permite crear superficies permeables, mallas que filtran el agua o envoltorios densos capaces de cargar el peso de la cosecha y la cotidianidad comunitaria.'],
    },
    materials: {
      en: ['Cumare / chambira cord', 'Moriche cord', 'Coconut cordage'],
      es: ['Cordel de cumare / chambira', 'Cordel de moriche', 'Cordelería de coco'],
    },
    regions: ['amazonia', 'orinoquia', 'insular'],
    tempo: { en: 'Interruptible, patient, portable', es: 'Interrumpible, paciente, portátil' },
  },

  {
    id: 'tinturar',
    slug: 'tinturar',
    term: 'Tinturar',
    gloss: { en: 'to dye', es: 'fijar color vegetal' },
    photo: 'gestoTinturar',
    lede: {
      en: 'Persuading bark, seed and mud to give up their tone, and the natural fibre to keep it against water and sun.',
      es: 'Persuadir a la corteza, la semilla y el lodo de entregar su tono, y a la fibra natural de custodiarlo frente al agua y al sol.',
    },
    gesture: {
      en: 'The territorial alchemy between botanical pigment and fibre.',
      es: 'La alquimia territorial entre el pigmento botánico y la fibra.',
    },
    body: {
      en: ['Dyeing demands knowing the times of the hillside and of the weather. Walnut roots, onion skins, achiote or mangrove mud are boiled in communal pots where virgin wool or fique rests with natural mordants. It is not a matter of covering the material with paint but of opening the pore of the strand so that it absorbs the territory and fixes an unrepeatable tone that does not fade with the years.'],
      es: ['Tinturar exige conocer los tiempos del monte y el clima. Raíces de nogal, cáscaras de cebolla, achiote o lodo de mangle se hierven en ollas comunitarias donde la lana virgen o el fique reposan con mordientes naturales. No se trata de cubrir el material con pintura, sino de abrir el poro de la hebra para que absorba el territorio y fije una tonalidad irrepetible que no destiñe con los años.'],
    },
    materials: {
      en: ['Jagua', 'Achiote / bija', 'Carayurú', 'Walnut bark', 'Iron-rich mud'],
      es: ['Jagua', 'Achiote / bija', 'Carayurú', 'Corteza de nogal', 'Barro ferroso'],
    },
    regions: ['pacifica', 'amazonia', 'andina', 'caribe'],
    tempo: { en: 'Waiting more than working', es: 'Más espera que trabajo' },
  },

  {
    id: 'hilar',
    slug: 'hilar',
    term: 'Hilar',
    gloss: { en: 'to spin', es: 'dar torsión a la fibra' },
    photo: 'gestoHilar',
    lede: {
      en: 'Turning rough fleece or plant strand into a continuous, unbreakable thread through the pulse of the hand and the turn of the spindle.',
      es: 'Transformar el vellón agreste o la hebra vegetal en un hilo continuo e irrompible mediante el pulso de la mano y el giro del huso.',
    },
    gesture: {
      en: 'The hand twist that gives loose matter its strength.',
      es: 'La torsión manual que confiere resistencia a la materia suelta.',
    },
    body: {
      en: ['Spinning is taming the shorn sheep fleece or the scraped fique fibre before either touches a needle or a loom. The spinner takes the rolag between her fingers and, turning the spindle or the wheel with a steady impulse, twists the individual strands into a single cord, even and able to hold tension. It is the origin of everything: without the patience of spinning, no ruana and no mochila would exist.'],
      es: ['Hilar es domesticar el vellón de oveja esquilado o la fibra raspada del fique antes de que toquen cualquier aguja o telar. La hilandera toma el copo entre los dedos y, haciendo girar el huso o la rueca con un impulso constante, retuerce las hebras individuales hasta formar un cabo único, homogéneo y tensable. Es el origen de todo: sin la paciencia del hilado, ninguna ruana ni mochila existiría.'],
    },
    materials: {
      en: ['Virgin sheep wool', 'Wild cotton', 'Fique'],
      es: ['Lana virgen de oveja', 'Algodón silvestre', 'Fique'],
    },
    regions: ['andina', 'caribe'],
    tempo: { en: 'Continuous, walking pace', es: 'Continuo, a paso de caminata' },
  },
]

export const TECHNIQUE_BY_SLUG = new Map(TECHNIQUES.map((g) => [g.slug, g]))
