import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IconSettings, IconBell, IconShieldLock, 
  IconDeviceFloppy, IconCheck, IconPalette, 
  IconUser, IconPlug 
} from '@tabler/icons-react';

export default function Settings() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [settingsData, setSettingsData] = useState({
    appName: 'MeerWork CRM',
    currency: 'USD ($)',
    timezone: '(GMT+05:00) Karachi',
    brandColor: '#00E1FC',
    emailAlerts: true,
    whatsappAlerts: true,
    dailyReport: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData({
      ...settingsData,
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
      {/* Page Header with Profile & Integrations Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <IconSettings className="text-emerald-600" size={28} /> System Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Configure your workspace preferences, currency, and notifications.</p>
        </div>

        {/* Quick Navigation Buttons for Profile & Integrations */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <IconUser size={18} className="text-emerald-600" /> Profile Setup
          </button>

          <button 
            onClick={() => navigate('/integrations')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <IconPlug size={18} className="text-emerald-600" /> Integrations
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-semibold animate-fade-in">
          <IconCheck size={18} /> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General Preferences */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <IconPalette className="text-emerald-600" size={20} /> General Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Workspace Name</label>
              <input 
                type="text" 
                name="appName" 
                value={settingsData.appName} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Default Currency</label>
              <select 
                name="currency" 
                value={settingsData.currency} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30 cursor-pointer"
              >
                <option>USD ($)</option>
                <option>PKR (Rs)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Timezone</label>
              <select 
                name="timezone" 
                value={settingsData.timezone} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30 cursor-pointer"
              >
                <option>(GMT+05:00) Karachi</option>
                <option>(GMT+00:00) UTC</option>
                <option>(GMT-05:00) Eastern Time</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Theme Accent Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  name="brandColor" 
                  value={settingsData.brandColor} 
                  onChange={handleChange}
                  className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white" 
                />
                <input 
                  type="text" 
                  name="brandColor"
                  value={settingsData.brandColor} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono bg-gray-50/30" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <IconBell className="text-emerald-600" size={20} /> Notification Alerts
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <span className="text-sm font-bold text-gray-900 block">Email Alerts</span>
                <span className="text-xs text-gray-500">Receive notifications for new client messages and invoices.</span>
              </div>
              <input 
                type="checkbox" 
                name="emailAlerts"
                checked={settingsData.emailAlerts}
                onChange={handleChange}
                className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" 
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <span className="text-sm font-bold text-gray-900 block">WhatsApp Notifications</span>
                <span className="text-xs text-gray-500">Send automatic updates and payment alerts via WhatsApp.</span>
              </div>
              <input 
                type="checkbox" 
                name="whatsappAlerts"
                checked={settingsData.whatsappAlerts}
                onChange={handleChange}
                className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" 
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
              <div>
                <span className="text-sm font-bold text-gray-900 block">Daily Activity Report</span>
                <span className="text-xs text-gray-500">Get a daily summary of earnings, leads, and attendance.</span>
              </div>
              <input 
                type="checkbox" 
                name="dailyReport"
                checked={settingsData.dailyReport}
                onChange={handleChange}
                className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer" 
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={18} /> Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}