import { forwardRef, memo, useEffect, useRef, useState } from 'react'

const heightClass = {
  medium: 'aspect-[4/5]',
  short: 'aspect-[5/4]',
  tall: 'aspect-[3/4]',
}

const imageDimensions = {
  medium: { height: 1500, width: 1200 },
  short: { height: 960, width: 1200 },
  tall: { height: 1600, width: 1200 },
}

const GalleryItem = memo(
  forwardRef(function GalleryItem({ image, index, onOpen }, ref) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const itemRef = useRef(null)

    useEffect(() => {
      const item = itemRef.current

      if (!item) {
        return undefined
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { rootMargin: '360px 0px' },
      )

      observer.observe(item)

      return () => observer.disconnect()
    }, [])

    const setRefs = (node) => {
      itemRef.current = node

      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <button
        aria-label={`Open image ${index + 1}: ${image.alt}`}
        className="gallery-item group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-[1.45rem] border border-white/58 bg-white/38 text-left shadow-[0_24px_80px_rgba(68,48,16,0.1)] outline-none transition-all duration-500 hover:-translate-y-1 hover:border-gold/54 hover:shadow-[0_30px_96px_rgba(212,175,55,0.18)] focus-visible:border-gold/70 focus-visible:ring-2 focus-visible:ring-gold/45"
        onClick={() => onOpen(index)}
        ref={setRefs}
        type="button"
      >
        {!isLoaded && <span className="gallery-skeleton absolute inset-0" />}
        <span className={`block w-full overflow-hidden ${heightClass[image.height]}`}>
          {isVisible && (
            <img
              alt={image.alt}
              className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] ${
                isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
              }`}
              decoding="async"
              height={imageDimensions[image.height].height}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw"
              src={image.src}
              width={imageDimensions[image.height].width}
            />
          )}
        </span>
      </button>
    )
  }),
)

export default GalleryItem
