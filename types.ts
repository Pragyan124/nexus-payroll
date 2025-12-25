
export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface Company {
  id: string;
  name: string;
  email: string;
  logo: string;
  modules: string[];
  config: {
    salaryStructure: string[];
    allowanceTypes: string[];
    deductionRules: string[];
  };
}

export interface Employee {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive' | 'hold';
  salary: number;
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  overtime: number;
}

export interface PayrollRun {
  id: string;
  companyId: string;
  month: string;
  year: number;
  status: 'draft' | 'pending_approval' | 'locked' | 'paid';
  totalPayout: number;
  employeeCount: number;
}
