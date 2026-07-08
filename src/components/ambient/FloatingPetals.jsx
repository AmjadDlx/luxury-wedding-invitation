import { memo, useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const petalCount = 9
const petalShapes = ['58% 42% 62% 38%', '48% 52% 44% 56%', '68% 32% 54% 46%']

function createPetals() {
  return Array.from({ length: petalCount }, (_, index) => ({
    id: `ambient-petal-${index}`,
    blur: index % 3 === 0 ? '1.1px' : '0.25px',
    borderRadius: petalShapes[index % petalShapes.length],
    delay: `${index * -3.2}s`,
    drift: `${index % 2 === 0 ? 18 : -22}px`,
    duration: `${26 + index * 2.3}s`,
    left: `${8 + index * 10}%`,
    opacity: 0.11 + (index % 3) * 0.025,
    rotation: `${index * 23}deg`,
    returnDrift: `${index % 2 === 0 ? -9 : 11}px`,
    size: `${0.72 + (index % 3) * 0.12}rem`,
    top: `${8 + (index % 5) * 15}%`,
  }))
}

const petals = createPetals()

function FloatingPetals() {
  const petalsRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const hoverNoneQuery = window.matchMedia('(hover: none)')
    const updateCapability = () => {
      setIsEnabled(!prefersReducedMotion && finePointerQuery.matches && !hoverNoneQuery.matches)
    }

    updateCapability()
    finePointerQuery.addEventListener('change', updateCapability)
    hoverNoneQuery.addEventListener('change', updateCapability)

    return () => {
      finePointerQuery.removeEventListener('change', updateCapability)
      hoverNoneQuery.removeEventListener('change', updateCapability)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isEnabled) {
      return undefined
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        petalsRef.current?.setAttribute('data-paused', 'true')
      } else {
        petalsRef.current?.removeAttribute('data-paused')
      }
    }

    handleVisibilityChange()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <div className="ambient-petals" ref={petalsRef} aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="ambient-petal"
          key={petal.id}
          style={{
            '--petal-blur': petal.blur,
            '--petal-drift': petal.drift,
            '--petal-rotation': petal.rotation,
            '--petal-return': petal.returnDrift,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            borderRadius: petal.borderRadius,
            height: petal.size,
            left: petal.left,
            opacity: petal.opacity,
            top: petal.top,
            width: petal.size,
          }}
        />
      ))}
    </div>
  )
}

export default memo(FloatingPetals)
