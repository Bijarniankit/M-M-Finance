import { Star } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import StatCounter from '../components/ui/StatCounter'
import { testimonials } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

export default function Testimonials() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Client Stories"
        title="What it's like to work with M&M"
        subtitle="Hundreds of Australians trust us with one of the biggest financial decisions of their lives. Here's a glimpse of why."
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      <Section tone="default">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-warning" fill="currentColor" />
                  ))}
                </div>
                <p className="text-[14.5px] text-ink-700 leading-relaxed flex-1">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t border-ink-200">
                  <div className="font-semibold text-[14px] text-ink-900">{t.name}</div>
                  <div className="text-[12.5px] text-ink-500">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Track record"
          title="The numbers behind the stories"
          center
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter value={4.9} suffix=" / 5" label="Average rating" />
          <StatCounter value={200} suffix="+" label="Verified reviews" />
          <StatCounter value={97} suffix="%" label="Would recommend" />
          <StatCounter value={62} suffix="%" label="Repeat / referral clients" />
        </div>
      </Section>

      <Section tone="default">
        <SectionHeading
          eyebrow="Where they come from"
          title="Real reviews from real clients"
          subtitle="We never moderate or filter our reviews. The good, the great, and any constructive feedback — it all helps us improve."
          center
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { name: 'Google', score: '4.9', count: '120+ reviews' },
            { name: 'Product Review', score: '4.8', count: '60+ reviews' },
            { name: 'Facebook', score: '5.0', count: '40+ reviews' },
          ].map((s) => (
            <div key={s.name} className="card p-6 text-center">
              <div className="text-[13px] font-semibold uppercase tracking-wide text-ink-500">{s.name}</div>
              <div className="mt-2 text-[36px] font-bold text-primary-700">{s.score}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} className="text-warning" fill="currentColor" />
                ))}
              </div>
              <div className="mt-2 text-[13px] text-ink-500">{s.count}</div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to write your own success story?"
        subtitle="Join hundreds of Australians who've found their perfect finance solution through M&M Finance."
      />
    </PageWrapper>
  )
}
