// src/components/layout/AppShell.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F4F5F7] text-[#111827] overflow-hidden">
      {/* Sidebar ko mobile state pass ki */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar ko mobile menu open karne ka function diya */}
        <Topbar setIsMobileOpen={setIsMobileOpen} />
        
        <main className="flex-1 overflow-y-auto p-8 bg-[#F4F5F7]">
          {children}
        </main>
      </div>
    </div>
  );
}