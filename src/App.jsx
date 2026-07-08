import { Suspense, lazy, useCallback, useState } from 'react'
import AmbientEffects from './components/ambient/AmbientEffects'
import LuxuryLoader from './components/LuxuryLoader'
import ContentEditor from './components/editor/ContentEditor'
import MobileLife from './components/MobileLife'
import MobileReveal from './components/MobileReveal'
import MouseGlow from './components/MouseGlow'
import TouchGlow from './components/TouchGlow'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import WeddingContentProvider from './context/WeddingContentProvider'
import useLenisScroll from './hooks/useLenisScroll'

const Story = lazy(() => import('./components/sections/Story'))
const Couple = lazy(() => import('./components/sections/Couple'))
const Countdown = lazy(() => import('./components/sections/Countdown'))
const Gallery = lazy(() => import('./components/gallery/Gallery'))
const Events = lazy(() => import('./components/events/Events'))
const Venue = lazy(() => import('./components/venue/Venue'))
const RSVP = lazy(() => import('./components/rsvp/RSVP'))
const Finale = lazy(() => import('./components/finale/Finale'))

function SectionFallback() {
  return (
    <div className="section-fallback" role="status" aria-live="polite" aria-label="Loading next section">
      <span />
    </div>
  )
}

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const handleIntroComplete = useCallback(() => setIsIntroComplete(true), [])
  const isEditor = window.location.pathname === '/edit'
  const sections = [
    Story,
    Couple,
    Countdown,
    Gallery,
    Events,
    Venue,
    RSVP,
    Finale,
  ]

  useLenisScroll({ disabled: isEditor })

  if (isEditor) {
    return (
      <WeddingContentProvider>
        <ContentEditor />
      </WeddingContentProvider>
    )
  }

  return (
    <WeddingContentProvider>
      <main className="min-h-screen bg-ivory text-ink">
        <LuxuryLoader onComplete={handleIntroComplete} />
        <div className={isIntroComplete ? 'site-ready' : 'site-preloading'} aria-hidden={!isIntroComplete}>
          <AmbientEffects />
          <MobileLife />
          <MobileReveal />
          <MouseGlow />
          <TouchGlow />
          <Navbar />
          <Hero />
          {sections.map((Section, index) => (
            <Suspense fallback={<SectionFallback />} key={index}>
              <Section />
            </Suspense>
          ))}
        </div>
      </main>
    </WeddingContentProvider>
  )
}

export default App
