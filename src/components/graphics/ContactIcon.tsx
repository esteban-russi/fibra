import { cn } from '../../lib/cn'

/**
 * The channels of Act V as marks, drawn in the same hand as `TechniqueIcon`.
 *
 * Act V is the one screen where the site hands the visitor over to a workshop,
 * so the channels have to read as part of this page rather than as borrowed
 * platform badges. These are drawn on the same 48-unit grid, at the same stroke
 * weight, in `currentColor` — the globe and the camera outline are described
 * the way the warp and the braid are, and no vendor logo is reproduced.
 *
 * Static, like the technique marks: they label a link, they do not perform.
 */
export type ContactChannel = 'whatsapp' | 'phone' | 'instagram' | 'website'

type Props = {
  kind: ContactChannel
  /** Rendered size in px. The mark is drawn on a 48-unit grid and scales with it. */
  size?: number
  /** Draws the ring and ground behind the mark. */
  ringed?: boolean
  className?: string
  /** Accessible name, or null when an adjacent label already names the channel. */
  label?: string | null
}

export function ContactIcon({ kind, size = 24, ringed = false, className, label = null }: Props) {
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
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {MARKS[kind]}
      </g>
    </svg>
  )
}

/* Each mark is drawn inside a 48-unit box with a ~9-unit margin, so it still
   clears the ring when `ringed` is on and still centres when it is off. */
const MARKS: Record<ContactChannel, React.ReactNode> = {
  /* whatsapp — a spoken line: the bubble and the tail it is said through. */
  whatsapp: (
    <path d="M24 12.5c7 0 12.5 4.6 12.5 10.3S31 33 24 33c-1.5 0-3-.2-4.4-.6l-7.1 2.6 2.3-6.1c-1.9-1.9-3.3-4.3-3.3-6.9 0-5.7 5.5-10.5 12.5-10.5Z" />
  ),

  /* phone — the handset, held between the ear and the mouth. */
  phone: (
    <path d="M18.4 12.6c-2.6 1.5-3.9 4-3.4 6.6 1.7 8.7 9.1 16.1 17.8 17.8 2.6.5 5.1-.8 6.6-3.4l-6.6-4.4-2.7 2.7c-3.4-1.8-6.3-4.7-8.1-8.1l2.7-2.7-6.3-6.5Z" />
  ),

  /* instagram — the frame, the lens and the mark in the corner. */
  instagram: (
    <>
      <rect x="11" y="11" width="26" height="26" rx="8" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="31.4" cy="16.6" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),

  /* website — the meridian and the parallels: a place reached from anywhere. */
  website: (
    <>
      <circle cx="24" cy="24" r="12.5" />
      <ellipse cx="24" cy="24" rx="5.4" ry="12.5" />
      <line x1="12.4" y1="19.4" x2="35.6" y2="19.4" opacity="0.6" />
      <line x1="12.4" y1="28.6" x2="35.6" y2="28.6" opacity="0.6" />
    </>
  ),
}
