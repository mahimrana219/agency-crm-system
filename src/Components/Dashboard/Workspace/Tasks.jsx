// src/pages/Tasks.jsx
import { useState } from 'react';
import { 
  IconPlus, IconSearch, IconCalendar, IconFlag, 
  IconUser, IconCheck, IconTrash, IconX, IconBriefcase 
} from '@tabler/icons-react';

export default function Tasks() {
  // Role/Department tabs
  const roles = ['All Roles', 'Developer', 'Sales', 'Designer'];
  const [activeRole, setActiveRole] = useState('All Roles');

  // View Mode: 'team' or 'individual'
  const [viewMode, setViewMode] = useState('team'); 
  const [selectedMember, setSelectedMember] = useState('Dr. Zahid');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Tasks Data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Setup MERN stack backend API endpoints',
      role: 'Developer',
      assignee: 'Mahim Rana',
      priority: 'High',
      dueDate: '2026-07-30',
      status: 'In Progress', // To Do, In Progress, Completed
    },
    {
      id: 2,
      title: 'Design landing page wireframes for clinic',
      role: 'Designer',
      assignee: 'Dr. Zahid',
      priority: 'Medium',
      dueDate: '2026-08-02',
      status: 'To Do',
    },
    {
      id: 3,
      title: 'Client outreach & follow-up emails',
      role: 'Sales',
      assignee: 'Usman Ali',
      priority: 'Low',
      dueDate: '2026-07-31',
      status: 'Completed',
    }
  ]);

  // Form State for New Task
  const [newTask, setNewTask] = useState({
    title: '',
    role: 'Developer',
    assignee: 'Mahim Rana',
    priority: 'Medium',
    dueDate: '',
    status: 'To Do'
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    const taskEntry = {
      id: Date.now(),
      ...newTask
    };

    setTasks([taskEntry, ...tasks]);
    setShowCreateModal(false);
    setNewTask({
      title: '',
      role: 'Developer',
      assignee: 'Mahim Rana',
      priority: 'Medium',
      dueDate: '',
      status: 'To Do'
    });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatusToggle = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        let nextStatus = 'To Do';
        if (t.status === 'To Do') nextStatus = 'In Progress';
        else if (t.status === 'In Progress') nextStatus = 'Completed';
        else nextStatus = 'To Do';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Filter tasks based on Role, View Mode (Team vs Individual), and Search Query
  const filteredTasks = tasks.filter(task => {
    const matchesRole = activeRole === 'All Roles' || task.role === activeRole;
    const matchesView = viewMode === 'team' || task.assignee === selectedMember;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesView && matchesSearch;
  });

  return (
    <div className="w-full px-0 sm:px-2 pb-12">
      
      {/* Page Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Task Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Organize and track tasks across roles and members</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-all cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <IconPlus size={16} /> Create Task
        </button>
      </div>

      {/* Controls Bar: Role Tabs & View Switcher */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
        
        {/* Role Tabs (Developer, Sales, Designer) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeRole === role 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/60'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* View Mode Toggle (Team View vs Individual Checklist) */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('team')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'team' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All Team
            </button>
            <button
              onClick={() => setViewMode('individual')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'individual' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Single Person Checklist
            </button>
          </div>

          {viewMode === 'individual' && (
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="Mahim Rana">Mahim Rana</option>
              <option value="Dr. Zahid">Dr. Zahid</option>
              <option value="Usman Ali">Usman Ali</option>
            </select>
          )}
        </div>

      </div>

      {/* Search Bar */}
      <div className="mb-4 px-2">
        <div className="relative max-w-md">
          <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tasks or assignees..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Tasks List / Checklist Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            {viewMode === 'team' ? `${activeRole} Tasks` : `Checklist for ${selectedMember}`}
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            {filteredTasks.length} Tasks Found
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Checkbox & Title */}
                <div className="flex items-start gap-3">
                  <button 
                    onClick={() => handleStatusToggle(task.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-all ${
                      task.status === 'Completed' 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-gray-300 bg-white hover:border-emerald-500'
                    }`}
                    title="Toggle Status"
                  >
                    {task.status === 'Completed' && <IconCheck size={12} stroke={3} />}
                  </button>

                  <div>
                    <h4 className={`text-xs font-black text-gray-900 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        <IconBriefcase size={11} className="text-emerald-600" /> {task.role}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        <IconUser size={11} className="text-emerald-600" /> {task.assignee}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        <IconCalendar size={11} className="text-emerald-600" /> {task.dueDate || 'No Date'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Priority Badge, Status & Delete */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Priority Badge */}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    task.priority === 'High' 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : task.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {task.priority}
                  </span>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    task.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : task.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {task.status}
                  </span>

                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <IconTrash size={15} />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400 text-xs">
              No tasks found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* ================= CREATE TASK MODAL ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Create New Task</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Assign task to a role and team member</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Task Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Design dashboard UI"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Role / Department</label>
                  <select
                    value={newTask.role}
                    onChange={(e) => setNewTask({...newTask, role: e.target.value})}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Sales">Sales</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Assignee</label>
                  <select
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Mahim Rana">Mahim Rana</option>
                    <option value="Dr. Zahid">Dr. Zahid</option>
                    <option value="Usman Ali">Usman Ali</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Due Date</label>
                  <input 
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 transition-colors cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}