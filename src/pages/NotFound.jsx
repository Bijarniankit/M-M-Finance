import { Link } from 'react-router-dom'
import { ArrowRight, Home, Search } from 'lucide-react'
import PageWrapper from '../components/utility/PageWrapper'
import Section from '../components/ui/Section'

export default function NotFound() {
  return (
    <PageWrapper>
      <Section tone="default">
        <div className="max-w-xl mx-auto text-center py-10">
          <div className="text-[80px] md:text-[110px] font-bold tracking-tight text-primary-700 leading-none">
            404
          </div>
          <h1 className="mt-2">Page not found</h1>
          <p className="mt-3 text-[15px] text-ink-600 leading-relaxed">
            The page you're looking for has moved, been renamed, or never existed. Try one of the links below — or just give us a call.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn btn-md btn-primary">
              <Home size={15} /> Back to home
            </Link>
            <Link to="/calculators" className="btn btn-md btn-outline">
              <Search size={15} /> Browse calculators
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13.5px]">
            {[
              { to: '/about', label: 'About' },
              { to: '/home-loans', label: 'Home Loans' },
              { to: '/guides', label: 'Tips & Guides' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="card p-3 hover:border-primary-300 transition-colors text-ink-700 hover:text-primary-700 font-semibold">
                {l.label} <ArrowRight size={12} className="inline ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageWrapper>
  )
}
