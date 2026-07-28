import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Map,
  Receipt,
  ClipboardCheck,
  UserCheck,
  Sparkles,
  MessageSquare,
  FileCheck
} from 'lucide-react';

export const ManagerApprovalsView: React.FC = () => {
  const {
    tourPlans,
    approveTourPlanDay,
    rejectTourPlanDay,
    expenses,
    approveExpenseClaim,
    rejectExpenseClaim,
    dcrLogs,
    approveDCRLog,
    currentUser
  } = useApp();

  const [approvalTab, setApprovalTab] = useState<'tour' | 'expenses' | 'dcr'>('tour');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingTourPlans = tourPlans.filter((tp) => tp.status === 'Pending');
  const pendingExpenses = expenses.filter((e) => e.status === 'Submitted');
  const pendingDCRs = dcrLogs.filter((d) => d.status === 'Scheduled');

  const showSuccessToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Flowing Header (Theme 4: Golden Wave Sunrise) */}
      <FlowingHeader
        themeIndex={4}
        badgeText="Managerial Approval Workflow"
        title="Manager Approvals Console"
        subtitle={`Logged in as ${currentUser.name} (${currentUser.role}). Review, approve or reject pending field force submissions.`}
        icon={ShieldCheck}
        actions={
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/30 text-center">
              <div className="text-[10px] text-amber-950 font-bold uppercase">Pending Tour Plans</div>
              <div className="text-lg font-black text-amber-950">{pendingTourPlans.length}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/30 text-center">
              <div className="text-[10px] text-amber-950 font-bold uppercase">Pending Expense Claims</div>
              <div className="text-lg font-black text-amber-950">{pendingExpenses.length}</div>
            </div>
          </div>
        }
      />

      {toastMessage && (
        <div className="p-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* APPROVAL TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setApprovalTab('tour')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            approvalTab === 'tour'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Tour Plans ({pendingTourPlans.length})</span>
        </button>

        <button
          onClick={() => setApprovalTab('expenses')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            approvalTab === 'expenses'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Expense Claims ({pendingExpenses.length})</span>
        </button>

        <button
          onClick={() => setApprovalTab('dcr')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            approvalTab === 'dcr'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>DCR Visit Approvals ({pendingDCRs.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {approvalTab === 'tour' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Map className="w-4 h-4 text-teal-600" />
              <span>Pending Monthly Tour Plan Submissions</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Review field route schedules</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5 pl-4">Date</th>
                  <th className="p-3.5">Assigned Beat / Route</th>
                  <th className="p-3.5">Work Type</th>
                  <th className="p-3.5 text-center">Planned Doctors</th>
                  <th className="p-3.5 text-right">Est. Distance</th>
                  <th className="p-3.5 text-center">Current Status</th>
                  <th className="p-3.5 text-right pr-4">Manager Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tourPlans.map((day) => (
                  <tr key={day.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4 font-bold text-slate-900">{day.date} ({day.dayOfWeek})</td>
                    <td className="p-3.5 font-semibold text-slate-800">{day.townBeat}</td>
                    <td className="p-3.5 font-bold text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {day.workType}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-extrabold text-teal-700">{day.targetDoctorsCount} Docs</td>
                    <td className="p-3.5 text-right font-extrabold text-slate-800">{day.estimatedKm} Km</td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          day.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : day.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {day.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-4">
                      {day.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              approveTourPlanDay(day.id);
                              showSuccessToast(`Approved tour plan route for ${day.date}`);
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => {
                              rejectTourPlanDay(day.id);
                              showSuccessToast(`Returned tour plan for date ${day.date} for revision`);
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-lg border border-rose-200 cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Action Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {approvalTab === 'expenses' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4 text-teal-600" />
              <span>Pending Daily Expense Claims & Vouchers</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Verify TA / DA norms & receipts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5 pl-4">Date</th>
                  <th className="p-3.5">Town / Beat</th>
                  <th className="p-3.5 text-right">DA (₹)</th>
                  <th className="p-3.5 text-right">TA (₹)</th>
                  <th className="p-3.5 text-right">Hotel / Misc (₹)</th>
                  <th className="p-3.5 text-right font-black text-slate-900">Total Claim</th>
                  <th className="p-3.5">Notes</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-right pr-4">Manager Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4 font-bold text-slate-900">{e.date}</td>
                    <td className="p-3.5 text-slate-800 font-medium">{e.townBeat}</td>
                    <td className="p-3.5 text-right font-semibold text-slate-700">₹{e.dailyAllowanceDA}</td>
                    <td className="p-3.5 text-right font-semibold text-slate-700">₹{e.travelAllowanceTA}</td>
                    <td className="p-3.5 text-right font-semibold text-slate-700">₹{e.hotelLodging + e.miscellaneous}</td>
                    <td className="p-3.5 text-right font-black text-teal-700 text-sm">₹{e.totalAmount.toLocaleString()}</td>
                    <td className="p-3.5 text-slate-500 italic max-w-xs truncate">{e.notes || 'Field work claim'}</td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          e.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : e.status === 'Submitted'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-4">
                      {e.status === 'Submitted' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              approveExpenseClaim(e.id);
                              showSuccessToast(`Approved expense claim ₹${e.totalAmount} for ${e.date}`);
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => {
                              rejectExpenseClaim(e.id);
                              showSuccessToast(`Rejected expense claim for ${e.date}`);
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-lg border border-rose-200 cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Signed & Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {approvalTab === 'dcr' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-teal-600" />
              <span>DCR Call Submission Sign-Offs</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Verify doctor feedback & POB orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px]">
                  <th className="p-3.5 pl-4">Date / Time</th>
                  <th className="p-3.5">Doctor / Chemist</th>
                  <th className="p-3.5">Beat Zone</th>
                  <th className="p-3.5">Call Type</th>
                  <th className="p-3.5">Promoted Brands</th>
                  <th className="p-3.5 text-right">POB Value</th>
                  <th className="p-3.5 text-center">Visit Status</th>
                  <th className="p-3.5 text-right pr-4">Manager Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dcrLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-4 font-bold text-slate-900">{log.date} ({log.time})</td>
                    <td className="p-3.5 font-bold text-slate-800">{log.entityName} ({log.entityType})</td>
                    <td className="p-3.5 text-slate-600">{log.townBeat}</td>
                    <td className="p-3.5 font-semibold text-slate-700">{log.callType}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs truncate">{log.brandsPromoted.join(', ')}</td>
                    <td className="p-3.5 text-right font-extrabold text-teal-700">₹{log.pobValue.toLocaleString()}</td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          log.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right pr-4">
                      {log.status !== 'Completed' ? (
                        <button
                          onClick={() => {
                            approveDCRLog(log.id);
                            showSuccessToast(`Verified & approved call log for ${log.entityName}`);
                          }}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Verify DCR</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-teal-700 font-extrabold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
