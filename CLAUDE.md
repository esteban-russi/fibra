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
3. **Gestos / Técnicas** — the transversal route, organized by the *act of
   making*: urdir, anudar, tinturar, trenzar, hilar. Grid/carousel of looping
   hand-motion clips.
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

- **I. La Huella y la Voz** — contextual portrait, name, community, territory,
  Traceability Seal (individual authorship *and* ancestral community affiliation),
  pull quote in the artisan's own voice.
- **II. El Territorio y la Memoria** — intergenerational transmission: who taught
  them, what the craft means in their setting.
- **III. La Materia y el Gesto** — high-res macro of fibers, interactive diagrams
  and a semiotic glossary decoding traditional patterns, silent micro-videos of
  hands working.
- **IV. Las Obras del Taller** — finished pieces in use context, real scale, and
  estimated making time in hours/weeks (patience as stated value).
- **V. El Contacto Directo y el Encargo Ético** — direct WhatsApp/call to the
  workshop plus a "Guía de Encargo Consciente" on discussing lead times,
  customization, and fair pay.

## Sensory / semiotic modules

Three devices compensate for the absent sense of touch — treat them as core
features, not enhancements:

- **Sensory translation** — fiber-level photography with progressive zoom to
  perceive twist, thread irregularity, and weave density.
- **Interactive semiotic narrative** — hotspots on the textile explaining the
  cosmogonic meaning of grecas, rhombuses, zoophytomorphic figures, color shifts.
- **Traceability / author's-mark badges** — verifying geographic origin, 100%
  natural raw material, making time, and the community's informed consent.

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
