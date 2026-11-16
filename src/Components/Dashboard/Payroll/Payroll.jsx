import { useState } from 'react';
import { IconCash, IconCalculator, IconDeviceFloppy, IconCheck } from '@tabler/icons-react';

export default function Payroll({ teamMembers = [], attendanceData = [] }) {
  const [saved, setSaved] = useState(false);

  // Default team members & salaries data agar parent se na aaye
  const defaultTeam = [
    { name: 'Hanzala Nisar', role: 'Scrapper / Lead Gen', baseSalary: 45000 },
    { name: 'Mahim Rana', role: 'Full Stack Developer', baseSalary: 60000 },
    { name: 'Raheen Riaz', role: 'Front Seller', baseSalary: 40000 },
    { name: 'Rafay Riaz', role: 'Head', baseSalary: 75000 },
  ];

  const members = teamMembers.length > 0 ? teamMembers : defaultTeam;

  // Base salaries state
  const [salaries, setSalaries] = useState(
    members.reduce((acc, member) => {
      acc[member.name] = member.baseSalary || 50000;
      return acc;
    }, {})
  );

  const handleSalaryChange = (name, value) => {
    setSalaries({
      ...salaries,
      [name]: Number(value) || 0,
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 animate-fade-in">
      
      {/* Header with Calculator & Cash Icons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <IconCalculator size={22} />
            </div>
            August Payroll & Salary Calculation
          </h2>
          <p className="text-xs text-gray-500 mt-1">Fetched automatically from attendance records and base salaries.</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
        >
          <IconDeviceFloppy size={16} /> Save Payroll
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-3 rounded-2xl text-sm font-semibold">
          <IconCheck size={18} /> Payroll data updated successfully!
        </div>
      )}

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4 rounded-l-xl">Team Member</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Base Salary (PKR)</th>
              <th className="py-3 px-4 text-center">Presents / WFH</th>
              <th className="py-3 px-4 text-center">Absents / Leaves</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Net Payable (PKR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {members.map((m) => {
              // Attendance sheet se data fetch karna is member ke liye
              const memberRows = attendanceData.map(r => r[m.name]);
              const presentCount = memberRows.filter(s => s === 'Present' || s === 'WFH').length;
              const absentCount = memberRows.filter(s => s === 'Absent' || s === 'Sandwich').length;
              
              const currentBase = salaries[m.name] || m.baseSalary || 50000;
              const perDay = currentBase / 26; // 26 working days standard
              const calculatedSalary = Math.max(0, Math.round(currentBase - (absentCount * (perDay * 0.5))));

              return (
                <tr key={m.name} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-extrabold">
                      {m.name.charAt(0)}
                    </div>
                    {m.name}
                  </td>
                  
                  <td className="py-4 px-4 text-xs font-medium text-indigo-600">{m.role}</td>
                  
                  {/* Editable Base Salary Input */}
                  <td className="py-4 px-4 text-center">
                    <div className="relative inline-block">
                      <span className="absolute left-3 top-2 text-xs text-gray-400 font-bold">Rs.</span>
                      <input
                        type="number"
                        value={currentBase}
                        onChange={(e) => handleSalaryChange(m.name, e.target.value)}
                        className="w-36 pl-9 pr-3 py-1.5 text-center font-mono font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-indigo-600"
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200">
                      {presentCount} Days
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-200">
                      {absentCount} Days
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right font-mono font-extrabold text-indigo-700 text-base">
                    Rs. {calculatedSalary.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}