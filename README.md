# Complete User Account Settings System

A comprehensive employee and role management system built with React, TypeScript, and Tailwind CSS.

## Features

### Employee Management
- **Complete CRUD Operations**: Add, view, edit, and delete employees
- **Comprehensive Employee Profiles**: Personal info, address, employment details, emergency contacts
- **Advanced Search & Filtering**: Search by name/email, filter by status and role
- **Alphabetical Sorting**: Employees sorted by last name for easy navigation
- **Time Clock Integration**: Clock codes and time restrictions with admin tooltips

### Role & Permission Management
- **Dynamic Role System**: Create and manage custom roles with specific permissions
- **Permission Categories**: 24 permissions across 6 functional areas:
  - User Management (5 permissions)
  - Reporting (4 permissions)
  - System Administration (4 permissions)
  - Time Clock (4 permissions)
  - Payroll (4 permissions)
  - HR Management (4 permissions)
- **Visual Role Management**: Color-coded roles with user count tracking
- **Role-Based Filtering**: Filter employees by role using dynamic buttons

### User Experience
- **Professional Design**: Apple-level design aesthetics with attention to detail
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth transitions, hover states, and micro-interactions
- **Intuitive Navigation**: Clear visual hierarchy and logical user flow

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint with TypeScript support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-account-settings
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── EmployeeForm.tsx     # Employee add/edit form
│   ├── EmployeeDetails.tsx  # Employee detail view
│   ├── UserCard.tsx         # Employee card component
│   ├── RoleForm.tsx         # Role add/edit form
│   └── RoleCard.tsx         # Role card component
├── data/                # Mock data and test fixtures
│   ├── mockData.ts          # Employee and role test data
│   └── mockPermissions.ts   # Permission definitions
├── types/               # TypeScript type definitions
│   ├── user.ts              # User and role interfaces
│   └── permission.ts        # Permission interfaces
└── App.tsx              # Main application component
```

## Key Components

### Employee Management
- **EmployeeForm**: Comprehensive form for adding/editing employees with validation
- **EmployeeDetails**: Read-only view of employee information
- **UserCard**: Summary card showing key employee information

### Role Management
- **RoleForm**: Form for creating/editing roles and assigning permissions
- **RoleCard**: Visual representation of roles with user counts and actions

### Data Management
- **Mock Data System**: Realistic test data for development and demonstration
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **State Management**: Efficient React state management with hooks

## Features in Detail

### Employee Profiles Include:
- Personal information (name, email, phone numbers)
- Complete address information
- Employment details (start/end dates, status, pay type)
- Time clock settings with admin guidance tooltips
- Two emergency contacts with full contact information
- Role assignments with visual indicators

### Role System Includes:
- Custom role creation with names, descriptions, and colors
- Granular permission assignment across functional categories
- Visual role indicators throughout the interface
- User count tracking per role
- Role-based employee filtering

### Permission Categories:
1. **User Management**: View, create, edit, delete users and manage roles
2. **Reporting**: View, create, export, and schedule reports
3. **System**: Settings, backup, logs, and maintenance access
4. **Time Clock**: View records, edit entries, approve timesheets
5. **Payroll**: View, process, approve payroll and generate reports
6. **HR**: Manage documents, benefits, performance reviews, compliance

## Design System

The application uses a consistent design system with:
- **8px spacing system** for consistent layouts
- **Color-coded roles** for visual identification
- **Professional typography** with proper hierarchy
- **Responsive breakpoints** for all device sizes
- **Accessible color contrasts** meeting WCAG guidelines

## Version History

- **V2 (Final)**: Complete role and permission management system
- **V1 (Baseline)**: Core employee management functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.