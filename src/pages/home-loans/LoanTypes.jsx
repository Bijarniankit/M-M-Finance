import { Link } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import CTASection from '../../components/ui/CTASection'

const LOAN_TYPES = [
  {
    name: 'Variable Rate Loans',
    summary:
      'Interest rates on your loan move up or down in line with the lender’s reference rate and broader market conditions. Most Australian home loans start here, and for good reason — variable loans usually offer the most flexibility, the lowest fees and full access to features like offset accounts, redraw and unlimited extra repayments.',
    pros: [
      'Take advantage of rate cuts the moment they happen — repayments fall automatically.',
      'Make unlimited extra repayments without break fees and pay the loan down faster.',
      'Full offset and redraw functionality on most variable loans.',
      'Cheap to refinance away from if a sharper deal appears with another lender.',
    ],
    cons: [
      'Repayments can rise with little notice if the lender or RBA moves rates up.',
      'Harder to budget precisely month-to-month over the medium term.',
      'In a fast-rising-rate environment, you may end up paying more than a fixed-rate borrower for the same period.',
    ],
  },
  {
    name: 'Fixed Rate Loans',
    summary:
      'The interest rate is fixed for a defined period — most commonly one, two, three or five years. Your repayment is locked in and won’t move regardless of what happens in the market. After the fixed term ends, the loan typically reverts to a variable rate or rolls into another fixed term.',
    pros: [
      'Repayment certainty makes budgeting straightforward for the fixed period.',
      'Protection against rate rises if the market shifts upward.',
      'Useful when cash flow is tight or income is unpredictable.',
      'Can split a portion of the loan to fix while leaving the rest variable.',
    ],
    cons: [
      'You don’t benefit if rates fall during the fixed period.',
      'Extra repayments are often capped (commonly $10,000 a year).',
      'Limited or no offset functionality on most fixed loans.',
      'Break costs to exit or refinance early can be significant.',
    ],
  },
  {
    name: 'Split Rate Loans',
    summary:
      'Your loan is divided into two (or more) portions, with one part fixed and the other part variable. The split can be any ratio that suits you — 50/50 is common, but we often see 70/30 or 30/70 depending on the appetite for certainty versus flexibility.',
    pros: [
      'You get the best of both worlds — some repayment certainty plus some flexibility.',
      'You can make extra repayments and use offset on the variable portion.',
      'The fixed portion hedges against rate rises on part of the loan.',
      'Customise the ratio to your appetite for risk and rate movement.',
    ],
    cons: [
      'Slightly more complex to manage than a single-product loan.',
      'Break costs still apply to the fixed portion if you exit early.',
      'Some lenders charge a small additional fee for splits.',
    ],
  },
  {
    name: 'Interest Only Loans',
    summary:
      'You pay only the interest charge on the loan for a defined period — typically one to five years — without reducing the principal. After the interest-only period ends, the loan reverts to principal-and-interest repayments, which are then higher because they’re calculated over the remaining (shorter) loan term.',
    pros: [
      'Lower repayments during the interest-only period free up cash flow.',
      'Useful for investors maximising deductible interest and preserving cash.',
      'Bridges short-term cash flow squeezes (parental leave, business growth).',
      'Allows owner-occupiers to direct cash into offset rather than principal.',
    ],
    cons: [
      'You don’t reduce the loan balance during the interest-only period.',
      'Repayments jump noticeably when the loan reverts to P&I.',
      'Total interest paid over the life of the loan is usually higher.',
      'Lender policies on extending interest-only have tightened in recent years.',
    ],
  },
  {
    name: 'Line of Credit',
    summary:
      'A revolving credit facility secured against your home, with an approved limit you can draw down and repay as needed — a bit like a giant credit card with home loan interest rates. You only pay interest on the amount drawn, not the full approved limit.',
    pros: [
      'Flexible access to funds for renovations, investments or unexpected costs.',
      'Pay interest only on what you draw, not on the unused limit.',
      'Can replace multiple smaller debts with one tidy facility.',
      'Useful for investors timing market opportunities.',
    ],
    cons: [
      'Interest rates are typically higher than a standard variable home loan.',
      'Requires financial discipline — easy to use the line as long-term debt.',
      'No structured repayment schedule means principal can stagnate.',
      'Annual fees and ongoing service fees are common.',
    ],
  },
  {
    name: 'Introductory / Honeymoon Loans',
    summary:
      'A discounted rate is offered for an introductory period — commonly six to twelve months — before the loan reverts to a standard variable rate. The discount can be meaningful, but the rate you revert to is often higher than what’s available elsewhere, so the long-term cost matters more than the headline number.',
    pros: [
      'Lower repayments during the honeymoon period.',
      'Useful if cash flow is tightest in the first year (e.g. new home costs).',
      'Often paired with cashback offers or fee waivers.',
    ],
    cons: [
      'The revert rate is often uncompetitive — model the full cost before signing.',
      'Some lenders charge fees or break costs if you leave before a set period.',
      'Features (offset, extra repayments) may be limited during the honeymoon.',
    ],
  },
  {
    name: 'Low Doc Loans',
    summary:
      'Designed for self-employed borrowers who don’t have the standard two years of tax returns lenders typically require. Income is verified through alternative documentation — usually BAS statements, business bank statements or an accountant’s declaration — rather than full tax returns.',
    pros: [
      'Accessible for newer businesses or borrowers with irregular income.',
      'Often available with major lenders, not just specialist non-banks.',
      'Can refinance to a full-doc loan once two years of tax returns are available.',
    ],
    cons: [
      'Interest rates and fees are usually higher than full-doc loans.',
      'Larger deposit (typically 20% or more) is often required.',
      'Stricter LMI requirements and tighter property type restrictions.',
    ],
  },
]

export default function LoanTypes() {
  return (
    <PageWrapper>
      {/* HERO */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow">What’s changing? — Loans</span>
              <h1 className="mt-4 text-ink-900">A new home or the right loan?</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                Picking a property is exciting, picking the right loan is essential. There are hundreds of home loan products on the Australian market, and every one of them is slightly different from the rest. The trick is matching the loan type to your situation — your income, your goals, your appetite for risk, and the way you like to manage money. Our job is to translate the small print into a clear, side-by-side comparison so you can choose with confidence.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Below is a plain-English breakdown of the loan types you’ll come across most often in Australia. Each comes with its own strengths and trade-offs — and the right one for you is the one that quietly does the heavy lifting in the background of your life for the next thirty years.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Let’s have a chat <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80"
                  alt="Aerial view of a quiet suburban Australian street with modern homes"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* TYPES OF HOME LOAN — pros/cons cards */}
      <Section tone="default">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <span className="eyebrow">Types of home loan they work</span>
          <h2 className="mt-3 text-ink-900">A quick tour of the seven you’ll see most often</h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-ink-600 leading-relaxed">
            Read through, see what fits, and then come and talk to us — we’ll narrow it down to the two or three lenders and products that genuinely suit your situation.
          </p>
        </div>

        <div className="space-y-8">
          {LOAN_TYPES.map((loan, i) => (
            <Reveal key={loan.name} delay={i * 0.03}>
              <div className="card p-6 sm:p-8">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-ink-900">{loan.name}</h3>
                <p
                  className="mt-3 text-[14.5px] sm:text-[15px] text-ink-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: loan.summary }}
                />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-full bg-primary-700 text-white flex items-center justify-center">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span className="text-[13px] font-bold tracking-widest uppercase text-primary-800">Pros</span>
                    </div>
                    <ul className="space-y-2.5">
                      {loan.pros.map((p) => (
                        <li key={p} className="flex gap-2 text-[14px] text-ink-700 leading-relaxed">
                          <span className="text-primary-700 mt-0.5"><Check size={14} strokeWidth={2.5} /></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-accent-100/60 border border-accent-200/70 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-full bg-accent-600 text-white flex items-center justify-center">
                        <X size={14} strokeWidth={2.5} />
                      </span>
                      <span className="text-[13px] font-bold tracking-widest uppercase text-accent-800">Cons</span>
                    </div>
                    <ul className="space-y-2.5">
                      {loan.cons.map((c) => (
                        <li key={c} className="flex gap-2 text-[14px] text-ink-700 leading-relaxed">
                          <span className="text-accent-700 mt-0.5"><X size={14} strokeWidth={2.5} /></span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to find the perfect loan for your needs?"
        subtitle="Whatever your circumstances, we’ll find the deal that’s right for you. Book a free chat and we’ll narrow it down together."
        primaryLabel="Speak to us today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
