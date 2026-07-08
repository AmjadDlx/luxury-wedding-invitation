import { forwardRef, memo } from 'react'

const VenueMap = memo(
  forwardRef(function VenueMap({ venue }, ref) {
    return (
      <aside
        aria-label={`${venue.name} map`}
        className="venue-map-frame relative mt-10 overflow-hidden rounded-[1.65rem] border border-gold/18 bg-white/38 p-3 shadow-[0_30px_96px_rgba(67,47,13,0.12)] backdrop-blur-2xl sm:mt-12"
        ref={ref}
      >
        <iframe
          className="h-[22rem] w-full rounded-[1.25rem] border-0 grayscale-[18%] sepia-[8%] sm:h-[28rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={venue.mapsUrl}
          title={`${venue.name} location map`}
        />
      </aside>
    )
  }),
)

export default VenueMap
