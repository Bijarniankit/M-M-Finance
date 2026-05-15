import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Icon from '../components/ui/Icon'
import { calculators, featuredCalculators } from '../data/site.js'
import {
  BorrowingPower, LoanRepayment, ExtraRepayments, StampDuty, LMI, LoanComparison,
  IncomeTax, SavingsGoal, BudgetPlanner, OffsetAccount, SplitLoan, PropertyCosts,
  MortgageSwitching, ComparisonRate, HowLongToRepay, CreditCard, PropertySellingCost,
  LumpSumRepayment, InterestOnly, BusinessLoan, IncomeAnnualisation, ReverseMortgage,
  IntroductoryRate, CompoundInterest,
  BuyFirstHome, RefinanceSave, PropertyInvestment, HowMuchBorrow,
} from '../components/calculators/Calcs'

const MAP = {
  'borrowing-power':       BorrowingPower,
  'loan-repayment':        LoanRepayment,
  'extra-repayments':      ExtraRepayments,
  'stamp-duty':            StampDuty,
  'lmi':                   LMI,
  'loan-comparison':       LoanComparison,
  'income-tax':            IncomeTax,
  'savings-goal':          SavingsGoal,
  'budget-planner':        BudgetPlanner,
  'offset-account':        OffsetAccount,
  'split-loan':            SplitLoan,
  'property-costs':        PropertyCosts,
  'mortgage-switching':    MortgageSwitching,
  'comparison-rate':       ComparisonRate,
  'how-long-to-repay':     HowLongToRepay,
  'credit-card':           CreditCard,
  'property-selling-cost': PropertySellingCost,
  'lump-sum-repayment':    LumpSumRepayment,
  'interest-only':         InterestOnly,
  'business-loan':         BusinessLoan,
  'income-annualisation':  IncomeAnnualisation,
  'reverse-mortgage':      ReverseMortgage,
  'introductory-rate':     IntroductoryRate,
  'compound-interest':     CompoundInterest,
  'buy-first-home':        BuyFirstHome,
  'refinance-save':        RefinanceSave,
  'property-investment':   PropertyInvestment,
  'how-much-borrow':       HowMuchBorrow,
}

const allCalcs = [...featuredCalculators, ...calculators]

export default function CalculatorDetail() {
  const { slug } = useParams()
  const calc = allCalcs.find((c) => c.slug === slug)
  const Component = MAP[slug]
  if (!calc || !Component) return <Navigate to="/calculators" replace />

  const related = calculators.filter((c) => c.slug !== slug).slice(0, 4)

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Calculator"
        title={calc.title}
        subtitle={calc.desc}
        breadcrumbs={[{ label: 'Calculators', to: '/calculators' }, { label: calc.title }]}
      />
      <div className="bg-surface-muted">
        <Component />
      </div>

      <Section tone="default">
        <h2 className="text-ink-900">Try another calculator</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c) => (
            <Link key={c.slug} to={`/calculators/${c.slug}`} className="card card-hover p-5 block group">
              <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center mb-3">
                <Icon name={c.icon} size={18} />
              </div>
              <h3 className="text-[15px] font-bold text-ink-900">{c.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-700 group-hover:text-primary-800">
                Open <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </PageWrapper>
  )
}
