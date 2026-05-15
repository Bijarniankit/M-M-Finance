import { Component } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="card p-8 max-w-md w-full text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={26} />
            </div>
            <h2 className="mt-4 text-[22px] font-bold text-ink-900">Something went wrong</h2>
            <p className="mt-2 text-[14.5px] text-ink-600 leading-relaxed">
              An unexpected error occurred. Please refresh the page or return home.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-md btn-primary"
              >
                Refresh page
              </button>
              <Link to="/" className="btn btn-md btn-outline">
                Go to home <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}