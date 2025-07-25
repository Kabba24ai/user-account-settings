export interface EmergencyContact {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobile?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobile?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive';
  payType: 'hourly' | 'salary';
  clockCode: string;
  limitStartTime: boolean;
  limitEndTime: boolean;
  emergencyContact1: EmergencyContact;
  emergencyContact2: EmergencyContact;
  roles: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  createdAt?: string;
}