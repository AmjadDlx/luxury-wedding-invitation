import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineItem from './TimelineItem'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function Timeline({ events }) {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const cardRefs = useRef([])
  const nodeRefs = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean)
      const nodes = nodeRefs.current.filter(Boolean)
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(nodes, { autoAlpha: 0, scale: 0.76 })
      cards.forEach((card, index) => {
        gsap.set(card, {
          autoAlpha: 0,
          x: isDesktop ? (index % 2 === 0 ? -42 : 42) : 0,
          y: 36,
        })
      })

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 78%',
          end: 'bottom 42%',
          scrub: 1.1,
        },
      })

      cards.forEach((card, index) => {
        const node = nodes[index]

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
            },
          })
          .to(node, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.62,
            ease: 'back.out(1.7)',
          })
          .to(
            card,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.86,
              ease: 'power3.out',
            },
            '-=0.34',
          )
          .add(() => node?.classList.add('is-revealed'), '-=0.18')
      })
    }, timelineRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <div
      aria-label="Wedding celebration timeline"
      className="events-timeline relative mx-auto mt-18 max-w-5xl sm:mt-24 lg:mt-28"
      ref={timelineRef}
    >
      <div
        className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 overflow-hidden bg-gold/18"
        aria-hidden="true"
      >
        <div className="events-line-fill h-full w-full origin-top bg-gradient-to-b from-gold/20 via-gold to-gold/20" ref={lineRef} />
      </div>

      <div className="relative space-y-14 sm:space-y-16 lg:space-y-0">
        {events.map((event, index) => (
          <TimelineItem
            event={event}
            index={index}
            key={event.id}
            ref={(element) => {
              cardRefs.current[index] = element?.card ?? null
              nodeRefs.current[index] = element?.node ?? null
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(Timeline)
