import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { submitRSVP } from '../../services/rsvpService'
import FormField from './FormField'
import SuccessCard from './SuccessCard'

const initialFormState = {
  attendance: '',
  dietary: '',
  email: '',
  guestCount: '1',
  guestName: '',
  message: '',
  phone: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function RSVPForm({ copy, formRef, fieldRefs, buttonRef }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const statusRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const successCopy = useMemo(
    () => ({
      ...copy.success,
      editLabel: copy.editLabel,
    }),
    [copy.editLabel, copy.success],
  )

  const validate = useCallback(() => {
    const nextErrors = {}
    const guestCount = Number(formData.guestCount)

    if (!formData.guestName.trim()) {
      nextErrors.guestName = copy.validation.guestName
    }

    if (!formData.email.trim()) {
      nextErrors.email = copy.validation.emailRequired
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = copy.validation.emailInvalid
    }

    if (!Number.isFinite(guestCount) || guestCount < 1) {
      nextErrors.guestCount = copy.validation.guestCount
    }

    if (!formData.attendance) {
      nextErrors.attendance = copy.validation.attendance
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [copy.validation, formData])

  const handleChange = useCallback((event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (!validate()) {
        return
      }

      setIsSubmitting(true)

      try {
        await submitRSVP({
          ...formData,
          guestCount: Number(formData.guestCount),
        })
        setIsSubmitted(true)
        statusRef.current?.focus()
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validate],
  )

  const handleEdit = useCallback(() => {
    setIsSubmitted(false)
  }, [])

  if (isSubmitted) {
    return (
      <div ref={statusRef} tabIndex={-1}>
        <SuccessCard copy={successCopy} onEdit={handleEdit} />
      </div>
    )
  }

  return (
    <form
      className="rsvp-card relative overflow-hidden rounded-[1.8rem] border border-gold/20 bg-white/44 p-5 shadow-[0_34px_110px_rgba(67,47,13,0.13)] backdrop-blur-2xl sm:p-8"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="relative z-10">
        <p className="mb-7 text-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold/86">
          {copy.deadlineLabel}
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div ref={(element) => { fieldRefs.current[0] = element }}>
            <FormField
              autoComplete="name"
              error={errors.guestName}
              label={copy.fields.guestName.label}
              name="guestName"
              onChange={handleChange}
              placeholder={copy.fields.guestName.placeholder}
              required
              value={formData.guestName}
            />
          </div>

          <div ref={(element) => { fieldRefs.current[1] = element }}>
            <FormField
              autoComplete="email"
              error={errors.email}
              inputMode="email"
              label={copy.fields.email.label}
              name="email"
              onChange={handleChange}
              placeholder={copy.fields.email.placeholder}
              required
              type="email"
              value={formData.email}
            />
          </div>

          <div ref={(element) => { fieldRefs.current[2] = element }}>
            <FormField
              autoComplete="tel"
              inputMode="tel"
              label={copy.fields.phone.label}
              name="phone"
              onChange={handleChange}
              optionalLabel={copy.fields.phone.optionalLabel}
              placeholder={copy.fields.phone.placeholder}
              type="tel"
              value={formData.phone}
            />
          </div>

          <div ref={(element) => { fieldRefs.current[3] = element }}>
            <FormField
              error={errors.guestCount}
              inputMode="numeric"
              label={copy.fields.guestCount.label}
              min="1"
              name="guestCount"
              onChange={handleChange}
              placeholder={copy.fields.guestCount.placeholder}
              required
              type="number"
              value={formData.guestCount}
            />
          </div>
        </div>

        <fieldset className="mt-6" ref={(element) => { fieldRefs.current[4] = element }}>
          <legend className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ink/58">
            {copy.fields.attendance.label}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.fields.attendance.options.map((option) => (
              <label
                className={`rsvp-choice ${formData.attendance === option.value ? 'is-selected' : ''}`}
                key={option.value}
              >
                <input
                  checked={formData.attendance === option.value}
                  className="sr-only"
                  name="attendance"
                  onChange={handleChange}
                  type="radio"
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {errors.attendance && (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-950/72"
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
                role="alert"
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                {errors.attendance}
              </motion.p>
            )}
          </AnimatePresence>
        </fieldset>

        <div className="mt-6 grid gap-5">
          <div ref={(element) => { fieldRefs.current[5] = element }}>
            <FormField
              label={copy.fields.dietary.label}
              name="dietary"
              onChange={handleChange}
              placeholder={copy.fields.dietary.placeholder}
              type="textarea"
              value={formData.dietary}
            />
          </div>

          <div ref={(element) => { fieldRefs.current[6] = element }}>
            <FormField
              label={copy.fields.message.label}
              name="message"
              onChange={handleChange}
              placeholder={copy.fields.message.placeholder}
              type="textarea"
              value={formData.message}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center" ref={buttonRef}>
          <button className="rsvp-action" disabled={isSubmitting} type="submit">
            {isSubmitting && <span className="rsvp-spinner" aria-hidden="true" />}
            <span>{isSubmitting ? copy.loadingLabel : copy.submitLabel}</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default memo(RSVPForm)
