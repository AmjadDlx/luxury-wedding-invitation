import { forwardRef, memo } from 'react'

const TimelineNode = memo(
  forwardRef(function TimelineNode({ label }, ref) {
    return (
      <div
        aria-label={label}
        className="events-node order-1 relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/24 bg-white/42 shadow-[0_18px_52px_rgba(212,175,55,0.12)] backdrop-blur-xl lg:order-none lg:col-start-2 lg:row-start-1"
        ref={ref}
        role="img"
      >
        <span className="h-3 w-3 rounded-full bg-gold shadow-[0_0_28px_rgba(212,175,55,0.62)]" />
      </div>
    )
  }),
)

export default TimelineNode
