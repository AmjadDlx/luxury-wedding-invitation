import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountdownCard from '../CountdownCard'
import WeddingDetails from '../WeddingDetails'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function getTimeRemaining(date) {
  const weddingDate = new Date(date)
  const difference = Math.max(weddingDate.getTime() - Date.now(), 0)
  const totalSeconds = Math.floor(difference / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function Countdown() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const countdownRef = useRef(null)
  const detailsRef = useRef(null)
  const actionsRef = useRef(null)
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(weddingData.date))
  const prefersReducedMotion = usePrefersReducedMotion()

  const countdownItems = useMemo(
    () => [
      { label: 'Days', value: timeRemaining.days },
      { label: 'Hours', value: timeRemaining.hours },
      { label: 'Minutes', value: timeRemaining.minutes },
      { label: 'Seconds', value: timeRemaining.seconds },
    ],
    [timeRemaining],
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining(weddingData.date))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [weddingData.date])

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-countdown-line]')

      gsap.set(
        [
          eyebrowRef.current,
          introRef.current,
          countdownRef.current,
          detailsRef.current,
          actionsRef.current,
        ],
        { autoAlpha: 0, y: 28 },
      )
      gsap.set(titleLines, { autoAlpha: 0, y: 34 })

      gsap
        .timeline({
          defaults: { duration: 0.86, ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        })
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0 })
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.14 }, '-=0.42')
        .to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.78 }, '-=0.32')
        .to(countdownRef.current, { autoAlpha: 1, y: 0 }, '-=0.2')
        .to(detailsRef.current, { autoAlpha: 1, y: 0 }, '-=0.3')
        .to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.72 }, '-=0.32')
    }, sectionRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="countdown-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="countdown"
      ref={sectionRef}
    >
      <div className="countdown-particle left-[12%] top-[18%]" aria-hidden="true" />
      <div className="countdown-particle right-[13%] top-[26%]" aria-hidden="true" />
      <div className="countdown-particle bottom-[20%] left-[23%]" aria-hidden="true" />
      <div className="countdown-particle bottom-[26%] right-[22%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            Save the Date
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            <span className="block" data-countdown-line>
              The Countdown
            </span>
            <span className="block text-ink/82" data-countdown-line>
              Has Begun.
            </span>
          </h2>

          <p
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-ink/64 sm:text-lg sm:leading-9"
            ref={introRef}
          >
            {weddingData.countdown.intro}
          </p>
        </div>

        <time
          className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4 lg:gap-6"
          dateTime={weddingData.date}
          ref={countdownRef}
        >
          {countdownItems.map((item) => (
            <CountdownCard key={item.label} label={item.label} value={item.value} />
          ))}
        </time>

        <div ref={detailsRef}>
          <WeddingDetails />
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          ref={actionsRef}
        >
          <a className="countdown-action" href="#calendar">
            Add to Calendar
          </a>
          <a className="countdown-action" href="#venue">
            View Venue
          </a>
        </div>
      </div>
    </section>
  )
}

export default Countdown
