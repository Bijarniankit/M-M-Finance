import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'

const PROMISES = [
  {
    icon: 'Users',
    title: 'We listen first',
    desc: 'Before we recommend anything, we listen. Your goals, your timeline, your appetite for risk and your day-to-day cash flow all shape what the right loan looks like — and no two situations are identical.',
  },
  {
    icon: 'Scale',
    title: 'We compare widely',
    desc: 'Forty-plus lenders sit on our panel. We’re not tied to a single bank’s product set, which means our recommendation is genuinely the best fit for you — not the easiest sale for us.',
  },
  {
    icon: 'FileText',
    title: 'We explain clearly',
    desc: 'No jargon, no fine-print surprises. We walk you through the features that matter and the ones that don’t, so you understand exactly what you’re signing up for.',
  },
  {
    icon: 'Handshake',
    title: 'We stay with you',
    desc: 'We’re there from application through to settlement, and we keep reviewing the loan every year afterwards. Most clients are with us for the life of their mortgage.',
  },
]

const FEATURES = [
  {
    icon: 'Banknote',
    title: 'Interest rate',
    desc: 'Every loan has either a variable or fixed interest rate — and many borrowers combine both via a split. The headline rate matters, but so do comparison rate, lender margins above the cash rate, and how often interest is calculated and charged. We’ll show you the all-in cost, not just the marketing number.',
  },
  {
    icon: 'PiggyBank',
    title: 'Extra repayments',
    desc: 'Paying more than the minimum reduces both the loan term and the total interest paid. On variable loans, extra repayments are usually unlimited and fee-free. Fixed loans often cap them — typically around $10,000 per year — so it pays to plan ahead if you expect a bonus, tax refund or inheritance.',
  },
  {
    icon: 'Wallet',
    title: 'Offset account',
    desc: 'An offset is a transaction account linked to your loan. Whatever balance sits in the offset is deducted from your loan balance before interest is calculated. Park your salary, savings and emergency fund there and watch the interest charge fall — a powerful, tax-effective feature for owner-occupiers and investors alike.',
  },
  {
    icon: 'Repeat',
    title: 'Redraw facility',
    desc: 'Redraw lets you pull back any extra repayments you’ve made on the loan if you need them later. It’s like an offset’s simpler cousin — useful for accessing surplus repayments without breaking the loan, though it doesn’t carry quite the same tax-treatment benefits as an offset for investors.',
  },
  {
    icon: 'GitBranch',
    title: 'Split loans',
    desc: 'Split your loan into two (or more) portions — for instance, half fixed and half variable — to hedge against rate movements while keeping flexibility on part of the balance. The ratio is yours to choose, and the split can be adjusted at refinance time as your circumstances change.',
  },
  {
    icon: 'Receipt',
    title: 'Direct debit',
    desc: 'Almost every loan repays via automated direct debit. Choose weekly, fortnightly or monthly to match your pay cycle — fortnightly repayments quietly knock years off the loan because you make twenty-six payments a year instead of twelve monthly ones.',
  },
  {
    icon: 'Clock',
    title: 'Home loan term',
    desc: 'Most Australian home loans run for twenty-five or thirty years. A shorter term means higher repayments but dramatically less interest paid over the life of the loan. We’ll model both side-by-side so you can see the trade-off in dollars rather than guess at it.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Lender policy',
    desc: 'Two loans at the same rate can be very different in practice. Policy on extra repayments, valuation methods, lending area restrictions, casual income shading and rate-lock terms varies wildly between lenders. Choosing the right policy fit is often more important than chasing the lowest headline rate.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Professional packages',
    desc: 'Many lenders bundle their home loan with a transaction account, credit card and discounted insurance under a single annual fee — often around $395. The package usually unlocks ongoing rate discounts and offset functionality, and can be worth far more than the annual fee for the right borrower.',
  },
  {
    icon: 'Layers',
    title: 'Variable loans',
    desc: 'Variable loans move with the market, offer maximum flexibility and almost always come with full offset and unlimited extra repayments. They’re the default starting point for most Australian borrowers — but the right discount margin and lender policy still matter enormously.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Repayment Holiday',
    desc: 'Some lenders allow short repayment pauses — usually a few months at most — for life events like parental leave or extended travel. The interest continues to accrue, so a repayment holiday isn’t free, but it’s a useful safety net to know your loan offers if circumstances change.',
  },
  {
    icon: 'Star',
    title: 'Features that matter',
    desc: 'A loan with twenty bells and whistles is no use if you only ever use three. We help you focus on the handful of features that genuinely move the needle for your situation — and ignore the marketing fluff around the rest.',
  },
]

export default function LoanFeatures() {
  return (
    <PageWrapper>
      {/* HERO */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Typical loan features</span>
              <h1 className="mt-4 text-ink-900">There’s a right loan for everyone but there’s a right one for you</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                The loan you choose is just as important as the property you’re buying. Australian banks and lenders offer dozens of different home loans, each with its own combination of rate, features and policy. The right one for your neighbour or your sibling won’t necessarily be the right one for you — and the wrong one quietly costs tens of thousands of dollars over thirty years.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                That’s where we come in. We sit on your side of the table, line up the genuinely competitive options across our forty-plus lender panel, and explain in plain English which features actually matter for your situation and which are just marketing.
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
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80"
                  alt="Broker meeting with clients to discuss home loan features around a table"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WHEN YOU'RE READY */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Working with us"
          title="When you’re ready, why not talk to a broker about your next steps?"
          subtitle="Four commitments that shape how we approach every loan we write."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="card p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <Icon name={p.icon} size={20} />
                </div>
                <h3 className="text-[16.5px] font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURES GRID */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The detail"
          title="Here’s a guide to common loan features and benefits"
          subtitle="Of course, the loan or features that you wish to be a part of will depend on your circumstances, your goals and the way you like to manage money day to day."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.03}>
              <div className="card p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center mb-4">
                  <Icon name={f.icon} size={20} />
                </div>
                <h3 className="text-[16.5px] font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{f.desc}</p>
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
