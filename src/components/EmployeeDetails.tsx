import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Calendar, Clock, Shield } from 'lucide-react';
import { User as UserType, Role } from '../types/user';

interface EmployeeDetailsProps {
  user: UserType;
  roles: Role[];
  onBack: () => void;
  onEdit: (user: UserType) => void;
}

export function EmployeeDetails({ user, roles, onBack, onEdit }: EmployeeDetailsProps) {
  const getUserRoles = (roleIds: string[]) => {
    return roles.filter(role => roleIds.includes(role.id));
  };

  const userRoles = getUserRoles(user.roles);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return 'Not provided';
    return phone;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Employees</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Employee Details
                </h1>
                <p className="text-sm text-gray-500">
                  View employee information and settings
                </p>
              </div>
            </div>
            <button
              onClick={() => onEdit(user)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Edit Employee
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Employee Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.middleName ? `${user.middleName} ` : ''}{user.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{formatPhoneNumber(user.phone)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{user.city}, {user.state}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {user.payType === 'hourly' ? 'Hourly' : 'Salary'}
                </span>
                {userRoles.map(role => (
                  <span
                    key={role.id}
                    className="px-3 py-1 text-sm font-medium rounded-full"
                    style={{
                      backgroundColor: `${role.color}20`,
                      color: role.color
                    }}
                  >
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-gray-900">
                  {user.firstName} {user.middleName ? `${user.middleName} ` : ''}{user.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Mobile Phone</label>
                <p className="text-gray-900">{formatPhoneNumber(user.mobile || '')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                <p className="text-gray-900">{formatPhoneNumber(user.phone)}</p>
              </div>
            </div>
            <div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
              <p className="text-gray-900">
                {user.address}<br />
                {user.city}, {user.state} {user.zipCode}<br />
                {user.country}
              </p>
            </div>
          </div>

          {/* Role Assignment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Role Assignment</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {userRoles.map(role => (
                <div
                  key={role.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: role.color }}
                  ></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{role.name}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Employment Information</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
                  <p className="text-gray-900">{formatDate(user.startDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
                  <p className="text-gray-900">{formatDate(user.endDate || '')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <p className="text-gray-900 capitalize">{user.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Pay Type</label>
                  <p className="text-gray-900 capitalize">{user.payType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Clock Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Time Clock Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Clock Code</label>
                <p className="text-gray-900 font-mono">{user.clockCode}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Limit Start Time</label>
                  <p className="text-gray-900">{user.limitStartTime ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Limit End Time</label>
                  <p className="text-gray-900">{user.limitEndTime ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contact 1 */}
          {user.emergencyContact1.firstName && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contact 1</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900">
                    {user.emergencyContact1.firstName} {user.emergencyContact1.middleName ? `${user.emergencyContact1.middleName} ` : ''}{user.emergencyContact1.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{user.emergencyContact1.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Mobile Phone</label>
                  <p className="text-gray-900">{formatPhoneNumber(user.emergencyContact1.mobile || '')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <p className="text-gray-900">{formatPhoneNumber(user.emergencyContact1.phone)}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-gray-900">
                  {user.emergencyContact1.address}<br />
                  {user.emergencyContact1.city}, {user.emergencyContact1.state} {user.emergencyContact1.zipCode}<br />
                  {user.emergencyContact1.country}
                </p>
              </div>
            </div>
          )}

          {/* Emergency Contact 2 */}
          {user.emergencyContact2.firstName && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contact 2</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900">
                    {user.emergencyContact2.firstName} {user.emergencyContact2.middleName ? `${user.emergencyContact2.middleName} ` : ''}{user.emergencyContact2.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{user.emergencyContact2.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Mobile Phone</label>
                  <p className="text-gray-900">{formatPhoneNumber(user.emergencyContact2.mobile || '')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <p className="text-gray-900">{formatPhoneNumber(user.emergencyContact2.phone)}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-gray-900">
                  {user.emergencyContact2.address}<br />
                  {user.emergencyContact2.city}, {user.emergencyContact2.state} {user.emergencyContact2.zipCode}<br />
                  {user.emergencyContact2.country}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}