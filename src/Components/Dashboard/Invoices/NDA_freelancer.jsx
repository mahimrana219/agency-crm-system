import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconLock 
} from '@tabler/icons-react';

export default function NDA_freelancer() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('NDA-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [ndaTitle, setNdaTitle] = useState('Mutual Non-Disclosure & Confidentiality Agreement');

  // Custom NDA Clauses Builder
  const [clauses, setClauses] = useState([
    { title: '1. Definition of Confidential Information', description: 'All technical data, source code, design assets, business strategies, and project documents shared by the Client shall be considered confidential.' },
    { title: '2. Obligations of the Recipient', description: 'The Freelancer agrees to protect the confidentiality of all shared assets with the same degree of care used for their own confidential information, preventing unauthorized disclosure.' },
    { title: '3. Exclusions from Confidentiality', description: 'Confidential information does not include information that is publicly known, already in the possession of the recipient, or legally acquired from a third party.' },
    { title: '4. Term & Duration', description: 'The obligations of confidentiality shall survive the termination of this agreement and remain in full effect for a period of 3 years.' }
  ]);

  // Section Toggles
  const [toggles, setToggles] = useState({
    clauses: true,
    signatures: true
  });

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleClauseChange = (index, field, value) => {
    const newClauses = [...clauses];
    newClauses[index][field] = value;
    setClauses(newClauses);
  };

  const addClause = () => setClauses([...clauses, { title: `${clauses.length + 1}. New Custom Clause`, description: 'Enter clause details here...' }]);
  const removeClause = (index) => setClauses(clauses.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `NDA-Agreement-${documentId || 'AgencySolutions'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleSaveToBackend = async () => {
    const ndaData = {
      documentId,
      ndaTitle,
      agencyInfo,
      clientInfo,
      date,
      clauses
    };

    console.log("Saving NDA Agreement Data to Backend:", ndaData);
    alert("NDA Agreement document data ready for backend API!");
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900 font-sans caret-indigo-600">
      
      {/* TOP SECTION: CONTROLS, ACTIONS & PREFERENCES */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Actions Box */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <IconLock size={16} /> Actions
          </h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download NDA PDF
          </button>
          
          <button 
            onClick={handleSaveToBackend}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save NDA Record
          </button>
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
            Confidentiality Clauses Builder
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.signatures} 
              onChange={(e) => setToggles({...toggles, signatures: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Legal Sign-off Block
          </label>
        </div>

      </div>

      {/* BOTTOM SECTION: LIVE PREVIEW & EDITABLE NDA DOCUMENT */}
      <div className="w-full bg-white p-6 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Live NDA Agreement Preview</h2>
          <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">Confidentiality Document</span>
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Non-Disclosure Agreement</h1>
              <input 
                type="text"
                value={ndaTitle}
                onChange={(e) => setNdaTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-indigo-600 mt-1 border-b border-transparent focus:border-indigo-600 focus:outline-none bg-transparent"
              />
              <div className="flex items-center sm:justify-end gap-2 mt-2">
                <span className="text-xs font-bold text-gray-400">NDA ID:</span>
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
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Disclosing / Receiving Party (Agency)</label>
              <textarea 
                rows="3" 
                value={agencyInfo} 
                onChange={(e) => setAgencyInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Second Party (Client)</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company Name, Email & Legal Address..." 
                value={clientInfo} 
                onChange={(e) => setClientInfo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>
          </div>

          {/* Effective Date */}
          <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-xs flex items-center justify-between">
            <span className="font-semibold text-gray-500">Agreement Effective Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border border-gray-200 rounded-lg bg-white font-medium" />
          </div>

          {/* NDA Clauses Builder */}
          {toggles.clauses && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Confidentiality Clauses & Terms</label>
                <button onClick={addClause} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                  <IconPlus size={14} /> Add Custom Clause
                </button>
              </div>

              <div className="space-y-4">
                {clauses.map((clause, index) => (
                  <div key={index} className="bg-gray-50/40 p-4 rounded-2xl border border-gray-100 space-y-2 relative">
                    <div className="flex items-center justify-between gap-2">
                      <input 
                        type="text" 
                        value={clause.title} 
                        onChange={(e) => handleClauseChange(index, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900"
                      />
                      {clauses.length > 1 && (
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
                <p className="font-bold text-gray-600">Agency Solutions Representative:</p>
                <div className="border-b border-gray-400 pb-1 text-gray-400 italic">Authorized Signature & Date</div>
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
