import { forwardRef } from 'react'

const Button = forwardRef(function Button({ children, href = '#', ...props }, ref) {
  return (
    <a
      className="luxury-button group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full border border-white/28 bg-white/12 px-9 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-[0_18px_55px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur-2xl transition-all duration-500 ease-out hover:scale-[1.025] hover:border-gold/55 hover:bg-white/18 hover:shadow-[0_22px_70px_rgba(212,175,55,0.22),inset_0_1px_0_rgba(255,255,255,0.36)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      href={href}
      ref={ref}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
})

export default Button
