import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Star, Phone, Sparkles, Shield, ChevronRight, Clock, Key } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Float from '../components/ui/Float'
import FloatingBlob from '../components/ui/FloatingBlob'
import AnimatedDivider from '../components/ui/AnimatedDivider'
import Icon from '../components/ui/Icon'
import { homeLoanHelpTopics, calculators, testimonials, lenders, processSteps, values, siteInfo } from '../data/site.js'
import CTASection from '../components/ui/CTASection'
import CountUp from '../components/ui/CountUp'

const QUICK_STATS = [
  { value: 1500, suffix: '+',              label: 'Happy clients' },
  { value: 850,  prefix: '$', suffix: 'M+', label: 'Loans settled' },
  { value: 40,   suffix: '+',              label: 'Lenders on panel' },
  { value: 15,   suffix: '+',              label: 'Years experience' },
]

const HERO_MINI_STATS = [
  { value: '1,500+', label: 'Happy clients' },
  { value: '$850M+', label: 'Loans settled' },
  { value: '40+',    label: 'Lenders' },
  { value: 'Free',   label: 'Our service' },
]

export default function Home() {
  return (
    <PageWrapper>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">

        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-0 right-0 h-full w-[52%] bg-linear-to-l from-primary-50 via-primary-50/50 to-transparent" />
          <FloatingBlob className="absolute -top-20 right-[20%] w-80 h-80 rounded-full bg-primary-100 opacity-35 blur-3xl" duration={8} range={22} />
          <FloatingBlob className="absolute bottom-0 right-[4%] w-56 h-56 rounded-full bg-accent-100 opacity-25 blur-3xl" duration={6.5} delay={0.6} range={16} />
        </div>

        <div className="container-x py-12 md:py-20 lg:py-28 relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* LEFT — content unchanged */}
            <div>
              <Reveal>
                <span className="eyebrow"><Sparkles size={12} /> Boutique mortgage brokers</span>
              </Reveal>

              <Reveal delay={0.05} scale>
                <h1 className="mt-4 text-ink-900">
                  The right home loan,<br className="hidden sm:block" />
                  <span className="text-primary-700"> without the bank-run-around.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 text-[16px] md:text-[18px] text-ink-600 leading-relaxed max-w-xl">
                  We compare 40+ Australian lenders to find a loan that fits your real life — not a sales target. Free advice, fewer surprises, and a broker who answers the phone.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link to="/get-started" className="btn btn-lg btn-primary">
                    Start your free assessment <ArrowRight size={16} />
                  </Link>
                  <a href={siteInfo.phoneHref} className="btn btn-lg btn-outline">
                    <Phone size={16} /> {siteInfo.phone}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {['No fee for residential loans', 'MFAA & AFCA member', 'Reply within 1 business day'].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13.5px] text-ink-700">
                      <CheckCircle2 size={16} className="text-primary-700 mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* RIGHT — social proof card */}
            <Reveal delay={0.12}>
              {/* pb gives room for the floating bottom badge on sm/md viewports */}
              <Float className="relative pb-7 sm:pb-8 lg:pb-0" y={9} duration={6}>

                {/* Main card */}
                <div className="bg-white rounded-2xl border border-ink-200 shadow-xl overflow-hidden">

                  {/* Rainbow-ish accent stripe */}
                  <div className="h-1.5 bg-linear-to-r from-primary-700 via-primary-400 to-accent-400" />

                  <div className="p-5 md:p-6">

                    {/* Stars row */}
                    <div className="flex items-center gap-1 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} className="text-warning" fill="currentColor" />
                      ))}
                      <span className="ml-1.5 text-[13px] font-semibold text-ink-600">4.9 / 5</span>
                      <span className="text-[12px] text-ink-400 ml-1">· 200+ reviews</span>
                    </div>

                    {/* Testimonial quote */}
                    <blockquote className="text-[14.5px] leading-relaxed text-ink-700">
                      "M&amp;M found us a 5.69% rate when our bank quoted 6.4% — saving us over $8,000 in year one. They walked us through every single step."
                    </blockquote>

                    {/* Author row */}
                    <div className="mt-4 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary-700 text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                        SM
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-ink-900">Sarah &amp; James Mitchell</div>
                        <div className="text-[11.5px] text-ink-500">First Home Buyers — Parramatta</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-ink-100" />

                    {/* 2×2 mini stat tiles */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {HERO_MINI_STATS.map((s) => (
                        <div key={s.label} className="bg-surface-muted rounded-xl px-3.5 py-2.5">
                          <div className="text-[16px] font-bold text-primary-700 leading-none">{s.value}</div>
                          <div className="text-[11px] text-ink-500 mt-1 font-medium">{s.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Floating — MFAA badge (md+) */}
                <div className="hidden md:flex absolute -top-3.5 -right-3 bg-white rounded-xl border border-ink-200 shadow-md px-3 py-2 items-center gap-1.5">
                  <Shield size={13} className="text-primary-700 shrink-0" />
                  <span className="text-[11.5px] font-semibold text-ink-800">MFAA Accredited</span>
                </div>

                {/* Floating — free service badge (sm+) */}
                <div className="hidden sm:flex absolute -bottom-4 -left-3 bg-white rounded-xl border border-ink-200 shadow-md px-3 py-2.5 items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                    <Icon name="BadgeCheck" size={14} />
                  </div>
                  <div>
                    <div className="text-[11.5px] font-bold text-ink-900">No cost to you</div>
                    <div className="text-[10.5px] text-ink-500">Lender-paid service</div>
                  </div>
                </div>

              </Float>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <section className="bg-surface-muted border-y border-ink-200">
        <div className="container-x py-5 md:py-7">
          <p className="text-center text-[11.5px] font-semibold uppercase tracking-wider text-ink-500 mb-4">
            Accredited with 40+ Australian lenders, including
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
            {lenders.slice(0, 8).map((l) => (
              <span key={l} className="text-[13px] md:text-[14px] font-semibold text-ink-500">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — teal band ─────────────────────────────────── */}
      <section className="bg-primary-700">
        <div className="container-x py-9 md:py-12">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {QUICK_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="text-center">
                  <div className="text-[26px] sm:text-[30px] md:text-[34px] font-bold text-white leading-none tracking-tight">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[12px] md:text-[13.5px] text-white/70 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOME LOANS ────────────────────────────────────────── */}
      <Section tone="default">
        <AnimatedDivider className="mb-10 md:mb-14" />
        <SectionHeading
          eyebrow="How we can help"
          title="Home loans for every stage"
          subtitle="From your first home to your next investment, we structure home loans around your goals — not the lender's."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeLoanHelpTopics.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link to={`/home-loans/${s.slug}`} className="card card-hover p-5 md:p-6 h-full block group cursor-pointer text-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                  s.color === 'accent'
                    ? 'bg-accent-100 text-accent-700'
                    : 'bg-primary-50 text-primary-700'
                }`}>
                  <Icon name={s.icon} size={20} />
                </div>
                <h3 className="text-[16px] md:text-[17px] font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-[13.5px] text-ink-600 leading-relaxed">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-700 group-hover:text-primary-800 transition-colors duration-200">
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── WHY US — Bento ────────────────────────────────────── */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why M&M"
          title="Boutique by design — clarity, choice, and care"
          subtitle="We're small enough to know your name, big enough to deliver. No call centres, no sales scripts — just considered advice from a broker who knows your file."
        />

        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(180px,auto)]">

          {/* HERO TILE — span classes on Reveal so grid sees them */}
          <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-primary-800 via-primary-700 to-primary-700 text-white p-6 md:p-8 lg:p-10 flex flex-col shadow-xl ring-1 ring-primary-900/10">

              {/* SVG pattern overlay */}
              <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="why-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M32 0H0V32" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#why-grid)" />
              </svg>

              {/* glow orbs */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent-400/25 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Shield size={13} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">The M&M difference</span>
                </div>

                <h3 className="mt-6 text-[26px] md:text-[32px] lg:text-[38px] font-bold leading-[1.1] tracking-tight">
                  Trust &amp; transparency,<br className="hidden md:block" />
                  <span className="bg-linear-to-r from-white to-accent-200 bg-clip-text text-transparent">built into every step.</span>
                </h3>

                <p className="mt-5 text-[15px] md:text-[16px] text-white/85 leading-relaxed max-w-xl">
                  No hidden fees, no sales scripts, no nasty surprises. We show you our recommendations, the rates, and exactly why we made each suggestion — so you can decide with confidence.
                </p>

                {/* trust ticks */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl">
                  {[
                    'All commissions disclosed in writing',
                    'Plain-English written recommendations',
                    'MFAA & AFCA member, ACL 123456',
                    'No fee for residential home loans',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13px] text-white/85">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* mini-stats */}
              <div className="relative mt-auto pt-7">
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/15">
                  {[
                    { v: '$0',   l: 'Cost to you*' },
                    { v: '40+',  l: 'Lenders compared' },
                    { v: '100%', l: 'Commission disclosed' },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-[22px] md:text-[26px] font-bold leading-none tracking-tight">{s.v}</div>
                      <div className="mt-1.5 text-[11px] text-white/70 font-medium">{s.l}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white group/cta"
                >
                  <span className="border-b border-white/40 group-hover/cta:border-white pb-0.5 transition-colors">How we work</span>
                  <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* SMALL TILES — remaining 5 values */}
          {values.slice(1).map((v, i) => {
            const palette = i % 2 === 0
              ? { bg: 'bg-primary-50',  fg: 'text-primary-700', accent: 'bg-primary-700' }
              : { bg: 'bg-accent-100',  fg: 'text-accent-700',  accent: 'bg-accent-500' }
            return (
              <Reveal key={v.title} delay={(i + 1) * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-ink-200/70 p-5 md:p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-200">
                  {/* top accent bar — slides in on hover */}
                  <span className={`absolute top-0 left-0 right-0 h-0.5 ${palette.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`} aria-hidden />

                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${palette.bg} ${palette.fg} flex items-center justify-center shadow-sm`}>
                      <Icon name={v.icon} size={20} />
                    </div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-300 group-hover:text-primary-700 transition-colors">
                      0{i + 2}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[16px] font-bold text-ink-900 leading-snug">{v.title}</h3>
                  <p className="mt-1.5 text-[13px] text-ink-600 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            )
          })}

        </div>

        <p className="mt-6 text-[11.5px] text-ink-500 text-center max-w-2xl mx-auto">
          *Standard residential home loans. Lender-paid service — all commissions disclosed in writing before you sign.
        </p>
      </Section>

      {/* ── PROCESS — Floating tiles ──────────────────────────── */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Our Process"
          title="Six steps. No surprises."
          subtitle="A clear, well-trodden path from first chat to settlement — and ongoing support after the keys are in your hand."
        />

        <div className="grid gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => {
            const durations = ['20 min', '1–2 days', '3–5 days', '1–2 weeks', '4–6 weeks', 'Ongoing']
            const outcomes  = ['Clear plan', 'Lender shortlist', 'Pre-approval', 'Formal approval', 'Keys in hand', 'Best-rate review']
            return (
              <Reveal key={step.title} delay={i * 0.05}>
                <article className="group">

                  {/* Display numeral */}
                  <span className="block font-bold text-primary-700/15 leading-none tracking-tight text-[88px] md:text-[104px] lg:text-[112px] select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Thin rule */}
                  <div className="mt-2 h-px bg-ink-200 relative overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 w-12 bg-primary-700 origin-left transition-all duration-500 group-hover:w-full"
                      aria-hidden
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-[19px] md:text-[20px] font-bold text-ink-900 leading-snug tracking-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[13.5px] text-ink-600 leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Footer meta — duration · outcome */}
                  <div className="mt-4 flex items-center gap-2.5 text-[12px]">
                    <span className="inline-flex items-center gap-1.5 text-ink-500">
                      <Clock size={12} /> {durations[i]}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-ink-300" aria-hidden />
                    <span className="inline-flex items-center gap-1.5 text-primary-700 font-semibold">
                      <CheckCircle2 size={12} /> {outcomes[i]}
                    </span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Quiet footer line — proof + CTA */}
        <div className="mt-12 md:mt-14 pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-ink-600">
            <Clock size={13} className="inline-block mr-1.5 -mt-0.5 text-primary-700" />
            Typical end-to-end: <strong className="text-ink-900">6–8 weeks</strong> · <strong className="text-ink-900">98%</strong> settle on time
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-700 hover:text-primary-800 group/cta"
          >
            Start step one
            <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </Section>

      {/* ── CALCULATORS ───────────────────────────────────────── */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Free Tools"
          title="Run the numbers in seconds"
          subtitle="Try our most-used calculators. Each is built around real Australian lender criteria and updated for the 2026 rate environment."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.slice(0, 6).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <Link to={`/calculators/${c.slug}`} className="card card-hover p-4 md:p-5 h-full block group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={17} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-bold text-ink-900">{c.title}</h3>
                    <p className="mt-1 text-[13px] text-ink-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/calculators" className="btn btn-md btn-outline">
            View all calculators <ArrowRight size={15} />
          </Link>
        </div>
      </Section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <Section tone="default">
        <SectionHeading
          eyebrow="Client stories"
          title="What it's like to work with us"
          subtitle="Hundreds of Australians trust M&M with one of the biggest financial decisions of their lives. Here's a glimpse of why."
          center
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="card p-5 md:p-6 h-full">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={13} className="text-warning" fill="currentColor" />
                  ))}
                </div>
                <p className="text-[14px] text-ink-700 leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t border-ink-100">
                  <div className="font-semibold text-[13.5px] text-ink-900">{t.name}</div>
                  <div className="text-[12px] text-ink-500">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/testimonials" className="link">Read all testimonials</Link>
        </div>
      </Section>

      <CTASection
        title="Ready to make your move?"
        subtitle="Whether you're buying, refinancing, or investing — book a free 20-minute call and let's map out your next step."
      />
    </PageWrapper>
  )
}
