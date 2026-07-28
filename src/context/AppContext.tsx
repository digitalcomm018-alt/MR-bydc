import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  Chemist,
  Stockist,
  SampleItem,
  TourPlanDay,
  DCREntry,
  ExpenseClaim,
  BrandInfo,
  UserProfile,
  UserRole,
  GPSAttendancePunch,
  SpecialityConfig,
  DoctorClassConfig
} from '../types';
import {
  INITIAL_DOCTORS,
  INITIAL_CHEMISTS,
  INITIAL_STOCKISTS,
  INITIAL_BRANDS,
  INITIAL_SAMPLES,
  INITIAL_TOUR_PLAN,
  INITIAL_DCR_LOGS,
  INITIAL_EXPENSES,
  INITIAL_USERS,
  INITIAL_ATTENDANCE_PUNCHES,
  INITIAL_SPECIALITIES,
  INITIAL_DOCTOR_CLASSES
} from '../data/mockData';

interface AppContextType {
  doctors: Doctor[];
  chemists: Chemist[];
  stockists: Stockist[];
  brands: BrandInfo[];
  samples: SampleItem[];
  tourPlans: TourPlanDay[];
  dcrLogs: DCREntry[];
  expenses: ExpenseClaim[];
  attendancePunches: GPSAttendancePunch[];
  specialities: SpecialityConfig[];
  doctorClasses: DoctorClassConfig[];
  currentUser: UserProfile;
  usersList: UserProfile[];
  isAuthenticated: boolean;
  logout: () => void;
  toggleUserLiveSessionStatus: (userId: string, targetLoggedIn: boolean) => void;
  updateUserLoginPosition: (userId: string, position: UserProfile['loginPosition']) => void;
  selectedMRFilter: string;
  activeTab: string;
  selectedBeat: string;
  mrProfile: {
    name: string;
    employeeId: string;
    hqLocation: string;
    territory: string;
    managerName: string;
  };
  setActiveTab: (tab: string) => void;
  setSelectedBeat: (beat: string) => void;
  setSelectedMRFilter: (mrId: string) => void;
  switchUserRole: (role: UserRole) => void;
  loginAsUser: (userId: string) => void;
  addUser: (user: Omit<UserProfile, 'id'>) => void;
  updateUser: (user: UserProfile) => void;
  deleteUser: (id: string) => void;
  addAttendancePunch: (punch: Omit<GPSAttendancePunch, 'id'>) => void;
  addDCRLog: (entry: Omit<DCREntry, 'id'>) => void;
  updateDCRLog: (entry: DCREntry) => void;
  deleteDCRLog: (id: string) => void;
  approveDCRLog: (id: string) => void;
  addDoctor: (doc: Omit<Doctor, 'id' | 'visitsCompletedThisMonth'>) => void;
  updateDoctor: (doc: Doctor) => void;
  deleteDoctor: (id: string) => void;
  addChemist: (chemist: Omit<Chemist, 'id'>) => void;
  updateChemist: (chemist: Chemist) => void;
  deleteChemist: (id: string) => void;
  addStockist: (stockist: Omit<Stockist, 'id'>) => void;
  updateStockist: (stockist: Stockist) => void;
  deleteStockist: (id: string) => void;
  updateTourPlan: (updatedPlan: TourPlanDay) => void;
  addTourPlanDay: (plan: Omit<TourPlanDay, 'id'>) => void;
  deleteTourPlanDay: (id: string) => void;
  approveTourPlanDay: (id: string) => void;
  rejectTourPlanDay: (id: string) => void;
  addExpenseClaim: (claim: Omit<ExpenseClaim, 'id'>) => void;
  updateExpenseClaim: (claim: ExpenseClaim) => void;
  deleteExpenseClaim: (id: string) => void;
  updateExpenseClaimStatus: (id: string, status: ExpenseClaim['status']) => void;
  approveExpenseClaim: (id: string) => void;
  rejectExpenseClaim: (id: string) => void;
  replenishSampleStock: (brandName: string, batchNo: string, addedQty: number) => void;
  addSampleItem: (sample: Omit<SampleItem, 'id'>) => void;
  updateSampleItem: (sample: SampleItem) => void;
  deleteSampleItem: (id: string) => void;
  addSpeciality: (spec: Omit<SpecialityConfig, 'id'>) => void;
  deleteSpeciality: (id: string) => void;
  addDoctorClass: (docClass: Omit<DoctorClassConfig, 'id'>) => void;
  deleteDoctorClass: (id: string) => void;
  bulkImportDoctors: (importedDocs: Doctor[]) => void;
  bulkImportChemists: (importedChemists: Chemist[]) => void;
  bulkImportDCRLogs: (importedLogs: DCREntry[]) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'pharmapulse_mr_data_v1';

function safeGetLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return fallback;
    return JSON.parse(saved) as T;
  } catch (err) {
    console.warn(`Failed to read ${key} from localStorage, using fallback:`, err);
    return fallback;
  }
}

function safeSetLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to write ${key} to localStorage:`, err);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedBeat, setSelectedBeat] = useState<string>('Central Beat');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeGetLocalStorage<boolean>(`${LOCAL_STORAGE_KEY}_is_auth`, false);
  });

  const [usersList, setUsersList] = useState<UserProfile[]>(() => {
    return safeGetLocalStorage<UserProfile[]>(`${LOCAL_STORAGE_KEY}_users_list`, INITIAL_USERS);
  });
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return safeGetLocalStorage<UserProfile>(`${LOCAL_STORAGE_KEY}_user`, INITIAL_USERS[0]);
  });
  const [selectedMRFilter, setSelectedMRFilter] = useState<string>('all');

  const mrProfile = {
    name: currentUser.name,
    employeeId: currentUser.employeeId,
    hqLocation: currentUser.hqLocation,
    territory: currentUser.territory,
    managerName: currentUser.managerName
  };

  const [attendancePunches, setAttendancePunches] = useState<GPSAttendancePunch[]>(() => {
    return safeGetLocalStorage<GPSAttendancePunch[]>(`${LOCAL_STORAGE_KEY}_attendance`, INITIAL_ATTENDANCE_PUNCHES);
  });

  const [specialities, setSpecialities] = useState<SpecialityConfig[]>(() => {
    return safeGetLocalStorage<SpecialityConfig[]>(`${LOCAL_STORAGE_KEY}_specialities`, INITIAL_SPECIALITIES);
  });

  const [doctorClasses, setDoctorClasses] = useState<DoctorClassConfig[]>(() => {
    return safeGetLocalStorage<DoctorClassConfig[]>(`${LOCAL_STORAGE_KEY}_doctor_classes`, INITIAL_DOCTOR_CLASSES);
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    return safeGetLocalStorage<Doctor[]>(`${LOCAL_STORAGE_KEY}_doctors`, INITIAL_DOCTORS);
  });

  const [chemists, setChemists] = useState<Chemist[]>(() => {
    return safeGetLocalStorage<Chemist[]>(`${LOCAL_STORAGE_KEY}_chemists`, INITIAL_CHEMISTS);
  });

  const [stockists, setStockists] = useState<Stockist[]>(() => {
    return safeGetLocalStorage<Stockist[]>(`${LOCAL_STORAGE_KEY}_stockists`, INITIAL_STOCKISTS);
  });
  const [brands] = useState<BrandInfo[]>(INITIAL_BRANDS);

  const [samples, setSamples] = useState<SampleItem[]>(() => {
    return safeGetLocalStorage<SampleItem[]>(`${LOCAL_STORAGE_KEY}_samples`, INITIAL_SAMPLES);
  });

  const [tourPlans, setTourPlans] = useState<TourPlanDay[]>(() => {
    return safeGetLocalStorage<TourPlanDay[]>(`${LOCAL_STORAGE_KEY}_tourplans`, INITIAL_TOUR_PLAN);
  });

  const [dcrLogs, setDcrLogs] = useState<DCREntry[]>(() => {
    return safeGetLocalStorage<DCREntry[]>(`${LOCAL_STORAGE_KEY}_dcrlogs`, INITIAL_DCR_LOGS);
  });

  const [expenses, setExpenses] = useState<ExpenseClaim[]>(() => {
    return safeGetLocalStorage<ExpenseClaim[]>(`${LOCAL_STORAGE_KEY}_expenses`, INITIAL_EXPENSES);
  });

  // Save to LocalStorage
  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_is_auth`, isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_user`, currentUser);
  }, [currentUser]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_attendance`, attendancePunches);
  }, [attendancePunches]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_specialities`, specialities);
  }, [specialities]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_doctor_classes`, doctorClasses);
  }, [doctorClasses]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_doctors`, doctors);
  }, [doctors]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_chemists`, chemists);
  }, [chemists]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_stockists`, stockists);
  }, [stockists]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_samples`, samples);
  }, [samples]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_tourplans`, tourPlans);
  }, [tourPlans]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_dcrlogs`, dcrLogs);
  }, [dcrLogs]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_expenses`, expenses);
  }, [expenses]);

  useEffect(() => {
    safeSetLocalStorage(`${LOCAL_STORAGE_KEY}_users_list`, usersList);
  }, [usersList]);

  const switchUserRole = (role: UserRole) => {
    const match = usersList.find((u) => u.role === role);
    if (match) {
      loginAsUser(match.id);
    } else {
      setCurrentUser((prev) => ({ ...prev, role }));
    }
  };

  const loginAsUser = (userId: string) => {
    const match = usersList.find((u) => u.id === userId);
    if (match) {
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today';
      const updatedUser: UserProfile = {
        ...match,
        isLoggedIn: true,
        lastLoginTimestamp: timeNow,
        currentWorkStatus: match.role === 'MR' ? 'Punched In • Active Field Duty' : 'Online • Portal Active'
      };
      setCurrentUser(updatedUser);
      setIsAuthenticated(true);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_is_auth`, JSON.stringify(true));
      setUsersList((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_is_auth`, JSON.stringify(false));
    if (currentUser) {
      setUsersList((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, isLoggedIn: false, currentWorkStatus: 'Offline • Logged Out' }
            : u
        )
      );
    }
  };

  const toggleUserLiveSessionStatus = (userId: string, targetLoggedIn: boolean) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today';
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            isLoggedIn: targetLoggedIn,
            lastLoginTimestamp: targetLoggedIn ? timeNow : u.lastLoginTimestamp,
            currentWorkStatus: targetLoggedIn ? 'Online (Admin Managed)' : 'Logged Out (Admin Remote Action)'
          };
        }
        return u;
      })
    );
    if (currentUser.id === userId && !targetLoggedIn) {
      setIsAuthenticated(false);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_is_auth`, JSON.stringify(false));
    }
  };

  const updateUserLoginPosition = (userId: string, position: UserProfile['loginPosition']) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            loginPosition: position
          };
        }
        return u;
      })
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, loginPosition: position }));
    }
  };

  const addUser = (userData: Omit<UserProfile, 'id'>) => {
    const newUser: UserProfile = {
      ...userData,
      id: `user-${Date.now()}`
    };
    setUsersList((prev) => [...prev, newUser]);
  };

  const updateUser = (updatedUser: UserProfile) => {
    setUsersList((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const deleteUser = (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    if (currentUser.id === id && usersList.length > 1) {
      const remaining = usersList.filter((u) => u.id !== id);
      setCurrentUser(remaining[0]);
    }
  };

  const addAttendancePunch = (punchData: Omit<GPSAttendancePunch, 'id'>) => {
    const newPunch: GPSAttendancePunch = {
      mrId: currentUser.id,
      mrName: currentUser.name,
      mrEmployeeId: currentUser.employeeId,
      ...punchData,
      id: `punch-${Date.now()}`
    };
    setAttendancePunches((prev) => [newPunch, ...prev]);
  };

  const addDCRLog = (entryData: Omit<DCREntry, 'id'>) => {
    const newId = `dcr-${Date.now()}`;
    const newEntry: DCREntry = {
      mrId: currentUser.id,
      mrName: currentUser.name,
      mrEmployeeId: currentUser.employeeId,
      ...entryData,
      id: newId
    };

    setDcrLogs((prev) => [newEntry, ...prev]);

    if (newEntry.status === 'Completed') {
      if (newEntry.entityType === 'Doctor') {
        setDoctors((prevDocs) =>
          prevDocs.map((doc) => {
            if (doc.id === newEntry.entityId || doc.name === newEntry.entityName) {
              return {
                ...doc,
                visitsCompletedThisMonth: doc.visitsCompletedThisMonth + 1,
                lastVisitDate: newEntry.date
              };
            }
            return doc;
          })
        );
      } else if (newEntry.entityType === 'Chemist') {
        setChemists((prevChem) =>
          prevChem.map((c) => {
            if (c.id === newEntry.entityId || c.name === newEntry.entityName) {
              return {
                ...c,
                lastVisitDate: newEntry.date,
                pobMonthlyAverage: newEntry.pobValue > 0 ? c.pobMonthlyAverage + newEntry.pobValue : c.pobMonthlyAverage
              };
            }
            return c;
          })
        );
      }

      if (newEntry.samplesGiven && newEntry.samplesGiven.length > 0) {
        setSamples((prevSamples) =>
          prevSamples.map((s) => {
            const distributedItem = newEntry.samplesGiven.find(
              (given) => given.brandName.toLowerCase() === s.brandName.toLowerCase()
            );
            if (distributedItem) {
              const newDistributed = s.distributedInDCR + distributedItem.quantity;
              const newBalance = Math.max(0, s.balanceStock - distributedItem.quantity);
              return {
                ...s,
                distributedInDCR: newDistributed,
                balanceStock: newBalance
              };
            }
            return s;
          })
        );
      }
    }
  };

  const updateDCRLog = (updated: DCREntry) => {
    setDcrLogs((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const deleteDCRLog = (id: string) => {
    setDcrLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const approveDCRLog = (id: string) => {
    setDcrLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Completed' } : item))
    );
  };

  const addDoctor = (docData: Omit<Doctor, 'id' | 'visitsCompletedThisMonth'>) => {
    const newDoc: Doctor = {
      ...docData,
      id: `doc-${Date.now()}`,
      visitsCompletedThisMonth: 0
    };
    setDoctors((prev) => [...prev, newDoc]);
  };

  const updateDoctor = (updated: Doctor) => {
    setDoctors((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const addChemist = (chemistData: Omit<Chemist, 'id'>) => {
    const newChem: Chemist = {
      ...chemistData,
      id: `chem-${Date.now()}`
    };
    setChemists((prev) => [...prev, newChem]);
  };

  const updateChemist = (updated: Chemist) => {
    setChemists((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteChemist = (id: string) => {
    setChemists((prev) => prev.filter((c) => c.id !== id));
  };

  const addStockist = (stockistData: Omit<Stockist, 'id'>) => {
    const newSt: Stockist = {
      ...stockistData,
      id: `st-${Date.now()}`
    };
    setStockists((prev) => [...prev, newSt]);
  };

  const updateStockist = (updated: Stockist) => {
    setStockists((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteStockist = (id: string) => {
    setStockists((prev) => prev.filter((s) => s.id !== id));
  };

  const updateTourPlan = (updatedPlan: TourPlanDay) => {
    setTourPlans((prev) => prev.map((tp) => (tp.id === updatedPlan.id ? updatedPlan : tp)));
  };

  const addTourPlanDay = (planData: Omit<TourPlanDay, 'id'>) => {
    const newPlan: TourPlanDay = {
      mrId: currentUser.id,
      mrName: currentUser.name,
      mrEmployeeId: currentUser.employeeId,
      ...planData,
      id: `tp-${Date.now()}`
    };
    setTourPlans((prev) => [...prev, newPlan]);
  };

  const deleteTourPlanDay = (id: string) => {
    setTourPlans((prev) => prev.filter((tp) => tp.id !== id));
  };

  const approveTourPlanDay = (id: string) => {
    setTourPlans((prev) => prev.map((tp) => (tp.id === id ? { ...tp, status: 'Approved' } : tp)));
  };

  const rejectTourPlanDay = (id: string) => {
    setTourPlans((prev) => prev.map((tp) => (tp.id === id ? { ...tp, status: 'Draft' } : tp)));
  };

  const addExpenseClaim = (claimData: Omit<ExpenseClaim, 'id'>) => {
    const newClaim: ExpenseClaim = {
      mrId: currentUser.id,
      mrName: currentUser.name,
      mrEmployeeId: currentUser.employeeId,
      ...claimData,
      id: `exp-${Date.now()}`
    };
    setExpenses((prev) => [newClaim, ...prev]);
  };

  const updateExpenseClaim = (updated: ExpenseClaim) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteExpenseClaim = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpenseClaimStatus = (id: string, status: ExpenseClaim['status']) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const approveExpenseClaim = (id: string) => {
    updateExpenseClaimStatus(id, 'Approved');
  };

  const rejectExpenseClaim = (id: string) => {
    updateExpenseClaimStatus(id, 'Rejected');
  };

  const replenishSampleStock = (brandName: string, batchNo: string, addedQty: number) => {
    setSamples((prev) =>
      prev.map((s) => {
        if (s.brandName.toLowerCase() === brandName.toLowerCase()) {
          const newReceived = s.receivedFromHQ + addedQty;
          const newBalance = s.balanceStock + addedQty;
          return {
            ...s,
            batchNo: batchNo || s.batchNo,
            receivedFromHQ: newReceived,
            balanceStock: newBalance
          };
        }
        return s;
      })
    );
  };

  const addSampleItem = (sampleData: Omit<SampleItem, 'id'>) => {
    const newSample: SampleItem = {
      ...sampleData,
      id: `sample-${Date.now()}`
    };
    setSamples((prev) => [...prev, newSample]);
  };

  const updateSampleItem = (updated: SampleItem) => {
    setSamples((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSampleItem = (id: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== id));
  };

  const addSpeciality = (specData: Omit<SpecialityConfig, 'id'>) => {
    const newSpec: SpecialityConfig = {
      ...specData,
      id: `spec-${Date.now()}`
    };
    setSpecialities((prev) => [...prev, newSpec]);
  };

  const deleteSpeciality = (id: string) => {
    setSpecialities((prev) => prev.filter((s) => s.id !== id));
  };

  const addDoctorClass = (classData: Omit<DoctorClassConfig, 'id'>) => {
    const newClass: DoctorClassConfig = {
      ...classData,
      id: `class-${Date.now()}`
    };
    setDoctorClasses((prev) => [...prev, newClass]);
  };

  const deleteDoctorClass = (id: string) => {
    setDoctorClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const bulkImportDoctors = (importedDocs: Doctor[]) => {
    setDoctors((prev) => [...importedDocs, ...prev]);
  };

  const bulkImportChemists = (importedChemists: Chemist[]) => {
    setChemists((prev) => [...importedChemists, ...prev]);
  };

  const bulkImportDCRLogs = (importedLogs: DCREntry[]) => {
    setDcrLogs((prev) => [...importedLogs, ...prev]);
  };

  const resetToDefaults = () => {
    setDoctors(INITIAL_DOCTORS);
    setChemists(INITIAL_CHEMISTS);
    setStockists(INITIAL_STOCKISTS);
    setSamples(INITIAL_SAMPLES);
    setTourPlans(INITIAL_TOUR_PLAN);
    setDcrLogs(INITIAL_DCR_LOGS);
    setExpenses(INITIAL_EXPENSES);
    setAttendancePunches(INITIAL_ATTENDANCE_PUNCHES);
    setSpecialities(INITIAL_SPECIALITIES);
    setDoctorClasses(INITIAL_DOCTOR_CLASSES);
    setCurrentUser(INITIAL_USERS[0]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        chemists,
        stockists,
        brands,
        samples,
        tourPlans,
        dcrLogs,
        expenses,
        attendancePunches,
        specialities,
        doctorClasses,
        currentUser,
        usersList,
        isAuthenticated,
        logout,
        toggleUserLiveSessionStatus,
        updateUserLoginPosition,
        selectedMRFilter,
        activeTab,
        selectedBeat,
        mrProfile,
        setActiveTab,
        setSelectedBeat,
        setSelectedMRFilter,
        switchUserRole,
        loginAsUser,
        addUser,
        updateUser,
        deleteUser,
        addAttendancePunch,
        addDCRLog,
        updateDCRLog,
        deleteDCRLog,
        approveDCRLog,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addChemist,
        updateChemist,
        deleteChemist,
        addStockist,
        updateStockist,
        deleteStockist,
        updateTourPlan,
        addTourPlanDay,
        deleteTourPlanDay,
        approveTourPlanDay,
        rejectTourPlanDay,
        addExpenseClaim,
        updateExpenseClaim,
        deleteExpenseClaim,
        updateExpenseClaimStatus,
        approveExpenseClaim,
        rejectExpenseClaim,
        replenishSampleStock,
        addSampleItem,
        updateSampleItem,
        deleteSampleItem,
        addSpeciality,
        deleteSpeciality,
        addDoctorClass,
        deleteDoctorClass,
        bulkImportDoctors,
        bulkImportChemists,
        bulkImportDCRLogs,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

