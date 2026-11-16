import { useState } from 'react';
import { 
  IconPlug, IconBrandWhatsapp, IconBrandStripe, 
  IconMail, IconCheck, IconDeviceFloppy, IconKey, IconLock 
} from '@tabler/icons-react';

export default function Integrations() {
  const [saved, setSaved] = useState(false);

  const [integrationsData, setIntegrationsData] = useState({
    whatsappEnabled: true,
    whatsappToken: 'YOUR_WHATSAPP_TOKEN',
    whatsappPhoneId: 'YOUR_PHONE_NUMBER_ID',

    stripeEnabled: true,
    stripePublicKey: 'pk_test_your_public_key',
    stripeSecretKey: 'sk_test_your_secret_key',

    smtpEnabled: false,
    smtpHost: 'smtp.mailtrap.io',
    smtpUser: '',
    smtpPass: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIntegrationsData({
      ...integrationsData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <IconPlug className="text-emerald-600" size={28} /> Integrations & API Keys
          </h1>
          <p className="text-sm text-gray-500 mt-1">Connect your CRM with third-party services like WhatsApp Meta API and Stripe.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold animate-fade-in">
            <IconCheck size={18} /> Integrations updated successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* 1. WHATSAPP CLOUD API */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                <IconBrandWhatsapp size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">WhatsApp Cloud API (Meta)</h3>
                <p className="text-xs text-gray-500">Automate client messaging, updates, and invoice alerts.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="whatsappEnabled"
                checked={integrationsData.whatsappEnabled}
                onChange={handleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {integrationsData.whatsappEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Temporary Access Token</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <IconKey size={16} />
                  </span>
                  <input 
                    type="password" 
                    name="whatsappToken" 
                    value={integrationsData.whatsappToken} 
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:outline-emerald-600 bg-gray-50/30" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">WhatsApp Phone Number ID</label>
                <input 
                  type="text" 
                  name="whatsappPhoneId" 
                  value={integrationsData.whatsappPhoneId} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>
            </div>
          )}
        </div>

        {/* 2. STRIPE PAYMENT GATEWAY */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <IconBrandStripe size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Stripe Payment Gateway</h3>
                <p className="text-xs text-gray-500">Accept global credit and debit card payments on client invoices.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="stripeEnabled"
                checked={integrationsData.stripeEnabled}
                onChange={handleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {integrationsData.stripeEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Stripe Publishable Key</label>
                <input 
                  type="text" 
                  name="stripePublicKey" 
                  value={integrationsData.stripePublicKey} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Stripe Secret Key</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <IconLock size={16} />
                  </span>
                  <input 
                    type="password" 
                    name="stripeSecretKey" 
                    value={integrationsData.stripeSecretKey} 
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:outline-emerald-600 bg-gray-50/30" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. SMTP EMAIL CONFIG */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                <IconMail size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Custom SMTP Mail Server</h3>
                <p className="text-xs text-gray-500">Send system emails and contract proposals through your own domain.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="smtpEnabled"
                checked={integrationsData.smtpEnabled}
                onChange={handleChange}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {integrationsData.smtpEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">SMTP Host</label>
                <input 
                  type="text" 
                  name="smtpHost" 
                  value={integrationsData.smtpHost} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">SMTP Username</label>
                <input 
                  type="text" 
                  name="smtpUser" 
                  value={integrationsData.smtpUser} 
                  onChange={handleChange}
                  placeholder="user@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">SMTP Password</label>
                <input 
                  type="password" 
                  name="smtpPass" 
                  value={integrationsData.smtpPass} 
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save Integration Keys
          </button>
        </div>

      </form>
    </div>
  );
}