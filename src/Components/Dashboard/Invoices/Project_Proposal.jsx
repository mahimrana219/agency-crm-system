import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconFileText 
} from '@tabler/icons-react';

export default function Project_Proposal() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('PROP-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [currency, setCurrency] = useState('$');
  const [proposalTitle, setProposalTitle] = useState('Strategic Development & Implementation');

  // Custom Editable Headings
  const [headings, setHeadings] = useState({
    sec1: '1. Executive Summary',
    sec2: '2. Project Objectives',
    sec3: '3. Scope of Services',
    sec4: '4. Timeline & Milestones',
    sec5: '5. Investment & Budget Breakdown',
    sec6: '6. Terms & Conditions'
  });

  // Executive Summary & Objectives
  const [executiveSummary, setExecutiveSummary] = useState(
    'This project aims to deliver a comprehensive digital solution, leveraging modern web technologies to drive business growth, enhance user engagement, and streamline operational workflows.'
  );

  const [objectives, setObjectives] = useState([
    'Design and deploy a scalable, high-conversion web application.',
    'Implement robust UI/UX principles to maximize user retention.',
    'Integrate secure backend systems for data management and scalability.'
  ]);

  // Scope of Services (Without Prices)
  const [scopeItems, setScopeItems] = useState([
    { title: 'Discovery & Strategy', description: 'Stakeholder interviews, technical architecture design, and competitive positioning.' },
    { title: 'Design & Prototyping', description: 'High-fidelity Figma wireframes, design system setup, and UI component styling.' },
    { title: 'Technical Development', description: 'Full-stack integration using React, Vite, Tailwind CSS, and cloud deployment.' }
  ]);

  // Investment / Pricing Items (Separate section)
  const [budgetItems, setBudgetItems] = useState([
    { title: 'Discovery & Strategy Phase', cost: 500 },
    { title: 'Design & Prototyping Phase', cost: 800 },
    { title: 'Technical Development Phase', cost: 1500 }
  ]);

  // Milestones Timeline
  const [milestones, setMilestones] = useState([
    { phase: 'Phase 1', title: 'Research, Wireframing & Design Sign-off', duration: '1-2 Weeks' },
    { phase: 'Phase 2', title: 'Core Development & API Integration', duration: '3-4 Weeks' },
    { phase: 'Phase 3', title: 'QA, Optimization & Final Deployment', duration: '1 Week' }
  ]);

  // Terms & Conditions
  const [terms, setTerms] = useState(
    '1. Payment Schedule: 50% upfront, 30% on milestone completion, 20% on final project handover.\n2. Proposal Validity: This proposal is valid for 30 days from issuance.\n3. Support: Includes 30 days of post-launch technical maintenance.'
  );

  // Extra Custom Sections Builder
  const [customSections, setCustomSections] = useState([]);

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  // Scope Handlers
  const handleScopeChange = (index, field, value) => {
    const updated = [...scopeItems];
    updated[index][field] = value;
    setScopeItems(updated);
  };
  const addScope = () => setScopeItems([...scopeItems, { title: '', description: '' }]);
  const removeScope = (index) => setScopeItems(scopeItems.filter((_, i) => i !== index));

  // Budget Handlers
  const handleBudgetChange = (index, field, value) => {
    const updated = [...budgetItems];
    updated[index][field] = value;
    setBudgetItems(updated);
  };
  const addBudget = () => setBudgetItems([...budgetItems, { title: '', cost: 0 }]);
  const removeBudget = (index) => setBudgetItems(budgetItems.filter((_, i) => i !== index));

  // Custom Sections Handler
  const addCustomSection = () => setCustomSections([...customSections, { title: 'New Custom Section', content: 'Enter details here...' }]);
  const handleCustomChange = (index, field, value) => {
    const updated = [...customSections];
    updated[index][field] = value;
    setCustomSections(updated);
  };
  const removeCustomSection = (index) => setCustomSections(customSections.filter((_, i) => i !== index));

  const totalBudget = budgetItems.reduce((acc, item) => acc + Number(item.cost), 0);

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Detailed-Project-Proposal-${documentId || 'AgencySolutions'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900 font-sans caret-indigo-600">
      
      {/* TOP CONTROLS BAR */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <IconFileText size={16} /> Actions
          </h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download Proposal PDF
          </button>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Preferences</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-white font-medium"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Proposal ID</label>
              <input 
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-white font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LIVE DOCUMENT CONTAINER */}
      <div className="w-full bg-white p-6 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
        <div ref={documentRef} className="bg-white text-gray-900 w-full space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-100 pb-8">
            <div className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 relative overflow-hidden bg-gray-50">
              {logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <label className="cursor-pointer text-center p-2">
                  <IconCloudUpload size={22} className="mx-auto mb-1 text-indigo-600" />
                  <span className="text-[10px] font-bold text-gray-600">+ Add Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Project Proposal</h1>
              <input 
                type="text"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-indigo-600 mt-1 border-b border-transparent focus:border-indigo-600 focus:outline-none bg-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Date: {date}</p>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Prepared By (Agency)</label>
              <textarea 
                rows="3" 
                value={agencyInfo} 
                onChange={(e) => setAgencyInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Prepared For (Client)</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company Name, Email & Address..." 
                value={clientInfo} 
                onChange={(e) => setClientInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
          </div>

          {/* 1. Executive Summary */}
          <div className="space-y-2">
            <input 
              type="text" 
              value={headings.sec1} 
              onChange={(e) => setHeadings({...headings, sec1: e.target.value})}
              className="text-sm font-black uppercase tracking-wider text-indigo-700 border-b pb-1 w-full focus:outline-none bg-transparent"
            />
            <textarea 
              rows="3"
              value={executiveSummary}
              onChange={(e) => setExecutiveSummary(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50/30 resize-none focus:outline-none focus:border-indigo-600 text-gray-700"
            />
          </div>

          {/* 2. Objectives */}
          <div className="space-y-2">
            <input 
              type="text" 
              value={headings.sec2} 
              onChange={(e) => setHeadings({...headings, sec2: e.target.value})}
              className="text-sm font-black uppercase tracking-wider text-indigo-700 border-b pb-1 w-full focus:outline-none bg-transparent"
            />
            <ul className="list-disc pl-5 text-xs space-y-1 text-gray-700">
              {objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* 3. Scope of Services (No Prices) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec3} 
                onChange={(e) => setHeadings({...headings, sec3: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addScope} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Scope
              </button>
            </div>

            <div className="space-y-2">
              {scopeItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-5">
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleScopeChange(index, 'title', e.target.value)}
                      placeholder="Service title..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={(e) => handleScopeChange(index, 'description', e.target.value)}
                      placeholder="Description..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white text-gray-700"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {scopeItems.length > 1 && (
                      <button onClick={() => removeScope(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Timeline & Milestones */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec4} 
                onChange={(e) => setHeadings({...headings, sec4: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
            </div>

            <div className="space-y-2">
              {milestones.map((m, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      value={m.phase} 
                      onChange={(e) => {
                        const updated = [...milestones];
                        updated[index].phase = e.target.value;
                        setMilestones(updated);
                      }}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="col-span-7">
                    <input 
                      type="text" 
                      value={m.title} 
                      onChange={(e) => {
                        const updated = [...milestones];
                        updated[index].title = e.target.value;
                        setMilestones(updated);
                      }}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value={m.duration} 
                      onChange={(e) => {
                        const updated = [...milestones];
                        updated[index].duration = e.target.value;
                        setMilestones(updated);
                      }}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs text-center font-medium bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Investment & Budget Breakdown (Separate Section) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec5} 
                onChange={(e) => setHeadings({...headings, sec5: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addBudget} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Item
              </button>
            </div>

            <div className="space-y-2">
              {budgetItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-9">
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleBudgetChange(index, 'title', e.target.value)}
                      placeholder="Budget item title..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.cost} 
                      onChange={(e) => handleBudgetChange(index, 'cost', e.target.value)}
                      placeholder="Cost" 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold text-center bg-white text-indigo-600"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {budgetItems.length > 1 && (
                      <button onClick={() => removeBudget(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 text-sm font-bold text-gray-800">
              Total Investment: <span className="text-indigo-600 ml-2">{currency}{totalBudget.toFixed(2)}</span>
            </div>
          </div>

          {/* DYNAMIC CUSTOM SECTIONS BUILDER */}
          {customSections.map((sec, index) => (
            <div key={index} className="space-y-2 bg-gray-50/50 p-4 rounded-2xl border border-gray-200 relative">
              <div className="flex items-center justify-between gap-2">
                <input 
                  type="text" 
                  value={sec.title} 
                  onChange={(e) => handleCustomChange(index, 'title', e.target.value)}
                  className="text-sm font-black uppercase tracking-wider text-indigo-700 border-b pb-1 w-full focus:outline-none bg-transparent"
                />
                <button onClick={() => removeCustomSection(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                  <IconTrash size={16} />
                </button>
              </div>
              <textarea 
                rows="3"
                value={sec.content} 
                onChange={(e) => handleCustomChange(index, 'content', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-white resize-none focus:outline-none focus:border-indigo-600 text-gray-700"
              />
            </div>
          ))}

          <button onClick={addCustomSection} className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
            <IconPlus size={16} /> Add Custom Section / Clause
          </button>

          {/* 6. Terms & Conditions */}
          <div className="space-y-2">
            <input 
              type="text" 
              value={headings.sec6} 
              onChange={(e) => setHeadings({...headings, sec6: e.target.value})}
              className="text-sm font-black uppercase tracking-wider text-indigo-700 border-b pb-1 w-full focus:outline-none bg-transparent"
            />
            <textarea 
              rows="3"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50/30 resize-none focus:outline-none focus:border-indigo-600 text-gray-700"
            />
          </div>

          {/* Sign-off Panel */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Agency Solutions Representative:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Signature & Date</div>
            </div>
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Client Acceptance Signature:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Signature & Date</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}