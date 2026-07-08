import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RSVPForm from './RSVPForm'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function RSVP() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const formRef = useRef(null)
  const fieldRefs = useRef([])
  const buttonRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const rsvpCopy = weddingData.rsvp

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-rsvp-line]')
      const fields = fieldRefs.current.filter(Boolean)

      gsap.set([eyebrowRef.current, introRef.current], { autoAlpha: 0, y: 24 })
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })
      gsap.set(formRef.current, { autoAlpha: 0, scale: 0.97, y: 34 })
      gsap.set(fields, { autoAlpha: 0, y: 22 })
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 18 })

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
        .to(formRef.current, { autoAlpha: 1, scale: 1, y: 0, duration: 0.95 }, '-=0.06')
        .to(fields, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.72 }, '-=0.52')
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.24')
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="rsvp-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="rsvp"
      ref={sectionRef}
    >
      <div className="rsvp-light left-[12%] top-[16%]" aria-hidden="true" />
      <div className="rsvp-light right-[10%] bottom-[12%]" aria-hidden="true" />
      <div className="rsvp-dust left-[18%] top-[22%]" aria-hidden="true" />
      <div className="rsvp-dust right-[18%] top-[34%]" aria-hidden="true" />
      <div className="rsvp-dust bottom-[22%] left-[26%]" aria-hidden="true" />
      <div className="rsvp-dust bottom-[28%] right-[28%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[980px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            {rsvpCopy.intro.eyebrow}
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            {rsvpCopy.intro.title.map((line, index) => (
              <span
                className={`block ${index === rsvpCopy.intro.title.length - 1 ? 'text-ink/82' : ''}`}
                data-rsvp-line
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
            {rsvpCopy.intro.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[720px] sm:mt-18">
          <RSVPForm
            buttonRef={buttonRef}
            copy={rsvpCopy}
            fieldRefs={fieldRefs}
            formRef={formRef}
          />
        </div>
      </div>
    </section>
  )
}

export default RSVP
