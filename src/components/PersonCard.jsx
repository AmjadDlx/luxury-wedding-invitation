import { forwardRef, memo } from 'react'
import DetailCard from './DetailCard'

const PersonCard = memo(
  forwardRef(function PersonCard(
    { details, image, imageAlt, name, quote, role },
    ref,
  ) {
    return (
      <article
        className="person-card group mx-auto w-full max-w-[32rem] text-center outline-none"
        ref={ref}
        tabIndex={0}
      >
        <div className="portrait-wrap mx-auto h-[min(76vw,25rem)] w-[min(76vw,25rem)] overflow-hidden rounded-full border border-gold/44 bg-champagne/20 p-2 shadow-[0_24px_90px_rgba(96,70,18,0.14)] transition-all duration-700 focus-within:border-gold/70 group-hover:border-gold/70">
          <img
            alt={imageAlt}
            className="h-full w-full rounded-full object-cover grayscale-[8%] transition-transform duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:rotate-[1.4deg]"
            decoding="async"
            height="800"
            loading="lazy"
            sizes="(min-width: 768px) 25rem, 76vw"
            src={image}
            width="800"
          />
        </div>

        <div className="mt-9">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.36em] text-gold">
            {role}
          </p>
          <h3 className="mt-2 font-serif text-5xl font-medium leading-none text-ink sm:text-6xl">
            {name}
          </h3>
          <p className="mx-auto mt-5 max-w-sm font-serif text-2xl italic leading-8 text-ink/62">
            "{quote}"
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {details.map((detail) => (
            <DetailCard
              icon={detail.icon}
              key={detail.label}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>
      </article>
    )
  }),
)

export default PersonCard
