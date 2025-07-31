import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Shield } from 'lucide-react';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeDetails } from './components/EmployeeDetails';
import { RoleForm } from './components/RoleForm';
import { RoleCard } from './components/RoleCard';
import { UserCard } from './components/UserCard';
import { PackageIconExample } from './components/PackageIconExample';
import { User, Role } from './types/user';
import { Permission } from './types/permission';
import { mockUsers, mockRoles } from './data/mockData';
import { mockPermissions } from './data/mockPermissions';

function App() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit' | 'view' | 'roles' | 'add_role' | 'edit_role' | 'package_demo'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setCurrentView('add');
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('view');
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('edit');
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User;
      setUsers([...users, newUser]);
    }
    setCurrentView('list');
    setSelectedUser(undefined);
  };

  const handleCancelEdit = () => {
    setCurrentView('list');
    setSelectedUser(undefined);
    setSelectedRole(undefined);
  };

  // Role Management Functions
  const handleViewRoles = () => {
    setCurrentView('roles');
  };

  const handleAddRole = () => {
    setSelectedRole(undefined);
    setCurrentView('add_role');
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setCurrentView('edit_role');
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role? Users with this role will need to be reassigned.')) {
      setRoles(roles.filter(role => role.id !== roleId));
      // Remove role from users
      setUsers(users.map(user => ({
        ...user,
        roles: user.roles.filter(r => r !== roleId)
      })));
    }
  };

  const handleSaveRole = (roleData: Partial<Role>) => {
    if (selectedRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === selectedRole.id 
          ? { ...role, ...roleData }
          : role
      ));
    } else {
      // Add new role
      const newRole: Role = {
        id: Date.now().toString(),
        ...roleData,
        createdAt: new Date().toISOString()
      } as Role;
      setRoles([...roles, newRole]);
    }
    setCurrentView('roles');
    setSelectedRole(undefined);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.roles.includes(roleFilter);
    
    return matchesSearch && matchesStatus && matchesRole;
  }).sort((a, b) => {
    const lastNameA = a.lastName.toLowerCase();
    const lastNameB = b.lastName.toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  const activeUsersCount = users.filter(user => user.status === 'active').length;
  const inactiveUsersCount = users.filter(user => user.status === 'inactive').length;

  const getUserCountForRole = (roleId: string) => {
    return users.filter(user => user.roles.includes(roleId)).length;
  };

  // Show package icon demo
  if (currentView === 'package_demo') {
    return <PackageIconExample />;
  }

  // Show employee details view
  if (currentView === 'view' && selectedUser) {
    return (
      <EmployeeDetails
        user={selectedUser}
        roles={roles}
        onBack={handleCancelEdit}
        onEdit={handleEditUser}
      />
    );
  }

  // Show employee form for add/edit
  if (currentView === 'add' || currentView === 'edit') {
    return (
      <EmployeeForm
        user={selectedUser}
        roles={roles}
        onSave={handleSaveUser}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Show role form for add/edit
  if (currentView === 'add_role' || currentView === 'edit_role') {
    return (
      <RoleForm
        role={selectedRole}
        permissions={permissions}
        onSave={handleSaveRole}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Show roles management view
  if (currentView === 'roles') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Role Management</h1>
                  <p className="text-sm text-gray-500">Manage roles and permissions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('list')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Back to Employees
                </button>
                <button
                  onClick={() => setCurrentView('package_demo')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Package Demo
                </button>
                  onClick={() => setCurrentView('package_demo')}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Package Demo
                </button>
                <button
                  onClick={handleAddRole}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(role => (
              <RoleCard
                key={role.id}
                role={role}
                userCount={getUserCountForRole(role.id)}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
              />
            ))}
          </div>

          {roles.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first role.
              </p>
              <button
                onClick={handleAddRole}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Create First Role
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show employee list
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">User Account Settings</h1>
                <p className="text-sm text-gray-500">Manage employee information and settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleViewRoles}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Manage Roles</span>
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Filter Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                roleFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Roles
            </button>
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setRoleFilter(role.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  roleFilter === role.id
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: roleFilter === role.id ? role.color : `${role.color}20`,
                  borderColor: role.color
                }}
              >
                {role.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              roles={roles}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria or filters.' 
                : 'Get started by adding your first employee.'}
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button
                onClick={handleAddUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add First Employee
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default App;