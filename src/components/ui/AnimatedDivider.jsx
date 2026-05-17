import { motion, useReducedMotion } from 'framer-motion'

// A thin gradient rule that draws itself in from the centre as it scrolls
// into view. Use to separate sections with a touch of motion.
export default function AnimatedDivider({ className = '' }) {
  const base = `h-px w-full bg-linear-to-r from-transparent via-primary-300 to-transparent ${className}`
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div aria-hidden="true" className={base} />
  return (
    <motion.div
      aria-hidden="true"
      className={base}
      style={{ transformOrigin: 'center' }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    />
  )
}
