import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconCheck, IconFileText, IconSparkles 
} from '@tabler/icons-react';

export default function Wellcome_Onboard() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('ONB-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [onboardTitle, setOnboardTitle] = useState('Client Onboarding & Welcome Package');

  // Custom Editable Headings
  const [headings, setHeadings] = useState({
    sec1: '1. Getting Started & Next Steps',
    sec2: '2. Required Assets & Access',
    sec3: '3. Communication Channels',
    sec4: '4. Project Timeline Overview'
  });

  // Welcome Hero Text
  const [welcomeHeading, setWelcomeHeading] = useState('Thank You for Choosing Agency Solutions!');
  const [welcomeMessage, setWelcomeMessage] = useState(
    'We are absolutely thrilled to partner with you on this journey. Our team is fully dedicated to transforming your vision into an exceptional digital reality with top-tier quality and precision.'
  );

  // Next Steps Checklist
  const [nextSteps, setNextSteps] = useState([
    { task: 'Complete initial kickoff questionnaire or alignment call.', status: 'Pending' },
    { task: 'Provide necessary brand assets, logos, and server/domain access.', status: 'Pending' },
    { task: 'Review and sign the official project scope & timeline.', status: 'Completed' }
  ]);

  // Required Access Items
  const [assetsList, setAssetsList] = useState([
    'High-resolution vector logos (SVG/PNG format)',
    'Brand guidelines, color palette codes, and typography preferences',
    'Hosting credentials, domain registrar access (if applicable)'
  ]);

  // Communication Channels
  const [channels, setChannels] = useState([
    { platform: 'Primary Email', detail: 'contact@meertech.com / Direct Thread' },
    { platform: 'Project Dashboard / CRM', detail: 'Agency Solutions CRM Portal' },
    { platform: 'Emergency / Urgent Updates', detail: 'Scheduled WhatsApp / Slack Channel' }
  ]);

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  // Next Steps Handlers
  const handleStepChange = (index, field, value) => {
    const updated = [...nextSteps];
    updated[index][field] = value;
    setNextSteps(updated);
  };
  const addStep = () => setNextSteps([...nextSteps, { task: '', status: 'Pending' }]);
  const removeStep = (index) => setNextSteps(nextSteps.filter((_, i) => i !== index));

  // Assets Handlers
  const addAsset = () => setAssetsList([...assetsList, '']);
  const removeAsset = (index) => setAssetsList(assetsList.filter((_, i) => i !== index));

  // Channels Handlers
  const handleChannelChange = (index, field, value) => {
    const updated = [...channels];
    updated[index][field] = value;
    setChannels(updated);
  };
  const addChannel = () => setChannels([...channels, { platform: '', detail: '' }]);
  const removeChannel = (index) => setChannels(channels.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Welcome-Onboarding-${documentId || 'AgencySolutions'}.pdf`,
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
            <IconDownload size={18} /> Download Welcome Kit PDF
          </button>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Preferences</h3>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Onboarding ID / Reference</label>
            <input 
              type="text"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-white font-bold"
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
                  <IconCloudUpload size={22} className="mx-auto mb-1 text-indigo-600" />
                  <span className="text-[10px] font-bold text-gray-600">+ Add Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Welcome Kit</h1>
              <input 
                type="text"
                value={onboardTitle}
                onChange={(e) => setOnboardTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-indigo-600 mt-1 border-b border-transparent focus:border-indigo-600 focus:outline-none bg-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Date: {date}</p>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">From (Agency)</label>
              <textarea 
                rows="3" 
                value={agencyInfo} 
                onChange={(e) => setAgencyInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">To (Valued Client)</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company Name, Email & Address..." 
                value={clientInfo} 
                onChange={(e) => setClientInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
          </div>

          {/* MID HERO THANK YOU & WELCOME SECTION */}
          <div className="bg-linear-to-br from-indigo-50 via-indigo-50/30 to-white p-6 sm:p-8 rounded-3xl border border-indigo-100 text-center space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-4 right-4 text-indigo-600/20">
              <IconSparkles size={64} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <IconSparkles size={14} /> Official Onboarding
            </div>
            <input 
              type="text"
              value={welcomeHeading}
              onChange={(e) => setWelcomeHeading(e.target.value)}
              className="text-lg sm:text-2xl font-black text-indigo-900 w-full text-center focus:outline-none bg-transparent tracking-tight"
            />
            <textarea 
              rows="3"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full max-w-2xl mx-auto text-xs sm:text-sm font-medium text-gray-700 bg-transparent text-center resize-none focus:outline-none"
            />
          </div>

          {/* 1. Getting Started & Next Steps */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec1} 
                onChange={(e) => setHeadings({...headings, sec1: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addStep} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Step
              </button>
            </div>

            <div className="space-y-2">
              {nextSteps.map((step, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-9 flex items-center gap-2">
                    <span className="text-indigo-600"><IconCheck size={16} /></span>
                    <input 
                      type="text" 
                      value={step.task} 
                      onChange={(e) => handleStepChange(index, 'task', e.target.value)}
                      placeholder="Action step description..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-2">
                    <select 
                      value={step.status} 
                      onChange={(e) => handleStepChange(index, 'status', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-indigo-700"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-span-1 text-center">
                    {nextSteps.length > 1 && (
                      <button onClick={() => removeStep(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Required Assets & Access */}
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec2} 
                onChange={(e) => setHeadings({...headings, sec2: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addAsset} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Asset
              </button>
            </div>
            <div className="space-y-2">
              {assetsList.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50/40 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-indigo-600">•</span>
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => {
                      const updated = [...assetsList];
                      updated[index] = e.target.value;
                      setAssetsList(updated);
                    }}
                    className="w-full text-xs font-medium bg-transparent focus:outline-none text-gray-700"
                  />
                  {assetsList.length > 1 && (
                    <button onClick={() => removeAsset(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                      <IconTrash size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Communication Channels */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <input 
                type="text" 
                value={headings.sec3} 
                onChange={(e) => setHeadings({...headings, sec3: e.target.value})}
                className="text-sm font-black uppercase tracking-wider text-indigo-700 w-full focus:outline-none bg-transparent"
              />
              <button onClick={addChannel} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap ml-2">
                <IconPlus size={14} /> Add Channel
              </button>
            </div>

            <div className="space-y-2">
              {channels.map((ch, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      value={ch.platform} 
                      onChange={(e) => handleChannelChange(index, 'platform', e.target.value)}
                      placeholder="Platform name..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-7">
                    <input 
                      type="text" 
                      value={ch.detail} 
                      onChange={(e) => handleChannelChange(index, 'detail', e.target.value)}
                      placeholder="Details / Link..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white text-gray-700"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {channels.length > 1 && (
                      <button onClick={() => removeChannel(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sign-off Panel */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Agency Solutions Team:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Authorized Signature</div>
            </div>
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Client Acknowledgment:</p>
              <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Received & Confirmed</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}