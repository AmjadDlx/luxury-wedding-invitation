import { forwardRef, memo } from 'react'

const Ornament = memo(
  forwardRef(function Ornament(_, ref) {
    return (
      <div
        className="ornament-wrap pointer-events-none order-first mx-auto grid place-items-center self-center lg:order-none"
        ref={ref}
      >
        <div className="ornament relative h-24 w-24 sm:h-28 sm:w-28">
          <span className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/80 to-transparent" />
          <span className="absolute inset-5 rounded-full border border-gold/42" />
          <span className="absolute inset-9 rounded-full bg-gold/70 shadow-[0_0_34px_rgba(212,175,55,0.34)]" />
        </div>
      </div>
    )
  }),
)

export default Ornament
