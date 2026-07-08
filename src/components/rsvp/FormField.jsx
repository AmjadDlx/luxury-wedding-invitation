import { memo, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function FormField({
  autoComplete,
  error,
  inputMode,
  label,
  max,
  min,
  name,
  onChange,
  optionalLabel,
  placeholder,
  required = false,
  rows = 4,
  type = 'text',
  value,
}) {
  const textareaRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const errorId = error ? `${name}-error` : undefined

  useEffect(() => {
    if (type !== 'textarea' || !textareaRef.current) {
      return
    }

    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }, [type, value])

  const fieldClassName = `rsvp-input ${error ? 'border-red-900/35 ring-1 ring-red-900/20' : ''}`

  return (
    <div className="rsvp-field">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ink/58"
          htmlFor={name}
        >
          {label}
        </label>
        {optionalLabel && (
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold/74">
            {optionalLabel}
          </span>
        )}
      </div>

      {type === 'textarea' ? (
        <textarea
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className={`${fieldClassName} min-h-32 resize-none overflow-hidden leading-7`}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={textareaRef}
          required={required}
          rows={rows}
          value={value}
        />
      ) : (
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className={fieldClassName}
          id={name}
          inputMode={inputMode}
          max={max}
          min={min}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      )}

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-950/72"
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            id={errorId}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            role="alert"
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(FormField)
