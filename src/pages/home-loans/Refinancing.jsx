import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'

const REASONS = [
  {
    icon: 'TrendingUp',
    title: 'Secure a sharper rate',
    desc: 'The single most common reason to refinance is to drop the rate. Even a 0.50% reduction on a $600,000 loan saves roughly $3,000 a year — and it compounds across the remaining term. The market shifts constantly, so a loan that was competitive two years ago often isn’t today.',
  },
  {
    icon: 'PiggyBank',
    title: 'Unlock equity for the next step',
    desc: 'If your property has grown in value, refinancing lets you access that equity for renovations, an investment property, school fees or consolidating other debt. We’ll talk you through how much equity is usable and the structures that keep your tax position clean.',
  },
  {
    icon: 'Repeat',
    title: 'Consolidate debts and simplify',
    desc: 'Personal loans, car loans and credit cards typically carry rates well above home loan rates. Rolling them into your mortgage can drop the headline interest cost dramatically — though it stretches the repayment term, so we’ll model both sides of the trade-off honestly.',
  },
  {
    icon: 'GitBranch',
    title: 'Restructure for the next chapter',
    desc: 'Life changes — kids arrive, businesses grow, properties get rented out, partners separate. The loan structure that suited you five years ago may now be working against you. Refinancing is an opportunity to redesign the debt around the life you have today.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Add useful features',
    desc: 'If your current loan doesn’t offer an offset account, redraw, splits or generous extra-repayment terms, refinancing is often the cleanest way to add them. Done well, those features quietly save tens of thousands of dollars over the life of the loan.',
  },
  {
    icon: 'Award',
    title: 'Capture lender cashback',
    desc: 'Several lenders periodically offer $2,000–$4,000 refinance cashbacks. When the rate, fees and ongoing service stack up regardless, the cashback is a useful sweetener — though it should never be the headline reason to switch. We’ll only put it on the table when the underlying deal is genuinely competitive.',
  },
]

export default function Refinancing() {
  return (
    <PageWrapper>
      {/* HERO with guide download */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Refinancing your home loan</span>
              <h1 className="mt-4 text-ink-900">We help you make sense of your choices</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                A shift in circumstances may mean it’s time to revisit your home finances. For many, the idea of refinancing is a familiar one. We take the effort out of researching your options, comparing more than forty Australian lenders to make sure your structure, rate and features are still pulling their weight. All the variables can be considered — from break costs and discharge fees through to offset benefits, redraw flexibility, repayment frequency and the small policy differences that make one lender quietly better than the next for your situation.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Most refinances we run land somewhere between a sharper interest rate, an equity release for the next move, or a tidy debt consolidation. Whichever bucket you sit in, the process is the same — we run the numbers, present the genuine options, and only recommend the switch if you’re demonstrably better off.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Get a free refinance review <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-7 bg-white border-primary-100 lg:sticky lg:top-28">
              <span className="eyebrow"><Icon name="BookOpen" size={12} /> Free guide</span>
              <h3 className="mt-3 text-[20px] font-bold text-ink-900">Download our guide to refinancing your home loan</h3>
              <p className="mt-3 text-[14.5px] text-ink-600 leading-relaxed">
                As long-term Australian brokers, we understand things change. Have you started a new project? Whatever the reason, our guide will tell you what to expect at each stage of refinancing your home loan. It’s the perfect first read before you switch.
              </p>
              <a href="#download" className="mt-5 btn btn-md btn-primary w-full">
                <Download size={15} /> Download the guide
              </a>
              <p className="mt-3 text-[12.5px] text-ink-500">
                Covers timing, costs, lender choice, cashback offers and the full step-by-step process.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CHANGING CIRCUMSTANCES */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80"
                  alt="Family discussing home loan refinance options at the kitchen table"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">Why refinance now?</span>
              <h2 className="mt-3 text-ink-900">Changing circumstances may mean it is time to revisit your home finances</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                Refinancing a mortgage can feel overwhelming for many people. This is where our expertise comes in. We can clarify the nuances of the area and unsure what your existing loan covers — and how to access the mortgage repayment reduction, equity release, debt consolidation or feature upgrade you’re actually after. Spelling out the right entry points, what the consolidation actually saves and explaining what it means at each tax stage are all part of what we do in the right application.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                The right time to refinance is usually whenever any of three things become true: your current rate is more than 0.50% above what’s available, you have meaningful equity you’d like to put to work, or the structure of your loan no longer matches the life around it. Our review is free, takes about twenty minutes, and ends with a clear yes-or-no on whether switching is genuinely worth the effort.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SIX REASONS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Reasons people refinance"
          title="Six smart reasons to revisit your home loan"
          subtitle="If any of these are starting to feel familiar, it’s probably time for a free fifteen-minute review."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.04}>
              <div className="card p-6 sm:p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center mb-4">
                  <Icon name={r.icon} size={20} />
                </div>
                <h3 className="text-[17px] font-bold text-ink-900">{r.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Need a home loan?"
        subtitle="Whatever your circumstances, we’ll find the deal that’s right for you. Send a quick enquiry and we’ll be in touch."
        primaryLabel="Speak to us today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
