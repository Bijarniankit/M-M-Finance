import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'

const TIPS = [
  {
    icon: 'Wallet',
    title: 'Define your budget',
    desc: 'Map out exactly what you can comfortably afford each month — not just the maximum a lender will approve. Factor in council rates, strata, insurance, maintenance and a buffer for higher interest rates. The right budget is the one you can still live with on a rainy day.',
  },
  {
    icon: 'Search',
    title: 'Research the neighbourhood',
    desc: 'Spend time walking the streets at different hours, checking transport, schools, flood and bushfire history, and recent sale prices. Suburb data tells one story — being there in person tells another. A great property in the wrong street rarely ends up being a great purchase.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Get a home inspection',
    desc: 'A qualified building and pest inspection is one of the cheapest forms of insurance you can buy. It uncovers structural issues, moisture damage, termites and dodgy renovations before you commit — and it gives you genuine leverage at the negotiation table.',
  },
  {
    icon: 'FileText',
    title: 'Understand the loan terms',
    desc: 'Read past the headline rate. Look at the comparison rate, the fees, the offset and redraw features, the rate-lock policy if you’re fixing, and how the lender treats extra repayments. Two loans at the same rate can cost very different amounts over thirty years.',
  },
  {
    icon: 'Scale',
    title: 'Consider future resale value',
    desc: 'Even if this is your forever home, your circumstances may change. Buy a property with broad appeal — sensible layout, decent land, good light, walking distance to something useful. These are the homes that hold their value when the market wobbles.',
  },
  {
    icon: 'Lightbulb',
    title: 'Negotiate effectively',
    desc: 'Do your homework on recent comparable sales, understand what motivates the seller, and put your strongest position on paper. A pre-approved buyer with a clean offer and a flexible settlement date is almost always more attractive than one chasing the lowest possible price.',
  },
]

export default function BuyingHome() {
  return (
    <PageWrapper>
      {/* HERO */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Start your journey</span>
              <h1 className="mt-4 text-ink-900">Let’s buy a home together</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                Whether you’re upsizing, downsizing, relocating for work or finally buying your forever home, we’ll sit alongside you through every part of the financing — comparing lenders, structuring the loan and keeping the paperwork moving so the property side stays the fun part.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Get started today <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                  alt="Bright modern home interior with couple at the kitchen bench"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary-200/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WE'RE HERE TO HELP */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80"
                  alt="Couple sitting at a kitchen bench reviewing home loan options on a laptop"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">A broker on your side</span>
              <h2 className="mt-3 text-ink-900">We’re here to help</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                Buying a home is one of the biggest financial decisions you’ll ever make. We help you step into it with clarity — comparing more than forty lenders, decoding the policy differences and making sure your application is presented in its best light long before it lands on a credit officer’s desk.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                There are a few simple steps to having the right loan from the start. First, we’ll review your income, expenses and any existing debts to work out a realistic borrowing range. Next, we’ll talk through deposit options — including any First Home Owner Grant or stamp duty concessions you might be eligible for if this is your first purchase. Then we’ll compare loan features, fees and lender policies, and put you in front of the two or three options that genuinely fit.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                If you’d like a head start, our <Link to="/calculators/how-much-borrow" className="text-primary-700 font-semibold hover:underline">How Much Can I Borrow?</Link> calculator will give you an indicative figure in under a minute. Once you’re ready to make it real, give us a call or book a free chat — we’ll take it from there.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SIX TIPS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Get the basics right"
          title="Six tips for home buyers"
          subtitle="The handful of habits that separate a smooth purchase from an expensive one — distilled from fifteen years of helping Australian families step onto the ladder."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {TIPS.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.04}>
              <div className="card p-6 sm:p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <Icon name={tip.icon} size={20} />
                </div>
                <h3 className="text-[17px] font-bold text-ink-900">{tip.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed">{tip.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Need a home loan?"
        subtitle="Whatever your circumstances, we’ll find the deal that’s right for you. Send us a quick enquiry and we’ll be in touch."
        primaryLabel="Speak to us today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
