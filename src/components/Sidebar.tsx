import React from 'react';
import { FileText, Map, Camera, AlertCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-16">
      <div className="p-4">
        <div className="space-y-4">
          <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700 transition-colors">
            <Camera className="h-5 w-5" />
            <span>360° Views</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700 transition-colors">
            <Map className="h-5 w-5" />
            <span>Site Map</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700 transition-colors">
            <AlertCircle className="h-5 w-5" />
            <span>Issues</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 rounded hover:bg-gray-700 transition-colors">
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}