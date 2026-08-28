import type { Localized } from '../i18n'

/**
 * The five gestures — the transversal route through the archive.
 *
 * The Spanish verb is the identifier in both languages: `urdir` and `warping`
 * are not equivalents, and the craft vocabulary is the precise term. English
 * carries a gloss rather than a replacement.
 *
 * `motion` selects which drawn loop animates the card. Each loop is authored
 * against the real mechanics of the gesture rather than being decorative: the
 * warping loop lays parallel ends and returns, the braid loop crosses three
 * strands in strict alternation, the spin loop shows draft and twist entering
 * the fibre in opposite directions.
 */
export type MotionKind = 'urdir' | 'trenzar' | 'anudar' | 'tinturar' | 'hilar'

export type Gesture = {
  id: MotionKind
  slug: string
  /** The craft term, kept in Spanish in both languages. */
  term: string
  gloss: Localized
  lede: Localized
  body: Localized<string[]>
  materials: Localized<string[]>
  regions: string[]
  tempo: Localized
  /** Description of the animation for people who cannot see it. */
  motionAlt: Localized
}

export const GESTURES: Gesture[] = [
  {
    id: 'urdir',
    slug: 'urdir',
    term: 'Urdir',
    gloss: { en: 'to warp', es: 'preparar la urdimbre' },
    lede: {
      en: 'Laying the threads that will be held under tension, and deciding — before anything is woven — how long the finished cloth can be.',
      es: 'Tender los hilos que quedarán bajo tensión y decidir — antes de tejer nada — cuánto podrá medir la tela terminada.',
    },
    body: {
      en: [
        'Warping is the gesture that commits. The weaver walks a single thread back and forth between pegs, counting, and the number of passes fixes the width of the cloth while the distance between the pegs fixes its length. Nothing about this is visible in the finished piece, and everything about the finished piece is decided here.',
        'The cross — the figure-eight where the threads swap order at one end — is the part that matters most and is easiest to lose. It keeps every end in sequence so the warp can be transferred to the loom without tangling. A warp is not measured in metres so much as in the patience required not to break the count while making it.',
      ],
      es: [
        'Urdir es el gesto que compromete. Quien teje camina un solo hilo de ida y vuelta entre estacas, contando, y el número de pasadas fija el ancho de la tela mientras la distancia entre estacas fija su largo. Nada de esto es visible en la pieza terminada, y todo lo de la pieza terminada se decide aquí.',
        'El cruce — la figura de ocho donde los hilos intercambian orden en un extremo — es la parte que más importa y la más fácil de perder. Mantiene cada cabo en secuencia para que la urdimbre pueda pasarse al telar sin enredarse. Una urdimbre no se mide tanto en metros como en la paciencia que exige no romper la cuenta mientras se hace.',
      ],
    },
    materials: {
      en: ['Virgin sheep wool', 'Hand-spun cotton', 'Fique / cabuya'],
      es: ['Lana virgen de oveja', 'Algodón hilado a mano', 'Fique / cabuya'],
    },
    regions: ['andina', 'caribe'],
    tempo: { en: 'Slow, counted, unbroken', es: 'Lento, contado, sin interrupción' },
    motionAlt: {
      en: 'A line travels the full width of a frame, turns at the far peg, and returns beside itself, building a field of parallel threads that crosses over on itself at one end.',
      es: 'Una línea recorre todo el ancho de un bastidor, gira en la estaca del extremo y vuelve junto a sí misma, construyendo un campo de hilos paralelos que se cruza sobre sí mismo en un extremo.',
    },
  },

  {
    id: 'trenzar',
    slug: 'trenzar',
    term: 'Trenzar',
    gloss: { en: 'to braid', es: 'entrecruzar en oblicuo' },
    lede: {
      en: 'Three or more strands crossing in strict alternation, worked entirely in the hand with no frame and no tool.',
      es: 'Tres o más hebras cruzándose en alternancia estricta, trabajadas enteramente en la mano sin bastidor ni herramienta.',
    },
    body: {
      en: [
        'A braid has no warp and no weft — every element is doing both jobs at once, running obliquely through the structure. That is why it can be worked without any equipment, and why a braider can walk, talk and eat while making it. In the Zenú savannas the flat arrow-cane braid is produced this way in long continuous lengths and only afterwards coiled and stitched into a hat.',
        'The count is the whole grammar. A braid of fifteen strands and a braid of twenty-seven are the same gesture at different resolutions, but the second takes several times as long, uses only the finest scraped fibre, and produces a cloth-like flexibility the coarser count cannot. When a Zenú braid is described by a number, that number is the specification.',
      ],
      es: [
        'Una trenza no tiene urdimbre ni trama — cada elemento hace las dos funciones a la vez, corriendo en oblicuo por la estructura. Por eso puede trabajarse sin equipo alguno, y por eso quien trenza puede caminar, hablar y comer mientras lo hace. En las sabanas zenúes la trenza plana de caña flecha se produce así en largos continuos y solo después se enrolla y se cose hasta formar un sombrero.',
        'El conteo es toda la gramática. Una trenza de quince hebras y una de veintisiete son el mismo gesto en distinta resolución, pero la segunda toma varias veces más tiempo, usa solo la fibra raspada más fina y produce una flexibilidad de tela que el conteo grueso no alcanza. Cuando una trenza zenú se describe con un número, ese número es la especificación.',
      ],
    },
    materials: {
      en: ['Arrow cane', 'Iraca palm', 'Coconut fibre'],
      es: ['Caña flecha', 'Palma de iraca', 'Fibra de coco'],
    },
    regions: ['caribe', 'insular'],
    tempo: { en: 'Quick, even, conversational', es: 'Rápido, parejo, conversable' },
    motionAlt: {
      en: 'Three strands cross over one another in alternation — outer over centre, then the other outer over the new centre — the braid growing steadily downward.',
      es: 'Tres hebras se cruzan alternadamente — la exterior sobre la central, luego la otra exterior sobre la nueva central — y la trenza crece de manera sostenida hacia abajo.',
    },
  },

  {
    id: 'anudar',
    slug: 'anudar',
    term: 'Anudar',
    gloss: { en: 'to knot', es: 'fijar por lazada' },
    lede: {
      en: 'Building a structure entirely from the places where a cord turns back on itself. No loom, no tension, no frame.',
      es: 'Construir una estructura enteramente a partir de los puntos donde un cordel se devuelve sobre sí mismo. Sin telar, sin tensión, sin bastidor.',
    },
    body: {
      en: [
        'Knotting and looping make an open mesh from one continuous element. Because the structure is held by its own geometry rather than by tension on a frame, the work can be put down mid-row and picked up weeks later — which is why it survives in mobile and river-going ways of life across the Orinoquía and the Amazon.',
        'A gauge held against the work keeps every opening the same size. That regularity is not aesthetic: an uneven mesh in a fishing net loses exactly the fish it was sized for. The same structure scaled up and worked in cumare or moriche cord becomes a hammock strong enough to sleep a family.',
      ],
      es: [
        'Anudar y anillar hacen una malla abierta a partir de un solo elemento continuo. Como la estructura se sostiene por su propia geometría y no por la tensión de un bastidor, el trabajo puede dejarse a mitad de vuelta y retomarse semanas después — por eso sobrevive en formas de vida móviles y ribereñas a lo largo de la Orinoquía y la Amazonía.',
        'Una regla sostenida contra la obra mantiene igual cada abertura. Esa regularidad no es estética: una malla despareja en una red de pesca pierde justamente el pez para el que fue dimensionada. La misma estructura ampliada y trabajada en cordel de cumare o moriche se vuelve un chinchorro lo bastante fuerte para dormir a una familia.',
      ],
    },
    materials: {
      en: ['Cumare / chambira cord', 'Moriche cord', 'Coconut cordage'],
      es: ['Cordel de cumare / chambira', 'Cordel de moriche', 'Cordelería de coco'],
    },
    regions: ['amazonia', 'orinoquia', 'insular'],
    tempo: { en: 'Interruptible, patient, portable', es: 'Interrumpible, paciente, portátil' },
    motionAlt: {
      en: 'A cord passes through the loop of the row above, draws closed into a knot, and moves on — a diamond mesh forming row by row.',
      es: 'Un cordel pasa por el bucle de la vuelta superior, se cierra en un nudo y sigue — una malla en rombos que se forma vuelta a vuelta.',
    },
  },

  {
    id: 'tinturar',
    slug: 'tinturar',
    term: 'Tinturar',
    gloss: { en: 'to dye', es: 'fijar color vegetal' },
    lede: {
      en: 'Persuading a plant to give up its colour, and persuading a fibre to keep it.',
      es: 'Persuadir a una planta de entregar su color, y persuadir a una fibra de conservarlo.',
    },
    body: {
      en: [
        'Natural dyeing is chemistry conducted by feel. Jagua fruit runs out of the press colourless and turns blue-black in the air over several hours. Achiote gives orange-red immediately but needs help to stay. Walnut bark browns will fix on wool almost unaided; the same bath does very little to a palm fibre. The knowledge is specific to the pairing of plant and fibre, and it does not transfer.',
        'Temperature is where most of it is decided. Heat drives colour in faster, but takes some fibres past the point where they will still hold a tight stitch — so werregue destined for close coiling is steeped cold and slowly, while wool for a ruana can take a long simmer. What looks like a single word, dyeing, is really a set of separate crafts that happen to share a pot.',
      ],
      es: [
        'La tintura natural es química conducida por tacto. El fruto de jagua sale de la prensa incoloro y se vuelve negro azulado al aire en unas horas. El achiote da rojo anaranjado de inmediato pero necesita ayuda para quedarse. Los pardos de corteza de nogal fijan sobre la lana casi sin asistencia; el mismo baño hace muy poco sobre una fibra de palma. El saber es específico del par planta-fibra, y no se transfiere.',
        'La temperatura es donde se decide casi todo. El calor mete el color más rápido, pero lleva algunas fibras más allá del punto en que todavía sostienen una puntada apretada — por eso el werregue destinado a un anillado cerrado se macera en frío y despacio, mientras que la lana para una ruana admite una cocción larga. Lo que parece una sola palabra, teñir, es en realidad un conjunto de oficios distintos que comparten una olla.',
      ],
    },
    materials: {
      en: ['Jagua', 'Achiote / bija', 'Carayurú', 'Walnut bark', 'Iron-rich mud'],
      es: ['Jagua', 'Achiote / bija', 'Carayurú', 'Corteza de nogal', 'Barro ferroso'],
    },
    regions: ['pacifica', 'amazonia', 'andina', 'caribe'],
    tempo: { en: 'Waiting more than working', es: 'Más espera que trabajo' },
    motionAlt: {
      en: 'Pale skeins are lowered into a vessel; colour rises through them from the bottom until the whole hank is saturated, then they lift and drip.',
      es: 'Madejas pálidas descienden a una vasija; el color sube por ellas desde el fondo hasta saturar la madeja entera, y luego se alzan y escurren.',
    },
  },

  {
    id: 'hilar',
    slug: 'hilar',
    term: 'Hilar',
    gloss: { en: 'to spin', es: 'dar torsión a la fibra' },
    lede: {
      en: 'Turning a cloud of loose fibre into a single continuous thread, using nothing but rotation and a steady hand.',
      es: 'Convertir una nube de fibra suelta en un solo hilo continuo, sin más que rotación y una mano constante.',
    },
    body: {
      en: [
        'Spinning is two motions that must stay balanced. One hand drafts — pulls a thin stream of fibre out of the mass — while the spindle adds twist, and twist runs up into the drafted section and locks it. Draft too fast and the thread parts; add twist too fast and it seizes into a wiry cord. The whole skill is holding the ratio between them without watching it.',
        'In the Boyacá highlands the drop spindle is carried and turned while walking, which is why spinning persists in households that gave up the loom generations ago. The unevenness that results is not a defect. Hand-spun yarn varies in diameter, so it takes dye at slightly different rates along its length, and a cloth woven from it has a depth that perfectly uniform mill yarn cannot produce.',
      ],
      es: [
        'Hilar son dos movimientos que deben mantenerse en equilibrio. Una mano estira — saca un chorro delgado de fibra de la masa — mientras el huso añade torsión, y la torsión sube hasta el tramo estirado y lo fija. Si se estira demasiado rápido, el hilo se parte; si se tuerce demasiado rápido, se agarrota en un cordel alambroso. Toda la destreza está en sostener esa proporción sin mirarla.',
        'En el altiplano boyacense el huso de caída se lleva y se hace girar mientras se camina, y por eso el hilado persiste en casas que abandonaron el telar hace generaciones. La irregularidad resultante no es un defecto. El hilo hecho a mano varía de diámetro, así que toma la tintura a ritmos ligeramente distintos a lo largo de su recorrido, y una tela tejida con él tiene una profundidad que el hilo industrial perfectamente uniforme no puede producir.',
      ],
    },
    materials: {
      en: ['Virgin sheep wool', 'Wild cotton', 'Fique'],
      es: ['Lana virgen de oveja', 'Algodón silvestre', 'Fique'],
    },
    regions: ['andina', 'caribe'],
    tempo: { en: 'Continuous, walking pace', es: 'Continuo, a paso de caminata' },
    motionAlt: {
      en: 'A spindle turns below a mass of loose fibre; a thin thread draws downward out of the cloud and twist travels up it, the wound cop growing at the whorl.',
      es: 'Un huso gira bajo una masa de fibra suelta; un hilo delgado se estira hacia abajo desde la nube y la torsión sube por él, mientras el ovillo crece en la tortera.',
    },
  },
]

export const GESTURE_BY_SLUG = new Map(GESTURES.map((g) => [g.slug, g]))
