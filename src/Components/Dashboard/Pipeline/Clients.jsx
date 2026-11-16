// src/pages/Clients.jsx
import { useState } from 'react';
import { 
  IconPlus, IconSearch, IconX, IconUser, IconBuilding, 
  IconPhone, IconMail, IconMapPin, IconFolder, IconCheck, IconTrash 
} from '@tabler/icons-react';

export default function Clients() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Client Form State
  const [clientData, setClientData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    // Yahan aap apna submit logic ya API call likh sakte hain
    setShowAddModal(false);
    setClientData({ name: '', company: '', phone: '', email: '', address: '', notes: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Top Header Bar -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Clients
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            View all clients and jump into their projects
          </p>
        </div>

        {/* Add Client Button */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95 w-full sm:w-auto"
        >
          <IconPlus size={16} /> Add Client
        </button>
      </div>

      {/* -- Stats Overview Grid (4 Cards) -- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            <IconUser size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total clients</p>
            <p className="text-sm sm:text-base font-black text-gray-900">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
            <IconFolder size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total projects</p>
            <p className="text-sm sm:text-base font-black text-gray-900">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ongoing</p>
            <p className="text-sm sm:text-base font-black text-emerald-600">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Completed</p>
            <p className="text-sm sm:text-base font-black text-blue-600">0</p>
          </div>
        </div>
      </div>

      {/* -- Search Bar -- */}
      <div className="flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* -- Empty State Area -- */}
      <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4 border border-gray-100">
          <IconUser size={30} />
        </div>
        <h3 className="text-base font-black text-gray-900 mb-1">No clients yet</h3>
        <p className="text-xs text-gray-400 max-w-xs mb-6">Add your first client to get started managing projects and deals.</p>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
        >
          <IconPlus size={16} /> Add Client
        </button>
      </div>

      {/* ================= ADD CLIENT MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Add New Client</h3>
                <p className="text-xs text-gray-500 mt-0.5">Enter client profile details and contact info</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddClient} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Client Name *</label>
                <div className="relative">
                  <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Smith"
                    value={clientData.name}
                    onChange={(e) => setClientData({...clientData, name: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Company Name</label>
                  <div className="relative">
                    <IconBuilding size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp"
                      value={clientData.company}
                      onChange={(e) => setClientData({...clientData, company: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <IconPhone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="+1 (555) 000-0000"
                      value={clientData.phone}
                      onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
                <div className="relative">
                  <IconMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    value={clientData.email}
                    onChange={(e) => setClientData({...clientData, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Address</label>
                <div className="relative">
                  <IconMapPin size={16} className="absolute left-4 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Street, City, Country"
                    value={clientData.address}
                    onChange={(e) => setClientData({...clientData, address: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Notes</label>
                <textarea 
                  rows="3"
                  placeholder="Additional information about the client..."
                  value={clientData.notes}
                  onChange={(e) => setClientData({...clientData, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Save Client
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}