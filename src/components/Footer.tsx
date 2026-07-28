import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full bg-gradient-to-r from-[#042610] via-[#0B5226] to-[#083819] text-white py-4 px-6 text-center shadow-xl border-t border-emerald-600/50 overflow-hidden">
      {/* Texture overlay matching Image 1 deep textured green plaster background */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.25),transparent_75%)] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" 
      />
      <div className="max-w-7xl mx-auto space-y-1 relative z-10">
        <p className="text-xs sm:text-sm font-black tracking-wide text-emerald-100 drop-shadow-sm">
          developed by digital communique Private Limited
        </p>
        <p className="text-[11px] font-bold text-emerald-200/90 tracking-wider">
          Smart Solutions for a Healthier Tomorrow
        </p>
      </div>
    </footer>
  );
};
