import { useMemo } from 'react'
import { cn } from '../../lib/cn'
import type { MotionKind } from '../../content/techniques'

/**
 * Silent, looping line studies of the five techniques.
 *
 * These are drawn rather than filmed. Each one is authored against the real
 * mechanics of the movement — the warp is laid end by end and crossed at the
 * peg, the braid crosses outer-over-centre in strict alternation, the spindle
 * adds twist that travels up into the drafted section — so that the loop is a
 * legible diagram of the technique and not an ambient animation.
 *
 * `playing` is controlled by the caller, which combines the visitor's own
 * play/pause with their reduced-motion preference. When paused the drawing
 * still reads correctly: nothing depends on being mid-animation to make sense.
 */
type Props = {
  kind: MotionKind
  playing: boolean
  /** Ink colour; the ground is transparent so the card behind shows through. */
  ink?: string
  accent?: string
  className?: string
  /** Text alternative — every loop is described in words in the content layer. */
  label: string
}

export function TechniqueLoop({ kind, playing, ink = '#6E3A41', accent = '#E5A93C', className, label }: Props) {
  const drawing = useMemo(() => {
    switch (kind) {
      case 'urdir':
        return <Urdir ink={ink} accent={accent} />
      case 'trenzar':
        return <Trenzar ink={ink} accent={accent} />
      case 'anudar':
        return <Anudar ink={ink} accent={accent} />
      case 'tinturar':
        return <Tinturar ink={ink} accent={accent} />
      case 'hilar':
        return <Hilar ink={ink} accent={accent} />
    }
  }, [kind, ink, accent])

  return (
    <svg
      viewBox="0 0 160 160"
      className={cn('block h-full w-full', !playing && 'motion-paused', className)}
      role="img"
      aria-label={label}
      focusable="false"
    >
      {drawing}
    </svg>
  )
}

type Ink = { ink: string; accent: string }

/* urdir — one thread walked between two pegs, laying parallel ends, crossing at
   the near peg so the sequence is preserved when the warp leaves the frame. */
function Urdir({ ink, accent }: Ink) {
  const ends = Array.from({ length: 9 }, (_, i) => 26 + i * 12)
  return (
    <g fill="none" strokeLinecap="round">
      {/* the frame and its pegs */}
      <line x1="20" y1="18" x2="20" y2="142" stroke={ink} strokeWidth="2.5" opacity="0.28" />
      <line x1="140" y1="18" x2="140" y2="142" stroke={ink} strokeWidth="2.5" opacity="0.28" />
      <circle cx="20" cy="30" r="4" fill={ink} opacity="0.5" />
      <circle cx="140" cy="30" r="4" fill={ink} opacity="0.5" />
      <circle cx="20" cy="132" r="4" fill={ink} opacity="0.5" />

      {ends.map((y, i) => (
        <line
          key={y}
          className="warp-end"
          x1="20"
          y1={y}
          x2="140"
          y2={y}
          stroke={i === 4 ? accent : ink}
          strokeWidth={i === 4 ? 2.6 : 1.9}
          opacity={i === 4 ? 1 : 0.72}
          style={{ ['--len' as string]: '120', animationDelay: `${i * 0.42}s` }}
        />
      ))}

      {/* the cross — the figure-eight that keeps every end in sequence */}
      <path
        d="M 20 74 C 34 74 34 86 20 86 M 20 86 C 34 86 34 74 20 74"
        stroke={accent}
        strokeWidth="2.2"
        opacity="0.95"
      />
    </g>
  )
}

/* trenzar — three strands, outer over centre in strict alternation. The whole
   group translates by exactly one repeat so the loop has no visible seam. */
function Trenzar({ ink, accent }: Ink) {
  const period = 40
  const strand = (phase: number, colour: string, width: number) => {
    let d = ''
    for (let y = -50; y <= 210; y += 2) {
      const x = 80 + Math.sin((y / period) * Math.PI * 2 + phase) * 26
      d += `${y === -50 ? 'M' : 'L'} ${x.toFixed(2)} ${y} `
    }
    return <path d={d} stroke={colour} strokeWidth={width} fill="none" strokeLinecap="round" />
  }
  return (
    <g>
      <g className="braid-run">
        {strand(0, ink, 9)}
        {strand((Math.PI * 2) / 3, accent, 9)}
        {strand((Math.PI * 4) / 3, ink, 9)}
        {/* the same three strands redrawn thinner on top reads as the crossing */}
        <g opacity="0.35">
          {strand(0, '#FFFDF5', 2.4)}
          {strand((Math.PI * 2) / 3, '#FFFDF5', 2.4)}
          {strand((Math.PI * 4) / 3, '#FFFDF5', 2.4)}
        </g>
      </g>
      {/* the working hand's position, held still while the braid grows past it */}
      <line x1="44" y1="30" x2="116" y2="30" stroke={ink} strokeWidth="1.6" opacity="0.3" strokeDasharray="4 5" />
    </g>
  )
}

/* anudar — an open mesh built downward, each knot passing through the loop of
   the row above and drawn closed. */
function Anudar({ ink, accent }: Ink) {
  const gauge = 36
  const nodes: React.ReactNode[] = []
  for (let r = -1; r < 6; r++) {
    for (let c = -1; c < 6; c++) {
      const x = c * gauge + (r % 2 ? gauge / 2 : 0)
      const y = r * (gauge * 0.6) + 10
      const isAccent = (r + c) % 4 === 0
      nodes.push(
        <g key={`${r}-${c}`}>
          <path
            d={`M ${x} ${y} Q ${x + 9} ${y + 12} ${x + gauge / 2} ${y + gauge * 0.6}
                M ${x} ${y} Q ${x - 9} ${y + 12} ${x - gauge / 2} ${y + gauge * 0.6}`}
            fill="none"
            stroke={isAccent ? accent : ink}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity={isAccent ? 0.95 : 0.62}
          />
          <circle
            className="knot-pop"
            cx={x}
            cy={y}
            r="2.6"
            fill={isAccent ? accent : ink}
            style={{ animationDelay: `${((r + c) % 5) * 0.32}s` }}
          />
        </g>,
      )
    }
  }
  return <g className="mesh-run">{nodes}</g>
}

/* tinturar — pale skeins lowered into the vessel; the dye front rises through
   the hank and holds, then the skein lifts and drips. */
function Tinturar({ ink, accent }: Ink) {
  const hank = 'M 56 34 C 44 58 44 86 56 108 M 80 34 C 68 58 68 86 80 108 M 104 34 C 92 58 92 86 104 108'
  return (
    <g fill="none" strokeLinecap="round">
      {/* the vessel */}
      <path d="M 30 104 L 36 142 L 124 142 L 130 104 Z" fill={ink} opacity="0.14" />
      <path d="M 30 104 L 36 142 L 124 142 L 130 104" stroke={ink} strokeWidth="2.4" opacity="0.55" />
      <ellipse cx="80" cy="104" rx="50" ry="7" fill={ink} opacity="0.2" />

      <g className="skein-dip">
        {/* undyed state */}
        <path d={hank} stroke={ink} strokeWidth="7" opacity="0.22" />
        {/* the dye front, revealed by a rising clip */}
        <clipPath id="dyeFront">
          <rect className="dye-rise" x="30" y="78" width="100" height="72" />
        </clipPath>
        <g clipPath="url(#dyeFront)">
          <path d={hank} stroke={accent} strokeWidth="7" />
        </g>
        {/* the tie that keeps the hank from tangling in the bath */}
        <path d="M 50 46 L 110 46" stroke={ink} strokeWidth="2.2" opacity="0.5" />
      </g>

      {[62, 80, 98].map((x, i) => (
        <circle
          key={x}
          className="drip"
          cx={x}
          cy="112"
          r="2.4"
          fill={accent}
          stroke="none"
          style={{ animationDelay: `${i * 0.7 + 1.4}s` }}
        />
      ))}
    </g>
  )
}

/* hilar — one hand drafts fibre out of the mass while the spindle adds twist,
   which travels up into the drafted section and locks it. */
function Hilar({ ink, accent }: Ink) {
  return (
    <g fill="none" strokeLinecap="round">
      {/* the mass of unspun fibre */}
      <path
        d="M 60 20 C 44 26 40 40 48 48 C 40 52 42 62 52 62 C 60 68 76 66 80 58 C 96 62 106 50 98 40 C 104 30 94 18 82 22 C 74 14 66 14 60 20 Z"
        fill={ink}
        opacity="0.16"
      />
      <path
        d="M 60 20 C 44 26 40 40 48 48 C 40 52 42 62 52 62 C 60 68 76 66 80 58 C 96 62 106 50 98 40 C 104 30 94 18 82 22 C 74 14 66 14 60 20 Z"
        stroke={ink}
        strokeWidth="1.8"
        opacity="0.4"
      />

      {/* the drafted section — thinning as it descends */}
      <line x1="76" y1="60" x2="80" y2="96" stroke={ink} strokeWidth="4" opacity="0.5" />
      {/* twist travelling up the drawn thread */}
      <line className="twist-travel" x1="76" y1="60" x2="80" y2="96" stroke={accent} strokeWidth="2.6" />

      {/* the spindle: shaft, whorl, and the growing cop */}
      <g className="spindle-turn" style={{ transformOrigin: '80px 118px' }}>
        <line x1="80" y1="96" x2="80" y2="144" stroke={ink} strokeWidth="3" />
        <ellipse className="cop-grow" cx="80" cy="112" rx="9" ry="13" fill={accent} opacity="0.85" stroke="none" />
        <ellipse cx="80" cy="132" rx="19" ry="6" fill={ink} opacity="0.7" stroke="none" />
        <circle cx="80" cy="144" r="3" fill={ink} />
      </g>
    </g>
  )
}
