import { cn } from '../../lib/cn'
import type { MotionKind } from '../../content/techniques'

/**
 * The five gestures as marks.
 *
 * The technique route now carries photographs, which is the right register for
 * showing what a gesture looks like and the wrong one for showing where you
 * are: a 28px photograph is a smudge. These marks take over that second job.
 * Each is the drawn loop of `TechniqueLoop` reduced to the one line that
 * distinguishes the gesture — the crossed warp, the three-strand alternation,
 * the closing knot, the rising dye front, the spindle and its twist — so the
 * same figure identifies a technique in an artisan's summary, in a list, and
 * beside a heading.
 *
 * Static by design. A wayfinding mark that moves competes with the page it is
 * meant to be indexing, and these are read at a glance rather than watched.
 */
type Props = {
  kind: MotionKind
  /** Rendered size in px. The mark is drawn on a 48-unit grid and scales with it. */
  size?: number
  /** Draws the ring and ground behind the mark. */
  ringed?: boolean
  className?: string
  /** Accessible name, or null when an adjacent label already names the gesture. */
  label?: string | null
}

export function TechniqueIcon({ kind, size = 44, ringed = true, className, label = null }: Props) {
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const }
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      focusable="false"
      {...a11y}
    >
      {ringed && (
        <>
          <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.07" />
          <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </>
      )}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {MARKS[kind]}
      </g>
    </svg>
  )
}

/* Each mark is drawn inside a 48-unit box with a ~9-unit margin, so it still
   clears the ring when `ringed` is on and still centres when it is off. */
const MARKS: Record<MotionKind, React.ReactNode> = {
  /* urdir — the counted ends, laid parallel and held between the two bars. */
  urdir: (
    <>
      <line x1="11" y1="14" x2="37" y2="14" opacity="0.5" />
      <line x1="11" y1="34" x2="37" y2="34" opacity="0.5" />
      <line x1="16" y1="14" x2="16" y2="34" />
      <line x1="24" y1="14" x2="24" y2="34" />
      <line x1="32" y1="14" x2="32" y2="34" />
    </>
  ),

  /* trenzar — two strands crossing over a third, in strict alternation. */
  trenzar: (
    <>
      <path d="M17 12c0 6 14 6 14 12s-14 6-14 12" />
      <path d="M31 12c0 6-14 6-14 12s14 6 14 12" />
    </>
  ),

  /* anudar — the diamond mesh, with the knot that closes each row. */
  anudar: (
    <>
      <path d="M24 9l15 15-15 15L9 24z" />
      <path d="M16.5 16.5l15 15M31.5 16.5l-15 15" opacity="0.55" />
      <circle cx="24" cy="24" r="2.6" fill="currentColor" stroke="none" />
    </>
  ),

  /* tinturar — the hank lowered into the vessel, dye standing at the level. */
  tinturar: (
    <>
      <path d="M20 10c-4 5-4 12 0 17M28 10c4 5 4 12 0 17" />
      <path d="M13 24l2 13h18l2-13" />
      <line x1="12" y1="24" x2="36" y2="24" opacity="0.5" />
      <line x1="16" y1="31" x2="32" y2="31" opacity="0.45" />
    </>
  ),

  /* hilar — fibre drafted from the mass, twist running down to the whorl. */
  hilar: (
    <>
      <path d="M13 15c0-3 5-5 11-5s11 2 11 5-5 5-11 5-11-2-11-5z" opacity="0.55" />
      <line x1="24" y1="20" x2="24" y2="39" />
      <path d="M18 32h12" />
      <circle cx="24" cy="39" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
}
