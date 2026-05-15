import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Home, Users, Banknote, ShieldCheck, TrendingUp } from 'lucide-react'
import PageWrapper from '../../components/utility/PageWrapper'
import Section, { SectionHeading } from '../../components/ui/Section'
import Reveal from '../../components/ui/Reveal'
import CTASection from '../../components/ui/CTASection'

const POINTS = [
  {
    icon: Clock,
    title: 'Time on your side',
    desc: 'Off-the-plan contracts typically settle anywhere from twelve months to a few years after exchange. That gap gives you breathing room to keep saving, pay down debt and prepare for the move, instead of scrambling to settle inside the usual six-week window.',
  },
  {
    icon: Home,
    title: 'New home, no surprises',
    desc: 'Everything is brand new at handover — the appliances, the carpets, the warranties, the energy ratings. There are no twenty-year-old plumbing problems hiding behind freshly painted walls, and most major defects are covered by builder warranty during the first years of ownership.',
  },
  {
    icon: TrendingUp,
    title: 'First home buyer advantages',
    desc: 'In several states, off-the-plan purchases unlock stamp duty concessions or exemptions for eligible first home buyers, and federal guarantee schemes can sometimes apply too. The savings are often material — we’ll map exactly what’s on the table for you.',
  },
  {
    icon: Banknote,
    title: 'Smaller upfront commitment',
    desc: 'You typically pay a 10% deposit at exchange and the balance at settlement. Many buyers use a deposit bond or bank guarantee to free up cash in the meantime — useful if your savings are still in a high-interest account or invested elsewhere.',
  },
  {
    icon: ShieldCheck,
    title: 'Researching the developer',
    desc: 'Not all developers are equal. We’ll talk you through what to look for — completed projects, financial backing, sunset clauses, defect history — so the decision is informed rather than impulsive. The right developer makes the entire experience smoother.',
  },
  {
    icon: Users,
    title: 'Top tips',
    desc: 'Read the contract with your conveyancer before you sign. Check the sunset date and what happens if the build runs late. Understand the strata structure, the body corporate fees and any rental restrictions. Off-the-plan rewards patience and homework.',
  },
]

export default function OffPlan() {
  return (
    <PageWrapper>
      {/* HERO */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Buying a new home</span>
              <h1 className="mt-4 text-ink-900">Buying off the plan: a new build without the stress of building</h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                Buying off the plan is an attractive option for many home buyers and home renovators. It’s an opportunity to secure a brand new property in a great location, often with stamp duty savings, an extended timeline to save the deposit and the satisfaction of being the first owner to walk through the door.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                We help clients across Sydney and the rest of Australia structure finance for off-the-plan apartments, townhouses and house-and-land packages every month. We know the lenders that look kindly on off-the-plan valuations, the policies that catch buyers out at settlement, and the questions to ask the developer long before you exchange.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Talk to a broker <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80"
                  alt="Modern new apartment building exterior at dusk — off the plan purchase"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* THE CONCEPT IS SIMPLE */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="mt-3 text-ink-900">The concept is simple</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                Buyers sign a contract and pay a deposit — usually 10% — for a property in a development not yet built or still under construction. The settlement happens later, once the build is complete, the title has been registered and the property is ready to move into. In the meantime, the developer is contractually obliged to deliver the home to the plans, specifications and quality standard agreed in the contract.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Because the property is sold before completion, the price is often locked in at today’s market value while the asset itself appreciates (or at least holds) over the construction period. That timing advantage is one of the genuine attractions of buying off the plan — though it cuts both ways if the market softens, which is why lender choice and finance structure matter so much.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
                  alt="Couple reviewing apartment plans with a broker"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WIN-WIN */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80"
                  alt="Modern apartment development under construction"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">Why it works</span>
              <h2 className="mt-3 text-ink-900">Buying off the plan can be a win-win for buyers and developers</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                On the buyer’s side, fixed-price contracts and a longer settlement timeline make planning easier. You know exactly what the property is going to cost before market conditions change, and you have time to save, sort your finances and prepare for the move without the usual six-week sprint.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                On the developer’s side, a healthy pipeline of off-the-plan sales is what makes a project bankable in the first place — lenders typically require a certain percentage of pre-sales before funding construction. The arrangement means developers can deliver more homes to the market sooner, which everyone benefits from.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WHEN BUYING OFF THE PLAN */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div>
              <span className="eyebrow">What to look for</span>
              <h2 className="mt-3 text-ink-900">When buying off the plan, a developer should provide buyers with a construct</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                A bulletproof contract is the foundation. The contract should clearly define what is being built, when it’s expected to be ready, the standard of finish, and what happens if any of those change. Look closely at the disclosure statement, the strata plan, the body corporate by-laws and the sunset clause that allows either party to walk away if the build runs significantly late.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Beyond the paperwork, do the practical homework. Research the developer’s track record across previous projects, ask to speak with past purchasers, and visit a completed development if you can. Confirm the price is in line with comparable new and resale stock nearby, and make sure your conveyancer is reviewing the contract before — never after — you sign.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
                  alt="Buyer signing an off the plan property contract with a conveyancer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* COMMON QUESTIONS / KEY POINTS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The essentials"
          title="What every off-the-plan buyer should weigh up"
          subtitle="Six topics worth understanding before you exchange — and that we’ll talk through with you in detail when we meet."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => {
            const I = p.icon
            return (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card p-6 sm:p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                    <I size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[17px] font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            )
          })}
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
