import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
