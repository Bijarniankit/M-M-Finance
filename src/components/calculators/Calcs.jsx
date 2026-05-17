import { useMemo, useState } from 'react'
import CalcShell, { CalcField, CalcResult, fmt, fmtNum } from './CalcShell'
import Slider from './Slider'

/* ─────────────── Helpers ─────────────── */

function monthlyPI(principal, annualRatePct, years) {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

// Number field: starts empty, shows the suggested value as a placeholder,
// and stays clearable — clearing reports `undefined` (not 0) so the user can
// always wipe the field and type a fresh number. Entry is required.
function NumberInput({ value, onChange, prefix, suffix, step = 1, min = 0, placeholder, ...rest }) {
  const isEmpty = value === undefined || value === null || value === ''
  const ph =
    placeholder === undefined || placeholder === null || placeholder === ''
      ? undefined
      : `e.g. ${Number(placeholder).toLocaleString('en-AU')}`
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">{prefix}</span>}
      <input
        type="number"
        inputMode="decimal"
        required
        placeholder={ph}
        className={`input ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        value={isEmpty ? '' : value}
        min={min}
        step={step}
        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
        {...rest}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">{suffix}</span>}
    </div>
  )
}

/* ─────────────── 1. Borrowing Power ─────────────── */
export function BorrowingPower() {
  const [income, setIncome] = useState()
  const [partner, setPartner] = useState()
  const [expenses, setExpenses] = useState()
  const [debts, setDebts] = useState()
  const [rate, setRate] = useState(6.19)
  const [term, setTerm] = useState(30)
  const [deps, setDeps] = useState()

  const result = useMemo(() => {
    const totalIncomeMonthly = (income + partner) / 12 * 0.85
    const householdAdj = expenses + deps * 350
    const surplus = Math.max(0, totalIncomeMonthly - householdAdj - debts)
    const stressedRate = rate + 3
    const r = stressedRate / 100 / 12
    const n = term * 12
    const max = r === 0 ? surplus * n : surplus * (1 - Math.pow(1 + r, -n)) / r
    return { max: Math.max(0, max), surplus }
  }, [income, partner, expenses, debts, rate, term, deps])

  return (
    <CalcShell intro="Estimate how much you could borrow using a typical Australian serviceability calculation, including the 3% stress buffer most lenders apply.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Your annual income (gross)" hint="Salary before tax">
          <NumberInput value={income} onChange={setIncome} prefix="$" step={1000} placeholder={120000} />
        </CalcField>
        <CalcField label="Partner's annual income (optional)">
          <NumberInput value={partner} onChange={setPartner} prefix="$" step={1000} placeholder={0} />
        </CalcField>
        <CalcField label="Monthly living expenses" hint="Food, utilities, transport, insurance, etc.">
          <NumberInput value={expenses} onChange={setExpenses} prefix="$" step={50} placeholder={3500} />
        </CalcField>
        <CalcField label="Existing monthly debt repayments" hint="Credit cards, car loans, personal loans">
          <NumberInput value={debts} onChange={setDebts} prefix="$" step={50} placeholder={500} />
        </CalcField>
        <CalcField label="Number of dependants" hint="Lenders add ~$350/month per dependant">
          <NumberInput value={deps} onChange={setDeps} step={1} placeholder={0} />
        </CalcField>
        <CalcField label="Loan term (years)">
          <Slider value={term} onChange={setTerm} min={10} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <div className="md:col-span-2">
          <CalcField label="Interest rate (current)">
            <Slider value={rate} onChange={setRate} min={4} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
          </CalcField>
        </div>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <CalcResult label="Estimated borrowing power" value={fmt(result.max)} accent size="lg" />
        <CalcResult label="Monthly surplus available" value={fmt(result.surplus)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 2. Loan Repayment ─────────────── */
export function LoanRepayment() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(6.19)
  const [term, setTerm] = useState(30)
  const [type, setType] = useState('PI')
  const [freq, setFreq] = useState('monthly')

  const result = useMemo(() => {
    const monthly = type === 'IO' ? (amount * rate / 100) / 12 : monthlyPI(amount, rate, term)
    const factor = { monthly: 1, fortnightly: 12 / 26, weekly: 12 / 52 }[freq]
    const periodic = monthly * factor
    const totalRepaid = type === 'IO' ? monthly * 12 * term + amount : monthly * 12 * term
    const totalInterest = totalRepaid - amount
    return { periodic, totalRepaid, totalInterest, monthly }
  }, [amount, rate, term, type, freq])

  return (
    <CalcShell intro="Calculate weekly, fortnightly or monthly repayments — and see how much interest you'll pay over the life of the loan.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount">
          <NumberInput value={amount} onChange={setAmount} prefix="$" step={1000} placeholder={650000} />
        </CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Repayment type">
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="PI">Principal & Interest</option>
            <option value="IO">Interest Only</option>
          </select>
        </CalcField>
        <CalcField label="Repayment frequency">
          <select className="select" value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="weekly">Weekly</option>
          </select>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label={`Repayment (${freq})`} value={fmt(result.periodic)} accent size="lg" />
        <CalcResult label="Total interest paid" value={fmt(result.totalInterest)} />
        <CalcResult label="Total amount repaid" value={fmt(result.totalRepaid)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 3. Extra Repayments ─────────────── */
export function ExtraRepayments() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(6.19)
  const [term, setTerm] = useState(30)
  const [extra, setExtra] = useState(300)

  const result = useMemo(() => {
    const baseMonthly = monthlyPI(amount, rate, term)
    const r = rate / 100 / 12
    let bal = amount
    let months = 0
    let totalPaid = 0
    while (bal > 0 && months < term * 12 + 1) {
      const interest = bal * r
      const pay = Math.min(baseMonthly + extra, bal + interest)
      bal = bal + interest - pay
      totalPaid += pay
      months++
    }
    const baseTotal = baseMonthly * 12 * term
    const baseInterest = baseTotal - amount
    const newInterest = totalPaid - amount
    return {
      newYears: months / 12,
      yearsSaved: term - months / 12,
      interestSaved: Math.max(0, baseInterest - newInterest),
      newMonthly: baseMonthly + extra,
    }
  }, [amount, rate, term, extra])

  return (
    <CalcShell intro="See how a small extra payment each month can take years off your loan and save tens of thousands in interest.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current loan balance"><NumberInput value={amount} onChange={setAmount} prefix="$" step={1000} placeholder={550000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Remaining loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Extra monthly repayment">
          <Slider value={extra} onChange={setExtra} min={0} max={2000} step={25} formatter={(v) => fmt(v)} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Years saved" value={`${fmtNum(result.yearsSaved)} yrs`} accent size="lg" />
        <CalcResult label="Interest saved" value={fmt(result.interestSaved)} />
        <CalcResult label="New monthly repayment" value={fmt(result.newMonthly)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 4. Stamp Duty ─────────────── */
const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
function calcStampDuty(price, state, fhb) {
  // Simplified rates — for estimation only.
  const rate = { NSW: 0.04, VIC: 0.055, QLD: 0.035, WA: 0.05, SA: 0.05, TAS: 0.04, ACT: 0.045, NT: 0.05 }[state] || 0.04
  let duty = price * rate
  if (fhb) {
    if (price < 650000) duty *= 0.1
    else if (price < 800000) duty *= 0.5
  }
  return Math.max(0, duty)
}
export function StampDuty() {
  const [price, setPrice] = useState()
  const [state, setState] = useState('NSW')
  const [fhb, setFhb] = useState(false)
  const duty = useMemo(() => calcStampDuty(price, state, fhb), [price, state, fhb])
  const transferFee = 250
  const mortgageRegFee = 165
  const total = duty + transferFee + mortgageRegFee

  return (
    <CalcShell intro="An estimate of stamp duty plus government transfer and mortgage registration fees. Each state and territory uses slightly different rules — final figures should be confirmed before settlement.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Property price"><NumberInput value={price} onChange={setPrice} prefix="$" step={5000} placeholder={800000} /></CalcField>
        <CalcField label="State / Territory">
          <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </CalcField>
        <CalcField label="First home buyer concession">
          <label className="inline-flex items-center gap-2 text-[14px] text-ink-700">
            <input type="checkbox" checked={fhb} onChange={(e) => setFhb(e.target.checked)} className="w-4 h-4 accent-primary-600" />
            Apply first home buyer concession
          </label>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Stamp duty" value={fmt(duty)} accent size="lg" />
        <CalcResult label="Transfer + registration" value={fmt(transferFee + mortgageRegFee)} />
        <CalcResult label="Total government costs" value={fmt(total)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 5. LMI Estimator ─────────────── */
export function LMI() {
  const [price, setPrice] = useState()
  const [deposit, setDeposit] = useState()
  const lvr = (price - deposit) / price * 100
  const loanAmount = price - deposit
  const lmi = useMemo(() => {
    if (lvr <= 80) return 0
    if (lvr <= 85) return loanAmount * 0.011
    if (lvr <= 90) return loanAmount * 0.018
    if (lvr <= 95) return loanAmount * 0.034
    return loanAmount * 0.045
  }, [lvr, loanAmount])

  return (
    <CalcShell intro="Lenders Mortgage Insurance is a one-off premium charged when your deposit is below 20% of the property value. It can usually be added to the loan rather than paid upfront.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Property price"><NumberInput value={price} onChange={setPrice} prefix="$" step={5000} placeholder={800000} /></CalcField>
        <CalcField label="Deposit"><NumberInput value={deposit} onChange={setDeposit} prefix="$" step={1000} placeholder={80000} /></CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Loan-to-value ratio" value={`${fmtNum(lvr)}%`} />
        <CalcResult label="Loan amount" value={fmt(loanAmount)} />
        <CalcResult label="Estimated LMI" value={fmt(lmi)} accent size="lg" />
      </div>
      {lvr <= 80 && (
        <p className="mt-4 text-[14px] text-success font-medium">
          ✓ Your LVR is at or below 80% — no LMI is required.
        </p>
      )}
    </CalcShell>
  )
}

/* ─────────────── 6. Loan Comparison ─────────────── */
export function LoanComparison() {
  const [amount, setAmount] = useState()
  const [term, setTerm] = useState(30)
  const [a, setA] = useState({ rate: 6.19, fee: undefined })
  const [b, setB] = useState({ rate: 5.89, fee: undefined })

  const calc = (opt) => {
    const monthly = monthlyPI(amount, opt.rate, term)
    const total = monthly * 12 * term + opt.fee * term
    return { monthly, total, interest: total - amount }
  }
  const A = calc(a)
  const B = calc(b)
  const diff = A.total - B.total

  return (
    <CalcShell intro="Compare two loan options side-by-side, including annual fees over the loan term.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-ink-200 p-4 sm:p-5">
          <h3 className="text-[16px] font-bold text-ink-900 mb-4">Option A</h3>
          <div className="space-y-4">
            <CalcField label="Interest rate">
              <Slider value={a.rate} onChange={(v) => setA({ ...a, rate: v })} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
            </CalcField>
            <CalcField label="Annual fee"><NumberInput value={a.fee} onChange={(v) => setA({ ...a, fee: v })} prefix="$" placeholder={395} /></CalcField>
            <CalcResult label="Monthly repayment" value={fmt(A.monthly)} />
          </div>
        </div>
        <div className="rounded-xl border border-ink-200 p-4 sm:p-5">
          <h3 className="text-[16px] font-bold text-ink-900 mb-4">Option B</h3>
          <div className="space-y-4">
            <CalcField label="Interest rate">
              <Slider value={b.rate} onChange={(v) => setB({ ...b, rate: v })} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
            </CalcField>
            <CalcField label="Annual fee"><NumberInput value={b.fee} onChange={(v) => setB({ ...b, fee: v })} prefix="$" placeholder={0} /></CalcField>
            <CalcResult label="Monthly repayment" value={fmt(B.monthly)} />
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount"><NumberInput value={amount} onChange={setAmount} prefix="$" step={5000} placeholder={600000} /></CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} yrs`} />
        </CalcField>
      </div>
      <div className="mt-7">
        <CalcResult
          label={diff > 0 ? 'You save with Option B' : 'You save with Option A'}
          value={fmt(Math.abs(diff))}
          accent
          size="lg"
        />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 7. Income Tax (AU 2024-25) ─────────────── */
function auTax(income) {
  // 2024-25 stage 3 thresholds
  let tax = 0
  if (income <= 18200) tax = 0
  else if (income <= 45000) tax = (income - 18200) * 0.16
  else if (income <= 135000) tax = 4288 + (income - 45000) * 0.30
  else if (income <= 190000) tax = 31288 + (income - 135000) * 0.37
  else tax = 51638 + (income - 190000) * 0.45
  const medicare = income > 27222 ? income * 0.02 : 0
  return { tax, medicare, total: tax + medicare, takeHome: income - tax - medicare }
}
export function IncomeTax() {
  const [income, setIncome] = useState()
  const r = auTax(income)
  return (
    <CalcShell intro="Estimate your Australian income tax for 2024–25 (stage 3 rates), including the standard 2% Medicare levy.">
      <CalcField label="Gross annual income">
        <NumberInput value={income} onChange={setIncome} prefix="$" step={1000} placeholder={95000} />
      </CalcField>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CalcResult label="Income tax" value={fmt(r.tax)} />
        <CalcResult label="Medicare levy" value={fmt(r.medicare)} />
        <CalcResult label="Total tax" value={fmt(r.total)} />
        <CalcResult label="Take-home pay" value={fmt(r.takeHome)} accent size="lg" />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 8. Savings Goal ─────────────── */
export function SavingsGoal() {
  const [goal, setGoal] = useState()
  const [start, setStart] = useState()
  const [monthly, setMonthly] = useState()
  const [rate, setRate] = useState(4.5)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    let bal = start
    let months = 0
    while (bal < goal && months < 480) {
      bal = bal * (1 + r) + monthly
      months++
    }
    return { months, years: months / 12, finalBal: bal }
  }, [goal, start, monthly, rate])

  return (
    <CalcShell intro="Plan how long it'll take to reach your deposit or savings goal with regular contributions and compound interest.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Savings goal"><NumberInput value={goal} onChange={setGoal} prefix="$" step={1000} placeholder={80000} /></CalcField>
        <CalcField label="Starting balance"><NumberInput value={start} onChange={setStart} prefix="$" step={500} placeholder={15000} /></CalcField>
        <CalcField label="Monthly contribution"><NumberInput value={monthly} onChange={setMonthly} prefix="$" step={50} placeholder={800} /></CalcField>
        <CalcField label="Interest rate (savings)">
          <Slider value={rate} onChange={setRate} min={0} max={8} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <CalcResult label="Time to reach goal" value={`${fmtNum(result.years)} yrs`} accent size="lg" />
        <CalcResult label="Approx. months" value={`${result.months} months`} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 9. Budget Planner (50/30/20) ─────────────── */
export function BudgetPlanner() {
  const [income, setIncome] = useState()
  const needs = income * 0.5
  const wants = income * 0.3
  const savings = income * 0.2
  return (
    <CalcShell intro="A simple monthly budget using the 50/30/20 rule — 50% needs, 30% wants, 20% savings & debt repayment.">
      <CalcField label="Net monthly income (after tax)">
        <NumberInput value={income} onChange={setIncome} prefix="$" step={100} placeholder={7500} />
      </CalcField>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <CalcResult label="Needs (50%)" value={fmt(needs)} />
        <CalcResult label="Wants (30%)" value={fmt(wants)} />
        <CalcResult label="Savings & debt (20%)" value={fmt(savings)} accent />
      </div>
      <div className="mt-6 card p-4 sm:p-5 bg-surface-muted border-primary-100">
        <h4 className="font-semibold text-ink-900 mb-2">Tips for sticking to it</h4>
        <ul className="check-list">
          <li>Automate the 20% savings on payday — out of sight, out of spend.</li>
          <li>Use a separate "bills" account so direct debits never bounce.</li>
          <li>Review subscriptions every 3 months; you'll always find one to cut.</li>
        </ul>
      </div>
    </CalcShell>
  )
}

/* ─────────────── 10. Offset Account ─────────────── */
export function OffsetAccount() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(6.19)
  const [term, setTerm] = useState(30)
  const [offset, setOffset] = useState(40000)

  const result = useMemo(() => {
    const standardMonthly = monthlyPI(amount, rate, term)
    const standardTotal = standardMonthly * 12 * term
    const standardInt = standardTotal - amount
    // Offset reduces effective principal for interest calc only
    const r = rate / 100 / 12
    let bal = amount
    let totalInt = 0
    let months = 0
    while (bal > 0 && months < term * 12 + 1) {
      const effective = Math.max(0, bal - offset)
      const interest = effective * r
      const pay = Math.min(standardMonthly, bal + interest)
      bal = bal + interest - pay
      totalInt += interest
      months++
    }
    return {
      saved: Math.max(0, standardInt - totalInt),
      yearsSaved: term - months / 12,
      monthly: standardMonthly,
    }
  }, [amount, rate, term, offset])

  return (
    <CalcShell intro="An offset account is a transaction account linked to your home loan. Every dollar in it reduces the interest you pay — without locking the money away.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan balance"><NumberInput value={amount} onChange={setAmount} prefix="$" step={1000} placeholder={550000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} yrs`} />
        </CalcField>
        <CalcField label="Offset balance">
          <Slider value={offset} onChange={setOffset} min={0} max={200000} step={1000} formatter={(v) => fmt(v)} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Interest saved" value={fmt(result.saved)} accent size="lg" />
        <CalcResult label="Years saved" value={`${fmtNum(result.yearsSaved)} yrs`} />
        <CalcResult label="Monthly repayment" value={fmt(result.monthly)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 11. Split Loan ─────────────── */
export function SplitLoan() {
  const [total, setTotal] = useState()
  const [splitPct, setSplitPct] = useState(50)
  const [fixedRate, setFixedRate] = useState(5.99)
  const [varRate, setVarRate] = useState(6.19)
  const [term, setTerm] = useState(30)

  const fixedAmt = total * splitPct / 100
  const varAmt = total - fixedAmt
  const fixedM = monthlyPI(fixedAmt, fixedRate, term)
  const varM = monthlyPI(varAmt, varRate, term)
  const totalM = fixedM + varM

  return (
    <CalcShell intro="Split your loan between fixed and variable rates to balance certainty with flexibility.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Total loan amount"><NumberInput value={total} onChange={setTotal} prefix="$" step={1000} placeholder={700000} /></CalcField>
        <CalcField label="Fixed portion (%)">
          <Slider value={splitPct} onChange={setSplitPct} min={10} max={90} valueLabel={`${splitPct}%`} />
        </CalcField>
        <CalcField label="Fixed rate">
          <Slider value={fixedRate} onChange={setFixedRate} min={3} max={9} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Variable rate">
          <Slider value={varRate} onChange={setVarRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} yrs`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <CalcResult label={`Fixed portion (${fmt(fixedAmt)})`} value={fmt(fixedM)} />
        <CalcResult label={`Variable portion (${fmt(varAmt)})`} value={fmt(varM)} />
        <CalcResult label="Total monthly repayment" value={fmt(totalM)} accent size="lg" />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 12. Property Buying Costs ─────────────── */
export function PropertyCosts() {
  const [price, setPrice] = useState()
  const [state, setState] = useState('NSW')
  const [fhb, setFhb] = useState(false)
  const stamp = calcStampDuty(price, state, fhb)
  const conveyancing = 1800
  const inspections = 800
  const lenderFees = 800
  const movingEtc = 1500
  const total = stamp + conveyancing + inspections + lenderFees + movingEtc + 415

  return (
    <CalcShell intro="A realistic look at the upfront costs of buying a property — beyond just the deposit.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Property price"><NumberInput value={price} onChange={setPrice} prefix="$" step={5000} placeholder={850000} /></CalcField>
        <CalcField label="State / Territory">
          <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </CalcField>
        <CalcField label="First home buyer">
          <label className="inline-flex items-center gap-2 text-[14px] text-ink-700">
            <input type="checkbox" checked={fhb} onChange={(e) => setFhb(e.target.checked)} className="w-4 h-4 accent-primary-600" />
            Apply FHB concession
          </label>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Stamp duty" value={fmt(stamp)} />
        <CalcResult label="Conveyancing / legal" value={fmt(conveyancing)} />
        <CalcResult label="Building & pest inspections" value={fmt(inspections)} />
        <CalcResult label="Lender & application fees" value={fmt(lenderFees)} />
        <CalcResult label="Moving & utilities" value={fmt(movingEtc)} />
        <CalcResult label="Government registration" value={fmt(415)} />
      </div>
      <div className="mt-5">
        <CalcResult label="Estimated total upfront costs" value={fmt(total)} accent size="lg" />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 13. Mortgage Switching ─────────────── */
export function MortgageSwitching() {
  const [balance, setBalance] = useState()
  const [currentRate, setCurrentRate] = useState(6.74)
  const [newRate, setNewRate] = useState(5.99)
  const [term, setTerm] = useState(25)
  const [switchCost, setSwitchCost] = useState()

  const result = useMemo(() => {
    const currentMonthly = monthlyPI(balance, currentRate, term)
    const newMonthly = monthlyPI(balance, newRate, term)
    const monthlySaving = currentMonthly - newMonthly
    const annualSaving = monthlySaving * 12
    const breakEvenMonths = switchCost > 0 ? Math.ceil(switchCost / monthlySaving) : 0
    const totalSaving = annualSaving * term - switchCost
    return { currentMonthly, newMonthly, monthlySaving, annualSaving, breakEvenMonths, totalSaving }
  }, [balance, currentRate, newRate, term, switchCost])

  return (
    <CalcShell intro="See how much you could save by switching to a lower rate lender. Factor in discharge fees, application fees and any break costs before deciding.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current loan balance"><NumberInput value={balance} onChange={setBalance} prefix="$" step={5000} placeholder={500000} /></CalcField>
        <CalcField label="Current interest rate">
          <Slider value={currentRate} onChange={setCurrentRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="New interest rate">
          <Slider value={newRate} onChange={setNewRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Remaining loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Total switching costs (discharge + application fees)" hint="Typical range: $800–$2,000">
          <NumberInput value={switchCost} onChange={setSwitchCost} prefix="$" step={100} placeholder={1500} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Monthly saving" value={fmt(result.monthlySaving)} accent size="lg" />
        <CalcResult label="Annual saving" value={fmt(result.annualSaving)} />
        <CalcResult label="Break-even period" value={result.breakEvenMonths > 0 ? `${result.breakEvenMonths} months` : 'Immediate'} />
        <CalcResult label="Old monthly repayment" value={fmt(result.currentMonthly)} />
        <CalcResult label="New monthly repayment" value={fmt(result.newMonthly)} />
        <CalcResult label="Total saving over loan term" value={fmt(Math.max(0, result.totalSaving))} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 14. Comparison Rate ─────────────── */
export function ComparisonRate() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(5.99)
  const [term, setTerm] = useState(30)
  const [estFee, setEstFee] = useState()
  const [annualFee, setAnnualFee] = useState()

  const result = useMemo(() => {
    const baseMonthly = monthlyPI(amount, rate, term)
    const totalFees = estFee + annualFee * term
    const totalRepaid = baseMonthly * 12 * term + totalFees
    const totalInterest = totalRepaid - amount
    // Find effective rate that produces same total cost (Newton-Raphson approximation)
    let lo = rate, hi = rate + 5
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2
      const m = monthlyPI(amount, mid, term)
      if (m * 12 * term < totalRepaid) lo = mid; else hi = mid
    }
    const compRate = (lo + hi) / 2
    return { baseMonthly, compRate, totalFees, totalInterest, totalRepaid }
  }, [amount, rate, term, estFee, annualFee])

  return (
    <CalcShell intro="The comparison rate combines the interest rate plus most fees into a single percentage, so you can compare loans on a like-for-like basis.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount"><NumberInput value={amount} onChange={setAmount} prefix="$" step={5000} placeholder={500000} /></CalcField>
        <CalcField label="Advertised interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Establishment / application fee"><NumberInput value={estFee} onChange={setEstFee} prefix="$" step={50} placeholder={600} /></CalcField>
        <CalcField label="Annual fee"><NumberInput value={annualFee} onChange={setAnnualFee} prefix="$" step={50} placeholder={395} /></CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Comparison rate" value={`${result.compRate.toFixed(2)}%`} accent size="lg" />
        <CalcResult label="Advertised rate" value={`${rate.toFixed(2)}%`} />
        <CalcResult label="Total fees over loan" value={fmt(result.totalFees)} />
        <CalcResult label="Monthly repayment" value={fmt(result.baseMonthly)} />
        <CalcResult label="Total interest paid" value={fmt(result.totalInterest)} />
        <CalcResult label="Total amount repaid" value={fmt(result.totalRepaid)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 15. How Long to Repay ─────────────── */
export function HowLongToRepay() {
  const [balance, setBalance] = useState()
  const [rate, setRate] = useState(6.19)
  const [monthly, setMonthly] = useState(2800)

  const result = useMemo(() => {
    const r = rate / 100 / 12
    const minPayment = r > 0 ? balance * r : 1
    if (monthly <= minPayment) return { feasible: false, months: 0, years: 0, totalInterest: 0 }
    let bal = balance
    let months = 0
    let totalPaid = 0
    while (bal > 0 && months < 600) {
      const interest = bal * r
      const pay = Math.min(monthly, bal + interest)
      bal = bal + interest - pay
      totalPaid += pay
      months++
    }
    return { feasible: true, months, years: months / 12, totalInterest: totalPaid - balance }
  }, [balance, rate, monthly])

  return (
    <CalcShell intro="Enter your current balance, interest rate, and monthly repayment to see exactly when you'll be mortgage-free.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current loan balance"><NumberInput value={balance} onChange={setBalance} prefix="$" step={5000} placeholder={450000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <div className="md:col-span-2">
          <CalcField label="Monthly repayment">
            <Slider value={monthly} onChange={setMonthly} min={500} max={10000} step={50} formatter={(v) => fmt(v)} />
          </CalcField>
        </div>
      </div>
      {!result.feasible ? (
        <p className="mt-6 text-[14px] text-danger font-medium">
          Your repayment doesn't cover the monthly interest — increase the repayment amount.
        </p>
      ) : (
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <CalcResult label="Time to repay" value={`${fmtNum(result.years)} years`} accent size="lg" />
          <CalcResult label="Months" value={`${result.months} months`} />
          <CalcResult label="Total interest paid" value={fmt(result.totalInterest)} />
        </div>
      )}
    </CalcShell>
  )
}

/* ─────────────── 16. Credit Card Calculator ─────────────── */
export function CreditCard() {
  const [balance, setBalance] = useState()
  const [apr, setApr] = useState(19.99)
  const [monthly, setMonthly] = useState(250)

  const result = useMemo(() => {
    const r = apr / 100 / 12
    const minPay = balance * r
    if (monthly <= minPay) return { feasible: false, months: 0, totalInterest: 0 }
    let bal = balance
    let months = 0
    let totalPaid = 0
    while (bal > 0.01 && months < 600) {
      bal = bal * (1 + r) - monthly
      totalPaid += Math.min(monthly, bal + monthly)
      months++
    }
    totalPaid = months * monthly - Math.max(0, -bal)
    const totalInterest = totalPaid - balance
    return { feasible: true, months, years: months / 12, totalInterest, totalPaid }
  }, [balance, apr, monthly])

  return (
    <CalcShell intro="Find out how long it will take to clear your credit card balance and how much interest you'll pay — then decide whether to increase your repayment.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Credit card balance"><NumberInput value={balance} onChange={setBalance} prefix="$" step={100} placeholder={8000} /></CalcField>
        <CalcField label="Annual interest rate (APR)">
          <Slider value={apr} onChange={setApr} min={8} max={30} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
        <div className="md:col-span-2">
          <CalcField label="Monthly repayment">
            <Slider value={monthly} onChange={setMonthly} min={50} max={2000} step={25} formatter={(v) => fmt(v)} />
          </CalcField>
        </div>
      </div>
      {!result.feasible ? (
        <p className="mt-6 text-[14px] text-danger font-medium">
          Your repayment only covers interest — increase it to make progress on the balance.
        </p>
      ) : (
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <CalcResult label="Time to pay off" value={`${fmtNum(result.years)} years`} accent size="lg" />
          <CalcResult label="Total interest paid" value={fmt(result.totalInterest)} />
          <CalcResult label="Total amount paid" value={fmt(result.totalPaid)} />
        </div>
      )}
    </CalcShell>
  )
}

/* ─────────────── 17. Property Selling Cost ─────────────── */
export function PropertySellingCost() {
  const [price, setPrice] = useState()
  const [commission, setCommission] = useState(2.0)
  const [state, setState] = useState('NSW')

  const result = useMemo(() => {
    const agentFee = price * commission / 100
    const marketing = price > 750000 ? 4500 : price > 500000 ? 3000 : 1800
    const conveyancing = 1500
    const mortgageDischarge = 350
    const capitalGainsTax = 0 // owner-occupier exempt
    const total = agentFee + marketing + conveyancing + mortgageDischarge
    const netProceeds = price - total
    return { agentFee, marketing, conveyancing, mortgageDischarge, total, netProceeds }
  }, [price, commission])

  return (
    <CalcShell intro="Selling a property involves more than just the agent's commission. This calculator shows a realistic breakdown of all costs you should budget for.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Estimated sale price"><NumberInput value={price} onChange={setPrice} prefix="$" step={5000} placeholder={900000} /></CalcField>
        <CalcField label="Agent commission rate" hint="Typical range: 1.5%–3.5% depending on state and agent">
          <Slider value={commission} onChange={setCommission} min={1} max={4} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
        <CalcField label="State / Territory">
          <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Agent commission" value={fmt(result.agentFee)} />
        <CalcResult label="Marketing & advertising" value={fmt(result.marketing)} />
        <CalcResult label="Conveyancing / legal" value={fmt(result.conveyancing)} />
        <CalcResult label="Mortgage discharge fee" value={fmt(result.mortgageDischarge)} />
        <CalcResult label="Total selling costs" value={fmt(result.total)} />
        <CalcResult label="Estimated net proceeds" value={fmt(result.netProceeds)} accent size="lg" />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 18. Lump Sum Repayment ─────────────── */
export function LumpSumRepayment() {
  const [balance, setBalance] = useState()
  const [rate, setRate] = useState(6.19)
  const [term, setTerm] = useState(25)
  const [lumpSum, setLumpSum] = useState(20000)

  const result = useMemo(() => {
    const monthly = monthlyPI(balance, rate, term)
    const r = rate / 100 / 12
    // Without lump sum
    const baseInterest = monthly * 12 * term - balance
    // With lump sum applied now
    const newBal = Math.max(0, balance - lumpSum)
    let bal = newBal
    let months = 0
    let totalPaid = 0
    while (bal > 0 && months < term * 12 + 1) {
      const interest = bal * r
      const pay = Math.min(monthly, bal + interest)
      bal = bal + interest - pay
      totalPaid += pay
      months++
    }
    const newInterest = totalPaid - newBal
    const interestSaved = Math.max(0, baseInterest - newInterest)
    const yearsSaved = term - months / 12
    return { monthly, interestSaved, yearsSaved, newBalance: newBal, months }
  }, [balance, rate, term, lumpSum])

  return (
    <CalcShell intro="Making a one-off extra payment directly reduces your principal. This calculator shows exactly how much time and interest that saves over the life of your loan.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current loan balance"><NumberInput value={balance} onChange={setBalance} prefix="$" step={5000} placeholder={500000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Remaining loan term">
          <Slider value={term} onChange={setTerm} min={5} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Lump sum payment">
          <Slider value={lumpSum} onChange={setLumpSum} min={1000} max={200000} step={1000} formatter={(v) => fmt(v)} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <CalcResult label="Interest saved" value={fmt(result.interestSaved)} accent size="lg" />
        <CalcResult label="Years saved" value={`${fmtNum(result.yearsSaved)} yrs`} />
        <CalcResult label="New loan balance" value={fmt(result.newBalance)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 19. Interest Only Mortgage ─────────────── */
export function InterestOnly() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(6.19)
  const [ioPeriod, setIoPeriod] = useState(5)
  const [totalTerm, setTotalTerm] = useState(30)

  const result = useMemo(() => {
    const ioMonthly = (amount * rate / 100) / 12
    const piTerm = totalTerm - ioPeriod
    const piMonthly = piTerm > 0 ? monthlyPI(amount, rate, piTerm) : 0
    const ioTotal = ioMonthly * 12 * ioPeriod
    const piTotal = piMonthly * 12 * piTerm
    const totalCost = ioTotal + piTotal
    const piOnlyMonthly = monthlyPI(amount, rate, totalTerm)
    const piOnlyTotal = piOnlyMonthly * 12 * totalTerm
    const extraCost = totalCost - piOnlyTotal
    return { ioMonthly, piMonthly, totalCost, extraCost, piOnlyMonthly, piOnlyTotal }
  }, [amount, rate, ioPeriod, totalTerm])

  return (
    <CalcShell intro="Interest-only loans have lower initial repayments but cost more over time because the principal doesn't reduce during the IO period.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount"><NumberInput value={amount} onChange={setAmount} prefix="$" step={5000} placeholder={600000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Interest-only period">
          <Slider value={ioPeriod} onChange={setIoPeriod} min={1} max={10} valueLabel={`${ioPeriod} years`} />
        </CalcField>
        <CalcField label="Total loan term">
          <Slider value={totalTerm} onChange={setTotalTerm} min={10} max={30} valueLabel={`${totalTerm} years`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Interest-only repayment" value={fmt(result.ioMonthly)} accent size="lg" />
        <CalcResult label="P&I repayment after IO period" value={fmt(result.piMonthly)} />
        <CalcResult label="P&I-only monthly (comparison)" value={fmt(result.piOnlyMonthly)} />
        <CalcResult label="Total cost (IO + P&I)" value={fmt(result.totalCost)} />
        <CalcResult label="Total cost (P&I only)" value={fmt(result.piOnlyTotal)} />
        <CalcResult label="Extra cost of IO structure" value={fmt(Math.max(0, result.extraCost))} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 20. Business Loan Repayment ─────────────── */
export function BusinessLoan() {
  const [amount, setAmount] = useState()
  const [rate, setRate] = useState(7.5)
  const [term, setTerm] = useState(5)
  const [freq, setFreq] = useState('monthly')

  const result = useMemo(() => {
    const monthly = monthlyPI(amount, rate, term)
    const factor = { monthly: 1, fortnightly: 12 / 26, weekly: 12 / 52 }[freq]
    const periodic = monthly * factor
    const totalRepaid = monthly * 12 * term
    const totalInterest = totalRepaid - amount
    return { periodic, totalRepaid, totalInterest }
  }, [amount, rate, term, freq])

  return (
    <CalcShell intro="Calculate repayments on a business loan, equipment finance or commercial facility. Rates for business lending are typically higher than residential.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount"><NumberInput value={amount} onChange={setAmount} prefix="$" step={5000} placeholder={250000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={4} max={20} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
        <CalcField label="Loan term">
          <Slider value={term} onChange={setTerm} min={1} max={30} valueLabel={`${term} years`} />
        </CalcField>
        <CalcField label="Repayment frequency">
          <select className="select" value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="weekly">Weekly</option>
          </select>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <CalcResult label={`Repayment (${freq})`} value={fmt(result.periodic)} accent size="lg" />
        <CalcResult label="Total interest paid" value={fmt(result.totalInterest)} />
        <CalcResult label="Total amount repaid" value={fmt(result.totalRepaid)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 21. Income Annualisation ─────────────── */
export function IncomeAnnualisation() {
  const [amount, setAmount] = useState()
  const [freq, setFreq] = useState('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState(38)

  const annual = useMemo(() => {
    switch (freq) {
      case 'hourly':     return amount * hoursPerWeek * 52
      case 'daily':      return amount * 5 * 52
      case 'weekly':     return amount * 52
      case 'fortnightly':return amount * 26
      case 'monthly':    return amount * 12
      default:           return amount
    }
  }, [amount, freq, hoursPerWeek])

  const weekly     = annual / 52
  const fortnightly = annual / 26
  const monthly    = annual / 12

  return (
    <CalcShell intro="Convert casual, part-time or irregular income to an annualised figure. Lenders typically need to see how your income translates to an annual amount for serviceability calculations.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Income frequency">
          <select className="select" value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
          </select>
        </CalcField>
        <CalcField label={freq === 'hourly' ? 'Hourly rate' : 'Income amount'}>
          <NumberInput value={amount} onChange={setAmount} prefix="$" step={freq === 'hourly' ? 0.5 : 50} placeholder={freq === 'hourly' ? 35 : 1500} />
        </CalcField>
        {freq === 'hourly' && (
          <CalcField label="Hours per week">
            <Slider value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={80} valueLabel={`${hoursPerWeek} hrs`} />
          </CalcField>
        )}
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CalcResult label="Annual (gross)" value={fmt(annual)} accent size="lg" />
        <CalcResult label="Monthly" value={fmt(monthly)} />
        <CalcResult label="Fortnightly" value={fmt(fortnightly)} />
        <CalcResult label="Weekly" value={fmt(weekly)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 22. Reverse Mortgage ─────────────── */
export function ReverseMortgage() {
  const [homeValue, setHomeValue] = useState()
  const [loanAmount, setLoanAmount] = useState(150000)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(15)

  const result = useMemo(() => {
    const r = rate / 100
    const amountOwed = loanAmount * Math.pow(1 + r, years)
    const equityRemaining = homeValue - amountOwed
    const lvr = (loanAmount / homeValue) * 100
    const lvrAfter = (amountOwed / homeValue) * 100
    return { amountOwed, equityRemaining, lvr, lvrAfter, negativeEquity: equityRemaining < 0 }
  }, [homeValue, loanAmount, rate, years])

  return (
    <CalcShell intro="A reverse mortgage lets you access home equity without selling. Interest compounds and is added to the loan — the balance grows over time, reducing your remaining equity.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current home value"><NumberInput value={homeValue} onChange={setHomeValue} prefix="$" step={10000} placeholder={900000} /></CalcField>
        <CalcField label="Loan amount drawn">
          <Slider value={loanAmount} onChange={setLoanAmount} min={10000} max={500000} step={5000} formatter={(v) => fmt(v)} />
        </CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={5} max={15} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
        <CalcField label="Years">
          <Slider value={years} onChange={setYears} min={1} max={30} valueLabel={`${years} years`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CalcResult label="Initial LVR" value={`${fmtNum(result.lvr)}%`} />
        <CalcResult label="Amount owed after" value={fmt(result.amountOwed)} />
        <CalcResult label="LVR after" value={`${fmtNum(result.lvrAfter)}%`} />
        <CalcResult label="Equity remaining" value={fmt(result.equityRemaining)} accent size="md" />
      </div>
      {result.negativeEquity && (
        <p className="mt-4 text-[13.5px] text-danger font-medium">
          ⚠ At this rate and term the loan balance exceeds the home value. Most reverse mortgage lenders have a No Negative Equity Guarantee — speak to your broker.
        </p>
      )}
    </CalcShell>
  )
}

/* ─────────────── 23. Introductory Rate Loan ─────────────── */
export function IntroductoryRate() {
  const [amount, setAmount] = useState()
  const [introRate, setIntroRate] = useState(5.49)
  const [standardRate, setStandardRate] = useState(6.74)
  const [introPeriod, setIntroPeriod] = useState(2)
  const [totalTerm, setTotalTerm] = useState(30)

  const result = useMemo(() => {
    const introMonthly = monthlyPI(amount, introRate, totalTerm)
    const balanceAfterIntro = (() => {
      const r = introRate / 100 / 12
      let bal = amount
      for (let i = 0; i < introPeriod * 12; i++) {
        const interest = bal * r
        bal = bal + interest - introMonthly
      }
      return Math.max(0, bal)
    })()
    const remainingTerm = totalTerm - introPeriod
    const standardMonthly = monthlyPI(balanceAfterIntro, standardRate, remainingTerm)
    const totalIntro = introMonthly * 12 * introPeriod
    const totalStandard = standardMonthly * 12 * remainingTerm
    const totalCost = totalIntro + totalStandard
    const comparableMonthly = monthlyPI(amount, standardRate, totalTerm)
    const comparableTotal = comparableMonthly * 12 * totalTerm
    const saving = comparableTotal - totalCost
    return { introMonthly, standardMonthly, totalCost, comparableMonthly, saving, comparableTotal }
  }, [amount, introRate, standardRate, introPeriod, totalTerm])

  return (
    <CalcShell intro="Honeymoon or introductory rates attract borrowers with a low rate upfront, then revert to a higher standard rate. This calculator compares the true total cost.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Loan amount"><NumberInput value={amount} onChange={setAmount} prefix="$" step={5000} placeholder={550000} /></CalcField>
        <CalcField label="Introductory (honeymoon) rate">
          <Slider value={introRate} onChange={setIntroRate} min={2} max={8} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Standard (revert) rate">
          <Slider value={standardRate} onChange={setStandardRate} min={4} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Introductory period">
          <Slider value={introPeriod} onChange={setIntroPeriod} min={1} max={5} valueLabel={`${introPeriod} years`} />
        </CalcField>
        <CalcField label="Total loan term">
          <Slider value={totalTerm} onChange={setTotalTerm} min={10} max={30} valueLabel={`${totalTerm} years`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Intro monthly repayment" value={fmt(result.introMonthly)} accent size="lg" />
        <CalcResult label="Standard monthly repayment" value={fmt(result.standardMonthly)} />
        <CalcResult label="Saving vs standard rate" value={fmt(Math.max(0, result.saving))} />
        <CalcResult label="Total cost (intro loan)" value={fmt(result.totalCost)} />
        <CalcResult label="Total cost (standard rate)" value={fmt(result.comparableTotal)} />
        <CalcResult label="Comparable monthly (no intro)" value={fmt(result.comparableMonthly)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── 24. Compound Interest ─────────────── */
export function CompoundInterest() {
  const [principal, setPrincipal] = useState()
  const [rate, setRate] = useState(5.0)
  const [years, setYears] = useState(10)
  const [monthly, setMonthly] = useState()
  const [compFreq, setCompFreq] = useState('monthly')

  const result = useMemo(() => {
    const n = { annually: 1, quarterly: 4, monthly: 12, daily: 365 }[compFreq]
    const r = rate / 100 / n
    const periods = years * n
    // Lump sum growth
    const lumpFV = principal * Math.pow(1 + r, periods)
    // Contribution FV (monthly converted to per-period)
    const contributionPerPeriod = monthly * 12 / n
    const contribFV = contributionPerPeriod * (Math.pow(1 + r, periods) - 1) / r
    const finalAmount = lumpFV + contribFV
    const totalContributed = principal + monthly * 12 * years
    const totalInterest = finalAmount - totalContributed
    return { finalAmount, totalInterest, totalContributed }
  }, [principal, rate, years, monthly, compFreq])

  return (
    <CalcShell intro="Compound interest means you earn interest on your interest — a powerful effect over time. This calculator shows how your savings or investments grow with regular contributions.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Starting amount (principal)"><NumberInput value={principal} onChange={setPrincipal} prefix="$" step={500} placeholder={20000} /></CalcField>
        <CalcField label="Annual interest rate">
          <Slider value={rate} onChange={setRate} min={0.5} max={15} step={0.1} formatter={(v) => `${v.toFixed(1)}%`} />
        </CalcField>
        <CalcField label="Investment period">
          <Slider value={years} onChange={setYears} min={1} max={40} valueLabel={`${years} years`} />
        </CalcField>
        <CalcField label="Monthly contribution"><NumberInput value={monthly} onChange={setMonthly} prefix="$" step={50} placeholder={300} /></CalcField>
        <CalcField label="Compounding frequency">
          <select className="select" value={compFreq} onChange={(e) => setCompFreq(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <CalcResult label="Final amount" value={fmt(result.finalAmount)} accent size="lg" />
        <CalcResult label="Total interest earned" value={fmt(result.totalInterest)} />
        <CalcResult label="Total contributed" value={fmt(result.totalContributed)} />
      </div>
    </CalcShell>
  )
}

/* ═══════════════════════════════════════════════════════════
   FEATURED CALCULATORS (4 journey-based tools)
   ═══════════════════════════════════════════════════════════ */

/* ─────────────── F1. Buy Your First Home ─────────────── */
export function BuyFirstHome() {
  const [price, setPrice] = useState()
  const [income, setIncome] = useState()
  const [partner, setPartner] = useState()
  const [deposit, setDeposit] = useState()
  const [state, setState] = useState('NSW')
  const [rate, setRate] = useState(6.19)

  const result = useMemo(() => {
    const depositPct = deposit / price * 100
    const loanAmount = price - deposit
    const lmi = depositPct < 20 ? loanAmount * (depositPct < 15 ? 0.034 : 0.018) : 0
    const stamp = calcStampDuty(price, state, true)
    const upfront = stamp + deposit + 1800 + 800 + 415
    const monthly = loanAmount > 0 ? monthlyPI(loanAmount, rate, 30) : 0
    const totalMonthlyIncome = (income + partner) / 12 * 0.85
    const surplus = Math.max(0, totalMonthlyIncome - 3000)
    const r = (rate + 3) / 100 / 12
    const n = 30 * 12
    const maxBorrow = r === 0 ? surplus * n : surplus * (1 - Math.pow(1 + r, -n)) / r
    return { depositPct, loanAmount, lmi, stamp, upfront, monthly, maxBorrow, canAfford: maxBorrow >= loanAmount }
  }, [price, income, partner, deposit, state, rate])

  return (
    <CalcShell intro="An all-in-one calculator designed for first home buyers. See your estimated borrowing power, how much stamp duty you'll pay (with FHB concession), upfront costs, and monthly repayments — all in one place.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Target property price"><NumberInput value={price} onChange={setPrice} prefix="$" step={5000} placeholder={700000} /></CalcField>
        <CalcField label="State / Territory">
          <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </CalcField>
        <CalcField label="Your annual income (gross)"><NumberInput value={income} onChange={setIncome} prefix="$" step={1000} placeholder={95000} /></CalcField>
        <CalcField label="Partner's annual income (optional)"><NumberInput value={partner} onChange={setPartner} prefix="$" step={1000} placeholder={0} /></CalcField>
        <CalcField label="Deposit saved"><NumberInput value={deposit} onChange={setDeposit} prefix="$" step={1000} placeholder={70000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Estimated borrowing power" value={fmt(result.maxBorrow)} accent size="lg" />
        <CalcResult label="Deposit %" value={`${fmtNum(result.depositPct)}%`} />
        <CalcResult label="Stamp duty (FHB concession)" value={fmt(result.stamp)} />
        <CalcResult label="LMI (if deposit < 20%)" value={result.lmi > 0 ? fmt(result.lmi) : 'Not required'} />
        <CalcResult label="Monthly repayment" value={fmt(result.monthly)} />
        <CalcResult label="Estimated total upfront cost" value={fmt(result.upfront)} />
      </div>
      {!result.canAfford && result.loanAmount > 0 && (
        <p className="mt-4 text-[13.5px] text-warning font-medium">
          ⚠ Your estimated borrowing power may be below the loan needed. Consider a larger deposit, lower purchase price — or speak to a broker for options.
        </p>
      )}
    </CalcShell>
  )
}

/* ─────────────── F2. Refinance and Save ─────────────── */
export function RefinanceSave() {
  const [balance, setBalance] = useState()
  const [currentRate, setCurrentRate] = useState(6.74)
  const [newRate, setNewRate] = useState(5.99)
  const [remainingYears, setRemainingYears] = useState(25)

  const result = useMemo(() => {
    const currentMonthly = monthlyPI(balance, currentRate, remainingYears)
    const newMonthly = monthlyPI(balance, newRate, remainingYears)
    const monthly = Math.max(0, currentMonthly - newMonthly)
    const annual = monthly * 12
    const fiveYear = monthly * 60
    const lifetime = monthly * remainingYears * 12
    return { currentMonthly, newMonthly, monthly, annual, fiveYear, lifetime }
  }, [balance, currentRate, newRate, remainingYears])

  return (
    <CalcShell intro="Refinancing to a lower rate can save you thousands over the life of your loan. This calculator shows your potential savings before factoring in any switching costs — speak to a broker to get the full picture.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Current loan balance"><NumberInput value={balance} onChange={setBalance} prefix="$" step={5000} placeholder={500000} /></CalcField>
        <CalcField label="Current interest rate">
          <Slider value={currentRate} onChange={setCurrentRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="New interest rate">
          <Slider value={newRate} onChange={setNewRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Remaining loan term">
          <Slider value={remainingYears} onChange={setRemainingYears} min={5} max={30} valueLabel={`${remainingYears} years`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Monthly saving" value={fmt(result.monthly)} accent size="lg" />
        <CalcResult label="Annual saving" value={fmt(result.annual)} />
        <CalcResult label="5-year saving" value={fmt(result.fiveYear)} />
        <CalcResult label="Current monthly repayment" value={fmt(result.currentMonthly)} />
        <CalcResult label="New monthly repayment" value={fmt(result.newMonthly)} />
        <CalcResult label="Lifetime saving (before costs)" value={fmt(result.lifetime)} />
      </div>
    </CalcShell>
  )
}

/* ─────────────── F3. Property Investment Planning ─────────────── */
export function PropertyInvestment() {
  const [propertyValue, setPropertyValue] = useState()
  const [weeklyRent, setWeeklyRent] = useState()
  const [loanAmount, setLoanAmount] = useState()
  const [rate, setRate] = useState(6.49)
  const [isIO, setIsIO] = useState(true)
  const [expensesPct, setExpensesPct] = useState(25)

  const result = useMemo(() => {
    const annualRent = weeklyRent * 52
    const grossYield = propertyValue > 0 ? annualRent / propertyValue * 100 : 0
    const annualExpenses = annualRent * expensesPct / 100
    const netAnnualRent = annualRent - annualExpenses
    const netYield = propertyValue > 0 ? netAnnualRent / propertyValue * 100 : 0
    const monthly = isIO ? (loanAmount * rate / 100) / 12 : monthlyPI(loanAmount, rate, 30)
    const annualLoanCost = monthly * 12
    const cashflow = netAnnualRent - annualLoanCost
    return { grossYield, netYield, annualRent, netAnnualRent, monthly, cashflow, positive: cashflow >= 0 }
  }, [propertyValue, weeklyRent, loanAmount, rate, isIO, expensesPct])

  return (
    <CalcShell intro="Understand the rental yield and cash flow of an investment property before you commit. Factors in realistic ongoing expenses to show whether your property is positively or negatively geared.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Property value"><NumberInput value={propertyValue} onChange={setPropertyValue} prefix="$" step={10000} placeholder={750000} /></CalcField>
        <CalcField label="Weekly rental income"><NumberInput value={weeklyRent} onChange={setWeeklyRent} prefix="$" step={25} placeholder={650} /></CalcField>
        <CalcField label="Loan amount"><NumberInput value={loanAmount} onChange={setLoanAmount} prefix="$" step={5000} placeholder={600000} /></CalcField>
        <CalcField label="Interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={12} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
        <CalcField label="Repayment type">
          <select className="select" value={isIO ? 'IO' : 'PI'} onChange={(e) => setIsIO(e.target.value === 'IO')}>
            <option value="IO">Interest Only</option>
            <option value="PI">Principal & Interest</option>
          </select>
        </CalcField>
        <CalcField label="Ongoing expenses (% of rent)" hint="Property manager, council rates, insurance, repairs — typically 20–30%">
          <Slider value={expensesPct} onChange={setExpensesPct} min={10} max={50} valueLabel={`${expensesPct}%`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CalcResult label="Annual cash flow" value={`${result.cashflow >= 0 ? '+' : ''}${fmt(result.cashflow)}`} accent size="lg" />
        <CalcResult label="Gross rental yield" value={`${fmtNum(result.grossYield)}%`} />
        <CalcResult label="Net rental yield" value={`${fmtNum(result.netYield)}%`} />
        <CalcResult label="Gross annual rent" value={fmt(result.annualRent)} />
        <CalcResult label="Net annual rent (after expenses)" value={fmt(result.netAnnualRent)} />
        <CalcResult label="Monthly loan repayment" value={fmt(result.monthly)} />
      </div>
      <p className="mt-4 text-[13.5px] font-semibold" style={{ color: result.positive ? 'var(--color-success)' : 'var(--color-warning)' }}>
        {result.positive
          ? '✓ Positively geared — rental income exceeds loan costs and expenses.'
          : '⚠ Negatively geared — shortfall between rental income and total costs.'}
      </p>
    </CalcShell>
  )
}

/* ─────────────── F4. How Much Can You Borrow? ─────────────── */
export function HowMuchBorrow() {
  const [income, setIncome] = useState()
  const [partner, setPartner] = useState()
  const [expenses, setExpenses] = useState()
  const [debts, setDebts] = useState()
  const [deps, setDeps] = useState()
  const [rate, setRate] = useState(6.19)

  const result = useMemo(() => {
    const totalIncome = (income + partner) / 12 * 0.85
    const householdAdj = expenses + deps * 350
    const surplus = Math.max(0, totalIncome - householdAdj - debts)
    const n = 30 * 12
    // Conservative: 3% stress buffer (standard lender requirement)
    const r1 = (rate + 3) / 100 / 12
    const conservative = r1 === 0 ? surplus * n : surplus * (1 - Math.pow(1 + r1, -n)) / r1
    // Moderate: 2% stress buffer
    const r2 = (rate + 2) / 100 / 12
    const moderate = r2 === 0 ? surplus * n : surplus * (1 - Math.pow(1 + r2, -n)) / r2
    return {
      conservative: Math.max(0, conservative),
      moderate: Math.max(0, moderate),
      propConservative: Math.max(0, conservative) / 0.8,
      propModerate: Math.max(0, moderate) / 0.8,
    }
  }, [income, partner, expenses, debts, deps, rate])

  return (
    <CalcShell intro="A plain-English answer to one of the most common questions we get. Enter your income and expenses to see your estimated borrowing range — calculated using the same serviceability principles Australian lenders apply.">
      <div className="grid gap-5 md:grid-cols-2">
        <CalcField label="Your annual income (gross)" hint="Salary before tax">
          <NumberInput value={income} onChange={setIncome} prefix="$" step={1000} placeholder={100000} />
        </CalcField>
        <CalcField label="Partner's annual income (optional)">
          <NumberInput value={partner} onChange={setPartner} prefix="$" step={1000} placeholder={0} />
        </CalcField>
        <CalcField label="Monthly living expenses" hint="Food, utilities, transport, insurance">
          <NumberInput value={expenses} onChange={setExpenses} prefix="$" step={100} placeholder={3000} />
        </CalcField>
        <CalcField label="Existing monthly debt repayments" hint="Car loans, credit cards, personal loans">
          <NumberInput value={debts} onChange={setDebts} prefix="$" step={50} placeholder={0} />
        </CalcField>
        <CalcField label="Number of dependants">
          <NumberInput value={deps} onChange={setDeps} step={1} min={0} placeholder={0} />
        </CalcField>
        <CalcField label="Current interest rate">
          <Slider value={rate} onChange={setRate} min={3} max={10} step={0.05} formatter={(v) => `${v.toFixed(2)}%`} />
        </CalcField>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <CalcResult label="Conservative estimate (3% buffer)" value={fmt(result.conservative)} />
        <CalcResult label="Moderate estimate (2% buffer)" value={fmt(result.moderate)} accent size="lg" />
        <CalcResult label="Property price at 20% deposit (conservative)" value={fmt(result.propConservative)} />
        <CalcResult label="Property price at 20% deposit (moderate)" value={fmt(result.propModerate)} />
      </div>
      <p className="mt-4 text-[13px] text-ink-500 leading-relaxed">
        Most lenders apply at least a 3% serviceability buffer. Speak to a broker to get a more precise assessment based on your full financial picture.
      </p>
    </CalcShell>
  )
}
