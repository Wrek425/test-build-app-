import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;