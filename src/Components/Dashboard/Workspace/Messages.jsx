// src/pages/Messages.jsx
import { useState } from 'react';
import { 
  IconSearch, IconSend, IconPaperclip, IconMoodSmile, 
  IconPhone, IconVideo, IconDotsVertical, IconChecks, 
  IconUser, IconCalendar, IconBuilding, IconArrowLeft, IconPlus, IconX, IconMail
} from '@tabler/icons-react';

export default function Messages() {
  // Chats list data (Started clean with empty messages array or default setup)
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Dr. Zahid', 
      company: 'Zahid Dental Clinic', 
      avatar: 'ZD', 
      lastMessage: 'Tap to start conversation', 
      time: '10:45 AM', 
      unread: 0, 
      online: true,
      phone: '+92 300 1234567',
      email: 'zahid@dental.com',
      messages: []
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  // New Chat Form State
  const [newChatData, setNewChatData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  // Get current active chat object
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  // Handle Send Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          lastMessage: newMessage,
          time: timeNow,
          messages: [
            ...chat.messages,
            { id: Date.now(), sender: 'me', text: newMessage, time: timeNow }
          ]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
  };

  // Handle Add New Chat / User
  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!newChatData.name) return;

    const initials = newChatData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newChatEntry = {
      id: Date.now(),
      name: newChatData.name,
      company: newChatData.company || 'Independent',
      avatar: initials,
      lastMessage: 'New chat created',
      time: 'Just now',
      unread: 0,
      online: true,
      phone: newChatData.phone || '+92 300 0000000',
      email: newChatData.email || 'client@example.com',
      messages: []
    };

    setChats([newChatEntry, ...chats]);
    setActiveChatId(newChatEntry.id);
    setShowNewChatModal(false);
    setNewChatData({ name: '', company: '', email: '', phone: '' });
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-0 sm:px-2 pb-6">
      
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Messages</h1>
          <p className="text-xs text-gray-500 mt-0.5">Communicate directly with clients and team members</p>
        </div>
        <button
          onClick={() => setShowNewChatModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
        >
          <IconPlus size={16} /> New Chat
        </button>
      </div>

      {/* Main Container - Full Width without side gaps */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-720px max-h-800px w-full">
        
        {/* ================= LEFT SIDE: CHAT LIST ================= */}
        <div className={`lg:col-span-4 border-r border-gray-100 flex flex-col bg-gray-50/50 ${activeChatId ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Search Box */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats(chats.map(c => c.id === chat.id ? {...c, unread: 0} : c));
                  }}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                    activeChatId === chat.id ? 'bg-emerald-50/80 border-l-4 border-emerald-600 shadow-2xs' : 'hover:bg-gray-100/60 bg-white'
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-gray-900 truncate">{chat.name}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-medium truncate">{chat.company}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{chat.lastMessage}</p>
                  </div>

                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-emerald-600 text-white font-black text-[10px] rounded-full flex items-center justify-center shrink-0 shadow-xs">
                      {chat.unread}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-gray-400 text-xs">No chats found</div>
            )}
          </div>

        </div>

        {/* ================= MIDDLE: ACTIVE CHAT SCREEN ================= */}
        <div className={`lg:col-span-5 flex flex-col bg-white border-r border-gray-100 ${!activeChatId ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Chat Header */}
          <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveChatId(null)}
                className="lg:hidden p-1.5 -ml-1 text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                <IconArrowLeft size={18} />
              </button>

              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200">
                {activeChat.avatar}
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">{activeChat.name}</h3>
                <p className="text-[10px] text-emerald-600 font-bold">{activeChat.company} • {activeChat.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors cursor-pointer" title="Voice Call">
                <IconPhone size={16} />
              </button>
              <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors cursor-pointer" title="Video Meeting">
                <IconVideo size={16} />
              </button>
              <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors cursor-pointer">
                <IconDotsVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/20">
            {activeChat.messages && activeChat.messages.length > 0 ? (
              activeChat.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed shadow-2xs ${
                      isMe 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400 font-medium px-1">
                      <span>{msg.time}</span>
                      {isMe && <IconChecks size={14} className="text-emerald-600" />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-xs py-20">
                <p>No messages yet with {activeChat.name}.</p>
                <p className="text-[11px] text-emerald-600 mt-1">Send a message below to start chatting!</p>
              </div>
            )}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex items-center gap-2 shrink-0">
            <button type="button" className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer">
              <IconPaperclip size={18} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button type="button" className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer">
              <IconMoodSmile size={18} />
            </button>
            <button 
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
            >
              <IconSend size={16} />
            </button>
          </form>

        </div>

        {/* ================= RIGHT SIDE: CLIENT INFO PANEL ================= */}
        <div className="hidden lg:flex lg:col-span-3 flex-col bg-gray-50/50 p-4 space-y-4 overflow-y-auto">
          
          <div className="text-center pb-3 border-b border-gray-200/60">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-sm mb-2">
              {activeChat.avatar}
            </div>
            <h3 className="text-xs font-black text-gray-900">{activeChat.name}</h3>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5">{activeChat.company}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Contact Details</h4>
            <div className="p-3 bg-white rounded-xl border border-gray-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <IconPhone size={13} className="text-emerald-600 shrink-0" />
                <span className="font-medium">{activeChat.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 truncate">
                <IconUser size={13} className="text-emerald-600 shrink-0" />
                <span className="font-medium truncate">{activeChat.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <IconBuilding size={13} className="text-emerald-600 shrink-0" />
                <span className="font-medium">{activeChat.company}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Upcoming Meetings</h4>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                <IconCalendar size={12} /> Tomorrow, 10:00 AM
              </div>
              <p className="text-xs font-black text-gray-900">Discovery Call</p>
              <span className="inline-block text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold">Scheduled</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= NEW CHAT MODAL ================= */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Start New Chat</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Add client or member info to message them</p>
              </div>
              <button 
                onClick={() => setShowNewChatModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateChat} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Name / Person *</label>
                <div className="relative">
                  <IconUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Usman Ali"
                    value={newChatData.name}
                    onChange={(e) => setNewChatData({...newChatData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Company / Clinic Name</label>
                <div className="relative">
                  <IconBuilding size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Tech Solutions"
                    value={newChatData.company}
                    onChange={(e) => setNewChatData({...newChatData, company: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                <div className="relative">
                  <IconMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="e.g. client@example.com"
                    value={newChatData.email}
                    onChange={(e) => setNewChatData({...newChatData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <IconPhone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. +92 300 1234567"
                    value={newChatData.phone}
                    onChange={(e) => setNewChatData({...newChatData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowNewChatModal(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Create Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}