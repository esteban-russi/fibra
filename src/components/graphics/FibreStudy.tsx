import { useMemo } from 'react'
import { cn } from '../../lib/cn'

/**
 * Drawn fibre study for the sensory-translation module.
 *
 * The point of the module is that a screen has no touch, so what it can offer
 * instead is magnification: twist direction, ply angle, diameter variance and
 * surface. This renders those four properties honestly per fibre type —
 * wool carries scales and the widest diameter variance, cotton a short irregular
 * staple, palm a flat tapering ribbon with a face and a back, fique a stiff
 * near-straight bundle — and reveals successive layers of detail as the
 * magnification rises, the way a real loupe would.
 */
export type FibreKind = 'wool' | 'cotton' | 'palm' | 'fique'

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const PROFILE: Record<FibreKind, { colours: string[]; variance: number; period: number; width: number }> = {
  wool: { colours: ['#C9B49C', '#A98C6E', '#8A6A4E', '#E2D5C2'], variance: 0.22, period: 30, width: 6.5 },
  cotton: { colours: ['#F2E9DC', '#DCCDBA', '#C7B49C', '#FFFDF5'], variance: 0.16, period: 26, width: 5.5 },
  palm: { colours: ['#EFE4CE', '#D9C69F', '#B79C6E', '#F6EFE0'], variance: 0.07, period: 62, width: 7.5 },
  fique: { colours: ['#DCD3BC', '#BCB08E', '#9A8E6C', '#EDE7D4'], variance: 0.05, period: 78, width: 6 },
}

type Props = {
  kind: FibreKind
  twist: 'S' | 'Z'
  /** 1 = whole cloth, 6 = single fibre. Drives which detail layers are drawn. */
  zoom: number
  className?: string
}

const W = 400
const H = 300

export function FibreStudy({ kind, twist, zoom, className }: Props) {
  const p = PROFILE[kind]
  const dir = twist === 'S' ? 1 : -1

  const strands = useMemo(() => {
    const rand = rng(kind.length * 977 + (twist === 'S' ? 13 : 31))
    const out: React.ReactNode[] = []
    const gap = p.width * 2.9
    const count = Math.ceil(W / gap) + 2

    for (let i = 0; i < count; i++) {
      const x = i * gap - gap + (rand() - 0.5) * gap * 0.16
      const base = p.colours[Math.floor(rand() * p.colours.length)]
      const period = p.period * (0.85 + rand() * 0.3)
      const phase = rand() * period

      // The core, so the gaps between plies do not show the ground through.
      out.push(
        <line
          key={`c${i}`}
          x1={x}
          y1={-20}
          x2={x}
          y2={H + 20}
          stroke={base}
          strokeWidth={p.width * 1.05}
          strokeLinecap="round"
        />,
      )

      // Twist is drawn as the plies themselves: each single crosses the cord
      // diagonally, and the pitch of that diagonal is the twist. Stacking them
      // half a period apart is what gives spun yarn its barber-pole surface,
      // and the direction of the lean is the difference between S and Z.
      const step = period * 0.5
      let n = 0
      for (let y = -period; y < H + period; y += step) {
        const jitter = (rand() - 0.5) * p.width * 0.5 * p.variance * 6
        const half = p.width * (0.92 + jitter / Math.max(1, p.width))
        const lean = step * 1.05
        out.push(
          <line
            key={`t${i}-${n}`}
            x1={x - half * dir}
            y1={y + phase}
            x2={x + half * dir}
            y2={y + phase + lean}
            stroke={base}
            strokeWidth={p.width * 0.86}
            strokeLinecap="round"
            opacity={n % 2 === 0 ? 1 : 0.86}
          />,
        )
        // A highlight along the crown of each ply — the thing that makes a
        // twisted yarn legible as round rather than flat.
        out.push(
          <line
            key={`h${i}-${n}`}
            x1={x - half * 0.34 * dir}
            y1={y + phase + lean * 0.22}
            x2={x + half * 0.34 * dir}
            y2={y + phase + lean * 0.62}
            stroke="#FFFDF5"
            strokeWidth={p.width * 0.2}
            strokeLinecap="round"
            opacity={0.3}
          />,
        )
        n++
      }
    }
    return out
  }, [kind, twist, p, dir])

  // Detail layers appear as magnification rises, the way a loupe reveals them.
  const showSurface = zoom >= 2.2
  const showScales = zoom >= 3.6 && kind === 'wool'
  const showEnds = zoom >= 3.0 && (kind === 'cotton' || kind === 'wool')
  const showRibbonFace = zoom >= 2.6 && (kind === 'palm' || kind === 'fique')

  const detail = useMemo(() => {
    const rand = rng(kind.length * 613 + Math.round(zoom * 10))
    const out: React.ReactNode[] = []

    if (showScales) {
      for (let i = 0; i < 150; i++) {
        const x = rand() * W
        const y = rand() * H
        out.push(
          <path
            key={`sc${i}`}
            d={`M ${x} ${y} q 5 2 10 0`}
            stroke="#5A4433"
            strokeWidth="0.9"
            fill="none"
            opacity="0.3"
          />,
        )
      }
    }
    if (showEnds) {
      for (let i = 0; i < 44; i++) {
        const x = rand() * W
        const y = rand() * H
        const a = rand() * Math.PI * 2
        out.push(
          <line
            key={`en${i}`}
            x1={x}
            y1={y}
            x2={x + Math.cos(a) * 14}
            y2={y + Math.sin(a) * 14}
            stroke="#EFE6D6"
            strokeWidth="1.1"
            opacity="0.55"
            strokeLinecap="round"
          />,
        )
      }
    }
    if (showRibbonFace) {
      for (let i = 0; i < 60; i++) {
        const x = rand() * W
        const y = rand() * H
        out.push(
          <line
            key={`rb${i}`}
            x1={x}
            y1={y}
            x2={x}
            y2={y + 26 + rand() * 30}
            stroke="#FFFDF5"
            strokeWidth="0.8"
            opacity="0.34"
            strokeLinecap="round"
          />,
        )
      }
    }
    return out
  }, [kind, zoom, showScales, showEnds, showRibbonFace])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="fibreLight" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#2E1B1E" stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id="fibreVignette" cx="0.5" cy="0.5" r="0.75">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#2E1B1E" stopOpacity="0.36" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={PROFILE[kind].colours[2]} />
      <g>{strands}</g>
      {showSurface && <g>{detail}</g>}
      <rect width={W} height={H} fill="url(#fibreLight)" />
      <rect width={W} height={H} fill="url(#fibreVignette)" />
    </svg>
  )
}
