// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IconPlus, IconTrendingUp, IconUsers, IconBriefcase, 
  IconArrowRight, IconWorld, IconFilter,
  IconSpeakerphone, IconSend, IconCurrencyDollar,
  IconReceipt, IconWallet, IconRepeat, IconCalendar, IconClock,
  IconChevronDown
} from '@tabler/icons-react';

export default function Dashboard() {
  // State for Client Portal tabs
  const [portalTab, setPortalTab] = useState('Activity');
  const portalTabs = ['Activity', 'Announce'];

  // Announce form state
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');

  // Revenue Trend Date Dropdown state
  const [showTrendDropdown, setShowTrendDropdown] = useState(false);
  const [trendFrom, setTrendFrom] = useState('February 2026');
  const [trendTo, setTrendTo] = useState('July 2026');

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-gray-900">
      
      {/* -- Welcome & Date Banner -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, Mahim Rana 👋
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Here is what's happening with your agency business today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs sm:text-sm text-[#4F46E5] font-semibold bg-white px-4 py-2 rounded-full border border-indigo-200 self-start sm:self-auto shadow-2xs">
          Saturday, Aug 22, 2026
        </div>
      </div>

      {/* -- Top Grid: Sales Pipeline & Client Portal -- */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
        
        {/* Sales Pipeline Section (Left) */}
        <div className="xl:col-span-3 bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <IconFilter size={18} style={{ color: '#4F46E5' }} /> Sales Pipeline
            </h3>
            <Link to="/leads" className="text-xs sm:text-sm font-bold hover:underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
              View <IconArrowRight size={16} />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-6">
            Track leads and active web development projects through your sales pipeline.
          </p>

          {/* Pipeline Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-indigo-100 pt-6">
            {[
              { label: 'New projects', value: 2 },
              { label: 'Ongoing', value: 4 },
              { label: 'Completed', value: 12 },
              { label: 'Total projects', value: 18 },
              { label: 'Total clients', value: 8 },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                <p className="text-xl sm:text-2xl font-black text-gray-900">{item.value}</p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-600 mt-1 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Portal Section (Right) */}
        <div className="xl:col-span-2 bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2 whitespace-nowrap">
              <IconWorld size={18} style={{ color: '#4F46E5' }} className="shrink-0" /> Client portal
            </h3>
            
            {/* Portal Activity/Announce Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-indigo-100 shadow-2xs shrink-0">
              {portalTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPortalTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    portalTab === tab
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:bg-indigo-50'
                  }`}
                  style={portalTab === tab ? { backgroundColor: '#4F46E5' } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Portal Content */}
          {portalTab === 'Activity' ? (
            <div className="text-center py-8 border border-indigo-100 rounded-xl bg-white shadow-2xs">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">No recent client portal activity.</p>
            </div>
          ) : (
            <div className="space-y-3 p-4 border border-indigo-100 rounded-xl bg-white shadow-2xs">
              <div className="flex items-center justify-between px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 cursor-pointer shadow-2xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <IconSpeakerphone size={16} style={{ color: '#4F46E5' }} />
                  <span>All portal clients</span>
                </div>
                <IconChevronDown size={16} className="text-gray-400" />
              </div>

              <input 
                type="text" 
                placeholder="Announcement title"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4F46E5]"
              />

              <textarea 
                rows="3"
                placeholder="Message to your clients..."
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] resize-none"
              />

              <button 
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#4F46E5' }}
              >
                <IconSend size={15} />
                Post announcement
              </button>
            </div>
          )}

          {/* Portal Metrics Row */}
          <div className="mt-6 border-t border-indigo-100 pt-6 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Messages', value: 3 },
                { label: 'Approvals', value: 5 },
                { label: 'Changes', value: 1 },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <p className="text-lg sm:text-xl font-black text-gray-900">{item.value}</p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-600 mt-1 leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Referrals', value: 2 },
                { label: 'Reviews', value: 4 },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <p className="text-lg sm:text-xl font-black text-gray-900">{item.value}</p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-600 mt-1 leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* -- "THIS MONTH" Section Header & Dropdown -- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">THIS MONTH</h3>
        <div className="text-xs sm:text-sm bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 shadow-2xs cursor-pointer hover:border-indigo-300 flex items-center gap-2 self-start sm:self-auto font-bold" style={{ color: '#4F46E5' }}>
          August 2026 <IconChevronDown size={16} className="text-indigo-500" />
        </div>
      </div>

      {/* -- THIS MONTH: 4 Financial Cards Grid -- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4F46E5' }}>
              <IconTrendingUp size={16} /> Revenue
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black" style={{ color: '#4F46E5' }}>$4,500</p>
          <p className="text-xs text-gray-600 mt-2 font-medium">2 new projects</p>
          <p className="text-[11px] text-gray-400 italic mt-1">Sum of new project budgets this month</p>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4F46E5' }}>
              <IconCurrencyDollar size={16} /> Received
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black" style={{ color: '#4F46E5' }}>$3,200</p>
          <p className="text-xs text-gray-600 mt-4 font-medium">Payments collected this month</p>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4F46E5' }}>
              <IconReceipt size={16} /> Expenses
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black" style={{ color: '#4F46E5' }}>$450</p>
          <p className="text-xs text-gray-600 mt-4 font-medium">Team payouts & dev tools</p>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4F46E5' }}>
              <IconWallet size={16} /> Money in account
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black" style={{ color: '#4F46E5' }}>$2,750</p>
          <p className="text-xs text-gray-600 mt-4 font-medium">Received minus expenses</p>
        </div>
      </div>

      {/* -- Active Retainers & Revenue by Type Grid -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4F46E5' }}>Active retainers</h4>
              <div className="p-2 bg-white rounded-xl border border-indigo-100 shadow-2xs" style={{ color: '#4F46E5' }}>
                <IconRepeat size={18} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black" style={{ color: '#4F46E5' }}>1</p>
            <p className="text-xs text-gray-600 mt-2 font-medium">MRR $800/mo</p>
          </div>
          <div className="mt-6 pt-4 border-t border-indigo-100">
            <Link to="/retainers" className="text-xs font-bold hover:underline flex items-center gap-1" style={{ color: '#4F46E5' }}>
              View retainers <IconArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4F46E5' }}>
              <IconRepeat size={16} /> Revenue by type
            </h4>
          </div>
          <p className="text-xs text-gray-500 mb-4 font-medium">Payments received to date</p>
          <div className="border border-dashed border-indigo-200 rounded-2xl p-8 text-center bg-white shadow-2xs">
            <div className="flex justify-between items-center text-xs font-bold py-2 border-b border-gray-100">
              <span className="text-gray-600">Web Development Services</span>
              <span style={{ color: '#4F46E5' }}>$2,400</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold pt-2">
              <span className="text-gray-600">UI/UX & Consultation</span>
              <span style={{ color: '#4F46E5' }}>$800</span>
            </div>
          </div>
        </div>
      </div>

      {/* -- REVENUE TREND SECTION -- */}
      <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <IconCalendar size={18} style={{ color: '#4F46E5' }} /> Revenue trend
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Received, expenses & new revenue analysis</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Revenue (New)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4F46E5' }}></span> Received</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Expenses</span>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowTrendDropdown(!showTrendDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-bold hover:border-indigo-300 shadow-2xs cursor-pointer"
                style={{ color: '#4F46E5' }}
              >
                <IconCalendar size={15} />
                <span>{trendFrom} – {trendTo}</span>
                <IconChevronDown size={14} className="text-gray-400" />
              </button>

              {showTrendDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">From</label>
                      <div className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 bg-gray-50 flex items-center justify-between">
                        <span>{trendFrom}</span>
                        <IconChevronDown size={12} className="text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">To</label>
                      <div className="px-3 py-2 rounded-xl text-xs font-medium text-white flex items-center justify-between" style={{ backgroundColor: '#4F46E5' }}>
                        <span>{trendTo}</span>
                        <IconChevronDown size={12} className="text-white opacity-80" />
                      </div>
                    </div>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border-t border-gray-100 pt-2 text-xs">
                    {['February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026', 'July 2026', 'August 2026'].map((m) => (
                      <div 
                        key={m} 
                        onClick={() => { setTrendTo(m); setShowTrendDropdown(false); }}
                        className={`px-3 py-2 rounded-xl cursor-pointer font-medium transition-colors ${m === trendTo ? 'text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        style={m === trendTo ? { backgroundColor: '#4F46E5' } : {}}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Trend Chart Simulator Box */}
        <div className="border border-dashed border-indigo-200 rounded-2xl p-10 text-center bg-white shadow-2xs flex flex-col items-center justify-center gap-3">
          <div className="w-full h-24 flex items-end justify-around gap-2 px-4 pt-4 border-b border-gray-100">
            <div className="w-8 rounded-t-lg h-16 opacity-90" style={{ backgroundColor: '#4F46E5' }}></div>
            <div className="w-8 rounded-t-lg h-20 opacity-70" style={{ backgroundColor: '#4F46E5' }}></div>
            <div className="w-8 rounded-t-lg h-12" style={{ backgroundColor: '#4F46E5' }}></div>
            <div className="w-8 rounded-t-lg h-22 opacity-80" style={{ backgroundColor: '#4F46E5' }}></div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Active trend data visualization for {trendFrom} to {trendTo}</p>
        </div>
      </div>

      {/* -- ALL-TIME REVENUE OVERVIEW -- */}
      <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs">
        <h3 className="font-extrabold text-xs uppercase tracking-wider mb-6" style={{ color: '#4F46E5' }}>All-time revenue overview</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-indigo-100 text-center shadow-2xs">
            <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-3 bg-indigo-50/50" style={{ borderColor: '#4F46E5' }}>
              <span className="text-xl font-black" style={{ color: '#4F46E5' }}>75%</span>
            </div>
            <p className="text-xs text-gray-600 font-bold">of total value collected</p>
          </div>

          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
              <span className="text-xs font-bold text-gray-700">Total project value</span>
              <span className="text-sm font-black text-gray-900">$12,000</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
              <span className="text-xs font-bold text-gray-700">Amount received</span>
              <span className="text-sm font-black" style={{ color: '#4F46E5' }}>$9,000</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs">
              <span className="text-xs font-bold text-gray-700">Pending amount</span>
              <span className="text-sm font-black" style={{ color: '#4F46E5' }}>$3,000</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-6 mt-6 border-t border-indigo-100 text-xs font-bold text-gray-700">
          <span>Total expenses: <strong className="text-rose-600">$1,450</strong></span>
          <span>Money in account: <strong style={{ color: '#4F46E5' }}>$7,550</strong></span>
        </div>
      </div>

      {/* -- Upcoming reminders & Recent clients -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                <IconClock size={18} style={{ color: '#4F46E5' }} /> Upcoming reminders
              </h4>
              <Link to="/reminders" className="text-xs font-bold hover:underline" style={{ color: '#4F46E5' }}>View all</Link>
            </div>
            <div className="space-y-2 bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs">
              <div className="flex justify-between text-xs font-bold text-gray-800">
                <span>Client project delivery (Carol Denise)</span>
                <span style={{ color: '#4F46E5' }}>Tomorrow</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Review hero section banners & finalize checkout flow.</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                <IconUsers size={18} style={{ color: '#4F46E5' }} /> Recent clients
              </h4>
              <Link to="/clients" className="text-xs font-bold hover:underline" style={{ color: '#4F46E5' }}>View all</Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-gray-800 shadow-2xs">
                <span>Carol Denise (Author)</span>
                <span className="font-medium text-[11px]" style={{ color: '#4F46E5' }}>Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-indigo-100 text-xs font-bold text-gray-800 shadow-2xs">
                <span>Dr. Howard C. Samuels</span>
                <span className="font-medium text-[11px]" style={{ color: '#4F46E5' }}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Bottom Quick Actions -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-2xs" style={{ color: '#4F46E5' }}>
              <IconPlus size={22} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Add client</h4>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Create a new client profile</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl border border-indigo-100 shadow-2xs" style={{ color: '#4F46E5' }}>
              <IconCalendar size={22} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Schedule meeting</h4>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Plan your next client meeting</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}