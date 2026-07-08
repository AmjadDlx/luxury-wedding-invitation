import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryGrid from './GalleryGrid'
import Lightbox from './Lightbox'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import useWeddingContent from '../../context/useWeddingContent'

gsap.registerPlugin(ScrollTrigger)

function Gallery() {
  const { content: weddingData } = useWeddingContent()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const galleryCopy = weddingData.galleryIntro
  const galleryLength = weddingData.gallery.length

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const titleLines = titleRef.current.querySelectorAll('[data-gallery-line]')

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

  const handleOpen = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const handleClose = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const handlePrevious = useCallback(() => {
    setActiveIndex((index) =>
      index === null
        ? null
        : (index - 1 + galleryLength) % galleryLength,
    )
  }, [galleryLength])

  const handleNext = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % galleryLength,
    )
  }, [galleryLength])

  return (
    <section
      className="gallery-section relative isolate overflow-hidden px-6 py-28 text-ink sm:px-8 sm:py-36 lg:py-44"
      id="gallery"
      ref={sectionRef}
    >
      <div className="gallery-dust left-[11%] top-[16%]" aria-hidden="true" />
      <div className="gallery-dust right-[16%] top-[34%]" aria-hidden="true" />
      <div className="gallery-dust bottom-[22%] left-[18%]" aria-hidden="true" />
      <div className="gallery-dust bottom-[18%] right-[24%]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
            ref={eyebrowRef}
          >
            {galleryCopy.eyebrow}
          </p>

          <h2
            className="mt-6 font-serif text-[clamp(3.5rem,8vw,7.2rem)] font-medium leading-[0.9] text-ink"
            ref={titleRef}
          >
            {galleryCopy.title.map((line, index) => (
              <span
                className={`block ${index === galleryCopy.title.length - 1 ? 'text-ink/82' : ''}`}
                data-gallery-line
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
            {galleryCopy.description}
          </p>
        </div>

        <GalleryGrid images={weddingData.gallery} onOpen={handleOpen} />
      </div>

      <Lightbox
        activeIndex={activeIndex}
        images={weddingData.gallery}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </section>
  )
}

export default Gallery
