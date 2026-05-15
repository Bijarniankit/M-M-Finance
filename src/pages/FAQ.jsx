import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import { faqCategories } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 text-left p-5 cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-[15px] text-ink-900">{q}</span>
        <Plus
          size={18}
          className={`text-primary-700 shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-[14.5px] text-ink-600 leading-relaxed border-t border-ink-200 pt-4">
            {a}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Frequently Asked"
        title="Questions, answered honestly"
        subtitle="Everything from how brokers get paid through to fixed-versus-variable rates and self-employed lending. If your question isn't here, just ask."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <Section tone="default">
        <div className="space-y-12">
          {faqCategories.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.04}>
              <div>
                <SectionHeading title={cat.category} center={false} />
                <div className="grid gap-3">
                  {cat.items.map((it) => (
                    <FAQItem key={it.q} q={it.q} a={it.a} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Still have questions?"
        subtitle="We're happy to answer anything on a free 20-minute call — no commitment required."
      />
    </PageWrapper>
  )
}
