// src/pages/TeamManagement.jsx
import { useState } from 'react';
import { 
  IconPlus, IconUser, IconMail, IconShield, 
  IconCalendar, IconTrash, IconX, IconCheck 
} from '@tabler/icons-react';

export default function Team() {
  // Initial Team Members Data (using profile context)
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Mahim Rana',
      email: 'mahimrana219@gmail.com',
      role: 'Owner',
      joined: '12/07/2026',
      isUser: true
    }
  ]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Developer' // Developer, Sales, Designer
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const memberEntry = {
      id: Date.now(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      joined: new Date().toLocaleDateString(),
      isUser: false
    };

    setMembers([...members, memberEntry]);
    setShowModal(false);
    setNewMember({ name: '', email: '', role: 'Developer' });
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div className="w-full px-0 sm:px-2 pb-12">
      
      {/* Page Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Team Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your agency team members and their roles</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <IconPlus size={16} /> Add Team Member
        </button>
      </div>

      {/* Team Members Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/60 transition-colors">
                    
                    {/* Member Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{member.name}</span>
                          {member.isUser && (
                            <span className="ml-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                              (You)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-gray-600 font-medium">
                      {member.email}
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        member.role === 'Owner' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                          : member.role === 'Developer'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : member.role === 'Sales'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {member.role}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 text-gray-500 font-medium">
                      {member.joined}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {!member.isUser ? (
                        <button 
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Remove Member"
                        >
                          <IconTrash size={15} />
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-medium">-</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-400">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADD MEMBER MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Add Team Member</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Invite a new member to your agency CRM</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name *</label>
                <div className="relative">
                  <IconUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Usman Ali"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
                <div className="relative">
                  <IconMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. usman@example.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Assigned Role</label>
                <div className="relative">
                  <IconShield size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Sales">Sales</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-colors cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}