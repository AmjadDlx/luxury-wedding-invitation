import { memo } from 'react'
import {
  FiClock,
  FiCompass,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiTruck,
} from 'react-icons/fi'
import VenueCard from './VenueCard'

const detailCards = [
  {
    key: 'name',
    label: 'Venue',
    icon: FiStar,
    getValue: (venue) => venue.name,
  },
  {
    key: 'address',
    label: 'Address',
    icon: FiMapPin,
    getValue: (venue) => `${venue.address}, ${venue.city}`,
  },
  {
    key: 'ceremonyTime',
    label: 'Ceremony',
    icon: FiClock,
    getValue: (venue) => venue.ceremonyTime,
  },
  {
    key: 'receptionTime',
    label: 'Reception',
    icon: FiCompass,
    getValue: (venue) => venue.receptionTime,
  },
  {
    key: 'parking',
    label: 'Parking',
    icon: FiTruck,
    getValue: (venue) => venue.parking,
  },
  {
    key: 'dressCode',
    label: 'Dress Code',
    icon: FiNavigation,
    getValue: (venue) => venue.dressCode,
  },
]

function VenueInfo({ actionsRef, cardRefs, venue }) {
  return (
    <div className="lg:pt-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {detailCards.map((card, index) => (
          <VenueCard
            icon={card.icon}
            key={card.key}
            label={card.label}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
            value={card.getValue(venue)}
          />
        ))}
      </div>

      <div
        className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row"
        ref={actionsRef}
      >
        <a
          aria-label={`Get directions to ${venue.name}`}
          className="venue-action"
          href={venue.directionsUrl}
          rel="noreferrer"
          target="_blank"
        >
          Get Directions
        </a>
        <a className="venue-action" href={venue.calendarUrl} rel="noreferrer" target="_blank">
          Add to Calendar
        </a>
      </div>
    </div>
  )
}

export default memo(VenueInfo)
