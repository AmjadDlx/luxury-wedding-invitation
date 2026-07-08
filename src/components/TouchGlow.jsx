import { memo, useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

function TouchGlow() {
  const layerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion({ includeTouchDevices: false })
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    const updateCapability = () => {
      setIsEnabled(!prefersReducedMotion && coarsePointerQuery.matches)
    }

    updateCapability()
    coarsePointerQuery.addEventListener('change', updateCapability)

    return () => coarsePointerQuery.removeEventListener('change', updateCapability)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isEnabled) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (event.pointerType === 'mouse') {
        return
      }

      const glow = document.createElement('span')
      glow.className = 'touch-glow-dot'
      glow.style.left = `${event.clientX}px`
      glow.style.top = `${event.clientY}px`
      layerRef.current?.appendChild(glow)
      glow.addEventListener('animationend', () => glow.remove(), { once: true })
    }

    window.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  return <div className="touch-glow-layer" ref={layerRef} aria-hidden="true" />
}

export default memo(TouchGlow)
