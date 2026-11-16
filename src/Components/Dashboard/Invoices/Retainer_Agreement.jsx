import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconBriefcase 
} from '@tabler/icons-react';

export default function Retainer_Agreement() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('RET-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [currency, setCurrency] = useState('$');
  const [agreementTitle, setAgreementTitle] = useState('Monthly Development & Maintenance Retainer');

  // Retainer Terms & Services
  const [retainerClauses, setRetainerClauses] = useState([
    { title: '1. Monthly Retainer Scope', description: 'Dedicated monthly hours allocated for ongoing React/Vite development, bug fixes, UI/UX updates, and maintenance.' },
    { title: '2. Monthly Retainer Fee', description: 'The Client agrees to pay a fixed recurring monthly fee billed in advance on the 1st of every month.' },
    { title: '3. Rollover & Overtime Hours', description: 'Unused hours do not roll over to the next month. Additional hours exceeding the retainer limit will be billed at an agreed hourly rate.' },
    { title: '4. Termination Policy', description: 'Either party may terminate this retainer agreement with a 30-day written notice prior to the next billing cycle.' }
  ]);

  // Section Toggles
  const [toggles, setToggles] = useState({
    clauses: true,
    billingTerms: true,
    signatures: true
  });

  const [monthlyFee, setMonthlyFee] = useState(1200);
  const [monthlyHours, setMonthlyHours] = useState(30);
  const [hourlyOvertimeRate, setHourlyOvertimeRate] = useState(50);

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleClauseChange = (index, field, value) => {
    const newClauses = [...retainerClauses];
    newClauses[index][field] = value;
    setRetainerClauses(newClauses);
  };

  const addClause = () => setRetainerClauses([...retainerClauses, { title: `${retainerClauses.length + 1}. New Clause`, description: 'Enter retainer clause details here...' }]);
  const removeClause = (index) => setRetainerClauses(retainerClauses.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Retainer-Agreement-${documentId || 'AgencySolutions'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleSaveToBackend = async () => {
    const retainerData = {
      documentId,
      agreementTitle,
      currency,
      agencyInfo,
      clientInfo,
      monthlyFee,
      monthlyHours,
      hourlyOvertimeRate,
      retainerClauses
    };

    console.log("Saving Retainer Agreement Data to Backend:", retainerData);
    alert("Retainer Agreement document data ready for backend API!");
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900 font-sans caret-indigo-600">
      
      {/* TOP SECTION: CONTROLS, ACTIONS & PREFERENCES */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Actions Box */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <IconBriefcase size={16} /> Actions
          </h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download Retainer PDF
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
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Agreement Heading</label>
            <input 
              type="text"
              value={agreementTitle}
              onChange={(e) => setAgreementTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 bg-white font-medium text-gray-800"
            />
          </div>
        </div>

        {/* Section Toggles */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Document Sections</h3>
          
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium pt-1">
            <input 
              type="checkbox" 
              checked={toggles.clauses} 
              onChange={(e) => setToggles({...toggles, clauses: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Retainer Clauses
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.billingTerms} 
              onChange={(e) => setToggles({...toggles, billingTerms: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Billing & Hours Grid
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.signatures} 
              onChange={(e) => setToggles({...toggles, signatures: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Sign-off Block
          </label>
        </div>

      </div>

      {/* BOTTOM SECTION: LIVE PREVIEW & EDITABLE RETAINER DOCUMENT */}
      <div className="w-full bg-white p-6 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Retainer Agreement Preview</h2>
          <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">Recurring Contract</span>
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Retainer Agreement</h1>
              <p className="text-xs font-bold text-indigo-600 mt-1">{agreementTitle}</p>
              <div className="flex items-center sm:justify-end gap-2 mt-2">
                <span className="text-xs font-bold text-gray-400">RET ID:</span>
                <input 
                  type="text" 
                  value={documentId} 
                  onChange={(e) => setDocumentId(e.target.value)} 
                  className="w-32 sm:text-right border-b border-gray-200 focus:border-indigo-600 focus:outline-none font-bold text-sm text-gray-900 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Parties Involved Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Service Provider (Agency)</label>
              <textarea 
                rows="3" 
                value={agencyInfo} 
                onChange={(e) => setAgencyInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Client (Recipient)</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company Name, Email & Legal Address..." 
                value={clientInfo} 
                onChange={(e) => setClientInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
          </div>

          {/* Date & Retainer Billing Grid */}
          {toggles.billingTerms && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-xs">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-500">Effective Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border border-gray-200 rounded-lg bg-white font-medium" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-500">Monthly Retainer Fee</span>
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-2">
                  <span className="text-gray-400 font-bold">{currency}</span>
                  <input type="number" value={monthlyFee} onChange={(e) => setMonthlyFee(e.target.value)} className="w-full p-2 bg-transparent font-bold focus:outline-none text-indigo-600" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-500">Included Hours / Mo</span>
                <input type="number" value={monthlyHours} onChange={(e) => setMonthlyHours(e.target.value)} className="p-2 bg-white border border-gray-200 rounded-lg font-bold focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-500">Overtime Rate (/hr)</span>
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-2">
                  <span className="text-gray-400 font-bold">{currency}</span>
                  <input type="number" value={hourlyOvertimeRate} onChange={(e) => setHourlyOvertimeRate(e.target.value)} className="w-full p-2 bg-transparent font-bold focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* Retainer Clauses Builder */}
          {toggles.clauses && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Retainer Terms & Conditions</label>
                <button onClick={addClause} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                  <IconPlus size={14} /> Add Clause
                </button>
              </div>

              <div className="space-y-4">
                {retainerClauses.map((clause, index) => (
                  <div key={index} className="bg-gray-50/40 p-4 rounded-2xl border border-gray-100 space-y-2 relative">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={clause.title} 
                        onChange={(e) => handleClauseChange(index, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900"
                      />
                      {retainerClauses.length > 1 && (
                        <button onClick={() => removeClause(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer p-1">
                          <IconTrash size={16} />
                        </button>
                      )}
                    </div>
                    <textarea 
                      rows="2"
                      value={clause.description} 
                      onChange={(e) => handleClauseChange(index, 'description', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium bg-white text-gray-700 resize-none focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signatures Panel */}
          {toggles.signatures && (
            <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
              <div className="space-y-6">
                <p className="font-bold text-gray-600">Agency Representative Signature:</p>
                <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Agency Solutions Authorized Signature & Date</div>
              </div>
              <div className="space-y-6">
                <p className="font-bold text-gray-600">Client Signature:</p>
                <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Client Signature & Date</div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}