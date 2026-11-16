import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconCalculator, IconDownload, IconCloudUpload, 
  IconFileText, IconPercentage, IconReceipt 
} from '@tabler/icons-react';

export default function TDS_calculator() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Meer Tech Solution\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [documentId, setDocumentId] = useState('TDS-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState('$');

  // Calculator State
  const [grossAmount, setGrossAmount] = useState(5000);
  const [tdsRate, setTdsRate] = useState(10); // default 10% TDS

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  // Calculations
  const numericGross = Number(grossAmount) || 0;
  const numericRate = Number(tdsRate) || 0;

  const tdsAmount = (numericGross * numericRate) / 100;
  const netPayable = numericGross - tdsAmount;

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `TDS-Calculation-${documentId || 'MeerTech'}.pdf`,
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
            <IconDownload size={18} /> Download TDS Report PDF
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">TDS Calculator</h1>
              <p className="text-xs font-bold text-emerald-600 mt-1">Meer Tech Solution Tax Withholding Tool</p>
              <p className="text-xs text-gray-400 mt-1">Date: {date}</p>
            </div>
          </div>

          {/* CALCULATOR CONTROLS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <IconReceipt size={16} className="text-emerald-600" /> Gross Amount / Invoice Value
              </label>
              <input 
                type="number"
                value={grossAmount}
                onChange={(e) => setGrossAmount(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <IconPercentage size={16} className="text-emerald-600" /> TDS Rate (%)
              </label>
              <input 
                type="number"
                value={tdsRate}
                onChange={(e) => setTdsRate(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

          </div>

          {/* RESULTS DISPLAY PANEL */}
          <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <IconCalculator size={18} /> TDS Deduction Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Gross Amount</p>
                <p className="text-2xl sm:text-3xl font-black text-white">{currency}{numericGross.toFixed(2)}</p>
              </div>

              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">TDS Deducted ({tdsRate}%)</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{currency}{tdsAmount.toFixed(2)}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Net Payable Amount</p>
                <p className="text-2xl sm:text-3xl font-black text-white">{currency}{netPayable.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Sign-off / Footer */}
          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <p>Meer Tech Solution Tax Calculator Tool</p>
            <p className="font-bold text-gray-700">Withholding Tax Verified</p>
          </div>

        </div>
      </div>

    </div>
  );
}