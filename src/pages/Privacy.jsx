import PageWrapper from '../components/utility/PageWrapper'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import { siteInfo } from '../data/site.js'

const SECTIONS = [
  {
    h: '1. Who we are',
    p: `${siteInfo.legal} (ABN ${siteInfo.abn}, ${siteInfo.acl}) operates as a credit assistance provider regulated under the National Consumer Credit Protection Act 2009. We are bound by the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).`,
  },
  {
    h: '2. What information we collect',
    p: 'To recommend and arrange credit, we may collect: full name, date of birth, contact details, residential history, employment and income details, assets and liabilities, expenses, identity documents (driver licence, passport), credit history, and any further information needed by a particular lender. Where you give us details of others (e.g. a partner or guarantor), we assume you have their consent to share that information.',
  },
  {
    h: '3. How we collect it',
    p: 'Information is collected directly from you — through forms, calls, meetings or our website — and from third parties such as employers, accountants, credit reporting bodies, lenders, real estate agents and conveyancers, where reasonably necessary.',
  },
  {
    h: '4. Why we collect it',
    p: 'We use your information to assess your needs, compare suitable credit products, prepare and submit applications, comply with anti-money-laundering and credit laws, manage our internal operations, and (with your consent) to keep you informed about products and services that may be relevant.',
  },
  {
    h: '5. Who we share it with',
    p: 'We share information only with parties needed to provide our service: lenders, mortgage insurers, valuers, conveyancers, our aggregator (FAST/Connective/AFG, depending on engagement), regulators, and professional advisers. We never sell your data, and we do not use it for marketing by unrelated third parties.',
  },
  {
    h: '6. Overseas disclosures',
    p: 'Some of our service providers (e.g. cloud storage, document e-signature platforms) may store data on servers located outside Australia, including in the United States and the European Union. We only engage providers who meet equivalent privacy standards.',
  },
  {
    h: '7. Credit reporting',
    p: 'With your written consent we may obtain your credit report from credit reporting bodies including Equifax, illion and Experian, and disclose default and repayment history information back to those bodies. You have the right to access and correct your credit information, and to request that it not be used for pre-screening of direct marketing.',
  },
  {
    h: '8. Security',
    p: 'We protect your information using physical, electronic and procedural safeguards: encrypted document portals, multi-factor authentication, limited internal access, and secure destruction of paper records. No system is perfectly secure, but we take privacy seriously.',
  },
  {
    h: '9. Your rights',
    p: `You can request access to or correction of your personal information at any time by emailing ${siteInfo.email}. We respond within 30 days. If you are unhappy with our response, you may complain to the Office of the Australian Information Commissioner (OAIC) or the Australian Financial Complaints Authority (AFCA).`,
  },
  {
    h: '10. Cookies & analytics',
    p: 'Our website uses essential cookies to keep the site functional and, with your consent, analytics cookies to understand usage. You can disable cookies in your browser; some functionality may be reduced.',
  },
  {
    h: '11. Updates to this policy',
    p: 'We review this policy at least annually. The current version is dated January 2026. Material changes are reflected on this page; significant changes will be notified to current clients by email.',
  },
  {
    h: '12. Contact',
    p: `Questions about this policy or your personal information? Reach our Privacy Officer at ${siteInfo.email} or by mail to ${siteInfo.address}.`,
  },
]

export default function Privacy() {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Privacy Policy"
        title="How we handle your personal information"
        subtitle="In plain English: what we collect, why we collect it, who we share it with, and the rights you have over it."
        breadcrumbs={[{ label: 'Privacy' }]}
      />

      <Section tone="default">
        <div className="grid gap-8 lg:grid-cols-[1fr_240px] lg:items-start">
          <article className="max-w-3xl">
            <p className="text-[15px] text-ink-600 leading-relaxed">
              We take privacy seriously — not just because we have to, but because we know how sensitive financial information is. This policy explains how {siteInfo.legal} collects, uses, stores and discloses personal information.
            </p>
            <p className="mt-2 text-[13px] text-ink-500">Last updated: January 2026</p>

            <div className="mt-8 space-y-7">
              {SECTIONS.map((s, i) => (
                <section key={i} id={`s-${i + 1}`}>
                  <h2 className="text-[20px] font-bold text-ink-900">{s.h}</h2>
                  <p className="mt-2 text-[15px] text-ink-700 leading-relaxed">{s.p}</p>
                </section>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-28">
            <nav className="card p-5">
              <h4 className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">On this page</h4>
              <ol className="mt-3 space-y-1.5">
                {SECTIONS.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#s-${i + 1}`}
                      className="text-[13.5px] text-ink-700 hover:text-primary-700 transition-colors leading-snug block"
                    >
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>
      </Section>
    </PageWrapper>
  )
}
