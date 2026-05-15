import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'

const CHOICES = [
  {
    icon: 'PiggyBank',
    title: 'Cash or finance?',
    desc: 'Most investors borrow rather than buy outright — leverage is one of the key reasons property is such a powerful wealth-building asset. Borrowing also keeps your own capital free for the next opportunity. We’ll talk through the structures that maximise tax efficiency without overcommitting your cashflow.',
  },
  {
    icon: 'MapPin',
    title: 'Location, location, location',
    desc: 'A great investment property is rarely the one that catches your eye first. Look at suburbs with growing populations, planned infrastructure, broad employer bases, low long-term vacancy rates and a sensible rent-to-price ratio. The numbers should make sense before the property is even shortlisted.',
  },
  {
    icon: 'Wallet',
    title: 'Resource the numbers',
    desc: 'Beyond the purchase price, factor in stamp duty, conveyancing, lender fees, building and pest inspections, property management, council rates, strata, insurance, maintenance and vacancy buffers. Investing on a thin margin only works until the first unexpected bill arrives.',
  },
  {
    icon: 'Building',
    title: 'House, unit or townhouse?',
    desc: 'Houses tend to deliver stronger long-term capital growth thanks to the land component; units typically offer higher rental yields and lower maintenance. Townhouses can sit nicely in the middle. The right pick depends on your goals, your borrowing capacity and the market you’re targeting.',
  },
  {
    icon: 'Users',
    title: 'Count your tenants in',
    desc: 'Think about who you want renting your property — young professionals, families, students, retirees — and buy something they’ll actually want to live in. Good tenants stay longer, look after the place and reduce vacancy stress. Property management quality matters just as much as the property itself.',
  },
  {
    icon: 'TrendingUp',
    title: 'Stay focused',
    desc: 'Property investment is a long game. Avoid the temptation to chase headlines, trade in and out of markets, or buy something off-market just because it’s available. The best portfolios are built methodically — one well-chosen property at a time, held through cycles, supported by the right finance.',
  },
  {
    icon: 'Shield',
    title: 'Manage your borrowings',
    desc: 'Loan structure is where investors quietly win or lose. Interest-only periods, split loans, offset accounts, redraw, equity releases, lender choice — each lever has tax and cashflow implications. We help investors structure debt so each property strengthens rather than strains the rest of the portfolio.',
  },
  {
    icon: 'Lightbulb',
    title: 'Appreciate depreciation',
    desc: 'For most investment properties, you can claim depreciation on the building and the fixtures and fittings against your rental income — often thousands of dollars a year. A quantity surveyor’s depreciation schedule pays for itself quickly. Talk to your accountant about whether one applies to you.',
  },
]

export default function Investing() {
  return (
    <PageWrapper>
      {/* HERO with side guide */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Start your investment journey</span>
              <h1 className="mt-4 text-ink-900">The keys to investing in property</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                An investment in property is a major decision. Like any large purchase, the right preparation is what turns it from a leap of faith into a measured, well-structured step toward long-term wealth. We work with investors at every stage — from first investment property through to multi-property portfolios — and our job is to make sure the finance side never holds the strategy back.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Investment lending has its own rules. Servicing buffers, interest-only policies, rental income shading, lender concentration risk — these are all areas where the right broker saves you serious money over the life of the portfolio. We’ll talk you through the structures that work, the ones that don’t, and why.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Speak to a broker <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-7 bg-white border-primary-100 lg:sticky lg:top-28">
              <span className="eyebrow"><Icon name="BookOpen" size={12} /> Free guide</span>
              <h3 className="mt-3 text-[20px] font-bold text-ink-900">Download our guide on investing in property</h3>
              <p className="mt-3 text-[14.5px] text-ink-600 leading-relaxed">
                Whether you’re considering your first investment property or your fifth, our guide pulls together the structures, numbers and lender insights that separate the portfolios that grow from the ones that stall.
              </p>
              <a href="#download" className="mt-5 btn btn-md btn-primary w-full">
                <Download size={15} /> Download the guide
              </a>
              <p className="mt-3 text-[12.5px] text-ink-500">
                Covers loan structures, deposit strategies, tax considerations and lender choice.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* INTRO BAND */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Research and homework"
          title="Make confident choices and get more from your investment"
          subtitle="The fundamentals every investor should think through — distilled from years of helping Australian families build, restructure and protect property portfolios."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CHOICES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="card p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <Icon name={c.icon} size={20} />
                </div>
                <h3 className="text-[16.5px] font-bold text-ink-900">{c.title}</h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to grow your property portfolio?"
        subtitle="Whether you’re buying your first investment or restructuring an existing portfolio, we’ll find the structure that works hardest for you."
        primaryLabel="Get started today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
