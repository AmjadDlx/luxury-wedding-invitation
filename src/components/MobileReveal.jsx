import { memo, useEffect } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const revealSelector = [
  '.person-card',
  '.timeline-card',
  '.countdown-card',
  '.info-card',
  '.gallery-item',
  '.event-card',
  '.venue-card',
  '.venue-image-frame',
  '.venue-map-frame',
  '.rsvp-card',
  '.rsvp-success',
].join(',')

function MobileReveal() {
  const prefersReducedMotion = usePrefersReducedMotion({ includeTouchDevices: false })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (!isTouchDevice || prefersReducedMotion) {
      return undefined
    }

    const observedElements = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-mobile-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08,
      },
    )

    const observeRevealItems = () => {
      document.querySelectorAll(revealSelector).forEach((element) => {
        if (observedElements.has(element)) {
          return
        }

        observedElements.add(element)
        element.classList.add('mobile-reveal')

        window.requestAnimationFrame(() => {
          observer.observe(element)
        })
      })
    }

    const mutationObserver = new MutationObserver(observeRevealItems)

    observeRevealItems()
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      observedElements.forEach((element) => {
        element.classList.remove('mobile-reveal', 'is-mobile-revealed')
      })
      observedElements.clear()
    }
  }, [prefersReducedMotion])

  return null
}

export default memo(MobileReveal)
