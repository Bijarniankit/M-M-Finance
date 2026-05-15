export default function Section({ children, className = '', id, tone = 'default' }) {
  const tones = {
    default: 'bg-white',
    muted: 'bg-[var(--color-surface-muted)]',
    alt: 'bg-[var(--color-surface-alt)]',
  }
  return (
    <section id={id} className={`section ${tones[tone] || tones.default} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, center = true, as: Tag = 'h2' }) {
  return (
    <div className={['max-w-3xl mb-8 md:mb-12', center ? 'mx-auto text-center' : ''].join(' ')}>
      {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
      <Tag className="text-ink-900">{title}</Tag>
      {subtitle && (
        <p className="mt-3 text-[15px] md:text-[17px] leading-relaxed text-ink-600">
          {subtitle}
        </p>
      )}
    </div>
  )
}
