import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  IconPlus, IconSearch, IconDownload, 
  IconCheck, IconClock, IconAlertCircle,
  IconFileInvoice, IconBriefcase, IconCalendar
} from '@tabler/icons-react';

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState('');

  // Invoice History Data with Service details
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', client: 'TechCorp Solutions', service: 'Full-Stack Web Development', date: '2026-08-20', amount: '$2,400', status: 'Paid' },
    { id: 'INV-002', client: 'Alpha Marketing', service: 'UI/UX Redesign & Landing Page', date: '2026-08-21', amount: '$1,250', status: 'Pending' },
    { id: 'INV-003', client: 'Nexus Global', service: 'Custom Dashboard & API Setup', date: '2026-08-22', amount: '$3,100', status: 'Overdue' },
  ]);

  // Filter invoices based on search
  const filteredInvoices = invoices.filter(inv => 
    inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Invoices Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Manage and track all agency billings and client invoices.</p>
        </div>
        <NavLink to="/invoicecreate" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 flex items-center gap-2 shadow-sm transition-all">
          <IconPlus size={18} /> Create Invoice
        </NavLink>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Paid</p>
            <h3 className="text-2xl font-black mt-1 text-indigo-600">$4,200</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><IconCheck size={22}/></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>
            <h3 className="text-2xl font-black mt-1 text-indigo-600">$2,200</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><IconClock size={22}/></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Overdue</p>
            <h3 className="text-2xl font-black mt-1 text-rose-600">$3,100</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><IconAlertCircle size={22}/></div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
        <IconSearch size={18} className="text-gray-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search by invoice ID, client name, or service..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm focus:outline-none bg-transparent"
        />
      </div>

      {/* Invoice Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((inv) => (
            <div key={inv.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              
              {/* Card Top: ID & Status */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <IconFileInvoice size={14} /> {inv.id}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  inv.status === 'Paid' ? 'bg-indigo-50 text-indigo-600' : 
                  inv.status === 'Pending' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {inv.status}
                </span>
              </div>

              {/* Client & Service Info */}
              <div>
                <h3 className="text-base font-bold text-gray-900">{inv.client}</h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 font-medium">
                  <IconBriefcase size={14} className="text-gray-400" /> {inv.service}
                </p>
              </div>

              {/* Date & Amount */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <IconCalendar size={14} /> {inv.date}
                </span>
                <span className="text-lg font-black text-gray-900">{inv.amount}</span>
              </div>

              {/* Action Button */}
              <button className="w-full mt-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <IconDownload size={16} /> Download PDF
              </button>

            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
            No invoices found matching your search.
          </div>
        )}
      </div>

    </div>
  );
}