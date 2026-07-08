import { useEffect } from 'react'
import Lenis from 'lenis'
import usePrefersReducedMotion from './usePrefersReducedMotion'

function useLenisScroll({ disabled = false } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (disabled || prefersReducedMotion || isTouchDevice) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.16,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.86,
    })

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [disabled, prefersReducedMotion])
}

export default useLenisScroll
