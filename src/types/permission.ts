export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'user_management' | 'reporting' | 'system' | 'time_clock' | 'payroll' | 'hr';
  level: 'read' | 'write' | 'admin';
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  granted: boolean;
}