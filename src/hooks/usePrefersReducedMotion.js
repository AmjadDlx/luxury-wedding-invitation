import { useEffect, useState } from 'react'

function getMotionPreference(includeTouchDevices) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const touchDevice = includeTouchDevices && window.matchMedia('(pointer: coarse)').matches

  return reducedMotion || touchDevice
}

function usePrefersReducedMotion({ includeTouchDevices = true } = {}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    getMotionPreference(includeTouchDevices),
  )

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(pointer: coarse)')
    const updatePreference = () => {
      setPrefersReducedMotion(getMotionPreference(includeTouchDevices))
    }

    updatePreference()
    motionQuery.addEventListener('change', updatePreference)
    touchQuery.addEventListener('change', updatePreference)

    return () => {
      motionQuery.removeEventListener('change', updatePreference)
      touchQuery.removeEventListener('change', updatePreference)
    }
  }, [includeTouchDevices])

  return prefersReducedMotion
}

export default usePrefersReducedMotion
