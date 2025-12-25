
import { Company, Employee, AttendanceRecord, PayrollRun, UserRole } from './types';

// Mock Data
export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'TechFlow Solutions',
    email: 'hr@techflow.io',
    logo: 'https://picsum.photos/100/100?random=1',
    modules: ['payroll', 'attendance', 'loans', 'compliance'],
    config: {
      salaryStructure: ['Basic', 'HRA', 'Conveyance'],
      allowanceTypes: ['Travel', 'Food'],
      deductionRules: ['PF', 'ESIC', 'Professional Tax']
    }
  },
  {
    id: 'c2',
    name: 'Global Logistics Corp',
    email: 'admin@globallogistics.com',
    logo: 'https://picsum.photos/100/100?random=2',
    modules: ['payroll', 'attendance', 'reliever'],
    config: {
      salaryStructure: ['Basic', 'Overtime'],
      allowanceTypes: ['Site'],
      deductionRules: ['PF']
    }
  }
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    companyId: 'c1',
    name: 'Sarah Connor',
    email: 'sarah@techflow.io',
    role: 'Software Engineer',
    department: 'Engineering',
    designation: 'Senior Lead',
    status: 'active',
    salary: 85000,
    bankDetails: {
      accountNumber: '1234567890',
      ifsc: 'HDFC0001',
      bankName: 'HDFC Bank'
    }
  },
  {
    id: 'e2',
    companyId: 'c1',
    name: 'John Miller',
    email: 'john@techflow.io',
    role: 'Product Manager',
    department: 'Product',
    designation: 'Manager',
    status: 'active',
    salary: 75000,
    bankDetails: {
      accountNumber: '9876543210',
      ifsc: 'ICIC0002',
      bankName: 'ICICI Bank'
    }
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'a1',
    employeeId: 'e1',
    date: '2024-05-01',
    checkIn: '09:00',
    checkOut: '18:30',
    status: 'present',
    overtime: 1.5
  }
];

export const MOCK_PAYROLLS: PayrollRun[] = [
  {
    id: 'p1',
    companyId: 'c1',
    month: 'April',
    year: 2024,
    status: 'locked',
    totalPayout: 160000,
    employeeCount: 2
  }
];
