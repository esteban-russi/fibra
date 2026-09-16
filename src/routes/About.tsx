import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { useReducedMotion } from '../lib/hooks'
import { SectionHeading, ThreadRule } from '../components/ui/primitives'
import { ContactIcon } from '../components/graphics/ContactIcon'
import { MEDIA } from '../content/media'

/**
 * Who FIBRA is, on a page of its own.
 *
 * This was a block at the foot of the cover, where it sat below two route cards
 * and read as an afterthought to them. It is not an afterthought: it states what
 * the platform is for and who is answerable for it, which is the first thing a
 * visitor arriving from outside asks. Given its own route it can be linked to,
 * shared and cited, which a hash halfway down the home page cannot.
 *
 * Three movements, in the order a stranger needs them: what the platform does,
 * what its name means, and whose hands made it. The third is first-person and
 * is set apart from the curatorial voice above it — the same rule the artisan
 * profiles keep, applied to the person who built the site.
 */
/** Her own professional record, given as she asked it to be listed. Kept
 *  percent-encoded as LinkedIn issues it: the vanity slug carries an ó and an ñ,
 *  and the escaped form is the one that resolves everywhere. */
const LINKEDIN = 'https://www.linkedin.com/in/valeriale%C3%B3nni%C3%B1o/'

/**
 * Her line, as she gave it. One number serves both channels, the way each
 * workshop's does in act V.
 *
 * No opening message rides in the wa.me link here. `OPENING_MESSAGE` asks a
 * workshop about its timescale before a commission, which is the wrong thing
 * to put in a stranger's mouth when the person they are writing to is the one
 * who built the site.
 */
const PHONE = { digits: '447824768215', display: '+44 7824 768215' }

/**
 * The magazine she founded, linked from the sentence that names it.
 *
 * The name travels inside the sentence in both languages, so the link is cut
 * out of the translated string at render rather than kept as its own key: the
 * prose stays one sentence to a translator, and the anchor lands on the word
 * wherever that language puts it.
 */
const DMODA = { name: 'd_moda', href: 'https://www.instagram.com/magazined_moda' }

/** Splits a sentence around the magazine's name and links the name itself. */
function withDmodaLink(sentence: string) {
  const at = sentence.indexOf(DMODA.name)
  if (at === -1) return sentence
  return (
    <>
      {sentence.slice(0, at)}
      <a
        href={DMODA.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-bordeaux transition-colors hover:text-clay"
      >
        {DMODA.name}
      </a>
      {sentence.slice(at + DMODA.name.length)}
    </>
  )
}

export function About() {
  const { t, pick } = useI18n()
  const reduced = useReducedMotion()
  const portrait = MEDIA.valeriaRetrato

  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10%' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="mx-auto max-w-[86rem] px-5 pb-24 pt-[calc(var(--header-h)+3.5rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
      <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} lede={t('about.lede')} />

      <ThreadRule className="my-14 sm:my-16" />

      {/* What the name means. Set in the serif and given its own ground: it is a
          definition rather than prose, and it is the one passage on the site
          that explains the word the whole project is built on. */}
      <motion.section {...rise} aria-labelledby="about-name">
        <h2 id="about-name" className="sr-only">
          {t('about.title')}
        </h2>
        <div className="max-w-4xl space-y-6 border-l-2 border-ash bg-surface/50 px-6 py-8 text-pretty font-serif text-xl leading-[1.6] text-ink/85 sm:px-10 sm:py-10 sm:text-[1.4375rem]">
          <p>{t('about.name.1')}</p>
          <p>{t('about.name.2')}</p>
          <p className="text-bordeaux">{t('about.name.3')}</p>
        </div>
      </motion.section>

      <ThreadRule className="my-14 sm:my-16" />

      {/* Whose hands. The portrait sits beside the sentence that introduces her,
          circular so it reads as a person rather than as another documentary
          frame in the registry. */}
      <motion.section {...rise} aria-labelledby="about-weaver" className="max-w-4xl">
        <h2 id="about-weaver" className="font-serif text-2xl text-bordeaux sm:text-3xl">
          {t('about.weaver.title')}
        </h2>

        <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-10">
          <img
            src={portrait.src}
            alt={pick(portrait.alt)}
            width={portrait.width}
            height={portrait.height}
            loading="lazy"
            decoding="async"
            className="h-40 w-40 shrink-0 rounded-full object-cover ring-1 ring-line sm:h-52 sm:w-52"
          />
          <p className="text-pretty font-serif text-xl italic leading-[1.45] text-bordeaux sm:text-2xl">
            {t('about.weaver.1')}
          </p>
        </div>

        <div className="mt-10 space-y-5 text-pretty text-[1.0625rem] leading-[1.75] text-ink/85">
          <p>{t('about.weaver.2')}</p>
          <p>{withDmodaLink(t('about.weaver.3'))}</p>
          <p>{t('about.weaver.4')}</p>
        </div>

        {/* Her channels, not the site's: the one place on FIBRA that points away
            from the work and at the person answerable for it. It closes her
            account rather than interrupting it — you read who she is, and then
            where to find her.

            Her number is set in the mono face at the same weight act V gives a
            workshop's, because it is the same kind of claim: a real line a real
            person answers. */}
        <div className="mt-10 border-t border-line pt-8">
          <p className="eyebrow">{t('about.weaver.reach')}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-9 gap-y-5">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('about.weaver.linkedinLabel')}
              className="inline-flex items-center gap-3 rounded-sm text-[1.0625rem] text-clay transition-colors hover:text-bordeaux"
            >
              <ContactIcon kind="linkedin" size={28} />
              {t('about.weaver.linkedin')}
            </a>

            <a
              href={`https://wa.me/${PHONE.digits}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('about.weaver.whatsappLabel')}
              className="inline-flex items-center gap-3 rounded-sm text-[1.0625rem] text-clay transition-colors hover:text-bordeaux"
            >
              <ContactIcon kind="whatsapp" size={28} />
              {t('about.weaver.whatsapp')}
            </a>

            <a
              href={`tel:+${PHONE.digits}`}
              aria-label={t('about.weaver.callLabel')}
              className="inline-flex items-center gap-3 rounded-sm font-mono text-[1.0625rem] tabular-nums text-clay transition-colors hover:text-bordeaux"
            >
              <ContactIcon kind="phone" size={28} />
              {PHONE.display}
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
