import React from 'react';
import { Shield, Edit, Trash2, Users } from 'lucide-react';
import { Role } from '../types/user';

interface RoleCardProps {
  role: Role;
  userCount: number;
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
}

export function RoleCard({ role, userCount, onEdit, onDelete }: RoleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${role.color}20` }}
          >
            <Shield className="w-6 h-6" style={{ color: role.color }} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {role.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {userCount} {userCount === 1 ? 'user' : 'users'}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {role.permissions.length} {role.permissions.length === 1 ? 'permission' : 'permissions'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(role)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(role.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {role.description}
      </p>

      <div className="flex items-center justify-between">
        <div 
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${role.color}20`,
            color: role.color
          }}
        >
          {role.name}
        </div>
        <div className="text-xs text-gray-400">
          {role.createdAt && `Created ${new Date(role.createdAt).toLocaleDateString()}`}
        </div>
      </div>
    </div>
  );
}