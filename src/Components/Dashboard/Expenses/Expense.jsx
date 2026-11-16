import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconFileText, IconCash, IconReceipt 
} from '@tabler/icons-react';

export default function Expense() {
  const [logo, setLogo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState('Meer Tech Solution\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [documentId, setDocumentId] = useState('EXP-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState('$');
  
  const [expenseTitle, setExpenseTitle] = useState('Comprehensive Agency Expense Report');

  // A to Z Expense Items Builder
  const [expenses, setExpenses] = useState([
    { title: 'Vercel Cloud Hosting', category: 'Infrastructure', date: '2026-08-01', amount: 40 },
    { title: 'Figma Team License', category: 'Software', date: '2026-08-05', amount: 15 },
    { title: 'Google Workspace Domain', category: 'Operations', date: '2026-08-10', amount: 12 },
    { title: 'Facebook & Google Ads Marketing', category: 'Marketing', date: '2026-08-12', amount: 150 }
  ]);

  const documentRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleExpenseChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const addExpense = () => setExpenses([...expenses, { title: '', category: 'Operations', date: new Date().toISOString().split('T')[0], amount: 0 }]);
  const removeExpense = (index) => setExpenses(expenses.filter((_, i) => i !== index));

  const totalExpenses = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  const handleDownloadPDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 0.3,
      filename: `Expense-Report-${documentId || 'MeerTech'}.pdf`,
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
            <IconDownload size={18} /> Download Expense Report PDF
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
              <label className="text-xs font-semibold text-gray-700 block mb-1">Report ID</label>
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
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Expense Report</h1>
              <input 
                type="text"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="w-full sm:text-right text-xs font-bold text-emerald-600 mt-1 border-b border-transparent focus:border-emerald-600 focus:outline-none bg-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Generated Date: {date}</p>
            </div>
          </div>

          {/* Agency Info */}
          <div className="max-w-md text-sm">
            <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Issued By (Agency)</label>
            <textarea 
              rows="3" 
              value={agencyInfo} 
              onChange={(e) => setAgencyInfo(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-gray-50/50 resize-none font-medium text-gray-800"
            />
          </div>

          {/* Expenses Table Builder */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-1">
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <IconReceipt size={14} /> A to Z Agency Expenses
              </label>
              <button onClick={addExpense} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <IconPlus size={14} /> Add Expense
              </button>
            </div>

            <div className="space-y-2">
              {expenses.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50/40 p-3 rounded-xl border border-gray-100">
                  <div className="col-span-4">
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleExpenseChange(index, 'title', e.target.value)}
                      placeholder="Expense item (e.g. Server, Tool)..." 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-gray-900"
                    />
                  </div>
                  <div className="col-span-3">
                    <select 
                      value={item.category} 
                      onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white text-gray-700"
                    >
                      <option value="Software">Software</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Payroll">Payroll</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="date" 
                      value={item.date} 
                      onChange={(e) => handleExpenseChange(index, 'date', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium bg-white text-gray-700"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.amount} 
                      onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                      placeholder="Amount" 
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs font-bold text-center bg-white text-rose-600"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {expenses.length > 1 && (
                      <button onClick={() => removeExpense(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 text-sm font-bold text-gray-800 border-t border-gray-100">
              Total Expenses: <span className="text-rose-600 ml-2">{currency}{totalExpenses.toFixed(2)}</span>
            </div>
          </div>

          {/* Sign-off / Record Panel */}
          <div className="pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <p>Meer Tech Solution Financial Ledger</p>
            <p className="font-bold text-gray-700">Verified & Recorded</p>
          </div>

        </div>
      </div>

    </div>
  );
}