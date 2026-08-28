import { useMemo } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useElementSize, useReducedMotion } from '../../lib/hooks'

/**
 * The hilo conductor.
 *
 * A single continuous thread runs the length of the cover. At the mid-point it
 * frays — deshilachado — into several vector strands that diverge, two of them
 * carrying the eye toward the two exploration routes. The thread draws itself as
 * the visitor scrolls, so the fraying is something they cause rather than watch.
 *
 * Drawn in real pixels against a measured box rather than a scaled viewBox: a
 * scaled viewBox would stretch stroke weight with the viewport, and the whole
 * conceit depends on the thread keeping the weight of a thread.
 *
 * With reduced motion requested the thread is drawn complete and still. It is
 * never the only route to anything — the strands are decorative, and the two
 * paths they point at are ordinary links.
 */
type Props = {
  /** 0–1 down the container where the thread begins to fray. */
  frayAt?: number
  colour?: string
}

export function ConductorThread({ frayAt = 0.3, colour = '#9E7B7D' }: Props) {
  const [ref, { width, height }] = useElementSize<HTMLDivElement>()
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  const geometry = useMemo(() => {
    if (width < 2 || height < 2) return null
    const cx = width * 0.5
    const frayY = height * frayAt
    // Amplitude is capped so the thread never wanders under the text column.
    const amp = Math.min(width * 0.07, 56)

    // The single thread: a slow vertical wander down to the fray point.
    let trunk = `M ${cx} 0`
    const steps = 40
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const y = frayY * t
      const x = cx + Math.sin(t * Math.PI * 2.1) * amp * (0.35 + t * 0.65)
      trunk += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
    }

    // The strands. Two are structural — they end above the two route cards —
    // and the rest are loose fibre, which is what fraying actually looks like.
    const tail = height - frayY
    const endX = (frac: number) => width * frac
    // Drops are tuned so the two structural strands stop just above the route
    // cards rather than running behind them — a strand that disappears under a
    // panel and reappears below it reads as a rendering fault, not as fraying.
    const specs = [
      { to: 0.19, weight: 2.2, opacity: 0.92, drop: 0.46 },
      { to: 0.81, weight: 2.2, opacity: 0.92, drop: 0.46 },
      { to: 0.33, weight: 1.1, opacity: 0.46, drop: 0.33 },
      { to: 0.67, weight: 1.1, opacity: 0.46, drop: 0.31 },
      { to: 0.44, weight: 0.8, opacity: 0.3, drop: 0.19 },
      { to: 0.58, weight: 0.8, opacity: 0.3, drop: 0.16 },
    ]

    const frayX = cx + Math.sin(Math.PI * 2.1) * amp
    const strands = specs.map((s, i) => {
      const x2 = endX(s.to)
      const y2 = frayY + tail * s.drop
      const c1y = frayY + tail * s.drop * 0.34
      const c2y = frayY + tail * s.drop * 0.7
      const bow = (x2 - frayX) * 0.28
      return {
        id: i,
        d: `M ${frayX.toFixed(1)} ${frayY.toFixed(1)} C ${(frayX + bow).toFixed(1)} ${c1y.toFixed(1)}, ${(x2 - bow).toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        ...s,
      }
    })

    return { trunk, strands, frayX, frayY }
  }, [width, height, frayAt])

  // The trunk draws across the first half of the scroll, the strands the second.
  const trunkDraw = useTransform(progress, [0, frayAt + 0.04], [0, 1])
  const strandDraw = useTransform(progress, [frayAt - 0.02, 0.78], [0, 1])
  const frayGlow = useTransform(progress, [frayAt - 0.08, frayAt + 0.06], [0, 1])
  const frayHalo = useTransform(frayGlow, [0, 1], [0, 0.3])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {geometry && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
          focusable="false"
        >
          <defs>
            <linearGradient id="threadFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colour} stopOpacity="0.15" />
              <stop offset="12%" stopColor={colour} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colour} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <motion.path
            d={geometry.trunk}
            fill="none"
            stroke="url(#threadFade)"
            strokeWidth={2.6}
            strokeLinecap="round"
            style={reduced ? undefined : { pathLength: trunkDraw }}
          />

          {geometry.strands.map((s) => (
            <motion.path
              key={s.id}
              d={s.d}
              fill="none"
              stroke={colour}
              strokeWidth={s.weight}
              strokeLinecap="round"
              opacity={s.opacity}
              style={reduced ? undefined : { pathLength: strandDraw }}
            />
          ))}

          {/* The point of separation, marked lightly. */}
          <motion.circle
            cx={geometry.frayX}
            cy={geometry.frayY}
            r={3.4}
            fill={colour}
            style={reduced ? { opacity: 0.9 } : { opacity: frayGlow }}
          />
          <motion.circle
            cx={geometry.frayX}
            cy={geometry.frayY}
            r={13}
            fill="none"
            stroke={colour}
            strokeWidth={1}
            style={reduced ? { opacity: 0.28 } : { opacity: frayHalo }}
          />
        </svg>
      )}
    </div>
  )
}
