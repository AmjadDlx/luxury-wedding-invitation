import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PersonCard from '../PersonCard'
import Ornament from '../Ornament'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function Couple() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const ornamentRef = useRef(null)
  const personRefs = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const [brideProfile, groomProfile] = weddingData.couple.profiles
  const { key: brideKey, ...brideProps } = brideProfile
  const { key: groomKey, ...groomProps } = groomProfile

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-couple-line]')
      const cards = personRefs.current.filter(Boolean)

      gsap.set([eyebrowRef.current, introRef.current, ornamentRef.current], {
        autoAlpha: 0,
        y: 22,
      })
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })
      gsap.set(cards, { autoAlpha: 0, y: 48, scale: 0.97 })

      const introTimeline = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

      introTimeline
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0 })
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.14 }, '-=0.45')
        .to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.34')
        .to(cards, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.16 }, '-=0.2')
        .to(ornamentRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.32')

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index === 0 ? -8 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        })

        const detailCards = card.querySelectorAll('[data-detail-card]')

        gsap.fromTo(
          detailCards,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 68%',
            },
          },
        )
      })
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="couple-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="couple"
      ref={sectionRef}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ivory to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent"
        aria-hidden="true"
      />

      <div className="couple-petal left-[9%] top-[22%]" aria-hidden="true" />
      <div className="couple-petal right-[11%] top-[18%]" aria-hidden="true" />
      <div className="couple-petal bottom-[18%] left-[18%]" aria-hidden="true" />
      <div className="couple-petal bottom-[26%] right-[18%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            The Couple
          </p>
          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            <span className="block" data-couple-line>
              Two Hearts.
            </span>
            <span className="block text-ink/82" data-couple-line>
              One Forever.
            </span>
          </h2>
          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-ink/64 sm:text-lg sm:leading-9"
            ref={introRef}
          >
            {weddingData.couple.intro}
          </p>
        </div>

        <div className="relative mt-20 grid items-start gap-16 lg:mt-28 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <PersonCard
            key={brideKey}
            {...brideProps}
            ref={(card) => {
              personRefs.current[0] = card
            }}
          />
          <Ornament ref={ornamentRef} />
          <PersonCard
            key={groomKey}
            {...groomProps}
            ref={(card) => {
              personRefs.current[1] = card
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Couple
