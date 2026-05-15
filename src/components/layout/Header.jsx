import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import { siteInfo, homeLoanHelpTopics, homeLoanInfoTopics } from '../../data/site.js'

const NAV = [
  {
    label: 'Home Loans',
    to: '/home-loans',
    groups: [
      {
        label: 'How Can We Help?',
        items: homeLoanHelpTopics.map((t) => ({ label: t.title, to: `/home-loans/${t.slug}` })),
      },
      {
        label: 'Additional Information',
        items: homeLoanInfoTopics.map((t) => ({ label: t.title, to: `/home-loans/${t.slug}` })),
      },
    ],
  },
  { label: 'Calculators', to: '/calculators' },
  {
    label: 'Resources',
    to: '/guides',
    children: [
      { label: 'Tips & Guides', to: '/guides' },
      { label: 'Our Lenders', to: '/lenders' },
      { label: 'Testimonials', to: '/testimonials' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openGroup, setOpenGroup] = useState(null)
  const [mobileSubOpen, setMobileSubOpen] = useState(null)
  const [mobileGroupOpen, setMobileGroupOpen] = useState(null)
  const location = useLocation()
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setOpenGroup(null)
    setMobileSubOpen(null)
    setMobileGroupOpen(null)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const { body, documentElement } = document
    const prevBody = body.style.overflow
    const prevHtml = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    return () => {
      body.style.overflow = prevBody
      documentElement.style.overflow = prevHtml
    }
  }, [mobileOpen])

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      setOpenGroup(null)
    }, 120)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — desktop only */}
      <div className="hidden md:block bg-primary-700 text-white text-[12.5px]">
        <div className="container-full flex items-center justify-between h-9">
          <div className="text-white/85">
            {siteInfo.acl} · ABN {siteInfo.abn}
          </div>
          <div className="flex items-center gap-5">
            <a href={siteInfo.phoneHref} className="flex items-center gap-1.5 text-white hover:text-white/85 transition-colors">
              <Phone size={13} /> {siteInfo.phone}
            </a>
            <a href={siteInfo.emailHref} className="hidden lg:inline text-white/85 hover:text-white transition-colors">
              {siteInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`bg-white border-b transition-shadow ${scrolled ? 'shadow-sm border-ink-200' : 'border-transparent'}`}>
        <div className="container-full flex items-center justify-between h-20 md:h-24">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV.map((item) => {
              const hasDropdown = item.children || item.groups
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-ink-700 hover:text-primary-700 hover:bg-primary-50'
                      }`
                    }
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown size={14} className="opacity-70" />}
                  </NavLink>

                  <AnimatePresence>
                    {hasDropdown && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2"
                      >
                        {item.children && (
                          <div className="card p-2 shadow-lg w-64">
                            {item.children.map((child) => (
                              <Link
                                key={child.to}
                                to={child.to}
                                className="block px-3 py-2 text-[14px] text-ink-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                        {item.groups && (
                          <div className="flex items-start gap-0">
                            <div className="card p-2 shadow-lg w-64">
                              {item.groups.map((g) => (
                                <button
                                  key={g.label}
                                  type="button"
                                  onMouseEnter={() => setOpenGroup(g.label)}
                                  onFocus={() => setOpenGroup(g.label)}
                                  className={`w-full text-left flex items-center justify-between px-3 py-2 text-[14px] rounded-md transition-colors ${
                                    openGroup === g.label
                                      ? 'bg-primary-50 text-primary-700'
                                      : 'text-ink-700 hover:text-primary-700 hover:bg-primary-50'
                                  }`}
                                >
                                  <span className="font-medium">{g.label}</span>
                                  <ChevronRight size={14} className="opacity-70" />
                                </button>
                              ))}
                            </div>
                            <AnimatePresence>
                              {openGroup && (
                                <motion.div
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -4 }}
                                  transition={{ duration: 0.12 }}
                                  className="ml-1 card p-2 shadow-lg w-72"
                                >
                                  {item.groups
                                    .find((g) => g.label === openGroup)
                                    ?.items.map((child) => (
                                      <Link
                                        key={child.to}
                                        to={child.to}
                                        className="block px-3 py-2 text-[14px] text-ink-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                                      >
                                        {child.label}
                                      </Link>
                                    ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/get-started"
              className="hidden sm:inline-flex btn btn-md btn-primary"
            >
              Apply Now <ArrowRight size={15} />
            </Link>
            <button
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-ink-200 text-ink-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white border-t border-ink-200 shadow-sm overflow-y-auto overscroll-contain"
          >
            <div className="container-full py-4 pb-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => {
                  const hasDropdown = item.children || item.groups
                  return (
                    <div key={item.label}>
                      <div className="flex items-center">
                        <NavLink
                          to={item.to}
                          end={item.to === '/'}
                          className={({ isActive }) =>
                            `flex-1 px-3 py-2.5 text-[15px] font-medium rounded-lg ${
                              isActive
                                ? 'text-primary-700 bg-primary-50'
                                : 'text-ink-800'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                        {hasDropdown && (
                          <button
                            aria-label={`Toggle ${item.label} submenu`}
                            onClick={() => setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)}
                            className="w-10 h-10 inline-flex items-center justify-center text-ink-500"
                          >
                            <ChevronDown size={16} className={`transition-transform ${mobileSubOpen === item.label ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {hasDropdown && mobileSubOpen === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {item.children && item.children.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="block px-3 py-2 text-[14px] text-ink-600 hover:text-primary-700 rounded-md"
                              >
                                {c.label}
                              </Link>
                            ))}
                            {item.groups && item.groups.map((g) => (
                              <div key={g.label} className="mt-1">
                                <button
                                  type="button"
                                  onClick={() => setMobileGroupOpen(mobileGroupOpen === g.label ? null : g.label)}
                                  className="w-full flex items-center justify-between px-3 py-2 text-[14px] font-semibold text-ink-800 hover:text-primary-700 rounded-md"
                                >
                                  <span>{g.label}</span>
                                  <ChevronDown size={14} className={`transition-transform ${mobileGroupOpen === g.label ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {mobileGroupOpen === g.label && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden pl-3"
                                    >
                                      {g.items.map((c) => (
                                        <Link
                                          key={c.to}
                                          to={c.to}
                                          className="block px-3 py-2 text-[14px] text-ink-600 hover:text-primary-700 rounded-md"
                                        >
                                          {c.label}
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </nav>
              <div className="mt-4 pt-4 border-t border-ink-200 flex flex-col gap-2">
                <Link to="/get-started" className="btn btn-md btn-primary w-full">
                  Apply Now <ArrowRight size={15} />
                </Link>
                <a href={siteInfo.phoneHref} className="btn btn-md btn-outline w-full">
                  <Phone size={15} /> {siteInfo.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
