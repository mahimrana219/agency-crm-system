import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconFileText 
} from '@tabler/icons-react';

export default function Quotation() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [clientInfo, setClientInfo] = useState('');
  const [documentId, setDocumentId] = useState('QUO-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState('');
  
  const [currency, setCurrency] = useState('$');
  const [quotationTitle, setQuotationsTitle] = useState('Official Price Quotation & Cost Estimate');

  // Quotation Items Builder
  const [quoteItems, setQuoteItems] = useState([
    { title: 'Custom React & Vite Frontend Setup', description: 'Responsive components and tailwind styling', qty: 1, rate: 600 },
    { title: 'UI/UX Design & Wireframing', description: 'Figma assets and brand identity alignment', qty: 1, rate: 400 }
  ]);

  // Notes & Terms
  const [notes, setNotes] = useState('Thank you for your inquiry. This quotation outlines the estimated pricing for the requested services.');
  const [terms, setTerms] = useState('1. Quotation validity: 15 days from issue date.\n2. Payment terms: 50% advance before project commencement.');

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...quoteItems];
    updated[index][field] = value;
    setQuoteItems(updated);
  };

  const addItem = () => setQuoteItems([...quoteItems, { title: '', description: '', qty: 1, rate: 0 }]);
  const removeItem = (index) => setQuoteItems(quoteItems.filter((_, i) => i !== index));

  const subtotal = quoteItems.reduce((acc, item) => acc + (Number(item.qty) * Number(item.rate)), 0);

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Quotation-${documentId || 'AgencySolutions'}.pdf`,
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
            <IconDownload size={18} /> Download Quotation PDF
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
              <label className="text-xs font-semibold text-gray-700 block mb-1">Quotation ID</label>
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Price Quotation</h1>
              <input 
                type="text"
                value={quotationTitle}
                onChange={(e) => setQuotationsTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-indigo-600 mt-1 border-b border-transparent focus:border-indigo-600 focus:outline-none bg-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">ID: {documentId}</p>
            </div>
          </div>

          {/* Parties Involved */}
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

          {/* Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">Quotation Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border border-gray-200 rounded-lg bg-white font-medium" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">Valid Until</span>
              <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="p-2 border border-gray-200 rounded-lg bg-white font-medium" />
            </div>
          </div>

          {/* Items Table Builder */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Quotation Items & Pricing</label>
              <button onClick={addItem} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <IconPlus size={14} /> Add Item
              </button>
            </div>

            <div className="space-y-2">
              {quoteItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      placeholder="Item title..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Description..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white text-gray-700"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.qty} 
                      onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                      placeholder="Qty" 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold text-center bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.rate} 
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      placeholder="Rate" 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold text-center bg-white text-indigo-600"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {quoteItems.length > 1 && (
                      <button onClick={() => removeItem(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 text-sm font-bold text-gray-800">
              Total Amount: <span className="text-indigo-600 ml-2">{currency}{subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 text-sm">
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Notes / Remarks</label>
              <textarea rows="3" value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Terms & Conditions</label>
              <textarea rows="3" value={terms} onChange={(e)=>setTerms(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
            </div>
          </div>

          {/* Sign-off Panel */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-12 text-xs">
            <div className="space-y-6">
              <p className="font-bold text-gray-600">Authorized Signature (Agency Solutions):</p>
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