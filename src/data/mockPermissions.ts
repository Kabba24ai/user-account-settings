import { Permission } from '../types/permission';

export const mockPermissions: Permission[] = [
  // User Management Permissions
  {
    id: 'user_view',
    name: 'View Users',
    description: 'View employee profiles and basic information',
    category: 'user_management',
    level: 'read'
  },
  {
    id: 'user_create',
    name: 'Create Users',
    description: 'Add new employees to the system',
    category: 'user_management',
    level: 'write'
  },
  {
    id: 'user_edit',
    name: 'Edit Users',
    description: 'Modify employee information and settings',
    category: 'user_management',
    level: 'write'
  },
  {
    id: 'user_delete',
    name: 'Delete Users',
    description: 'Remove employees from the system',
    category: 'user_management',
    level: 'admin'
  },
  {
    id: 'user_roles',
    name: 'Manage User Roles',
    description: 'Assign and modify user roles and permissions',
    category: 'user_management',
    level: 'admin'
  },

  // Reporting Permissions
  {
    id: 'reports_view',
    name: 'View Reports',
    description: 'Access and view system reports',
    category: 'reporting',
    level: 'read'
  },
  {
    id: 'reports_create',
    name: 'Create Reports',
    description: 'Generate custom reports and analytics',
    category: 'reporting',
    level: 'write'
  },
  {
    id: 'reports_export',
    name: 'Export Reports',
    description: 'Export reports to various formats (PDF, Excel, etc.)',
    category: 'reporting',
    level: 'write'
  },
  {
    id: 'reports_schedule',
    name: 'Schedule Reports',
    description: 'Set up automated report generation and delivery',
    category: 'reporting',
    level: 'admin'
  },

  // System Permissions
  {
    id: 'system_settings',
    name: 'System Settings',
    description: 'Access and modify system configuration',
    category: 'system',
    level: 'admin'
  },
  {
    id: 'system_backup',
    name: 'System Backup',
    description: 'Create and manage system backups',
    category: 'system',
    level: 'admin'
  },
  {
    id: 'system_logs',
    name: 'View System Logs',
    description: 'Access system logs and audit trails',
    category: 'system',
    level: 'read'
  },
  {
    id: 'system_maintenance',
    name: 'System Maintenance',
    description: 'Perform system maintenance tasks',
    category: 'system',
    level: 'admin'
  },

  // Time Clock Permissions
  {
    id: 'timeclock_view',
    name: 'View Time Records',
    description: 'View employee time clock records',
    category: 'time_clock',
    level: 'read'
  },
  {
    id: 'timeclock_edit',
    name: 'Edit Time Records',
    description: 'Modify employee time clock entries',
    category: 'time_clock',
    level: 'write'
  },
  {
    id: 'timeclock_approve',
    name: 'Approve Timesheets',
    description: 'Approve or reject employee timesheets',
    category: 'time_clock',
    level: 'write'
  },
  {
    id: 'timeclock_settings',
    name: 'Time Clock Settings',
    description: 'Configure time clock rules and policies',
    category: 'time_clock',
    level: 'admin'
  },

  // Payroll Permissions
  {
    id: 'payroll_view',
    name: 'View Payroll',
    description: 'Access payroll information and records',
    category: 'payroll',
    level: 'read'
  },
  {
    id: 'payroll_process',
    name: 'Process Payroll',
    description: 'Run payroll calculations and processing',
    category: 'payroll',
    level: 'write'
  },
  {
    id: 'payroll_approve',
    name: 'Approve Payroll',
    description: 'Final approval for payroll processing',
    category: 'payroll',
    level: 'admin'
  },
  {
    id: 'payroll_reports',
    name: 'Payroll Reports',
    description: 'Generate and access payroll reports',
    category: 'payroll',
    level: 'read'
  },

  // HR Permissions
  {
    id: 'hr_documents',
    name: 'HR Documents',
    description: 'Access and manage employee documents',
    category: 'hr',
    level: 'write'
  },
  {
    id: 'hr_benefits',
    name: 'Manage Benefits',
    description: 'Administer employee benefits and enrollment',
    category: 'hr',
    level: 'write'
  },
  {
    id: 'hr_performance',
    name: 'Performance Reviews',
    description: 'Conduct and manage employee performance reviews',
    category: 'hr',
    level: 'write'
  },
  {
    id: 'hr_compliance',
    name: 'HR Compliance',
    description: 'Manage HR compliance and regulatory requirements',
    category: 'hr',
    level: 'admin'
  }
];