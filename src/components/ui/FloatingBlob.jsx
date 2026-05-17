import { motion, useReducedMotion } from 'framer-motion'

// Decorative background blob that drifts and breathes slowly. Purely visual —
// always aria-hidden, and static if the user prefers reduced motion.
export default function FloatingBlob({ className = '', duration = 7, delay = 0, range = 18 }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div aria-hidden="true" className={className} />
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{ y: [0, -range, 0], scale: [1, 1.06, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
