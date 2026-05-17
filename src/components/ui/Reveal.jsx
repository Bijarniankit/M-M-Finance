import { motion, useReducedMotion } from 'framer-motion'

// Directional offset for the hidden state. `y` keeps the legacy meaning
// (vertical distance) so every existing <Reveal y={..}/> call is unchanged.
function offsetFor(direction, y) {
  switch (direction) {
    case 'down':  return { y: -y }
    case 'left':  return { x: y }
    case 'right': return { x: -y }
    case 'none':  return {}
    case 'up':
    default:      return { y }
  }
}

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  direction = 'up',
  scale = false,
  className = '',
}) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, ...offsetFor(direction, y), ...(scale ? { scale: 0.96 } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Group wrapper: children wrapped in <StaggerItem> animate in one after
// another as the group scrolls into view.
export function Stagger({ children, className = '', delay = 0, gap = 0.08 }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 16 }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
