import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import CTASection from '../components/ui/CTASection'
import { homeLoanHelpTopics, homeLoanInfoTopics } from '../data/site.js'

function TopicCard({ topic }) {
  return (
    <Link
      to={`/home-loans/${topic.slug}`}
      className="card card-hover p-6 sm:p-7 h-full block group"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
        topic.color === 'accent'
          ? 'bg-accent-100 text-accent-700'
          : 'bg-primary-50 text-primary-700'
      }`}>
        <Icon name={topic.icon} size={22} />
      </div>
      <h3 className="text-[18px] font-bold text-ink-900">{topic.title}</h3>
      <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed">{topic.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary-700 group-hover:text-primary-800">
        Learn more <ArrowRight size={14} />
      </span>
    </Link>
  )
}

export default function HomeLoans() {
  return (
    <PageWrapper>
      {/* HERO — split with image */}
      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Find the right home loan</span>
              <h1 className="mt-4 text-ink-900">
                Buying a property is a time to be excited.
              </h1>
              <p className="mt-5 text-[15.5px] md:text-[16.5px] text-ink-700 leading-relaxed">
                You’ve been searching for a home, watching the market, weighing up the suburbs and saving the deposit. You shouldn’t have to spend the next six months chasing banks and decoding fine print as well. Our job is to take the home loan side of the journey off your plate — comparing more than forty Australian lenders, structuring the loan around your goals, and walking you from the first chat through to settlement and beyond.
              </p>
              <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">
                Whether it’s your first place, your forever home, an investment or a refinance, we’ll line up your options side-by-side, explain the trade-offs in plain English, and make sure the loan you sign for is genuinely the right fit for the years ahead.
              </p>
              <div className="mt-7">
                <Link to="/get-started" className="btn btn-lg btn-primary">
                  Get started today <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1400&q=80"
                  alt="Happy family standing in the doorway of their new home"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent-200/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WE DO THE HARD WORK — reverse split */}
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.05}>
            <div className="relative order-2 lg:order-1">
              <div className="relative h-72 sm:h-96 lg:h-112 rounded-2xl overflow-hidden shadow-lg ring-1 ring-ink-900/5">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80"
                  alt="M&M Finance broker reviewing home loan documents with clients at a table"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full bg-accent-200/30 blur-3xl" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="order-1 lg:order-2">
              <span className="eyebrow">Hands-on broking</span>
              <h2 className="mt-3 text-ink-900">We do the hard work.</h2>
              <p className="mt-5 text-[15.5px] text-ink-700 leading-relaxed">
                We consider a range of options for you, calling on our understanding of the current market, an up-to-date view of every lender’s policy on our panel, and decades of experience structuring loans that hold up over time. You bring the goals — we bring the comparison, the paperwork and the negotiation.
              </p>

              <h3 className="mt-7 text-[18px] font-bold text-ink-900">And we help with the whole process.</h3>
              <p className="mt-3 text-[15px] text-ink-700 leading-relaxed">
                We don’t walk away once your application is approved. We stay with you for the whole journey — from completing the paperwork, ordering valuations and arranging your conveyancer’s details, right through to settlement day. You’ll have the same broker on the phone the whole way, and an honest answer whenever you need one.
              </p>

              <h3 className="mt-7 text-[18px] font-bold text-ink-900">Annual reviews — for life.</h3>
              <p className="mt-3 text-[15px] text-ink-700 leading-relaxed">
                Once you settle, we keep checking in. Each year we re-test your loan against the market and pick up the phone if a sharper rate or better structure is on the table. Most clients never have to think about their mortgage between calls — that’s the point.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* TOPICS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Support for every stage of your property journey"
          title="What types of finance can M&M Finance help you with?"
          subtitle="Five common situations we help with every week — pick the one that fits where you’re headed and we’ll take it from there."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeLoanHelpTopics.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.04}>
              <TopicCard topic={t} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="eyebrow">Get clear on the moving parts</span>
          <h3 className="mt-3 text-ink-900 text-[22px] md:text-[26px] font-bold">
            Two quick explainers worth bookmarking
          </h3>
          <p className="mt-3 max-w-2xl mx-auto text-[15px] text-ink-600 leading-relaxed">
            Plain-English guides to the different loan types Australian lenders offer and the features that quietly do the heavy lifting once your loan is live.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {homeLoanInfoTopics.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.04}>
              <TopicCard topic={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Need a home loan?"
        subtitle="Whatever your circumstances, we’ll find the deal that’s right for you. Book a free 20-minute call — no paperwork, no obligation."
        primaryLabel="Speak to us today"
        primaryTo="/get-started"
      />
    </PageWrapper>
  )
}
