import { memo } from 'react'

function InfoCard({ description, Icon, time, title }) {
  return (
    <article
      className="info-card rounded-[1.35rem] border border-white/62 bg-white/44 p-6 text-left shadow-[0_22px_70px_rgba(88,62,18,0.08)] outline-none backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/42 hover:bg-white/60 hover:shadow-[0_28px_84px_rgba(212,175,55,0.13)] focus-visible:-translate-y-1 focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/40"
      tabIndex={0}
    >
      <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/24 bg-gradient-to-br from-white/78 to-champagne/30 text-gold shadow-[0_14px_36px_rgba(212,175,55,0.14)]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="mt-6 font-serif text-3xl font-medium leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-ink/62">{description}</p>
      <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">
        {time}
      </p>
    </article>
  )
}

export default memo(InfoCard)
