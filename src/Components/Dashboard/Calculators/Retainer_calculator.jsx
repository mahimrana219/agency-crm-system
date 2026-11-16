import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconCalculator, IconDownload, IconCloudUpload, 
  IconFileText, IconClock, IconCurrencyDollar, IconShieldCheck, IconPlus, IconTrash 
} from '@tabler/icons-react';

export default function Retainer_calculator() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Meer Tech Solution\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [documentId, setDocumentId] = useState('RET-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState('$');

  // Calculator State
  const [monthlyHours, setMonthlyHours] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [discountPercent, setDiscountPercent] = useState(10); // Retainer discount incentive

  // Included Services Checklist
  const [services, setServices] = useState([
    'Weekly website maintenance & security audits',
    'Up to 5 minor UI/UX graphic design updates per month',
    'Priority bug fixes and technical support'
  ]);

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleServiceChange = (index, value) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);
  };

  const addService = () => setServices([...services, '']);
  const removeService = (index) => setServices(services.filter((_, i) => i !== index));

  // Calculations
  const hrs = Number(monthlyHours) || 0;
  const rate = Number(hourlyRate) || 0;
  const disc = Number(discountPercent) || 0;

  const standardMonthlyTotal = hrs * rate;
  const discountAmount = (standardMonthlyTotal * disc) / 100;
  const finalRetainerFee = standardMonthlyTotal - discountAmount;
  const effectiveHourlyRate = hrs > 0 ? finalRetainerFee / hrs : 0;

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Retainer-Calculator-${documentId || 'MeerTech'}.pdf`,
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
            <IconDownload size={18} /> Download Retainer Sheet PDF
          </button>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Preferences</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white font-medium"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Sheet ID</label>
              <input 
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white font-bold"
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
                  <IconCloudUpload size={22} className="mx-auto mb-1 text-emerald-600" />
                  <span className="text-[10px] font-bold text-gray-600">+ Add Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Monthly Retainer Calculator</h1>
              <p className="text-xs font-bold text-emerald-600 mt-1">Meer Tech Solution Partnership Plan</p>
              <p className="text-xs text-gray-400 mt-1">Date: {date}</p>
            </div>
          </div>

          {/* CALCULATOR CONTROLS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <IconClock size={16} className="text-emerald-600" /> Monthly Allocated Hours
              </label>
              <input 
                type="number"
                value={monthlyHours}
                onChange={(e) => setMonthlyHours(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <IconCurrencyDollar size={16} className="text-emerald-600" /> Standard Hourly Rate
              </label>
              <input 
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <IconShieldCheck size={16} className="text-emerald-600" /> Retainer Discount (%)
              </label>
              <input 
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

          </div>

          {/* INCLUDED SERVICES BUILDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Included Retainer Services</label>
              <button onClick={addService} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <IconPlus size={14} /> Add Service
              </button>
            </div>

            <div className="space-y-2">
              {services.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50/40 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-emerald-600">•</span>
                  <input 
                    type="text" 
                    value={item} 
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder="Service description..." 
                    className="w-full text-xs font-medium bg-transparent focus:outline-none text-gray-700"
                  />
                  {services.length > 1 && (
                    <button onClick={() => removeService(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                      <IconTrash size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RESULTS DISPLAY PANEL */}
          <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <IconCalculator size={18} /> Retainer Pricing Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Standard Value</p>
                <p className="text-2xl sm:text-3xl font-black text-white line-through opacity-70">{currency}{standardMonthlyTotal.toFixed(2)}</p>
              </div>

              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Effective Hourly Rate</p>
                <p className="text-2xl sm:text-3xl font-black text-white">{currency}{effectiveHourlyRate.toFixed(2)}<span className="text-xs text-gray-400 font-normal"> /hr</span></p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Final Monthly Retainer Fee</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{currency}{finalRetainerFee.toFixed(2)}<span className="text-xs text-gray-400 font-normal"> /mo</span></p>
              </div>
            </div>
          </div>

          {/* Sign-off / Footer */}
          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <p>Meer Tech Solution Retainer Agreement Tool</p>
            <p className="font-bold text-gray-700">Recurring Revenue Model</p>
          </div>

        </div>
      </div>

    </div>
  );
}