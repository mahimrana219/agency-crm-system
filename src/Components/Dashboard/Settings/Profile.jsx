import { useState } from 'react';
import { 
  IconUser, IconBuilding, IconDeviceFloppy, 
  IconCheck, IconUpload, IconBriefcase, IconMail, IconPhone, IconWorld 
} from '@tabler/icons-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('freelancer'); // 'freelancer' or 'agency'
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    // Personal / Freelancer Details
    fullName: 'Mahim Rana',
    email: 'mahimrana219@gmail.com',
    phone: '+92 300 1234567',
    role: 'Full Stack Developer & Software Engineer',
    bio: 'Specialized in building full-stack web applications with React, Next.js, Node.js, and MongoDB.',
    
    // Company / Agency Details
    agencyName: 'Agency Solutions',
    agencyWebsite: 'https://meertech.dev',
    taxId: 'PK-987654321',
    address: 'Karachi, Sindh, Pakistan',
    agencyEmail: 'contact@meertech.dev',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Page Header & Top Switcher Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <IconUser className="text-indigo-600" size={28} /> Profile Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">Switch between your personal freelancer profile and agency company setup.</p>
        </div>

        {/* 2 Switcher Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('freelancer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'freelancer'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <IconUser size={16} /> Freelancer Setup
          </button>
          
          <button
            onClick={() => setActiveTab('agency')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'agency'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <IconBuilding size={16} /> Agency Setup
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2.5 rounded-xl text-sm font-semibold animate-fade-in">
          <IconCheck size={18} /> Details updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* TAB 1: FREELANCER PROFILE SETUP */}
        {activeTab === 'freelancer' && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <IconUser className="text-indigo-600" size={22} />
              <h3 className="text-lg font-bold text-gray-900">General / Freelancer Profile Setup</h3>
            </div>

            {/* Avatar Upload */}
            <div className="flex items-center gap-6 py-2">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                M
              </div>
              <div>
                <button type="button" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors cursor-pointer flex items-center gap-2">
                  <IconUpload size={14} /> Upload Avatar
                </button>
                <p className="text-[11px] text-gray-400 mt-1.5">Square PNG, JPG under 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={profileData.fullName} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={profileData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone / WhatsApp</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={profileData.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Professional Role</label>
                <input 
                  type="text" 
                  name="role" 
                  value={profileData.role} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Professional Bio</label>
                <textarea 
                  name="bio" 
                  rows="3"
                  value={profileData.bio} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30 resize-none" 
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AGENCY PROFILE SETUP */}
        {activeTab === 'agency' && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <IconBuilding className="text-indigo-600" size={22} />
              <h3 className="text-lg font-bold text-gray-900">Agency Profile Setup</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Agency Name</label>
                <input 
                  type="text" 
                  name="agencyName" 
                  value={profileData.agencyName} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Agency Email</label>
                <input 
                  type="email" 
                  name="agencyEmail" 
                  value={profileData.agencyEmail} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Website URL</label>
                <input 
                  type="text" 
                  name="agencyWebsite" 
                  value={profileData.agencyWebsite} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Tax ID / Registration No.</label>
                <input 
                  type="text" 
                  name="taxId" 
                  value={profileData.taxId} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Business Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={profileData.address} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-indigo-600 bg-gray-50/30" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save Details
          </button>
        </div>

      </form>
    </div>
  );
}