import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExpenseClaim } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Receipt,
  Plus,
  CheckCircle2,
  Clock,
  Car,
  Building,
  Upload,
  FileCheck,
  MapPin,
  Send,
  Pencil,
  Trash2
} from 'lucide-react';

export const ExpenseClaimView: React.FC = () => {
  const { expenses, addExpenseClaim, updateExpenseClaim, deleteExpenseClaim, selectedBeat } = useApp();

  const [date, setDate] = useState('2026-07-27');
  const [da, setDa] = useState(450);
  const [ta, setTa] = useState(320);
  const [hotel, setHotel] = useState(0);
  const [misc, setMisc] = useState(50);
  const [notes, setNotes] = useState('Outstation beat travel per TA/DA norms');
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Edit Expense Modal State
  const [editingExpense, setEditingExpense] = useState<ExpenseClaim | null>(null);

  const totalClaim = da + ta + hotel + misc;

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpenseClaim({
      date,
      townBeat: selectedBeat,
      dailyAllowanceDA: da,
      travelAllowanceTA: ta,
      hotelLodging: hotel,
      miscellaneous: misc,
      totalAmount: totalClaim,
      status: 'Submitted',
      notes,
      receiptUrl: receiptUploaded ? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400' : undefined
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalApproved = expenses
    .filter((e) => e.status === 'Approved')
    .reduce((acc, e) => acc + e.totalAmount, 0);

  const totalPending = expenses
    .filter((e) => e.status === 'Submitted')
    .reduce((acc, e) => acc + e.totalAmount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 3: Blush Coral Rose) */}
      <FlowingHeader
        themeIndex={3}
        badgeText="Allowance & Expense Portal"
        title="Field Expense Claims (TA / DA Allowance)"
        subtitle="Submit daily travel allowance, lodging receipts, and outstation allowances for manager approval."
        icon={Receipt}
        actions={
          <div className="flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/30 text-rose-950">
            <MapPin className="w-3.5 h-3.5 text-rose-950" />
            <span>Current Beat: <strong className="text-rose-950 font-extrabold">{selectedBeat}</strong></span>
          </div>
        }
      />

      {showToast && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Expense Claim Submitted to Manager & Pending Approval!</span>
          </div>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Approved & Disbursed</span>
          <span className="text-2xl font-extrabold text-emerald-700">₹{totalApproved.toLocaleString()}</span>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Processed in Payroll</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Pending Manager Approval</span>
          <span className="text-2xl font-extrabold text-amber-600">₹{totalPending.toLocaleString()}</span>
          <p className="text-[10px] text-amber-700 font-medium mt-1">Under ASM Review</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 md:col-span-1">
          <span className="text-xs text-slate-500 font-semibold block mb-1">Total Claims Recorded</span>
          <span className="text-2xl font-extrabold text-slate-900">{expenses.length} Days</span>
          <p className="text-[10px] text-teal-700 font-medium mt-1">Per Beat Schedule</p>
        </div>
      </div>

      {/* Claim Submission Form */}
      <form onSubmit={handleSubmitExpense} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-teal-600" />
          <span>New Daily Expense Claim Entry</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Daily Allowance (DA)</label>
            <input
              type="number"
              value={da}
              onChange={(e) => setDa(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Travel Allowance (TA)</label>
            <input
              type="number"
              value={ta}
              onChange={(e) => setTa(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hotel Lodging / Food</label>
            <input
              type="number"
              value={hotel}
              onChange={(e) => setHotel(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Notes / Expense Purpose</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </div>

          {/* Receipt Attachment Simulation */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Upload Fuel / Hotel Receipt</label>
            <button
              type="button"
              onClick={() => setReceiptUploaded(!receiptUploaded)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                receiptUploaded
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {receiptUploaded ? <FileCheck className="w-4 h-4 text-emerald-600" /> : <Upload className="w-4 h-4" />}
              <span>{receiptUploaded ? 'Receipt Attached (Check)' : 'Upload Receipt File'}</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs font-extrabold text-slate-900">
            Total Expense Claim: <span className="text-teal-700 ml-1 text-sm">₹{totalClaim.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-teal-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Claim</span>
          </button>
        </div>
      </form>

      {/* Expense History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-teal-600" />
            <span>Expense Claim History Ledger</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Monthly Cycle</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-4">Date</th>
                <th className="p-3.5">Town / Beat</th>
                <th className="p-3.5 text-right">DA (₹)</th>
                <th className="p-3.5 text-right">TA (₹)</th>
                <th className="p-3.5 text-right">Hotel / Misc (₹)</th>
                <th className="p-3.5 text-right">Total Amount</th>
                <th className="p-3.5">Notes</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-slate-900">{e.date}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{e.townBeat}</td>
                  <td className="p-3.5 text-right text-slate-700">₹{e.dailyAllowanceDA}</td>
                  <td className="p-3.5 text-right text-slate-700">₹{e.travelAllowanceTA}</td>
                  <td className="p-3.5 text-right text-slate-700">
                    ₹{e.hotelLodging + e.miscellaneous}
                  </td>
                  <td className="p-3.5 text-right font-extrabold text-teal-700">
                    ₹{e.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-slate-500 italic max-w-xs truncate">{e.notes}</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        e.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right pr-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingExpense(e)}
                        title="Edit Expense Claim"
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete expense claim for ${e.date} (₹${e.totalAmount})?`)) {
                            deleteExpenseClaim(e.id);
                          }
                        }}
                        title="Delete Claim"
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

      {/* EDIT EXPENSE MODAL */}
      {editingExpense && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const calcTotal =
                editingExpense.dailyAllowanceDA +
                editingExpense.travelAllowanceTA +
                editingExpense.hotelLodging +
                editingExpense.miscellaneous;
              updateExpenseClaim({ ...editingExpense, totalAmount: calcTotal });
              setEditingExpense(null);
            }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-teal-600" />
                <span>Edit Daily Expense Claim</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingExpense(null)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={editingExpense.date}
                    onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Town / Beat</label>
                  <input
                    type="text"
                    value={editingExpense.townBeat}
                    onChange={(e) => setEditingExpense({ ...editingExpense, townBeat: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">DA Allowance (₹)</label>
                  <input
                    type="number"
                    value={editingExpense.dailyAllowanceDA}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, dailyAllowanceDA: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">TA Travel (₹)</label>
                  <input
                    type="number"
                    value={editingExpense.travelAllowanceTA}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, travelAllowanceTA: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotel Lodging (₹)</label>
                  <input
                    type="number"
                    value={editingExpense.hotelLodging}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, hotelLodging: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Misc Expense (₹)</label>
                  <input
                    type="number"
                    value={editingExpense.miscellaneous}
                    onChange={(e) =>
                      setEditingExpense({ ...editingExpense, miscellaneous: Number(e.target.value) })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Purpose</label>
                <input
                  type="text"
                  value={editingExpense.notes || ''}
                  onChange={(e) => setEditingExpense({ ...editingExpense, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={editingExpense.status}
                  onChange={(e) =>
                    setEditingExpense({ ...editingExpense, status: e.target.value as any })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="Submitted">Submitted (Pending)</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingExpense(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Update Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
