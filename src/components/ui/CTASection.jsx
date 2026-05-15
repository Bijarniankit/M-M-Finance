import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { siteInfo } from '../../data/site.js'

export default function CTASection({
  title = 'Talk to a broker who actually listens.',
  subtitle = 'Free 20-minute consultation. No obligation, no pressure — just clear advice tailored to your situation.',
  primaryLabel = 'Get started',
  primaryTo = '/get-started',
}) {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="card p-6 sm:p-8 md:p-12 bg-primary-700 border-primary-700! text-white">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-white!">{title}</h2>
              <p className="mt-3 text-white/85 max-w-xl text-[15px] md:text-[17px] leading-relaxed">{subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
              <Link to={primaryTo} className="btn btn-lg bg-white text-primary-800! hover:bg-primary-50">
                {primaryLabel} <ArrowRight size={16} />
              </Link>
              <a href={siteInfo.phoneHref} className="btn btn-lg bg-transparent! text-white! border border-white/40 hover:bg-white/10!">
                <Phone size={16} /> {siteInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
