import { useState } from 'react';
import { 
  IconCheck, IconShield, IconCrown, 
  IconCreditCard, IconSparkles 
} from '@tabler/icons-react';

export default function Billing() {
  const [currentPlan, setCurrentPlan] = useState('Free');

  const handleUpgrade = (planName) => {
    setCurrentPlan(planName);
  };

  return (
    <div className="w-full px-0 sm:px-2 pb-12">
      
      {/* Page Header */}
      <div className="mb-4 px-2">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Billing & Plans</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage your subscription and usage</p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-200 mt-0.5">
            <IconShield size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Current Plan</span>
              <h3 className="text-sm font-black text-gray-900">{currentPlan}</h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {currentPlan === 'Free' ? 'For trying things out' : `You are currently subscribed to the ${currentPlan} plan.`}
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-gray-400 self-start sm:self-auto">
          Upgrade anytime to grow your limits.
        </span>
      </div>

      {/* Usage Section */}
      <div className="mb-6 px-2">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">Usage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Clients</span>
              <span className="text-emerald-700 font-extrabold">0 of 5</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[0%]"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Projects</span>
              <span className="text-emerald-700 font-extrabold">0 of 10</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[0%]"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Team members</span>
              <span className="text-emerald-700 font-extrabold">0 of 0</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[0%]"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Storage</span>
              <span className="text-emerald-700 font-extrabold">0 MB of 100 MB</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full w-[0%]"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Plans Section */}
      <div className="mb-4 px-2">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Free Plan */}
          <div className={`bg-white p-6 rounded-2xl border flex flex-col justify-between transition-all ${
            currentPlan === 'Free' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-100 shadow-xs'
          }`}>
            <div>
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Free</p>
              <p className="text-xs text-gray-500 mt-0.5">For trying things out</p>
              <h2 className="text-2xl font-black text-gray-900 mt-3">Free</h2>

              <ul className="space-y-2.5 mt-5 text-xs font-medium text-gray-600">
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Up to 5 clients
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Up to 10 projects
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Meetings & reminders
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="w-15px text-center">✕</span> No team members
                </li>
              </ul>
            </div>

            <button
              disabled={currentPlan === 'Free'}
              className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPlan === 'Free' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              {currentPlan === 'Free' ? 'Current plan' : 'Downgrade'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`bg-white p-6 rounded-2xl border relative flex flex-col justify-between transition-all ${
            currentPlan === 'Pro' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-emerald-200 shadow-md'
          }`}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              Most popular
            </span>

            <div>
              <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Pro</p>
              <p className="text-xs text-gray-500 mt-0.5">For growing freelancers</p>
              <div className="flex items-baseline gap-1 mt-3">
                <h2 className="text-2xl font-black text-gray-900">₹199</h2>
                <span className="text-xs font-bold text-gray-400">/month</span>
              </div>

              <ul className="space-y-2.5 mt-5 text-xs font-medium text-gray-600">
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Up to 30 clients
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Up to 60 projects
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Up to 5 team members
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Project files & payments
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  <IconSparkles size={15} className="shrink-0" /> Everything In Free
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('Pro')}
              disabled={currentPlan === 'Pro'}
              className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-200 cursor-pointer ${
                currentPlan === 'Pro'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed shadow-none'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              {currentPlan === 'Pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Ultra Plan */}
          <div className={`bg-white p-6 rounded-2xl border flex flex-col justify-between transition-all ${
            currentPlan === 'Ultra' ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-100 shadow-xs'
          }`}>
            <div>
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Ultra</p>
              <p className="text-xs text-gray-500 mt-0.5">Best for agencies</p>
              <div className="flex items-baseline gap-1 mt-3">
                <h2 className="text-2xl font-black text-gray-900">₹799</h2>
                <span className="text-xs font-bold text-gray-400">/month</span>
              </div>

              <ul className="space-y-2.5 mt-5 text-xs font-medium text-gray-600">
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Unlimited clients
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Unlimited projects
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Unlimited team members
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck size={15} className="text-emerald-600 shrink-0" /> Priority support
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  <IconSparkles size={15} className="shrink-0" /> Everything in Pro
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('Ultra')}
              disabled={currentPlan === 'Ultra'}
              className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPlan === 'Ultra'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 active:scale-95'
              }`}
            >
              {currentPlan === 'Ultra' ? 'Current Plan' : 'Upgrade to Ultra'}
            </button>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center pt-4 text-[11px] text-gray-400 space-y-1 px-2">
        <p>Secure payments by Razorpay · Prices in INR, billed monthly</p>
        <p>Still have doubts about upgrading? <span className="text-emerald-700 font-bold hover:underline cursor-pointer">Contact the founder directly for a demo</span></p>
      </div>

    </div>
  );
}