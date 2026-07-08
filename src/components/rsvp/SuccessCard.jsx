import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

function SuccessCard({ copy, onEdit }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="rsvp-success relative overflow-hidden rounded-[1.65rem] border border-gold/22 bg-white/46 px-6 py-12 text-center shadow-[0_30px_100px_rgba(67,47,13,0.12)] backdrop-blur-2xl sm:px-10"
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98, y: prefersReducedMotion ? 0 : -8 }}
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98, y: prefersReducedMotion ? 0 : 10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative z-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-white/54 text-3xl text-gold shadow-[0_18px_54px_rgba(212,175,55,0.18)]">
          <FiCheck aria-hidden="true" />
        </div>

        <h3 className="mt-7 font-serif text-5xl font-medium leading-none text-ink">
          {copy.title}
        </h3>
        <p className="mx-auto mt-5 max-w-md text-base leading-8 text-ink/64">
          {copy.message}
        </p>

        <button className="rsvp-action mx-auto mt-8" onClick={onEdit} type="button">
          {copy.editLabel}
        </button>
      </div>
    </motion.div>
  )
}

export default memo(SuccessCard)
