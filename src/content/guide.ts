import type { Localized } from '../i18n'

/**
 * The Guide to a Conscious Commission. Rendered inside Act V of every
 * story, because the moment someone is about to write to a workshop is the
 * moment this is worth reading.
 */
export type GuidePoint = {
  id: string
  title: Localized
  body: Localized
  /** A concrete phrasing the reader can lift straight into a message. */
  say?: Localized
}

export const GUIDE: GuidePoint[] = [
  {
    id: 'time',
    title: { en: 'Ask what the time actually covers', es: 'Pregunte qué cubre realmente el tiempo' },
    body: {
      en: 'When a maker says four months, that rarely means four months of continuous work on your piece. It usually includes drying, dyeing that cannot be hurried, waiting on material that is seasonal, and the other obligations of a household. Ask for the sequence rather than the total, and you will both end up with a more honest date.',
      es: 'Cuando alguien dice cuatro meses, rara vez significa cuatro meses de trabajo continuo sobre su pieza. Suele incluir secado, teñido que no admite prisa, espera de material estacional, y las demás obligaciones de una casa. Pida la secuencia antes que el total y ambos terminarán con una fecha más honesta.',
    },
    say: {
      en: 'Could you tell me roughly what the stages are, and which of them depend on weather or material?',
      es: '¿Me podría contar más o menos cuáles son las etapas, y cuáles dependen del clima o del material?',
    },
  },
  {
    id: 'deadline',
    title: { en: 'Do not commission against a hard date', es: 'No encargue contra una fecha rígida' },
    body: {
      en: 'A wedding, a birthday, a trip. If your date cannot move, say so at the very start rather than at the end — it lets the workshop decline, which is often the right answer and is much easier to hear early. Handmade production does not compress under pressure; it only degrades.',
      es: 'Una boda, un cumpleaños, un viaje. Si su fecha no se puede mover, dígalo desde el comienzo y no al final — así el taller puede declinar, que a menudo es la respuesta correcta y es mucho más fácil de escuchar temprano. La producción a mano no se comprime bajo presión; solo se degrada.',
    },
    say: {
      en: 'I need this by the 14th and I cannot move that date. Is that realistic for you? A no is completely fine.',
      es: 'Lo necesito para el 14 y no puedo mover esa fecha. ¿Es realista para usted? Un no está perfectamente bien.',
    },
  },
  {
    id: 'price',
    title: { en: 'Let them name the price first', es: 'Deje que sean ellos quienes nombren el precio' },
    body: {
      en: 'Opening with a budget anchors the conversation downward, and in craft it also signals that you are buying a category rather than a piece. Ask what the work costs. If it is beyond what you can spend, say that plainly and ask whether a smaller or simpler piece would work — that is a respectful question. Haggling over hours is not.',
      es: 'Abrir con un presupuesto ancla la conversación hacia abajo, y en el oficio además señala que usted está comprando una categoría y no una pieza. Pregunte cuánto cuesta el trabajo. Si excede lo que puede gastar, dígalo con claridad y pregunte si una pieza más pequeña o más simple funcionaría — esa es una pregunta respetuosa. Regatear por horas no lo es.',
    },
    say: {
      en: 'What would a piece like this cost? I would rather you set the price than have me guess at it.',
      es: '¿Cuánto costaría una pieza así? Prefiero que usted fije el precio a tener que adivinarlo yo.',
    },
  },
  {
    id: 'variation',
    title: { en: 'Expect the piece to differ from the photograph', es: 'Espere que la pieza difiera de la fotografía' },
    body: {
      en: 'Natural dye lots vary. Fibre varies by season and by plant. A hand-spun yarn is not consistent by design. If you need an exact match to something you have seen, say so and accept that it may not be possible — and that being told so is the workshop being straight with you, not making excuses.',
      es: 'Los lotes de tintura natural varían. La fibra varía según la estación y la planta. Un hilo hecho a mano no es uniforme por diseño. Si necesita una coincidencia exacta con algo que vio, dígalo y acepte que puede no ser posible — y que decírselo es el taller siendo franco, no poniendo excusas.',
    },
  },
  {
    id: 'design',
    title: { en: 'Be careful what you ask to have redesigned', es: 'Tenga cuidado con lo que pide rediseñar' },
    body: {
      en: 'Asking for a different size or a different colourway is ordinary. Asking a maker to reproduce a figure that belongs to another community, or to strip a traditional design of the elements that make it that design, is not. If you want something adapted, describe the use and let them propose the form.',
      es: 'Pedir otro tamaño u otra combinación de color es corriente. Pedirle a quien teje que reproduzca una figura que pertenece a otra comunidad, o que despoje un diseño tradicional de los elementos que lo hacen ese diseño, no lo es. Si quiere algo adaptado, describa el uso y deje que ellos propongan la forma.',
    },
    say: {
      en: 'It is for a small room with low light — what would you suggest, in your own repertoire?',
      es: 'Es para un cuarto pequeño con poca luz — ¿qué sugeriría usted, dentro de su propio repertorio?',
    },
  },
  {
    id: 'payment',
    title: { en: 'Pay something up front, and pay it early', es: 'Pague algo por adelantado, y páguelo temprano' },
    body: {
      en: 'Material has to be bought before work begins, and in most workshops that money comes out of a household budget. A deposit is not a formality, it is working capital. Agree the split when you agree the piece, and send the first part before the first day rather than after it.',
      es: 'El material hay que comprarlo antes de empezar, y en la mayoría de los talleres ese dinero sale del presupuesto de una casa. Un anticipo no es una formalidad, es capital de trabajo. Acuerde el reparto cuando acuerde la pieza, y envíe la primera parte antes del primer día y no después.',
    },
  },
  {
    id: 'silence',
    title: { en: 'Read silence correctly', es: 'Lea bien el silencio' },
    body: {
      en: 'Connectivity is uneven in most of the territories on this platform, and a workshop may be a boat ride from a signal. Several days without a reply usually means exactly that. Write once, wait, and write again in a week — repeated messages read as pressure and rarely speed anything up.',
      es: 'La conectividad es despareja en la mayoría de los territorios de esta plataforma, y un taller puede estar a un viaje en lancha de una señal. Varios días sin respuesta suelen significar exactamente eso. Escriba una vez, espere, y vuelva a escribir en una semana — los mensajes repetidos se leen como presión y rara vez aceleran nada.',
    },
  },
  {
    id: 'credit',
    title: { en: 'Name the maker afterwards', es: 'Nombre después a quien la hizo' },
    body: {
      en: 'If the piece ends up in your shop, your project, your photographs — carry the name and the community with it. Anonymity is the mechanism by which craft work is devalued, and attribution costs you nothing. This applies with particular force if you are a designer buying for production.',
      es: 'Si la pieza termina en su tienda, su proyecto, sus fotografías — lleve con ella el nombre y la comunidad. El anonimato es el mecanismo por el que se devalúa el trabajo artesanal, y atribuir no le cuesta nada. Esto aplica con especial fuerza si usted es diseñador y compra para producción.',
    },
  },
]

/** Pre-written opening message, offered as a starting point and fully editable. */
export const OPENING_MESSAGE: Localized = {
  en: 'Good morning. I found your work through FIBRA and I would like to ask about a commission. I am not in a hurry and I would rather hear your timescale before I say anything about mine. Could you tell me what you are working on at the moment and whether you are taking new pieces?',
  es: 'Buenos días. Encontré su trabajo a través de FIBRA y quisiera preguntar por un encargo. No tengo afán y prefiero conocer sus tiempos antes de decir nada sobre los míos. ¿Me podría contar en qué está trabajando ahora y si está tomando piezas nuevas?',
}
