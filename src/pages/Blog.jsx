import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import CTASection from '../components/ui/CTASection'

const POSTS = [
  {
    slug: 'rba-rate-call-may-2026',
    title: 'What the RBA\'s May rate call means for your mortgage',
    excerpt: 'A plain-English breakdown of the latest rate decision, what lenders are passing through, and what to do if your repayments are creeping up.',
    date: 'May 2026',
    readTime: '4 min read',
    category: 'Market Update',
  },
  {
    slug: 'cashback-offers-worth-it',
    title: 'Are cashback offers actually worth it in 2026?',
    excerpt: 'Five things to check before chasing a refinance cashback — and the lenders quietly offering the best long-term deals right now.',
    date: 'April 2026',
    readTime: '6 min read',
    category: 'Refinance',
  },
  {
    slug: 'first-home-guarantee-changes',
    title: 'First Home Guarantee scheme: what changed this year',
    excerpt: 'Updated price caps, income thresholds and the spots still up for grabs in the 2025–26 round of the First Home Guarantee.',
    date: 'March 2026',
    readTime: '5 min read',
    category: 'First Home Buyers',
  },
  {
    slug: 'fixed-rates-back-on-the-table',
    title: 'Fixed rates are back on the table — should you lock in?',
    excerpt: 'After two years of variable-only thinking, fixed rates are looking competitive again. Here is when fixing makes sense and when it doesn\'t.',
    date: 'February 2026',
    readTime: '7 min read',
    category: 'Home Loans',
  },
  {
    slug: 'self-employed-income-2026',
    title: 'Self-employed in 2026: which lenders are saying yes',
    excerpt: 'Lenders have quietly changed their self-employed policies. A current snapshot of who accepts BAS-only, one-year tax returns and add-backs.',
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Lender Policy',
  },
  {
    slug: 'investment-property-trends',
    title: 'Where investors are looking next — and the loan structures behind it',
    excerpt: 'Suburb-level data, the cashflow story, and the most common loan structures we are setting up for investor clients this year.',
    date: 'December 2025',
    readTime: '8 min read',
    category: 'Investment',
  },
]

export default function Blog() {
  const [featured, ...rest] = POSTS

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Blog"
        title="News, market updates and broker notes"
        subtitle="Short, timely posts from the desk — rate moves, lender policy changes, and things worth knowing before you sign anything."
      />

      {/* Featured post */}
      <Section tone="default">
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="card card-hover p-7 md:p-10 block group"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="badge badge-info">{featured.category}</span>
                  <span className="flex items-center gap-1 text-ink-500">
                    <Calendar size={12} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1 text-ink-500">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-[24px] md:text-[30px] font-bold text-ink-900 leading-tight">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[15px] md:text-[16px] text-ink-600 leading-relaxed max-w-2xl">
                  {featured.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-primary-700 group-hover:text-primary-800">
                Read post <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>
      </Section>

      {/* Recent posts */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Recent posts"
          title="More from the M&amp;M blog"
          subtitle="We publish whenever something genuinely useful crosses the desk — never just to fill a content calendar."
          center
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link to={`/blog/${p.slug}`} className="card card-hover p-6 h-full block group">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="badge badge-info">{p.category}</span>
                  <span className="flex items-center gap-1 text-ink-500">
                    <Clock size={12} /> {p.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-ink-900 leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink-600 leading-relaxed">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[12.5px] text-ink-500 flex items-center gap-1">
                    <Calendar size={12} /> {p.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-primary-700 group-hover:text-primary-800">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Want our market updates in your inbox?"
        subtitle="A short monthly note on rate moves and lender policy — no spam, no sales pitches. Just useful."
      />
    </PageWrapper>
  )
}
