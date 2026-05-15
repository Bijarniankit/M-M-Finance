import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { siteInfo } from '../data/site.js'
import CTASection from '../components/ui/CTASection'

const PILLARS = [
  {
    icon: 'Shield',
    title: 'From start to finish',
    desc: 'Our support doesn\'t stop at submission. We\'re with you from the first conversation through to settlement and beyond — making sure everything goes smoothly.',
  },
  {
    icon: 'Phone',
    title: 'Call us anytime',
    desc: 'Get to us by phone or email to speak with your mortgage adviser. All our brokers are happy to respond to your questions — no call centres, no hold music.',
  },
  {
    icon: 'Award',
    title: 'You come first',
    desc: 'At M&M Finance, clients always come first. We don\'t prioritise revenue over quality of service — which means you\'ll always enjoy the experience.',
  },
]

const QUICK_STATS = [
  { value: '1,500+', label: 'Happy clients' },
  { value: '$850M+', label: 'Loans settled' },
  { value: '40+',    label: 'Lenders on panel' },
  { value: '15+',    label: 'Years experience' },
]

const FOUNDER_CREDENTIALS = [
  { icon: 'GraduationCap', label: 'Diploma of Finance & Mortgage Broking' },
  { icon: 'BadgeCheck',    label: 'MFAA Accredited Member' },
  { icon: 'Briefcase',     label: '15+ years in Australian finance' },
  { icon: 'Users',         label: '1,500+ clients served' },
]

/* Reusable hero-style image block with subtle decoration */
function PhotoImage({ src, alt, accent = false, className = '' }) {
  const tintFrom = accent ? 'bg-accent-200/30' : 'bg-primary-200/30'
  const tintTo   = accent ? 'bg-primary-200/30' : 'bg-accent-200/30'
  return (
    <div className={`relative ${className}`}>
      <div className="relative h-72 sm:h-80 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full ${tintFrom} blur-3xl`} />
      <div className={`pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full ${tintTo} blur-3xl`} />
    </div>
  )
}

export default function About() {
  return (
    <PageWrapper>

      {/* ── 1. WHO WE ARE ─────────────────────────────────────────── */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <Reveal>
            <div>
              <span className="eyebrow">About M&amp;M Finance</span>
              <h1 className="mt-4 text-ink-900">Who we are</h1>
              <div className="mt-5 space-y-4 text-[15.5px] text-ink-700 leading-relaxed">
                <p>
                  M&amp;M Finance is a Parramatta-based mortgage and finance broking firm built on a simple idea — your goals come before the bank's. We're a small, hands-on team of qualified brokers serving clients across Sydney and the rest of Australia, with a particular focus on the families and investors who have been calling Western Sydney home for generations.
                </p>
                <p>
                  Founded by Pavan Kumar after fifteen years inside the Australian finance industry, M&amp;M was born out of one frustration repeated again and again: borrowers being pushed into the wrong product simply because it was the easiest one for the broker to sell. We do the opposite. We sit on your side of the table, compare more than forty lenders, explain the trade-offs honestly, and recommend the loan that genuinely fits your life — not the one that pays us the most.
                </p>
                <p>
                  Whether you're buying your very first home, refinancing to a sharper rate, expanding an investment portfolio, or funding a commercial project, we take the time to understand where you are now and where you want to be in five, ten and twenty years. Then we structure the lending around that — in plain English, without the pressure, and with the same broker on the phone from first call through to settlement and every annual review beyond.
                </p>
              </div>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Book a meeting <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PhotoImage
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
              alt="M&M Finance broker shaking hands with happy clients after a successful home loan settlement"
            />
          </Reveal>

        </div>
      </Section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div className="container-x py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {QUICK_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[1.875rem] sm:text-[2.25rem] font-bold text-white leading-none">{s.value}</div>
                <div className="text-[12px] text-white/70 mt-1.5 font-medium tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THREE PILLARS (polished cards) ─────────────────────── */}
      <Section tone="default">
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <span className="eyebrow">What sets us apart</span>
          <h2 className="mt-4 text-ink-900">A different kind of broker</h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-ink-600 leading-relaxed">
            Three commitments we make to every client who walks through our door.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-7 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="group relative h-full rounded-2xl bg-white border border-ink-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-200 transition-all">
                <div className="absolute -top-px left-7 right-7 h-px bg-linear-to-r from-transparent via-primary-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center shadow-md shadow-primary-900/10">
                  <Icon name={p.icon} size={22} />
                </div>
                <h3 className="mt-5 text-[18px] font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2.5 text-[14.5px] text-ink-600 leading-relaxed">{p.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold text-primary-700/70 tracking-widest uppercase">
                  <span>0{i + 1}</span>
                  <span className="w-8 h-px bg-primary-300" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 4. WHY USE A BROKER ──────────────────────────────────── */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <Reveal delay={0.05}>
            <PhotoImage
              accent
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
              alt="Reviewing home loan options and lender comparison documents"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <span className="eyebrow">Discover the benefits</span>
              <h2 className="mt-4 text-ink-900">Why use a mortgage broker?</h2>
              <div className="mt-5 space-y-4 text-[15.5px] text-ink-700 leading-relaxed">
                <p>
                  Getting a mortgage on your own can be challenging — you're limited to a single bank's rates, policies and criteria. At M&amp;M Finance, we save you time, money and stress by finding the right loan for your specific needs.
                </p>
                <p>
                  While many sites compare rates, we go further. We review your full financial picture and compare products across 40+ lenders, finding a mortgage genuinely tailored to you — so you can choose with real confidence.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/home-loans"
                  className="inline-flex items-center gap-1.5 text-primary-700 font-semibold text-[15px] hover:underline underline-offset-2"
                >
                  Find out more <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </Section>

      {/* ── 5. MEET THE FOUNDER (editorial card) ─────────────────── */}
      <Section tone="default">
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <span className="eyebrow">Meet the founder</span>
          <h2 className="mt-4 text-ink-900">The person behind M&amp;M Finance</h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-ink-600 leading-relaxed">
            Trusted by 1,500+ Australian families and investors to find the right loan — not just any loan.
          </p>
        </div>

        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-white border border-ink-100 shadow-xl shadow-primary-900/5">
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">

              {/* Photo column */}
              <div className="relative h-80 lg:h-auto min-h-96 bg-primary-50">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80"
                  alt="Pavan Kumar, Founder and Principal Broker at M&M Finance"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-900/40 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-white/0" />
                <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 bg-white/95 backdrop-blur rounded-xl px-4 py-2.5 shadow-md">
                  <div className="text-[11px] font-semibold text-primary-700 tracking-widest uppercase">Founder</div>
                  <div className="text-[15px] font-bold text-ink-900 mt-0.5">Pavan Kumar</div>
                </div>
              </div>

              {/* Content column */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div>
                  <h3 className="text-[24px] sm:text-[28px] font-bold text-ink-900 leading-tight">
                    Pavan Kumar
                  </h3>
                  <div className="mt-1.5 text-[14px] font-semibold text-primary-700 tracking-wide uppercase">
                    Founder &amp; Principal Broker
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mt-6 pl-5 border-l-2 border-accent-400">
                  <Quote size={16} className="absolute -left-2.25 top-0 bg-white text-accent-500" />
                  <p className="text-[15.5px] text-ink-700 leading-relaxed italic">
                    I started M&amp;M Finance because too many Australians were being squeezed into the wrong loan for the wrong reasons. Our job is simple — sit on your side of the table, every single time.
                  </p>
                </div>

                {/* Bio */}
                <p className="mt-6 text-[14.5px] text-ink-600 leading-relaxed">
                  Over 15 years in Australian finance, Pavan has helped first home buyers, investors and business owners across NSW structure loans that actually fit their lives. He leads M&amp;M Finance's day-to-day broking and is the first call for the firm's most complex deals.
                </p>

                {/* Credentials */}
                <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {FOUNDER_CREDENTIALS.map((c) => (
                    <div key={c.label} className="flex items-center gap-2.5 rounded-lg bg-primary-50/60 px-3 py-2">
                      <div className="w-7 h-7 rounded-md bg-white text-primary-700 flex items-center justify-center shrink-0 shadow-xs">
                        <Icon name={c.icon} size={14} />
                      </div>
                      <span className="text-[13px] font-medium text-ink-700">{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* Contact actions */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={siteInfo.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-700 hover:bg-primary-800 text-white text-[13.5px] font-semibold px-4 py-2 transition-colors"
                  >
                    <Icon name="Phone" size={14} /> {siteInfo.phone}
                  </a>
                  <a
                    href={siteInfo.emailHref}
                    className="inline-flex items-center gap-2 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-800 text-[13.5px] font-semibold px-4 py-2 transition-colors"
                  >
                    <Icon name="Mail" size={14} /> Email Pavan
                  </a>
                  <a
                    href={siteInfo.social.linkedin}
                    aria-label="Pavan Kumar on LinkedIn"
                    className="w-9 h-9 rounded-full bg-ink-100 hover:bg-primary-700 hover:text-white text-ink-600 flex items-center justify-center transition-colors"
                  >
                    <Icon name="Linkedin" size={15} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 6. ACCREDITATIONS ────────────────────────────────────── */}
      <Section tone="muted">
        <div className="text-center mb-8">
          <span className="eyebrow">Licensed &amp; accredited</span>
          <h2 className="mt-4 text-ink-900">You're in safe hands</h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-ink-600 leading-relaxed max-w-2xl mx-auto">
            {siteInfo.legal} holds {siteInfo.acl} (ABN {siteInfo.abn}). We follow Best Interests Duty on every recommendation — always working for you, not the bank.
          </p>
        </div>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {['MFAA Member', 'AFCA Member', 'ASIC Licensed', 'Best Interests Duty'].map((badge) => (
              <div key={badge} className="flex items-center gap-2.5 bg-white border border-primary-100 rounded-xl px-5 py-3 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-primary-700 text-white flex items-center justify-center shrink-0">
                  <Icon name="BadgeCheck" size={14} />
                </div>
                <span className="text-[13.5px] font-semibold text-primary-800">{badge}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── 7. CTA ───────────────────────────────────────────────── */}
      <CTASection
        title="Ready to find the right loan?"
        subtitle="Book a free 20-minute call with our team — no obligation, no jargon, just clear advice tailored to your situation."
        primaryLabel="Book a meeting"
        primaryTo="/get-started"
      />

    </PageWrapper>
  )
}
