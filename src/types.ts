export type DoctorClass = string;
export type Speciality = string;
export type VisitStatus = 'Scheduled' | 'Completed' | 'Skipped' | 'Rescheduled';
export type CallType = 'Core Visit' | 'Non-Core Visit' | 'Joint Visit (ASM)' | 'Joint Visit (RM)';

export type UserRole = 'MR' | 'ASM' | 'RSM' | 'Marketing' | 'Admin';

export interface UserProfile {
  id: string;
  name: string;
  employeeId: string;
  role: UserRole;
  designation: string;
  hqLocation: string;
  territory: string;
  managerName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  assignedMRs?: string[];
  assignedBeats?: string[];
  status?: 'Active' | 'Inactive' | 'On Leave';
  passwordPin?: string;
  isLoggedIn?: boolean;
  lastLoginTimestamp?: string;
  loginPosition?: {
    lat: number;
    lng: number;
    address: string;
    beat: string;
    device: string;
    ip: string;
  };
  currentWorkStatus?: string;
}

export interface GPSAttendancePunch {
  id: string;
  mrId?: string;
  mrName?: string;
  mrEmployeeId?: string;
  date: string;
  punchInTime: string;
  punchOutTime?: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  locationAddress: string;
  assignedBeat: string;
  geofenceMatchStatus: 'In Beat Zone' | 'HQ Office' | 'Outside Beat Range' | 'Verified Field';
  workType: 'Field Work' | 'HQ Meeting' | 'Joint Working' | 'Transit';
  punchNotes?: string;
  managerApproved: boolean;
}

export interface DoctorClassConfig {
  id: string;
  code: string; // e.g. 'A+', 'A', 'B', 'C', 'VVIP'
  name: string;
  targetVisitsPerMonth: number;
  color: string;
  description: string;
}

export interface SpecialityConfig {
  id: string;
  name: string;
  code: string;
  category: string;
  color: string;
}

export interface SampleDistribution {
  brandId: string;
  brandName: string;
  batchNo: string;
  quantity: number;
}

export interface POBItem {
  brandId: string;
  brandName: string;
  packSize: string;
  units: number;
  unitPrice: number;
  discountPercent: number;
  totalValue: number;
}

export interface RCPAEntry {
  chemistId: string;
  chemistName: string;
  ourBrandName: string;
  ourMonthlyUnits: number;
  competitorBrandName: string;
  competitorMonthlyUnits: number;
  rxDoctorNames: string[];
}

export interface DCREntry {
  id: string;
  mrId?: string;
  mrName?: string;
  mrEmployeeId?: string;
  date: string;
  time: string;
  entityType: 'Doctor' | 'Chemist' | 'Stockist';
  entityId: string;
  entityName: string;
  specialityOrType?: string;
  townBeat: string;
  callType: CallType;
  brandsPromoted: string[];
  samplesGiven: SampleDistribution[];
  pobValue: number;
  pobItems?: POBItem[];
  rcpaEntries?: RCPAEntry[];
  doctorFeedback: string;
  agreedNextVisitDate: string;
  keyTakeaway?: string;
  detailingDurationMinutes?: number;
  status: VisitStatus;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  speciality: Speciality;
  doctorClass: DoctorClass;
  clinicName: string;
  address: string;
  townBeat: string;
  phone: string;
  email: string;
  birthday: string;
  anniversary: string;
  preferredTime: string;
  monthlyTargetVisits: number;
  visitsCompletedThisMonth: number;
  lastVisitDate: string;
  keyFocusBrands: string[];
  prescribingPotential: 'High' | 'Medium' | 'Low';
}

export interface Chemist {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  address: string;
  townBeat: string;
  mappedStockist: string;
  pobMonthlyAverage: number;
  lastVisitDate: string;
}

export interface Stockist {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  townBeat: string;
  creditLimit: number;
  outstandingAmount: number;
}

export interface SampleItem {
  id: string;
  brandName: string;
  packType: string; // e.g., '10x10 Tablets', '30ml Syrup'
  batchNo: string;
  expiryDate: string;
  openingStock: number;
  receivedFromHQ: number;
  distributedInDCR: number;
  balanceStock: number;
  unitCost: number;
}

export interface TourPlanDay {
  id: string;
  mrId?: string;
  mrName?: string;
  mrEmployeeId?: string;
  date: string;
  dayOfWeek: string;
  townBeat: string;
  workType: 'Field Work' | 'Joint Working' | 'Leave' | 'HQ Meeting' | 'Transit';
  estimatedKm: number;
  targetDoctorsCount: number;
  targetChemistsCount: number;
  accompanyingManager?: string;
  status: 'Approved' | 'Pending' | 'Draft';
}

export interface ExpenseClaim {
  id: string;
  mrId?: string;
  mrName?: string;
  mrEmployeeId?: string;
  date: string;
  townBeat: string;
  dailyAllowanceDA: number;
  travelAllowanceTA: number;
  hotelLodging: number;
  miscellaneous: number;
  totalAmount: number;
  receiptUrl?: string;
  status: 'Approved' | 'Submitted' | 'Draft' | 'Rejected';
  notes?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  genericName: string;
  category: string;
  keyUSP: string;
  pricePerPack: number;
  visualAidSlideCount: number;
}

export interface EDetailingSlide {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  subtitle: string;
  contentBullets: string[];
  clinicalHighlight: string;
  moaDescription: string;
  imageUrl?: string;
}

export interface TerritoryInsight {
  healthScore: number;
  summary: string;
  strengths: string[];
  gapsAndRisks: string[];
  actionPlan: string[];
}
