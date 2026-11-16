// src/pages/Meetings.jsx
import { useState } from 'react';
import { 
  IconCalendar, IconVideo, IconPlus, IconChevronLeft, 
  IconChevronRight, IconClock, IconList, IconCalendarWeek, IconCalendarMonth,
  IconX, IconUser, IconLink, IconEdit, IconTrash, IconAlertCircle 
} from '@tabler/icons-react';

export default function Meetings() {
  const [view, setView] = useState('week'); // 'agenda' | 'week' | 'month'
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [reschedulingId, setReschedulingId] = useState(null);

  // New/Edit Meeting Form State
  const [meetingData, setMeetingData] = useState({
    title: '',
    client: '',
    date: '',
    time: '',
    meetLink: ''
  });

  // Postpone / Unavailable Comment State
  const [rescheduleData, setRescheduleData] = useState({
    newTime: '',
    comment: ''
  });

  // Dummy data for Agenda view
  const [agendaMeetings, setAgendaMeetings] = useState([
    { id: 1, title: 'Discovery Call with Client', date: 'Jul 30, 2026', time: '10:00 AM - 10:30 AM', client: 'Zahid Dental Clinic', status: 'Scheduled', comment: '' },
    { id: 2, title: 'Project Sprint Review', date: 'Jul 31, 2026', time: '02:00 PM - 03:00 PM', client: 'Dr. Mehak Fatima', status: 'Scheduled', comment: '' },
  ]);

  // Handle Create or Update Meeting
  const handleSaveMeeting = (e) => {
    e.preventDefault();
    if (editingId) {
      setAgendaMeetings(agendaMeetings.map(m => m.id === editingId ? {
        ...m,
        title: meetingData.title,
        client: meetingData.client,
        date: meetingData.date,
        time: meetingData.time
      } : m));
      setEditingId(null);
    } else {
      const newEntry = {
        id: Date.now(),
        title: meetingData.title,
        client: meetingData.client || 'General Client',
        date: meetingData.date,
        time: meetingData.time || '10:00 AM',
        status: 'Scheduled',
        comment: ''
      };
      setAgendaMeetings([newEntry, ...agendaMeetings]);
    }
    setShowScheduleModal(false);
    setMeetingData({ title: '', client: '', date: '', time: '', meetLink: '' });
  };

  // Open Edit Modal
  const handleEditClick = (meeting) => {
    setEditingId(meeting.id);
    setMeetingData({
      title: meeting.title,
      client: meeting.client,
      date: meeting.date,
      time: meeting.time,
      meetLink: ''
    });
    setShowScheduleModal(true);
  };

  // Delete Meeting
  const handleDelete = (id) => {
    setAgendaMeetings(agendaMeetings.filter(m => m.id !== id));
  };

  // Save Postpone / Unavailable status with comment
  const handleSaveReschedule = (e) => {
    e.preventDefault();
    setAgendaMeetings(agendaMeetings.map(m => m.id === reschedulingId ? {
      ...m,
      status: 'Postponed / Unavailable',
      time: rescheduleData.newTime ? rescheduleData.newTime : m.time,
      comment: rescheduleData.comment
    } : m));
    setShowRescheduleModal(false);
    setReschedulingId(null);
    setRescheduleData({ newTime: '', comment: '' });
  };

  // Dummy data for Month view days
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
      
      {/* -- Header Section -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Meetings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Your schedule in America/Los Angeles</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher Tabs (Agenda | Week | Month) */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200">
            <button
              onClick={() => setView('agenda')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                view === 'agenda' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <IconList size={14} /> Agenda
            </button>
            <button
              onClick={() => setView('week')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                view === 'week' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <IconCalendarWeek size={14} /> Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                view === 'month' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <IconCalendarMonth size={14} /> Month
            </button>
          </div>

          <button 
            onClick={() => {
              setEditingId(null);
              setMeetingData({ title: '', client: '', date: '', time: '', meetLink: '' });
              setShowScheduleModal(true);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95"
          >
            <IconPlus size={16} /> Schedule
          </button>
        </div>
      </div>

      {/* -- Pro Feature Banner -- */}
      <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl mt-0.5">
            <IconVideo size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Google Meet links & calendar sync are a Pro feature</h4>
            <p className="text-xs text-gray-600 mt-0.5">Meetings still work with a manual link — connect to auto-generate Google Meet links and see your whole schedule.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold rounded-xl border border-gray-200 shadow-2xs transition-all self-start sm:self-auto cursor-pointer">
          Upgrade
        </button>
      </div>

      {/* Date Navigator Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <h2 className="text-sm sm:text-base font-black text-gray-900">
          {view === 'month' ? 'July 2026' : view === 'week' ? '26 Jul – 1 Aug 2026' : 'Upcoming Agenda'}
        </h2>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition-all cursor-pointer">
            Today
          </button>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button className="p-1.5 bg-white hover:bg-gray-50 text-gray-600 border-r border-gray-200 cursor-pointer">
              <IconChevronLeft size={16} />
            </button>
            <button className="p-1.5 bg-white hover:bg-gray-50 text-gray-600 cursor-pointer">
              <IconChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC VIEW SECTIONS ================= */}

      {/* 1. AGENDA VIEW */}
      {view === 'agenda' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-gray-900 border-b border-gray-100 pb-3">Scheduled Agenda Items & Management</h3>
          {agendaMeetings.length > 0 ? (
            <div className="space-y-3">
              {agendaMeetings.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">{item.client}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-emerald-100/70 text-emerald-900 border border-emerald-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><IconClock size={13} /> {item.time} ({item.date})</p>
                    {item.comment && (
                      <p className="text-xs text-emerald-900 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/50 mt-1">
                        <strong>Reason / Comment:</strong> {item.comment}
                      </p>
                    )}
                  </div>

                  {/* Actions (Edit, Postpone/Unavailable, Delete) */}
                  <div className="flex items-center gap-2 self-end md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-200 w-full md:w-auto justify-end">
                    <button 
                      onClick={() => {
                        setReschedulingId(item.id);
                        setRescheduleData({ newTime: item.time, comment: item.comment || '' });
                        setShowRescheduleModal(true);
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-all cursor-pointer flex items-center gap-1"
                      title="Postpone or mark unavailable with comment"
                    >
                      <IconAlertCircle size={14} /> Postpone
                    </button>
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="p-2 bg-white hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-200 transition-all cursor-pointer"
                      title="Edit Meeting"
                    >
                      <IconEdit size={15} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-all cursor-pointer"
                      title="Delete Meeting"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs font-medium">No agenda meetings found.</div>
          )}
        </div>
      )}

      {/* 2. WEEK VIEW */}
      {view === 'week' && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
          <div className="grid grid-cols-8 border-b border-gray-100 bg-gray-50/70 text-center">
            <div className="py-3 text-[11px] font-bold text-gray-400 border-r border-gray-100">TIME</div>
            {['SUN 26', 'MON 27', 'TUE 28', 'WED 29', 'THU 30', 'FRI 31', 'SAT 1'].map((day, idx) => (
              <div key={idx} className={`py-3 text-xs font-black ${day.includes('29') ? 'text-emerald-600 bg-emerald-50/50' : 'text-gray-700'} border-r border-gray-100 last:border-r-0`}>
                {day}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time, idx) => (
              <div key={idx} className="grid grid-cols-8 min-h-64px">
                <div className="p-3 text-[11px] font-bold text-gray-400 border-r border-gray-100 flex items-start justify-center bg-gray-50/30">
                  {time}
                </div>
                {[...Array(7)].map((_, cIdx) => (
                  <div key={cIdx} className="border-r border-gray-100 last:border-r-0 hover:bg-emerald-50/20 transition-colors cursor-pointer p-2"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MONTH VIEW */}
      {view === 'month' && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs p-4">
          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <span key={i} className="text-xs font-bold text-gray-400 py-2">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day) => (
              <div 
                key={day} 
                className={`min-h-90px p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  day === 30 ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-black' : 'bg-gray-50/40 border-gray-100 hover:border-emerald-200 text-gray-700'
                }`}
              >
                <span className="text-xs font-bold">{day}</span>
                {day === 30 && (
                  <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-md truncate">1 Meeting</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SCHEDULE / EDIT MEETING MODAL ================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-scaleUp">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">
                  {editingId ? 'Edit Meeting Details' : 'Schedule New Meeting'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Enter meeting details and schedule time</p>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMeeting} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Meeting Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Discovery Call / Project Sync"
                  value={meetingData.title}
                  onChange={(e) => setMeetingData({...meetingData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Client / Vendor Name *</label>
                <div className="relative">
                  <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Zahid Dental Clinic"
                    value={meetingData.client}
                    onChange={(e) => setMeetingData({...meetingData, client: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Date *</label>
                  <div className="relative">
                    <IconCalendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jul 30, 2026"
                      value={meetingData.date}
                      onChange={(e) => setMeetingData({...meetingData, date: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Time Slot *</label>
                  <div className="relative">
                    <IconClock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 10:00 AM - 10:30 AM"
                      value={meetingData.time}
                      onChange={(e) => setMeetingData({...meetingData, time: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Manual Meeting Link (Google Meet / Zoom)</label>
                <div className="relative">
                  <IconLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="url" 
                    placeholder="https://meet.google.com/abc-xyz"
                    value={meetingData.meetLink}
                    onChange={(e) => setMeetingData({...meetingData, meetLink: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-colors cursor-pointer"
                >
                  {editingId ? 'Update Meeting' : 'Schedule Meeting'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= POSTPONE / UNAVAILABLE MODAL WITH COMMENT ================= */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Postpone / Unavailable</h3>
                <p className="text-xs text-gray-500 mt-0.5">Leave a comment and optional new time</p>
              </div>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveReschedule} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">New Proposed Time (Optional)</label>
                <div className="relative">
                  <IconClock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Tomorrow at 3:00 PM"
                    value={rescheduleData.newTime}
                    onChange={(e) => setRescheduleData({...rescheduleData, newTime: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Comment / Reason for Unavailability *</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="e.g. Busy with client project delivery, need to postpone this meeting."
                  value={rescheduleData.comment}
                  onChange={(e) => setRescheduleData({...rescheduleData, comment: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Save Comment & Postpone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
} 