import { forwardRef } from 'react'

const TimelineLine = forwardRef(function TimelineLine(_, ref) {
  return (
    <div
      className="pointer-events-none absolute left-4 top-0 block h-full w-px -translate-x-1/2 overflow-hidden bg-gold/12 md:left-1/2"
      aria-hidden="true"
    >
      <span
        className="block h-full w-full origin-top bg-gradient-to-b from-gold/20 via-gold to-gold/12"
        ref={ref}
      />
    </div>
  )
})

export default TimelineLine
