import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { memo, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function Lightbox({ activeIndex, images, onClose, onNext, onPrevious }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const touchStartRef = useRef(null)
  const previousFocusRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const activeImage = activeIndex === null ? null : images[activeIndex]

  useEffect(() => {
    if (activeIndex === null) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft') {
        onPrevious()
      }

      if (event.key === 'ArrowRight') {
        onNext()
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(focusableSelector)

        if (!focusable?.length) {
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)

      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [activeIndex, onClose, onNext, onPrevious])

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) {
      return
    }

    const delta = event.changedTouches[0].clientX - touchStartRef.current

    if (Math.abs(delta) > 48) {
      if (delta > 0) {
        onPrevious()
      } else {
        onNext()
      }
    }

    touchStartRef.current = null
  }

  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Wedding gallery lightbox"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/72 px-4 py-8 backdrop-blur-2xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
          transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
        >
          <button
            aria-label="Close gallery"
            className="lightbox-control absolute right-5 top-5"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>

          <button
            aria-label="Previous image"
            className="lightbox-control absolute left-4 top-1/2 hidden -translate-y-1/2 sm:grid"
            onClick={onPrevious}
            type="button"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <motion.figure
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-6xl"
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 18 }}
            key={activeImage.id}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.9 }}
          >
            <img
              alt={activeImage.alt}
              className="mx-auto max-h-[78vh] w-full rounded-[1.5rem] object-contain shadow-[0_36px_120px_rgba(0,0,0,0.5)]"
              decoding="async"
              height="1600"
              src={activeImage.src}
              width="1200"
            />
            <figcaption className="mx-auto mt-5 max-w-2xl text-center font-serif text-xl leading-8 text-white/72">
              {activeImage.alt}
            </figcaption>
          </motion.figure>

          <button
            aria-label="Next image"
            className="lightbox-control absolute right-4 top-1/2 hidden -translate-y-1/2 sm:grid"
            onClick={onNext}
            type="button"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(Lightbox)
