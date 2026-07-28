import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Doctor, Chemist } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Stethoscope,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  PackageCheck,
  Building2,
  PhoneCall,
  MapPin,
  Flame,
  AlertTriangle,
  Lightbulb,
  Plus
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    doctors,
    chemists,
    dcrLogs,
    selectedBeat,
    setActiveTab,
    addDCRLog,
    samples,
    mrProfile
  } = useApp();

  const [aiPitchModalOpen, setAiPitchModalOpen] = useState(false);
  const [selectedDocForPitch, setSelectedDocForPitch] = useState<Doctor | null>(null);
  const [pitchData, setPitchData] = useState<any>(null);
  const [loadingPitch, setLoadingPitch] = useState(false);

  // Filter Doctors & Chemists for selected beat
  const beatDoctors = doctors.filter((d) => d.townBeat === selectedBeat);
  const beatChemists = chemists.filter((c) => c.townBeat === selectedBeat);

  // Calculate today's stats
  const todayStr = '2026-07-27'; // simulate today
  const todayDcr = dcrLogs.filter((d) => d.date === todayStr);

  const completedDoctorCalls = todayDcr.filter((d) => d.entityType === 'Doctor').length;
  const completedChemistCalls = todayDcr.filter((d) => d.entityType === 'Chemist').length;
  const totalPobToday = todayDcr.reduce((sum, d) => sum + (d.pobValue || 0), 0);

  const lowStockSamples = samples.filter((s) => s.balanceStock <= 35);

  const handleGeneratePitch = async (doc: Doctor) => {
    setSelectedDocForPitch(doc);
    setAiPitchModalOpen(true);
    setLoadingPitch(true);
    setPitchData(null);

    try {
      const res = await fetch('/api/gemini/doctor-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorName: doc.name,
          speciality: doc.speciality,
          doctorClass: doc.doctorClass,
          keyBrand: doc.keyFocusBrands[0] || 'Cardia-50',
          pastFeedback: 'Sensitivity to clinical outcome trial data and renal safety.'
        })
      });
      const contentType = res.headers.get('content-type');
      let data: any = null;

      if (res.ok && contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Fallback for Vercel/Netlify static deployment
        data = {
          openingHook: `Good morning ${doc.name}. In light of your active ${doc.speciality} practice, I wanted to highlight the latest 24-hour BP control trial data for ${doc.keyFocusBrands[0] || 'Cardia-50'}.`,
          keyScientificPoints: [
            "Demonstrates 28% superior renal protection in diabetic hypertensive patients.",
            "Smooth 24-hour trough-to-peak ratio minimizing early morning BP spikes.",
            "High patient compliance due to once-daily ultra-small tablet size."
          ],
          objectionHandling: [
            { objection: "Patient cost concern", response: "Highlight our patient assistance savings card and 30-day extended trial pack." },
            { objection: "Existing competitor preference", response: "Share head-to-head trial showing faster target SBP attainment within 2 weeks." }
          ],
          sampleCallToAction: "Doctor, may I leave 5 sample packs for your next 5 mild-to-moderate hypertensive patients this week?"
        };
      }
      setPitchData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPitch(false);
    }
  };

  const handleQuickCompleteDoctor = (doc: Doctor) => {
    addDCRLog({
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      entityType: 'Doctor',
      entityId: doc.id,
      entityName: doc.name,
      specialityOrType: doc.speciality,
      townBeat: doc.townBeat,
      callType: 'Core Visit',
      brandsPromoted: doc.keyFocusBrands,
      samplesGiven: [
        { brandId: 'b1', brandName: doc.keyFocusBrands[0] || 'Cardia-50', batchNo: 'C50-2026A', quantity: 2 }
      ],
      pobValue: 2500,
      doctorFeedback: 'Detailed core brands. Expressed satisfaction with safety profile.',
      agreedNextVisitDate: '2026-08-08',
      status: 'Completed'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header 0 (Theme 0: Ocean Blue Glow) */}
      <FlowingHeader
        themeIndex={0}
        badgeText={`Good Morning, ${mrProfile.name}`}
        title="Field Operations Command Center"
        subtitle={`Assigned Route Beat: ${selectedBeat}. You have ${beatDoctors.length} Doctors and ${beatChemists.length} Chemists scheduled today.`}
        icon={Sparkles}
        actions={
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('dcr')}
              className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Daily DCR</span>
            </button>
            <button
              onClick={() => setActiveTab('edetailing')}
              className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-100 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-cyan-300" />
              <span>Visual Aid</span>
            </button>
          </div>
        }
      />

      {/* Alternating KPI Boxes (Themes 1, 2, 3, 4) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Box 1: Theme 1 (Fresh Mint Aqua) */}
        <FlowingBox themeIndex={1}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-900">Doctor Calls</span>
            <div className="w-8 h-8 rounded-xl bg-teal-800 text-teal-50 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-teal-950">{completedDoctorCalls + 3}</span>
            <span className="text-xs text-teal-800 font-semibold">/ 9 Planned</span>
          </div>
          <div className="mt-2.5 w-full bg-teal-200/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-teal-700 h-1.5 rounded-full w-[78%]" />
          </div>
          <p className="text-[11px] text-teal-900 font-extrabold mt-1.5">78% Target Completed</p>
        </FlowingBox>

        {/* Box 2: Theme 2 (Serene Sky Blue) */}
        <FlowingBox themeIndex={2}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900">Chemist Visits</span>
            <div className="w-8 h-8 rounded-xl bg-sky-800 text-sky-50 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-sky-950">{completedChemistCalls + 2}</span>
            <span className="text-xs text-sky-800 font-semibold">/ 3 Planned</span>
          </div>
          <div className="mt-2.5 w-full bg-sky-200/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-sky-700 h-1.5 rounded-full w-[100%]" />
          </div>
          <p className="text-[11px] text-sky-900 font-extrabold mt-1.5">100% Target Met</p>
        </FlowingBox>

        {/* Box 3: Theme 3 (Blush Coral Rose) */}
        <FlowingBox themeIndex={3}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900">POB Orders</span>
            <div className="w-8 h-8 rounded-xl bg-rose-800 text-rose-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-rose-950">₹{(totalPobToday + 18300).toLocaleString()}</span>
          </div>
          <p className="text-[11px] text-rose-900 font-bold mt-3">3 Chemist Orders Booked</p>
        </FlowingBox>

        {/* Box 4: Theme 4 (Golden Wave Sunrise) */}
        <FlowingBox themeIndex={4}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950">Sample Stock</span>
            <div className="w-8 h-8 rounded-xl bg-amber-900 text-amber-50 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-950">293</span>
            <span className="text-xs text-amber-900 font-semibold">Units</span>
          </div>
          {lowStockSamples.length > 0 ? (
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-950 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{lowStockSamples.length} Low Stock Item</span>
            </div>
          ) : (
            <p className="text-[11px] text-amber-950 font-bold mt-2">Stock Healthy</p>
          )}
        </FlowingBox>
      </div>

      {/* AI Morning Field Briefing Card - Light Slate Texture Palette (Image 1 Color Scheme) */}
      <div className="bg-slate-200/90 text-slate-900 rounded-3xl p-6 border border-slate-300 shadow-sm relative overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-md font-bold">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-950 tracking-tight">AI Territory Intelligence Briefing</h3>
              <p className="text-[11px] text-slate-600 font-medium">Powered by Gemini AI Field Engine</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-700 text-white shadow-2xs self-start sm:self-auto">
            Live Route Intelligence
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-3.5 text-xs">
          <div className="bg-white/95 p-4 rounded-2xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 font-bold text-amber-800 mb-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>High Priority Call Strategy</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
              <strong className="text-slate-950 font-black">Dr. A. K. Sharma (Cardiologist)</strong> is due for visit #4 this month.
              Competitors are pushing schemes. Present renal safety clinical data.
            </p>
          </div>

          <div className="bg-white/95 p-4 rounded-2xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 font-bold text-teal-800 mb-1.5">
              <Lightbulb className="w-4 h-4 text-teal-600" />
              <span>Sample Allocation Target</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
              Leave 5 sample catch covers of <strong className="text-slate-950 font-black">NeuroVibe</strong> at Matritva Hospital with
              <strong className="text-slate-950 font-black"> Dr. Meera Patel</strong> for post-pregnancy therapy.
            </p>
          </div>

          <div className="bg-white/95 p-4 rounded-2xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 font-bold text-indigo-800 mb-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Stockist Order Drive</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
              Apollo Pharmacy's inventory of <strong className="text-slate-950 font-black">GlycoMet-XL</strong> is down to 2 days stock.
              Book min ₹15,000 POB order today.
            </p>
          </div>
        </div>
      </div>

      {/* Today's Call Schedule Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Today's Call Schedule — {selectedBeat}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Mapped Doctors & Chemists for your route plan
            </p>
          </div>

          <button
            onClick={() => setActiveTab('dcr')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View Complete DCR History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {beatDoctors.map((doc) => {
            const isCompleted = dcrLogs.some(
              (d) => d.entityId === doc.id || (d.entityName === doc.name && d.date === todayStr)
            );

            return (
              <div
                key={doc.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : doc.speciality[0]}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-extrabold text-slate-900">{doc.name}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {doc.qualification}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide ${
                          doc.doctorClass === 'A+'
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                            : doc.doctorClass === 'A'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        Class {doc.doctorClass}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="font-semibold text-slate-700">{doc.clinicName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {doc.preferredTime}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">
                        Focus: {doc.keyFocusBrands.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleGeneratePitch(doc)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    <span>AI Pitch</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('edetailing')}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Detail
                  </button>

                  {isCompleted ? (
                    <span className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>DCR Logged</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleQuickCompleteDoctor(doc)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      Log Call
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Chemists mapped */}
          {beatChemists.map((chem) => (
            <div
              key={chem.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900">{chem.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                      Chemist
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 flex-wrap font-medium">
                    <span>Contact: {chem.contactPerson} ({chem.phone})</span>
                    <span>•</span>
                    <span className="font-bold text-slate-800">Stockist: {chem.mappedStockist}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('dcr')}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-md shadow-teal-600/20 transition-all cursor-pointer"
                >
                  Book POB / RCPA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Doctor Pitch Strategy Modal */}
      {aiPitchModalOpen && selectedDocForPitch && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    AI Strategic Pitch — {selectedDocForPitch.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedDocForPitch.speciality} | Target Brand:{' '}
                    <strong className="text-teal-700">{selectedDocForPitch.keyFocusBrands[0]}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiPitchModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loadingPitch ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-600 font-medium">
                  Analyzing doctor specialty, past feedback & clinical trials with Gemini...
                </p>
              </div>
            ) : pitchData ? (
              <div className="space-y-4 text-xs">
                <div className="bg-teal-50 p-3.5 rounded-xl border border-teal-200">
                  <span className="font-bold text-teal-900 block mb-1">
                    Opening Hook (30-Sec Pitch):
                  </span>
                  <p className="text-teal-950 font-medium leading-relaxed">
                    "{pitchData.openingHook}"
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1.5">
                    Key Clinical Scientific Points:
                  </span>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                    {pitchData.keyScientificPoints?.map((pt: string, idx: number) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-slate-800 block mb-1.5">
                    Expected Objection Counter-strategy:
                  </span>
                  <div className="space-y-2">
                    {pitchData.objectionHandling?.map((obj: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="font-bold text-amber-800 block">
                          Objection: {obj.objection}
                        </span>
                        <p className="text-slate-700 text-[11px] mt-0.5">{obj.response}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900">
                  <span className="font-bold block mb-0.5">Recommended Closing Commitment:</span>
                  <p>{pitchData.sampleCallToAction}</p>
                </div>
              </div>
            ) : null}

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setAiPitchModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
