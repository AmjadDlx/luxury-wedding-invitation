import { memo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function CountdownCard({ label, value }) {
  const prefersReducedMotion = useReducedMotion()
  const displayValue = String(value).padStart(2, '0')

  return (
    <div className="countdown-card group min-h-40 rounded-[1.35rem] border border-white/62 bg-white/42 p-5 text-center shadow-[0_24px_80px_rgba(88,62,18,0.09)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/46 hover:bg-white/58 hover:shadow-[0_30px_90px_rgba(212,175,55,0.15)] sm:min-h-44 sm:p-7">
      <div className="flex h-20 items-center justify-center overflow-hidden sm:h-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="block font-serif text-5xl font-medium leading-none text-ink sm:text-6xl lg:text-7xl"
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            key={displayValue}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-4 text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-gold">
        {label}
      </p>
    </div>
  )
}

export default memo(CountdownCard)
