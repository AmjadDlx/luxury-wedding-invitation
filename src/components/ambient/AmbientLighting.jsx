import { memo } from 'react'

const lights = [
  { className: 'left-[6%] top-[12%]', delay: '0s' },
  { className: 'right-[4%] top-[38%]', delay: '6s' },
  { className: 'left-[28%] bottom-[8%]', delay: '12s' },
]

function AmbientLighting() {
  return (
    <div className="ambient-lighting" aria-hidden="true">
      {lights.map((light) => (
        <span
          className={`ambient-light ${light.className}`}
          key={`${light.className}-${light.delay}`}
          style={{ animationDelay: light.delay }}
        />
      ))}
    </div>
  )
}

export default memo(AmbientLighting)
