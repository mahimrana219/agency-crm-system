// src/components/layout/Topbar.jsx
import { IconSearch, IconBell, IconMenu2 } from '@tabler/icons-react';

export default function Topbar({ setIsMobileOpen }) {
  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 md:px-8 flex items-center justify-between shrink-0 shadow-sm gap-3">
      {/* Left Side: Mobile Menu Button & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden p-2 bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] rounded-xl transition-colors cursor-pointer shrink-0"
          title="Open Menu"
        >
          <IconMenu2 size={20} />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] px-3.5 py-2 rounded-xl w-full sm:w-72 text-sm text-[#6B7280] focus-within:border-[#16A34A] transition-colors">
          <IconSearch size={18} className="shrink-0" />
          <input
            type="text"
            placeholder="Search leads, projects..."
            className="bg-transparent border-none outline-none text-[#111827] w-full placeholder-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification Bell */}
        <button className="p-2 bg-[#F9FAFB] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] rounded-xl relative transition-colors cursor-pointer">
          <IconBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#16A34A] rounded-full"></span>
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#E5E7EB]">
          <div className="w-9 h-9 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A] font-bold text-sm shrink-0">
            MR
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-sm font-medium text-[#111827]">Mahim Rana</h4>
            <p className="text-xs text-[#6B7280]">Full Stack Dev</p>
          </div>
        </div>
      </div>
    </header>
  );
}