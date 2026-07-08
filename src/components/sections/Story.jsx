import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Timeline from '../Timeline'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function Story() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-story-line]')

      gsap.set([eyebrowRef.current, introRef.current], { autoAlpha: 0, y: 22 })
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })

      const timeline = gsap.timeline({
        defaults: { duration: 0.95, ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

      timeline
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0 })
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.16 }, '-=0.48')
        .to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.82 }, '-=0.42')
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="story-paper relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="story"
      ref={sectionRef}
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-transparent via-ivory/80 to-ivory"
        aria-hidden="true"
      />

      <div className="story-sparkle left-[14%] top-[18%]" aria-hidden="true" />
      <div className="story-sparkle right-[12%] top-[32%]" aria-hidden="true" />
      <div className="story-sparkle bottom-[22%] left-[18%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            Our Journey
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.25rem,8vw,7.4rem)] font-medium leading-[0.92] text-ink"
            ref={titleRef}
          >
            <span className="block" data-story-line>
              Every Love Story
            </span>
            <span className="block" data-story-line>
              is Beautiful.
            </span>
            <span className="mt-5 block text-ink/82" data-story-line>
              But Ours
            </span>
            <span className="block text-ink/82" data-story-line>
              is My Favorite.
            </span>
          </h2>

          <p
            className="mx-auto mt-9 max-w-2xl font-serif text-xl leading-9 text-ink/68 sm:text-2xl sm:leading-10"
            ref={introRef}
          >
            From one quiet conversation to a lifetime of promises, their story
            unfolded gently, beautifully, and exactly as it was meant to.
          </p>
        </div>

        <Timeline />
      </div>
    </section>
  )
}

export default Story
