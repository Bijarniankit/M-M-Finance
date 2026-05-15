import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Info } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'
import { homeLoanTopics, siteInfo } from '../../data/site.js'

export default function HomeLoanPagePlaceholder({ slug }) {
  const topic = homeLoanTopics.find((t) => t.slug === slug)
  if (!topic) return null
  const others = homeLoanTopics.filter((t) => t.slug !== slug).slice(0, 5)

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Home Loans"
        title={topic.title}
        subtitle={topic.short}
      />

      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow"><Info size={12} /> Page in progress</span>
            <h2 className="mt-3 text-ink-900 text-[24px] md:text-[28px]">
              Detailed content for this page is on the way.
            </h2>
            <p className="mt-4 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
              We&rsquo;re putting together a plain-English walkthrough of <strong>{topic.title.toLowerCase()}</strong> — what to expect, the numbers that matter, the lender options, and the common pitfalls to avoid.
            </p>
            <p className="mt-4 text-[15.5px] text-ink-600 leading-relaxed">
              In the meantime, our team can talk you through your situation directly — no obligation, no jargon.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/get-started" className="btn btn-md btn-primary">
                Start your free assessment <ArrowRight size={15} />
              </Link>
              <a href={siteInfo.phoneHref} className="btn btn-md btn-outline">
                <Phone size={15} /> {siteInfo.phone}
              </a>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 space-y-4">
            <div className="card p-6 bg-surface-muted border-primary-100">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                topic.color === 'accent'
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-primary-50 text-primary-700'
              }`}>
                <Icon name={topic.icon} size={22} />
              </div>
              <h3 className="text-[18px] font-bold text-ink-900">Talk to a broker</h3>
              <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
                A quick chat is the fastest way to get specific answers about {topic.title.toLowerCase()}.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/contact" className="btn btn-md btn-primary w-full">
                  Get in touch <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <div className="card p-6">
              <h4 className="text-[14px] font-semibold text-ink-900 uppercase tracking-wide">Other home loan topics</h4>
              <ul className="mt-3 space-y-2">
                {others.map((t) => (
                  <li key={t.slug}>
                    <Link to={`/home-loans/${t.slug}`} className="text-[14px] text-ink-700 hover:text-primary-700 transition-colors">
                      → {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CTASection
        title={`Ready to talk about ${topic.title.toLowerCase()}?`}
        subtitle="Book a free 20-minute call and we'll map out a clear next step."
      />
    </PageWrapper>
  )
}
