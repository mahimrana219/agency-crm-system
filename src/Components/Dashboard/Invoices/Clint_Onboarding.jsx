import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconChecklist 
} from '@tabler/icons-react';

export default function Client_Onboarding() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('ONB-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [currency, setCurrency] = useState('$');
  const [serviceType, setServiceType] = useState('Full-Stack Web Development');
  
  // Toggles for onboarding sections
  const [toggles, setToggles] = useState({
    techStack: true,
    milestones: true,
    terms: true,
    signatures: true
  });

  const [techStack, setTechStack] = useState('React, Vite, Tailwind CSS, Node.js, Vercel');
  const [projectBudget, setProjectBudget] = useState(1500);
  const [advancePayment, setAdvancePayment] = useState(500);
  
  const [milestones, setMilestones] = useState([
    { phase: 'Phase 1', title: 'UI/UX Design & Architecture', duration: '1 Week' },
    { phase: 'Phase 2', title: 'Frontend & Backend Development', duration: '2 Weeks' },
    { phase: 'Phase 3', title: 'Testing, Deployment & Handover', duration: '3 Days' }
  ]);

  const [notes, setNotes] = useState('Welcome aboard! Please review the scope of work and confirm details to initiate development.');
  const [terms, setTerms] = useState('1. 50% advance payment required before kickoff.\n2. Total 2 rounds of major revisions included.\n3. All code and assets remain agency property until full balance clearance.');

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => setMilestones([...milestones, { phase: `Phase ${milestones.length + 1}`, title: '', duration: '' }]);
  const removeMilestone = (index) => setMilestones(milestones.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Client-Onboarding-${documentId || 'AgencySolutions'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleSaveToBackend = async () => {
    const onboardingData = {
      documentId,
      serviceType,
      currency,
      agencyInfo,
      clientInfo,
      techStack,
      projectBudget,
      advancePayment,
      milestones,
      notes,
      terms
    };

    console.log("Saving Onboarding Data to Backend:", onboardingData);
    alert("Client Onboarding document data ready for backend API!");
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900 font-sans caret-indigo-600">
      
      {/* TOP SECTION: CONTROLS, ACTIONS & PREFERENCES */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Actions Box */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <IconChecklist size={16} /> Actions
          </h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download Onboarding PDF
          </button>
          
          <button 
            onClick={handleSaveToBackend}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save Agreement
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Preferences</h3>
          
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Currency</label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 bg-white font-medium text-gray-800"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="PKR">PKR (Rs)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Service Type</label>
            <select 
              value={serviceType} 
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 bg-white font-medium text-gray-800"
            >
              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="UI/UX & Graphic Design">UI/UX & Graphic Design</option>
              <option value="Custom Software Solution">Custom Software Solution</option>
            </select>
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Document Sections</h3>
          
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium pt-1">
            <input 
              type="checkbox" 
              checked={toggles.techStack} 
              onChange={(e) => setToggles({...toggles, techStack: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Tech Stack Section
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.milestones} 
              onChange={(e) => setToggles({...toggles, milestones: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Milestones Timeline
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.terms} 
              onChange={(e) => setToggles({...toggles, terms: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Terms & Policies
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.signatures} 
              onChange={(e) => setToggles({...toggles, signatures: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Sign-off Signatures
          </label>
        </div>

      </div>

      {/* BOTTOM SECTION: LIVE PREVIEW & EDITABLE ONBOARDING DOCUMENT */}
      <div className="w-full bg-white p-6 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Preview & Editor</h2>
          <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">Professional Onboarding</span>
        </div>

        {/* Printable White Paper Preview Box */}
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Client Onboarding</h1>
              <p className="text-xs font-bold text-indigo-600 mt-1">{serviceType}</p>
              <div className="flex items-center sm:justify-end gap-2 mt-2">
                <span className="text-xs font-bold text-gray-400">DOC ID:</span>
                <input 
                  type="text" 
                  value={documentId} 
                  onChange={(e) => setDocumentId(e.target.value)} 
                  className="w-32 sm:text-right border-b border-gray-200 focus:border-indigo-600 focus:outline-none font-bold text-sm text-gray-900 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Agency & Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Issued By (Agency)</label>
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

          {/* Date & Budget Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">Agreement Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border border-gray-200 rounded-lg bg-white font-medium" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">Total Project Budget</span>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-2">
                <span className="text-gray-400 font-bold">{currency}</span>
                <input type="number" value={projectBudget} onChange={(e) => setProjectBudget(e.target.value)} className="w-full p-2 bg-transparent font-bold focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">Required Advance</span>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-2">
                <span className="text-gray-400 font-bold">{currency}</span>
                <input type="number" value={advancePayment} onChange={(e) => setAdvancePayment(e.target.value)} className="w-full p-2 bg-transparent font-bold text-indigo-600 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          {toggles.techStack && (
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Configured Tech Stack & Assets</label>
              <input 
                type="text" 
                value={techStack} 
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium text-gray-800"
              />
            </div>
          )}

          {/* Milestones Timeline */}
          {toggles.milestones && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Project Milestones & Timeline</label>
                <button onClick={addMilestone} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                  <IconPlus size={14} /> Add Phase
                </button>
              </div>

              <div className="space-y-3">
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
                    <div className="col-span-6">
                      <input 
                        type="text" 
                        value={m.title} 
                        onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        placeholder="Milestone description..."
                        className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="text" 
                        value={m.duration} 
                        onChange={(e) => handleMilestoneChange(index, 'duration', e.target.value)}
                        placeholder="Duration"
                        className="w-full p-2 border border-gray-200 rounded-lg text-xs text-center font-medium bg-white"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      {milestones.length > 1 && (
                        <button onClick={() => removeMilestone(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                          <IconTrash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 text-sm">
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Welcome Note</label>
              <textarea rows="3" value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
            </div>

            {toggles.terms && (
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Terms & Policies</label>
                <textarea rows="3" value={terms} onChange={(e)=>setTerms(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
              </div>
            )}
          </div>

          {/* Signatures Panel */}
          {toggles.signatures && (
            <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
              <div className="space-y-6">
                <p className="font-bold text-gray-600">Authorized Agency Signature:</p>
                <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Agency Solutions Representative</div>
              </div>
              <div className="space-y-6">
                <p className="font-bold text-gray-600">Client Approval Signature:</p>
                <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Client Name / Signature</div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
