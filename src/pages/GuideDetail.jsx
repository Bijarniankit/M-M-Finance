import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight, Clock, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import { guides } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

const CONTENT = {
  'first-home-buyer-guide': {
    sections: [
      {
        h: 'Step 1 — Get your finances ready',
        p: 'Most lenders want to see at least 5% genuine savings — money you have built up yourself rather than received as a gift. Start a dedicated savings account, automate the transfers, and avoid touching it for at least three months before applying. Lenders look at the last 90 days of statements very closely.',
      },
      {
        h: 'Step 2 — Understand what you can borrow',
        p: 'Your borrowing power is driven by income, expenses, debts and dependants. Lenders use the higher of your declared expenses and the Household Expenditure Measure, then stress test at your rate plus around 3%. Use our Borrowing Power calculator for a realistic estimate.',
      },
      {
        h: 'Step 3 — Pick the right scheme',
        p: 'Eligible first home buyers can use the First Home Guarantee to buy with just 5% deposit and avoid LMI entirely. Some states also offer First Home Owner Grants up to $10,000 and stamp duty concessions. We will walk you through which apply to your situation.',
      },
      {
        h: 'Step 4 — Get pre-approved',
        p: 'Pre-approval gives you a clear price ceiling and the confidence to bid at auction or make an offer. It typically lands within 3–5 business days and is valid for 90 days.',
      },
      {
        h: 'Step 5 — Find a property and go to formal approval',
        p: 'Once you have a contract of sale, the lender values the property and issues formal approval. We coordinate the valuation and any conditions the lender raises.',
      },
      {
        h: 'Step 6 — Settle and pick up the keys',
        p: 'Your conveyancer, lender and the seller\'s solicitor coordinate settlement — usually 4–6 weeks after contract exchange. We stay across it all so you do not have to.',
      },
    ],
  },
  'how-much-can-i-borrow': {
    sections: [
      {
        h: 'How lenders calculate borrowing power',
        p: 'Every lender uses a serviceability calculator that adds up your assessable income, subtracts your living expenses (the higher of declared and HEM), subtracts existing debt commitments stress-tested at +3%, and figures out how much loan repayment you can support.',
      },
      {
        h: 'Income that counts',
        p: 'PAYG salary is fully accepted. Overtime, bonuses and commission are typically counted at 80%. Casual income usually needs 6–12 months in role. Self-employed borrowers need 1–2 years of tax returns and notices of assessment.',
      },
      {
        h: 'Why two banks give different numbers',
        p: 'Lenders apply different stress test buffers, expense floors, dependant adjustments and overtime weightings. The same applicant can comfortably get $620k from one lender and just $480k from another. Choosing the right lender is a real lever.',
      },
      {
        h: 'How to lift your borrowing power',
        p: 'Pay down credit card limits (lenders assess on the limit, not the balance), close unused store cards, lower discretionary spending three months before applying, and avoid major lifestyle inflation.',
      },
    ],
  },
  'fixed-vs-variable': {
    sections: [
      {
        h: 'Variable rates — flexible but unpredictable',
        p: 'Variable rates move with your lender\'s pricing, which usually tracks the RBA cash rate. You can make extra repayments, redraw, and use offset accounts. The trade-off: your repayment can rise with little warning.',
      },
      {
        h: 'Fixed rates — certainty at a price',
        p: 'Lock in a rate for 1–5 years. Repayments do not move, which makes budgeting easier. The catch: most fixed loans cap extra repayments, do not allow offset accounts, and charge break costs if you exit early.',
      },
      {
        h: 'Splits — a bit of both',
        p: 'Split your loan, e.g. 60% variable / 40% fixed. You keep the flexibility of an offset on the variable portion while protecting yourself from rate spikes on the fixed portion. Use our Split Loan calculator to model it.',
      },
      {
        h: 'When to consider locking',
        p: 'Strong arguments for fixing: you are tight on budget, you suspect rates are rising, or you simply want the certainty. Strong arguments against: you may sell or refinance soon, or you want to make large extra repayments.',
      },
    ],
  },
  'refinancing-checklist': {
    sections: [
      {
        h: 'When refinancing makes sense',
        p: 'A common rule of thumb is to review every two years. If your current rate is 0.4–0.5% above what is on offer for new clients, a refinance often pays for itself within 12 months — sometimes immediately, with cashback offers.',
      },
      {
        h: 'Costs to watch',
        p: 'Discharge fees ($300–$600), government fees ($200–$400), and any break costs on a fixed loan. Most variable loan refinances net positive once you factor in cashback, which often runs $2,000–$4,000.',
      },
      {
        h: 'The 10-point checklist',
        p: '1) Current rate vs market new-client rates. 2) Annual fees. 3) Offset benefit. 4) Cashback offers. 5) Loan structure (P&I vs IO, splits). 6) Property valuation movement. 7) LVR — has equity grown? 8) Debt consolidation potential. 9) Investment property tax considerations. 10) Plans for the next 2–3 years.',
      },
    ],
  },
  'investment-property-strategy': {
    sections: [
      {
        h: 'Cashflow vs growth',
        p: 'Investors usually pick a focus: high-yield properties (better cashflow, slower growth) or capital-growth properties (often negative gearing, betting on appreciation). Both can work — what matters is matching the strategy to your tax position and risk appetite.',
      },
      {
        h: 'Why interest-only makes sense for investors',
        p: 'Interest payments are tax deductible on investment loans, so paying down principal can be inefficient — especially if you also have a non-deductible home loan. Interest-only frees cashflow to pay down the home loan first.',
      },
      {
        h: 'Avoiding cross-securitisation',
        p: 'When one lender holds security over multiple of your properties, your lending power can become limited. We typically diversify across 2–3 lenders to keep flexibility for future purchases.',
      },
      {
        h: 'Equity release — the engine of growth',
        p: 'As your existing properties grow in value, you can release equity (usually up to 80% LVR) and use it as deposit on the next purchase. This is how most multi-property investors fund their next move.',
      },
    ],
  },
  'lmi-explained': {
    sections: [
      {
        h: 'What LMI actually is',
        p: 'Lenders Mortgage Insurance protects the lender (not you) if you default and the property sells for less than the loan. It is a one-off premium charged when your deposit is below 20% of the property value.',
      },
      {
        h: 'How it is priced',
        p: 'LMI premiums step up as your LVR rises. Roughly: 1.1% of the loan at 85% LVR, 1.8% at 90%, 3.4% at 95%. On a $600,000 loan at 90% LVR, expect around $10,800 in LMI.',
      },
      {
        h: 'How to avoid it',
        p: 'Save a 20% deposit. Use the First Home Guarantee scheme. Use a parental guarantee. Some lenders waive LMI for medical, legal and accounting professionals — we will tell you if you qualify.',
      },
    ],
  },
}

export default function GuideDetail() {
  const { slug } = useParams()
  const guide = guides.find((g) => g.slug === slug)
  const content = CONTENT[slug]
  if (!guide) return <Navigate to="/guides" replace />

  const related = guides.filter((g) => g.slug !== slug).slice(0, 3)

  return (
    <PageWrapper>
      <PageHeader
        eyebrow={guide.category}
        title={guide.title}
        subtitle={guide.excerpt}
        breadcrumbs={[{ label: 'Guides', to: '/guides' }, { label: guide.category }]}
      />

      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <article className="max-w-2xl">
            <div className="flex items-center gap-3 text-[12.5px] text-ink-500">
              <Clock size={13} /> {guide.readTime}
              <span>·</span>
              <span>Last updated January 2026</span>
            </div>
            {content?.sections.map((s, i) => (
              <section key={i} className="mt-8">
                <h2 className="text-[22px] font-bold text-ink-900">{s.h}</h2>
                <p className="mt-3 text-[15.5px] text-ink-700 leading-relaxed">{s.p}</p>
              </section>
            ))}

            <div className="mt-10 card p-6 bg-surface-muted border-primary-100">
              <h3 className="text-[18px] font-bold text-ink-900">Want this applied to your situation?</h3>
              <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
                Generic advice only goes so far. Book a free 20-minute call and we will tailor this to your numbers.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Link to="/get-started" className="btn btn-md btn-primary">
                  Get started <ArrowRight size={15} />
                </Link>
                <Link to="/calculators" className="btn btn-md btn-outline">
                  Try our calculators
                </Link>
              </div>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 space-y-4">
            <div className="card p-6">
              <h4 className="text-[14px] font-semibold text-ink-900 uppercase tracking-wide">More guides</h4>
              <ul className="mt-3 space-y-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link to={`/guides/${g.slug}`} className="group block">
                      <span className="text-[14px] font-semibold text-ink-800 group-hover:text-primary-700 transition-colors leading-snug">
                        {g.title}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-[12.5px] text-ink-500">
                        <ChevronRight size={12} /> {g.category} · {g.readTime}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CTASection
        title="Ready to put this into action?"
        subtitle="Our brokers can take you from research to ready-to-apply in one free consultation."
      />
    </PageWrapper>
  )
}
