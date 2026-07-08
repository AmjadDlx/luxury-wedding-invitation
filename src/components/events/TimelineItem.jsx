import { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import { FiClock, FiCoffee, FiHeart, FiMapPin, FiMusic, FiSun } from 'react-icons/fi'
import TimelineNode from './TimelineNode'

const eventIcons = {
  brunch: FiSun,
  ceremony: FiHeart,
  dinner: FiCoffee,
  reception: FiMusic,
}

const TimelineItem = memo(
  forwardRef(function TimelineItem({ event, index }, ref) {
    const cardRef = useRef(null)
    const nodeRef = useRef(null)
    const Icon = eventIcons[event.icon] ?? FiHeart
    const isEven = index % 2 === 0

    useImperativeHandle(ref, () => ({
      card: cardRef.current,
      node: nodeRef.current,
    }))

    return (
      <article
        className="events-timeline-row relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:gap-8"
        aria-labelledby={`${event.id}-title`}
      >
        <div
          className={`events-card-wrap order-2 lg:order-none ${
            isEven ? 'lg:col-start-1' : 'lg:col-start-3'
          }`}
          ref={cardRef}
        >
          <div className="event-card group relative overflow-hidden rounded-[1.5rem] border border-gold/20 bg-white/44 p-7 shadow-[0_28px_90px_rgba(67,47,13,0.1)] backdrop-blur-2xl transition-all duration-500 focus-within:border-gold/60 sm:p-8">
            <div className="relative z-10 flex items-start gap-5">
              <div className="event-icon flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-gold/28 bg-white/54 text-xl text-gold shadow-[0_16px_42px_rgba(212,175,55,0.16)] transition-transform duration-500">
                <Icon aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold/86">
                  {event.date}
                </p>
                <h3
                  className="mt-3 font-serif text-4xl font-medium leading-none text-ink sm:text-5xl"
                  id={`${event.id}-title`}
                >
                  {event.title}
                </h3>

                <dl className="mt-5 grid gap-3 text-sm text-ink/62 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gold" aria-hidden="true" />
                    <dt className="sr-only">Time</dt>
                    <dd>{event.time}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-gold" aria-hidden="true" />
                    <dt className="sr-only">Location</dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-base leading-8 text-ink/64">{event.description}</p>
              </div>
            </div>
          </div>
        </div>

        <TimelineNode ref={nodeRef} label={`${event.title} timeline marker`} />

        <div
          className={`hidden lg:block ${isEven ? 'lg:col-start-3' : 'lg:col-start-1 lg:row-start-1'}`}
          aria-hidden="true"
        />
      </article>
    )
  }),
)

export default TimelineItem
