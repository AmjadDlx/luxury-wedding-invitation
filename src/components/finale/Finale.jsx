import { memo, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CelebrationParticles from './CelebrationParticles'
import Signature from './Signature'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

const finaleParticleGroups = ['left-[12%] top-[18%]', 'right-[14%] top-[28%]', 'left-[24%] bottom-[18%]']

function Finale() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const closingRef = useRef(null)
  const signatureRef = useRef(null)
  const actionRef = useRef(null)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const finale = weddingData.finale

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const section = sectionRef.current
    const progressBar = document.querySelector('.scroll-progress')

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-finale-line]')
      const revealItems = [
        eyebrowRef.current,
        descriptionRef.current,
        closingRef.current,
        signatureRef.current,
        actionRef.current,
      ]

      gsap.set(revealItems, { autoAlpha: 0, y: 24 })
      gsap.set(titleLines, { autoAlpha: 0, y: 40 })
      gsap.set(actionRef.current, { y: 18 })

      gsap
        .timeline({
          defaults: { duration: 0.95, ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
          onComplete: () => setIsCelebrating(true),
        })
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0 })
        .to(titleLines, { autoAlpha: 1, y: 0, stagger: 0.14 }, '-=0.42')
        .to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.28')
        .to(closingRef.current, { autoAlpha: 1, y: 0, duration: 0.78 }, '-=0.18')
        .to(signatureRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.04')
        .to(actionRef.current, { autoAlpha: 1, y: 0, duration: 0.72 }, '-=0.18')

      if (progressBar) {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          onEnter: () => gsap.to(progressBar, { autoAlpha: 0, duration: 0.75, ease: 'power2.out' }),
          onLeaveBack: () =>
            gsap.to(progressBar, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }),
        })
      }
    }, section)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <section
      className="finale-section relative isolate overflow-hidden px-6 py-32 text-center text-ink sm:px-8 sm:py-40 lg:py-52"
      id="finale"
      ref={sectionRef}
    >
      <div className="finale-halo left-[-8rem] top-[8%]" aria-hidden="true" />
      <div className="finale-halo right-[-10rem] bottom-[5%]" aria-hidden="true" />
      {finaleParticleGroups.map((position) => (
        <div className={`finale-petal-field ${position}`} key={position} aria-hidden="true" />
      ))}
      <CelebrationParticles isActive={isCelebrating} />

      <div className="relative z-10 mx-auto max-w-[900px]">
        <p
          className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-gold"
          ref={eyebrowRef}
        >
          {finale.eyebrow}
        </p>

        <h2
          className="mt-6 font-serif text-[clamp(3.8rem,8.2vw,8.5rem)] font-medium leading-[0.88] text-ink"
          ref={titleRef}
        >
          {finale.title.map((line, index) => (
            <span
              className={`block ${index === finale.title.length - 1 ? 'text-ink/78' : ''}`}
              data-finale-line
              key={line}
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          className="mx-auto mt-9 max-w-3xl text-base leading-8 text-ink/64 sm:text-lg sm:leading-9"
          ref={descriptionRef}
        >
          {finale.description}
        </p>

        <p
          className="mx-auto mt-6 max-w-2xl font-serif text-2xl leading-9 text-ink/70 sm:text-3xl sm:leading-10"
          ref={closingRef}
        >
          {finale.closingNote}
        </p>

        <Signature signatureRef={signatureRef}>{finale.signature}</Signature>

        <div className="mt-12" ref={actionRef}>
          <a className="finale-action" href="#home">
            <span>{finale.ctaLabel}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default memo(Finale)
