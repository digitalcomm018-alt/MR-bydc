import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Doctor, Chemist, Stockist, Speciality, DoctorClass } from '../types';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  Users,
  Search,
  Plus,
  Stethoscope,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Clock,
  Cake,
  Heart,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  Pencil,
  Trash2
} from 'lucide-react';

export const DoctorCRMView: React.FC = () => {
  const {
    doctors,
    chemists,
    stockists,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addChemist,
    updateChemist,
    deleteChemist,
    addStockist,
    updateStockist,
    deleteStockist,
    dcrLogs,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'doctors' | 'chemists' | 'stockists'>('doctors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  
  // Selected doctor detail drawer
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<Doctor | null>(null);

  // Doctor Modals
  const [addDoctorModalOpen, setAddDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [newDocName, setNewDocName] = useState('');
  const [newDocQual, setNewDocQual] = useState('MD (Medicine)');
  const [newDocSpec, setNewDocSpec] = useState<Speciality>('Cardiology');
  const [newDocClass, setNewDocClass] = useState<DoctorClass>('A');
  const [newDocClinic, setNewDocClinic] = useState('');
  const [newDocBeat, setNewDocBeat] = useState('Central Beat');
  const [newDocPhone, setNewDocPhone] = useState('+91 98000 00000');
  const [newDocEmail, setNewDocEmail] = useState('doctor@healthnet.com');

  // Chemist Modal State
  const [chemistModalOpen, setChemistModalOpen] = useState(false);
  const [editingChemist, setEditingChemist] = useState<Chemist | null>(null);
  const [chemName, setChemName] = useState('');
  const [chemContact, setChemContact] = useState('');
  const [chemPhone, setChemPhone] = useState('+91 98222 11111');
  const [chemBeat, setChemBeat] = useState('Central Beat');
  const [chemStockist, setChemStockist] = useState('Apex Pharma Distributors');
  const [chemPobAvg, setChemPobAvg] = useState(15000);

  // Stockist Modal State
  const [stockistModalOpen, setStockistModalOpen] = useState(false);
  const [editingStockist, setEditingStockist] = useState<Stockist | null>(null);
  const [stName, setStName] = useState('');
  const [stContact, setStContact] = useState('');
  const [stPhone, setStPhone] = useState('+91 98111 00000');
  const [stBeat, setStBeat] = useState('Central Beat');
  const [stCredit, setStCredit] = useState(500000);
  const [stOutstanding, setStOutstanding] = useState(120000);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.townBeat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = selectedSpeciality === 'All' || doc.speciality === selectedSpeciality;
    const matchesClass = selectedClass === 'All' || doc.doctorClass === selectedClass;
    return matchesSearch && matchesSpec && matchesClass;
  });

  const filteredChemists = chemists.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.townBeat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    addDoctor({
      name: newDocName,
      qualification: newDocQual,
      speciality: newDocSpec,
      doctorClass: newDocClass,
      clinicName: newDocClinic || 'City Clinic',
      address: 'Suite 101, Main Healthcare Complex',
      townBeat: newDocBeat,
      phone: newDocPhone,
      email: newDocEmail,
      birthday: '08-20',
      anniversary: '11-15',
      preferredTime: '11:00 AM - 01:00 PM',
      monthlyTargetVisits: newDocClass === 'A+' ? 4 : newDocClass === 'A' ? 3 : 2,
      lastVisitDate: 'Not Visited',
      keyFocusBrands: ['Cardia-50', 'NeuroVibe'],
      prescribingPotential: newDocClass === 'A+' ? 'High' : 'Medium'
    });

    setAddDoctorModalOpen(false);
    setNewDocName('');
  };

  const handleOpenEditDoctor = (doc: Doctor) => {
    setEditingDoctor(doc);
    setNewDocName(doc.name);
    setNewDocQual(doc.qualification);
    setNewDocSpec(doc.speciality);
    setNewDocClass(doc.doctorClass);
    setNewDocClinic(doc.clinicName);
    setNewDocBeat(doc.townBeat);
    setNewDocPhone(doc.phone);
    setNewDocEmail(doc.email);
  };

  const handleSaveEditDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor || !newDocName.trim()) return;

    updateDoctor({
      ...editingDoctor,
      name: newDocName,
      qualification: newDocQual,
      speciality: newDocSpec,
      doctorClass: newDocClass,
      clinicName: newDocClinic,
      townBeat: newDocBeat,
      phone: newDocPhone,
      email: newDocEmail,
      monthlyTargetVisits: newDocClass === 'A+' ? 4 : newDocClass === 'A' ? 3 : 2
    });

    if (selectedDoctorModal && selectedDoctorModal.id === editingDoctor.id) {
      setSelectedDoctorModal({
        ...selectedDoctorModal,
        name: newDocName,
        qualification: newDocQual,
        speciality: newDocSpec,
        doctorClass: newDocClass,
        clinicName: newDocClinic,
        townBeat: newDocBeat,
        phone: newDocPhone,
        email: newDocEmail
      });
    }

    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteDoctor(id);
      if (selectedDoctorModal?.id === id) {
        setSelectedDoctorModal(null);
      }
    }
  };

  const handleOpenAddChemist = () => {
    setEditingChemist(null);
    setChemName('');
    setChemContact('');
    setChemPhone('+91 98222 11111');
    setChemBeat('Central Beat');
    setChemStockist('Apex Pharma Distributors');
    setChemPobAvg(15000);
    setChemistModalOpen(true);
  };

  const handleOpenEditChemist = (chem: Chemist) => {
    setEditingChemist(chem);
    setChemName(chem.name);
    setChemContact(chem.contactPerson);
    setChemPhone(chem.phone);
    setChemBeat(chem.townBeat);
    setChemStockist(chem.mappedStockist);
    setChemPobAvg(chem.pobMonthlyAverage);
    setChemistModalOpen(true);
  };

  const handleSaveChemist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chemName.trim()) return;

    if (editingChemist) {
      updateChemist({
        ...editingChemist,
        name: chemName,
        contactPerson: chemContact || 'Manager',
        phone: chemPhone,
        townBeat: chemBeat,
        mappedStockist: chemStockist,
        pobMonthlyAverage: Number(chemPobAvg)
      });
    } else {
      addChemist({
        name: chemName,
        contactPerson: chemContact || 'Manager',
        phone: chemPhone,
        address: 'Chemist Market Zone',
        townBeat: chemBeat,
        mappedStockist: chemStockist,
        pobMonthlyAverage: Number(chemPobAvg),
        lastVisitDate: 'Not Visited'
      });
    }

    setChemistModalOpen(false);
  };

  const handleDeleteChemist = (id: string, name: string) => {
    if (window.confirm(`Delete chemist store "${name}"?`)) {
      deleteChemist(id);
    }
  };

  const handleOpenAddStockist = () => {
    setEditingStockist(null);
    setStName('');
    setStContact('');
    setStPhone('+91 98111 00000');
    setStBeat('Central Beat');
    setStCredit(500000);
    setStOutstanding(120000);
    setStockistModalOpen(true);
  };

  const handleOpenEditStockist = (st: Stockist) => {
    setEditingStockist(st);
    setStName(st.name);
    setStContact(st.contactPerson);
    setStPhone(st.phone);
    setStBeat(st.townBeat);
    setStCredit(st.creditLimit);
    setStOutstanding(st.outstandingAmount);
    setStockistModalOpen(true);
  };

  const handleSaveStockist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stName.trim()) return;

    if (editingStockist) {
      updateStockist({
        ...editingStockist,
        name: stName,
        contactPerson: stContact || 'Director',
        phone: stPhone,
        townBeat: stBeat,
        creditLimit: Number(stCredit),
        outstandingAmount: Number(stOutstanding)
      });
    } else {
      addStockist({
        name: stName,
        contactPerson: stContact || 'Director',
        phone: stPhone,
        townBeat: stBeat,
        creditLimit: Number(stCredit),
        outstandingAmount: Number(stOutstanding)
      });
    }

    setStockistModalOpen(false);
  };

  const handleDeleteStockist = (id: string, name: string) => {
    if (window.confirm(`Delete stockist "${name}"?`)) {
      deleteStockist(id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Flowing Header (Theme 1: Fresh Mint Aqua) */}
      <FlowingHeader
        themeIndex={1}
        badgeText="CRM Directory"
        title="Doctor & Customer Database"
        subtitle="Manage Doctor profiles, prescribing potential, chemist mappings, and visit histories across beats."
        icon={Users}
        actions={
          <div>
            {activeSubTab === 'doctors' && (
              <button
                onClick={() => {
                  setEditingDoctor(null);
                  setNewDocName('');
                  setAddDoctorModalOpen(true);
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Doctor</span>
              </button>
            )}

            {activeSubTab === 'chemists' && (
              <button
                onClick={handleOpenAddChemist}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Chemist Store</span>
              </button>
            )}

            {activeSubTab === 'stockists' && (
              <button
                onClick={handleOpenAddStockist}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Stockist Partner</span>
              </button>
            )}
          </div>
        }
      />

      {/* SubTab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('doctors')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'doctors'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-emerald-400" />
          <span>Doctor Master ({doctors.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('chemists')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'chemists'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>Chemist Directory ({chemists.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('stockists')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'stockists'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span>Stockist Partners ({stockists.length})</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by doctor name, clinic, beat or chemist..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-600"
          />
        </div>

        {activeSubTab === 'doctors' && (
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
              <Filter className="w-3.5 h-3.5 text-teal-600" />
              <span>Speciality:</span>
            </div>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold cursor-pointer shrink-0"
            >
              <option value="All">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Diabetology">Diabetology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold cursor-pointer shrink-0"
            >
              <option value="All">All Classes</option>
              <option value="A+">Class A+</option>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
            </select>
          </div>
        )}
      </div>

      {/* DOCTORS TAB */}
      {activeSubTab === 'doctors' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => {
            const historyCount = dcrLogs.filter(
              (d) => d.entityId === doc.id || d.entityName === doc.name
            ).length;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-sm shrink-0">
                        {doc.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {doc.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500">
                          {doc.qualification} • <span className="text-teal-700 font-bold">{doc.speciality}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditDoctor(doc);
                        }}
                        title="Edit Doctor"
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDoctor(doc.id, doc.name);
                        }}
                        title="Delete Doctor"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          doc.doctorClass === 'A+'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : doc.doctorClass === 'A'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        Class {doc.doctorClass}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{doc.clinicName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.townBeat}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.preferredTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.phone}</span>
                    </div>
                  </div>

                  {/* Monthly Visit Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                      <span>Monthly Visits Compliance</span>
                      <span className="text-teal-600">
                        {doc.visitsCompletedThisMonth} / {doc.monthlyTargetVisits} Calls
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-teal-600 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (doc.visitsCompletedThisMonth / doc.monthlyTargetVisits) * 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{historyCount} Past DCRs</span>
                  </div>

                  <button
                    onClick={() => setSelectedDoctorModal(doc)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Profile & History</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CHEMISTS TAB */}
      {activeSubTab === 'chemists' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5 pl-4">Chemist Name</th>
                <th className="p-3.5">Key Contact</th>
                <th className="p-3.5">Town / Beat</th>
                <th className="p-3.5">Mapped Stockist</th>
                <th className="p-3.5 text-right">Avg Monthly POB</th>
                <th className="p-3.5 text-center">Last Visited</th>
                <th className="p-3.5 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChemists.map((chem) => (
                <tr key={chem.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-slate-900">{chem.name}</td>
                  <td className="p-3.5 text-slate-700 font-medium">
                    {chem.contactPerson} ({chem.phone})
                  </td>
                  <td className="p-3.5 text-slate-600">{chem.townBeat}</td>
                  <td className="p-3.5 font-semibold text-teal-800">{chem.mappedStockist}</td>
                  <td className="p-3.5 text-right font-extrabold text-emerald-700">
                    ₹{chem.pobMonthlyAverage.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-center font-medium text-slate-500">
                    {chem.lastVisitDate}
                  </td>
                  <td className="p-3.5 text-right pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEditChemist(chem)}
                        title="Edit Chemist"
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteChemist(chem.id, chem.name)}
                        title="Delete Chemist"
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
      )}

      {/* STOCKISTS TAB */}
      {activeSubTab === 'stockists' && (
        <div className="grid md:grid-cols-2 gap-4">
          {stockists.map((st) => (
            <div key={st.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900">{st.name}</h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditStockist(st)}
                    title="Edit Stockist"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStockist(st.id, st.name)}
                    title="Delete Stockist"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                    Stockist Partner
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Key Person: <strong className="text-slate-800">{st.contactPerson}</strong> ({st.phone})
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Credit Limit</span>
                  <span className="font-extrabold text-slate-800">₹{st.creditLimit.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Outstanding Amount</span>
                  <span className="font-extrabold text-amber-700">₹{st.outstandingAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DOCTOR PROFILE DETAIL MODAL */}
      {selectedDoctorModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {selectedDoctorModal.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-800">
                    Class {selectedDoctorModal.doctorClass}
                  </span>
                </div>
                <p className="text-xs text-teal-700 font-bold mt-0.5">
                  {selectedDoctorModal.qualification} • {selectedDoctorModal.speciality}
                </p>
              </div>

              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Clinic Name & Address:</span>
                  <span className="font-bold text-slate-800">{selectedDoctorModal.clinicName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Town Beat Zone:</span>
                  <span className="font-bold text-slate-800">{selectedDoctorModal.townBeat}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Preferred Call Time:</span>
                  <span className="font-bold text-slate-800">{selectedDoctorModal.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Phone & Email:</span>
                  <span className="font-bold text-slate-800">{selectedDoctorModal.phone}</span>
                </div>
              </div>

              {/* Special Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-pink-50 p-3 rounded-xl border border-pink-200 text-pink-900 flex items-center gap-2">
                  <Cake className="w-4 h-4 text-pink-600" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-pink-700">Birthday</span>
                    <span className="font-bold">{selectedDoctorModal.birthday}</span>
                  </div>
                </div>

                <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-purple-700">Anniversary</span>
                    <span className="font-bold">{selectedDoctorModal.anniversary}</span>
                  </div>
                </div>
              </div>

              {/* Past Call History */}
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Past DCR Visit Logs</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {dcrLogs
                    .filter((d) => d.entityId === selectedDoctorModal.id || d.entityName === selectedDoctorModal.name)
                    .map((log) => (
                      <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                          <span>{log.date} ({log.time})</span>
                          <span className="text-teal-700">{log.callType}</span>
                        </div>
                        <p className="text-slate-600">{log.doctorFeedback}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedDoctorModal(null);
                  setActiveTab('dcr');
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Log DCR For Doctor
              </button>

              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW DOCTOR MODAL */}
      {addDoctorModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateDoctor}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Add Doctor to Territory Master</span>
              </h3>
              <button
                type="button"
                onClick={() => setAddDoctorModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Dr. A. K. Varma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  value={newDocQual}
                  onChange={(e) => setNewDocQual(e.target.value)}
                  placeholder="e.g. MD, DM"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Speciality</label>
                <select
                  value={newDocSpec}
                  onChange={(e) => setNewDocSpec(e.target.value as Speciality)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Diabetology">Diabetology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Class</label>
                <select
                  value={newDocClass}
                  onChange={(e) => setNewDocClass(e.target.value as DoctorClass)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="A+">Class A+ (4 visits/mo)</option>
                  <option value="A">Class A (3 visits/mo)</option>
                  <option value="B">Class B (2 visits/mo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={newDocClinic}
                  onChange={(e) => setNewDocClinic(e.target.value)}
                  placeholder="e.g. City Heart Clinic"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Town / Beat</label>
                <select
                  value={newDocBeat}
                  onChange={(e) => setNewDocBeat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat</option>
                  <option value="Suburb North Beat">Suburb North Beat</option>
                  <option value="South Industrial Beat">South Industrial Beat</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAddDoctorModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save Doctor
              </button>
            </div>
          </form>
        </div>
      )}
      {/* EDIT DOCTOR MODAL */}
      {editingDoctor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEditDoctor}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Pencil className="w-4 h-4 text-emerald-600" />
                <span>Edit Doctor Profile Details</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  value={newDocQual}
                  onChange={(e) => setNewDocQual(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Speciality</label>
                <select
                  value={newDocSpec}
                  onChange={(e) => setNewDocSpec(e.target.value as Speciality)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Diabetology">Diabetology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Class</label>
                <select
                  value={newDocClass}
                  onChange={(e) => setNewDocClass(e.target.value as DoctorClass)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="A+">Class A+ (4 visits/mo)</option>
                  <option value="A">Class A (3 visits/mo)</option>
                  <option value="B">Class B (2 visits/mo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={newDocClinic}
                  onChange={(e) => setNewDocClinic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Town / Beat</label>
                <select
                  value={newDocBeat}
                  onChange={(e) => setNewDocBeat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat</option>
                  <option value="Suburb North Beat">Suburb North Beat</option>
                  <option value="South Industrial Beat">South Industrial Beat</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newDocPhone}
                  onChange={(e) => setNewDocPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newDocEmail}
                  onChange={(e) => setNewDocEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Update Doctor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD/EDIT CHEMIST MODAL */}
      {chemistModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveChemist}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>{editingChemist ? 'Edit Chemist Store' : 'Add New Chemist Store'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setChemistModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chemist Store Name</label>
                <input
                  type="text"
                  required
                  value={chemName}
                  onChange={(e) => setChemName(e.target.value)}
                  placeholder="e.g. Life Care Chemist"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Contact Person</label>
                <input
                  type="text"
                  value={chemContact}
                  onChange={(e) => setChemContact(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={chemPhone}
                  onChange={(e) => setChemPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Town / Beat</label>
                <select
                  value={chemBeat}
                  onChange={(e) => setChemBeat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat</option>
                  <option value="Suburb North Beat">Suburb North Beat</option>
                  <option value="South Industrial Beat">South Industrial Beat</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mapped Stockist</label>
                <select
                  value={chemStockist}
                  onChange={(e) => setChemStockist(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  {stockists.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Avg Monthly POB (₹)</label>
                <input
                  type="number"
                  value={chemPobAvg}
                  onChange={(e) => setChemPobAvg(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setChemistModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save Chemist
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD/EDIT STOCKIST MODAL */}
      {stockistModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveStockist}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>{editingStockist ? 'Edit Stockist Partner' : 'Add New Stockist Partner'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setStockistModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stockist Company Name</label>
                <input
                  type="text"
                  required
                  value={stName}
                  onChange={(e) => setStName(e.target.value)}
                  placeholder="e.g. Apex Pharma Distributors"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Person / Partner</label>
                <input
                  type="text"
                  value={stContact}
                  onChange={(e) => setStContact(e.target.value)}
                  placeholder="e.g. Vikram Shah"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={stPhone}
                  onChange={(e) => setStPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Town / Beat Zone</label>
                <select
                  value={stBeat}
                  onChange={(e) => setStBeat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Central Beat">Central Beat</option>
                  <option value="Suburb North Beat">Suburb North Beat</option>
                  <option value="South Industrial Beat">South Industrial Beat</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Credit Limit (₹)</label>
                <input
                  type="number"
                  value={stCredit}
                  onChange={(e) => setStCredit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Outstanding Balance (₹)</label>
                <input
                  type="number"
                  value={stOutstanding}
                  onChange={(e) => setStOutstanding(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setStockistModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Save Stockist
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
