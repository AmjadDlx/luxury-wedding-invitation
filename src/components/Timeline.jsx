import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaCoffee, FaMountain, FaRing, FaInfinity } from 'react-icons/fa'
import TimelineCard from './TimelineCard'
import TimelineLine from './TimelineLine'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import useWeddingContent from '../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  coffee: FaCoffee,
  infinity: FaInfinity,
  mountain: FaMountain,
  ring: FaRing,
}

function Timeline() {
  const { content: weddingData } = useWeddingContent()
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const cardsRef = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      cardsRef.current.forEach((card) => card?.classList.add('is-visible'))
      return undefined
    }

    const context = gsap.context(() => {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: '50% 0%' })
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 68%',
          end: 'bottom 58%',
          scrub: 1.1,
        },
      })

      cardsRef.current.forEach((card, index) => {
        if (!card) {
          return
        }

        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 42, scale: 0.96 },
          {
            autoAlpha: 0.7,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
            },
          },
        )

        gsap.to(card, {
          y: index % 2 === 0 ? -8 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        })

        ScrollTrigger.create({
          trigger: card,
          start: 'top 52%',
          end: 'bottom 48%',
          onEnter: () => {
            card.classList.add('is-active')
            gsap.to(card, { autoAlpha: 1, scale: 1.025, duration: 0.45, ease: 'power2.out' })
          },
          onEnterBack: () => {
            card.classList.add('is-active')
            gsap.to(card, { autoAlpha: 1, scale: 1.025, duration: 0.45, ease: 'power2.out' })
          },
          onLeave: () => {
            card.classList.remove('is-active')
            gsap.to(card, { autoAlpha: 0.7, scale: 1, duration: 0.45, ease: 'power2.out' })
          },
          onLeaveBack: () => {
            card.classList.remove('is-active')
            gsap.to(card, { autoAlpha: 0.7, scale: 1, duration: 0.45, ease: 'power2.out' })
          },
        })
      })
    }, timelineRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <div
      className="relative mx-auto mt-24 max-w-5xl pl-8 sm:mt-28 md:pl-0 lg:mt-32"
      ref={timelineRef}
    >
      <TimelineLine ref={lineRef} />

      <div className="grid gap-10 md:gap-12">
        {weddingData.story.map((milestone, index) => (
          <TimelineCard
            align={index % 2 === 0 ? 'left' : 'right'}
            description={milestone.description}
            Icon={icons[milestone.icon]}
            key={milestone.year}
            ref={(card) => {
              cardsRef.current[index] = card
            }}
            title={milestone.title}
            year={milestone.year}
          />
        ))}
      </div>
    </div>
  )
}

export default Timeline
