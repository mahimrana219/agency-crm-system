import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  IconPlus, IconTrash, IconDownload, 
  IconCloudUpload, IconDeviceFloppy, IconUserCheck 
} from '@tabler/icons-react';

export default function InvoiceCreate() {
  const [logo, setLogo] = useState(null);
  const [from, setFrom] = useState('Agency Solutions\nSoftware & Web Development Agency\ncontact@meertech.com');
  const [billTo, setBillTo] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [dueDate, setDueDate] = useState('');
  const [poNumber, setPoNumber] = useState('');
  
  const [currency, setCurrency] = useState('$');
  const [invoiceType, setInvoiceType] = useState('Invoice');
  const [toggles, setToggles] = useState({
    tax: true,
    discount: false,
    shipping: false,
    shipTo: false
  });

  const [taxRate, setTaxRate] = useState(10);
  const [discountVal, setDiscountVal] = useState(0);
  const [shippingVal, setShippingVal] = useState(0);
  const [shipToAddress, setShipToAddress] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [notes, setNotes] = useState('Thank you for your business with Agency Solutions.');
  const [terms, setTerms] = useState('Please pay within the stipulated payment terms.');

  const [items, setItems] = useState([
    { description: 'Full-Stack Web & Software Development', quantity: 1, rate: 500 }
  ]);

  // Saved Clients List for Quick Select / Auto-fill
  const [savedClients] = useState([
    { id: '1', name: 'TechCorp Solutions', details: 'TechCorp Solutions\n123 Silicon Valley, CA\nbilling@techcorp.com' },
    { id: '2', name: 'Alpha Marketing', details: 'Alpha Marketing\n456 Madison Ave, NY\naccounts@alphamkt.com' },
    { id: '3', name: 'Nexus Global', details: 'Nexus Global\n789 Business Rd, TX\nfinance@nexusglobal.io' }
  ]);

  const invoiceRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.rate)), 0);
  const taxAmount = toggles.tax ? (subtotal * taxRate) / 100 : 0;
  const discountAmount = toggles.discount ? Number(discountVal) : 0;
  const shippingAmount = toggles.shipping ? Number(shippingVal) : 0;
  const total = subtotal + taxAmount + shippingAmount - discountAmount;
  const balanceDue = total - Number(amountPaid);

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.3,
      filename: `${invoiceType}-${invoiceNumber || 'AgencySolutions'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleSaveToBackend = async () => {
    const invoiceData = {
      invoiceNumber,
      invoiceType,
      currency,
      from,
      billTo,
      shipToAddress: toggles.shipTo ? shipToAddress : null,
      date,
      dueDate,
      paymentTerms,
      poNumber,
      items,
      subtotal,
      taxAmount,
      discountAmount,
      shippingAmount,
      total,
      amountPaid,
      balanceDue,
      notes,
      terms
    };

    console.log("Saving to Backend:", invoiceData);
    alert("Invoice data ready for backend API!");
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 bg-gray-100 min-h-screen text-gray-900">
      
      {/* TOP SECTION: CONTROLS, ACTIONS & PREFERENCES */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Actions Box */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Actions</h3>
          <button 
            onClick={handleDownloadPDF}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <IconDownload size={18} /> Download PDF
          </button>
          
          <button 
            onClick={handleSaveToBackend}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white p-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save to Database
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
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Document Type</label>
            <select 
              value={invoiceType} 
              onChange={(e) => setInvoiceType(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-600 bg-white font-medium text-gray-800"
            >
              <option value="Invoice">Invoice</option>
              <option value="Quotation">Quotation</option>
              <option value="Receipt">Receipt</option>
              <option value="Bill">Bill</option>
            </select>
          </div>
        </div>

        {/* Dynamic Toggles */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Toggle Fields</h3>
          
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium pt-1">
            <input 
              type="checkbox" 
              checked={toggles.tax} 
              onChange={(e) => setToggles({...toggles, tax: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Tax Field
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.discount} 
              onChange={(e) => setToggles({...toggles, discount: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Discount Field
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.shipping} 
              onChange={(e) => setToggles({...toggles, shipping: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Shipping Field
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer font-medium">
            <input 
              type="checkbox" 
              checked={toggles.shipTo} 
              onChange={(e) => setToggles({...toggles, shipTo: e.target.checked})}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            Ship To Address
          </label>
        </div>

      </div>

      {/* QUICK SELECT CLIENT DROPDOWN BAR */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <IconUserCheck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Client Quick-Select</h4>
            <p className="text-xs text-gray-400">Choose a client to auto-fill their billing details</p>
          </div>
        </div>
        
        <select 
          onChange={(e) => {
            const selectedId = e.target.value;
            const found = savedClients.find(c => c.id === selectedId);
            if (found) {
              setBillTo(found.details);
            }
          }}
          className="w-full sm:w-72 p-2.5 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50 font-semibold text-gray-800 cursor-pointer"
        >
          <option value="">-- Choose from Directory --</option>
          {savedClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* BOTTOM SECTION: LIVE PREVIEW & EDITABLE INVOICE */}
      <div className="w-full bg-white p-6 sm:p-12 rounded-3xl border border-gray-200 shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Preview & Editor</h2>
          <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">Auto-Updating</span>
        </div>

        {/* Printable White Paper Preview Box */}
        <div ref={invoiceRef} className="bg-white text-gray-900 w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10 border-b border-gray-100 pb-8">
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
              <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">{invoiceType}</h1>
              <div className="flex items-center sm:justify-end gap-2 mt-2">
                <span className="text-xs font-bold text-gray-400">NO:</span>
                <input 
                  type="text" 
                  value={invoiceNumber} 
                  onChange={(e) => setInvoiceNumber(e.target.value)} 
                  className="w-32 sm:text-right border-b border-gray-200 focus:border-indigo-600 focus:outline-none font-bold text-sm text-gray-900 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* From & Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">From</label>
              <textarea 
                rows="3" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>

            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-1.5 border border-gray-200 rounded-lg text-xs w-36 bg-white" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Payment Terms</span>
                <input type="text" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="p-1.5 border border-gray-200 rounded-lg text-xs w-36 bg-white" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Due Date</span>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-1.5 border border-gray-200 rounded-lg text-xs w-36 bg-white" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">PO Number</span>
                <input type="text" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} className="p-1.5 border border-gray-200 rounded-lg text-xs w-36 bg-white" />
              </div>
            </div>
          </div>

          {/* Bill To & Ship To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-sm">
            <div>
              <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Bill To</label>
              <textarea 
                rows="3" 
                placeholder="Client Name, Company, Address..." 
                value={billTo} 
                onChange={(e) => setBillTo(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
              />
            </div>

            {toggles.shipTo && (
              <div>
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Ship To</label>
                <textarea 
                  rows="3" 
                  placeholder="Shipping destination address..." 
                  value={shipToAddress} 
                  onChange={(e) => setShipToAddress(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/50 resize-none font-medium text-gray-800"
                />
              </div>
            )}
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="bg-gray-900 text-white rounded-xl p-3.5 grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider gap-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="space-y-3 mt-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      placeholder="Service description..." 
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium text-gray-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium text-gray-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium text-gray-800"
                    />
                  </div>
                  <div className="col-span-2 text-right font-bold text-xs flex items-center justify-end gap-2 pr-1 text-gray-800">
                    {currency}{(Number(item.quantity) * Number(item.rate)).toFixed(2)}
                    {items.length > 1 && (
                      <button onClick={() => removeItem(index)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <IconTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addItem}
              className="mt-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <IconPlus size={16} /> Add Line Item
            </button>
          </div>

          {/* Notes & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100 text-sm">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Notes</label>
                <textarea rows="2" value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Terms & Conditions</label>
                <textarea rows="2" value={terms} onChange={(e)=>setTerms(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-gray-50/30 font-medium resize-none text-gray-800" />
              </div>
            </div>

            <div className="space-y-3 text-xs bg-gray-50/50 p-5 rounded-2xl border border-gray-100 text-gray-800">
              <div className="flex justify-between py-1 text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">{currency}{subtotal.toFixed(2)}</span>
              </div>

              {toggles.tax && (
                <div className="flex justify-between items-center py-1 text-gray-600">
                  <span className="flex items-center gap-2">Tax (%) <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-14 p-1 border rounded text-xs bg-white text-center font-medium" /></span>
                  <span className="font-bold">{currency}{taxAmount.toFixed(2)}</span>
                </div>
              )}

              {toggles.discount && (
                <div className="flex justify-between items-center py-1 text-gray-600">
                  <span>Discount</span>
                  <input type="number" value={discountVal} onChange={(e) => setDiscountVal(e.target.value)} className="w-20 p-1 border rounded text-xs text-right bg-white font-bold" />
                </div>
              )}

              {toggles.shipping && (
                <div className="flex justify-between items-center py-1 text-gray-600">
                  <span>Shipping</span>
                  <input type="number" value={shippingVal} onChange={(e) => setShippingVal(e.target.value)} className="w-20 p-1 border rounded text-xs text-right bg-white font-bold" />
                </div>
              )}

              <div className="flex justify-between py-3 border-t border-gray-200 text-base font-black text-gray-900">
                <span>Total</span>
                <span className="text-indigo-600">{currency}{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-t border-dashed border-gray-200">
                <span className="font-bold text-gray-500">Amount Paid</span>
                <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} className="w-24 p-1.5 border rounded-lg text-xs text-right font-bold bg-white" />
              </div>

              <div className="flex justify-between py-3 border-t border-gray-200 text-sm font-black text-indigo-800 bg-indigo-50 px-3 rounded-xl">
                <span>Balance Due</span>
                <span>{currency}{balanceDue.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}