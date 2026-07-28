import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Doctor, Chemist, Stockist, DCREntry } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  FileSpreadsheet,
  Download,
  Upload,
  Printer,
  FileText,
  Database,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  Receipt,
  Map,
  ClipboardCheck
} from 'lucide-react';

export const ReportsAndDataView: React.FC = () => {
  const {
    doctors,
    chemists,
    stockists,
    dcrLogs,
    expenses,
    tourPlans,
    bulkImportDoctors,
    bulkImportChemists,
    bulkImportDCRLogs,
    mrProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'export' | 'pdf' | 'import'>('export');
  const [importType, setImportType] = useState<'doctors' | 'chemists' | 'dcr'>('doctors');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [parsedPreviewCount, setParsedPreviewCount] = useState<number>(0);

  // CSV Exporter Helper
  const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((val) => {
            const str = String(val ?? '');
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportDoctors = () => {
    const headers = [
      'Doctor Name',
      'Qualification',
      'Speciality',
      'Class',
      'Clinic Name',
      'Town Beat',
      'Phone',
      'Email',
      'Monthly Target Visits',
      'Visits Completed',
      'Last Visit Date',
      'Prescribing Potential'
    ];
    const rows = doctors.map((d) => [
      d.name,
      d.qualification,
      d.speciality,
      d.doctorClass,
      d.clinicName,
      d.townBeat,
      d.phone,
      d.email,
      d.monthlyTargetVisits,
      d.visitsCompletedThisMonth,
      d.lastVisitDate,
      d.prescribingPotential
    ]);
    downloadCSV('PharmaPulse_Doctor_Master', headers, rows);
  };

  const handleExportChemists = () => {
    const headers = ['Chemist Name', 'Contact Person', 'Phone', 'Address', 'Town Beat', 'Mapped Stockist', 'POB Monthly Avg', 'Last Visit Date'];
    const rows = chemists.map((c) => [
      c.name,
      c.contactPerson,
      c.phone,
      c.address,
      c.townBeat,
      c.mappedStockist,
      c.pobMonthlyAverage,
      c.lastVisitDate
    ]);
    downloadCSV('PharmaPulse_Chemist_Network', headers, rows);
  };

  const handleExportDCRLogs = () => {
    const headers = ['Date', 'Time', 'Type', 'Name', 'Beat', 'Call Type', 'Promoted Brands', 'POB Value (₹)', 'Feedback', 'Status'];
    const rows = dcrLogs.map((d) => [
      d.date,
      d.time,
      d.entityType,
      d.entityName,
      d.townBeat,
      d.callType,
      d.brandsPromoted.join('; '),
      d.pobValue,
      d.doctorFeedback,
      d.status
    ]);
    downloadCSV('PharmaPulse_DCR_Call_Ledger', headers, rows);
  };

  const handleExportExpenses = () => {
    const headers = ['Date', 'Town Beat', 'DA (₹)', 'TA (₹)', 'Hotel (₹)', 'Misc (₹)', 'Total Amount (₹)', 'Status', 'Notes'];
    const rows = expenses.map((e) => [
      e.date,
      e.townBeat,
      e.dailyAllowanceDA,
      e.travelAllowanceTA,
      e.hotelLodging,
      e.miscellaneous,
      e.totalAmount,
      e.status,
      e.notes || ''
    ]);
    downloadCSV('PharmaPulse_Expense_Claims', headers, rows);
  };

  // CSV Parser for Import Old Data
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
      if (lines.length <= 1) {
        setImportStatus('Error: CSV file contains no data rows.');
        return;
      }

      const rows = lines.slice(1).map((line) => line.split(',').map((cell) => cell.replace(/^"|"$/g, '').trim()));

      if (importType === 'doctors') {
        const importedDocs: Doctor[] = rows.map((r, idx) => ({
          id: `imp-doc-${Date.now()}-${idx}`,
          name: r[0] || 'Dr. Imported',
          qualification: r[1] || 'MBBS',
          speciality: r[2] || 'General Medicine',
          doctorClass: (r[3] as any) || 'A',
          clinicName: r[4] || 'Clinic',
          address: r[5] || 'City',
          townBeat: r[6] || 'Central Beat',
          phone: r[7] || '+91 90000 00000',
          email: r[8] || 'doc@example.com',
          birthday: '1985-05-15',
          anniversary: '2012-11-20',
          preferredTime: '05:00 PM - 07:00 PM',
          monthlyTargetVisits: Number(r[8]) || 3,
          visitsCompletedThisMonth: 0,
          lastVisitDate: '2026-07-20',
          keyFocusBrands: ['Cardia-50', 'NeuroVibe'],
          prescribingPotential: 'High'
        }));

        bulkImportDoctors(importedDocs);
        setParsedPreviewCount(importedDocs.length);
        setImportStatus(`Successfully imported ${importedDocs.length} historic Doctor profiles into CRM!`);
      } else if (importType === 'chemists') {
        const importedChemists: Chemist[] = rows.map((r, idx) => ({
          id: `imp-chem-${Date.now()}-${idx}`,
          name: r[0] || 'Imported Chemist',
          contactPerson: r[1] || 'Manager',
          phone: r[2] || '+91 90000 00000',
          address: r[3] || 'Beat Market',
          townBeat: r[4] || 'Central Beat',
          mappedStockist: r[5] || 'Apex Pharma Distributors',
          pobMonthlyAverage: Number(r[6]) || 12000,
          lastVisitDate: '2026-07-22'
        }));

        bulkImportChemists(importedChemists);
        setParsedPreviewCount(importedChemists.length);
        setImportStatus(`Successfully imported ${importedChemists.length} Chemist records!`);
      } else if (importType === 'dcr') {
        const importedLogs: DCREntry[] = rows.map((r, idx) => ({
          id: `imp-dcr-${Date.now()}-${idx}`,
          date: r[0] || '2026-07-20',
          time: r[1] || '11:00 AM',
          entityType: 'Doctor',
          entityId: `imp-doc-${idx}`,
          entityName: r[2] || 'Dr. Sample Call',
          townBeat: r[3] || 'Central Beat',
          callType: 'Core Visit',
          brandsPromoted: ['Cardia-50'],
          samplesGiven: [],
          pobValue: Number(r[4]) || 0,
          doctorFeedback: r[5] || 'Sample import feedback note',
          agreedNextVisitDate: '2026-08-05',
          status: 'Completed'
        }));

        bulkImportDCRLogs(importedLogs);
        setParsedPreviewCount(importedLogs.length);
        setImportStatus(`Successfully imported ${importedLogs.length} historic DCR Call logs!`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Flowing Header (Theme 5: Violet Amethyst Flow) */}
      <FlowingHeader
        themeIndex={5}
        badgeText="Data Center & Analytics Reports"
        title="Reports & Excel Data Management"
        subtitle="Export DCR ledgers, Doctor CRM, Expense vouchers to Excel/CSV, generate PDF summaries, or bulk import old legacy data."
        icon={Database}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'export' ? 'bg-purple-950 text-purple-100 shadow-md' : 'bg-white/20 text-purple-950 hover:bg-white/30'
              }`}
            >
              Excel Export
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pdf' ? 'bg-purple-950 text-purple-100 shadow-md' : 'bg-white/20 text-purple-950 hover:bg-white/30'
              }`}
            >
              PDF Printable
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'import' ? 'bg-purple-950 text-purple-100 shadow-md' : 'bg-white/20 text-purple-950 hover:bg-white/30'
              }`}
            >
              Bulk CSV Import
            </button>
          </div>
        }
      />

      {/* EXPORT DATA TAB */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Doctor CRM Master</h3>
              <p className="text-xs text-slate-500 mt-1">
                Full list of {doctors.length} doctors with speciality, class, beats, and visit counts.
              </p>
            </div>
            <button
              onClick={handleExportDoctors}
              className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV / Excel</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Chemist & Stockist Network</h3>
              <p className="text-xs text-slate-500 mt-1">
                Chemist directory ({chemists.length}), mapped stockists, and POB order averages.
              </p>
            </div>
            <button
              onClick={handleExportChemists}
              className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV / Excel</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">DCR Daily Call Ledger</h3>
              <p className="text-xs text-slate-500 mt-1">
                All {dcrLogs.length} call submissions, POB booking values, and doctor feedback.
              </p>
            </div>
            <button
              onClick={handleExportDCRLogs}
              className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV / Excel</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">TA / DA Expense Claims</h3>
              <p className="text-xs text-slate-500 mt-1">
                Monthly expense claims ({expenses.length}), allowance breakdowns, and approval statuses.
              </p>
            </div>
            <button
              onClick={handleExportExpenses}
              className="w-full py-2.5 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV / Excel</span>
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE PDF REPORT TAB */}
      {activeTab === 'pdf' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <span>Monthly DCR Field Performance Report & Voucher</span>
              </h3>
              <p className="text-xs text-slate-500">Official company formatted layout ready for printing or saving as PDF</p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* Printable Report Preview Container */}
          <div id="printable-report" className="p-8 border-2 border-slate-200 rounded-2xl bg-white text-slate-900 space-y-6 shadow-xs font-sans">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">PharmaPulse Pharmaceuticals Ltd.</h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">Field Operations Monthly Summary Voucher</p>
              </div>
              <div className="text-right text-xs">
                <div className="font-black text-slate-900">Period: July 2026</div>
                <div className="text-slate-500">Generated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Field Representative</div>
                <div className="font-extrabold text-slate-900">{mrProfile.name}</div>
                <div className="text-[11px] text-slate-600">{mrProfile.employeeId}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Territory Zone</div>
                <div className="font-extrabold text-slate-900">{mrProfile.territory}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Headquarters</div>
                <div className="font-extrabold text-slate-900">{mrProfile.hqLocation}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Reporting Manager</div>
                <div className="font-extrabold text-slate-900">{mrProfile.managerName}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <div className="text-2xl font-black text-teal-800">{dcrLogs.length}</div>
                <div className="text-xs font-bold text-teal-900">Total DCR Calls Submitted</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-2xl font-black text-emerald-800">
                  ₹{dcrLogs.reduce((acc, curr) => acc + curr.pobValue, 0).toLocaleString()}
                </div>
                <div className="text-xs font-bold text-emerald-900">Total POB Orders Booked</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                <div className="text-2xl font-black text-purple-800">
                  ₹{expenses.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString()}
                </div>
                <div className="text-xs font-bold text-purple-900">Total TA / DA Claims</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>Signature of MR: ______________________</div>
              <div>Manager Approval Sign: ______________________</div>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT LEGACY DATA TAB */}
      {activeTab === 'import' && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Upload className="w-4 h-4 text-teal-600" />
                <span>Import Old Datas (CSV Data Migration Tool)</span>
              </h3>
              <p className="text-xs text-slate-500">Bulk upload legacy CSV files into the app state and LocalStorage</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Data Type to Import</label>
              <div className="flex gap-2">
                {(['doctors', 'chemists', 'dcr'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setImportType(type)}
                    className={`px-4 py-2 rounded-xl font-bold border capitalize transition-all cursor-pointer ${
                      importType === type
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type === 'doctors' ? 'Doctors Master' : type === 'chemists' ? 'Chemists Directory' : 'Historic DCR Calls'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 text-center space-y-3">
              <Upload className="w-8 h-8 text-teal-600 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">Upload CSV File for {importType.toUpperCase()}</div>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                CSV headers format: <span className="font-mono bg-white px-2 py-0.5 rounded border">Name, Speciality/Contact, Class, Clinic, Beat, Phone, Email</span>
              </p>

              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block mx-auto text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
              />
            </div>

            {importStatus && (
              <div className="p-4 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{importStatus}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
