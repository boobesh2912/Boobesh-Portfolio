export default function GariTechLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-[#0a1120] px-3 py-1.5 ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
        <rect width="32" height="32" rx="9" fill="url(#garitech-grad)" />
        <circle cx="16" cy="16" r="7" stroke="white" strokeWidth="2.2" />
        <path d="M16 6.5v3M16 22.5v3M6.5 16h3M22.5 16h3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.4" fill="white" />
        <defs>
          <linearGradient id="garitech-grad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#4f8dff" />
            <stop offset="1" stopColor="#8b7cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-sm font-bold text-ink">
        Gari<span className="text-coral">Tech</span>
      </span>
    </span>
  );
}
