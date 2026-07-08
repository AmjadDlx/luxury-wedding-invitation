import { memo, useEffect, useRef } from 'react'

function ScrollProgress() {
  const barRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0

      barRef.current?.style.setProperty('--scroll-progress', String(Math.min(progress, 1)))
      frameRef.current = 0
    }

    const requestUpdate = () => {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />
}

export default memo(ScrollProgress)
