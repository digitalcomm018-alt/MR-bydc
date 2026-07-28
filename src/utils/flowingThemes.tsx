import React from 'react';

export interface FlowingTheme {
  id: number;
  name: string;
  bgClass: string;
  cardBgClass: string;
  textClass: string;
  borderClass: string;
  badgeClass: string;
  accentGlow: string;
  svgPattern?: string;
}

export const FLOWING_THEMES: FlowingTheme[] = [
  {
    id: 1,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    // Image 3: Illuminated warm golden amber spotlight stage background
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 2,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 3,
    name: 'Mint Turquoise (Image 2 Left Background)',
    bgClass: 'bg-gradient-to-br from-[#5ce1ce] via-[#38d1b4] to-[#22b59b] border-2 border-teal-300 text-slate-950 shadow-md',
    cardBgClass: 'bg-gradient-to-br from-[#5ce1ce] via-[#38d1b4] to-[#22b59b] text-slate-950 border-teal-300/80 shadow-md',
    textClass: 'text-slate-950',
    borderClass: 'border-teal-300',
    badgeClass: 'bg-[#8A0030] text-white font-black',
    accentGlow: 'from-teal-100/50 via-emerald-200/30 to-transparent'
  },
  {
    id: 4,
    name: 'Deep Cyan Ocean (Image 2 Right Background)',
    bgClass: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009bca] via-[#006080] to-[#003850] border-2 border-cyan-400/50 text-white shadow-xl',
    cardBgClass: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009bca] via-[#006080] to-[#003850] text-white border-cyan-400/50 shadow-xl',
    textClass: 'text-white',
    borderClass: 'border-cyan-400/50',
    badgeClass: 'bg-[#4A2000] text-amber-200 border border-amber-500/30 font-black',
    accentGlow: 'from-cyan-300/40 via-blue-400/20 to-transparent'
  },
  {
    id: 5,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 6,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 7,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 8,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  },
  {
    id: 9,
    name: 'Amber Stage Spotlight (Image 3 Background)',
    bgClass: 'bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-400 text-white shadow-2xl relative',
    cardBgClass: 'bg-gradient-to-br from-amber-500/95 via-orange-600/90 to-amber-700/95 text-white border-amber-400 shadow-md',
    textClass: 'text-white',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black',
    accentGlow: 'from-yellow-200/50 via-amber-400/30 to-transparent'
  }
];

export function getFlowingTheme(index: number): FlowingTheme {
  const safeIndex = Math.abs(index) % FLOWING_THEMES.length;
  return FLOWING_THEMES[safeIndex] || FLOWING_THEMES[0];
}

/**
 * Reusable Flowing Card Container
 */
export const FlowingBox: React.FC<{
  themeIndex: number;
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}> = ({ themeIndex, children, className = '', hoverEffect = true }) => {
  const theme = getFlowingTheme(themeIndex);
  const boxClasses = [
    'rounded-2xl p-5 border relative overflow-hidden transition-all duration-300',
    theme.cardBgClass,
    theme.borderClass,
    hoverEffect ? 'hover:scale-[1.01] hover:shadow-md' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={boxClasses}>
      {/* Decorative Wave Ambient Flow Accent */}
      <div
        aria-hidden="true"
        className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gradient-to-br ${theme.accentGlow} blur-2xl pointer-events-none opacity-60`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * Reusable Flowing Page Header Banner (Image 3 Spotlight Background)
 */
export const FlowingHeader: React.FC<{
  themeIndex?: number;
  title: string;
  subtitle: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  actions?: React.ReactNode;
}> = ({ title, subtitle, badgeText, icon: Icon, actions }) => {
  return (
    <div
      className="rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-[#F57C00] via-[#EA580C] to-[#C2410C] border-2 border-amber-300/80 text-white mb-6"
    >
      {/* Spotlight Beam from Top-Left (Image 3 Stage Lighting Effect) */}
      <div 
        aria-hidden="true" 
        className="absolute -top-28 -left-24 w-96 h-96 bg-gradient-to-br from-yellow-200/80 via-amber-300/40 to-transparent rounded-full blur-2xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -top-12 left-10 w-72 h-[220%] bg-gradient-to-b from-yellow-100/50 via-amber-200/20 to-transparent transform -rotate-45 pointer-events-none origin-top-left" 
      />

      {/* Stage Shelf Line at Bottom (Image 3 Bottom Shelf Line) */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 border-t border-amber-200/80 shadow-md pointer-events-none" 
      />

      {/* Ambient background glow accents */}
      <div aria-hidden="true" className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2">
            <Icon className="w-4 h-4 text-amber-200" />
            <span className="px-3 py-1 rounded-full bg-slate-950/80 text-amber-200 border border-amber-400/60 font-black shadow-sm">
              {badgeText}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-50/95 font-semibold mt-1.5 max-w-2xl leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
