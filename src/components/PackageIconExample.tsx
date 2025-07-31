import React from 'react';
import { Package } from 'lucide-react';

export function PackageIconExample() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Icon Examples</h2>
          
          {/* Different sizes */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Small (16px)</span>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Medium (20px) - Menu size</span>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-600">Large (24px)</span>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-600">Extra Large (32px)</span>
            </div>
          </div>

          {/* In menu context */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">In Menu Context</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                <Package className="w-5 h-5" />
                <span className="font-medium">Products</span>
              </div>
            </div>
          </div>

          {/* Different colors */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Variations</h3>
            <div className="flex items-center justify-center gap-4">
              <Package className="w-6 h-6 text-blue-600" />
              <Package className="w-6 h-6 text-green-600" />
              <Package className="w-6 h-6 text-purple-600" />
              <Package className="w-6 h-6 text-red-600" />
              <Package className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}