import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Shield, ArrowLeft, Users, FileText, Settings, Clock, DollarSign, UserCheck } from 'lucide-react';
import { Role } from '../types/user';
import { Permission } from '../types/permission';

interface RoleFormProps {
  role?: Role;
  permissions: Permission[];
  onSave: (role: Partial<Role>) => void;
  onCancel: () => void;
}

export function RoleForm({ role, permissions, onSave, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#2563eb',
    permissions: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        color: role.color,
        permissions: [...role.permissions]
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#2563eb',
        permissions: []
      });
    }
    setErrors({});
  }, [role]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Role name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.color.trim()) newErrors.color = 'Color is required';
    if (formData.permissions.length === 0) newErrors.permissions = 'At least one permission must be selected';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: role?.id,
        ...formData
      });
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_management': return <Users className="w-4 h-4" />;
      case 'reporting': return <FileText className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'time_clock': return <Clock className="w-4 h-4" />;
      case 'payroll': return <DollarSign className="w-4 h-4" />;
      case 'hr': return <UserCheck className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user_management': return 'text-blue-600 bg-blue-50';
      case 'reporting': return 'text-green-600 bg-green-50';
      case 'system': return 'text-red-600 bg-red-50';
      case 'time_clock': return 'text-purple-600 bg-purple-50';
      case 'payroll': return 'text-yellow-600 bg-yellow-50';
      case 'hr': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'read': return 'bg-green-100 text-green-800';
      case 'write': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const colorOptions = [
    { value: '#dc2626', label: 'Red' },
    { value: '#ea580c', label: 'Orange' },
    { value: '#ca8a04', label: 'Yellow' },
    { value: '#16a34a', label: 'Green' },
    { value: '#2563eb', label: 'Blue' },
    { value: '#7c3aed', label: 'Purple' },
    { value: '#be185d', label: 'Pink' },
    { value: '#0891b2', label: 'Cyan' },
    { value: '#059669', label: 'Emerald' },
    { value: '#7c2d12', label: 'Brown' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Roles</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {role ? 'Edit Role' : 'Add New Role'}
                </h1>
                <p className="text-sm text-gray-500">
                  {role ? 'Update role information and permissions' : 'Create a new role with specific permissions'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Role Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Manager, Supervisor, Employee"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role Color *
                </label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center"
                    style={{ backgroundColor: formData.color }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white bg-opacity-20"></div>
                  </div>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors.color ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.color && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.color}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Describe the role's responsibilities and scope..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Permissions</h2>
              <span className="text-sm text-gray-500">
                ({formData.permissions.length} selected)
              </span>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className={`flex items-center gap-2 mb-4 p-2 rounded-lg ${getCategoryColor(category)}`}>
                    {getCategoryIcon(category)}
                    <h3 className="font-semibold capitalize">
                      {category.replace('_', ' ')}
                    </h3>
                    <span className="text-sm opacity-75">
                      ({categoryPermissions.length} permissions)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryPermissions.map(permission => (
                      <label
                        key={permission.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          formData.permissions.includes(permission.id)
                            ? 'bg-blue-50 border-blue-300 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {permission.name}
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeColor(permission.level)}`}>
                              {permission.level}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            {permission.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {errors.permissions && (
              <p className="mt-4 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.permissions}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {role ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}