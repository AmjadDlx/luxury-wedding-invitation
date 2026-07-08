import { memo } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const glints = [
  'left-[14%] top-[18%]',
  'right-[16%] top-[34%]',
  'left-[20%] bottom-[28%]',
  'right-[22%] bottom-[16%]',
]

function MobileLife() {
  const prefersReducedMotion = usePrefersReducedMotion({ includeTouchDevices: false })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="mobile-life" aria-hidden="true">
      <span className="mobile-life-wash" />
      {glints.map((position, index) => (
        <span
          className={`mobile-life-glint ${position}`}
          key={position}
          style={{ animationDelay: `${index * -1.7}s` }}
        />
      ))}
    </div>
  )
}

export default memo(MobileLife)
