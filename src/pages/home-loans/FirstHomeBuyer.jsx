import { Link } from 'react-router-dom'
import { ArrowRight, Download } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import Icon from '../../components/ui/Icon'
import CTASection from '../../components/ui/CTASection'

const STEPS = [
  {
    icon: 'Wallet',
    title: 'Work out what you can borrow',
    desc: 'Most first home buyers are surprised either way — sometimes by how much they can borrow, sometimes by how little. We start with a clear, honest borrowing range based on real income, expenses and lender criteria, so you can house-hunt in the right price bracket from day one.',
  },
  {
    icon: 'PiggyBank',
    title: 'Build (or stretch) your deposit',
    desc: 'A 20% deposit avoids Lenders Mortgage Insurance, but it’s not the only path in. The First Home Guarantee lets eligible buyers purchase with as little as 5% deposit and no LMI, and the First Home Super Saver Scheme can help you save inside super at a lower tax rate.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Check what grants you qualify for',
    desc: 'Depending on your state and price bracket, you may be entitled to the First Home Owner Grant, stamp duty concessions or exemptions, and one of the federal guarantee schemes. We map your eligibility so nothing on the table gets left behind.',
  },
  {
    icon: 'FileCheck',
    title: 'Get pre-approved before you shop',
    desc: 'Pre-approval gives you a real number to take to inspections and a stronger position when you find the right place. We’ll prepare your application carefully — most pre-approvals land within 3 to 5 business days.',
  },
  {
    icon: 'Search',
    title: 'House-hunt with a clear head',
    desc: 'With finance sorted, you can focus on the property itself. We’ll talk you through the practical checks — inspections, contracts, conveyancers, cooling-off periods — so nothing catches you out at exchange.',
  },
  {
    icon: 'Key',
    title: 'Move from offer to keys',
    desc: 'Once your offer is accepted, we move quickly to formal approval, manage the valuation, liaise with your conveyancer and coordinate settlement. You pick up the keys — we handle the logistics behind the scenes.',
  },
]

export default function FirstHomeBuyer() {
  return (
    <PageWrapper>
      {/* HERO with side guide download card */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Get started</span>
              <h1 className="mt-4 text-ink-900">Becoming a first home buyer</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                Buying your first home is an exciting, slightly nerve-wracking, completely worth-it experience. The first-home buyer process comes with many questions and unknowns — from how much deposit you really need to which grants apply, which lender will look favourably at your situation, and what each step of the journey actually involves. Our job is to take the jargon out, lay the options on the table, and walk with you from saving the deposit all the way to picking up the keys.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                We work with first home buyers across Sydney and the rest of Australia every week. That means we know how each lender treats casual income, parental guarantees, HECS-HELP debt and the federal guarantee schemes — and we know which combinations actually get approved instead of dragging on for months.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Book a free first-home chat <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-7 bg-white border-primary-100 lg:sticky lg:top-28">
              <span className="eyebrow"><Icon name="BookOpen" size={12} /> Free guide</span>
              <h3 className="mt-3 text-[20px] font-bold text-ink-900">Download our guide to buying your first home</h3>
              <p className="mt-3 text-[14.5px] text-ink-600 leading-relaxed">
                Feeling lost in the chaos of home buying? Take the first step towards your dream home by downloading our guide. Our expanded knowledge and a broker on your side can ease the journey of buying your first home.
              </p>
              <a href="#download" className="mt-5 btn btn-md btn-primary w-full">
                <Download size={15} /> Download the guide
              </a>
              <p className="mt-3 text-[12.5px] text-ink-500">
                A 24-page PDF covering grants, deposits, lender criteria and the full process.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* HOW WE CAN HELP */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1400&q=80"
                  alt="First home buyer reviewing loan options on a laptop at home"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">A broker in your corner</span>
              <h2 className="mt-3 text-ink-900">How we can help</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                We’ll do the legwork for you. We can compare home loans across a wide variety of products available from Australian banks and lenders — and present the two or three that genuinely fit your situation rather than the one our office happens to favour this month.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                And because you’re a first home buyer, you may be eligible for a first home buyer grant. The grant is available to Australian citizens or permanent residents who are buying or building their first home, intending to live in it as their primary residence within twelve months of settlement. Contact us to learn more about eligibility, price caps and grant amounts in your state.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                We’ll handle the back-and-forth with the lender, allowing you to focus on finding your dream home. We’ll guide you through the entire home loan process — from application through to approval, settlement and the first key in the door.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SIX STEPS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The first-home roadmap"
          title="Six steps from saving to settling"
          subtitle="A clear, predictable path so the experience matches the excitement."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.04}>
              <div className="card p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center">
                    <Icon name={step.icon} size={20} />
                  </div>
                  <div className="text-[12px] font-semibold text-primary-700 tracking-widest uppercase">Step {String(i + 1).padStart(2, '0')}</div>
                </div>
                <h3 className="text-[17px] font-bold text-ink-900" dangerouslySetInnerHTML={{ __html: step.title }} />
                <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Need a home loan?"
        subtitle="Whatever your circumstances, we’ll find the deal that’s right for you. Send us a quick enquiry and we’ll be in touch."
        primaryLabel="Speak to us today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
