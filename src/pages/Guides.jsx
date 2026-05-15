import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import { guides } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

export default function Guides() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Guides, articles and explainers"
        subtitle="In-depth, plain-English guides on how Australian home lending actually works — written by working brokers, not marketers."
        breadcrumbs={[{ label: 'Guides' }]}
      />

      <Section tone="default">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.04}>
              <Link to={`/guides/${g.slug}`} className="card card-hover p-6 h-full block group">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="badge badge-info">{g.category}</span>
                  <span className="flex items-center gap-1 text-ink-500">
                    <Clock size={12} /> {g.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-ink-900 leading-snug">
                  {g.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{g.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary-700 group-hover:text-primary-800">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Coming soon"
          title="More on the way"
          subtitle="We publish two new guides every month, covering everything from policy quirks to the tax side of investing."
          center
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Bridging finance: when it works, when it doesn\'t',
            'Construction loan progress payments explained',
            'Buying off-the-plan: the financing pitfalls',
            'How rate cuts actually flow to your repayments',
            'Self-employed: structuring income for borrowing',
            'When to break a fixed loan (and when not to)',
          ].map((t) => (
            <div key={t} className="card p-5 text-[14.5px] text-ink-700">
              {t}
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Know enough to take the next step?"
        subtitle="A free call with one of our brokers turns your research into a clear, personalised plan."
      />
    </PageWrapper>
  )
}
