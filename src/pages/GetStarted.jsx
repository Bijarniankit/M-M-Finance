import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import { siteInfo, team } from '../data/site.js'

const GOALS = [
  'Buying my first home',
  'Buying another owner-occupied home',
  'Refinancing my current loan',
  'Investment property purchase',
  'Building or major renovation',
  'Commercial / SMSF lending',
  'Just exploring options',
]

const STEP_LABELS = [
  'What are you trying to do?',
  'Rough numbers',
  'How can we reach you?',
]

const NOTE_CHIPS = [
  'Self-employed',
  'First home buyer',
  'Adverse credit',
  'Recent role change',
  'Visa holder',
  'Prior knock-back',
]

const formatCurrency = (raw) => {
  const digits = String(raw).replace(/\D/g, '')
  if (!digits) return ''
  return '$' + Number(digits).toLocaleString('en-AU')
}
const parseCurrency = (raw) => Number(String(raw).replace(/\D/g, '')) || 0

const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
const validPhone = (v) => {
  const d = v.replace(/\D/g, '')
  return d.length >= 9 && d.length <= 10
}
const formatAUPhone = (raw) => {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 4) return d
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
}

export default function GetStarted() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [touched, setTouched] = useState({})
  const formRef = useRef(null)

  const [form, setForm] = useState({
    goal: '',
    timeframe: '',
    income: '',
    deposit: '',
    name: '',
    email: '',
    phone: '',
    state: 'NSW',
    notes: '',
    consent: false,
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const markTouched = (k) => setTouched((t) => ({ ...t, [k]: true }))

  const stepErrors = useMemo(() => {
    const e = {}
    if (step === 1) {
      if (!form.goal) e.goal = 'Pick the closest match.'
      if (!form.timeframe) e.timeframe = 'Choose a timeframe.'
    }
    if (step === 2) {
      if (parseCurrency(form.income) <= 0) e.income = 'Enter a rough annual figure.'
      if (parseCurrency(form.deposit) <= 0) e.deposit = 'Enter your approx. deposit or equity.'
    }
    if (step === 3) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your full name.'
      if (!validPhone(form.phone)) e.phone = 'Enter a valid AU phone number.'
      if (!validEmail(form.email)) e.email = 'Enter a valid email address.'
      if (!form.consent) e.consent = 'Please agree before submitting.'
    }
    return e
  }, [step, form])

  const canAdvance = Object.keys(stepErrors).length === 0

  const next = () => {
    if (!canAdvance) {
      const allKeys = Object.keys(stepErrors)
      setTouched((t) => ({ ...t, ...Object.fromEntries(allKeys.map((k) => [k, true])) }))
      return
    }
    setStep((s) => Math.min(3, s + 1))
  }
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && step < 3) {
      e.preventDefault()
      next()
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!canAdvance) {
      setTouched((t) => ({ ...t, ...Object.fromEntries(Object.keys(stepErrors).map((k) => [k, true])) }))
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'getstarted',
          goal: form.goal,
          timeframe: form.timeframe,
          income: form.income,
          deposit: form.deposit,
          name: form.name,
          email: form.email,
          phone: form.phone,
          state: form.state,
          notes: form.notes,
        }),
      })
      if (!res.ok) throw new Error('Failed to send enquiry')
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setSubmitError("Something went wrong. Please try again or call us on " + siteInfo.phone + ".")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <PageWrapper>
        <PageHeader
          eyebrow="Thank you"
          title="We've got it — and we're on it"
          subtitle="Your enquiry has been received. A senior broker will call you within one business day to schedule your free 20-minute discovery call."
          breadcrumbs={[{ label: 'Get Started' }]}
        />
        <Section tone="default">
          <div className="max-w-xl mx-auto card p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-50 text-primary-700 flex items-center justify-center">
              <CheckCircle2 size={26} />
            </div>
            <h2 className="mt-4">You're all set, {form.name?.split(' ')[0] || 'there'}</h2>
            <p className="mt-3 text-[15px] text-ink-600 leading-relaxed">
              Check your inbox for a confirmation email. If you'd rather not wait, call us now or explore our calculators.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={siteInfo.phoneHref} className="btn btn-md btn-primary">
                <Phone size={15} /> Call {siteInfo.phone}
              </a>
              <Link to="/calculators" className="btn btn-md btn-outline">
                Try our calculators
              </Link>
            </div>
          </div>
        </Section>
      </PageWrapper>
    )
  }

  const namedBroker = team[0]

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Get Started"
        title="A simple, free first step"
        subtitle="Three short questions — takes about 60 seconds. We'll then book a free 20-minute call at a time that suits you."
        breadcrumbs={[{ label: 'Get Started' }]}
      />

      <Section tone="default">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
          <form
            ref={formRef}
            onSubmit={submit}
            onKeyDown={handleFormKeyDown}
            className="card p-6 sm:p-8"
            noValidate
          >
            {/* Progress */}
            <div className="mb-6">
              <div
                className="flex items-center gap-2"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
                aria-label={`Step ${step} of 3`}
              >
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex-1 h-1.5 rounded-full overflow-hidden bg-ink-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        n <= step ? 'bg-primary-700' : ''
                      }`}
                      style={{ width: n <= step ? '100%' : '0%' }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <div className="text-[12.5px] font-semibold tracking-wide uppercase text-primary-700">
                  Step {step} of 3
                </div>
                <div className="text-[12.5px] text-ink-500">{STEP_LABELS[step - 1]}</div>
              </div>
            </div>

            {step === 1 && (
              <Reveal>
                <h3 className="text-[20px] font-bold text-ink-900">What are you trying to do?</h3>
                <p className="mt-1 text-[14px] text-ink-600">
                  Pick the closest match — we'll dig into details on the call.
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {GOALS.map((g) => {
                    const selected = form.goal === g
                    return (
                      <label
                        key={g}
                        className={`card p-4 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 ${
                          selected ? 'border-primary-500 bg-primary-50' : 'hover:border-primary-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={g}
                          checked={selected}
                          onChange={(e) => {
                            update('goal', e.target.value)
                            markTouched('goal')
                          }}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[14.5px] font-semibold text-ink-800">{g}</span>
                          {selected && <CheckCircle2 size={18} className="text-primary-700 shrink-0" />}
                        </div>
                      </label>
                    )
                  })}
                </div>
                {touched.goal && stepErrors.goal && (
                  <FieldError>{stepErrors.goal}</FieldError>
                )}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gs-goal-timeframe" className="label">
                      Ideal timeframe
                    </label>
                    <select
                      id="gs-goal-timeframe"
                      className="select"
                      value={form.timeframe}
                      onChange={(e) => update('timeframe', e.target.value)}
                      onBlur={() => markTouched('timeframe')}
                      aria-invalid={touched.timeframe && !!stepErrors.timeframe}
                    >
                      <option value="">Select…</option>
                      <option>ASAP — already looking</option>
                      <option>Next 1–3 months</option>
                      <option>3–6 months</option>
                      <option>6–12 months</option>
                      <option>Just exploring</option>
                    </select>
                    {touched.timeframe && stepErrors.timeframe && (
                      <FieldError>{stepErrors.timeframe}</FieldError>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gs-goal-state" className="label">
                      State / Territory
                    </label>
                    <select
                      id="gs-goal-state"
                      className="select"
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                    >
                      {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </Reveal>
            )}

            {step === 2 && (
              <Reveal>
                <h3 className="text-[20px] font-bold text-ink-900">Rough numbers</h3>
                <p className="mt-1 text-[14px] text-ink-600">
                  Best estimate is fine — we'll firm it up on the call.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gs-income" className="label">
                      Annual household income
                    </label>
                    <input
                      id="gs-income"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      className="input"
                      placeholder="$120,000"
                      value={form.income}
                      onChange={(e) => update('income', formatCurrency(e.target.value))}
                      onBlur={() => markTouched('income')}
                      aria-invalid={touched.income && !!stepErrors.income}
                    />
                    {touched.income && stepErrors.income && (
                      <FieldError>{stepErrors.income}</FieldError>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gs-deposit" className="label">
                      Approx. deposit / equity
                    </label>
                    <input
                      id="gs-deposit"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      className="input"
                      placeholder="$80,000"
                      value={form.deposit}
                      onChange={(e) => update('deposit', formatCurrency(e.target.value))}
                      onBlur={() => markTouched('deposit')}
                      aria-invalid={touched.deposit && !!stepErrors.deposit}
                    />
                    {touched.deposit && stepErrors.deposit && (
                      <FieldError>{stepErrors.deposit}</FieldError>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="label">Anything we should know? (optional)</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {NOTE_CHIPS.map((chip) => {
                      const active = form.notes.includes(chip)
                      return (
                        <button
                          type="button"
                          key={chip}
                          onClick={() => {
                            const next = active
                              ? form.notes
                                  .replace(new RegExp(`(^|, )${chip}(, |$)`), (m, p1, p2) =>
                                    p1 && p2 ? ', ' : ''
                                  )
                                  .replace(/^,\s*|,\s*$/g, '')
                              : form.notes
                                ? `${form.notes}, ${chip}`
                                : chip
                            update('notes', next)
                          }}
                          className={`px-3 py-1.5 rounded-full text-[12.5px] font-semibold border transition-colors ${
                            active
                              ? 'bg-primary-700 text-white border-primary-700'
                              : 'bg-surface text-ink-700 border-ink-200 hover:border-primary-300 hover:text-primary-700'
                          }`}
                          aria-pressed={active}
                        >
                          {chip}
                        </button>
                      )
                    })}
                  </div>
                  <textarea
                    id="gs-notes"
                    className="textarea"
                    rows={3}
                    maxLength={500}
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Tap a tag above or type anything that helps us prepare."
                  />
                  <div className="mt-1 text-right text-[12px] text-ink-400">
                    {form.notes.length}/500
                  </div>
                </div>
              </Reveal>
            )}

            {step === 3 && (
              <Reveal>
                <h3 className="text-[20px] font-bold text-ink-900">How can we reach you?</h3>
                <p className="mt-1 text-[14px] text-ink-600">
                  A senior broker will call within one business day to book your free 20-minute consultation.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gs-name" className="label">
                      Full name
                    </label>
                    <input
                      id="gs-name"
                      type="text"
                      autoComplete="name"
                      className="input"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      onBlur={() => markTouched('name')}
                      aria-invalid={touched.name && !!stepErrors.name}
                    />
                    {touched.name && stepErrors.name && <FieldError>{stepErrors.name}</FieldError>}
                  </div>
                  <div>
                    <label htmlFor="gs-phone" className="label">
                      Phone
                    </label>
                    <input
                      id="gs-phone"
                      type="tel"
                      autoComplete="tel-national"
                      className="input"
                      placeholder="04xx xxx xxx"
                      value={form.phone}
                      onChange={(e) => update('phone', formatAUPhone(e.target.value))}
                      onBlur={() => markTouched('phone')}
                      aria-invalid={touched.phone && !!stepErrors.phone}
                    />
                    {touched.phone && stepErrors.phone && <FieldError>{stepErrors.phone}</FieldError>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="gs-email" className="label">
                      Email
                    </label>
                    <input
                      id="gs-email"
                      type="email"
                      autoComplete="email"
                      className="input"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      onBlur={() => markTouched('email')}
                      aria-invalid={touched.email && !!stepErrors.email}
                    />
                    {touched.email && stepErrors.email && <FieldError>{stepErrors.email}</FieldError>}
                  </div>
                </div>
                <label
                  htmlFor="gs-consent"
                  className="mt-5 flex items-start gap-2.5 text-[13.5px] text-ink-700 cursor-pointer"
                >
                  <input
                    id="gs-consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => {
                      update('consent', e.target.checked)
                      markTouched('consent')
                    }}
                    className="mt-0.5 w-4 h-4 accent-primary-600"
                    aria-invalid={touched.consent && !!stepErrors.consent}
                  />
                  <span>
                    I agree to be contacted by M&amp;M Finance regarding my enquiry. I understand my information
                    will be handled in line with the{' '}
                    <Link to="/privacy" className="link">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {touched.consent && stepErrors.consent && (
                  <FieldError>{stepErrors.consent}</FieldError>
                )}
                {submitError && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-md bg-red-50 border border-red-200 p-3 text-[13.5px] text-red-800"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}
              </Reveal>
            )}

            {/* Step nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button type="button" onClick={prev} className="btn btn-md btn-ghost">
                  ← Back
                </button>
              ) : (
                <span aria-hidden="true" />
              )}
              {step < 3 ? (
                <button type="button" onClick={next} className="btn btn-md btn-primary">
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button type="submit" disabled={submitting} className="btn btn-md btn-primary">
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      Submit enquiry <ArrowRight size={15} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <aside className="flex flex-col gap-4 lg:h-full">
            {/* Broker + response time */}
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-700 text-white font-bold flex items-center justify-center text-[15px] shrink-0">
                  {namedBroker.initials}
                </div>
                <div>
                  <div className="font-semibold text-[14.5px] text-ink-900">{namedBroker.name}</div>
                  <div className="text-[12.5px] text-ink-500">{namedBroker.role}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary-50 p-3 text-center">
                  <div className="text-[18px] font-bold text-primary-800">47 min</div>
                  <div className="text-[11.5px] text-ink-600 mt-0.5">Avg. response</div>
                </div>
                <div className="rounded-lg bg-primary-50 p-3 text-center">
                  <div className="text-[18px] font-bold text-primary-800">1,500+</div>
                  <div className="text-[11.5px] text-ink-600 mt-0.5">Clients helped</div>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="card p-6">
              <h3 className="text-[16px] font-bold text-ink-900">What happens next</h3>
              <ol className="mt-4 space-y-4">
                {[
                  { i: <Mail size={16} />, t: 'Confirmation email', d: 'Within minutes — confirming your enquiry and what to expect.' },
                  { i: <Phone size={16} />, t: 'A personal call', d: 'Your broker calls within one business day.' },
                  { i: <Clock size={16} />, t: '20-minute discovery', d: 'No pressure. We listen, you ask anything.' },
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      {s.i}
                    </span>
                    <div>
                      <div className="font-semibold text-[14px] text-ink-900">{s.t}</div>
                      <p className="text-[13px] text-ink-600 mt-0.5 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Privacy + phone */}
            <div className="card p-6 bg-surface-muted border-primary-100 flex flex-col lg:flex-1">
              <div className="flex items-center gap-2 text-primary-700">
                <ShieldCheck size={18} />
                <h4 className="text-[15px] font-bold m-0">Your info is safe</h4>
              </div>
              <p className="mt-2 text-[13px] text-ink-600 leading-relaxed">
                Bank-grade encryption. We never sell or share your data. Read our{' '}
                <Link to="/privacy" className="link">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="divider my-4" />
              <div className="mt-auto">
                <div className="text-[11.5px] uppercase tracking-wide font-semibold text-ink-500">
                  Prefer to talk?
                </div>
                <a href={siteInfo.phoneHref} className="mt-1 block text-[20px] font-bold text-primary-700">
                  {siteInfo.phone}
                </a>
                <div className="text-[12px] text-ink-500 mt-0.5">Mon–Fri 9–6, Sat 10–2</div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </PageWrapper>
  )
}

function FieldError({ children }) {
  return (
    <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-red-700">
      <AlertCircle size={13} />
      <span>{children}</span>
    </div>
  )
}
