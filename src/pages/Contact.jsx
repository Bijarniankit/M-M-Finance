import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, Loader2,
  CalendarClock, MessageSquare, ShieldCheck, Send,
  Plus, Minus, Navigation, Headphones, Sparkles,
} from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons'
import { siteInfo } from '../data/site.js'

/* ── Helpers ──────────────────────────────────────────────────── */

// Compute whether the office is currently open based on siteInfo.hours
function useOfficeOpen() {
  return useMemo(() => {
    const now = new Date()
    const day = now.getDay() // 0=Sun, 1=Mon ... 6=Sat
    const minutes = now.getHours() * 60 + now.getMinutes()
    // Mon-Fri 9-18, Sat 10-14, Sun by appointment
    if (day >= 1 && day <= 5) return minutes >= 9 * 60 && minutes < 18 * 60
    if (day === 6) return minutes >= 10 * 60 && minutes < 14 * 60
    return false
  }, [])
}

const CONTACT_FAQS = [
  {
    q: 'How quickly will I hear back?',
    a: 'Every enquiry receives a reply from a real broker within one business day — usually within a few hours. For anything urgent, calling is fastest.',
  },
  {
    q: 'Is the first call really free?',
    a: 'Yes. The initial 20-minute discovery call is completely free, with no obligation. We only get paid if you go ahead with a loan, and for standard residential loans the lender pays us — not you.',
  },
  {
    q: 'Do I need to prepare anything before reaching out?',
    a: 'No prep needed. Just tell us roughly what you’re trying to do (buying, refinancing, investing, etc.) and we’ll guide you on what to bring to the next conversation.',
  },
  {
    q: 'Can we meet in person at your Parramatta office?',
    a: 'Absolutely. We meet in person at our Suite 12 office in Parramatta by appointment, or over a quick video call if that’s easier — whichever you prefer.',
  },
]

const NEXT_STEPS = [
  { icon: MessageSquare, title: 'You reach out', desc: 'Call, email, or send the form — pick whatever feels easiest.' },
  { icon: Headphones,    title: 'We reply within 1 business day', desc: 'A real broker (not a call centre) will respond and ask a few quick questions.' },
  { icon: CalendarClock, title: 'Free 20-minute call', desc: 'A relaxed chat — phone or video. No prep, no pressure, no obligation.' },
  { icon: Sparkles,      title: 'Clear next steps', desc: 'You get a tailored plan and the choice to move ahead, or just sit on it.' },
]

const SUBJECTS = [
  'Home loan enquiry',
  'Refinance enquiry',
  'Investment lending',
  'First home buyer',
  'Commercial / SMSF',
  'General question',
]

/* ── Page ─────────────────────────────────────────────────────── */

export default function Contact() {
  const open = useOfficeOpen()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    subject: '', message: '', consent: false,
    preferred: 'either', bestTime: 'anytime',
  })
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          preferred: form.preferred,
          bestTime: form.bestTime,
        }),
      })
      if (!res.ok) throw new Error('Failed to send message')
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError('Could not send your message. Please call ' + siteInfo.phone + ' or try again.')
    } finally {
      setSending(false)
    }
  }

  /* ── Quick contact cards (top strip) ── */
  const quickActions = [
    {
      Icon: Phone,
      label: 'Call us',
      value: siteInfo.phone,
      sub: 'Fastest — straight to a broker',
      href: siteInfo.phoneHref,
      tone: 'primary',
    },
    {
      Icon: Mail,
      label: 'Email us',
      value: siteInfo.email,
      sub: 'Reply within 1 business day',
      href: siteInfo.emailHref,
      tone: 'accent',
    },
    {
      Icon: CalendarClock,
      label: 'Book a free call',
      value: '20-minute discovery call',
      sub: 'Pick a time that suits you',
      to: '/get-started',
      tone: 'primary',
    },
  ]

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to a real broker — no call centres"
        subtitle="Phone, email, or the form below. Whichever you prefer, you'll hear from a senior broker within one business day."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* ── 1. Quick contact strip ──────────────────────────────── */}
      <Section tone="default" className="pt-10! md:pt-14! lg:pt-16!">
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map(({ Icon, label, value, sub, href, to, tone }, i) => {
            const inner = (
              <div className="card card-hover p-5 sm:p-6 h-full flex items-start gap-4">
                <span
                  className={[
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                    tone === 'accent'
                      ? 'bg-accent-50 text-accent-700'
                      : 'bg-primary-50 text-primary-700',
                  ].join(' ')}
                >
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">
                    {label}
                  </div>
                  <div className="mt-0.5 font-bold text-[16px] text-ink-900 wrap-break-word">
                    {value}
                  </div>
                  <div className="mt-1 text-[13px] text-ink-600">{sub}</div>
                </div>
                <ArrowRight size={16} className="text-ink-400 mt-1 shrink-0" />
              </div>
            )
            return (
              <Reveal key={label} delay={i * 0.05}>
                {to ? (
                  <Link to={to} className="block h-full">{inner}</Link>
                ) : (
                  <a href={href} className="block h-full">{inner}</a>
                )}
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ── 2. Form + sidebar ───────────────────────────────────── */}
      <Section tone="muted" className="pt-4! md:pt-6! lg:pt-8!">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center">
                  <CheckCircle2 size={22} />
                </div>
                <h2 className="mt-4">Thanks — we&apos;ll be in touch.</h2>
                <p className="mt-3 text-[15px] text-ink-600 leading-relaxed">
                  Your message has been received. A broker will reply within one business day. For anything urgent, please call {siteInfo.phone}.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/get-started" className="btn btn-md btn-primary">Start a full enquiry <ArrowRight size={15} /></Link>
                  <Link to="/" className="btn btn-md btn-outline">Back to home</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[22px] font-bold text-ink-900">Send us a message</h2>
                    <p className="mt-1 text-[14px] text-ink-600">
                      Quick question, callback, or just say hi — we reply within one business day.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary-700 bg-primary-50 border border-primary-100 px-2.5 py-1 rounded-full">
                    <ShieldCheck size={13} /> Secure & private
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="label">Full name *</label>
                    <input
                      id="contact-name" type="text" required
                      placeholder="Jane Smith"
                      className="input"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="label">Phone</label>
                    <input
                      id="contact-phone" type="tel"
                      placeholder="04xx xxx xxx"
                      className="input"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-email" className="label">Email *</label>
                    <input
                      id="contact-email" type="email" required
                      placeholder="you@example.com"
                      className="input"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-subject" className="label">What&apos;s this about?</label>
                    <select
                      id="contact-subject" className="select"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                    >
                      <option value="">Select a topic…</option>
                      {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="label">Message *</label>
                    <textarea
                      id="contact-message" rows={5} required
                      placeholder="Tell us a little about what you're trying to do — buying, refinancing, comparing rates…"
                      className="textarea"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                    />
                  </div>
                </div>

                {/* Preferred contact method */}
                <div className="mt-5">
                  <div className="label">Preferred way to hear back</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 'phone',  label: 'Phone' },
                      { v: 'email',  label: 'Email' },
                      { v: 'either', label: 'Either' },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => update('preferred', o.v)}
                        className={[
                          'px-3 py-2 rounded-lg text-[13.5px] font-semibold border transition',
                          form.preferred === o.v
                            ? 'bg-primary-50 text-primary-700 border-primary-300'
                            : 'bg-white text-ink-700 border-ink-200 hover:border-primary-200',
                        ].join(' ')}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Best time to reach */}
                <div className="mt-4">
                  <div className="label">Best time to reach you</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { v: 'morning',   label: 'Morning' },
                      { v: 'afternoon', label: 'Afternoon' },
                      { v: 'evening',   label: 'Evening' },
                      { v: 'anytime',   label: 'Anytime' },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => update('bestTime', o.v)}
                        className={[
                          'px-3 py-2 rounded-lg text-[13.5px] font-semibold border transition',
                          form.bestTime === o.v
                            ? 'bg-primary-50 text-primary-700 border-primary-300'
                            : 'bg-white text-ink-700 border-ink-200 hover:border-primary-200',
                        ].join(' ')}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label htmlFor="contact-consent" className="mt-5 flex items-start gap-2.5 text-[13.5px] text-ink-700 cursor-pointer">
                  <input
                    id="contact-consent" type="checkbox" required
                    checked={form.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary-600"
                  />
                  I consent to my information being handled in line with the <Link to="/privacy" className="link">Privacy Policy</Link>.
                </label>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={sending} className="btn btn-md btn-primary">
                    {sending
                      ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                      : <><Send size={15} /> Send message</>}
                  </button>
                  <span className="text-[12.5px] text-ink-500">
                    No spam, no sales pitch — just a real reply.
                  </span>
                </div>
                {error && (
                  <p className="mt-3 text-[13.5px] text-danger">{error}</p>
                )}
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <Reveal>
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="text-[18px] font-bold text-ink-900">Direct contact</h3>
                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Phone size={16} />
                    </span>
                    <div>
                      <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Phone</div>
                      <a href={siteInfo.phoneHref} className="font-semibold text-[15px] text-ink-900 hover:text-primary-700 transition-colors">
                        {siteInfo.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Mail size={16} />
                    </span>
                    <div>
                      <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Email</div>
                      <a href={siteInfo.emailHref} className="font-semibold text-[15px] text-ink-900 hover:text-primary-700 transition-colors break-all">
                        {siteInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Office</div>
                      <div className="text-[14.5px] text-ink-800 leading-relaxed">{siteInfo.address}</div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteInfo.address)}`}
                        target="_blank" rel="noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-700 hover:text-primary-800"
                      >
                        <Navigation size={13} /> Get directions
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-700" />
                    <h3 className="text-[16px] font-bold text-ink-900 m-0">Office hours</h3>
                  </div>
                  <span
                    className={[
                      'inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2 py-1 rounded-full',
                      open
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : 'bg-ink-100 text-ink-600',
                    ].join(' ')}
                  >
                    <span className={['w-1.5 h-1.5 rounded-full', open ? 'bg-[#16a34a]' : 'bg-ink-400'].join(' ')} />
                    {open ? 'Open now' : 'Closed'}
                  </span>
                </div>
                <ul className="space-y-0">
                  {siteInfo.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between text-[14px] py-2 border-b border-ink-100 last:border-0">
                      <span className="text-ink-700">{h.day}</span>
                      <span className="font-semibold text-ink-900">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-[16px] font-bold text-ink-900">Follow along</h3>
                <p className="mt-1 text-[13.5px] text-ink-600">Practical finance tips, weekly.</p>
                <div className="mt-4 flex items-center gap-2">
                  {[
                    { Icon: FacebookIcon,  href: siteInfo.social.facebook,  label: 'Facebook' },
                    { Icon: InstagramIcon, href: siteInfo.social.instagram, label: 'Instagram' },
                    { Icon: LinkedinIcon,  href: siteInfo.social.linkedin,  label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:text-primary-700 hover:border-primary-300 transition-colors"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 3. What happens next ────────────────────────────────── */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What happens next"
          title="From hello to a clear plan"
          subtitle="Reaching out is the hard bit. After that, we make every step simple — and you’re always free to pause or walk away."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative">
          {NEXT_STEPS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center font-bold text-[14px]">
                    {i + 1}
                  </span>
                  <Icon size={18} className="text-primary-700" />
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 5. Quick FAQ ────────────────────────────────────────── */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div>
            <span className="eyebrow">Before you reach out</span>
            <h2 className="mt-4 text-ink-900">Quick answers</h2>
            <p className="mt-3 text-[15px] text-ink-600 leading-relaxed">
              The questions we hear most often from people contacting us for the first time. Can&apos;t find what you need? Just send us a message.
            </p>
            <Link to="/faq" className="mt-5 btn btn-md btn-outline">
              See all FAQs <ArrowRight size={15} />
            </Link>
          </div>
          <div className="space-y-3">
            {CONTACT_FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={f.q}
                  className={[
                    'card overflow-hidden transition',
                    isOpen ? 'border-primary-200 shadow-md' : '',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left p-5"
                  >
                    <span className="font-semibold text-[15.5px] text-ink-900">{f.q}</span>
                    <span
                      className={[
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition',
                        isOpen ? 'bg-primary-700 text-white' : 'bg-primary-50 text-primary-700',
                      ].join(' ')}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-[14.5px] text-ink-600 leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ── 6. Map ──────────────────────────────────────────────── */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Find us"
          title="Visit our Parramatta office"
          subtitle="Walk-ins welcome by appointment. Plenty of parking nearby and a five-minute walk from Parramatta station."
        />
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div className="aspect-16/10 lg:aspect-auto lg:min-h-90 bg-ink-100">
              <iframe
                title="M&M Finance office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </span>
                <div>
                  <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Address</div>
                  <div className="font-bold text-[15.5px] text-ink-900 leading-snug">{siteInfo.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </span>
                <div>
                  <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Phone</div>
                  <a href={siteInfo.phoneHref} className="font-bold text-[15.5px] text-ink-900 hover:text-primary-700">
                    {siteInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </span>
                <div>
                  <div className="text-[12px] uppercase tracking-wide font-semibold text-ink-500">Best time to visit</div>
                  <div className="text-[14.5px] text-ink-800">Mon–Fri, 9 AM – 6 PM (by appointment)</div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteInfo.address)}`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-md btn-primary"
                >
                  <Navigation size={15} /> Get directions
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.address)}`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-md btn-outline"
                >
                  Open in Maps <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 7. Final CTA ────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="card p-6 sm:p-8 md:p-12 bg-primary-700 border-primary-700! text-white">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-white!">Prefer a proper enquiry?</h2>
                <p className="mt-3 text-white/85 max-w-xl text-[15px] md:text-[17px] leading-relaxed">
                  Three short questions and we&apos;ll book your free 20-minute discovery call at a time that suits.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
                <Link to="/get-started" className="btn btn-lg bg-white text-primary-800! hover:bg-primary-50">
                  Start your enquiry <ArrowRight size={16} />
                </Link>
                <a href={siteInfo.phoneHref} className="btn btn-lg bg-transparent! text-white! border border-white/40 hover:bg-white/10!">
                  <Phone size={16} /> {siteInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
