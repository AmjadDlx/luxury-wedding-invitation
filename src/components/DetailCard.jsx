import { memo } from 'react'
import { FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa'
import { GiFlowerEmblem } from 'react-icons/gi'

const icons = {
  flower: GiFlowerEmblem,
  memory: FaRegHeart,
  place: FaMapMarkerAlt,
}

function DetailCard({ icon, label, value }) {
  const Icon = icons[icon]

  return (
    <div
      className="detail-card rounded-2xl border border-white/62 bg-white/46 px-4 py-5 text-center shadow-[0_18px_56px_rgba(68,48,16,0.07)] outline-none backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/60 hover:shadow-[0_24px_70px_rgba(212,175,55,0.13)] focus-visible:-translate-y-1 focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/40"
      data-detail-card
      tabIndex={0}
    >
      <Icon aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
      <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-ink/46">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl leading-6 text-ink/78">{value}</p>
    </div>
  )
}

export default memo(DetailCard)
