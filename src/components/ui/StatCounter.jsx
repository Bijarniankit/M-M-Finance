import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function StatCounter({ value, prefix = '', suffix = '', label, duration = 1200 }) {
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
      setDisplay(Math.round(value * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary-700 tracking-tight">
        {prefix}{display.toLocaleString()}{suffix}
      </div>
      <div className="text-[13px] md:text-[14px] text-ink-600 mt-1.5 font-medium">
        {label}
      </div>
    </div>
  )
}
