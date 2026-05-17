import { motion, useReducedMotion } from 'framer-motion'

// Gentle continuous bob for content (e.g. the hero card). Keeps children
// fully interactive; no-ops under prefers-reduced-motion.
export default function Float({ children, className = '', y = 8, duration = 5, delay = 0 }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -y, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
