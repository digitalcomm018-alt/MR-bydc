import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SampleItem } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Package,
  AlertTriangle,
  Plus,
  Building2,
  CheckCircle2,
  Clock,
  TrendingDown,
  RefreshCcw,
  Sparkles,
  Pencil,
  Trash2
} from 'lucide-react';

export const SampleInventoryView: React.FC = () => {
  const {
    samples,
    replenishSampleStock,
    addSampleItem,
    updateSampleItem,
    deleteSampleItem
  } = useApp();

  const [replenishModalOpen, setReplenishModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(samples[0]?.brandName || 'Cardia-50');
  const [batchNo, setBatchNo] = useState('C50-2026-HQ');
  const [qtyToAdd, setQtyToAdd] = useState(50);
  const [showToast, setShowToast] = useState(false);

  // New & Edit Sample Item Modal State
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [editingSample, setEditingSample] = useState<SampleItem | null>(null);

  const [sBrandName, setSBrandName] = useState('NeuroVibe');
  const [sPackType, setSPackType] = useState('10x10 Strip');
  const [sBatchNo, setSBatchNo] = useState('NV-2026B');
  const [sExpiryDate, setSExpiryDate] = useState('2028-06-30');
  const [sOpening, setSOpening] = useState(100);

  const handleOpenAddSample = () => {
    setEditingSample(null);
    setSBrandName('NeuroVibe');
    setSPackType('10x10 Strip');
    setSBatchNo('NV-2026B');
    setSExpiryDate('2028-06-30');
    setSOpening(100);
    setSampleModalOpen(true);
  };

  const handleOpenEditSample = (item: SampleItem) => {
    setEditingSample(item);
    setSBrandName(item.brandName);
    setSPackType(item.packType);
    setSBatchNo(item.batchNo);
    setSExpiryDate(item.expiryDate);
    setSOpening(item.openingStock);
    setSampleModalOpen(true);
  };

  const handleSaveSampleItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSample) {
      updateSampleItem({
        ...editingSample,
        brandName: sBrandName,
        packType: sPackType,
        batchNo: sBatchNo,
        expiryDate: sExpiryDate,
        openingStock: sOpening,
        balanceStock: sOpening + editingSample.receivedFromHQ - editingSample.distributedInDCR
      });
    } else {
      addSampleItem({
        brandName: sBrandName,
        packType: sPackType,
        batchNo: sBatchNo,
        expiryDate: sExpiryDate,
        openingStock: sOpening,
        receivedFromHQ: 0,
        distributedInDCR: 0,
        balanceStock: sOpening,
        unitCost: 15
      });
    }
    setSampleModalOpen(false);
  };

  const handleReplenish = (e: React.FormEvent) => {
    e.preventDefault();
    replenishSampleStock(selectedBrand, batchNo, qtyToAdd);
    setReplenishModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalDistributed = samples.reduce((acc, s) => acc + s.distributedInDCR, 0);
  const totalBalance = samples.reduce((acc, s) => acc + s.balanceStock, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 2: Serene Sky Blue) */}
      <FlowingHeader
        themeIndex={2}
        badgeText="Promotional Input Control"
        title="Sample & Promotional Input Inventory Ledger"
        subtitle="Track opening stock, DCR distributions, batch numbers, expiry dates, and HQ replenishments."
        icon={Package}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddSample}
              className="px-3.5 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-slate-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Sample Item</span>
            </button>

            <button
              onClick={() => setReplenishModalOpen(true)}
              className="px-4 py-2.5 bg-sky-950 text-white hover:bg-slate-900 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Request Sample Stock HQ</span>
            </button>
          </div>
        }
      />

      {showToast && (
        <div className="bg-emerald-600 text-white p-4.5 rounded-2xl shadow-xl flex items-center justify-between text-xs font-black animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Sample Allocation Order Received from HQ & Ledger Updated!</span>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Total Available Sample Units</span>
          <span className="text-2xl font-black text-slate-900">{totalBalance}</span>
          <p className="text-[10px] text-emerald-700 font-bold mt-1">Across {samples.length} Core Brands</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block mb-1">Distributed in Field DCRs</span>
          <span className="text-2xl font-black text-emerald-600">{totalDistributed}</span>
          <p className="text-[10px] text-slate-500 font-semibold mt-1">Directly Handed to Doctors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 md:col-span-1">
          <span className="text-xs text-slate-500 font-bold block mb-1">Low Stock Alerts</span>
          <span className="text-2xl font-black text-amber-600">
            {samples.filter((s) => s.balanceStock <= 35).length}
          </span>
          <p className="text-[10px] text-amber-700 font-bold mt-1">Requires HQ Replenishment</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-600" />
            <span>Real-time Stock Inventory Ledger</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Batch Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-4">Brand & Pack Type</th>
                <th className="p-3.5">Batch #</th>
                <th className="p-3.5">Expiry Date</th>
                <th className="p-3.5 text-center">Opening</th>
                <th className="p-3.5 text-center">HQ Recd</th>
                <th className="p-3.5 text-center">DCR Distributed</th>
                <th className="p-3.5 text-center">Balance Stock</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {samples.map((s) => {
                const isLow = s.balanceStock <= 35;
                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4 font-bold text-slate-900">
                      <div>{s.brandName}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{s.packType}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{s.batchNo}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{s.expiryDate}</td>
                    <td className="p-3.5 text-center font-bold text-slate-700">{s.openingStock}</td>
                    <td className="p-3.5 text-center font-bold text-emerald-700">+{s.receivedFromHQ}</td>
                    <td className="p-3.5 text-center font-bold text-teal-700">-{s.distributedInDCR}</td>
                    <td className="p-3.5 text-center font-extrabold text-slate-900 text-sm">
                      {s.balanceStock}
                    </td>
                    <td className="p-3.5 text-center">
                      {isLow ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center gap-1 mx-auto w-max">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-1 mx-auto w-max">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Healthy</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right pr-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditSample(s)}
                          title="Edit Sample Stock"
                          className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete sample item "${s.brandName}"?`)) {
                              deleteSampleItem(s.id);
                            }
                          }}
                          title="Delete Item"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPLENISH MODAL */}
      {replenishModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleReplenish}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-teal-600" />
                <span>Receive HQ Sample Allocation</span>
              </h3>
              <button
                type="button"
                onClick={() => setReplenishModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                >
                  {samples.map((s) => (
                    <option key={s.id} value={s.brandName}>
                      {s.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Number</label>
                <input
                  type="text"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quantity Received (Units)</label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={qtyToAdd}
                  onChange={(e) => setQtyToAdd(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReplenishModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Add Stock
              </button>
            </div>
          </form>
        </div>
      )}
      {/* ADD / EDIT SAMPLE MODAL */}
      {sampleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveSampleItem}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-teal-600" />
                <span>{editingSample ? 'Edit Sample Item' : 'Add New Sample Item'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={sBrandName}
                  onChange={(e) => setSBrandName(e.target.value)}
                  placeholder="e.g. Cardia-50"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pack Type</label>
                  <input
                    type="text"
                    value={sPackType}
                    onChange={(e) => setSPackType(e.target.value)}
                    placeholder="e.g. 10x10 Strip"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    required
                    value={sBatchNo}
                    onChange={(e) => setSBatchNo(e.target.value)}
                    placeholder="e.g. C50-2026A"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={sExpiryDate}
                    onChange={(e) => setSExpiryDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Opening Stock (Units)</label>
                  <input
                    type="number"
                    value={sOpening}
                    onChange={(e) => setSOpening(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save Sample Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
