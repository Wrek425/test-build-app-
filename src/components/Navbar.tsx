import React from 'react';
import { Menu, X, Construction, User, Settings } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Construction className="h-8 w-8 text-white" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-indigo-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="#" className="text-indigo-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none">
                <Settings className="h-6 w-6" />
              </button>
              <button className="ml-3 p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
            <a href="#" className="text-indigo-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
            <a href="#" className="text-indigo-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reports</a>
          </div>
        </div>
      )}
    </nav>
  );
}