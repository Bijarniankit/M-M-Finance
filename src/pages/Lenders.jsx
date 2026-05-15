import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { lenders } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

export default function Lenders() {
  const groups = [
    { title: 'Major banks', items: lenders.slice(0, 4) },
    { title: 'Mid-tier banks', items: lenders.slice(4, 14) },
    { title: 'Customer-owned banks', items: lenders.slice(14, 24) },
    { title: 'Specialist & non-bank lenders', items: lenders.slice(24) },
  ]

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Our Panel"
        title="40+ lenders. One application. Real choice."
        subtitle="From the big four to nimble specialists, we work with a diverse panel so we can match the right lender to your situation — not just the biggest one."
        breadcrumbs={[{ label: 'Lenders' }]}
      />

      <Section tone="default">
        <div className="grid gap-8">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.04}>
              <div>
                <h3 className="text-[18px] font-bold text-ink-900">{g.title}</h3>
                <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {g.items.map((l) => (
                    <div key={l} className="card p-4 text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-[14px]">
                        {l.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div className="text-[13px] font-semibold text-ink-800 leading-snug">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Why panel matters"
          title="One bank says no — another says yes"
          subtitle="Lenders interpret income, expenses and credit history very differently. A diverse panel is the difference between approved and declined."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { i: 'Layers', t: 'Different policies', d: 'Self-employed, casual income, recent role changes — every lender has its own rules. We know which ones suit you.' },
            { i: 'TrendingUp', t: 'Different rates', d: 'Headline rates change weekly. We track them so you do not have to — and negotiate at scale.' },
            { i: 'Zap', t: 'Different speeds', d: 'Some lenders take 24 hours, others take 3 weeks. When you are racing to settle, the speed difference is huge.' },
          ].map((b) => (
            <div key={b.t} className="card p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-3 mx-auto">
                <Icon name={b.i} size={18} />
              </div>
              <h4 className="font-bold text-[15.5px] text-ink-900">{b.t}</h4>
              <p className="mt-2 text-[13.5px] text-ink-600 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Not sure which lender is right for you?"
        subtitle="We compare across 40+ lenders to find the best rate and structure for your situation — at no cost to you."
      />
    </PageWrapper>
  )
}
