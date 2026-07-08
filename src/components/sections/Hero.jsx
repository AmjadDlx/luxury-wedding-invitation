import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from '../Button'
import ParticleBackground from '../ParticleBackground'
import ScrollIndicator from '../ScrollIndicator'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

function Hero() {
  const { content: weddingData } = useWeddingContent()
  const heroRef = useRef(null)
  const backgroundRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  const namesRef = useRef(null)
  const ampersandRef = useRef(null)
  const detailsRef = useRef(null)
  const buttonRef = useRef(null)
  const indicatorRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            backgroundRef.current,
            headingRef.current,
            namesRef.current,
            detailsRef.current,
            buttonRef.current,
            indicatorRef.current,
            ampersandRef.current,
          ],
          { autoAlpha: 1, clearProps: 'transform' },
        )
        gsap.set(imageRef.current, { scale: 1 })
        return
      }

      gsap.set(
        [
          backgroundRef.current,
          headingRef.current,
          namesRef.current,
          detailsRef.current,
          buttonRef.current,
          indicatorRef.current,
        ],
        { autoAlpha: 0 },
      )

      gsap.set(namesRef.current, { y: 44 })
      gsap.set([headingRef.current, detailsRef.current, buttonRef.current], { y: 18 })
      gsap.set(indicatorRef.current, { y: -8 })
      gsap.set(imageRef.current, { scale: 1.08 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      timeline
        .to(backgroundRef.current, { autoAlpha: 1, duration: 1.4 })
        .to(imageRef.current, { scale: 1, duration: 7, ease: 'power1.out' }, '<')
        .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.65')
        .to(namesRef.current, { autoAlpha: 1, y: 0, duration: 1.15 }, '-=0.42')
        .fromTo(
          ampersandRef.current,
          { autoAlpha: 0, scale: 0.88, rotation: -3 },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.05 },
          '-=0.78',
        )
        .to(detailsRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.38')
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.28')
        .to(indicatorRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.18')
    }, heroRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) {
      return undefined
    }

    const moveBackground = gsap.quickTo(backgroundRef.current, 'x', {
      duration: 0.7,
      ease: 'power3.out',
    })
    const moveContent = gsap.quickTo(contentRef.current, 'x', {
      duration: 0.8,
      ease: 'power3.out',
    })
    const liftBackground = gsap.quickTo(backgroundRef.current, 'y', {
      duration: 0.7,
      ease: 'power3.out',
    })
    const liftContent = gsap.quickTo(contentRef.current, 'y', {
      duration: 0.8,
      ease: 'power3.out',
    })

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2

      moveBackground(x * 4)
      liftBackground(y * 4)
      moveContent(x * -3)
      liftContent(y * -3)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [prefersReducedMotion])

  return (
    <section
      className="relative isolate flex min-h-screen overflow-hidden bg-ivory"
      id="home"
      ref={heroRef}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,231,191,0.4),rgba(255,253,247,0.98)_68%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 opacity-0" ref={backgroundRef}>
        <img
          alt=""
          className="h-full w-full object-cover blur-[1.5px] will-change-transform"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          ref={imageRef}
          src={weddingData.hero.image}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <ParticleBackground />

      <div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-28 text-center will-change-transform sm:px-8"
        ref={contentRef}
      >
        <div className="max-w-5xl">
          <p
            className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-champagne sm:text-xs"
            ref={headingRef}
          >
            Together with their families
          </p>

          <h1
            className="mt-8 font-serif text-[clamp(4.5rem,15vw,13rem)] font-medium leading-[0.78] text-white drop-shadow-[0_18px_50px_rgba(0,0,0,0.42)]"
            ref={namesRef}
          >
            <span className="block">{weddingData.couple.bride}</span>
            <span
              className="mx-auto my-4 block font-script text-[0.72em] leading-none text-gold drop-shadow-[0_10px_34px_rgba(212,175,55,0.38)] sm:my-6"
              ref={ampersandRef}
            >
              &amp;
            </span>
            <span className="block">{weddingData.couple.groom}</span>
          </h1>

          <div
            className="mx-auto mt-8 max-w-2xl text-white/82 sm:mt-10"
            ref={detailsRef}
          >
            <p className="font-serif text-2xl font-medium sm:text-3xl">
              {weddingData.hero.subtitle}
            </p>
            <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-champagne sm:text-sm">
              {weddingData.displayDate}
            </p>
          </div>

          <div className="mt-10 sm:mt-12" ref={buttonRef}>
            <Button href="#invitation">Open Invitation</Button>
          </div>
        </div>
      </div>

      <div ref={indicatorRef}>
        <ScrollIndicator />
      </div>
    </section>
  )
}

export default Hero
