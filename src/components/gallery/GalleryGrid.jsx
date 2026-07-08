import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryItem from './GalleryItem'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function GalleryGrid({ images, onOpen }) {
  const gridRef = useRef(null)
  const itemRefs = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean)

      gsap.fromTo(
        items,
        { autoAlpha: 0, filter: 'blur(18px)', scale: 0.96, y: 34 },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 76%',
          },
        },
      )

      items.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -8 : 7,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        })
      })
    }, gridRef)

    return () => context.revert()
  }, [prefersReducedMotion])

  return (
    <div
      className="mt-16 columns-1 gap-5 sm:mt-20 md:columns-2 lg:columns-3 xl:gap-6"
      ref={gridRef}
    >
      {images.map((image, index) => (
        <GalleryItem
          image={image}
          index={index}
          key={image.id}
          onOpen={onOpen}
          ref={(item) => {
            itemRefs.current[index] = item
          }}
        />
      ))}
    </div>
  )
}

export default memo(GalleryGrid)
