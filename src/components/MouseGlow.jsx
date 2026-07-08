import { memo, useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

function MouseGlow() {
  const glowRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) {
      return undefined
    }

    const updateGlow = () => {
      const glow = glowRef.current

      if (glow) {
        glow.style.transform = `translate3d(${pointerRef.current.x}px, ${pointerRef.current.y}px, 0)`
      }

      frameRef.current = 0
    }

    const handlePointerMove = (event) => {
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateGlow)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return <div className="mouse-glow" ref={glowRef} aria-hidden="true" />
}

export default memo(MouseGlow)
