/**
 * UI string table. English is authored first and its keys become the contract:
 * `es` is typed as Record<UIKey, string>, so a missing Spanish translation is a
 * compile error rather than a silent English leak at runtime.
 * Content strings (region prose, artisan stories) live in src/content — this
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
  'nav.about': 'About',
  'nav.credits': 'Credits',
  'nav.menu': 'Menu',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.primary': 'Primary',

  // --- Home -----------------------------------------------------------------
  'home.eyebrow': 'The pulse of the strand',
  'home.hero.curatorial':
    'FIBRA is a living archive of weaving in Colombia. History is not summarised here: it is warped in the first person, naming the hand that pulls it taut, the territory that gives the fibre, and the knowledge that has held for centuries without losing its pulse.',
  'home.hero.scroll': 'Follow the course of the thread',
  'home.hero.cta': 'Start unwinding the skein',
  'home.thread.note':
    'A single thread holds this story together. Where you cross it, the thread opens into separate ends: each strand takes its own course, towards the land or towards the craft.',
  'home.paths.title': 'Two ways to untie memory.',
  'home.paths.lede':
    'You can come in through the technique of the hands that transform the strand, or through the territory where the raw material is born. Choose which end of the thread you want to start pulling.',
  'home.path.techniques.title': 'The path of techniques',
  'home.path.techniques.desc':
    'Warping, twisting, knotting, steeping, spinning. Five exact movements in which the body converses with tension, rhythm and tool.',
  'home.path.techniques.cta': 'Enter through the craft',
  'home.path.territory.title': 'The path of territories',
  'home.path.territory.desc':
    'Six regions dyed by their surroundings. From the solar yellow of bija in the north, to the deep green of mangrove and Pacific mud.',
  'home.path.territory.cta': 'Enter through the region',
  'home.identity.title': 'About FIBRA',
  'home.identity.body.1':
    'Fibre is the filament a plant gives up and an animal offers; what the human hand transforms.',
  'home.identity.body.2':
    'But in Spanish, fibra is also what moves in you when something truly reaches you: we say something has touched our fibres when it shakes us, captivates us, and comes to live in us.',
  'home.identity.body.3':
    'FIBRA is born at that exact crossing: between craft and wonder. Here every story is a weave; we do not show objects, we show hands that weave time.',
  'home.artisans.eyebrow': 'Stories',
  'home.artisans.title': 'Five acts, one voice',
  'home.artisans.lede':
    'Each profile unwinds straight through, in five acts: from the voice of the person who scrapes, spins and knots, to the very door of their workshop.',

  // --- Atlas ----------------------------------------------------------------
  'atlas.eyebrow': 'Territories',
  'atlas.title': 'Textile Atlas of Colombia',
  'atlas.lede':
    'Six chromatic regions, read as a woven cloth rather than a political map. Each colour is taken from what actually dyes or grows there — bija and dry arrow cane in the north, walnut bark and raw wool in the cordillera, jagua and mangrove on the Pacific coast.',
  'atlas.scroll': 'See the six regions',
  'atlas.hint': 'Select a region to open its panel',
  'atlas.hint.touch': 'Tap a band to open its panel',
  'atlas.map.label': 'Textile regions of Colombia',
  'atlas.map.alt':
    'Map of Colombia knitted in wool, with each of the six textile regions worked in its own dye colour.',
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
  'drawer.artisans': 'Stories from this region',
  'drawer.noArtisans': 'No story has been published from this region yet. Profiles are added only once the workshop has reviewed and approved its own page.',
  'drawer.viewProfile': 'Read the full story',

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
  'artisans.eyebrow': 'Stories',
  'artisans.title': 'The weavers',
  'artisans.lede': 'Each story unwinds in five acts: one continuous passage',
  'artisan.back': 'All stories',
  'artisan.acts': 'Acts',
  'artisan.act': 'Act',
  'artisan.progress': 'Story progress',
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
  'seal.consent': 'Informed community consent',
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
  'contact.prefilledPending':
    'When the workshop’s number is published, your message will open pre-written — and you will be able to change every word of it:',
  'contact.hours': 'Best hours to write',
  'contact.language': 'Languages spoken',
  'contact.instagram': 'Instagram',
  'contact.website': 'Website',
  'contact.nocommission': 'FIBRA charges no commission on this conversation.',
  'contact.withheld': 'Number not published yet',
  'contact.withheld.why':
    'Publishing a workshop’s telephone is a separate consent from publishing a story, and this one has not been given. The buttons above are inactive rather than pointed at a placeholder that would not reach her.',

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
  'credits.sourceOwn': 'Project archive',
  'credits.depicts': 'Depicts',
  'credits.graphics': 'Drawn graphics',
  'credits.graphics.lede':
    'Weave structures, fibre studies, the regional cartography and the technique loops on this site are drawn as vector graphics rather than photographed. They render real structural geometry — the interlacement of a plain weave, the topology of a three-strand braid, the pitch of a coil — so that the technique is legible rather than merely illustrated.',
  'credits.content': 'Editorial content',
  'credits.status': 'Status',

  // --- Provenance notice ----------------------------------------------------
  'provenance.title': 'Where this material comes from',
  'provenance.body.1':
    'FIBRA publishes only the testimony that each artisan and each workshop has shared and authorised.',
  'provenance.body.2':
    'Every chronicle comes out of direct conversation beside the person who commands the fibre: the first-person voice, the memory held in the hands, the meaning of the symbols and the time spent at the loom are entirely theirs. Our work is to thread the account across five acts.',
  'provenance.body.3':
    'Contact details are given directly and with consent, safeguarding the autonomy of the makers and opening transparent channels in place of intermediation.',
  'provenance.short': 'From a recorded interview with the artisan',
  'provenance.badge': 'Artisan-supplied',

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
  'nav.about': 'Acerca de',
  'nav.credits': 'Créditos',
  'nav.menu': 'Menú',
  'nav.open': 'Abrir menú',
  'nav.close': 'Cerrar menú',
  'nav.primary': 'Principal',

  'home.eyebrow': 'El latido de la hebra',
  'home.hero.curatorial':
    'FIBRA es un archivo vivo de la tejeduría en Colombia. Aquí la historia no se resume: se urde en primera persona, nombrando la mano que tensa, el territorio que provee la fibra y el saber que ha resistido siglos sin perder su pulso.',
  'home.hero.scroll': 'Seguir curso del hilo',
  'home.hero.cta': 'Comienza a desmadejar',
  'home.thread.note':
    'Un solo hilo sostiene este relato. Al cruzarlo, se abre en cabos: cada hebra toma su propio rumbo hacia la tierra o hacia el oficio.',
  'home.paths.title': 'Dos maneras de desatar la memoria.',
  'home.paths.lede':
    'Puedes entrar por la técnica de las manos que transforman la hebra, o por el territorio donde nace la materia prima. Escoge qué extremo del hilo quieres empezar a halar.',
  'home.path.techniques.title': 'La ruta de las técnicas',
  'home.path.techniques.desc':
    'Urdir, torcer, anudar, macerar, hilar. Cinco movimientos exactos donde el cuerpo dialoga con la tensión, el ritmo y la herramienta.',
  'home.path.techniques.cta': 'Entrar en el oficio',
  'home.path.territory.title': 'La ruta de los territorios',
  'home.path.territory.desc':
    'Seis regiones teñidas por su entorno. Del amarillo solar de la bija en el norte, al verde profundo del mangle y el lodo pacífico.',
  'home.path.territory.cta': 'Entrar por la región',
  'home.identity.title': 'Acerca de FIBRA',
  'home.identity.body.1':
    'Fibra es el filamento que la planta entrega y el animal ofrece; lo que la mano humana transforma.',
  'home.identity.body.2':
    'Pero en nuestra lengua, fibra es también lo que se mueve cuando algo nos toca de verdad: decimos que algo nos tocó las fibras cuando nos estremece, nos cautiva y nos habita.',
  'home.identity.body.3':
    'FIBRA nace en ese cruce exacto: entre el oficio y el asombro. Aquí cada historia es un tejido; no mostramos objetos, mostramos manos que tejen tiempo.',
  'home.artisans.eyebrow': 'Historias',
  'home.artisans.title': 'Cinco actos, una voz',
  'home.artisans.lede':
    'Cada perfil se desmadeja de corrido, en cinco actos: desde la voz de quien raspa, hila y anuda, hasta la puerta misma de su taller.',

  'atlas.eyebrow': 'Territorios',
  'atlas.title': 'Atlas Textil de Colombia',
  'atlas.lede':
    'Seis regiones cromáticas, leídas como una tela tejida antes que como un mapa político. Cada color se toma de lo que realmente tiñe o crece allí — bija y caña flecha seca en el norte, corteza de nogal y lana cruda en la cordillera, jagua y mangle en el litoral Pacífico.',
  'atlas.scroll': 'Ver las seis regiones',
  'atlas.hint': 'Seleccione una región para abrir su panel',
  'atlas.hint.touch': 'Toque una franja para abrir su panel',
  'atlas.map.label': 'Regiones textiles de Colombia',
  'atlas.map.alt':
    'Mapa de Colombia tejido en lana, con cada una de las seis regiones textiles trabajada en su propio color de tinte.',
  'atlas.region.select': 'Abrir el panel de la región {name}',
  'atlas.note':
    'Las seis franjas son una lectura cromática del país, no un límite catastral. Las fronteras regionales en Colombia se trazan de modo distinto según la institución, y las tradiciones artesanales las cruzan todas.',

  'drawer.close': 'Cerrar el panel de la región',
  'drawer.region': 'Región',
  'drawer.synthesis': 'El tejido aquí',
  'drawer.materials': 'Materiales y extracción',
  'drawer.techniques': 'Técnicas',
  'drawer.communities': 'Pueblos y talleres',
  'drawer.artisans': 'Historias de esta región',
  'drawer.noArtisans': 'Todavía no se ha publicado ninguna historia de esta región. Los perfiles se añaden solo cuando el taller ha revisado y aprobado su propia página.',
  'drawer.viewProfile': 'Leer la historia completa',

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

  'artisans.eyebrow': 'Historias',
  'artisans.title': 'Quienes tejen',
  'artisans.lede': 'Cada historia se desmadeja en cinco actos: un solo recorrido continuo',
  'artisan.back': 'Todas las historias',
  'artisan.acts': 'Actos',
  'artisan.act': 'Acto',
  'artisan.progress': 'Avance de la historia',
  'artisan.community': 'Comunidad',
  'artisan.territory': 'Territorio',
  'artisan.craft': 'Oficio',
  'artisan.region': 'Región',

  'seal.title': 'Sello de Trazabilidad',
  'seal.authorship': 'Autoría individual',
  'seal.affiliation': 'Filiación comunitaria',
  'seal.origin': 'Origen geográfico',
  'seal.material': 'Materia prima',
  'seal.consent': 'Consentimiento informado de la comunidad',
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
  'contact.prefilledPending':
    'Cuando el número del taller se publique, su mensaje se abrirá ya redactado — y podrá cambiar cada palabra:',
  'contact.hours': 'Mejores horas para escribir',
  'contact.language': 'Idiomas que se hablan',
  'contact.instagram': 'Instagram',
  'contact.website': 'Sitio web',
  'contact.nocommission': 'FIBRA no cobra comisión alguna sobre esta conversación.',
  'contact.withheld': 'Número aún no publicado',
  'contact.withheld.why':
    'Publicar el teléfono de un taller es un consentimiento distinto del de publicar una historia, y este no se ha dado. Los botones de arriba están inactivos en lugar de apuntar a un número de relleno que no llegaría a ella.',

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
  'credits.sourceOwn': 'Archivo del proyecto',
  'credits.depicts': 'Muestra',
  'credits.graphics': 'Gráficos dibujados',
  'credits.graphics.lede':
    'Las estructuras de tejido, los estudios de fibra, la cartografía regional y los bucles de técnicas de este sitio están dibujados como gráficos vectoriales en lugar de fotografiados. Representan geometría estructural real — el entrelazado de un tafetán, la topología de una trenza de tres cabos, el paso de un anillado — para que la técnica sea legible y no meramente ilustrada.',
  'credits.content': 'Contenido editorial',
  'credits.status': 'Estado',

  'provenance.title': 'De dónde viene este material',
  'provenance.body.1':
    'FIBRA publica exclusivamente los testimonios compartidos y autorizados por cada artesana, artesano y taller.',
  'provenance.body.2':
    'Cada crónica nace de conversaciones directas junto a quien domina la fibra: la voz en primera persona, la memoria de las manos, el sentido de los símbolos y el tiempo invertido en el telar son enteramente suyos. Nuestra labor es hilar el relato a lo largo de cinco actos.',
  'provenance.body.3':
    'Los datos de contacto se presentan de manera directa y bajo consentimiento, salvaguardando la autonomía de los creadores y abriendo canales transparentes frente a la intermediación.',
  'provenance.short': 'De una entrevista grabada con la artesana',
  'provenance.badge': 'Provisto por la artesana',

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
