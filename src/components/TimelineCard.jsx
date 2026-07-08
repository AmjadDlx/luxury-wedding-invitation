import { forwardRef } from 'react'

const alignmentClass = {
  left: 'md:justify-self-start md:pr-16',
  right: 'md:justify-self-end md:pl-16',
}

const TimelineCard = forwardRef(function TimelineCard(
  { align, description, Icon, title, year },
  ref,
) {
  return (
    <article
      className={`timeline-card group relative w-full rounded-[1.4rem] border border-white/58 bg-white/54 p-6 text-left shadow-[0_26px_80px_rgba(68,48,16,0.08)] outline-none backdrop-blur-2xl transition-[border-color,box-shadow,opacity,transform] duration-700 focus-visible:border-gold/70 focus-visible:shadow-[0_30px_90px_rgba(212,175,55,0.22)] sm:p-7 md:w-[calc(50%-2.5rem)] ${alignmentClass[align]}`}
      ref={ref}
      tabIndex={0}
    >
      <div className="flex items-start gap-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/24 bg-gradient-to-br from-white/78 to-champagne/26 text-gold shadow-[0_14px_36px_rgba(212,175,55,0.16)]">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>

        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold">
            {year}
          </p>
          <h3 className="mt-2 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-ink/62 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
})

export default TimelineCard
