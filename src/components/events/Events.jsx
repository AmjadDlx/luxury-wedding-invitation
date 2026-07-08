import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Timeline from './Timeline'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function Events() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const eventsCopy = weddingData.eventsIntro

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-events-line]')

      gsap.set([eyebrowRef.current, introRef.current], { autoAlpha: 0, y: 24 })
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })

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
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="events-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="events"
      ref={sectionRef}
    >
      <div className="events-dust left-[13%] top-[14%]" aria-hidden="true" />
      <div className="events-dust right-[14%] top-[31%]" aria-hidden="true" />
      <div className="events-dust bottom-[26%] left-[20%]" aria-hidden="true" />
      <div className="events-dust bottom-[18%] right-[28%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            {eventsCopy.eyebrow}
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            {eventsCopy.title.map((line, index) => (
              <span
                className={`block ${index === eventsCopy.title.length - 1 ? 'text-ink/82' : ''}`}
                data-events-line
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
            {eventsCopy.description}
          </p>
        </div>

        <Timeline events={weddingData.events} />
      </div>
    </section>
  )
}

export default Events
