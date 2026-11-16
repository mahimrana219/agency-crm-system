// src/pages/Projects.jsx
import { useState } from 'react';
import { 
  IconPlus, IconSearch, IconX, IconTrash, IconFileSpreadsheet, 
  IconFileCode, IconBriefcase, IconCurrencyDollar, IconUser, IconCalendar, IconChevronDown 
} from '@tabler/icons-react';

export default function Projects() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Project Form State
  const [projectData, setProjectData] = useState({
    projectName: '',
    clientName: '',
    stage: 'New',
    budget: '',
    paidAmount: '',
    deadline: '',
    description: ''
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    setShowNewModal(false);
    setProjectData({
      projectName: '',
      clientName: '',
      stage: 'New',
      budget: '',
      paidAmount: '',
      deadline: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Top Header & Stats Bar -- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Projects
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your client projects and budgets
          </p>
        </div>

        {/* Top Summary Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Total</span>
            <span className="text-xs font-black text-gray-900">0</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Ongoing</span>
            <span className="text-xs font-black text-indigo-600">0</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <span className="text-[11px] font-bold text-indigo-600 uppercase">Budget</span>
            <span className="text-xs font-black text-indigo-600">$0</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <span className="text-[11px] font-bold text-indigo-600 uppercase">Paid</span>
            <span className="text-xs font-black text-indigo-600">$0</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-indigo-50/70 border border-indigo-200/60 rounded-2xl">
            <span className="text-[11px] font-bold text-indigo-700 uppercase">Retainers</span>
            <span className="text-xs font-black text-indigo-700">0 · $0/mo</span>
          </div>
        </div>
      </div>

      {/* -- Search & Actions Toolbar -- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, clients, or descriptions..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={16} /> New
          </button>

          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs">
            <IconFileSpreadsheet size={15} className="text-indigo-600" /> CSV
          </button>

          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs">
            <IconFileCode size={15} className="text-blue-600" /> JSON
          </button>

          <button 
            onClick={() => setShowTrashModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-rose-600 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <IconTrash size={15} /> Trash
          </button>
        </div>
      </div>

      {/* -- Projects Kanban Grid (3 Columns) -- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { name: 'New', color: 'bg-purple-500', count: 0, textKey: 'new' },
          { name: 'Ongoing', color: 'bg-indigo-500', count: 0, textKey: 'ongoing' },
          { name: 'Completed', color: 'bg-blue-500', count: 0, textKey: 'completed' },
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
                onClick={() => setShowNewModal(true)}
                className="p-1.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <IconPlus size={16} />
              </button>
            </div>

            {/* Empty State Box inside Column */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
                <p className="text-xs text-gray-400 font-medium">No {stage.textKey} projects</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. NEW PROJECT MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">New Project</h3>
                <p className="text-xs text-gray-500 mt-0.5">Create a new client project and assign milestones</p>
              </div>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Project Name *</label>
                <div className="relative">
                  <IconBriefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. E-Commerce Redesign"
                    value={projectData.projectName}
                    onChange={(e) => setProjectData({...projectData, projectName: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Client Name *</label>
                  <div className="relative">
                    <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Client or Company"
                      value={projectData.clientName}
                      onChange={(e) => setProjectData({...projectData, clientName: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Stage</label>
                  <select 
                    value={projectData.stage}
                    onChange={(e) => setProjectData({...projectData, stage: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option>New</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Total Budget ($)</label>
                  <div className="relative">
                    <IconCurrencyDollar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={projectData.budget}
                      onChange={(e) => setProjectData({...projectData, budget: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Paid Amount ($)</label>
                  <div className="relative">
                    <IconCurrencyDollar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={projectData.paidAmount}
                      onChange={(e) => setProjectData({...projectData, paidAmount: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Deadline</label>
                <div className="relative">
                  <IconCalendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    value={projectData.deadline}
                    onChange={(e) => setProjectData({...projectData, deadline: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Description / Scope</label>
                <textarea 
                  rows="3"
                  placeholder="Details about project goals and deliverables..."
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

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
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. TRASH MODAL */}
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
                  <p className="text-xs text-gray-500 mt-0.5">No deleted projects</p>
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
              <p className="text-sm text-gray-400 font-medium">No trashed projects</p>
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