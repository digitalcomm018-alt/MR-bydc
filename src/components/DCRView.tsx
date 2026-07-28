import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CallType, SampleDistribution, POBItem, RCPAEntry, DCREntry } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  Building2,
  Package,
  Calendar,
  Plus,
  Trash2,
  FileText,
  Clock,
  MapPin,
  TrendingUp,
  Stethoscope,
  Send,
  Mic,
  MicOff,
  Pencil,
  Search,
  Filter
} from 'lucide-react';

export const DCRView: React.FC = () => {
  const {
    doctors,
    chemists,
    brands,
    samples,
    selectedBeat,
    addDCRLog,
    updateDCRLog,
    deleteDCRLog,
    dcrLogs
  } = useApp();

  const [entityType, setEntityType] = useState<'Doctor' | 'Chemist' | 'Stockist'>('Doctor');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [callType, setCallType] = useState<CallType>('Core Visit');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Cardia-50']);
  
  // Sample Distribution
  const [sampleGivenList, setSampleGivenList] = useState<SampleDistribution[]>([
    { brandId: 'brand-1', brandName: 'Cardia-50', batchNo: 'C50-2026A', quantity: 2 }
  ]);

  // POB Items
  const [pobItems, setPobItems] = useState<POBItem[]>([
    { brandId: 'brand-1', brandName: 'Cardia-50', packSize: '10x10 Tabs', units: 20, unitPrice: 145, discountPercent: 0, totalValue: 2900 }
  ]);

  // RCPA Entries
  const [rcpaList, setRcpaList] = useState<RCPAEntry[]>([
    { chemistId: 'chem-1', chemistName: 'Apollo Pharmacy', ourBrandName: 'Cardia-50', ourMonthlyUnits: 50, competitorBrandName: 'CardioVas-50', competitorMonthlyUnits: 40, rxDoctorNames: ['Dr. A. K. Sharma'] }
  ]);

  const [doctorFeedback, setDoctorFeedback] = useState<string>('Expressed strong interest in renal safety data. Promised 8 prescriptions next week.');
  const [agreedNextVisitDate, setAgreedNextVisitDate] = useState<string>('2026-08-05');
  
  // AI Voice Note Synthesizer State
  const [rawAiNote, setRawAiNote] = useState<string>('');
  const [isParsingAi, setIsParsingAi] = useState<boolean>(false);
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Ledger Filter & Edit Modal State
  const [ledgerSearch, setLedgerSearch] = useState<string>('');
  const [ledgerTypeFilter, setLedgerTypeFilter] = useState<string>('All');
  const [editingDcrLog, setEditingDcrLog] = useState<DCREntry | null>(null);

  // Entities filtered by selected beat
  const currentDoctors = doctors.filter((d) => d.townBeat === selectedBeat);
  const currentChemists = chemists.filter((c) => c.townBeat === selectedBeat);

  const toggleBrandSelection = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const handleParseAiNote = async () => {
    if (!rawAiNote.trim()) return;
    setIsParsingAi(true);

    try {
      const res = await fetch('/api/gemini/parse-dcr-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawNote: rawAiNote })
      });
      const contentType = res.headers.get('content-type');
      let data: any = null;

      if (res.ok && contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Fallback for static hosting platforms (Vercel / Netlify without Express server)
        data = {
          doctorName: "Dr. A. K. Sharma",
          speciality: "Cardiologist",
          visitType: "Core Visit",
          brandsPromoted: ["Cardia-50", "NeuroVibe"],
          samplesGiven: [
            { brand: "Cardia-50", quantity: 5, batchNo: "C50-2026A" }
          ],
          pobValue: 4500,
          doctorFeedback: "Expressed interest in Cardia-50 renal protection data. Agreed to prescribe for 10 patients.",
          agreedNextVisit: "2026-08-05"
        };
      }

      if (data.doctorName) {
        const matchedDoc = doctors.find((d) =>
          d.name.toLowerCase().includes(data.doctorName.toLowerCase())
        );
        if (matchedDoc) {
          setSelectedEntityId(matchedDoc.id);
        }
      }

      if (data.brandsPromoted && Array.isArray(data.brandsPromoted)) {
        setSelectedBrands(data.brandsPromoted);
      }

      if (data.samplesGiven && Array.isArray(data.samplesGiven)) {
        setSampleGivenList(
          data.samplesGiven.map((s: any) => ({
            brandId: 'b1',
            brandName: s.brand || 'Cardia-50',
            batchNo: s.batchNo || 'C50-2026A',
            quantity: s.quantity || 2
          }))
        );
      }

      if (data.doctorFeedback) setDoctorFeedback(data.doctorFeedback);
      if (data.agreedNextVisit) setAgreedNextVisitDate(data.agreedNextVisit);
    } catch (err) {
      console.error(err);
    } finally {
      setIsParsingAi(false);
    }
  };

  const handleSimulateVoiceInput = () => {
    if (isListeningVoice) {
      setIsListeningVoice(false);
    } else {
      setIsListeningVoice(true);
      setRawAiNote('Listening...');
      setTimeout(() => {
        setRawAiNote(
          'Visited Dr. A. K. Sharma at Central Beat. Detailed Cardia-50 and NeuroVibe. Handed 5 sample strips of Cardia-50. Promised 10 prescriptions this week.'
        );
        setIsListeningVoice(false);
      }, 2000);
    }
  };

  const handleAddSampleRow = () => {
    const firstSample = samples[0];
    setSampleGivenList([
      ...sampleGivenList,
      {
        brandId: firstSample ? firstSample.id : 'samp-1',
        brandName: firstSample ? firstSample.brandName : 'Cardia-50',
        batchNo: firstSample ? firstSample.batchNo : 'C50-2026A',
        quantity: 2
      }
    ]);
  };

  const handleRemoveSampleRow = (idx: number) => {
    setSampleGivenList(sampleGivenList.filter((_, i) => i !== idx));
  };

  const handleAddPobRow = () => {
    setPobItems([
      ...pobItems,
      {
        brandId: 'b1',
        brandName: 'NeuroVibe',
        packSize: '1x10 Caps',
        units: 10,
        unitPrice: 220,
        discountPercent: 0,
        totalValue: 2200
      }
    ]);
  };

  const handleRemovePobRow = (idx: number) => {
    setPobItems(pobItems.filter((_, i) => i !== idx));
  };

  const totalPobCalculated = pobItems.reduce((acc, item) => acc + item.totalValue, 0);

  const handleSubmitDcr = (e: React.FormEvent) => {
    e.preventDefault();

    let targetName = 'Dr. Partner';
    let spec = 'General Medicine';

    if (entityType === 'Doctor') {
      const docObj = doctors.find((d) => d.id === selectedEntityId) || doctors[0];
      if (docObj) {
        targetName = docObj.name;
        spec = docObj.speciality;
      }
    } else if (entityType === 'Chemist') {
      const chemObj = chemists.find((c) => c.id === selectedEntityId) || chemists[0];
      if (chemObj) {
        targetName = chemObj.name;
        spec = 'Retail Chemist';
      }
    }

    addDCRLog({
      date: '2026-07-27',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      entityType,
      entityId: selectedEntityId || 'doc-1',
      entityName: targetName,
      specialityOrType: spec,
      townBeat: selectedBeat,
      callType,
      brandsPromoted: selectedBrands,
      samplesGiven: sampleGivenList,
      pobValue: totalPobCalculated,
      pobItems: pobItems,
      rcpaEntries: entityType === 'Chemist' ? rcpaList : [],
      doctorFeedback,
      agreedNextVisitDate,
      status: 'Completed'
    });

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 2: Serene Sky Blue) */}
      <FlowingHeader
        themeIndex={2}
        badgeText="Daily Call Ledger"
        title="Daily Call Report (DCR) Logging"
        subtitle="Submit doctor visits, sample distributions, POB orders, and RCPA audits in real-time."
        icon={ClipboardCheck}
        actions={
          <div className="flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/30 text-slate-900">
            <MapPin className="w-3.5 h-3.5 text-sky-950" />
            <span>Current Beat: <strong className="text-sky-950 font-extrabold">{selectedBeat}</strong></span>
          </div>
        }
      />

      {showSuccessToast && (
        <div className="bg-emerald-600 text-white p-4.5 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 text-xs font-black">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>DCR Entry Successfully Recorded & Sample Inventory Deducted!</span>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="text-white/80 font-bold hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* AI Voice / Field Notes Assistant Box - Image 7 Lavender/Lilac Palette */}
      <div className="bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 text-purple-950 rounded-3xl p-6 border border-purple-300 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-900 text-purple-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-purple-950">
              AI Voice & Natural Language DCR Auto-Filler
            </h3>
          </div>
          <span className="text-[10px] font-bold text-purple-950 bg-white/90 px-2.5 py-1 rounded-full border border-purple-300">
            Gemini AI Speech Parser
          </span>
        </div>

        <p className="text-xs text-purple-950 mb-4 leading-relaxed font-semibold">
          Speak or paste raw call notes after leaving clinic (e.g. <em>"Visited Dr. Sharma at Central Beat, promoted Cardia-50, gave 5 sample catch covers, agreed next visit on 5th Aug"</em>).
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={rawAiNote}
              onChange={(e) => setRawAiNote(e.target.value)}
              placeholder="Type or dictate call notes here..."
              className="w-full bg-white/90 border border-purple-300 rounded-xl px-4 py-3 text-xs text-purple-950 placeholder-purple-800/70 focus:outline-hidden focus:border-purple-600 font-semibold shadow-2xs"
            />
            <button
              onClick={handleSimulateVoiceInput}
              className={`absolute right-2 top-2 p-1.5 rounded-lg transition-all cursor-pointer ${
                isListeningVoice ? 'bg-red-500 text-white animate-pulse' : 'text-purple-700 hover:text-purple-950'
              }`}
              title="Toggle Mic Voice Input"
            >
              {isListeningVoice ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleParseAiNote}
            disabled={isParsingAi || !rawAiNote}
            className="px-5 py-3 rounded-xl bg-purple-900 hover:bg-purple-800 disabled:opacity-50 text-purple-50 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
          >
            {isParsingAi ? (
              <span className="animate-spin text-sm">⏳</span>
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Auto-Structure Call</span>
          </button>
        </div>
      </div>

      {/* DCR Entry Form Card */}
      <form onSubmit={handleSubmitDcr} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Field Visit Entry Form</span>
          </h2>

          {/* Entity Type Toggle */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200">
            {(['Doctor', 'Chemist', 'Stockist'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEntityType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  entityType === type
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Row 1: Doctor/Chemist Select & Call Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select {entityType} Name ({selectedBeat})
            </label>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-teal-600 cursor-pointer"
            >
              <option value="">-- Choose {entityType} --</option>
              {entityType === 'Doctor' &&
                currentDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.speciality} - Class {doc.doctorClass})
                  </option>
                ))}
              {entityType === 'Chemist' &&
                currentChemists.map((chem) => (
                  <option key={chem.id} value={chem.id}>
                    {chem.name} ({chem.contactPerson})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Visit Call Type
            </label>
            <select
              value={callType}
              onChange={(e) => setCallType(e.target.value as CallType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-teal-600 cursor-pointer"
            >
              <option value="Core Visit">Core Visit (Solo Field Work)</option>
              <option value="Joint Visit (ASM)">Joint Visit with Area Manager (ASM)</option>
              <option value="Joint Visit (RM)">Joint Visit with Regional Manager (RM)</option>
              <option value="Non-Core Visit">Non-Core Visit</option>
            </select>
          </div>
        </div>

        {/* Brands Promoted Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2.5">
            Brands Promoted / Detailed During Call
          </label>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => {
              const isSelected = selectedBrands.includes(brand.name);
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => toggleBrandSelection(brand.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  />
                  <span>{brand.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sample Distribution Section */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-teal-600" />
              <span>Sample & Input Distribution Ledger</span>
            </h3>

            <button
              type="button"
              onClick={handleAddSampleRow}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Sample Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {sampleGivenList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <select
                  value={item.brandName}
                  onChange={(e) => {
                    const newBrand = e.target.value;
                    const match = samples.find((s) => s.brandName === newBrand);
                    const updated = [...sampleGivenList];
                    updated[idx] = {
                      ...updated[idx],
                      brandName: newBrand,
                      batchNo: match ? match.batchNo : 'C50-2026A'
                    };
                    setSampleGivenList(updated);
                  }}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <div className="text-xs font-semibold text-slate-500 px-2 bg-white rounded-lg border border-slate-200 py-1.5">
                  Batch: {item.batchNo}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500 font-medium">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={item.quantity}
                    onChange={(e) => {
                      const updated = [...sampleGivenList];
                      updated[idx].quantity = parseInt(e.target.value) || 1;
                      setSampleGivenList(updated);
                    }}
                    className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-slate-800"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSampleRow(idx)}
                  className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Order Booking (POB) Section */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Product Order Booking (POB)</span>
            </h3>

            <button
              type="button"
              onClick={handleAddPobRow}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add POB Line</span>
            </button>
          </div>

          <div className="space-y-2">
            {pobItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                <div className="col-span-5">
                  <select
                    value={item.brandName}
                    onChange={(e) => {
                      const brandName = e.target.value;
                      const match = brands.find((b) => b.name === brandName);
                      const price = match ? match.pricePerPack : 150;
                      const updated = [...pobItems];
                      updated[idx] = {
                        ...updated[idx],
                        brandName,
                        unitPrice: price,
                        totalValue: price * updated[idx].units
                      };
                      setPobItems(updated);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium cursor-pointer"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} (₹{b.pricePerPack}/pack)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3 flex items-center gap-1">
                  <span className="text-xs text-slate-500">Units:</span>
                  <input
                    type="number"
                    min="1"
                    value={item.units}
                    onChange={(e) => {
                      const units = parseInt(e.target.value) || 0;
                      const updated = [...pobItems];
                      updated[idx].units = units;
                      updated[idx].totalValue = units * updated[idx].unitPrice;
                      setPobItems(updated);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-slate-800"
                  />
                </div>

                <div className="col-span-3 text-xs font-bold text-slate-800 text-right">
                  ₹{item.totalValue.toLocaleString()}
                </div>

                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemovePobRow(idx)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end text-xs font-extrabold text-slate-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            Total POB Value: <span className="text-emerald-700 ml-2">₹{totalPobCalculated.toLocaleString()}</span>
          </div>
        </div>

        {/* Doctor Feedback & Agreed Next Visit Date */}
        <div className="grid md:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Doctor / Customer Feedback & Commitments
            </label>
            <textarea
              rows={2}
              value={doctorFeedback}
              onChange={(e) => setDoctorFeedback(e.target.value)}
              placeholder="Record doctor response, clinical questions, or prescription commitments..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Agreed Next Follow-up Date
            </label>
            <input
              type="date"
              value={agreedNextVisitDate}
              onChange={(e) => setAgreedNextVisitDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-teal-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit DCR Entry</span>
          </button>
        </div>
      </form>

      {/* Historical DCR Submitted Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-teal-600" />
              <span>Submitted DCR Call Ledger</span>
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              View, filter, edit or modify daily reporting logs across all doctor & chemist calls
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={ledgerSearch}
                onChange={(e) => setLedgerSearch(e.target.value)}
                placeholder="Search ledger..."
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400"
              />
            </div>

            <select
              value={ledgerTypeFilter}
              onChange={(e) => setLedgerTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Doctor">Doctor Calls</option>
              <option value="Chemist">Chemist Calls</option>
              <option value="Stockist">Stockist Calls</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-4">Date & Time</th>
                <th className="p-3.5">Doctor / Customer</th>
                <th className="p-3.5">Beat</th>
                <th className="p-3.5">Promoted Brands</th>
                <th className="p-3.5 text-center">Samples Given</th>
                <th className="p-3.5 text-right">POB Value</th>
                <th className="p-3.5">Feedback</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dcrLogs
                .filter((log) => {
                  const matchSearch =
                    log.entityName.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                    log.doctorFeedback.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                    log.townBeat.toLowerCase().includes(ledgerSearch.toLowerCase());
                  const matchType = ledgerTypeFilter === 'All' || log.entityType === ledgerTypeFilter;
                  return matchSearch && matchType;
                })
                .map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4 font-semibold text-slate-800 whitespace-nowrap">
                      <div>{log.date}</div>
                      <div className="text-[10px] text-slate-400">{log.time}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                      <div>{log.entityName}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {log.specialityOrType} ({log.entityType})
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 whitespace-nowrap">{log.townBeat}</td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {log.brandsPromoted.map((b, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200/60"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-800">
                      {log.samplesGiven?.reduce((s, i) => s + i.quantity, 0) || 0}
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-emerald-700">
                      ₹{(log.pobValue || 0).toLocaleString()}
                    </td>
                    <td className="p-3.5 text-slate-600 max-w-xs truncate">
                      {log.doctorFeedback}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingDcrLog(log)}
                          title="Edit DCR Entry"
                          className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete DCR log entry for "${log.entityName}"?`)) {
                              deleteDCRLog(log.id);
                            }
                          }}
                          title="Delete Entry"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT DCR LOG MODAL */}
      {editingDcrLog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateDCRLog(editingDcrLog);
              setEditingDcrLog(null);
            }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-teal-600" />
                <span>Edit DCR Call Log Entry</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingDcrLog(null)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Entity / Customer Name</label>
                <input
                  type="text"
                  required
                  value={editingDcrLog.entityName}
                  onChange={(e) => setEditingDcrLog({ ...editingDcrLog, entityName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Town / Beat</label>
                  <input
                    type="text"
                    value={editingDcrLog.townBeat}
                    onChange={(e) => setEditingDcrLog({ ...editingDcrLog, townBeat: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">POB Value (₹)</label>
                  <input
                    type="number"
                    value={editingDcrLog.pobValue || 0}
                    onChange={(e) => setEditingDcrLog({ ...editingDcrLog, pobValue: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Feedback</label>
                <textarea
                  rows={2}
                  value={editingDcrLog.doctorFeedback}
                  onChange={(e) => setEditingDcrLog({ ...editingDcrLog, doctorFeedback: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Call Status</label>
                <select
                  value={editingDcrLog.status}
                  onChange={(e) => setEditingDcrLog({ ...editingDcrLog, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="Completed">Completed</option>
                  <option value="Planned">Planned</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingDcrLog(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save DCR Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
