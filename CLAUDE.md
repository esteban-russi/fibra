# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Pre-implementation. The directory contains only the concept/UX specification
(`FIBRA_ Concepto Creativo, Arquitectura y Experiencia de Usuario.docx`) and an
empty `README.py`. There is no source code, dependency manifest, build system,
test suite, or git repository yet. No stack has been chosen — ask before
scaffolding one.

The spec is in Spanish and is the single source of truth for the product. To
read it: unzip the `.docx` and strip tags from `word/document.xml`.

## What FIBRA is

A digital storytelling platform for Colombian textile artisanship. Deliberately
**not** a marketplace: there is no cart, no checkout, no transaction commission.
Contact between visitor and artisan happens directly (WhatsApp / call). The
artisan is framed as *author and custodian of memory*, not as a supplier.

This positioning drives concrete implementation constraints — if a change adds
transactional commerce, intermediation fees, or reduces a piece to a SKU with a
price, it contradicts the spec.

## Information architecture

Four top-level surfaces, navigated non-linearly:

1. **Home / immersive cover** — hero is a micro-narrative (macro photo or silent
   video of hands and fiber + first-person artisan quote), not a catalog or menu.
   A continuous "hilo conductor" thread follows vertical scroll and *frays*
   (`deshilachado`) at mid-page into multiple vector strands, branching to the
   two exploration routes below.
2. **Atlas Textil de Colombia** — the territory route. Interactive map.
3. **Técnicas** — the transversal route, organized by the *act of
   making*: urdir, anudar, tinturar, trenzar, hilar. A grid of **photographs**
   of the work, one per gesture (`technique.photo` into `MEDIA`). The drawn
   loops that used to animate here are gone; they survive as the static marks in
   `TechniqueIcon`, which identify a technique wherever it is referenced — the
   grid, the detail page, an artisan's summary card, "El ritmo de las manos".
   Only one of the five photographs was taken in Colombia; every caption says
   where its frame comes from and none claims a territory it does not have.
   `technique.focus` tightens a crop in CSS, never in the file.
4. **Artisan profiles** — sequential editorial chronicles.

## Domain model

### Regions (6 visual regions, 5 cultural content blocks)

Each region carries a color code derived from natural dyes/fibers — the palette
is semantic, not decorative:

| Region | Color | Key fibers / techniques |
|---|---|---|
| Caribe | solar yellow / mustard (bija, achiote, dry caña flecha) | caña flecha (Zenú braiding), wild cotton, Wayuu vertical loom |
| Orinoquía | vibrant orange / terracotta (savanna soils, seed dyes) | moriche fiber, traditional fishing nets, Sikuani basketry |
| Andina | deep earth brown (walnut bark, raw wool) | virgin wool on pedal loom (Boyacá), spindle spinning, fique (Santander, Nariño) |
| Amazonía | moss green / muted olive (chlorophyll, carayurú) | cumare palm (coiling/twisting), yanchama bark, jungle dyes |
| Pacífica | emerald / rainforest green (jagua, mangrove) | werregue palm (Wounaan basketry), damagua, cabecinegro |
| Insular | turquoise / luminous marine | coconut fiber, Raizal basketry, coastal nets |

### Bottom drawer (Atlas interaction)

Clicking a region strip scales the map back slightly and slides a panel up from
the bottom edge at ~60–70% viewport height. Contents: regional header with its
color code, historical/cultural synthesis, photo sampler of endemic materials
and extraction processes, and links to that region's artisan profiles. Closes
via a visible top "X" or click-outside, sliding back down and restoring the map.
**No audio** on any map interaction — navigation stays visually clean.

### Artisan profile — 5 acts

A single continuous scroll, explicitly **not** tabs:

- **I. La Huella y la Voz** — name, the artisan's portrait, and one summary card
  carrying community, geographic origin, raw material and techniques, with
  authorship and informed consent as its footnote. The card replaced a separate
  Traceability Seal panel: the same claims, stated once. The first screen is
  kept free of repetition — region, craft and community each appear exactly
  once. The pull quote sits **between acts I and II**, on its own ground, not
  over the hero.
- **II. El Territorio y la Memoria** — intergenerational transmission: who taught
  them, what the craft means in their setting.
- **III. La Materia y la Técnica** — "El ritmo de las manos": the techniques this
  workshop performs, as circular photographs of the work, each linking to the
  technique route. The progressive-zoom fibre lens and the pattern hotspots were
  removed from this act; their content (`fibre`, `hotspots`, `glossary`) is still
  in `artisans.ts` and still belongs to the artisans.
- **IV. Las Obras del Taller** — a grid of the workshop's own photographs of
  its pieces, and nothing else. The name of a piece appears over the image on
  hover (and stays visible on a touch screen); there is no caption, no record
  and no price — nor the line that used to explain the absence of one, which
  was removed too: the act says it by having nothing to say it about, and the
  footer still carries the standing commitment. The full records the artisans
  gave — technique, materials, making time, real scale, use context — stay in
  `artisans.ts` as `works`, without a surface. `gallery[].named` marks whether
  the name shown is the workshop's own or our description of what is in the
  frame; every `false` is a piece still waiting for its workshop to name it.
  The piece photographs are credited to each workshop ("Cedida por el taller"),
  not to FIBRA, and only their webp deliveries are versioned — the originals
  named in each record's `file` are not in the repository.
- **V. El Contacto Directo y el Encargo Ético** — the workshop's line, with
  direct WhatsApp/call beneath it and the handles she asked to be listed. The
  act prints no title of its own (`Act titled={false}`): its content already
  opens with "Hable con el taller", and the act name identifies it in the rail.
  The "Guía de Encargo Consciente" accordion and the on-page preview of the
  pre-written message were both removed; the message itself still travels in
  the wa.me link (`content/message.ts`), editable before it is sent. The hours
  and languages she gave stay in `artisans.ts` without a surface.

## Sensory / semiotic modules

The spec proposes three devices to compensate for the absent sense of touch. Two
have since been removed from the interface by decision, and the third was folded
into the profile's summary card:

- **Sensory translation** (progressive fibre zoom) — **removed.** The `fibre`
  reading stays in `artisans.ts`.
- **Interactive semiotic narrative** (pattern hotspots and glossary) —
  **removed.** `hotspots` and `glossary` stay in `artisans.ts`.
- **Traceability / author's-mark** — **folded** into the act I summary card:
  geographic origin, raw material and community affiliation as card rows,
  authorship and informed consent as its footnote. Making time stays with each
  piece in act IV.

The "De dónde viene este material" provenance notice no longer runs inside a
profile — the act I card already states the same split for the person you are
reading. `ProvenanceNotice` still opens the artisan index and the region drawer,
where it covers material the reader has not been given a card for.

Both removals are deliberate, not oversights. The content was kept because it
was supplied and validated by the artisans; reinstating either module is a
matter of building a surface for data that is already there.

## Ethical constraints

Standing rules from the spec, to be honored in content and code:

- Published information is supplied and validated by the artisans and their
  collectives. Don't invent artisan biographies, communities, or symbol meanings
  as placeholder content — use obviously-fake filler or leave slots empty.
- The curatorial voice accompanies but never supplants first-person testimony;
  keep the two typographically and structurally distinct.
- The platform charges no intermediary commission on conversations or commissions.
- Avoid cultural extractivism and folklorization.

## Language

Spec, content, and UI copy are Spanish. Domain terms (`deshilachado`, `urdimbre`,
`caña flecha`, `werregue`, `greca`) are precise craft vocabulary — keep them in
Spanish rather than translating in identifiers or copy.
