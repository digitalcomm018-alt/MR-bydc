import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TourPlanDay } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Map,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  Building2,
  MapPin,
  Car,
  UserCheck,
  Pencil,
  Trash2
} from 'lucide-react';

export const TourPlannerView: React.FC = () => {
  const { tourPlans, updateTourPlan, addTourPlanDay, deleteTourPlanDay, mrProfile } = useApp();

  const [submittedToManager, setSubmittedToManager] = useState(false);
  const [addDayModalOpen, setAddDayModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<TourPlanDay | null>(null);

  const [newDate, setNewDate] = useState('2026-08-01');
  const [newBeat, setNewBeat] = useState('Central Beat');
  const [newWorkType, setNewWorkType] = useState<'Field Work' | 'Joint Working' | 'Leave' | 'HQ Meeting' | 'Transit'>('Field Work');
  const [newKm, setNewKm] = useState(30);

  const handleSubmitTP = () => {
    setSubmittedToManager(true);
    setTimeout(() => setSubmittedToManager(false), 4000);
  };

  const handleCreateDay = (e: React.FormEvent) => {
    e.preventDefault();
    addTourPlanDay({
      date: newDate,
      dayOfWeek: new Date(newDate).toLocaleDateString('en-US', { weekday: 'long' }),
      townBeat: newBeat,
      workType: newWorkType,
      estimatedKm: newKm,
      targetDoctorsCount: newWorkType === 'Field Work' ? 12 : 0,
      targetChemistsCount: newWorkType === 'Field Work' ? 5 : 0,
      accompanyingManager: newWorkType === 'Joint Working' ? 'Mr. Rajesh Roy (ASM)' : undefined,
      status: 'Pending'
    });
    setAddDayModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 0: Ocean Blue Glow) */}
      <FlowingHeader
        themeIndex={0}
        badgeText="Route & Territory Schedule"
        title="Monthly Tour Planner (TP) & Route Schedule"
        subtitle="Plan beat routes, schedule joint working with managers, and compute estimated TA/DA."
        icon={Map}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddDayModalOpen(true)}
              className="px-3.5 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-slate-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Beat Day</span>
            </button>

            <button
              onClick={handleSubmitTP}
              className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit TP to Manager</span>
            </button>
          </div>
        }
      />

      {submittedToManager && (
        <div className="bg-emerald-600 text-white p-4.5 rounded-2xl shadow-xl flex items-center justify-between text-xs font-black animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Monthly Tour Plan successfully submitted to {mrProfile.managerName} for approval!</span>
          </div>
        </div>
      )}

      {/* TP Status Overview Banner - Image 8 Warm Golden Sand Palette */}
      <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 text-amber-950 rounded-3xl p-6 border border-amber-300 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-amber-800 block text-[10px] uppercase font-black tracking-wider">Manager Approval</span>
            <span className="text-emerald-800 font-extrabold text-sm flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Approved by ASM</span>
            </span>
          </div>

          <div>
            <span className="text-amber-800 block text-[10px] uppercase font-black tracking-wider">Total Scheduled Field Days</span>
            <span className="text-amber-950 font-black text-sm mt-1 block">22 Field Working Days</span>
          </div>

          <div>
            <span className="text-amber-800 block text-[10px] uppercase font-black tracking-wider">Planned Doctor Calls</span>
            <span className="text-amber-950 font-black text-sm mt-1 block">248 Total Visits</span>
          </div>

          <div>
            <span className="text-amber-800 block text-[10px] uppercase font-black tracking-wider">Estimated Distance (TA)</span>
            <span className="text-amber-950 font-black text-sm mt-1 block">680 Km (₹6,800 Est. TA)</span>
          </div>
        </div>
      </div>

      {/* Tour Plan Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>July / August Route Beat Schedule</span>
          </h2>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            Current Month Cycle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-4">Date</th>
                <th className="p-3.5">Day</th>
                <th className="p-3.5">Work Type</th>
                <th className="p-3.5">Town / Beat Assigned</th>
                <th className="p-3.5 text-center">Planned Doctors</th>
                <th className="p-3.5 text-center">Planned Chemists</th>
                <th className="p-3.5">Accompanying Manager</th>
                <th className="p-3.5 text-right">Est. Distance</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tourPlans.map((day) => (
                <tr key={day.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-slate-900">{day.date}</td>
                  <td className="p-3.5 text-slate-600 font-medium">{day.dayOfWeek}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        day.workType === 'Field Work'
                          ? 'bg-teal-100 text-teal-800'
                          : day.workType === 'Joint Working'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {day.workType}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{day.townBeat}</td>
                  <td className="p-3.5 text-center font-bold text-slate-700">{day.targetDoctorsCount}</td>
                  <td className="p-3.5 text-center font-bold text-slate-700">{day.targetChemistsCount}</td>
                  <td className="p-3.5 text-slate-600 italic font-medium">
                    {day.accompanyingManager || 'Solo'}
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-800">{day.estimatedKm} Km</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        day.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {day.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right pr-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingDay(day)}
                        title="Edit Tour Plan Day"
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete route plan for date ${day.date}?`)) {
                            deleteTourPlanDay(day.id);
                          }
                        }}
                        title="Delete Day"
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

      {/* SCHEDULE DAY MODAL */}
      {addDayModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateDay}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Schedule Beat Route Day</span>
              </h3>
              <button
                type="button"
                onClick={() => setAddDayModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Type</label>
                <select
                  value={newWorkType}
                  onChange={(e) => setNewWorkType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Field Work">Field Work (Doctor & Chemist Calls)</option>
                  <option value="Joint Working">Joint Working with ASM</option>
                  <option value="HQ Meeting">HQ Meeting</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Beat / Route</label>
                <select
                  value={newBeat}
                  onChange={(e) => setNewBeat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat (Metro Enclave)</option>
                  <option value="Suburb North Beat">Suburb North Beat (Hospital Zone)</option>
                  <option value="South Industrial Beat">South Industrial Beat (Civic Zone)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Distance (Km)</label>
                <input
                  type="number"
                  value={newKm}
                  onChange={(e) => setNewKm(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAddDayModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Add To Tour Plan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT DAY MODAL */}
      {editingDay && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTourPlan(editingDay);
              setEditingDay(null);
            }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-teal-600" />
                <span>Edit Scheduled Route Day</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingDay(null)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={editingDay.date}
                  onChange={(e) => setEditingDay({ ...editingDay, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Type</label>
                <select
                  value={editingDay.workType}
                  onChange={(e) => setEditingDay({ ...editingDay, workType: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Field Work">Field Work (Doctor & Chemist Calls)</option>
                  <option value="Joint Working">Joint Working with ASM</option>
                  <option value="HQ Meeting">HQ Meeting</option>
                  <option value="Leave">Leave</option>
                  <option value="Transit">Transit</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Beat / Route</label>
                <select
                  value={editingDay.townBeat}
                  onChange={(e) => setEditingDay({ ...editingDay, townBeat: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat (Metro Enclave)</option>
                  <option value="Suburb North Beat">Suburb North Beat (Hospital Zone)</option>
                  <option value="South Industrial Beat">South Industrial Beat (Civic Zone)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Planned Doctors</label>
                  <input
                    type="number"
                    value={editingDay.targetDoctorsCount}
                    onChange={(e) => setEditingDay({ ...editingDay, targetDoctorsCount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Km</label>
                  <input
                    type="number"
                    value={editingDay.estimatedKm}
                    onChange={(e) => setEditingDay({ ...editingDay, estimatedKm: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={editingDay.status}
                  onChange={(e) => setEditingDay({ ...editingDay, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingDay(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Update Tour Plan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
