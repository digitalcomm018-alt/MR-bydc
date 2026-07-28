import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { E_DETAILING_SLIDES } from '../data/mockData';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Presentation,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  Award,
  Activity,
  Maximize2
} from 'lucide-react';

export const EDetailingView: React.FC = () => {
  const { brands, doctors, setActiveTab } = useApp();

  const [selectedBrandName, setSelectedBrandName] = useState<string>('Cardia-50');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [selectedDocForDetailing, setSelectedDocForDetailing] = useState<string>(doctors[0]?.name || '');

  // Filter slides for selected brand
  const filteredSlides = E_DETAILING_SLIDES.filter((s) => s.brandName === selectedBrandName);
  const activeSlide = filteredSlides[currentSlideIndex] || E_DETAILING_SLIDES[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNextSlide = () => {
    if (currentSlideIndex < filteredSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 1: Fresh Mint Aqua) */}
      <FlowingHeader
        themeIndex={1}
        badgeText="Interactive Visual Aid Vault"
        title="E-Detailing & Interactive Visual Aid Vault"
        subtitle="Interactive digital visual aid slides with clinical trial data and active detailing timer."
        icon={Presentation}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-teal-950 font-bold">Detailing To:</span>
            <select
              value={selectedDocForDetailing}
              onChange={(e) => setSelectedDocForDetailing(e.target.value)}
              className="bg-slate-900/90 text-teal-200 border border-teal-500/30 rounded-xl px-3.5 py-2 text-xs font-extrabold cursor-pointer"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.speciality})
                </option>
              ))}
            </select>
          </div>
        }
      />

      {/* Brand Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {brands.map((b) => {
          const isSelected = selectedBrandName === b.name;
          return (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBrandName(b.name);
                setCurrentSlideIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <span>{b.name}</span>
              <span className="ml-2 text-[10px] opacity-80 font-semibold">({b.category})</span>
            </button>
          );
        })}
      </div>

      {/* PRESENTATION CANVAS SLIDE - Image 7 Lavender/Lilac Palette */}
      <div className="bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 text-purple-950 rounded-3xl border border-purple-300 shadow-xl overflow-hidden relative min-h-[480px] flex flex-col justify-between p-6 md:p-8">
        {/* Top Slide Header Bar */}
        <div className="flex items-center justify-between border-b border-purple-300/80 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-purple-50 border border-purple-800 flex items-center justify-center font-black text-sm">
              {activeSlide.brandName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-purple-950 text-base">{activeSlide.brandName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-900 text-purple-50">
                  Visual Aid Slide {currentSlideIndex + 1} of {filteredSlides.length}
                </span>
              </div>
              <p className="text-xs text-purple-900 font-semibold mt-0.5">{activeSlide.subtitle}</p>
            </div>
          </div>

          {/* Timer Control */}
          <div className="flex items-center gap-3 bg-white/90 border border-purple-300 px-3.5 py-1.5 rounded-xl shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-purple-950 font-black">
              <Clock className="w-4 h-4 animate-pulse text-purple-800" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                isPlaying ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-purple-900 text-purple-50 hover:bg-purple-800'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Start Detailing'}</span>
            </button>
          </div>
        </div>

        {/* Slide Content Body */}
        <div className="grid md:grid-cols-12 gap-6 my-auto items-center">
          {/* Main Bullet Points */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-purple-950 tracking-tight leading-snug">
              {activeSlide.title}
            </h2>

            <div className="space-y-2.5">
              {activeSlide.contentBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-purple-950 text-xs md:text-sm leading-relaxed font-bold">
                  <CheckCircle2 className="w-4 h-4 text-purple-800 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: MOA & Clinical Study Card */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-white/90 p-4 rounded-2xl border border-purple-300 shadow-xs">
              <div className="flex items-center gap-2 text-purple-900 text-xs font-black mb-1.5">
                <Activity className="w-4 h-4 text-purple-700" />
                <span>Mechanism of Action (MOA)</span>
              </div>
              <p className="text-slate-800 text-xs leading-relaxed font-medium">
                {activeSlide.moaDescription}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-2xl border border-purple-300 text-xs text-purple-950 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-black mb-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Clinical Trial Highlight</span>
              </div>
              <p className="text-purple-950 leading-relaxed italic font-semibold">
                "{activeSlide.clinicalHighlight}"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Control Bar */}
        <div className="border-t border-purple-300/80 pt-4 mt-6 flex items-center justify-between">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-300 text-purple-950 text-xs font-black disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
            <span>Detailing Doctor: <strong className="text-purple-950 font-black">{selectedDocForDetailing}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveTab('dcr');
              }}
              className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-50 text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish & Log in DCR</span>
            </button>

            <button
              onClick={handleNextSlide}
              className="px-4 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-300 text-purple-950 text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
