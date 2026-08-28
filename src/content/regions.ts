import type { Localized } from '../i18n'

/**
 * The six chromatic regions of the Atlas.
 *
 * Per the specification the map shows six visual bands while the cultural
 * synthesis is organised around five continental blocks; `culturalBlock` marks
 * that distinction rather than hiding it, and the Insular panel says plainly
 * that its textile record is thinner in the open literature.
 *
 * `weave` selects the drawn structure used for that region's plate: it names a
 * real interlacement (plain cloth, oblique braid, continuous coil, knotted net)
 * that matches how the region's principal pieces are actually built.
 */
export type WeaveKind = 'plain' | 'braid' | 'coil' | 'knot' | 'twist' | 'net'

export type Material = {
  name: Localized
  botanical?: string
  extraction: Localized
}

export type Technique = {
  name: Localized
  note: Localized
}

export type Region = {
  id: string
  slug: string
  name: Localized
  /** Where the colour is taken from — the palette is semantic, not decorative. */
  colour: string
  colourSource: Localized
  culturalBlock: boolean
  weave: WeaveKind
  lede: Localized
  synthesis: Localized<string[]>
  materials: Material[]
  techniques: Technique[]
  peoples: Localized<string[]>
  /** Keys into MEDIA. */
  images: string[]
}

export const REGIONS: Region[] = [
  {
    id: 'caribe',
    slug: 'caribe',
    name: { en: 'Caribbean', es: 'Caribe' },
    colour: '#E5A93C',
    colourSource: {
      en: 'Solar yellow and mustard — bija and achiote seed, and arrow cane dried to straw.',
      es: 'Amarillo solar y mostaza — semilla de bija y achiote, y caña flecha secada hasta la paja.',
    },
    culturalBlock: true,
    weave: 'braid',
    lede: {
      en: 'Two very different textile worlds share this coast: the braid of the Zenú plains and the vertical loom of the Wayuu desert.',
      es: 'Dos mundos textiles muy distintos comparten esta costa: la trenza de las sabanas zenúes y el telar vertical del desierto wayuu.',
    },
    synthesis: {
      en: [
        'In the savannas of Córdoba and Sucre the Zenú work arrow cane — Gynerium sagittatum — which is not woven but braided. The leaf is stripped, scraped to its pale inner rib, dried, and half of it dyed dark in a bath that includes bija and mud. The resulting flat braid is then coiled and stitched into a hat. Fineness is counted, not described: a braid of fifteen strands is a coarse everyday piece, one of twenty-seven or more is a month of work, and the count is the first thing a buyer from the region will ask about.',
        'Six hundred kilometres north-east, on the Guajira peninsula, the Wayuu build on a vertical loom and with a single hooked needle. The mochila is worked in a continuous spiral; the chinchorro, the great hammock, is a loom piece that can occupy a weaver for months. Both carry kanas — geometric figures that are named, inherited and read. They are taught during the seclusion period in which a Wayuu girl is instructed by her elder kinswomen, which is why the designs travel down particular family lines rather than across the whole people at once.',
      ],
      es: [
        'En las sabanas de Córdoba y Sucre los zenú trabajan la caña flecha — Gynerium sagittatum — que no se teje sino que se trenza. La hoja se despoja, se raspa hasta su nervadura interior clara, se seca, y la mitad se tiñe de oscuro en un baño que incluye bija y barro. La trenza plana resultante se enrolla luego y se cose hasta formar un sombrero. La finura se cuenta, no se describe: una trenza de quince hebras es una pieza corriente de diario, una de veintisiete o más es un mes de trabajo, y el número es lo primero que pregunta un comprador de la región.',
        'Seiscientos kilómetros al nororiente, en la península de la Guajira, los wayuu construyen sobre un telar vertical y con una sola aguja de gancho. La mochila se trabaja en espiral continua; el chinchorro, la gran hamaca, es una pieza de telar que puede ocupar a una tejedora durante meses. Ambos llevan kanas — figuras geométricas que tienen nombre, se heredan y se leen. Se enseñan durante el encierro en el que una joven wayuu es instruida por sus parientes mayores, y por eso los diseños viajan por líneas familiares concretas antes que por todo el pueblo a la vez.',
      ],
    },
    materials: [
      {
        name: { en: 'Arrow cane', es: 'Caña flecha' },
        botanical: 'Gynerium sagittatum',
        extraction: {
          en: 'Cut green, the leaf is split from its rib, scraped against a blade to release the pale inner strand, sun-dried, then sorted by width. Only the finest strands reach the highest braid counts.',
          es: 'Cortada en verde, la hoja se separa de su nervadura, se raspa contra una cuchilla para soltar la hebra interior clara, se seca al sol y luego se clasifica por ancho. Solo las hebras más finas llegan a los conteos de trenza más altos.',
        },
      },
      {
        name: { en: 'Wild cotton', es: 'Algodón silvestre' },
        botanical: 'Gossypium spp.',
        extraction: {
          en: 'Picked, seeded by hand and spun on a spindle. Its short staple gives a slightly uneven thread that takes plant dye unevenly too — which is why older pieces have depth that machine yarn does not.',
          es: 'Recogido, desmotado a mano e hilado en huso. Su fibra corta da un hilo levemente irregular que además toma la tintura vegetal de manera despareja — por eso las piezas antiguas tienen una profundidad que el hilo industrial no alcanza.',
        },
      },
      {
        name: { en: 'Bija / achiote', es: 'Bija / achiote' },
        botanical: 'Bixa orellana',
        extraction: {
          en: 'The seed pod is opened and the seeds worked in water to release an orange-red pigment. Used for colour and, in the Zenú dye bath, as one component alongside mud and tannin-bearing leaves.',
          es: 'Se abre la cápsula y se trabajan las semillas en agua para liberar un pigmento rojo anaranjado. Se usa por color y, en el baño de tintura zenú, como un componente junto al barro y a hojas con taninos.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Zenú flat braid', es: 'Trenza plana zenú' },
        note: {
          en: 'A flat oblique braid worked in the hand, counted by the number of strands running through it. The braid is made first and the object built from it afterwards.',
          es: 'Una trenza plana oblicua trabajada en la mano, contada por el número de hebras que la recorren. Primero se hace la trenza y después se construye el objeto con ella.',
        },
      },
      {
        name: { en: 'Wayuu vertical loom', es: 'Telar vertical wayuu' },
        note: {
          en: 'An upright frame on which hammocks, straps and belts are built. Warp tension is held by the frame rather than the body, which allows the very wide pieces the chinchorro needs.',
          es: 'Un bastidor vertical sobre el que se construyen chinchorros, cinchas y fajas. La tensión de la urdimbre la sostiene el bastidor y no el cuerpo, lo que permite las piezas muy anchas que exige el chinchorro.',
        },
      },
      {
        name: { en: 'Single-needle spiral', es: 'Espiral de una aguja' },
        note: {
          en: 'The mochila is built as one continuous rising spiral. There is no seam and no back — which is also why an error cannot be unpicked locally.',
          es: 'La mochila se construye como una sola espiral ascendente continua. No tiene costura ni revés — que es también la razón por la que un error no se puede descoser de manera puntual.',
        },
      },
    ],
    peoples: {
      en: ['Zenú — San Andrés de Sotavento, Córdoba and Sucre', 'Wayuu — La Guajira peninsula', 'Workshops across Tuchín, Uribia and Riohacha'],
      es: ['Zenú — San Andrés de Sotavento, Córdoba y Sucre', 'Wayuu — península de La Guajira', 'Talleres en Tuchín, Uribia y Riohacha'],
    },
    images: ['canaflechaRaspado', 'canaflechaPlanta', 'wayuuTejiendo', 'mochilasKanas', 'wayuuWoolu', 'guajiraTerritorio'],
  },

  {
    id: 'orinoquia',
    slug: 'orinoquia',
    name: { en: 'Orinoquía', es: 'Orinoquía' },
    colour: '#D95D39',
    colourSource: {
      en: 'Vibrant orange and terracotta — savanna soils and seed dyes.',
      es: 'Naranja vibrante y terracota — suelos de sabana y tintes de semillas.',
    },
    culturalBlock: true,
    weave: 'net',
    lede: {
      en: 'A grassland economy of rivers and cattle, where the most demanding fibre work is netting rather than cloth.',
      es: 'Una economía de llanura, ríos y ganado, donde el trabajo de fibra más exigente es la red antes que la tela.',
    },
    synthesis: {
      en: [
        'The eastern plains are flooded savanna cut by large rivers, and the fibre most associated with them is moriche — the palm that grows wherever the water table stays high. Its young leaf is drawn out, dried and rolled against the thigh into a two-ply cord. That cord is the base material for hammocks, carrying bags and the cast and gill nets that river fishing depends on.',
        'Among Sikuani and neighbouring peoples of the Vichada and Meta the same twisting produces basketry and the sieves and presses used in cassava processing — objects whose geometry is dictated by function before decoration. It is worth saying plainly that the fibre traditions of this region are less documented in accessible literature than those of the Caribbean or the Pacific, and that a platform like this one should be filling that gap with material provided by the communities themselves rather than inferring it.',
      ],
      es: [
        'Los llanos orientales son sabana inundable cortada por grandes ríos, y la fibra más asociada a ellos es el moriche — la palma que crece donde el nivel freático se mantiene alto. Su hoja tierna se extrae, se seca y se rueda contra el muslo hasta formar un cordel de dos cabos. Ese cordel es la materia base de chinchorros, mochilas de carga y de las atarrayas y redes de las que depende la pesca de río.',
        'Entre los sikuani y pueblos vecinos del Vichada y el Meta ese mismo torcido produce cestería y los cernidores y prensas que se usan en el procesamiento de la yuca — objetos cuya geometría la dicta la función antes que la decoración. Vale decirlo con claridad: las tradiciones de fibra de esta región están menos documentadas en la literatura accesible que las del Caribe o el Pacífico, y una plataforma como esta debería llenar ese vacío con material provisto por las propias comunidades y no por inferencia.',
      ],
    },
    materials: [
      {
        name: { en: 'Moriche palm', es: 'Palma de moriche' },
        botanical: 'Mauritia flexuosa',
        extraction: {
          en: 'The unopened young leaf is pulled from the crown, its fibre separated and dried, then rolled on the thigh into cord. The palm is left standing; it is a long-term resource, not a harvest.',
          es: 'Se extrae del cogollo la hoja tierna sin abrir, se separa su fibra y se seca, y luego se rueda sobre el muslo hasta hacer cordel. La palma queda en pie; es un recurso de largo plazo, no una cosecha.',
        },
      },
      {
        name: { en: 'Seed and bark dyes', es: 'Tintes de semilla y corteza' },
        extraction: {
          en: 'Achiote for orange-red, and iron-rich savanna muds for the darker earths. Colour here tends toward the range of the ground it comes from.',
          es: 'Achiote para el rojo anaranjado, y barros de sabana ricos en hierro para las tierras más oscuras. El color aquí tiende al rango del suelo del que proviene.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Thigh-rolled cord', es: 'Cordel torcido al muslo' },
        note: {
          en: 'Two strands twisted in one direction and plied in the other. The counter-twist is what stops the cord unwinding under load.',
          es: 'Dos cabos torcidos en un sentido y retorcidos en el contrario. El contra-torcido es lo que impide que el cordel se abra bajo carga.',
        },
      },
      {
        name: { en: 'Knotted netting', es: 'Red anudada' },
        note: {
          en: 'Worked outward from a single point with a gauge to hold the mesh even. Fishing nets, carrying bags and hammocks are the same structure at different scales.',
          es: 'Se trabaja hacia afuera desde un solo punto con una regla que mantiene pareja la malla. Redes de pesca, mochilas de carga y chinchorros son la misma estructura a distintas escalas.',
        },
      },
    ],
    peoples: {
      en: ['Sikuani — Vichada, Meta and the Orinoco basin', 'Llanero workshops of Arauca and Casanare'],
      es: ['Sikuani — Vichada, Meta y la cuenca del Orinoco', 'Talleres llaneros de Arauca y Casanare'],
    },
    images: [],
  },

  {
    id: 'andina',
    slug: 'andina',
    name: { en: 'Andean', es: 'Andina' },
    colour: '#5C3D2E',
    colourSource: {
      en: 'Deep earth brown — walnut bark, raw wool and mountain soil.',
      es: 'Pardo tierra profundo — corteza de nogal, lana cruda y suelo de montaña.',
    },
    culturalBlock: true,
    weave: 'plain',
    lede: {
      en: 'Wool and fique in the cordillera: the pedal loom, the spindle, and cloth heavy enough to live in.',
      es: 'Lana y fique en la cordillera: el telar de pedal, el huso, y una tela lo bastante pesada para habitarla.',
    },
    synthesis: {
      en: [
        'The Andean tradition is the one most shaped by the encounter with Europe. The pedal loom arrived in the sixteenth century and settled into the highlands of Boyacá so thoroughly that it is now read as local; sheep arrived with it. What did not change is the preparation: the fleece is washed, teased, and spun on a hand spindle, and the resulting yarn keeps a variation in thickness that a mill would remove. The ruana — a heavy open poncho — is the piece this system exists to make, and it is woven flat in two panels and joined.',
        'Alongside wool runs fique, the fibre of Furcraea, worked long before the Spanish arrived and still worked in Santander and Nariño. The leaf is cut, beaten and washed until only the fibre remains, then dried and spun into cabuya. It makes sacking, rope, mats and the coiled baskets of Guacamayas, where fique is stitched over a core of paja blanca and dyed in strong bands. Fique is stiff and unforgiving where wool is warm and correctable, and the two demand almost opposite hands.',
      ],
      es: [
        'La tradición andina es la más marcada por el encuentro con Europa. El telar de pedal llegó en el siglo XVI y se asentó en el altiplano boyacense tan a fondo que hoy se lee como local; con él llegaron las ovejas. Lo que no cambió es la preparación: el vellón se lava, se carda y se hila en huso de mano, y el hilo resultante conserva una variación de grosor que una fábrica eliminaría. La ruana — un poncho abierto y pesado — es la pieza para la que existe este sistema, y se teje plana en dos lienzos que luego se unen.',
        'Junto a la lana corre el fique, la fibra de la Furcraea, trabajada mucho antes de la llegada española y todavía trabajada en Santander y Nariño. La hoja se corta, se macera y se lava hasta que solo queda la fibra, que luego se seca y se hila en cabuya. De ahí salen costales, sogas, esteras y los canastos anillados de Guacamayas, donde el fique se cose sobre un alma de paja blanca y se tiñe en franjas fuertes. El fique es rígido y no perdona donde la lana es cálida y corregible, y los dos exigen manos casi opuestas.',
      ],
    },
    materials: [
      {
        name: { en: 'Virgin sheep wool', es: 'Lana virgen de oveja' },
        extraction: {
          en: 'Shorn, washed in cold water, teased open by hand and spun on a drop spindle. Left ungreased and undyed for the natural browns, creams and greys that carry most highland pieces.',
          es: 'Esquilada, lavada en agua fría, abierta a mano y torcida en huso de caída. Se deja sin engrasar y sin teñir para los pardos, cremas y grises naturales que sostienen la mayoría de las piezas del altiplano.',
        },
      },
      {
        name: { en: 'Fique', es: 'Fique' },
        botanical: 'Furcraea spp.',
        extraction: {
          en: 'Mature leaves are cut and passed through a beater that strips the pulp; the fibre is washed repeatedly, dried in the sun until it pales, and then spun. The waste liquor is acidic and its handling is one of the real environmental questions of the craft.',
          es: 'Se cortan hojas maduras y se pasan por una desfibradora que retira la pulpa; la fibra se lava repetidas veces, se seca al sol hasta aclararse y luego se hila. El líquido residual es ácido y su manejo es una de las cuestiones ambientales reales del oficio.',
        },
      },
      {
        name: { en: 'Walnut bark', es: 'Corteza de nogal' },
        botanical: 'Juglans neotropica',
        extraction: {
          en: 'Bark and husk are simmered to draw a brown that fixes on wool without a strong mordant. It is the source of the deep earth tone this region is coded with.',
          es: 'Corteza y cáscara se cuecen a fuego lento para extraer un pardo que fija sobre la lana sin mordiente fuerte. Es la fuente del tono tierra profundo con el que se codifica esta región.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Pedal loom', es: 'Telar de pedal' },
        note: {
          en: 'A four-shaft floor loom worked with the feet, producing long flat panels. Plain weave and simple twills; the interest is in the yarn, not the structure.',
          es: 'Un telar de piso de cuatro lizos accionado con los pies, que produce lienzos planos y largos. Tafetán y sargas simples; el interés está en el hilo, no en la estructura.',
        },
      },
      {
        name: { en: 'Spindle spinning', es: 'Hilado en huso' },
        note: {
          en: 'Walked, not sat. The spindle is carried and turned while doing other things, which is why the craft survives in households that no longer weave.',
          es: 'Se hila caminando, no sentado. El huso se lleva y se hace girar mientras se hacen otras cosas, y por eso el oficio sobrevive en casas que ya no tejen.',
        },
      },
      {
        name: { en: 'Coiled fique basketry', es: 'Cestería anillada en fique' },
        note: {
          en: 'A core of paja blanca wrapped and stitched with dyed fique, built in a rising spiral. Associated above all with Guacamayas, Boyacá.',
          es: 'Un alma de paja blanca envuelta y cosida con fique teñido, construida en espiral ascendente. Asociada sobre todo a Guacamayas, Boyacá.',
        },
      },
    ],
    peoples: {
      en: ['Weaving households of Nobsa, Iza and Tibasosa, Boyacá', 'Fique workshops of Curití and San Gil, Santander', 'Coiled-basket makers of Guacamayas, Boyacá', 'Nariño fique communities'],
      es: ['Casas tejedoras de Nobsa, Iza y Tibasosa, Boyacá', 'Talleres de fique de Curití y San Gil, Santander', 'Cesteros de Guacamayas, Boyacá', 'Comunidades fiqueras de Nariño'],
    },
    images: ['fiquePlanta'],
  },

  {
    id: 'amazonia',
    slug: 'amazonia',
    name: { en: 'Amazon', es: 'Amazonía' },
    colour: '#607248',
    colourSource: {
      en: 'Moss and muted olive — chlorophyll, carayurú and leaf litter.',
      es: 'Musgo y oliva matizado — clorofila, carayurú y hojarasca.',
    },
    culturalBlock: true,
    weave: 'twist',
    lede: {
      en: 'Palm fibre twisted into cord, and bark beaten into cloth — two answers to the same forest.',
      es: 'Fibra de palma torcida en cordel, y corteza macerada hasta volverse tela — dos respuestas a la misma selva.',
    },
    synthesis: {
      en: [
        'Chambira, called cumare in Colombia, is the palm that underwrites Amazonian fibre work. The unopened leaf spear is cut, the fibre stripped and boiled, dried and then rolled into a fine, extremely strong cord. From that cord come hammocks, carrying bags and fishing line, built not by weaving but by looping and knotting — a structure with no warp and no weft, worked entirely with the fingers.',
        'The other tradition is not spun at all. Yanchama is inner bark, taken from certain fig and Poulsenia trees, soaked and beaten with a mallet until the fibres spread into a continuous sheet. Among the Tikuna it is painted with plant pigments — carayurú for red, huito for black — and used for masks and cloths in ritual contexts. Bark cloth is a reminder that "textile" is a narrower word than the practice it is meant to describe.',
      ],
      es: [
        'La chambira, llamada cumare en Colombia, es la palma que sostiene el trabajo de fibra amazónico. Se corta el cogollo sin abrir, se despoja la fibra y se cocina, se seca y luego se rueda hasta obtener un cordel fino y extremadamente resistente. De ese cordel salen chinchorros, mochilas de carga y sedal de pesca, construidos no por tejido sino por anillado y anudado — una estructura sin urdimbre ni trama, trabajada enteramente con los dedos.',
        'La otra tradición no se hila en absoluto. La yanchama es corteza interna, tomada de ciertos árboles de los géneros Ficus y Poulsenia, que se remoja y se macera con mazo hasta que las fibras se abren en una lámina continua. Entre los tikuna se pinta con pigmentos vegetales — carayurú para el rojo, huito para el negro — y se usa en máscaras y telas de contexto ritual. La corteza batida recuerda que «textil» es una palabra más estrecha que la práctica que pretende describir.',
      ],
    },
    materials: [
      {
        name: { en: 'Cumare / chambira palm', es: 'Palma de cumare / chambira' },
        botanical: 'Astrocaryum chambira',
        extraction: {
          en: 'The central unopened spear is cut, split, and the fibre pulled clear, then boiled to soften and sun-dried until pale. Rolled on the thigh into a two-ply cord fine enough for fishing line.',
          es: 'Se corta el cogollo central sin abrir, se abre y se desprende la fibra, que luego se cocina para ablandarla y se seca al sol hasta aclarar. Se rueda en el muslo hasta un cordel de dos cabos lo bastante fino para sedal.',
        },
      },
      {
        name: { en: 'Yanchama bark', es: 'Corteza de yanchama' },
        botanical: 'Poulsenia armata, Ficus spp.',
        extraction: {
          en: 'A section of inner bark is removed, soaked in the river and beaten with a grooved mallet until the fibres open into a single sheet. It is cloth made by spreading rather than by joining.',
          es: 'Se retira una sección de corteza interna, se remoja en el río y se macera con un mazo estriado hasta que las fibras se abren en una sola lámina. Es tela hecha por extensión y no por unión.',
        },
      },
      {
        name: { en: 'Carayurú', es: 'Carayurú' },
        botanical: 'Arrabidaea chica',
        extraction: {
          en: 'Leaves are fermented and pressed to yield a dense red pigment, dried into cakes and rewetted when needed.',
          es: 'Las hojas se fermentan y se prensan para obtener un pigmento rojo denso, que se seca en panes y se rehumedece cuando se necesita.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Looping and knotting', es: 'Anillado y anudado' },
        note: {
          en: 'A single continuous element passed through the loops of the previous row. It needs no frame and no tools, and it can be stopped and resumed anywhere.',
          es: 'Un solo elemento continuo que se pasa por los bucles de la vuelta anterior. No necesita bastidor ni herramientas, y se puede detener y retomar en cualquier punto.',
        },
      },
      {
        name: { en: 'Bark beating', es: 'Maceración de corteza' },
        note: {
          en: 'Rhythmic mallet work that widens a strip of bark into a sheet several times its original width without tearing it.',
          es: 'Trabajo rítmico de mazo que ensancha una tira de corteza hasta varias veces su ancho original sin romperla.',
        },
      },
    ],
    peoples: {
      en: ['Tikuna — Amazonas, along the Amazon river', 'Uitoto, Bora and Miraña peoples', 'Workshops around Leticia and Puerto Nariño'],
      es: ['Tikuna — Amazonas, sobre el río Amazonas', 'Pueblos uitoto, bora y miraña', 'Talleres en torno a Leticia y Puerto Nariño'],
    },
    images: [],
  },

  {
    id: 'pacifica',
    slug: 'pacifica',
    name: { en: 'Pacific', es: 'Pacífica' },
    colour: '#2D5A43',
    colourSource: {
      en: 'Emerald and rainforest green — jagua, mangrove and standing water.',
      es: 'Esmeralda y verde de bosque pluvial — jagua, mangle y agua estancada.',
    },
    culturalBlock: true,
    weave: 'coil',
    lede: {
      en: 'Werregue: a coiled palm fibre so fine and so tightly counted that the vessels made from it will hold water.',
      es: 'Werregue: una fibra de palma anillada tan fina y tan contada que las vasijas hechas con ella retienen el agua.',
    },
    synthesis: {
      en: [
        'The werregue palm grows in the wet forest of the Chocó and the lower San Juan, and the Wounaan take fibre from its young leaf in the same way as chambira: cut, stripped, boiled, dried until it pales almost to white. What distinguishes the tradition is what happens next. The fibre is dyed — jagua for black, achiote for red, plantain and other plants for the olives and browns — and then wrapped and stitched over a core in a rising coil so dense that a finished vessel is effectively watertight.',
        'The figures are counted into the coil as it rises. There is no way to sketch first and correct later: the maker holds the whole pattern in advance and commits to it stitch by stitch, and a miscount several rows down cannot be repaired without undoing everything above it. This is the reason a large werregue vessel is measured in months. The figures themselves are named — animals, plants, and the relations between them — and belong to the Wounaan, not to the market that buys them.',
      ],
      es: [
        'La palma de werregue crece en el bosque húmedo del Chocó y el bajo San Juan, y los wounaan extraen fibra de su hoja tierna del mismo modo que la chambira: se corta, se despoja, se cocina, se seca hasta aclarar casi hasta el blanco. Lo que distingue a la tradición es lo que viene después. La fibra se tiñe — jagua para el negro, achiote para el rojo, plátano y otras plantas para los olivas y pardos — y luego se envuelve y se cose sobre un alma en un anillado ascendente tan denso que una vasija terminada resulta prácticamente estanca.',
        'Las figuras se cuentan dentro del anillado a medida que sube. No hay manera de bosquejar primero y corregir después: quien teje sostiene el patrón entero de antemano y se compromete puntada a puntada, y un error de conteo varias vueltas más abajo no se puede reparar sin deshacer todo lo que está encima. Por eso una vasija grande de werregue se mide en meses. Las figuras mismas tienen nombre — animales, plantas y las relaciones entre ellos — y pertenecen a los wounaan, no al mercado que las compra.',
      ],
    },
    materials: [
      {
        name: { en: 'Werregue palm', es: 'Palma de werregue' },
        botanical: 'Astrocaryum standleyanum',
        extraction: {
          en: 'The unopened spear is taken from the crown of a young palm, the fibre separated from the leaflet, boiled and dried in the sun until it turns pale. Only a few spears can be taken from a palm without harming it.',
          es: 'Se toma el cogollo sin abrir de la corona de una palma joven, se separa la fibra del foliolo, se cocina y se seca al sol hasta que aclara. De una palma solo pueden tomarse unos pocos cogollos sin dañarla.',
        },
      },
      {
        name: { en: 'Jagua', es: 'Jagua' },
        botanical: 'Genipa americana',
        extraction: {
          en: 'The unripe fruit is grated and pressed; the juice is colourless at first and oxidises to a blue-black over hours. Fibre is steeped rather than boiled.',
          es: 'El fruto verde se ralla y se prensa; el jugo es incoloro al principio y se oxida a un negro azulado en unas horas. La fibra se macera en frío y no se hierve.',
        },
      },
      {
        name: { en: 'Damagua and cabecinegro', es: 'Damagua y cabecinegro' },
        botanical: 'Poulsenia armata, Manicaria saccifera',
        extraction: {
          en: 'Damagua is a beaten bark cloth; cabecinegro is the fibrous sheath of a palm inflorescence, used whole. Both are worked as sheet rather than as thread.',
          es: 'La damagua es una tela de corteza macerada; el cabecinegro es la vaina fibrosa de una inflorescencia de palma, usada entera. Ambos se trabajan como lámina y no como hilo.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Wrapped coil', es: 'Anillado envuelto' },
        note: {
          en: 'A bundle core is wrapped in dyed fibre and stitched into the coil below it. Each stitch is one unit of the pattern, so the design is arithmetic before it is visual.',
          es: 'Un alma en haz se envuelve con fibra teñida y se cose al anillo inferior. Cada puntada es una unidad del patrón, de modo que el diseño es aritmética antes que imagen.',
        },
      },
      {
        name: { en: 'Cold-steep plant dyeing', es: 'Tintura vegetal en frío' },
        note: {
          en: 'Jagua and several of the greens are steeped rather than heated, because boiling would take the fibre past the point where it will still take a tight stitch.',
          es: 'La jagua y varios de los verdes se maceran en lugar de calentarse, porque hervir llevaría la fibra más allá del punto en que todavía admite una puntada apretada.',
        },
      },
    ],
    peoples: {
      en: ['Wounaan — Litoral del San Juan, Chocó', 'Emberá communities of the Chocó and Valle del Cauca', 'Workshops around Docordó and Buenaventura'],
      es: ['Wounaan — Litoral del San Juan, Chocó', 'Comunidades emberá del Chocó y el Valle del Cauca', 'Talleres en torno a Docordó y Buenaventura'],
    },
    images: ['werregueVasijas'],
  },

  {
    id: 'insular',
    slug: 'insular',
    name: { en: 'Insular', es: 'Insular' },
    colour: '#2A9D8F',
    colourSource: {
      en: 'Turquoise and luminous marine — the Caribbean shelf and the island horizon.',
      es: 'Turquesa y marino luminoso — la plataforma caribeña y el horizonte insular.',
    },
    culturalBlock: false,
    weave: 'knot',
    lede: {
      en: 'The sixth band. An Afro-Caribbean island culture whose fibre work is real but thinly recorded.',
      es: 'La sexta franja. Una cultura insular afrocaribeña cuyo trabajo de fibra es real pero está poco registrado.',
    },
    synthesis: {
      en: [
        'San Andrés, Providencia and Santa Catalina sit closer to Nicaragua than to the Colombian mainland, and the Raizal people who live there are an Afro-Caribbean, Creole-speaking population with their own relationship to the sea. Fibre work here is coastal and functional: coconut husk and palm worked into cordage, mats and baskets, and the netting and trap-making that island fishing has always required.',
        'This panel is deliberately shorter than the other five. The specification behind FIBRA organises its cultural synthesis around five continental blocks while keeping six chromatic bands on the map, and the honest reason the sixth is thinner is that the island textile record is far less documented in accessible sources than that of the Zenú or the Wounaan. Rather than pad it with inference, the space is held open for the Raizal collectives to fill.',
      ],
      es: [
        'San Andrés, Providencia y Santa Catalina están más cerca de Nicaragua que del continente colombiano, y el pueblo raizal que las habita es una población afrocaribeña, criollohablante, con su propia relación con el mar. El trabajo de fibra aquí es costero y funcional: estopa de coco y palma trabajadas en cordelería, esteras y canastos, y la confección de redes y nasas que la pesca insular siempre ha exigido.',
        'Este panel es deliberadamente más corto que los otros cinco. La especificación que está detrás de FIBRA organiza su síntesis cultural en cinco bloques continentales y mantiene seis franjas cromáticas en el mapa, y la razón honesta de que la sexta sea más delgada es que el registro textil insular está mucho menos documentado en fuentes accesibles que el de los zenú o los wounaan. En lugar de rellenarlo por inferencia, el espacio queda abierto para que lo llenen los colectivos raizales.',
      ],
    },
    materials: [
      {
        name: { en: 'Coconut fibre', es: 'Fibra de coco' },
        botanical: 'Cocos nucifera',
        extraction: {
          en: 'The husk is soaked until the fibres release, then combed and dried. Coarse, salt-tolerant and slow to rot — which is exactly what marine cordage needs.',
          es: 'La estopa se remoja hasta que las fibras se sueltan, luego se peina y se seca. Es gruesa, tolera la sal y se pudre despacio — que es exactamente lo que necesita la cordelería marina.',
        },
      },
    ],
    techniques: [
      {
        name: { en: 'Net and trap making', es: 'Confección de redes y nasas' },
        note: {
          en: 'Mesh knotted to a gauge, and split-palm traps bound with cord. Both are repaired far more often than they are replaced.',
          es: 'Malla anudada a una regla, y nasas de palma partida amarradas con cordel. Ambas se reparan mucho más a menudo de lo que se reemplazan.',
        },
      },
    ],
    peoples: {
      en: ['Raizal communities of San Andrés, Providencia and Santa Catalina'],
      es: ['Comunidades raizales de San Andrés, Providencia y Santa Catalina'],
    },
    images: [],
  },
]

export const REGION_BY_SLUG = new Map(REGIONS.map((r) => [r.slug, r]))
