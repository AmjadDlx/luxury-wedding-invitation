import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VenueInfo from './VenueInfo'
import VenueMap from './VenueMap'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function Venue() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const imageRef = useRef(null)
  const mediaRef = useRef(null)
  const cardRefs = useRef([])
  const actionsRef = useRef(null)
  const mapRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { venue } = weddingData

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-venue-line]')
      const cards = cardRefs.current.filter(Boolean)

      gsap.set([eyebrowRef.current, introRef.current], { autoAlpha: 0, y: 24 })
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })
      gsap.set(mediaRef.current, { autoAlpha: 0, scale: 0.96, y: 34 })
      gsap.set(cards, { autoAlpha: 0, y: 30 })
      gsap.set([actionsRef.current, mapRef.current], { autoAlpha: 0, y: 24 })

      gsap
        .timeline({
          defaults: { duration: 0.9, ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        })
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0 })
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.14 }, '-=0.42')
        .to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.78 }, '-=0.32')
        .to(mediaRef.current, { autoAlpha: 1, scale: 1, y: 0, duration: 1 }, '-=0.08')
        .to(cards, { autoAlpha: 1, y: 0, stagger: 0.08 }, '-=0.54')
        .to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.72 }, '-=0.3')
        .to(mapRef.current, { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.24')

      gsap.to(imageRef.current, {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: mediaRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="venue-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="venue"
      ref={sectionRef}
    >
      <div className="venue-light left-[8%] top-[10%]" aria-hidden="true" />
      <div className="venue-light right-[10%] top-[35%]" aria-hidden="true" />
      <div className="venue-dust left-[16%] top-[18%]" aria-hidden="true" />
      <div className="venue-dust right-[18%] top-[28%]" aria-hidden="true" />
      <div className="venue-dust bottom-[22%] left-[24%]" aria-hidden="true" />
      <div className="venue-dust bottom-[18%] right-[26%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1220px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            {venue.intro.eyebrow}
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            {venue.intro.title.map((line, index) => (
              <span
                className={`block ${index === venue.intro.title.length - 1 ? 'text-ink/82' : ''}`}
                data-venue-line
                key={line}
              >
                {line}
              </span>
            ))}
          </h2>

          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-ink/64 sm:text-lg sm:leading-9"
            ref={introRef}
          >
            {venue.intro.description}
          </p>
        </div>

        <div className="mt-16 grid items-start gap-8 sm:mt-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] lg:gap-12">
          <figure
            className="venue-image-frame group relative overflow-hidden rounded-[1.65rem] border border-white/58 bg-white/36 shadow-[0_34px_110px_rgba(65,45,12,0.14)]"
            ref={mediaRef}
          >
            <img
              alt={venue.imageAlt}
              className="h-[28rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.018] sm:h-[36rem] lg:h-[44rem]"
              decoding="async"
              height="1200"
              loading="lazy"
              ref={imageRef}
              sizes="(min-width: 1024px) 55vw, 92vw"
              src={venue.image}
              width="1800"
            />
          </figure>

          <VenueInfo
            actionsRef={actionsRef}
            cardRefs={cardRefs}
            venue={venue}
          />
        </div>

        <VenueMap ref={mapRef} venue={venue} />
      </div>
    </section>
  )
}

export default Venue
