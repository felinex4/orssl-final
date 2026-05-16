import React from 'react';
import { Users, Shield, Mail, Award, Calendar, Landmark } from 'lucide-react';

export default function Admin() {
  // Official Executive Council Layout structured exactly like ORSNZ
  const council = [
    { role: "President", name: "Prof. Wasantha Daundasekara", email: "president@orssl.org.lk", status: "Active", term: "2025 - 2026" },
    { role: "Vice President", name: "To Be Elected (AGM Slot)", email: "vicepresident@orssl.org.lk", status: "Vacant", term: "1 Year Term" },
    { role: "Secretary", name: "Dr. Tharindu Dewasurendra", email: "secretary@orssl.org.lk", status: "Active", term: "2025 - 2026" },
    { role: "Treasurer", name: "Pending Appointment", email: "treasurer@orssl.org.lk", status: "Review", term: "1 Year Term" },
    { role: "Council (APORS/IFORS Representative)", name: "Senior Faculty Representative", email: "liaison@orssl.org.lk", status: "Active", term: "Permanent" },
    { role: "Council (Communications)", name: "Kalpa Dilhara", email: "media@orssl.org.lk", status: "Active", term: "2026 - 2027" },
    { role: "Council (WebMaster)", name: "Operations Research Society Board", email: "webmaster@orssl.org.lk", status: "Active", term: "System Assigned" }
  ];

  return (
    <div className="flex-grow bg-[#f8fafc] text-slate-900 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Block */}
        <div>
          <p className="text-[#00a8e8] font-bold text-sm tracking-wider uppercase">Governance</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">Society Council & Officers</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            The constitution determines that our Council consists of members including a President, Vice-President, Secretary, and a Treasurer elected annually.
          </p>
        </div>

        {/* Council Officers Registry Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00a8e8]" />
            <h3 className="font-bold text-slate-800">Current Council Members (Nov 2025 – Dec 2026)</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Position / Role</th>
                  <th className="px-6 py-3.5">Officer Name</th>
                  <th className="px-6 py-3.5">Official Email Address</th>
                  <th className="px-6 py-3.5">Term of Office</th>
                  <th className="px-6 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {council.map((officer, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{officer.role}</td>
                    <td className="px-6 py-4 text-slate-700">{officer.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 hover:text-[#00a8e8] cursor-pointer">
                      {officer.email}
                    </td>
                    <td className="px-6 py-4 text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {officer.term}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        officer.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        officer.status === 'Vacant' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {officer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-[#00a8e8] rounded-xl"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered Voter Density</p>
              <h4 className="text-2xl font-black text-slate-900 mt-1">240 Active</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl"><Landmark className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Affiliated Bodies Status</p>
              <h4 className="text-2xl font-black text-slate-900 mt-1">IFORS & APORS</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><Award className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next AGM Schedule</p>
              <h4 className="text-xl font-bold text-slate-900 mt-1">December 2026</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}