import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown, Calculator } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { calculators, featuredCalculators } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

const TIPS = [
  { icon: 'Wallet',        title: 'Be honest about expenses',   body: 'Lenders use the higher of your declared expenses and the Household Expenditure Measure. Inflated numbers reduce your borrowing power.' },
  { icon: 'TrendingUp',    title: 'Stress-test the rate',       body: 'Lenders assess at your rate plus ~3%. Try the same buffer in our calculators to see what happens if rates rise.' },
  { icon: 'Scale',         title: 'Compare like-for-like',      body: 'When comparing loans, look at the comparison rate (which includes fees), not just the headline rate.' },
  { icon: 'Receipt',       title: 'Round up, not down',         body: "Always round upfront costs up — surprises in the other direction are far rarer than you'd hope." },
  { icon: 'ClipboardList', title: 'Run multiple scenarios',     body: 'Run one calculator with conservative numbers and one with optimistic. Plan around the conservative case.' },
  { icon: 'Handshake',     title: 'Then talk to a broker',      body: 'Calculators model averages. A broker can tell you what specific lenders will actually do for your situation.' },
]

export default function Calculators() {
  return (
    <PageWrapper>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-ink-200">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-0 right-0 h-full w-[55%] bg-linear-to-l from-primary-50 via-primary-50/40 to-transparent" />
          <div className="absolute -top-16 right-[15%] w-72 h-72 rounded-full bg-primary-100 opacity-30 blur-3xl" />
          <div className="absolute bottom-0 right-[6%] w-48 h-48 rounded-full bg-accent-100 opacity-20 blur-3xl" />
        </div>
        <div className="container-x py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow"><Calculator size={12} /> Free Tools</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 text-ink-900">
                Get started with our{' '}
                <span className="text-primary-700">easy-to-use calculators</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[16px] md:text-[18px] text-ink-600 leading-relaxed max-w-xl">
                We've made it easy to plan your finances with a range of calculators tailored to your needs. Whether you're budgeting, saving, or exploring costs — select a calculator below to get started.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {['No account needed', 'Real-time results', '2026 Australian lending rules'].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary-700 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={11} strokeWidth={2.5} /> {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OUR MOST USED CALCULATORS (4 featured) ───────────── */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Most Used"
          title="Our most used calculators"
          subtitle="Simplify your planning with these popular options — start here for the answers you need most."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCalculators.map((c, i) => {
            const isPrimary = c.color === 'primary'
            return (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link
                  to={`/calculators/${c.slug}`}
                  className="group relative card card-hover p-6 h-full flex flex-col gap-4 overflow-hidden"
                >
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    isPrimary
                      ? 'bg-linear-to-r from-primary-700 to-primary-400'
                      : 'bg-linear-to-r from-accent-700 to-accent-400'
                  }`} />
                  <div className="flex flex-col gap-3 pt-1">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isPrimary
                        ? 'bg-primary-700 text-white group-hover:bg-primary-800'
                        : 'bg-accent-700 text-white group-hover:bg-accent-800'
                    }`}>
                      <Icon name={c.icon} size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h3 className="text-[16px] font-bold text-ink-900 leading-snug">{c.title}</h3>
                      </div>
                      <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-2 ${
                        isPrimary
                          ? 'bg-primary-50 text-primary-700'
                          : 'bg-accent-50 text-accent-700'
                      }`}>
                        {c.label}
                      </span>
                      <p className="text-[13.5px] text-ink-600 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                  <span className={`mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                    isPrimary
                      ? 'text-primary-700 group-hover:text-primary-800'
                      : 'text-accent-700 group-hover:text-accent-800'
                  }`}>
                    Try now <ArrowRight size={13} />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>

        {/* Scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-1.5">
          <span className="text-[13px] font-medium text-ink-500">View more calculators below</span>
          <a
            href="#all-calculators"
            className="w-9 h-9 rounded-full border border-ink-200 flex items-center justify-center text-ink-500 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors"
            aria-label="View all calculators"
          >
            <ChevronDown size={18} />
          </a>
        </div>
      </Section>

      {/* ── ALL OUR CALCULATORS (23) ──────────────────────────── */}
      <Section tone="muted" id="all-calculators">
        <SectionHeading
          eyebrow="All Calculators"
          title="All our calculators"
          subtitle="Every calculator you need for smarter property and finance decisions — free, with no data stored."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.03}>
              <Link
                to={`/calculators/${c.slug}`}
                className="group card card-hover p-5 h-full flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-accent-100 text-accent-700">
                  <Icon name={c.icon} size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-ink-900">{c.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-600 leading-relaxed line-clamp-2">{c.desc}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary-700 group-hover:text-primary-800">
                    Try now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── TIPS ─────────────────────────────────────────────── */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Use them wisely"
          title="Get the most out of our calculators"
          subtitle="Numbers are a starting point — not a verdict. Here's how to get the most useful insight from each tool."
          center
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.04}>
              <div className="card p-5 h-full flex gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={tip.icon} size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-ink-900">{tip.title}</h4>
                  <p className="mt-1.5 text-[13.5px] text-ink-600 leading-relaxed">{tip.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Numbers looking promising?"
        subtitle="Book a free 20-minute call and we'll turn the figures into a real strategy you can act on."
      />
    </PageWrapper>
  )
}
