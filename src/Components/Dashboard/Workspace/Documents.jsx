// src/pages/Documents.jsx
import { useState } from 'react';
import { 
  IconPlus, IconFileText, IconSearch, IconDotsVertical, 
  IconCheck, IconClock, IconSend, IconTrash, IconX, IconUser, IconCalendar 
} from '@tabler/icons-react';

export default function Documents() {
  // Tabs filter
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Proposals', 'Contracts', 'Drafts', 'Sent', 'Signed'];

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('Proposal'); // Proposal or Contract

  // Initial Documents Data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Web Development Contract',
      type: 'Contract',
      client: 'No client set',
      date: '12/07/2026',
      status: 'Draft',
      amount: '$1,200'
    }
  ]);

  // Form State
  const [newDoc, setNewDoc] = useState({
    title: '',
    client: '',
    amount: ''
  });

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCreateDocument = (e) => {
    e.preventDefault();
    if (!newDoc.title) return;

    const docEntry = {
      id: Date.now(),
      title: newDoc.title,
      type: modalType,
      client: newDoc.client || 'No client set',
      date: new Date().toLocaleDateString(),
      status: 'Draft',
      amount: newDoc.amount ? `$${newDoc.amount}` : '$0'
    };

    setDocuments([docEntry, ...documents]);
    setShowModal(false);
    setNewDoc({ title: '', client: '', amount: '' });
  };

  const handleDeleteDoc = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  // Stats calculation
  const totalDocs = documents.length;
  const awaitingSignDocs = documents.filter(d => d.status === 'Sent' || d.status === 'Awaiting Signature').length;
  const signedDocs = documents.filter(d => d.status === 'Signed').length;
  const draftDocs = documents.filter(d => d.status === 'Draft').length;

  // Filtered documents
  const filteredDocs = documents.filter(doc => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Proposals') return doc.type === 'Proposal';
    if (activeTab === 'Contracts') return doc.type === 'Contract';
    if (activeTab === 'Drafts') return doc.status === 'Draft';
    if (activeTab === 'Sent') return doc.status === 'Sent';
    if (activeTab === 'Signed') return doc.status === 'Signed';
    return true;
  });

  return (
    <div className="w-full px-0 sm:px-2 pb-12">
      
      {/* Page Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Documents</h1>
          <p className="text-xs text-gray-500 mt-0.5">Proposals & contracts with e-signature</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleOpenModal('Proposal')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={15} className="text-emerald-600" /> New Proposal
          </button>
          <button
            onClick={() => handleOpenModal('Contract')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={15} /> New Contract
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5 px-2">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Total</p>
          <h3 className="text-xl font-black text-gray-900 mt-1">{totalDocs}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Awaiting Signature</p>
          <h3 className="text-xl font-black text-gray-900 mt-1">{awaitingSignDocs}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Signed</p>
          <h3 className="text-xl font-black text-gray-900 mt-1">{signedDocs}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Drafts</p>
          <h3 className="text-xl font-black text-gray-900 mt-1">{draftDocs}</h3>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === tab 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3 w-full">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between gap-4 w-full hover:border-emerald-200 transition-all"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-200/60 mt-0.5">
                  <IconFileText size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                      doc.type === 'Contract' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {doc.type}
                    </span>
                    <h3 className="text-xs font-black text-gray-900 truncate">{doc.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">{doc.client} • {doc.amount}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Created {doc.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                  doc.status === 'Signed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  doc.status === 'Sent' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {doc.status}
                </span>

                <button 
                  onClick={() => handleDeleteDoc(doc.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Document"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center text-gray-400 text-xs">
            No documents found in this category.
          </div>
        )}
      </div>

      {/* ================= CREATE MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Create New {modalType}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Fill out details to generate a new {modalType.toLowerCase()}</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">{modalType} Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mobile App Development Agreement"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Client Name</label>
                <div className="relative">
                  <IconUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Zahid"
                    value={newDoc.client}
                    onChange={(e) => setNewDoc({...newDoc, client: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Amount ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1500"
                  value={newDoc.amount}
                  onChange={(e) => setNewDoc({...newDoc, amount: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}