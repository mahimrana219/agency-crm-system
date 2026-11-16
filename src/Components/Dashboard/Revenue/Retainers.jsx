// src/pages/Retainers.jsx
import { useState } from 'react';
import { 
  IconArrowLeft, IconPlus, IconX, IconRepeat, 
  IconUser, IconCurrencyDollar, IconCalendar, IconFileText 
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Retainers() {
  const [showNewModal, setShowNewModal] = useState(false);

  // New Retainer Form State
  const [retainerData, setRetainerData] = useState({
    clientName: '',
    projectName: '',
    monthlyFee: '',
    startDate: '',
    billingCycle: 'Monthly',
    notes: ''
  });

  const handleCreateRetainer = (e) => {
    e.preventDefault();
    setShowNewModal(false);
    setRetainerData({
      clientName: '',
      projectName: '',
      monthlyFee: '',
      startDate: '',
      billingCycle: 'Monthly',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Back to Projects & Header Bar -- */}
      <div className="space-y-3">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <IconArrowLeft size={15} /> Back to Projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
              <IconRepeat size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Retainers
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Monthly-billed clients with no fixed deadline
              </p>
            </div>
          </div>

          {/* New Retainer Button */}
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95 w-full sm:w-auto"
          >
            <IconPlus size={16} /> New Retainer
          </button>
        </div>
      </div>

      {/* -- Top Summary Cards (Active, MRR, Total) -- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3.5 p-5 bg-white rounded-3xl border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active</p>
            <p className="text-lg font-black text-gray-900">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 bg-white rounded-3xl border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            $
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">MRR</p>
            <p className="text-lg font-black text-emerald-600">$0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-5 bg-white rounded-3xl border border-gray-100 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            #
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-lg font-black text-gray-900">0</p>
          </div>
        </div>
      </div>

      {/* -- Empty State Box -- */}
      <div className="bg-white rounded-3xl border border-gray-100 p-20 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100 shadow-2xs">
          <IconRepeat size={26} />
        </div>
        <h3 className="text-base font-black text-gray-900 mb-1">No retainers yet</h3>
        <p className="text-xs text-gray-400 max-w-sm mb-6">Create a retainer project to bill a client a fixed monthly fee.</p>
        
        <button 
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
        >
          <IconPlus size={16} /> New Retainer
        </button>
      </div>

      {/* ================= NEW RETAINER MODAL ================= */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">New Retainer Project</h3>
                <p className="text-xs text-gray-500 mt-0.5">Set up recurring monthly billing for a client</p>
              </div>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateRetainer} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Client Name *</label>
                <div className="relative">
                  <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Acme Corporation"
                    value={retainerData.clientName}
                    onChange={(e) => setRetainerData({...retainerData, clientName: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Project / Service Name *</label>
                <div className="relative">
                  <IconFileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ongoing SEO & Maintenance"
                    value={retainerData.projectName}
                    onChange={(e) => setRetainerData({...retainerData, projectName: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Monthly Fee ($) *</label>
                  <div className="relative">
                    <IconCurrencyDollar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      required
                      placeholder="500"
                      value={retainerData.monthlyFee}
                      onChange={(e) => setRetainerData({...retainerData, monthlyFee: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Start Date *</label>
                  <div className="relative">
                    <IconCalendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      required
                      value={retainerData.startDate}
                      onChange={(e) => setRetainerData({...retainerData, startDate: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Notes / Scope</label>
                <textarea 
                  rows="3"
                  placeholder="Details about monthly deliverables..."
                  value={retainerData.notes}
                  onChange={(e) => setRetainerData({...retainerData, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Create Retainer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}