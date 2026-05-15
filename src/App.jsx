import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './components/utility/ScrollToTop.jsx'
import ErrorBoundary from './components/utility/ErrorBoundary.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const HomeLoans = lazy(() => import('./pages/HomeLoans.jsx'))
const BuyingHome = lazy(() => import('./pages/home-loans/BuyingHome.jsx'))
const FirstHomeBuyer = lazy(() => import('./pages/home-loans/FirstHomeBuyer.jsx'))
const OffPlan = lazy(() => import('./pages/home-loans/OffPlan.jsx'))
const Refinancing = lazy(() => import('./pages/home-loans/Refinancing.jsx'))
const Investing = lazy(() => import('./pages/home-loans/Investing.jsx'))
const LoanTypes = lazy(() => import('./pages/home-loans/LoanTypes.jsx'))
const LoanFeatures = lazy(() => import('./pages/home-loans/LoanFeatures.jsx'))
const Calculators = lazy(() => import('./pages/Calculators.jsx'))
const CalculatorDetail = lazy(() => import('./pages/CalculatorDetail.jsx'))
const Lenders = lazy(() => import('./pages/Lenders.jsx'))
const Testimonials = lazy(() => import('./pages/Testimonials.jsx'))
const FAQ = lazy(() => import('./pages/FAQ.jsx'))
const Guides = lazy(() => import('./pages/Guides.jsx'))
const GuideDetail = lazy(() => import('./pages/GuideDetail.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const GetStarted = lazy(() => import('./pages/GetStarted.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-ink-200 border-t-primary-700 animate-spin" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/home-loans" element={<HomeLoans />} />
              <Route path="/home-loans/buying-a-home" element={<BuyingHome />} />
              <Route path="/home-loans/becoming-a-first-home-buyer" element={<FirstHomeBuyer />} />
              <Route path="/home-loans/buying-off-the-plan" element={<OffPlan />} />
              <Route path="/home-loans/refinancing-your-home-loan" element={<Refinancing />} />
              <Route path="/home-loans/investing-in-property" element={<Investing />} />
              <Route path="/home-loans/different-loan-types" element={<LoanTypes />} />
              <Route path="/home-loans/typical-loan-features" element={<LoanFeatures />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/calculators/:slug" element={<CalculatorDetail />} />
              <Route path="/lenders" element={<Lenders />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:slug" element={<GuideDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
