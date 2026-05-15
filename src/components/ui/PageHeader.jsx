export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-white border-b border-ink-200">
      <div className="container-x py-10 md:py-14 lg:py-16">
        <div className="text-center">
          {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
          <h1 className="text-ink-900">{title}</h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl mx-auto text-[15px] md:text-[17px] text-ink-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
