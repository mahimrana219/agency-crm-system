import { useState } from 'react';
import { IconCalendar, IconCheck, IconEye, IconDeviceFloppy, IconTable, IconUserPlus, IconX, IconChevronDown } from '@tabler/icons-react';

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('sheet'); // 'sheet' or 'results'
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for active popup menu
  const [activePopup, setActivePopup] = useState(null); // format: "rowId-memberName"

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Hanzala Nisar', role: 'Scrapper / Lead Gen' },
    { name: 'Mahim Rana', role: 'Full Stack Developer' },
    { name: 'Raheen Riaz', role: 'Front Seller' },
    { name: 'Rafay Riaz', role: 'Head' },
  ]);

  // August 2026 Sheet (Filled for past/current days, empty for upcoming days)
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, date: '01-Aug-2026', day: 'Saturday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 2, date: '02-Aug-2026', day: 'Sunday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 3, date: '03-Aug-2026', day: 'Monday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': 'Temporary Leave', 'Mahim Rana': 'Present', 'Raheen Riaz': 'Present', 'Rafay Riaz': 'Present' },
    { id: 4, date: '04-Aug-2026', day: 'Tuesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': 'Temporary Leave', 'Mahim Rana': 'Present', 'Raheen Riaz': 'Present', 'Rafay Riaz': 'Present' },
    { id: 5, date: '05-Aug-2026', day: 'Wednesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': 'Temporary Leave', 'Mahim Rana': 'WFH', 'Raheen Riaz': 'Present', 'Rafay Riaz': 'Present' },
    { id: 6, date: '06-Aug-2026', day: 'Thursday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': 'Temporary Leave', 'Mahim Rana': 'Present', 'Raheen Riaz': 'Present', 'Rafay Riaz': 'Present' },
    { id: 7, date: '07-Aug-2026', day: 'Friday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': 'Temporary Leave', 'Mahim Rana': 'Present', 'Raheen Riaz': 'Present', 'Rafay Riaz': 'Present' },
    { id: 8, date: '08-Aug-2026', day: 'Saturday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 9, date: '09-Aug-2026', day: 'Sunday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    // Upcoming days
    { id: 10, date: '10-Aug-2026', day: 'Monday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 11, date: '11-Aug-2026', day: 'Tuesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 12, date: '12-Aug-2026', day: 'Wednesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 13, date: '13-Aug-2026', day: 'Thursday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 14, date: '14-Aug-2026', day: 'Friday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 15, date: '15-Aug-2026', day: 'Saturday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 16, date: '16-Aug-2026', day: 'Sunday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 17, date: '17-Aug-2026', day: 'Monday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 18, date: '18-Aug-2026', day: 'Tuesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 19, date: '19-Aug-2026', day: 'Wednesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 20, date: '20-Aug-2026', day: 'Thursday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 21, date: '21-Aug-2026', day: 'Friday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 22, date: '22-Aug-2026', day: 'Saturday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 23, date: '23-Aug-2026', day: 'Sunday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 24, date: '24-Aug-2026', day: 'Monday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 25, date: '25-Aug-2026', day: 'Tuesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 26, date: '26-Aug-2026', day: 'Wednesday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 27, date: '27-Aug-2026', day: 'Thursday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 28, date: '28-Aug-2026', day: 'Friday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
    { id: 29, date: '29-Aug-2026', day: 'Saturday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 30, date: '30-Aug-2026', day: 'Sunday', timing: 'OFF', 'Hanzala Nisar': 'OFF', 'Mahim Rana': 'OFF', 'Raheen Riaz': 'OFF', 'Rafay Riaz': 'OFF' },
    { id: 31, date: '31-Aug-2026', day: 'Monday', timing: '9:00 PM - 5:00 AM', 'Hanzala Nisar': '', 'Mahim Rana': '', 'Raheen Riaz': '', 'Rafay Riaz': '' },
  ]);

  const handleStatusSelect = (rowId, memberName, status) => {
    const updated = attendanceData.map((row) => {
      if (row.id === rowId) {
        return { ...row, [memberName]: status };
      }
      return row;
    });
    setAttendanceData(updated);
    setActivePopup(null);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const name = newMemberName.trim();
    const role = newMemberRole.trim() || 'Team Member';

    setTeamMembers([...teamMembers, { name, role }]);

    const updatedRows = attendanceData.map(row => ({
      ...row,
      [name]: row.timing === 'OFF' ? 'OFF' : ''
    }));
    setAttendanceData(updatedRows);

    setNewMemberName('');
    setNewMemberRole('');
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <IconCalendar className="text-emerald-600" size={28} /> August Sheet - Attendance Schedule
          </h1>
          <p className="text-sm text-gray-500 mt-1">Click the checkbox box daily to select attendance status.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('sheet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sheet' ? 'bg-white text-emerald-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconTable size={16} /> Mark Sheet
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'results' ? 'bg-white text-emerald-600 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconEye size={16} /> See Results
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <IconUserPlus size={16} className="text-emerald-600" /> Add Member
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer"
          >
            <IconDeviceFloppy size={16} /> Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-semibold">
          <IconCheck size={18} /> Attendance data saved successfully!
        </div>
      )}

      {/* TAB 1: MARK ATTENDANCE SHEET */}
      {activeTab === 'sheet' && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-3 text-center rounded-l-xl w-12">#</th>
                <th className="py-3 px-3 w-32">Date</th>
                <th className="py-3 px-3 w-32">Day</th>
                <th className="py-3 px-3 w-40">Timing</th>
                {teamMembers.map((m) => (
                  <th key={m.name} className="py-3 px-3 text-center min-w-[180px]">
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-[10px] text-emerald-400 font-normal tracking-normal capitalize mt-0.5">{m.role}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {attendanceData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-gray-500">{row.id}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{row.date}</td>
                  <td className="py-3 px-3 text-gray-600">{row.day}</td>
                  <td className="py-3 px-3 text-xs font-mono text-gray-500">{row.timing}</td>

                  {teamMembers.map((m) => {
                    const status = row[m.name];
                    const isOff = status === 'OFF';
                    const popupKey = `${row.id}-${m.name}`;
                    const isPopupOpen = activePopup === popupKey;

                    return (
                      <td key={m.name} className="py-3 px-3 text-center relative">
                        {isOff ? (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-400 font-bold text-xs rounded-lg">OFF</span>
                        ) : (
                          <div>
                            {/* Checkbox box button which opens the status dropdown */}
                            <button
                              onClick={() => setActivePopup(isPopupOpen ? null : popupKey)}
                              className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                                status === 'Present'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  : status === 'Absent' || status === 'Sandwich'
                                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                  : status === 'WFH'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                  : status === 'Temporary Leave' || status === 'Half Day'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                  : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={Boolean(status)}
                                  readOnly
                                  className="w-4 h-4 accent-emerald-600 rounded-sm pointer-events-none"
                                />
                                <span>{status || 'Mark...'}</span>
                              </div>
                              <IconChevronDown size={14} />
                            </button>

                            {/* Popup Status Options Menu */}
                            {isPopupOpen && (
                              <div className="absolute z-40 left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 space-y-1 text-left animate-fade-in">
                                {['Present', 'Absent', 'WFH', 'Temporary Leave', 'Half Day', 'Sandwich'].map((opt) => (
                                  <button
                                    key={opt}
                                    onClick={() => handleStatusSelect(row.id, m.name, opt)}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                                      status === opt ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                                <button
                                  onClick={() => handleStatusSelect(row.id, m.name, '')}
                                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border-t border-gray-100 mt-1"
                                >
                                  Clear / Unmark
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: SEE RESULTS SUMMARY */}
      {activeTab === 'results' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {teamMembers.map((m) => {
            const memberRows = attendanceData.map(r => r[m.name]);
            const presentCount = memberRows.filter(s => s === 'Present').length;
            const absentCount = memberRows.filter(s => s === 'Absent' || s === 'Sandwich').length;
            const wfhCount = memberRows.filter(s => s === 'WFH').length;

            return (
              <div key={m.name} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-base">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{m.name}</h3>
                    <p className="text-xs text-emerald-600 font-medium">{m.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 block">Present</span>
                    <span className="text-lg font-extrabold text-emerald-700">{presentCount}</span>
                  </div>

                  <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-rose-600 block">Absent</span>
                    <span className="text-lg font-extrabold text-rose-700">{absentCount}</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-blue-600 block">WFH</span>
                    <span className="text-lg font-extrabold text-blue-700">{wfhCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Add New Team Member</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Member Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ali Khan" 
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Role / Designation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Backend Developer" 
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-emerald-600 bg-gray-50/30" 
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer"
                >
                  Add to Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}