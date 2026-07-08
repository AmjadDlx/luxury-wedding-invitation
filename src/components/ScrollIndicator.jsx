function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/64 sm:flex">
      <div className="relative h-11 w-7 rounded-full border border-white/42 bg-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md">
        <span className="mouse-wheel absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-gold" />
      </div>
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.34em]">
        Scroll
      </span>
    </div>
  )
}

export default ScrollIndicator
