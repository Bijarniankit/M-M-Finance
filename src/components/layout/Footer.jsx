import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Heart } from 'lucide-react'
import { siteInfo } from '../../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  const resourceLinks = [
    { to: '/calculators',  label: 'Calculators' },
    { to: '/guides',       label: 'Tips & Guides' },
    { to: '/blog',         label: 'Blog' },
    { to: '/faq',          label: 'FAQ' },
    { to: '/privacy',      label: 'Privacy' },
  ]

  const companyLinks = [
    { to: '/about',        label: 'About' },
    { to: '/lenders',      label: 'Our Lenders' },
    { to: '/testimonials', label: 'Reviews' },
    { to: '/contact',      label: 'Contact' },
    { to: '/get-started',  label: 'Apply Now' },
  ]

  return (
    <footer className="relative bg-surface-muted/30">
      {/* Panel */}
      <div className="relative overflow-hidden bg-surface-muted/40 rounded-t-[2rem]">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-200/20 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-md h-112 rounded-full bg-accent-100/30 blur-3xl" />
        </div>

        {/* Background wordmark — sits behind content (lower z) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none text-center font-extrabold tracking-tight text-primary-700/5 leading-none"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 12rem)' }}
          aria-hidden="true"
        >
          M&amp;M&nbsp;Finance
        </div>

        <div className="relative z-10 container-x pt-16 md:pt-20 pb-12">
          {/* ── Top split: brand block (left) | quick links (right) ── */}
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">

            {/* Brand + contact details */}
            <div className="lg:col-span-6 xl:col-span-6">
              {/* Logo + Title side by side */}
              <Link to="/" className="inline-flex items-center gap-3.5 group" aria-label="M&M Finance — Home">
                <span className="relative inline-flex items-center justify-center">
                  <span className="pointer-events-none absolute inset-0 -m-1 rounded-2xl bg-linear-to-br from-primary-200/40 via-accent-100/30 to-transparent blur-md" aria-hidden="true" />
                  <img
                    src="/logo.png"
                    alt="M&M Finance"
                    className="relative h-12 sm:h-14 w-auto object-contain drop-shadow-sm"
                  />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[22px] sm:text-[26px] font-extrabold tracking-tight bg-linear-to-r from-ink-900 via-primary-700 to-accent-500 bg-clip-text text-transparent">
                    {siteInfo.name}
                  </span>
                  <span className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                    Mortgage Brokers
                  </span>
                </span>
              </Link>

              {/* Description */}
              <p className="mt-6 text-[15px] leading-relaxed text-ink-600 max-w-md">
                Boutique mortgage brokers helping Australians compare 40+ lenders
                and choose with confidence — no fee for residential home loans.
              </p>

              {/* Info — phone + email on the same row, address below */}
              <div className="mt-7 max-w-md space-y-4">
                <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
                  <a
                    href={siteInfo.phoneHref}
                    className="group flex items-start gap-3 text-ink-700 hover:text-primary-700 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white border border-ink-200 text-primary-700 flex items-center justify-center shrink-0 shadow-xs group-hover:border-primary-300 group-hover:bg-primary-50 transition-colors">
                      <Phone size={15} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">Call us</span>
                      <span className="mt-1 text-[14.5px] font-semibold">{siteInfo.phone}</span>
                    </span>
                  </a>

                  <a
                    href={siteInfo.emailHref}
                    className="group flex items-start gap-3 text-ink-700 hover:text-primary-700 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white border border-ink-200 text-primary-700 flex items-center justify-center shrink-0 shadow-xs group-hover:border-primary-300 group-hover:bg-primary-50 transition-colors">
                      <Mail size={15} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">Email us</span>
                      <span className="mt-1 text-[14.5px] font-semibold break-all">{siteInfo.email}</span>
                    </span>
                  </a>
                </div>

                <div className="flex items-start gap-3 text-ink-700">
                  <span className="w-9 h-9 rounded-xl bg-white border border-ink-200 text-primary-700 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin size={15} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">Visit us</span>
                    <span className="mt-1 text-[14px] leading-relaxed">{siteInfo.address}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Link directory — Resources + Company only */}
            <div className="lg:col-span-6 xl:col-span-6 grid grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h4 className="text-[12px] font-semibold text-ink-900 tracking-[0.14em] uppercase">
                  Resources
                </h4>
                <ul className="mt-5 space-y-3">
                  {resourceLinks.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-[14.5px] text-ink-600 hover:text-primary-700 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold text-ink-900 tracking-[0.14em] uppercase">
                  Company
                </h4>
                <ul className="mt-5 space-y-3">
                  {companyLinks.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-[14.5px] text-ink-600 hover:text-primary-700 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Legal bar */}
      <div className="container-x py-5 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3 text-[12.5px] text-ink-500">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© {year} {siteInfo.legal}</span>
          <span className="text-ink-300">•</span>
          <span>ABN {siteInfo.abn}</span>
          <span className="text-ink-300">•</span>
          <span>{siteInfo.acl}</span>
        </div>
        <p className="self-start md:self-auto inline-flex items-center gap-1.5 text-ink-500">
          Made with
          <Heart size={13} className="text-red-500 fill-red-500" aria-label="love" />
          by{' '}
          <a
            href="https://www.atwebstudios.com.au"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-ink-700 hover:text-primary-700 transition-colors"
          >
            ATWEB STUDIOS
          </a>
        </p>
      </div>
    </footer>
  )
}
