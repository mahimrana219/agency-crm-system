// src/pages/Payments.jsx
import { useState, useRef } from 'react';
import { 
  IconPlus, IconDownload, IconX, 
  IconCurrencyDollar, IconCalendar, IconUser, IconArrowUpRight, IconArrowDownLeft 
} from '@tabler/icons-react';

export default function Payments() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All'); // All, Income, Expenses
  const recordsSectionRef = useRef(null);

  // New Payment Form State
  const [paymentData, setPaymentData] = useState({
    type: 'Income', // 'Income' or 'Expense'
    amount: '',
    clientOrVendor: '',
    category: 'Project Milestone',
    date: '',
    notes: ''
  });

  // Handler to open modal with specific type (Income or Expense)
  const handleOpenModal = (type) => {
    setPaymentData(prev => ({ ...prev, type }));
    setShowAddModal(true);
  };

  // Handler to switch tab and smooth scroll to records section
  const handleFilterClick = (tabName) => {
    setActiveTab(tabName);
    if (recordsSectionRef.current) {
      recordsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCreatePayment = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setPaymentData({
      type: 'Income',
      amount: '',
      clientOrVendor: '',
      category: 'Project Milestone',
      date: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Top Header Bar -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Payments
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            All incoming client payments and outgoing team or business payouts in one timeline
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs">
            <IconDownload size={15} /> Download PDF
          </button>

          <button 
            onClick={() => handleOpenModal('Income')}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={16} /> Add Payment
          </button>
        </div>
      </div>

      {/* -- Top 4 Summary Cards (Clickable to jump to specific sections & add) -- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* This month payments received (Income) */}
        <div 
          onClick={() => handleFilterClick('Income')}
          className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all group"
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">This month received</p>
            <p className="text-lg font-black text-gray-900 mt-1">$0</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <IconArrowDownLeft size={20} />
          </div>
        </div>

        {/* Total expenses this month (Expense) */}
        <div 
          onClick={() => handleFilterClick('Expenses')}
          className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all group"
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-amber-600 transition-colors">Expenses (this month)</p>
            <p className="text-lg font-black text-gray-900 mt-1">$0</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <IconArrowUpRight size={20} />
          </div>
        </div>

        {/* Overall client payments received (Income) */}
        <div 
          onClick={() => handleFilterClick('Income')}
          className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all group"
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Overall received</p>
            <p className="text-lg font-black text-emerald-600 mt-1">$0</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <IconArrowDownLeft size={20} />
          </div>
        </div>

        {/* Total expenses (Expense) */}
        <div 
          onClick={() => handleFilterClick('Expenses')}
          className="p-5 bg-white rounded-3xl border border-gray-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-purple-300 transition-all group"
        >
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-purple-600 transition-colors">Total expenses</p>
            <p className="text-lg font-black text-purple-600 mt-1">$0</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <IconArrowUpRight size={20} />
          </div>
        </div>

      </div>

      {/* -- Dynamic Payment Trend Graph Card -- */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-gray-900">Payment & Revenue Analytics</h3>
            <p className="text-xs text-gray-400">Visualizing cash flow growth and downward trends over time</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button className="px-3 py-1.5 bg-white text-gray-900 shadow-2xs rounded-lg text-xs font-bold">Monthly</button>
            <button className="px-3 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-bold">Yearly</button>
          </div>
        </div>

        {/* Graph Visual Area */}
        <div className="h-48 w-full bg-linear-to-b from-emerald-50/40 to-transparent rounded-2xl border border-emerald-100/50 p-4 flex flex-col justify-end relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-40">
            <div className="border-b border-dashed border-gray-200 w-full"></div>
            <div className="border-b border-dashed border-gray-200 w-full"></div>
            <div className="border-b border-dashed border-gray-200 w-full"></div>
          </div>

          <div className="relative z-10 w-full h-28 flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0,80 Q 80,40 160,60 T 320,30 T 420,70 L 500,50 L 500,100 L 0,100 Z" fill="url(#colorGradient)" />
              <path d="M 0,80 Q 80,40 160,60 T 320,30 T 420,70 L 500,50" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </div>
      </div>

      {/* -- Payment Records Section (Scroll Target) -- */}
      <div ref={recordsSectionRef} className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden scroll-mt-6">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-gray-900">Payment records</h3>
            <p className="text-xs text-gray-500 mt-0.5">Incoming client receipts and outgoing payouts shown newest first</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
            {['All', 'Income', 'Expenses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="p-20 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100 shadow-2xs">
            <IconCurrencyDollar size={28} />
          </div>
          <h4 className="text-sm font-black text-gray-900 mb-1">
            {activeTab === 'Income' ? 'No income records found' : activeTab === 'Expenses' ? 'No expense records found' : 'No payments yet'}
          </h4>
          <p className="text-xs text-gray-400 max-w-sm mb-6">
            {activeTab === 'Expenses' ? 'Add your first expense or vendor payout.' : 'Add your first outgoing payment or record a client receipt.'}
          </p>
          
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => handleOpenModal('Income')}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
            >
              <IconPlus size={16} /> Add Income
            </button>
            <button 
              onClick={() => handleOpenModal('Expense')}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-200 transition-all cursor-pointer active:scale-95"
            >
              <IconPlus size={16} /> Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* ================= ADD PAYMENT MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">
                  {paymentData.type === 'Income' ? 'Record Income / Client Receipt' : 'Record Expense / Vendor Payout'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Enter transaction details below</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePayment} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => setPaymentData({...paymentData, type: 'Income'})}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    paymentData.type === 'Income' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-200/50'
                  }`}
                >
                  Incoming Income (+)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentData({...paymentData, type: 'Expense'})}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    paymentData.type === 'Expense' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-200/50'
                  }`}
                >
                  Outgoing Expense (-)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Amount ($) *</label>
                  <div className="relative">
                    <IconCurrencyDollar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="number" 
                      required
                      placeholder="0.00"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Date *</label>
                  <div className="relative">
                    <IconCalendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="date" 
                      required
                      value={paymentData.date}
                      onChange={(e) => setPaymentData({...paymentData, date: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  {paymentData.type === 'Income' ? 'Client Name *' : 'Vendor / Bnda Name *'}
                </label>
                <div className="relative">
                  <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder={paymentData.type === 'Income' ? 'e.g. Acme Corp' : 'e.g. Ali Developer / Hosting Provider'}
                    value={paymentData.clientOrVendor}
                    onChange={(e) => setPaymentData({...paymentData, clientOrVendor: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Category</label>
                <select 
                  value={paymentData.category}
                  onChange={(e) => setPaymentData({...paymentData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                >
                  <option>Project Milestone</option>
                  <option>Monthly Retainer</option>
                  <option>Software Subscription</option>
                  <option>Team Salary / Payout</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Notes / Reference</label>
                <textarea 
                  rows="3"
                  placeholder="Transaction details..."
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

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
                  className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer ${
                    paymentData.type === 'Income' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                  }`}
                >
                  Save {paymentData.type}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}