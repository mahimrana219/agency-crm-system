// src/pages/Leads.jsx
import { useState } from 'react';
import { 
  IconPlus, IconUpload, IconTrash, IconAdjustments, 
  IconSearch, IconX, IconCheck, IconFileSpreadsheet, IconChevronDown 
} from '@tabler/icons-react';

export default function Leads() {
  // Modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);

  // New Lead form state
  const [newLeadData, setNewLeadData] = useState({
    contactName: '',
    company: '',
    phone: '',
    email: '',
    source: 'Other',
    estimatedValue: '',
    stage: 'New',
    assignTo: 'Unassigned',
    followUpDate: '',
    followUpTime: '',
    notes: ''
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    setShowNewLeadModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Top Header Bar -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Leads
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your sales pipeline and track prospects
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {isSelectMode ? (
            <button 
              onClick={() => setIsSelectMode(false)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <IconX size={15} /> Cancel
            </button>
          ) : (
            <button 
              onClick={() => setIsSelectMode(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <IconCheck size={15} /> Select
            </button>
          )}

          <button 
            onClick={() => setShowTrashModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <IconTrash size={15} className="text-rose-500" /> Trash
          </button>

          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs">
            <IconAdjustments size={15} /> Stages
          </button>

          <button 
            onClick={() => setShowNewLeadModal(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={16} /> New Lead
          </button>
        </div>
      </div>

      {/* -- Line-wise Stats Overview (Leads ke heading ke neeche VIP style) -- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            0
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Open Leads</p>
            <p className="text-sm sm:text-base font-black text-gray-900">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            $
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pipeline Value</p>
            <p className="text-sm sm:text-base font-black text-emerald-600">$0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
            W
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Won / mo</p>
            <p className="text-sm sm:text-base font-black text-gray-900">0</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            %
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Win Rate</p>
            <p className="text-sm sm:text-base font-black text-gray-900">0%</p>
          </div>
        </div>
      </div>

      {/* -- Search & Import/Export Bar -- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads by name, company, email..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-2xl transition-colors cursor-pointer shadow-2xs"
          >
            <IconUpload size={16} /> Import
          </button>
          <button className="flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-2xl transition-colors cursor-pointer shadow-2xs">
            Export <IconChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* -- Select Mode Banner -- */}
      {isSelectMode && (
        <div className="flex items-center justify-between bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 animate-fadeIn shadow-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900">
            <span>0 leads selected</span>
            <span className="text-emerald-600 cursor-pointer hover:underline font-semibold ml-2">Select all (0)</span>
            <span className="text-emerald-700/60 font-normal hidden sm:inline">(Click cards to select)</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              disabled
              className="px-4 py-2 bg-rose-300 text-white text-xs font-bold rounded-xl cursor-not-allowed shadow-2xs"
            >
              Delete selected
            </button>
            <button 
              onClick={() => setIsSelectMode(false)}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* -- Pipeline Columns Grid (Naye stages aur horizontal scroll ke sath) -- */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="grid grid-cols-12 gap-5 min-w-[2700px]">
          {[
            { name: 'New', color: 'bg-blue-500', count: 0 },
            { name: 'Contacted', color: 'bg-purple-500', count: 0 },
            { name: 'Email Sent', color: 'bg-sky-500', count: 0 },
            { name: 'Reply Conversation', color: 'bg-indigo-500', count: 0 },
            { name: 'Pending', color: 'bg-yellow-500', count: 0 },
            { name: 'Qualified', color: 'bg-amber-500', count: 0 },
            { name: 'Proposal Sent', color: 'bg-orange-500', count: 0 },
            { name: 'Won', color: 'bg-emerald-500', count: 0 },
            { name: 'Rejected', color: 'bg-rose-600', count: 0 },
            { name: 'Found Someone', color: 'bg-teal-500', count: 0 },
            { name: 'Frustrated', color: 'bg-red-500', count: 0 },
            { name: 'Lost', color: 'bg-gray-500', count: 0 },
          ].map((stage) => (
            <div key={stage.name} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex flex-col h-550px">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3.5 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${stage.color}`}></span>
                  <h4 className="font-black text-gray-900 text-xs uppercase tracking-wider">{stage.name}</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black">{stage.count}</span>
                </div>
                <button 
                  onClick={() => setShowNewLeadModal(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <IconPlus size={16} />
                </button>
              </div>

              {/* Add Lead Quick Button */}
              <button 
                onClick={() => setShowNewLeadModal(true)}
                className="w-full py-3 border border-dashed border-gray-200 rounded-2xl text-xs font-bold text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-1.5 mb-4 cursor-pointer bg-gray-50/50 hover:bg-emerald-50/20"
              >
                <IconPlus size={15} /> Add lead
              </button>

              {/* Scrollable Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
                <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
                  <p className="text-xs text-gray-400 font-medium">No leads in {stage.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. IMPORT LEADS MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scaleUp">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Import leads</h3>
                <p className="text-xs text-gray-500 mt-0.5">Upload a CSV or Excel file to add many leads at once.</p>
              </div>
              <button 
                onClick={() => setShowImportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-2xl p-10 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/60 transition-colors">
                <div className="p-3 bg-white rounded-full shadow-xs text-emerald-600 mb-3 border border-emerald-100">
                  <IconUpload size={24} />
                </div>
                <h4 className="text-sm font-bold text-gray-900">Click to choose a file</h4>
                <p className="text-xs text-gray-400 mt-1">CSV, XLSX or XLS · up to 1000 leads</p>
              </div>

              <div className="flex justify-center">
                <button className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
                  <IconFileSpreadsheet size={16} /> Download CSV template
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => setShowImportModal(false)}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. NEW LEAD MODAL */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">New Lead</h3>
                <p className="text-xs text-gray-500 mt-0.5">Add a prospect to your pipeline</p>
              </div>
              <button 
                onClick={() => setShowNewLeadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Contact Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Jane Doe"
                  required
                  value={newLeadData.contactName}
                  onChange={(e) => setNewLeadData({...newLeadData, contactName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Company</label>
                  <input 
                    type="text" 
                    placeholder="Company name"
                    value={newLeadData.company}
                    onChange={(e) => setNewLeadData({...newLeadData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Phone</label>
                  <input 
                    type="text" 
                    placeholder="Phone"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({...newLeadData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com"
                  value={newLeadData.email}
                  onChange={(e) => setNewLeadData({...newLeadData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Source</label>
                  <select 
                    value={newLeadData.source}
                    onChange={(e) => setNewLeadData({...newLeadData, source: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Other</option>
                    <option>Website</option>
                    <option>Referral</option>
                    <option>Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Estimated Value</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={newLeadData.estimatedValue}
                    onChange={(e) => setNewLeadData({...newLeadData, estimatedValue: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Stage</label>
                  <select 
                    value={newLeadData.stage}
                    onChange={(e) => setNewLeadData({...newLeadData, stage: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Email Sent</option>
                    <option>Reply Conversation</option>
                    <option>Pending</option>
                    <option>Qualified</option>
                    <option>Proposal Sent</option>
                    <option>Won</option>
                    <option>Rejected</option>
                    <option>Found Someone</option>
                    <option>Frustrated</option>
                    <option>Lost</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Assign To</label>
                  <select 
                    value={newLeadData.assignTo}
                    onChange={(e) => setNewLeadData({...newLeadData, assignTo: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Unassigned</option>
                    <option>Mahim Rana</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Follow-up Date</label>
                  <input 
                    type="date" 
                    value={newLeadData.followUpDate}
                    onChange={(e) => setNewLeadData({...newLeadData, followUpDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Time</label>
                  <input 
                    type="time" 
                    value={newLeadData.followUpTime}
                    onChange={(e) => setNewLeadData({...newLeadData, followUpTime: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Notes</label>
                <textarea 
                  rows="3"
                  placeholder="Anything useful about this lead..."
                  value={newLeadData.notes}
                  onChange={(e) => setNewLeadData({...newLeadData, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. TRASH MODAL */}
      {showTrashModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scaleUp">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100">
                  <IconTrash size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Trash</h3>
                  <p className="text-xs text-gray-500 mt-0.5">No trashed leads</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTrashModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="p-16 text-center">
              <p className="text-sm text-gray-400 font-medium">No trashed leads</p>
            </div>

            <div className="flex items-center justify-end px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => setShowTrashModal(false)}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}