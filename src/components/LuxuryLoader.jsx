import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import useWeddingContent from '../context/useWeddingContent'

function LuxuryLoader({ onComplete }) {
  const { content: weddingData } = useWeddingContent()
  const loaderRef = useRef(null)
  const ringRef = useRef(null)
  const namesRef = useRef(null)
  const ampersandRef = useRef(null)
  const subtitleRef = useRef(null)
  const progressRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(loaderRef.current, { autoAlpha: 1 })
        gsap.delayedCall(0.18, () => {
          onComplete()
          gsap.to(loaderRef.current, {
            autoAlpha: 0,
            duration: 0.22,
          })
        })
        return
      }

      const ringLength = 2 * Math.PI * 58

      gsap.set(ringRef.current, {
        strokeDasharray: ringLength,
        strokeDashoffset: ringLength,
        transformOrigin: '50% 50%',
        rotation: -90,
      })
      gsap.set([namesRef.current, subtitleRef.current], { autoAlpha: 0, y: 16 })
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: '0% 50%' })
      gsap.set(ampersandRef.current, { '--shine-x': '-140%' })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      timeline
        .to(ringRef.current, { strokeDashoffset: 0, duration: 0.38 })
        .to(progressRef.current, { scaleX: 0.72, duration: 0.34 }, '<')
        .to(namesRef.current, { autoAlpha: 1, y: 0, duration: 0.32 }, '-=0.16')
        .to(ampersandRef.current, { '--shine-x': '140%', duration: 0.48 }, '-=0.18')
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.26 }, '-=0.36')
        .to(progressRef.current, { scaleX: 1, duration: 0.26, ease: 'power2.inOut' }, '-=0.18')
        .call(onComplete)
        .to(loaderRef.current, {
          autoAlpha: 0,
          duration: 0.32,
          ease: 'power2.inOut',
        })
    }, loaderRef)

    return () => context.revert()
  }, [onComplete, prefersReducedMotion])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.92),rgba(245,231,191,0.72)_48%,#fffdf7_100%)] text-ink"
      ref={loaderRef}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.54),rgba(212,175,55,0.12),rgba(255,253,247,0.86))]" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="relative grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 132 132"
            aria-hidden="true"
          >
            <circle
              cx="66"
              cy="66"
              fill="none"
              r="58"
              stroke="rgba(212, 175, 55, 0.18)"
              strokeWidth="0.8"
            />
            <circle
              cx="66"
              cy="66"
              fill="none"
              r="58"
              ref={ringRef}
              stroke="url(#loaderGold)"
              strokeLinecap="round"
              strokeWidth="1.2"
            />
            <defs>
              <linearGradient id="loaderGold" x1="16" x2="116" y1="20" y2="112">
                <stop stopColor="#f7e7aa" />
                <stop offset="0.48" stopColor="#d4af37" />
                <stop offset="1" stopColor="#8d6a19" />
              </linearGradient>
            </defs>
          </svg>

          <div className="font-script text-5xl leading-none text-ink sm:text-6xl" ref={namesRef}>
            <span className="block">{weddingData.couple.bride}</span>
            <span
              className="loader-ampersand block py-1 text-5xl text-gold sm:text-6xl"
              ref={ampersandRef}
            >
              &amp;
            </span>
            <span className="block">{weddingData.couple.groom}</span>
          </div>
        </div>

        <p
          className="mt-8 text-[0.66rem] font-semibold uppercase tracking-[0.38em] text-ink/58"
          ref={subtitleRef}
        >
          Together with their families
        </p>

        <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-gold/16">
          <span className="block h-full w-full origin-left bg-gradient-to-r from-gold/20 via-gold to-gold/20" ref={progressRef} />
        </div>
      </div>
    </div>
  )
}

export default LuxuryLoader
