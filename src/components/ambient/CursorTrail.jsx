import { memo, useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const trailCount = 3
const smoothing = 0.18
const trailItems = Array.from({ length: trailCount }, (_, index) => `cursor-trail-${index}`)

function CursorTrail() {
  const trailRefs = useRef([])
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: -200, y: -200 })
  const positionsRef = useRef(
    Array.from({ length: trailCount }, () => ({ x: -200, y: -200 })),
  )
  const prefersReducedMotion = usePrefersReducedMotion()
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const updatePointerCapability = () => setHasFinePointer(finePointerQuery.matches)

    updatePointerCapability()
    finePointerQuery.addEventListener('change', updatePointerCapability)

    return () => finePointerQuery.removeEventListener('change', updatePointerCapability)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) {
      return undefined
    }

    const renderTrail = () => {
      positionsRef.current.forEach((position, index) => {
        const target = index === 0 ? pointerRef.current : positionsRef.current[index - 1]

        position.x += (target.x - position.x) * smoothing
        position.y += (target.y - position.y) * smoothing

        const trail = trailRefs.current[index]

        if (trail) {
          trail.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
        }
      })

      frameRef.current = window.requestAnimationFrame(renderTrail)
    }

    const handlePointerMove = (event) => {
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY
    }

    const handleVisibilityChange = () => {
      if (document.hidden && frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      } else if (!document.hidden && !frameRef.current) {
        frameRef.current = window.requestAnimationFrame(renderTrail)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    frameRef.current = window.requestAnimationFrame(renderTrail)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }
    }
  }, [hasFinePointer, prefersReducedMotion])

  if (prefersReducedMotion || !hasFinePointer) {
    return null
  }

  return (
    <div className="cursor-trail" aria-hidden="true">
      {trailItems.map((item, index) => (
        <span
          className="cursor-trail-dot"
          key={item}
          ref={(element) => {
            trailRefs.current[index] = element
          }}
        />
      ))}
    </div>
  )
}

export default memo(CursorTrail)
