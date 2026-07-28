import { Doctor, Chemist, Stockist, BrandInfo, SampleItem, TourPlanDay, DCREntry, ExpenseClaim, EDetailingSlide, UserProfile } from '../types';

export const INITIAL_BRANDS: BrandInfo[] = [
  {
    id: 'brand-1',
    name: 'Cardia-50',
    genericName: 'Losartan Potassium 50mg + Hydrochlorothiazide 12.5mg',
    category: 'Cardiovascular',
    keyUSP: 'Dual action BP control with superior 24-hr trough-to-peak renal safety profile.',
    pricePerPack: 145,
    visualAidSlideCount: 4
  },
  {
    id: 'brand-2',
    name: 'NeuroVibe',
    genericName: 'Methylcobalamin 1500mcg + Alpha Lipoic Acid + Pregabalin',
    category: 'Neuro-Nutritional',
    keyUSP: 'Fast nerve regeneration and diabetic neuropathy pain relief in 7 days.',
    pricePerPack: 220,
    visualAidSlideCount: 3
  },
  {
    id: 'brand-3',
    name: 'GlycoMet-XL',
    genericName: 'Metformin Sustained Release 500mg + Teneligliptin 20mg',
    category: 'Anti-Diabetic',
    keyUSP: 'Extended 24-hr HbA1c reduction without hypoglycemia risk.',
    pricePerPack: 180,
    visualAidSlideCount: 3
  },
  {
    id: 'brand-4',
    name: 'Ceftri-1g Injection',
    genericName: 'Ceftriaxone 1000mg + Sulbactam 500mg',
    category: 'Antibiotics',
    keyUSP: 'Broad spectrum beta-lactamase resistant IV antibiotic for severe ICU & RTI infections.',
    pricePerPack: 310,
    visualAidSlideCount: 3
  },
  {
    id: 'brand-5',
    name: 'CalciD-Max',
    genericName: 'Calcium Carbonate 1250mg + Vitamin D3 2000 IU + Zinc',
    category: 'Orthopedics / Calcium',
    keyUSP: 'Maximum elemental calcium absorption for osteoporosis & fracture repair.',
    pricePerPack: 125,
    visualAidSlideCount: 2
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. A. K. Sharma',
    qualification: 'MD, DM (Cardiology)',
    speciality: 'Cardiology',
    doctorClass: 'A+',
    clinicName: 'Heart & Vascular Care Center',
    address: 'Suite 302, Metro Medical Enclave, Central Beat',
    townBeat: 'Central Beat',
    phone: '+91 98765 43210',
    email: 'aksharma.cardio@healthnet.com',
    birthday: '08-14',
    anniversary: '12-05',
    preferredTime: '11:00 AM - 01:30 PM',
    monthlyTargetVisits: 4,
    visitsCompletedThisMonth: 3,
    lastVisitDate: '2026-07-22',
    keyFocusBrands: ['Cardia-50', 'NeuroVibe'],
    prescribingPotential: 'High'
  },
  {
    id: 'doc-2',
    name: 'Dr. Meera Patel',
    qualification: 'MD, DGO (Gynecology)',
    speciality: 'Gynecology',
    doctorClass: 'A+',
    clinicName: 'Matritva Women Hospital',
    address: '45 Hospital Road, Suburb North Beat',
    townBeat: 'Suburb North Beat',
    phone: '+91 98230 11223',
    email: 'dr.meera.patel@gmail.com',
    birthday: '09-02',
    anniversary: '04-18',
    preferredTime: '05:00 PM - 07:30 PM',
    monthlyTargetVisits: 4,
    visitsCompletedThisMonth: 4,
    lastVisitDate: '2026-07-25',
    keyFocusBrands: ['CalciD-Max', 'Ceftri-1g Injection'],
    prescribingPotential: 'High'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Verma',
    qualification: 'MD (Internal Medicine), FACP',
    speciality: 'Diabetology',
    doctorClass: 'A',
    clinicName: 'Verma Diabetes Clinic',
    address: '12 Civil Lines, Central Beat',
    townBeat: 'Central Beat',
    phone: '+91 99112 88334',
    email: 'rajesh.verma@diacare.org',
    birthday: '11-20',
    anniversary: '05-10',
    preferredTime: '10:30 AM - 01:00 PM',
    monthlyTargetVisits: 3,
    visitsCompletedThisMonth: 2,
    lastVisitDate: '2026-07-18',
    keyFocusBrands: ['GlycoMet-XL', 'Cardia-50'],
    prescribingPotential: 'High'
  },
  {
    id: 'doc-4',
    name: 'Dr. Suresh Nair',
    qualification: 'MS (Orthopedics)',
    speciality: 'Orthopedics',
    doctorClass: 'A',
    clinicName: 'Bone & Joint Clinic',
    address: '88 Station Road, South Industrial Beat',
    townBeat: 'South Industrial Beat',
    phone: '+91 97441 55667',
    email: 'suresh.nair.ortho@yahoo.com',
    birthday: '03-30',
    anniversary: '10-22',
    preferredTime: '06:00 PM - 08:30 PM',
    monthlyTargetVisits: 3,
    visitsCompletedThisMonth: 1,
    lastVisitDate: '2026-07-08',
    keyFocusBrands: ['CalciD-Max', 'NeuroVibe'],
    prescribingPotential: 'Medium'
  },
  {
    id: 'doc-5',
    name: 'Dr. Priya Deshmukh',
    qualification: 'MD (Pediatrics)',
    speciality: 'Pediatrics',
    doctorClass: 'B',
    clinicName: 'Little Angels Child Clinic',
    address: '19 Green Park Avenue, Suburb North Beat',
    townBeat: 'Suburb North Beat',
    phone: '+91 98877 66554',
    email: 'priya.deshmukh@pediacare.com',
    birthday: '06-12',
    anniversary: '02-14',
    preferredTime: '11:30 AM - 02:00 PM',
    monthlyTargetVisits: 2,
    visitsCompletedThisMonth: 2,
    lastVisitDate: '2026-07-20',
    keyFocusBrands: ['Ceftri-1g Injection'],
    prescribingPotential: 'Medium'
  }
];

export const INITIAL_CHEMISTS: Chemist[] = [
  {
    id: 'chem-1',
    name: 'Apollo Pharmacy - Central Branch',
    contactPerson: 'Mr. Ramesh Gupta',
    phone: '+91 98111 22334',
    address: 'Shop 4, Medical Enclave, Central Beat',
    townBeat: 'Central Beat',
    mappedStockist: 'National Pharma Distributors',
    pobMonthlyAverage: 45000,
    lastVisitDate: '2026-07-24'
  },
  {
    id: 'chem-2',
    name: 'Metro Chemist & Medicos',
    contactPerson: 'Mr. Sunil Mehta',
    phone: '+91 98222 33445',
    address: 'Opposite City Civil Hospital, Central Beat',
    townBeat: 'Central Beat',
    mappedStockist: 'Reliable Medical Agency',
    pobMonthlyAverage: 38000,
    lastVisitDate: '2026-07-23'
  },
  {
    id: 'chem-3',
    name: 'Lifeline Health Pharmacy',
    contactPerson: 'Mr. Vikas Joshi',
    phone: '+91 98333 44556',
    address: '12 Hospital Square, Suburb North Beat',
    townBeat: 'Suburb North Beat',
    mappedStockist: 'National Pharma Distributors',
    pobMonthlyAverage: 28000,
    lastVisitDate: '2026-07-19'
  }
];

export const INITIAL_STOCKISTS: Stockist[] = [
  {
    id: 'stock-1',
    name: 'National Pharma Distributors',
    contactPerson: 'Mr. H. C. Singhania',
    phone: '+91 98000 11122',
    townBeat: 'Central Beat',
    creditLimit: 500000,
    outstandingAmount: 125000
  },
  {
    id: 'stock-2',
    name: 'Reliable Medical Agency',
    contactPerson: 'Mr. Anoop Shah',
    phone: '+91 98000 33344',
    townBeat: 'South Industrial Beat',
    creditLimit: 350000,
    outstandingAmount: 82000
  }
];

export const INITIAL_SAMPLES: SampleItem[] = [
  {
    id: 'samp-1',
    brandName: 'Cardia-50',
    packType: 'Catch Cover 1x10 Tabs',
    batchNo: 'C50-2026A',
    expiryDate: '2027-11-30',
    openingStock: 100,
    receivedFromHQ: 50,
    distributedInDCR: 65,
    balanceStock: 85,
    unitCost: 18
  },
  {
    id: 'samp-2',
    brandName: 'NeuroVibe',
    packType: 'Blister 1x10 Caps',
    batchNo: 'NV-2026B',
    expiryDate: '2027-08-31',
    openingStock: 80,
    receivedFromHQ: 40,
    distributedInDCR: 42,
    balanceStock: 78,
    unitCost: 25
  },
  {
    id: 'samp-3',
    brandName: 'GlycoMet-XL',
    packType: 'Strips 1x10 Tabs',
    batchNo: 'GX-2026C',
    expiryDate: '2028-01-15',
    openingStock: 120,
    receivedFromHQ: 0,
    distributedInDCR: 90,
    balanceStock: 30,
    unitCost: 20
  },
  {
    id: 'samp-4',
    brandName: 'CalciD-Max',
    packType: 'Box 1x10 Tabs',
    batchNo: 'CD-2026D',
    expiryDate: '2027-09-28',
    openingStock: 90,
    receivedFromHQ: 50,
    distributedInDCR: 40,
    balanceStock: 100,
    unitCost: 15
  }
];

export const INITIAL_TOUR_PLAN: TourPlanDay[] = [
  {
    id: 'tp-1',
    date: '2026-07-27',
    dayOfWeek: 'Monday',
    townBeat: 'Central Beat',
    workType: 'Field Work',
    estimatedKm: 28,
    targetDoctorsCount: 12,
    targetChemistsCount: 5,
    accompanyingManager: 'None (Solo)',
    status: 'Approved'
  },
  {
    id: 'tp-2',
    date: '2026-07-28',
    dayOfWeek: 'Tuesday',
    townBeat: 'Suburb North Beat',
    workType: 'Joint Working',
    estimatedKm: 42,
    targetDoctorsCount: 10,
    targetChemistsCount: 6,
    accompanyingManager: 'Mr. Rajesh Roy (ASM)',
    status: 'Approved'
  },
  {
    id: 'tp-3',
    date: '2026-07-29',
    dayOfWeek: 'Wednesday',
    townBeat: 'Central Beat',
    workType: 'Field Work',
    estimatedKm: 22,
    targetDoctorsCount: 11,
    targetChemistsCount: 4,
    status: 'Approved'
  },
  {
    id: 'tp-4',
    date: '2026-07-30',
    dayOfWeek: 'Thursday',
    townBeat: 'South Industrial Beat',
    workType: 'Field Work',
    estimatedKm: 55,
    targetDoctorsCount: 9,
    targetChemistsCount: 7,
    status: 'Approved'
  },
  {
    id: 'tp-5',
    date: '2026-07-31',
    dayOfWeek: 'Friday',
    townBeat: 'HQ Meeting',
    workType: 'HQ Meeting',
    estimatedKm: 10,
    targetDoctorsCount: 0,
    targetChemistsCount: 0,
    status: 'Approved'
  }
];

export const INITIAL_DCR_LOGS: DCREntry[] = [
  {
    id: 'dcr-101',
    date: '2026-07-25',
    time: '11:45 AM',
    entityType: 'Doctor',
    entityId: 'doc-1',
    entityName: 'Dr. A. K. Sharma',
    specialityOrType: 'Cardiology',
    townBeat: 'Central Beat',
    callType: 'Core Visit',
    brandsPromoted: ['Cardia-50', 'NeuroVibe'],
    samplesGiven: [
      { brandId: 'brand-1', brandName: 'Cardia-50', batchNo: 'C50-2026A', quantity: 5 },
      { brandId: 'brand-2', brandName: 'NeuroVibe', batchNo: 'NV-2026B', quantity: 3 }
    ],
    pobValue: 5800,
    pobItems: [
      { brandId: 'brand-1', brandName: 'Cardia-50', packSize: '10x10', units: 40, unitPrice: 145, discountPercent: 0, totalValue: 5800 }
    ],
    doctorFeedback: 'Reviewed 24-hr Ambulatory BP trial chart. Promised to initiate 8 new hypertensive patients on Cardia-50.',
    agreedNextVisitDate: '2026-08-04',
    keyTakeaway: 'Focus next visit on renal protection USP vs competitor CardioVas-50.',
    detailingDurationMinutes: 8,
    status: 'Completed'
  },
  {
    id: 'dcr-102',
    date: '2026-07-25',
    time: '02:15 PM',
    entityType: 'Chemist',
    entityId: 'chem-1',
    entityName: 'Apollo Pharmacy - Central Branch',
    townBeat: 'Central Beat',
    callType: 'Core Visit',
    brandsPromoted: ['Cardia-50', 'GlycoMet-XL'],
    samplesGiven: [],
    pobValue: 12500,
    rcpaEntries: [
      {
        chemistId: 'chem-1',
        chemistName: 'Apollo Pharmacy',
        ourBrandName: 'Cardia-50',
        ourMonthlyUnits: 60,
        competitorBrandName: 'CardioVas-50',
        competitorMonthlyUnits: 45,
        rxDoctorNames: ['Dr. A. K. Sharma', 'Dr. Rajesh Verma']
      }
    ],
    doctorFeedback: 'Stock position checked. Cardia-50 moving fast due to Dr. Sharma prescriptions. Placed fresh POB.',
    agreedNextVisitDate: '2026-08-01',
    status: 'Completed'
  }
];

export const INITIAL_EXPENSES: ExpenseClaim[] = [
  {
    id: 'exp-1',
    date: '2026-07-25',
    townBeat: 'Central Beat',
    dailyAllowanceDA: 450,
    travelAllowanceTA: 280,
    hotelLodging: 0,
    miscellaneous: 50,
    totalAmount: 780,
    status: 'Approved',
    notes: 'Outstation beat travel per DA norm'
  },
  {
    id: 'exp-2',
    date: '2026-07-26',
    townBeat: 'Suburb North Beat',
    dailyAllowanceDA: 450,
    travelAllowanceTA: 420,
    hotelLodging: 0,
    miscellaneous: 100,
    totalAmount: 970,
    status: 'Submitted',
    notes: 'Joint working with ASM - Fuel & Refreshment receipts attached'
  }
];

export const E_DETAILING_SLIDES: EDetailingSlide[] = [
  {
    id: 'slide-1',
    brandId: 'brand-1',
    brandName: 'Cardia-50',
    title: 'Cardia-50: Optimal 24-Hour BP Control & Renal Protection',
    subtitle: 'Losartan Potassium 50mg + Hydrochlorothiazide 12.5mg',
    contentBullets: [
      'Dual mechanism: Angiotensin II receptor blocker + Synergistic thiazide diuretic',
      'Protects end-organ microvascular structures in diabetic hypertensive patients',
      'Statistically significant 28% reduction in morning blood pressure surge',
      'Excellent tolerability with low incidence of cough compared to ACE inhibitors'
    ],
    clinicalHighlight: 'Sub-group analysis of 1,240 patients confirmed target SBP <130 mmHg achieved in 82.4% patients within 4 weeks.',
    moaDescription: 'Selectively blocks AT1 receptor subtype, blunting aldosterone secretion while inducing balanced natriuresis without reflex tachycardia.'
  },
  {
    id: 'slide-2',
    brandId: 'brand-2',
    brandName: 'NeuroVibe',
    title: 'NeuroVibe: Rapid Peripheral Nerve Repair & Pain Relief',
    subtitle: 'High Potency Methylcobalamin + Alpha Lipoic Acid + Pregabalin',
    contentBullets: [
      'Methylcobalamin 1500mcg accelerates myelin sheath synthesis & axonal transport',
      'Alpha Lipoic Acid quenches free radicals and restores micro-circulation',
      'Pregabalin modularly attenuates central nervous system hyperexcitability',
      'Promotes sleep quality and reduces burning neuropathic pain score by 65%'
    ],
    clinicalHighlight: 'Double-blind clinical study demonstrated significant VAS score reduction starting on Day 3 of therapy.',
    moaDescription: 'Synergistic antioxidant-neurotrophic cascade repairs demyelinated axons while dampening voltage-gated calcium channel hypersensitivity.'
  },
  {
    id: 'slide-3',
    brandId: 'brand-3',
    brandName: 'GlycoMet-XL',
    title: 'GlycoMet-XL: Glucocentric Control Without Hypoglycemia',
    subtitle: 'Metformin Sustained Release 500mg + Teneligliptin 20mg',
    contentBullets: [
      'Comprehensive dual therapy targeting both insulin resistance and beta-cell dysfunction',
      'Teneligliptin yields sustained 24-hour DPP-4 inhibition with once-daily dosing',
      'Sustained release Metformin minimizes GI discomfort and nausea',
      'Neutral weight profile and safe in mild-to-moderate renal impairment'
    ],
    clinicalHighlight: 'Mean HbA1c reduction of -1.35% observed at 16 weeks with zero severe hypoglycemic episodes.',
    moaDescription: 'Enhances active GLP-1 & GIP levels postprandially while simultaneously suppressing excessive hepatic gluconeogenesis.'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-mr-1',
    name: 'Rahul Mehta',
    employeeId: 'MR-9042',
    role: 'MR' as const,
    designation: 'Senior Medical Representative (Cardio Division)',
    hqLocation: 'Metro City Central HQ',
    territory: 'Central Beat & Metro Enclave',
    managerName: 'Rajesh Roy (ASM)',
    email: 'rahul.mehta@pharmapulse.com',
    phone: '+91 98765 43210',
    assignedBeats: ['Central Beat', 'Metro Enclave'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: true,
    lastLoginTimestamp: '09:15 AM Today',
    loginPosition: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Suite 302, Metro Medical Enclave, Central Beat',
      beat: 'Central Beat',
      device: 'PharmaPulse MR Mobile App v4.2 (Android 14)',
      ip: '103.22.14.88'
    },
    currentWorkStatus: 'Punched In • Detailing Dr. A. K. Sharma (Cardia-50)'
  },
  {
    id: 'user-mr-2',
    name: 'Priya Sharma',
    employeeId: 'MR-9043',
    role: 'MR' as const,
    designation: 'Specialist Medical Representative (Neuro & Diabetes)',
    hqLocation: 'Metro City North HQ',
    territory: 'Suburb North Beat & Hospital Zone',
    managerName: 'Rajesh Roy (ASM)',
    email: 'priya.sharma@pharmapulse.com',
    phone: '+91 98765 43211',
    assignedBeats: ['Suburb North Beat', 'Hospital Zone'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: true,
    lastLoginTimestamp: '09:30 AM Today',
    loginPosition: {
      lat: 19.1197,
      lng: 72.9051,
      address: 'City Neuro Center, Hospital Zone, Suburb North',
      beat: 'Suburb North Beat',
      device: 'PharmaPulse MR Tablet Pad v4.2',
      ip: '103.22.14.92'
    },
    currentWorkStatus: 'Punched In • DCR Logged for Dr. B. R. Patil'
  },
  {
    id: 'user-mr-3',
    name: 'Amit Varma',
    employeeId: 'MR-9044',
    role: 'MR' as const,
    designation: 'Territory Medical Representative (General Care)',
    hqLocation: 'Industrial Zone HQ',
    territory: 'South Industrial Beat & Civic Zone',
    managerName: 'Rajesh Roy (ASM)',
    email: 'amit.varma@pharmapulse.com',
    phone: '+91 98765 43212',
    assignedBeats: ['South Industrial Beat', 'Civic Zone'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: false,
    lastLoginTimestamp: 'Yesterday 06:45 PM',
    loginPosition: {
      lat: 19.0176,
      lng: 72.8561,
      address: 'Civic Health Clinic, South Industrial Beat',
      beat: 'South Industrial Beat',
      device: 'PharmaPulse MR Mobile App v4.1',
      ip: '103.22.15.11'
    },
    currentWorkStatus: 'Offline • Scheduled Beat Work Tomorrow'
  },
  {
    id: 'user-mr-4',
    name: 'Sneha Kulkarni',
    employeeId: 'MR-9045',
    role: 'MR' as const,
    designation: 'Institutional Medical Representative',
    hqLocation: 'East Metro Medical Hub',
    territory: 'East Medical Hub & Multispecialty Beat',
    managerName: 'Vikram Malhotra (ASM)',
    email: 'sneha.kulkarni@pharmapulse.com',
    phone: '+91 98765 43213',
    assignedBeats: ['East Medical Hub'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: true,
    lastLoginTimestamp: '10:05 AM Today',
    loginPosition: {
      lat: 19.0522,
      lng: 72.9002,
      address: 'East Metro Medical Hub, Tower B',
      beat: 'East Medical Hub',
      device: 'PharmaPulse Web Portal',
      ip: '103.22.16.40'
    },
    currentWorkStatus: 'Punched In • Sample Stock Audit & Inventory Check'
  },
  {
    id: 'user-asm-1',
    name: 'Rajesh Roy',
    employeeId: 'ASM-4011',
    role: 'ASM' as const,
    designation: 'Area Sales Manager (Metro Region)',
    hqLocation: 'Western Zone Regional HQ',
    territory: 'Metro City & Suburbs Region',
    managerName: 'Dr. Anita Desai (Admin)',
    email: 'rajesh.roy@pharmapulse.com',
    phone: '+91 98123 55443',
    assignedMRs: ['MR-9042', 'MR-9043', 'MR-9044'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: true,
    lastLoginTimestamp: '08:45 AM Today',
    loginPosition: {
      lat: 19.0800,
      lng: 72.8800,
      address: 'Western Zone Regional HQ Office',
      beat: 'Metro City Region',
      device: 'PharmaPulse ASM Manager Console',
      ip: '182.70.10.5'
    },
    currentWorkStatus: 'Online • Joint Working with Rahul Mehta & Approvals'
  },
  {
    id: 'user-asm-2',
    name: 'Vikram Malhotra',
    employeeId: 'ASM-4012',
    role: 'ASM' as const,
    designation: 'Area Sales Manager (Eastern Outstation)',
    hqLocation: 'Eastern Regional HQ',
    territory: 'East Zone & Industrial Belt',
    managerName: 'Dr. Anita Desai (Admin)',
    email: 'vikram.malhotra@pharmapulse.com',
    phone: '+91 98123 99887',
    assignedMRs: ['MR-9045'],
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: false,
    lastLoginTimestamp: 'Yesterday 05:30 PM',
    loginPosition: {
      lat: 19.0600,
      lng: 72.9100,
      address: 'Eastern Regional HQ Office',
      beat: 'East Zone',
      device: 'PharmaPulse ASM Manager Console',
      ip: '182.70.12.88'
    },
    currentWorkStatus: 'Offline • Outstation Travel Scheduled'
  },
  {
    id: 'user-mkt-1',
    name: 'Ananya Sengupta',
    employeeId: 'MKT-2001',
    role: 'Marketing' as const,
    designation: 'Brand Strategy & Product Marketing Manager',
    hqLocation: 'Corporate HQ - Marketing Wing',
    territory: 'Pan-India Product Portfolio',
    managerName: 'VP Commercial Strategy',
    email: 'ananya.sengupta@pharmapulse.com',
    phone: '+91 99888 77665',
    status: 'Active',
    passwordPin: '1234',
    isLoggedIn: true,
    lastLoginTimestamp: '09:00 AM Today',
    loginPosition: {
      lat: 19.0700,
      lng: 72.8700,
      address: 'Corporate HQ - Marketing Wing',
      beat: 'Pan-India Corporate',
      device: 'PharmaPulse Marketing Suite Web',
      ip: '182.70.1.100'
    },
    currentWorkStatus: 'Online • Uploading e-Detailing Brand Content'
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Anita Desai (Admin)',
    employeeId: 'admin',
    role: 'Admin' as const,
    designation: 'System Administrator & Regional Operations Director',
    hqLocation: 'Corporate HQ',
    territory: 'National Operations & Master Data',
    managerName: 'Board of Directors',
    email: 'admin@pharmapulse.com',
    phone: '+91 99000 11223',
    status: 'Active',
    passwordPin: '123456',
    isLoggedIn: true,
    lastLoginTimestamp: '08:30 AM Today',
    loginPosition: {
      lat: 19.0728,
      lng: 72.8826,
      address: 'Corporate HQ Executive Floor, Admin Command Room',
      beat: 'National Corporate HQ',
      device: 'PharmaPulse Admin Operations Command Center',
      ip: '182.70.1.1'
    },
    currentWorkStatus: 'Online • Managing Live Accounts & Field Force Audit'
  }
];

export const INITIAL_ATTENDANCE_PUNCHES = [
  {
    id: 'punch-1',
    date: '2026-07-27',
    punchInTime: '09:15 AM',
    punchOutTime: '06:30 PM',
    latitude: 19.0760,
    longitude: 72.8777,
    accuracyMeters: 8,
    locationAddress: 'Central Medical Enclave, Beat 1, Metro City',
    assignedBeat: 'Central Beat',
    geofenceMatchStatus: 'In Beat Zone' as const,
    workType: 'Field Work' as const,
    punchNotes: 'Started morning doctor calls with ASM joint visit.',
    managerApproved: true
  },
  {
    id: 'punch-2',
    date: '2026-07-26',
    punchInTime: '09:02 AM',
    punchOutTime: '06:45 PM',
    latitude: 19.1136,
    longitude: 72.8697,
    accuracyMeters: 12,
    locationAddress: 'Suburb North Hospital Complex, Metro City',
    assignedBeat: 'Suburb North Beat',
    geofenceMatchStatus: 'In Beat Zone' as const,
    workType: 'Field Work' as const,
    punchNotes: 'Chemist POB order collections & sample distribution.',
    managerApproved: true
  }
];

export const INITIAL_SPECIALITIES = [
  { id: 'spec-1', name: 'Cardiology', code: 'CARD', category: 'Super Speciality', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 'spec-2', name: 'Neurology', code: 'NEURO', category: 'Super Speciality', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'spec-3', name: 'Diabetology', code: 'DIAB', category: 'Speciality', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { id: 'spec-4', name: 'General Medicine', code: 'GEN', category: 'General', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  { id: 'spec-5', name: 'Orthopedics', code: 'ORTHO', category: 'Speciality', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'spec-6', name: 'Gynecology', code: 'GYNEC', category: 'Speciality', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { id: 'spec-7', name: 'Pediatrics', code: 'PED', category: 'Speciality', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { id: 'spec-8', name: 'Dermatology', code: 'DERM', category: 'Speciality', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
];

export const INITIAL_DOCTOR_CLASSES = [
  { id: 'class-1', code: 'A+', name: 'Class A+ (Key Opinion Leader)', targetVisitsPerMonth: 4, color: 'bg-purple-100 text-purple-800 border-purple-200', description: 'Top prescriber / KOL, mandatory 4 visits/month' },
  { id: 'class-2', code: 'A', name: 'Class A (High Potential)', targetVisitsPerMonth: 3, color: 'bg-emerald-100 text-emerald-800 border-emerald-200', description: 'Consistent volume prescriber, 3 visits/month' },
  { id: 'class-3', code: 'B', name: 'Class B (Medium Potential)', targetVisitsPerMonth: 2, color: 'bg-amber-100 text-amber-800 border-amber-200', description: 'Moderate prescriber, 2 visits/month' },
  { id: 'class-4', code: 'C', name: 'Class C (Emerging Doctor)', targetVisitsPerMonth: 1, color: 'bg-blue-100 text-blue-800 border-blue-200', description: 'New / Low volume prescriber, 1 visit/month' }
];

