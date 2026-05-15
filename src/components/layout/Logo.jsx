import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center group" aria-label="M&M Finance — Home">
      <img
        src="/logo.png"
        alt="M&M Finance"
        className="h-14 sm:h-16 md:h-20 w-auto object-contain"
      />
    </Link>
  )
}
