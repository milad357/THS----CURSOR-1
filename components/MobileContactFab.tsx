export default function MobileContactFab() {
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:hidden">
      <div className="flex items-center gap-2 bg-bg-card border border-white/15 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.85)] px-4 py-2">
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[11px] uppercase tracking-wide text-text-muted">Call or Text</span>
          <a 
            href="tel:8188253104" 
            className="text-xs font-semibold text-white hover:text-accent-red transition"
          >
            818-825-3104
          </a>
        </div>
        <div className="flex items-center gap-1.5 ml-1">
          <a
            href="tel:8188253104"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent-red text-[11px] font-semibold tracking-wide text-white hover:bg-red-600 transition"
          >
            Call
          </a>
          <a
            href="sms:8188253104"
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/25 text-[11px] font-semibold tracking-wide text-white/90 hover:border-white hover:bg-white/5 transition"
          >
            Text
          </a>
        </div>
      </div>
    </div>
  );
}

