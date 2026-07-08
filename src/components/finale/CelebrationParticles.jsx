import { memo, useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const particleCount = 42
const celebrationDuration = 7600
const maxPixelRatio = 2

function createParticle(width, height, index) {
  const drift = index % 2 === 0 ? 1 : -1

  return {
    delay: Math.random() * 1100,
    drift,
    radius: 1.2 + Math.random() * 2.8,
    shimmer: 0.65 + Math.random() * 0.35,
    speed: 0.08 + Math.random() * 0.22,
    twinkle: 0.002 + Math.random() * 0.004,
    x: width * (0.12 + Math.random() * 0.76),
    y: height * (0.18 + Math.random() * 0.68),
  }
}

function CelebrationParticles({ isActive }) {
  const canvasRef = useRef(null)
  const elapsedBeforePauseRef = useRef(0)
  const frameRef = useRef(0)
  const startedAtRef = useRef(0)
  const particlesRef = useRef([])
  const stoppedRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!isActive || prefersReducedMotion) {
      return undefined
    }

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return undefined
    }

    let width = 0
    let height = 0
    let pixelRatio = 1

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect()

      width = bounds.width
      height = bounds.height
      pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      particlesRef.current = Array.from({ length: particleCount }, (_, index) =>
        createParticle(width, height, index),
      )
    }

    const render = (time) => {
      if (!startedAtRef.current) {
        startedAtRef.current = time
      }

      const elapsed = elapsedBeforePauseRef.current + time - startedAtRef.current
      context.clearRect(0, 0, width, height)

      particlesRef.current.forEach((particle) => {
        const localElapsed = elapsed - particle.delay

        if (localElapsed < 0 || localElapsed > celebrationDuration) {
          return
        }

        const progress = localElapsed / celebrationDuration
        const fadeIn = Math.min(progress * 6, 1)
        const fadeOut = Math.min((1 - progress) * 3, 1)
        const alpha = fadeIn * fadeOut * particle.shimmer
        const x = particle.x + Math.sin(localElapsed * particle.twinkle) * 22 * particle.drift
        const y = particle.y - localElapsed * particle.speed
        const glow = context.createRadialGradient(x, y, 0, x, y, particle.radius * 5)

        glow.addColorStop(0, `rgba(255, 242, 181, ${alpha * 0.9})`)
        glow.addColorStop(0.38, `rgba(212, 175, 55, ${alpha * 0.34})`)
        glow.addColorStop(1, 'rgba(212, 175, 55, 0)')

        context.fillStyle = glow
        context.beginPath()
        context.arc(x, y, particle.radius * 5, 0, Math.PI * 2)
        context.fill()
      })

      if (elapsed < celebrationDuration + 1200) {
        frameRef.current = window.requestAnimationFrame(render)
      } else {
        frameRef.current = 0
        stoppedRef.current = true
        context.clearRect(0, 0, width, height)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden && frameRef.current) {
        if (startedAtRef.current) {
          elapsedBeforePauseRef.current += performance.now() - startedAtRef.current
        }
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      } else if (!document.hidden && !frameRef.current && !stoppedRef.current) {
        startedAtRef.current = performance.now()
        frameRef.current = window.requestAnimationFrame(render)
      }
    }

    // Canvas keeps the sparkle animation off React's render path.
    resizeCanvas()
    elapsedBeforePauseRef.current = 0
    startedAtRef.current = 0
    stoppedRef.current = false

    if (document.hidden) {
      startedAtRef.current = performance.now()
    } else {
      frameRef.current = window.requestAnimationFrame(render)
    }
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
      }

      context.clearRect(0, 0, width, height)
    }
  }, [isActive, prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return <canvas className="finale-celebration" ref={canvasRef} aria-hidden="true" />
}

export default memo(CelebrationParticles)
