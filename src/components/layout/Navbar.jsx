import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

const navItems = ['Home', 'Story', 'Events', 'Gallery', 'Venue', 'RSVP']

function Navbar() {
  const { content: weddingData } = useWeddingContent()
  const navRef = useRef(null)
  const frameRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateNavigation = () => {
      const scrollProgress = Math.min(window.scrollY / 220, 1)
      const nav = navRef.current

      if (nav) {
        nav.style.setProperty('--nav-bg-opacity', String(0.1 + scrollProgress * 0.82))
        nav.style.setProperty('--nav-blur', `${18 + scrollProgress * 10}px`)
        nav.style.setProperty('--nav-shadow-opacity', String(0.12 + scrollProgress * 0.06))
      }

      setIsScrolled(window.scrollY > 18)
      frameRef.current = 0
    }

    const handleScroll = () => {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateNavigation)
      }
    }

    updateNavigation()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all sm:px-7 ${
          isScrolled
            ? 'border-gold/15 shadow-[0_18px_60px_rgba(23,19,13,0.08)]'
            : 'border-white/20 shadow-[0_18px_80px_rgba(0,0,0,var(--nav-shadow-opacity))]'
        }`}
        ref={navRef}
        style={{
          backdropFilter: `blur(var(--nav-blur, 18px))`,
          backgroundColor: `rgba(255, 255, 255, var(--nav-bg-opacity, 0.1))`,
          transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
        }}
      >
        <a
          href="#home"
          className={`font-script text-3xl leading-none text-gold transition-colors duration-700 sm:text-4xl ${
            isScrolled ? 'drop-shadow-none' : 'drop-shadow-[0_3px_14px_rgba(0,0,0,0.28)]'
          }`}
          aria-label={`${weddingData.couple.bride} and ${weddingData.couple.groom} home`}
        >
          {weddingData.couple.bride.charAt(0)} &amp; {weddingData.couple.groom.charAt(0)}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              className={`nav-link relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.26em] transition-all duration-500 hover:-translate-y-0.5 ${
                isScrolled ? 'text-ink/70 hover:text-gold' : 'text-white/78 hover:text-champagne'
              }`}
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition-all duration-500 lg:hidden ${
            isScrolled
              ? 'border-gold/30 text-ink/70'
              : 'border-white/25 text-white/82'
          }`}
          href="#rsvp"
        >
          RSVP
        </a>
      </nav>
    </header>
  )
}

export default Navbar
