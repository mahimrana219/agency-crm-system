import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconFileText 
} from '@tabler/icons-react';

export default function Scope_of_work() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Meer Tech Solution\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('SOW-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [sowTitle, setSowTitle] = useState('Statement of Work & Project Deliverables');

  // Custom Editable Headings
  const [headings, setHeadings] = useState({
    sec1: '1. Project Overview',
    sec2: '2. Detailed Scope of Services',
    sec3: '3. Deliverables & Milestones',
    sec4: '4. Out of Scope',
    sec5: '5. Client Responsibilities'
  });

  const [overview, setOverview] = useState(
    'This Statement of Work (SOW) defines the specific tasks, deliverables, and timelines associated with the upcoming project engagement between Meer Tech Solution and the Client.'
  );

  // Scope Deliverables Builder
  const [scopeItems, setScopeItems] = useState([
    { title: 'Frontend Architecture', description: 'Developing responsive UI components using React, Vite, and Tailwind CSS.' },
    { title: 'UI/UX Design & Assets', description: 'Creating high-fidelity wireframes, styling guides, and graphic branding assets.' }
  ]);

  // Milestones Builder
  const [milestones, setMilestones] = useState([
    { phase: 'Phase 1', title: 'Wireframing & Initial Layouts', deadline: 'Week 1' },
    { phase: 'Phase 2', title: 'Core Development & Integration', deadline: 'Week 3' }
  ]);

  // Out of Scope Items
  const [outOfScope, setOutOfScope] = useState([
    'Custom backend hosting server configurations beyond Vercel deployment.',
    'Third-party paid API subscription costs.'
  ]);

  // Client Responsibilities
  const [responsibilities, setResponsibilities] = useState([
    'Providing prompt feedback and design approvals within 48 hours.',
    'Supplying necessary brand logos, text content, and credentials.'
  ]);

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

  // Milestone Handlers
  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };
  const addMilestone = () => setMilestones([...milestones, { phase: `Phase ${milestones.length + 1}`, title: '', deadline: '' }]);
  const removeMilestone = (index) => setMilestones(milestones.filter((_, i) => i !== index));

  // Out of Scope Handlers
  const addOutOfScope = () => setOutOfScope([...outOfScope, '']);
  const removeOutOfScope = (index) => setOutOfScope(outOfScope.filter((_, i) => i !== index));

  // Responsibilities Handlers
  const addResponsibility = () => setResponsibilities([...responsibilities, '']);
  const removeResponsibility = (index) => setResponsibilities(responsibilities.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Scope-of-Work-${documentId || 'MeerTech'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900 font-sans caret-emerald-600">
      
      {/* TOP CONTROLS BAR */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <IconFileText size={16} /> Actions
          </h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download Scope of Work PDF
          </button>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Preferences</h3>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Document ID / Reference</label>
            <input 
              type="text"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white font-bold"
            />
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
                  <IconCloudUpload size={22} className="mx-auto mb-1 text-emerald-600" />
                  <span className="text-[10px] font-bold text-gray-600">+ Add Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Statement of Work</h1>
              <input 
                type="text"
                value={sowTitle}
                onChange={(e) => setSowTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-emerald-600 mt-1 border-b border-transparent focus:border-emerald-600 focus:outline-none bg-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Date: {date}</p>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Service Provider (Agency)</label>
              <textarea 
                rows="3" 
                value={agencyInfo} 
                onChange={(e) => setAgencyInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Client</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company Name, Email & Address..." 
                value={clientInfo} 
                onChange={(e) => setClientInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
          </div>

          {/* 1. Project Overview */}
          <div className="space-y-2">
            <input 
              type="text" 
              value={headings.sec1} 
              onChange={(e) => setHeadings({...headings, sec1: e.target.value})}
              className="text-sm font-black uppercase tracking-wider text-emerald-700 border-b pb-1 w-full focus:outline-none bg-transparent"
            />
            <textarea 
              rows="3"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-gray-50/30 resize-none focus:outline-none focus:border-emerald-600 text-gray-700"
            />
          </div>

          {/* 2. Detailed Scope of Services */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec2} 
                onChange={(e) => setHeadings({...headings, sec2: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-emerald-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addScope} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Task
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
                      placeholder="Task title..." 
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

          {/* 3. Deliverables & Milestones */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec3} 
                onChange={(e) => setHeadings({...headings, sec3: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-emerald-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addMilestone} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Milestone
              </button>
            </div>

            <div className="space-y-2">
              {milestones.map((m, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      value={m.phase} 
                      onChange={(e) => handleMilestoneChange(index, 'phase', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="col-span-7">
                    <input 
                      type="text" 
                      value={m.title} 
                      onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                      placeholder="Milestone goal..."
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white"
                    />
                  </div>
                  <div className="col-span-2 text-center">
                    <input 
                      type="text" 
                      value={m.deadline} 
                      onChange={(e) => handleMilestoneChange(index, 'deadline', e.target.value)}
                      placeholder="Deadline"
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs text-center font-medium bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Out of Scope */}
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec4} 
                onChange={(e) => setHeadings({...headings, sec4: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-emerald-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addOutOfScope} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {outOfScope.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50/40 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-rose-500">•</span>
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => {
                      const updated = [...outOfScope];
                      updated[index] = e.target.value;
                      setOutOfScope(updated);
                    }}
                    className="w-full text-xs font-medium bg-transparent focus:outline-none text-gray-700"
                  />
                  {outOfScope.length > 1 && (
                    <button onClick={() => removeOutOfScope(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                      <IconTrash size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Client Responsibilities */}
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec5} 
                onChange={(e) => setHeadings({...headings, sec5: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-emerald-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addResponsibility} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {responsibilities.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50/40 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-emerald-600">•</span>
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => {
                      const updated = [...responsibilities];
                      updated[index] = e.target.value;
                      setResponsibilities(updated);
                    }}
                    className="w-full text-xs font-medium bg-transparent focus:outline-none text-gray-700"
                  />
                  {responsibilities.length > 1 && (
                    <button onClick={() => removeResponsibility(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                      <IconTrash size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sign-off Panel */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Meer Tech Solution Representative:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Signature & Date</div>
            </div>
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Client Approval:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Accepted & Date</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}