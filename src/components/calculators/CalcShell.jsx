import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Info } from 'lucide-react'
import { siteInfo } from '../../data/site.js'

export default function CalcShell({ children, intro }) {
  return (
    <div className="container-x py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          {intro && (
            <div className="card p-5 mb-6 bg-surface-muted border-primary-100 flex items-start gap-3">
              <Info size={18} className="mt-0.5 text-primary-700 shrink-0" />
              <p className="text-[14px] text-ink-700 leading-relaxed m-0">{intro}</p>
            </div>
          )}
          <div className="card p-5 sm:p-7 md:p-8">{children}</div>
          <p className="mt-4 text-[12.5px] text-ink-500 leading-relaxed">
            <strong className="text-ink-700">Disclaimer:</strong> Results are estimates only and based on the inputs you provide. Actual figures depend on the lender's policies, your credit profile and prevailing rates. Always confirm with a licensed broker before making financial decisions.
          </p>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-28 space-y-4">
          <div className="card p-5">
            <h3 className="text-[18px] font-bold text-ink-900">Talk it through</h3>
            <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">
              Numbers are a starting point. Book a free 20-minute call and we'll turn them into a real strategy.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/get-started" className="btn btn-md btn-primary w-full">
                Get started <ArrowRight size={15} />
              </Link>
              <a href={siteInfo.phoneHref} className="btn btn-md btn-outline w-full">
                <Phone size={15} /> {siteInfo.phone}
              </a>
            </div>
          </div>
          <div className="card p-5">
            <h4 className="text-[14px] font-semibold text-ink-900 uppercase tracking-wide">Why use these calculators?</h4>
            <ul className="mt-3 check-list">
              <li>Built around real Australian lender criteria</li>
              <li>Updated for 2026 rate environment</li>
              <li>No data is stored or sent anywhere</li>
              <li>Free to use — no sign up required</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function CalcField({ label, hint, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {hint && <p className="help">{hint}</p>}
    </div>
  )
}

export function CalcResult({ label, value, accent = false, size = 'md' }) {
  const sizes = {
    sm: 'text-[18px]',
    md: 'text-[22px] md:text-[26px]',
    lg: 'text-[28px] md:text-[34px]',
  }
  return (
    <div
      className={`rounded-xl p-4 sm:p-5 border ${
        accent
          ? 'bg-primary-50 border-primary-200'
          : 'bg-surface-alt border-ink-200'
      }`}
    >
      <div className="text-[12.5px] uppercase tracking-wide font-semibold text-ink-500">{label}</div>
      <div className={`mt-1.5 font-bold tracking-tight ${sizes[size]} ${accent ? 'text-primary-800' : 'text-ink-900'}`}>
        {value}
      </div>
    </div>
  )
}

export function fmt(n) {
  if (!isFinite(n)) return '$0'
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n)
}
export function fmtNum(n) {
  if (!isFinite(n)) return '0'
  return new Intl.NumberFormat('en-AU', { maximumFractionDigits: 1 }).format(n)
}
