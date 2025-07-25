import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { User as UserType, Role } from '../types/user';

interface UserCardProps {
  user: UserType;
  roles: Role[];
  onView: (user: UserType) => void;
  onEdit: (user: UserType) => void;
  onDelete: (userId: string) => void;
}

export function UserCard({ user, roles, onView, onEdit, onDelete }: UserCardProps) {
  const getUserRoles = (roleIds: string[]) => {
    return roles.filter(role => roleIds.includes(role.id));
  };

  const userRoles = getUserRoles(user.roles);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.middleName ? `${user.middleName} ` : ''}{user.lastName}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                user.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {user.payType}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(user)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{user.phone}</span>
          {user.mobile && (
            <span className="text-gray-400">• {user.mobile}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{user.city}, {user.state}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>Clock Code: {user.clockCode}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Started: {new Date(user.startDate).toLocaleDateString()}</span>
        </div>
      </div>

      {userRoles.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {userRoles.map(role => (
              <span
                key={role.id}
                className="px-2 py-1 text-xs font-medium rounded-full"
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
      )}

      {user.emergencyContact1.firstName && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Emergency Contact</h4>
          <div className="text-sm text-gray-600">
            <div>{user.emergencyContact1.firstName} {user.emergencyContact1.lastName}</div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{user.emergencyContact1.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}