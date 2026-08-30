/**
 * UI string table. English is authored first and its keys become the contract:
 * `es` is typed as Record<UIKey, string>, so a missing Spanish translation is a
 * compile error rather than a silent English leak at runtime.
 * Content strings (region prose, artisan chronicles) live in src/content — this
 * file is only chrome: navigation, labels, controls, guidance copy.
 */

const en = {
  // --- Brand / global -------------------------------------------------------
  'brand.name': 'FIBRA',
  'brand.tagline': 'Colombian textile memory, told by the hands that keep it',
  'skip.content': 'Skip to main content',
  'lang.label': 'Language',
  'lang.en': 'English',
  'lang.es': 'Spanish',
  'lang.switchTo': 'Cambiar a español',

  // --- Navigation -----------------------------------------------------------
  'nav.home': 'Home',
  'nav.atlas': 'Territories',
  'nav.techniques': 'Techniques',
  'nav.artisans': 'Artisans',
  'nav.credits': 'Credits',
  'nav.menu': 'Menu',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.primary': 'Primary',

  // --- Home -----------------------------------------------------------------
  'home.eyebrow': 'Where the weave trembles again',
  'home.hero.curatorial':
    'FIBRA gathers the stories of the people who weave in Colombia. Each one is told in the first person, with the name of the weaver, the community that taught them, and the technique they have repeated for generations.',
  'home.hero.scroll': 'Follow the thread',
  'home.hero.cta': 'Read a chronicle',
  'home.hero.credit': 'Photograph',
  'home.thread.note': 'A single thread runs the length of this story. Midway down it frays, and each strand leads somewhere.',
  'home.paths.eyebrow': 'The thread divides',
  'home.paths.title': 'Two doors into the craft',
  'home.paths.lede':
    'From the technique that gives the strand its shape, or from the territory where the material grows. Choose your own route.',
  'home.path.techniques.title': 'The Path of Techniques',
  'home.path.techniques.desc':
    'Warping, braiding, knotting, dyeing, spinning. Five movements of the hand, each with its own tools and its own timings.',
  'home.path.techniques.cta': 'Enter through the hand',
  'home.path.territory.title': 'The Path of Territory',
  'home.path.territory.desc':
    'Six regions, each carrying the colour of the dye or the fibre that grows there. From the yellow of bija in the north to the green of mangrove on the Pacific coast.',
  'home.path.territory.cta': 'Enter through the ground',
  'home.identity.eyebrow': 'The name',
  'home.identity.title': 'Between the thread and the feeling',
  'home.identity.body':
    'Fibra is the filament a plant gives up and an animal offers. In Spanish it is also what moves in you when something truly reaches you: we say a thing has touched our fibres when it shakes us or captivates us. FIBRA is born at that crossing, and here every story is a weave.',
  'home.identity.a.t': 'The hand that knots inherited knowledge',
  'home.identity.a.b': 'Every piece carries the name of the person who made it and the community that taught them.',
  'home.identity.b.t': 'The technique repeated across generations',
  'home.identity.b.b': 'Warping, braiding, knotting, dyeing, spinning. The same movement, held for centuries in one territory.',
  'home.identity.c.t': 'The patience that turns matter into memory',
  'home.identity.c.b': 'A werregue vessel is weeks of counting. Making time is stated in hours and weeks rather than left out.',
  'home.artisans.eyebrow': 'Chronicles',
  'home.artisans.title': 'Five acts, one voice',
  'home.artisans.lede': 'Each profile reads straight through, in five acts, from the weaver\u2019s own voice to the door of the workshop.',

  // --- Atlas ----------------------------------------------------------------
  'atlas.eyebrow': 'Territories',
  'atlas.title': 'Textile Atlas of Colombia',
  'atlas.lede':
    'Six chromatic regions, read as a woven cloth rather than a political map. Each colour is taken from what actually dyes or grows there — bija and dry arrow cane in the north, walnut bark and raw wool in the cordillera, jagua and mangrove on the Pacific coast.',
  'atlas.hint': 'Select a region to open its panel',
  'atlas.hint.touch': 'Tap a band to open its panel',
  'atlas.legend': 'Regions',
  'atlas.map.label': 'Textile regions of Colombia',
  'atlas.region.select': 'Open the {name} region panel',
  'atlas.note':
    'The six bands are a chromatic reading of the country, not a survey boundary. Regional borders in Colombia are drawn differently by different institutions, and craft traditions cross all of them.',

  // --- Region drawer --------------------------------------------------------
  'drawer.close': 'Close region panel',
  'drawer.region': 'Region',
  'drawer.synthesis': 'The weave here',
  'drawer.materials': 'Materials and extraction',
  'drawer.techniques': 'Techniques',
  'drawer.communities': 'Peoples and workshops',
  'drawer.artisans': 'Chronicles from this region',
  'drawer.noArtisans': 'No chronicle has been published from this region yet. Profiles are added only once the workshop has reviewed and approved its own page.',
  'drawer.viewProfile': 'Read the chronicle',

  // --- Techniques -----------------------------------------------------------
  'techniques.eyebrow': 'The Path of Techniques',
  'techniques.title': 'Navigation by the act of making',
  'techniques.lede':
    'A technique is not a category. It is a movement one body learned from another. These five cut across every region: the same knot is tied on the Guajira peninsula and in the Chocó rainforest, and it means something different in each place.',
  'techniques.motion': 'Motion study',
  'techniques.reduced': 'Motion is paused because your system asks for reduced motion.',
  'techniques.play': 'Play motion study',
  'techniques.pause': 'Pause motion study',
  'techniques.materials': 'Worked in',
  'techniques.regions': 'Practised in',
  'techniques.tempo': 'Tempo',
  'techniques.select': 'Show the {name} technique',

  // --- Artisans -------------------------------------------------------------
  'artisans.eyebrow': 'Chronicles',
  'artisans.title': 'The weavers',
  'artisans.lede':
    'Each chronicle runs in five acts and is read as one continuous descent. Nothing here is a tab, because a life is not a tab.',
  'artisan.back': 'All chronicles',
  'artisan.acts': 'Acts',
  'artisan.act': 'Act',
  'artisan.progress': 'Chronicle progress',
  'artisan.community': 'Community',
  'artisan.territory': 'Territory',
  'artisan.craft': 'Craft',
  'artisan.region': 'Region',

  // --- Traceability seal ----------------------------------------------------
  'seal.title': 'Traceability Seal',
  'seal.authorship': 'Individual authorship',
  'seal.affiliation': 'Community affiliation',
  'seal.origin': 'Geographic origin',
  'seal.material': 'Raw material',
  'seal.material.value': '100% natural fibre',
  'seal.consent': 'Informed community consent',
  'seal.consent.value': 'Recorded and renewable',
  'seal.what': 'What this seal states',
  'seal.explain':
    'The seal names the individual who made the piece and the collective the knowledge belongs to. Both matter: authorship without affiliation erases the lineage, affiliation without authorship erases the person.',

  // --- Acts -----------------------------------------------------------------
  'act.1.roman': 'I',
  'act.1.title': 'The Trace and the Voice',
  'act.2.roman': 'II',
  'act.2.title': 'Territory and Memory',
  'act.3.roman': 'III',
  'act.3.title': 'Material and Technique',
  'act.4.roman': 'IV',
  'act.4.title': 'Works of the Workshop',
  'act.5.roman': 'V',
  'act.5.title': 'Direct Contact and Ethical Commission',

  // --- Act III modules ------------------------------------------------------
  'zoom.title': 'Sensory translation',
  'zoom.lede':
    'A screen has no touch. What it can do is get close enough that twist, irregularity and density become legible — the things a hand would have told you in a second.',
  'zoom.instruction': 'Drag, or use the slider, to move through the fibre.',
  'zoom.level': 'Magnification',
  'zoom.reset': 'Reset magnification',
  'zoom.in': 'Zoom in',
  'zoom.out': 'Zoom out',
  'zoom.reading': 'What you are looking at',

  'hotspots.title': 'Reading the pattern',
  'hotspots.lede':
    'Geometric figures in these traditions are not ornament. They name animals, paths, kinship and weather. Select a marker to read what the figure carries.',
  'hotspots.instruction': 'Select a marker on the cloth. Use Tab to move between markers and Enter to open one.',
  'hotspots.marker': 'Figure {n}: {name}',
  'hotspots.close': 'Close figure note',
  'hotspots.meaning': 'What it carries',
  'hotspots.glossary': 'Semiotic glossary',
  'hotspots.communityHeld': 'Community-held knowledge',
  'hotspots.markersLabel': 'markers on this cloth. Tab between them, Enter to open.',
  'hotspots.term': 'Term',

  'techniquevideo.title': 'The rhythm of the hands',
  'techniquevideo.lede': 'Silent loops. No music, no voiceover. The tempo of the work is the point.',

  // --- Act IV ---------------------------------------------------------------
  'works.technique': 'Technique',
  'works.materials': 'Materials',
  'works.time': 'Time invested',
  'works.scale': 'Real scale',
  'works.context': 'In use',
  'works.note':
    'These are not listings. There is no price on this page, because a price agreed in advance by a platform is a price the maker did not set.',

  // --- Act V ----------------------------------------------------------------
  'contact.eyebrow': 'Act V',
  'contact.title': 'Speak to the workshop',
  'contact.lede':
    'From here the conversation is yours. FIBRA does not sit in the middle of it, does not read it, and takes nothing from what you agree.',
  'contact.whatsapp': 'Message on WhatsApp',
  'contact.call': 'Call the workshop',
  'contact.prefilled': 'Your message will open pre-written, and you can change every word of it:',
  'contact.hours': 'Best hours to write',
  'contact.language': 'Languages spoken',
  'contact.nocommission': 'FIBRA charges no commission on this conversation.',
  'contact.demoNote':
    'This is a demonstration contact. The number is a placeholder and will not reach a real workshop.',

  'guide.title': 'Guide to a Conscious Commission',
  'guide.lede':
    'Most friction between a workshop and a first-time client comes from one place: industrial expectations applied to a handmade object. These are the things worth knowing before you write.',

  // --- Credits / provenance -------------------------------------------------
  'credits.eyebrow': 'Provenance',
  'credits.title': 'Credits and content provenance',
  'credits.lede':
    'A platform about authorship has to be able to account for its own material. Every photograph here is listed with its author and licence, and everything that is not yet documented is named as such.',
  'credits.images': 'Photography',
  'credits.images.lede':
    'Openly licensed photographs sourced from Wikimedia Commons and used unmodified, at reduced delivery resolution. Attribution and licence as required by each licensor.',
  'credits.author': 'Photographer',
  'credits.licence': 'Licence',
  'credits.source': 'Source',
  'credits.depicts': 'Depicts',
  'credits.graphics': 'Drawn graphics',
  'credits.graphics.lede':
    'Weave structures, fibre studies, the regional cartography and the technique loops on this site are drawn as vector graphics rather than photographed. They render real structural geometry — the interlacement of a plain weave, the topology of a three-strand braid, the pitch of a coil — so that the technique is legible rather than merely illustrated.',
  'credits.content': 'Editorial content',
  'credits.status': 'Status',

  // --- Demonstration notice -------------------------------------------------
  'demo.title': 'About this chronicle',
  'demo.body':
    'FIBRA publishes only what an artisan and their collective have supplied and approved. This profile is a demonstration of the five-act structure: the person, the quotations and the contact details are invented, and are marked as such throughout. The craft, materials, regions and techniques described are documented traditions, not invented ones.',
  'demo.short': 'Demonstration profile — invented person, documented craft',
  'demo.badge': 'Demonstration',

  // --- Common ---------------------------------------------------------------
  'common.readMore': 'Read more',
  'common.close': 'Close',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.of': 'of',
  'common.notFound.title': 'This thread runs out here',
  'common.notFound.body': 'The page you asked for does not exist. The ways back in are below.',
  'common.notFound.home': 'Return to the cover',
  'footer.ethics': 'Standing commitments',
  'footer.ethics.1': 'Everything published is supplied and validated by the artisans and their collectives.',
  'footer.ethics.2': 'The curatorial voice accompanies first-person testimony; it never replaces it.',
  'footer.ethics.3': 'No intermediary commission is charged on any conversation or commission.',
  'footer.explore': 'Explore',
  'footer.about': 'About',
  'footer.rights': 'Craft knowledge belongs to the communities that keep it.',
} as const

export type UIKey = keyof typeof en

const es: Record<UIKey, string> = {
  'brand.name': 'FIBRA',
  'brand.tagline': 'Memoria textil colombiana, contada por las manos que la guardan',
  'skip.content': 'Ir al contenido principal',
  'lang.label': 'Idioma',
  'lang.en': 'Inglés',
  'lang.es': 'Español',
  'lang.switchTo': 'Switch to English',

  'nav.home': 'Inicio',
  'nav.atlas': 'Territorios',
  'nav.techniques': 'Técnicas',
  'nav.artisans': 'Artesanos',
  'nav.credits': 'Créditos',
  'nav.menu': 'Menú',
  'nav.open': 'Abrir menú',
  'nav.close': 'Cerrar menú',
  'nav.primary': 'Principal',

  'home.eyebrow': 'Donde el tejido vuelve a temblar',
  'home.hero.curatorial':
    'FIBRA reúne las historias de quienes tejen en Colombia. Cada una se cuenta en primera persona, con el nombre de quien teje, la comunidad que le enseñó y la técnica que repite desde hace generaciones.',
  'home.hero.scroll': 'Siga el hilo',
  'home.hero.cta': 'Leer una crónica',
  'home.hero.credit': 'Fotografía',
  'home.thread.note': 'Un solo hilo recorre esta historia. A media altura se deshilacha, y cada hebra lleva a algún lugar.',
  'home.paths.eyebrow': 'El hilo se divide',
  'home.paths.title': 'Dos puertas de entrada al oficio',
  'home.paths.lede':
    'Desde la técnica que da forma a la hebra, o desde el territorio donde germina la materia. Elige tu propio recorrido.',
  'home.path.techniques.title': 'La Ruta de las Técnicas',
  'home.path.techniques.desc':
    'Urdir, trenzar, anudar, tinturar, hilar. Cinco movimientos de la mano, cada uno con sus herramientas y sus tiempos.',
  'home.path.techniques.cta': 'Entrar por la mano',
  'home.path.territory.title': 'La Ruta del Territorio',
  'home.path.territory.desc':
    'Seis regiones, cada una con el color de la tintura o la fibra que allí crece. Del amarillo de la bija en el norte al verde del mangle en el litoral Pacífico.',
  'home.path.territory.cta': 'Entrar por la tierra',
  'home.identity.eyebrow': 'El nombre',
  'home.identity.title': 'Entre el hilo y la emoción',
  'home.identity.body':
    'Fibra es el filamento que entrega la planta y ofrece el animal. En nuestra lengua es también lo que se mueve cuando algo nos toca de verdad: decimos que algo nos tocó las fibras cuando nos estremece o nos cautiva. FIBRA nace en ese cruce, y aquí cada historia es un tejido.',
  'home.identity.a.t': 'La mano que anuda saberes heredados',
  'home.identity.a.b': 'Cada pieza lleva el nombre de quien la hizo y la comunidad que se lo enseñó.',
  'home.identity.b.t': 'La técnica repetida durante generaciones',
  'home.identity.b.b': 'Urdir, trenzar, anudar, tinturar, hilar. El mismo movimiento, sostenido durante siglos en un territorio.',
  'home.identity.c.t': 'La paciencia que convierte materia en memoria',
  'home.identity.c.b': 'Una vasija de werregue son semanas de conteo. El tiempo de elaboración se dice en horas y semanas, no se omite.',
  'home.artisans.eyebrow': 'Crónicas',
  'home.artisans.title': 'Cinco actos, una voz',
  'home.artisans.lede': 'Cada perfil se lee de corrido, en cinco actos, desde la voz de quien teje hasta la puerta de su taller.',

  'atlas.eyebrow': 'Territorios',
  'atlas.title': 'Atlas Textil de Colombia',
  'atlas.lede':
    'Seis regiones cromáticas, leídas como una tela tejida antes que como un mapa político. Cada color se toma de lo que realmente tiñe o crece allí — bija y caña flecha seca en el norte, corteza de nogal y lana cruda en la cordillera, jagua y mangle en el litoral Pacífico.',
  'atlas.hint': 'Seleccione una región para abrir su panel',
  'atlas.hint.touch': 'Toque una franja para abrir su panel',
  'atlas.legend': 'Regiones',
  'atlas.map.label': 'Regiones textiles de Colombia',
  'atlas.region.select': 'Abrir el panel de la región {name}',
  'atlas.note':
    'Las seis franjas son una lectura cromática del país, no un límite catastral. Las fronteras regionales en Colombia se trazan de modo distinto según la institución, y las tradiciones artesanales las cruzan todas.',

  'drawer.close': 'Cerrar el panel de la región',
  'drawer.region': 'Región',
  'drawer.synthesis': 'El tejido aquí',
  'drawer.materials': 'Materiales y extracción',
  'drawer.techniques': 'Técnicas',
  'drawer.communities': 'Pueblos y talleres',
  'drawer.artisans': 'Crónicas de esta región',
  'drawer.noArtisans': 'Todavía no se ha publicado ninguna crónica de esta región. Los perfiles se añaden solo cuando el taller ha revisado y aprobado su propia página.',
  'drawer.viewProfile': 'Leer la crónica',

  'techniques.eyebrow': 'La Ruta de las Técnicas',
  'techniques.title': 'Navegación por el acto de hacer',
  'techniques.lede':
    'Una técnica no es una categoría. Es un movimiento que un cuerpo aprendió de otro cuerpo. Estas cinco atraviesan todas las regiones: el mismo nudo se ata en la península de la Guajira y en la selva del Chocó, y significa algo distinto en cada lugar.',
  'techniques.motion': 'Estudio de movimiento',
  'techniques.reduced': 'El movimiento está en pausa porque su sistema solicita movimiento reducido.',
  'techniques.play': 'Reproducir el estudio de movimiento',
  'techniques.pause': 'Pausar el estudio de movimiento',
  'techniques.materials': 'Se trabaja en',
  'techniques.regions': 'Se practica en',
  'techniques.tempo': 'Tempo',
  'techniques.select': 'Mostrar la técnica de {name}',

  'artisans.eyebrow': 'Crónicas',
  'artisans.title': 'Quienes tejen',
  'artisans.lede':
    'Cada crónica transcurre en cinco actos y se lee como un solo descenso continuo. Nada aquí es una pestaña, porque una vida no es una pestaña.',
  'artisan.back': 'Todas las crónicas',
  'artisan.acts': 'Actos',
  'artisan.act': 'Acto',
  'artisan.progress': 'Avance de la crónica',
  'artisan.community': 'Comunidad',
  'artisan.territory': 'Territorio',
  'artisan.craft': 'Oficio',
  'artisan.region': 'Región',

  'seal.title': 'Sello de Trazabilidad',
  'seal.authorship': 'Autoría individual',
  'seal.affiliation': 'Filiación comunitaria',
  'seal.origin': 'Origen geográfico',
  'seal.material': 'Materia prima',
  'seal.material.value': 'Fibra 100% natural',
  'seal.consent': 'Consentimiento informado de la comunidad',
  'seal.consent.value': 'Registrado y renovable',
  'seal.what': 'Qué declara este sello',
  'seal.explain':
    'El sello nombra a la persona que hizo la pieza y al colectivo al que pertenece el saber. Ambos importan: la autoría sin filiación borra el linaje; la filiación sin autoría borra a la persona.',

  'act.1.roman': 'I',
  'act.1.title': 'La Huella y la Voz',
  'act.2.roman': 'II',
  'act.2.title': 'El Territorio y la Memoria',
  'act.3.roman': 'III',
  'act.3.title': 'La Materia y la Técnica',
  'act.4.roman': 'IV',
  'act.4.title': 'Las Obras del Taller',
  'act.5.roman': 'V',
  'act.5.title': 'El Contacto Directo y el Encargo Ético',

  'zoom.title': 'Traducción sensorial',
  'zoom.lede':
    'Una pantalla no tiene tacto. Lo que sí puede hacer es acercarse lo suficiente para que la torsión, la irregularidad y la densidad se vuelvan legibles — lo que una mano le habría dicho en un segundo.',
  'zoom.instruction': 'Arrastre, o use el control, para recorrer la fibra.',
  'zoom.level': 'Aumento',
  'zoom.reset': 'Restablecer el aumento',
  'zoom.in': 'Acercar',
  'zoom.out': 'Alejar',
  'zoom.reading': 'Lo que está viendo',

  'hotspots.title': 'Leer el patrón',
  'hotspots.lede':
    'Las figuras geométricas en estas tradiciones no son ornamento. Nombran animales, caminos, parentesco y clima. Seleccione un marcador para leer lo que la figura carga.',
  'hotspots.instruction': 'Seleccione un marcador sobre la tela. Use Tab para moverse entre marcadores y Enter para abrir uno.',
  'hotspots.marker': 'Figura {n}: {name}',
  'hotspots.close': 'Cerrar la nota de la figura',
  'hotspots.meaning': 'Lo que carga',
  'hotspots.glossary': 'Glosario semiótico',
  'hotspots.communityHeld': 'Saber comunitario',
  'hotspots.markersLabel': 'marcadores sobre esta tela. Tab para recorrerlos, Enter para abrir.',
  'hotspots.term': 'Término',

  'techniquevideo.title': 'El ritmo de las manos',
  'techniquevideo.lede': 'Bucles mudos. Sin música, sin voz en off. El tempo del trabajo es lo que importa.',

  'works.technique': 'Técnica',
  'works.materials': 'Materiales',
  'works.time': 'Tiempo invertido',
  'works.scale': 'Escala real',
  'works.context': 'En uso',
  'works.note':
    'Estas no son fichas de venta. En esta página no hay precio, porque un precio acordado de antemano por una plataforma es un precio que quien hace la pieza no fijó.',

  'contact.eyebrow': 'Acto V',
  'contact.title': 'Hable con el taller',
  'contact.lede':
    'De aquí en adelante la conversación es suya. FIBRA no se sitúa en medio de ella, no la lee, y no toma nada de lo que ustedes acuerden.',
  'contact.whatsapp': 'Escribir por WhatsApp',
  'contact.call': 'Llamar al taller',
  'contact.prefilled': 'Su mensaje se abrirá ya redactado, y puede cambiar cada palabra:',
  'contact.hours': 'Mejores horas para escribir',
  'contact.language': 'Lenguas que se hablan',
  'contact.nocommission': 'FIBRA no cobra comisión alguna sobre esta conversación.',
  'contact.demoNote':
    'Este es un contacto de demostración. El número es un marcador de posición y no llegará a ningún taller real.',

  'guide.title': 'Guía de Encargo Consciente',
  'guide.lede':
    'Casi toda la fricción entre un taller y un cliente primerizo viene del mismo sitio: expectativas industriales aplicadas a un objeto hecho a mano. Esto es lo que conviene saber antes de escribir.',

  'credits.eyebrow': 'Procedencia',
  'credits.title': 'Créditos y procedencia del contenido',
  'credits.lede':
    'Una plataforma sobre autoría tiene que poder dar cuenta de su propio material. Cada fotografía aquí aparece con su autor y su licencia, y todo lo que aún no está documentado se nombra como tal.',
  'credits.images': 'Fotografía',
  'credits.images.lede':
    'Fotografías de licencia abierta obtenidas de Wikimedia Commons, usadas sin modificar y a resolución reducida para su entrega. Atribución y licencia según lo exige cada licenciante.',
  'credits.author': 'Fotógrafo/a',
  'credits.licence': 'Licencia',
  'credits.source': 'Fuente',
  'credits.depicts': 'Muestra',
  'credits.graphics': 'Gráficos dibujados',
  'credits.graphics.lede':
    'Las estructuras de tejido, los estudios de fibra, la cartografía regional y los bucles de técnicas de este sitio están dibujados como gráficos vectoriales en lugar de fotografiados. Representan geometría estructural real — el entrelazado de un tafetán, la topología de una trenza de tres cabos, el paso de un anillado — para que la técnica sea legible y no meramente ilustrada.',
  'credits.content': 'Contenido editorial',
  'credits.status': 'Estado',

  'demo.title': 'Sobre esta crónica',
  'demo.body':
    'FIBRA publica únicamente lo que un artesano y su colectivo han provisto y aprobado. Este perfil es una demostración de la estructura en cinco actos: la persona, las citas y los datos de contacto son inventados, y así se señala en todo momento. El oficio, los materiales, las regiones y las técnicas descritas son tradiciones documentadas, no inventadas.',
  'demo.short': 'Perfil de demostración — persona inventada, oficio documentado',
  'demo.badge': 'Demostración',

  'common.readMore': 'Leer más',
  'common.close': 'Cerrar',
  'common.next': 'Siguiente',
  'common.previous': 'Anterior',
  'common.of': 'de',
  'common.notFound.title': 'Aquí se acaba el hilo',
  'common.notFound.body': 'La página que pidió no existe. Abajo están las maneras de volver a entrar.',
  'common.notFound.home': 'Volver a la portada',
  'footer.ethics': 'Compromisos permanentes',
  'footer.ethics.1': 'Todo lo publicado es provisto y validado por los artesanos y sus colectivos.',
  'footer.ethics.2': 'La voz curatorial acompaña el testimonio en primera persona; nunca lo suplanta.',
  'footer.ethics.3': 'No se cobra comisión intermediaria sobre ninguna conversación ni encargo.',
  'footer.explore': 'Explorar',
  'footer.about': 'Acerca de',
  'footer.rights': 'El saber artesanal pertenece a las comunidades que lo guardan.',
}

export const UI = { en, es } as const
