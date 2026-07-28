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
    name: 'Lavender Lilac (Image 7 Palette)',
    // Image 7: Light Lavender / Lilac color background
    bgClass: 'bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 border border-purple-300 text-purple-950',
    cardBgClass: 'bg-gradient-to-br from-purple-100/95 via-indigo-50/90 to-purple-100/95 text-purple-950 border-purple-300 shadow-sm',
    textClass: 'text-purple-950',
    borderClass: 'border-purple-300/80',
    badgeClass: 'bg-purple-900 text-purple-50 font-bold',
    accentGlow: 'from-purple-300/40 via-indigo-200/20 to-transparent'
  },
  {
    id: 2,
    name: 'Warm Golden Sand (Image 8 Palette)',
    // Image 8: Warm Golden Sand / Beige color background
    bgClass: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border border-amber-300 text-amber-950',
    cardBgClass: 'bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-amber-100/95 text-amber-950 border-amber-300 shadow-sm',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-300/80',
    badgeClass: 'bg-amber-900 text-amber-50 font-bold',
    accentGlow: 'from-amber-300/40 via-yellow-200/20 to-transparent'
  },
  {
    id: 3,
    name: 'Lavender Lilac (Image 7 Palette)',
    // Image 7: Light Lavender / Lilac color background
    bgClass: 'bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 border border-purple-300 text-purple-950',
    cardBgClass: 'bg-gradient-to-br from-purple-100/95 via-indigo-50/90 to-purple-100/95 text-purple-950 border-purple-300 shadow-sm',
    textClass: 'text-purple-950',
    borderClass: 'border-purple-300/80',
    badgeClass: 'bg-purple-900 text-purple-50 font-bold',
    accentGlow: 'from-purple-300/40 via-indigo-200/20 to-transparent'
  },
  {
    id: 4,
    name: 'Warm Golden Sand (Image 8 Palette)',
    // Image 8: Warm Golden Sand / Beige color background
    bgClass: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border border-amber-300 text-amber-950',
    cardBgClass: 'bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-amber-100/95 text-amber-950 border-amber-300 shadow-sm',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-300/80',
    badgeClass: 'bg-amber-900 text-amber-50 font-bold',
    accentGlow: 'from-amber-300/40 via-yellow-200/20 to-transparent'
  },
  {
    id: 5,
    name: 'Lavender Lilac (Image 7 Palette)',
    // Image 7: Light Lavender / Lilac color background
    bgClass: 'bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 border border-purple-300 text-purple-950',
    cardBgClass: 'bg-gradient-to-br from-purple-100/95 via-indigo-50/90 to-purple-100/95 text-purple-950 border-purple-300 shadow-sm',
    textClass: 'text-purple-950',
    borderClass: 'border-purple-300/80',
    badgeClass: 'bg-purple-900 text-purple-50 font-bold',
    accentGlow: 'from-purple-300/40 via-indigo-200/20 to-transparent'
  },
  {
    id: 6,
    name: 'Warm Golden Sand (Image 8 Palette)',
    // Image 8: Warm Golden Sand / Beige color background
    bgClass: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border border-amber-300 text-amber-950',
    cardBgClass: 'bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-amber-100/95 text-amber-950 border-amber-300 shadow-sm',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-300/80',
    badgeClass: 'bg-amber-900 text-amber-50 font-bold',
    accentGlow: 'from-amber-300/40 via-yellow-200/20 to-transparent'
  },
  {
    id: 7,
    name: 'Lavender Lilac (Image 7 Palette)',
    // Image 7: Light Lavender / Lilac color background
    bgClass: 'bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 border border-purple-300 text-purple-950',
    cardBgClass: 'bg-gradient-to-br from-purple-100/95 via-indigo-50/90 to-purple-100/95 text-purple-950 border-purple-300 shadow-sm',
    textClass: 'text-purple-950',
    borderClass: 'border-purple-300/80',
    badgeClass: 'bg-purple-900 text-purple-50 font-bold',
    accentGlow: 'from-purple-300/40 via-indigo-200/20 to-transparent'
  }
];

export function getFlowingTheme(index: number): FlowingTheme {
  return FLOWING_THEMES[Math.abs(index) % FLOWING_THEMES.length];
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
      {/* Wave lines SVG pattern for Theme 5 */}
      {theme.id === 5 && (
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 Q150,150 300,50 T600,50 T900,50"
            fill="none"
            stroke="#d97706"
            strokeWidth="3"
          />
          <path
            d="M0,90 Q150,190 300,90 T600,90 T900,90"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
          />
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * Reusable Flowing Page Header Banner
 */
export const FlowingHeader: React.FC<{
  themeIndex: number;
  title: string;
  subtitle: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  actions?: React.ReactNode;
}> = ({ themeIndex, title, subtitle, badgeText, icon: Icon, actions }) => {
  const theme = getFlowingTheme(themeIndex);

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 ${theme.bgClass} text-white`}
    >
      {/* Ambient background waves */}
      <div aria-hidden="true" className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      {/* Wave Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,80 C150,180 350,10 650,120 C950,230 1150,20 1350,90" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M-100,120 C150,220 350,50 650,160 C950,270 1150,60 1350,130" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-1 opacity-90">
            <Icon className="w-4 h-4" />
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-black">{badgeText}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight drop-shadow-xs">{title}</h1>
          <p className="text-xs opacity-90 mt-1 max-w-2xl font-medium leading-relaxed">{subtitle}</p>
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
