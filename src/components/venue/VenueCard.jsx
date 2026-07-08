import { forwardRef, memo } from 'react'

const VenueCard = memo(
  forwardRef(function VenueCard({ icon: Icon, label, value }, ref) {
    return (
      <article
        className="venue-card group relative min-h-36 overflow-hidden rounded-[1.35rem] border border-gold/18 bg-white/42 p-6 shadow-[0_24px_74px_rgba(67,47,13,0.1)] backdrop-blur-2xl transition-all duration-500"
        ref={ref}
      >
        <div className="relative z-10 flex items-start gap-4">
          <div className="venue-card-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/24 bg-white/52 text-xl text-gold shadow-[0_14px_38px_rgba(212,175,55,0.14)] transition-transform duration-500">
            <Icon aria-hidden="true" />
          </div>

          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold/84">
              {label}
            </p>
            <p className="mt-3 font-serif text-2xl font-medium leading-7 text-ink">
              {value}
            </p>
          </div>
        </div>
      </article>
    )
  }),
)

export default VenueCard
