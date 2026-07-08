import { memo } from 'react'

const particles = [
  { top: '16%', left: '12%', size: '2px', delay: '0s', duration: '24s', drift: '18px' },
  { top: '30%', left: '82%', size: '3px', delay: '4s', duration: '28s', drift: '-22px' },
  { top: '64%', left: '19%', size: '2px', delay: '7s', duration: '26s', drift: '14px' },
  { top: '72%', left: '74%', size: '2px', delay: '2s', duration: '31s', drift: '-18px' },
  { top: '42%', left: '52%', size: '1px', delay: '10s', duration: '34s', drift: '12px' },
  { top: '18%', left: '58%', size: '2px', delay: '5s', duration: '29s', drift: '-16px' },
  { top: '52%', left: '88%', size: '1px', delay: '8s', duration: '32s', drift: '10px' },
]

function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      {particles.map((particle) => (
        <span
          className="absolute rounded-full bg-gold/70 shadow-[0_0_28px_rgba(212,175,55,0.72)]"
          key={`${particle.top}-${particle.left}`}
          style={{
            '--dust-drift': particle.drift,
            animation: `particle-float ${particle.duration} ease-in-out ${particle.delay} infinite`,
            height: particle.size,
            left: particle.left,
            opacity: 0.42,
            top: particle.top,
            width: particle.size,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

export default memo(ParticleBackground)
