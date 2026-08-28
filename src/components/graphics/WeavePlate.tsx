import { useMemo } from 'react'
import { cn } from '../../lib/cn'

/**
 * Drawn textile plates.
 *
 * Each variant renders the real structural geometry of the technique it names,
 * so the graphic teaches something rather than decorating:
 *   plain — orthogonal interlacement, one over one, reversing every pick
 *   braid — the same interlacement run obliquely, which is what a braid is
 *   coil  — a rising spiral wrapped and stitched through the round below
 *   knot  — an open mesh held by its own geometry, knotted at each junction
 *   twist — two singles plied against their own twist
 *   net   — a wide-gauge knotted mesh, drawn at the scale of a hammock
 *
 * Randomness is drawn from a seeded generator so a plate is identical on every
 * render — no hydration drift, and a given artisan's plate stays their plate.
 */

export type PlateKind = 'plain' | 'braid' | 'coil' | 'knot' | 'twist' | 'net'

/** Small deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

type Props = {
  kind: PlateKind
  palette: string[]
  /** Any stable string — the same seed always yields the same plate. */
  seed?: string
  className?: string
  /** Plates are decorative by default; pass a title to expose one to the a11y tree. */
  title?: string
  /**
   * Drawn extent of the plate. The SVG is slice-fitted, so a larger extent packs
   * more structure into the same rendered area — a wide atlas band needs a
   * bigger number than a square card or the weave reads as masonry.
   */
  extent?: number
}

const SIZE = 240

export function WeavePlate({ kind, palette, seed = 'fibra', className, title, extent = SIZE }: Props) {
  const body = useMemo(
    () => build(kind, palette, hashSeed(seed + kind), extent),
    [kind, palette, seed, extent],
  )

  return (
    <svg
      viewBox={`0 0 ${extent} ${extent}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width={extent} height={extent} fill={palette[0]} />
      {body}
    </svg>
  )
}

function build(kind: PlateKind, palette: string[], seed: number, size: number) {
  const k = size / SIZE
  switch (kind) {
    case 'plain':
      return plain(palette, seed, size)
    case 'braid':
      return braid(palette, seed, size)
    case 'coil':
      return coil(palette, seed, size)
    case 'knot':
      return mesh(palette, seed, 18 * k, size)
    case 'net':
      return mesh(palette, seed, 34 * k, size)
    case 'twist':
      return twist(palette, seed, size)
  }
}

/* --------------------------------------------------------------------------
   Plain weave — warp ends laid vertically, weft picks crossing one over one.
   Only the segments that sit on top of the crossing are painted, which is what
   makes the interlacement legible rather than a grid.
-------------------------------------------------------------------------- */
function plain(palette: string[], seed: number, size = SIZE) {
  const rand = rng(seed)
  const cell = 12
  const n = Math.ceil(size / cell)
  const warpColour = palette[1] ?? palette[0]
  const wefts = palette.slice(1)

  // Colour bands in the warp: hand-sorted yarn arrives in runs, not alternation.
  const warpBand: string[] = []
  let held = warpColour
  for (let c = 0; c < n; c++) {
    if (rand() < 0.18) held = palette[1 + Math.floor(rand() * (palette.length - 1))] ?? warpColour
    warpBand.push(held)
  }

  const ends = []
  for (let c = 0; c < n; c++) {
    ends.push(
      <rect
        key={`w${c}`}
        x={c * cell + cell * 0.12}
        y={0}
        width={cell * 0.76}
        height={size}
        fill={warpBand[c]}
        rx={cell * 0.18}
      />,
    )
  }

  const picks = []
  for (let r = 0; r < n; r++) {
    const colour = wefts[(r + Math.floor(rand() * 1.4)) % wefts.length] ?? warpColour
    for (let c = 0; c < n; c++) {
      if ((r + c) % 2 !== 0) continue
      picks.push(
        <rect
          key={`p${r}-${c}`}
          x={c * cell - cell * 0.1}
          y={r * cell + cell * 0.12}
          width={cell * 1.2}
          height={cell * 0.76}
          fill={colour}
          rx={cell * 0.18}
        />,
      )
    }
  }

  return (
    <g>
      {ends}
      {picks}
      <rect width={size} height={size} fill="url(#plateShade)" opacity={0.5} />
      <Shade />
    </g>
  )
}

/* --------------------------------------------------------------------------
   Braid — the same one-over-one interlacement, run obliquely. A flat braid has
   no warp and no weft: every element travels diagonally through the structure,
   which is exactly a plain weave turned through 45 degrees.
-------------------------------------------------------------------------- */
function braid(palette: string[], seed: number, size = SIZE) {
  return (
    <g transform={`rotate(45 ${size / 2} ${size / 2}) scale(1.45) translate(${-size * 0.155} ${-size * 0.155})`}>
      {plain(palette, seed, size)}
    </g>
  )
}

/* --------------------------------------------------------------------------
   Coil — a bundle wrapped in fibre and stitched through the round below it.
   Drawn as rising rounds with radial stitches; a figure is a run of stitches
   in another colour, which is exactly how it is counted into the real piece.
-------------------------------------------------------------------------- */
function coil(palette: string[], seed: number, size = SIZE) {
  const rand = rng(seed)
  const cx = size / 2
  const cy = size / 2
  const pitch = (9 * size) / SIZE
  const rounds: React.ReactNode[] = []
  // The wrapping fibre is the pale one and the figures are the dyed ones — the
  // inverse reads as a dark basket with light gaps, which is not what a coiled
  // vessel looks like.
  const ground = palette[0]
  const figures = palette.length > 1 ? palette.slice(1) : [palette[0]]
  const shadow = palette[1] ?? '#2E1B1E'

  for (let r = pitch; r < size * 0.78; r += pitch) {
    const circumference = 2 * Math.PI * r
    const stitches = Math.max(12, Math.round(circumference / ((5.5 * size) / SIZE)))
    // Each round carries a figure: a repeating run of coloured stitches.
    const repeat = 3 + Math.floor(rand() * 5)
    const width = 1 + Math.floor(rand() * 3)
    const colour = figures[Math.floor(rand() * figures.length)] ?? ground
    const offset = Math.floor(rand() * stitches)

    rounds.push(<circle key={`b${r}`} cx={cx} cy={cy} r={r} fill="none" stroke={ground} strokeWidth={pitch * 0.86} />)

    const marks: React.ReactNode[] = []
    for (let s = 0; s < stitches; s++) {
      const inFigure = (s + offset) % Math.max(2, Math.round(stitches / repeat)) < width
      const a = (s / stitches) * Math.PI * 2
      const x1 = cx + Math.cos(a) * (r - pitch * 0.44)
      const y1 = cy + Math.sin(a) * (r - pitch * 0.44)
      const x2 = cx + Math.cos(a) * (r + pitch * 0.44)
      const y2 = cy + Math.sin(a) * (r + pitch * 0.44)
      marks.push(
        <line
          key={`s${r}-${s}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={inFigure ? colour : ground}
          strokeWidth={inFigure ? (3.4 * size) / SIZE : (1.1 * size) / SIZE}
          strokeLinecap="butt"
          opacity={inFigure ? 1 : 0.42}
        />,
      )
    }
    rounds.push(<g key={`m${r}`}>{marks}</g>)
  }

  return (
    <g>
      <rect width={size} height={size} fill={shadow} />
      {rounds}
      <Shade />
      <rect width={size} height={size} fill="url(#plateShade)" opacity={0.55} />
    </g>
  )
}

/* --------------------------------------------------------------------------
   Knotted mesh — one continuous element passed through the loop of the row
   above and drawn closed. The structure holds by geometry, not by tension on a
   frame, which is why it can be set down mid-row.
-------------------------------------------------------------------------- */
function mesh(palette: string[], seed: number, gauge: number, size = SIZE) {
  const rand = rng(seed)
  const cord = palette[1] ?? '#B79C9B'
  const accent = palette[2] ?? cord
  const lines: React.ReactNode[] = []
  const knots: React.ReactNode[] = []
  const rows = Math.ceil(size / gauge) + 2

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < rows; c++) {
      const x = c * gauge + (r % 2 ? gauge / 2 : 0)
      const y = r * (gauge * 0.62)
      const jitter = (rand() - 0.5) * gauge * 0.1
      const colour = rand() < 0.14 ? accent : cord
      // Two legs descending from each knot form the diamond opening below it.
      lines.push(
        <path
          key={`l${r}-${c}`}
          d={`M ${x} ${y} Q ${x + gauge * 0.25} ${y + gauge * 0.36 + jitter} ${x + gauge / 2} ${y + gauge * 0.62}
              M ${x} ${y} Q ${x - gauge * 0.25} ${y + gauge * 0.36 - jitter} ${x - gauge / 2} ${y + gauge * 0.62}`}
          fill="none"
          stroke={colour}
          strokeWidth={gauge * 0.075}
          strokeLinecap="round"
        />,
      )
      knots.push(<circle key={`k${r}-${c}`} cx={x} cy={y} r={gauge * 0.085} fill={colour} />)
    }
  }

  return (
    <g>
      {lines}
      {knots}
      <Shade />
    </g>
  )
}

/* --------------------------------------------------------------------------
   Two-ply cord — singles twisted one way and plied the other. The opposing
   twist is what stops the cord unwinding under load.
-------------------------------------------------------------------------- */
function twist(palette: string[], seed: number, size = SIZE) {
  const rand = rng(seed)
  const strands: React.ReactNode[] = []
  const span = 34
  const cols = Math.ceil(size / span) + 1

  for (let c = 0; c < cols; c++) {
    const x = c * span + span / 2
    const colour = palette[1 + (c % Math.max(1, palette.length - 1))] ?? palette[0]
    const phase = rand() * Math.PI
    const period = 26 + rand() * 8
    const amp = span * 0.24

    for (const shift of [0, Math.PI]) {
      let d = ''
      for (let y = -10; y <= size + 10; y += 2) {
        const dx = Math.sin((y / period) * Math.PI * 2 + phase + shift) * amp
        d += `${y === -10 ? 'M' : 'L'} ${(x + dx).toFixed(2)} ${y} `
      }
      strands.push(
        <path
          key={`t${c}-${shift}`}
          d={d}
          fill="none"
          stroke={colour}
          strokeWidth={span * 0.36}
          strokeLinecap="round"
          opacity={shift === 0 ? 1 : 0.82}
        />,
      )
    }
  }

  return (
    <g>
      {strands}
      <Shade />
      <rect width={size} height={size} fill="url(#plateShade)" opacity={0.45} />
    </g>
  )
}

/** Soft directional shading so the plates read as material rather than as flat vector. */
function Shade() {
  return (
    <defs>
      <linearGradient id="plateShade" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.18" />
        <stop offset="55%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#2E1B1E" stopOpacity="0.24" />
      </linearGradient>
    </defs>
  )
}
