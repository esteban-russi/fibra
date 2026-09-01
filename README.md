# FIBRA

A digital storytelling platform for Colombian textile artisanship. Deliberately
**not** a marketplace: there is no cart, no checkout and no transaction
commission. Contact between visitor and artisan happens directly, and the
artisan is framed as *author and custodian of memory* rather than as a supplier.

Bilingual throughout — English primary, Spanish switchable — with the choice
persisted and `<html lang>` kept in sync.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build on :4173
npm run typecheck
```

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion · React Router · Lucide.
No CSS-in-JS, no component library — the visual system is defined as design
tokens in `src/index.css` and composed with utility classes.

## Layout

```
src/
  i18n/            LanguageProvider, and the UI string table (ui.ts)
  content/         All editorial content, bilingual — regions, techniques,
                   artisan stories, the commission guide, the media registry
  components/
    graphics/      Drawn textile system: weave plates, fibre studies,
                   technique loops, the hilo conductor
    atlas/         The band cartography and the region drawer
    artisan/       Zoom lens, semiotic hotspots, traceability seal, contact
    ui/            Shared primitives
  routes/          One file per surface
tools/             Verification harnesses — see below
```

## The four surfaces

1. **Cover** (`/`) — a micro-narrative hero, and a continuous SVG thread that
   draws itself as you scroll and *frays* at mid-page into strands leading to
   the two exploration routes.
2. **Textile Atlas** (`/atlas`, `/atlas/:region`) — six chromatic bands read as
   a woven cloth. Selecting one scales the map back and raises a bottom drawer
   to ~70% of the viewport. The open region lives in the URL, so panels are
   linkable and the Back button closes them.
3. **Techniques** (`/techniques`, `/techniques/:technique`) — the transversal route,
   organised by the act of making: urdir, trenzar, anudar, tinturar, hilar.
4. **Stories** (`/artisans/:slug`) — five acts read as one continuous
   descent, explicitly not tabs.

Plus `/credits`. The Guide to a Conscious Commission is no longer a route of
its own; it lives inside Act V of each story.

## Why the graphics are drawn rather than photographed

Weave structures, fibre studies, the cartography and the technique loops are
rendered as vector graphics carrying real structural geometry — the
interlacement of a plain weave, the oblique crossing of a three-strand braid,
the pitch of a coil, the ply angle of a two-ply cord. Three reasons:

1. It makes the *technique* legible rather than merely illustrated, which suits
   a platform organised around the act of making.
2. Openly-licensed photography of Colombian textile practice is genuinely
   sparse, and the nearest matches are frequently from other countries. Using
   those would misrepresent the traditions the site is about.
3. The photographic registry documents other people in other regions. Attaching
   one of those frames to a named living artisan — as though it were her, or her
   workshop — would be exactly the cultural extractivism the project exists to
   avoid. Drawn plates stand in until these workshops supply their own images.

Real photography is used where it is verified and correctly attributed — nine
openly-licensed images, listed with author and licence on `/credits` and
credited again in place. They are used unmodified apart from resampling; crops
are done in CSS so no derivative work is created, several being share-alike.

## Content status

Three profiles are published, and each one is built from a recorded interview
with the artisan it names — Luz María Rodríguez Rodríguez (Sutatausa,
Cundinamarca), Flor Imbacuan (Resguardo de Carlosama, Nariño) and Ada «Adita»
(Chapinero, Bogotá). The demonstration profiles that preceded them — invented
people attached to documented crafts — were removed rather than kept alongside,
so nothing on the site is a person who does not exist.

Every profile carries a provenance notice stating the split rather than hiding
it:

- **Supplied by the artisan** — her name, community, territory, craft, the
  quotations, who taught her, the fibre reading, the figures and their meanings,
  the works and the times attached to them.
- **Curatorial** — the ordering into five acts, the English translation (Spanish
  is the language everything was said in and is authoritative), and the notes
  explicitly marked as structural.
- **Withheld** — the workshop telephone numbers. Publishing a number is a
  separate consent from publishing a story and has not been given, so the
  contact buttons render inert and say which consent is missing instead of
  linking a placeholder.
- **Documented, not community-validated** — the regions, materials, extraction
  processes and technique pages, written from the published record.

Semiotic hotspots describe construction, which the eye can verify, and publish a
figure's *meaning* only where its holder stated it, attributed to her. No
cosmology is invented for a real people's real designs. `/credits` states all of
this in the product.

## Accessibility

Verified by the harnesses in `tools/`, against both the dev server and the
production build:

- Region drawer is a real modal — focus moves in and is trapped, background
  scroll is locked, Escape and click-outside close it, focus returns to the band.
- Hotspots, the zoom lens, the map bands and the language switcher all work from
  the keyboard; the map bands are a roving-tabindex group with arrow-key support.
- Every image carries authored alt text in both languages.
- Reduced-motion preference pauses every loop and disables scroll-driven drawing;
  there is also an explicit motion toggle for people who have not set the OS one.
- WCAG AA contrast across all routes, including text over gradient scrims, which
  is measured from real painted pixels rather than computed styles.

## Verification

```bash
node tools/verify.mjs      # 30 interaction + a11y assertions
node tools/contrast.mjs    # WCAG AA audit, DOM-resolved backgrounds
node tools/bandboxes.mjs && python3 tools/measure.py   # contrast over scrims
node tools/shoot.mjs       # screenshots + console/network error sweep
```

`BASE=http://localhost:4173` targets the production preview instead of dev.
These drive the system Chrome through `puppeteer-core`; nothing is downloaded.
