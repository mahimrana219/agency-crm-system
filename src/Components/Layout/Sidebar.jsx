import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  IconDashboard, IconTarget, IconUsers, IconBriefcase, IconRepeat, 
  IconCreditCard, IconWorld, IconMessage, IconCalendar, IconChecklist, 
  IconFileText, IconUserShield, IconReceipt, IconSettings, IconChevronDown, 
  IconChevronUp, IconFilter, IconCoins, IconLayoutGrid, IconBuilding,
  IconCalculator, IconCashBanknote, IconUserCheck, IconFileInvoice,
  IconUserPlus, IconHomeCheck, IconBell, IconHeartHandshake, IconShieldLock, 
  IconListCheck, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand,
  IconX 
} from '@tabler/icons-react';

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    pipeline: true, 
    revenue: true, 
    workspace: true, 
    invoices: true, 
    documents: false, 
    hr: false, 
    calculators: false, 
    organization: false  
  });

  const toggleSection = (section) => {
    if (isCollapsed) return;
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
      isActive
        ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-xs border border-indigo-100/85'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  const SidebarBody = () => (
    <div className="flex flex-col h-full bg-white justify-between overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="h-18 flex items-center justify-between px-4 border-b border-gray-100/80">
          {!isCollapsed && (
            <h1 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2 truncate">
              <span>Agency</span><span className="text-indigo-600">Solutions</span>
            </h1>
          )}
          {isCollapsed && (
            <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100">
              AS
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <IconLayoutSidebarLeftExpand size={20} /> : <IconLayoutSidebarLeftCollapse size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-gray-500 hover:text-indigo-600 cursor-pointer"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Links */}
        <div className="p-4 pb-2">
          <NavLink to="/" onClick={() => setIsMobileOpen(false)} className={navLinkStyle} title="Dashboard">
            <IconDashboard size={20} className="transition-transform group-hover:scale-110 shrink-0" />
            {!isCollapsed && <span className="truncate">Dashboard</span>}
          </NavLink>
        </div>

        {/* Pipeline Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('pipeline')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconFilter size={15} className="text-indigo-600 shrink-0" /> Pipeline</span>
              <span className="text-gray-400">{openSections.pipeline ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.pipeline || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/leads" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconTarget size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Leads</span>}</NavLink>
              <NavLink to="/clients" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconUsers size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Clients</span>}</NavLink>
              <NavLink to="/projects" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconBriefcase size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Projects</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Revenue Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('revenue')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconCoins size={15} className="text-indigo-600 shrink-0" /> Revenue</span>
              <span className="text-gray-400">{openSections.revenue ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.revenue || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/retainers" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconRepeat size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Retainers</span>}</NavLink>
              <NavLink to="/payments" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCreditCard size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Payments</span>}</NavLink>
              <NavLink to="/public-page" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconWorld size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Public Page</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Workspace Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('workspace')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconLayoutGrid size={15} className="text-indigo-600 shrink-0" /> Workspace</span>
              <span className="text-gray-400">{openSections.workspace ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.workspace || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/messages" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconMessage size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Messages</span>}</NavLink>
              <NavLink to="/meetings" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCalendar size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Meetings</span>}</NavLink>
              <NavLink to="/tasks" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconChecklist size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Tasks</span>}</NavLink>
              <NavLink to="/documents" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconFileText size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Documents</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Invoices Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('invoices')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconFileInvoice size={15} className="text-indigo-600 shrink-0" /> Invoices</span>
              <span className="text-gray-400">{openSections.invoices ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.invoices || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/invoices" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconFileInvoice size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Invoices Dashboard</span>}</NavLink>
              <NavLink to="/invoicecreate" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconReceipt size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Create Invoice</span>}</NavLink>
              <NavLink to="/clint_reminder_invoice" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconBell size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Reminder Invoice</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Create Documents Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('documents')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconFileText size={15} className="text-indigo-600 shrink-0" /> Create Docs</span>
              <span className="text-gray-400">{openSections.documents ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.documents || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/clint_onboarding" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconUserPlus size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Client Onboarding</span>}</NavLink>
              <NavLink to="/wellcome_onboard" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconHomeCheck size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Welcome Onboard</span>}</NavLink>
              <NavLink to="/freelance_contract" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconFileText size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Freelance Contract</span>}</NavLink>
              <NavLink to="/retainer_agreement" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconHeartHandshake size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Retainer Agreement</span>}</NavLink>
              <NavLink to="/NDA_freelance" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconShieldLock size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">NDA Freelancer</span>}</NavLink>
              <NavLink to="/project_proposal" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconBriefcase size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Project Proposal</span>}</NavLink>
              <NavLink to="/quotation" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconFileText size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Quotation</span>}</NavLink>
              <NavLink to="/scope_of_work" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconListCheck size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Scope of Work</span>}</NavLink>
              <NavLink to="/expense" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCashBanknote size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Expenses</span>}</NavLink>
            </div>
          )}
        </div>

        {/* HR & Payroll Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('hr')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconUserCheck size={15} className="text-indigo-600 shrink-0" /> HR & Payroll</span>
              <span className="text-gray-400">{openSections.hr ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.hr || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/attendance" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCalendar size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Attendance</span>}</NavLink>
              <NavLink to="/payroll" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCoins size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Payroll</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Calculators Section */}
        <div className="px-4 py-2">
          {!isCollapsed && (
            <button onClick={() => toggleSection('calculators')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconCalculator size={15} className="text-indigo-600 shrink-0" /> Calculators</span>
              <span className="text-gray-400">{openSections.calculators ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.calculators || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/freelance_rate_calculator" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCalculator size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Freelance Rate</span>}</NavLink>
              <NavLink to="/GST_calculator" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconReceipt size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">GST Calculator</span>}</NavLink>
              <NavLink to="/profit_margin_calculator" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconCoins size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Profit Margin</span>}</NavLink>
              <NavLink to="/retainer_calculator" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconRepeat size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Retainer Calc</span>}</NavLink>
              <NavLink to="/TDS_calculator" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconFileInvoice size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">TDS Calculator</span>}</NavLink>
            </div>
          )}
        </div>

        {/* Organization Section */}
        <div className="px-4 py-2 mb-6">
          {!isCollapsed && (
            <button onClick={() => toggleSection('organization')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:bg-indigo-50/60 hover:text-indigo-700 transition-all cursor-pointer">
              <span className="flex items-center gap-2"><IconBuilding size={15} className="text-indigo-600 shrink-0" /> Organization</span>
              <span className="text-gray-400">{openSections.organization ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}</span>
            </button>
          )}
          {(openSections.organization || isCollapsed) && (
            <div className={`space-y-1 mt-1.5 ${!isCollapsed ? 'pl-2 border-l-2 border-indigo-50 ml-3' : 'space-y-2 flex flex-col items-center'}`}>
              <NavLink to="/team" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconUserShield size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Team</span>}</NavLink>
              <NavLink to="/billing" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconReceipt size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Billing</span>}</NavLink>
              <NavLink to="/settings" onClick={() => setIsMobileOpen(false)} className={navLinkStyle}><IconSettings size={18} className="shrink-0" />{!isCollapsed && <span className="truncate">Settings</span>}</NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Profile Card */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        {!isCollapsed ? (
          <div className="flex items-center justify-between p-2.5 rounded-2xl border border-gray-200/70 bg-white shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-200 shrink-0">
                M
              </div>
              <div className="truncate">
                <h4 className="text-xs font-bold text-gray-900 truncate">Mahim Rana</h4>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-2 py-0.5 rounded-md font-semibold inline-block mt-0.5">Free Plan</span>
              </div>
            </div>
            <NavLink to="/settings" onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer shrink-0" title="Settings">
              <IconSettings size={18} />
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-200" title="Mahim Rana">
              AS
            </div>
            <NavLink to="/settings" onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer" title="Settings">
              <IconSettings size={18} />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Collapsible Sidebar */}
      <aside className={`hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out shrink-0 z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <SidebarBody />
      </aside>

      {/* 2. Mobile Overlay Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setIsMobileOpen(false)}></div>
          <div className="relative w-72 h-full bg-white shadow-2xl z-[101] flex flex-col animate-in slide-in-from-left duration-300">
            <SidebarBody />
          </div>
        </div>
      )}
    </>
  );
}