import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// Animates a number from 0 up to `value` once it scrolls into view.
// Style-agnostic: renders a plain inline span so the parent's text
// classes (size, colour) carry through unchanged.
export default function CountUp({ value, prefix = '', suffix = '', duration = 1900, decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  const shown =
    decimals > 0
      ? display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(display).toLocaleString()

  return (
    <span ref={ref}>
      {prefix}{shown}{suffix}
    </span>
  )
}
