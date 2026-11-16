// src/pages/PublicProfile.jsx
import { useState } from 'react';
import { 
  IconWorld, IconCopy, IconCheck, IconExternalLink, IconStar, 
  IconMapPin, IconPhone, IconMail, IconCode 
} from '@tabler/icons-react';

export default function PublicProfile() {
  const [copied, setCopied] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // editor or preview

  // Public Profile Info State
  const [profile, setProfile] = useState({
    headline: 'Full-Stack Developer & Mobile Apps Specialist',
    about: 'Building high-performance web applications, modern mobile apps, and scalable digital solutions for growing businesses.',
    location: 'Karachi, Pakistan',
    phone: '',
    email: 'mahimrana219@gmail.com',
    website: ''
  });

  const publicUrl = 'app.meerwork.com/mahim-rana-s';
  const embedCode = `<div id="meerwork-badge"></div>\n<script src="https://app.meerwork.com/api/badge.js?slug=mahim-rana-s" async></script>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${publicUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(embedCode);
    setBadgeCopied(true);
    setTimeout(() => setBadgeCopied(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Public profile settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Header Section -- */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
            <IconWorld size={14} /> Public Profile
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Your public page on Agency Solutions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            The reviews your clients left, plus whatever you want prospects to know about your agency or professional services.
          </p>
        </div>

        {/* View Switcher / Tab */}
        <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'editor' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'preview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* -- Share Link Banner -- */}
      <div className="bg-linear-to-r from-indigo-900 to-gray-900 text-white p-6 rounded-3xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Your public page link</h4>
          <p className="text-xs text-gray-300 mt-0.5">Share it anywhere — anyone can open it, no login needed.</p>
          <p className="text-sm sm:text-base font-black text-white mt-2 font-mono bg-white/10 px-3 py-1 rounded-xl inline-block border border-white/10">
            {publicUrl}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-white/10 backdrop-blur-xs"
          >
            {copied ? <IconCheck size={16} className="text-indigo-400" /> : <IconCopy size={16} />} 
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <a 
            href={`https://${publicUrl}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
          >
            <IconExternalLink size={16} /> Open Page
          </a>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <>
          {/* -- Edit Form -- */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Page Information</h3>
              <p className="text-xs text-gray-500 mt-0.5">Everything here is shown publicly on your page. Leave a field empty to hide it.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Headline</label>
                <input 
                  type="text" 
                  value={profile.headline}
                  onChange={(e) => setProfile({...profile, headline: e.target.value})}
                  placeholder="What you do (e.g. Full-Stack Developer)"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-700">About</label>
                  <span className="text-[11px] text-gray-400">{profile.about.length}/4000</span>
                </div>
                <textarea 
                  rows="4"
                  maxLength="4000"
                  value={profile.about}
                  onChange={(e) => setProfile({...profile, about: e.target.value})}
                  placeholder="Tell prospects about your experience and services..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Location</label>
                  <div className="relative">
                    <IconMapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      placeholder="City, Country"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Public Phone</label>
                  <div className="relative">
                    <IconPhone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Public Email</label>
                  <div className="relative">
                    <IconMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      placeholder="hello@yourdomain.com"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Website</label>
                  <div className="relative">
                    <IconWorld size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 italic">
                Note: Your agency name and logo come from <span className="font-bold text-gray-700">Settings → Organization</span>.
              </p>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button 
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>

          {/* -- Reviews & Badge Section -- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Reviews Rating Breakdown Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900">0.0</span>
                <div className="flex text-indigo-400">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} size={16} className="fill-gray-200 text-gray-200" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">0 reviews</p>

              <div className="space-y-2 pt-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-10 font-bold text-gray-600">{star}-star</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-indigo-400 h-full w-0"></div>
                    </div>
                    <span className="w-8 text-right text-gray-400">0%</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                Reviews are written by your clients through their portal. They can't be edited, hidden or reordered.
              </p>
            </div>

            {/* Reviews Badge Embed Code Card */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-black text-gray-900">Reviews Badge</h3>
                  <button 
                    onClick={handleCopyBadge}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition-colors cursor-pointer"
                  >
                    {badgeCopied ? <IconCheck size={14} className="text-indigo-600" /> : <IconCode size={14} />}
                    {badgeCopied ? 'Copied Code!' : 'Copy Embed Code'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Paste this anywhere on your website to show your live rating, collected from verified clients through Agency Solutions.
                </p>

                {/* Live Preview Box */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Live preview</p>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex text-indigo-400">
                        {[...Array(5)].map((_, i) => (<IconStar key={i} size={12} className="fill-indigo-400" />))}
                      </div>
                      <span className="text-xs font-black text-gray-800">5.0 / 5.0 Rating</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Agency Solutions Verified</span>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div>
                <pre className="p-3 bg-gray-900 text-gray-200 rounded-2xl text-[11px] font-mono overflow-x-auto">
                  {embedCode}
                </pre>
              </div>
            </div>

          </div>
        </>
      ) : (
        /* -- Live Preview Mode -- */
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm space-y-8 animate-scaleUp">
          <div className="text-center space-y-3 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto shadow-md">
              MR
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Mahim Rana</h1>
            <p className="text-sm font-bold text-indigo-600">{profile.headline}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{profile.about}</p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
              {profile.location && <span className="flex items-center gap-1"><IconMapPin size={14} /> {profile.location}</span>}
              {profile.email && <span className="flex items-center gap-1"><IconMail size={14} /> {profile.email}</span>}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center space-y-4">
            <h3 className="text-base font-black text-gray-900">Verified Client Reviews (0)</h3>
            <div className="p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-400 font-medium">No reviews published yet. Complete projects to collect feedback!</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}