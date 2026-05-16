import React from 'react';
import { Search, Building2, MapPin, Users } from 'lucide-react';

export default function Directory() {
  const members = [
    { id: 1, initials: "NP", name: "Dr. Nuwan Perera", role: "Lead Operations Analyst", company: "MAS Contourline", type: "Industry", loc: "Colombo", color: "bg-blue-500", mentor: true, skills: [{n: "Linear Programming", c: "bg-blue-100 text-blue-700"}, {n: "Supply Chain Optimization", c: "bg-purple-100 text-purple-700"}, {n: "Integer Programming", c: "bg-indigo-100 text-indigo-700"}] },
    { id: 2, initials: "IF", name: "Ishara Fernando", role: "Senior Data Scientist", company: "LSEG", type: "Industry", loc: "Colombo", color: "bg-purple-500", mentor: true, skills: [{n: "Machine Learning", c: "bg-rose-100 text-rose-700"}, {n: "Financial Analytics", c: "bg-orange-100 text-orange-700"}] },
    { id: 3, initials: "KJ", name: "Kasun Jayawardena", role: "Logistics Manager", company: "Brandix Apparel", type: "Industry", loc: "Colombo", color: "bg-orange-500", mentor: false, skills: [{n: "Supply Chain", c: "bg-purple-100 text-purple-700"}, {n: "Simulation", c: "bg-emerald-100 text-emerald-700"}] },
    { id: 4, initials: "TW", name: "Dr. Tharindu Wickramas...", role: "PhD Researcher", company: "University of Moratuwa", type: "Academia", loc: "Colombo", color: "bg-red-500", mentor: false, skills: [{n: "Integer Programming", c: "bg-indigo-100 text-indigo-700"}, {n: "Queuing Theory", c: "bg-cyan-100 text-cyan-700"}] },
    { id: 5, initials: "AS", name: "Prof. Anoma Silva", role: "Senior Lecturer", company: "University of Peradeniya", type: "Academia", loc: "Kandy", color: "bg-emerald-500", mentor: false, skills: [{n: "Simulation", c: "bg-emerald-100 text-emerald-700"}] },
    { id: 6, initials: "RG", name: "Ravindu Gunasekara", role: "Optimization Consultant", company: "John Keells Holdings", type: "Industry", loc: "Colombo", color: "bg-indigo-500", mentor: false, skills: [{n: "Linear Programming", c: "bg-blue-100 text-blue-700"}] }
  ];
  const skillFilters = ["Linear Programming", "Integer Programming", "Queuing Theory", "Machine Learning", "Simulation", "Supply Chain Optimization", "Stochastic Modeling", "Financial Analytics"];

  return (
    <div className="flex-grow bg-[#f8fafc] text-slate-900 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[#00a8e8] font-bold text-sm tracking-wider uppercase">Members</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">Alumni & Professional Directory</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">Filters</div>
              <div className="relative mb-5">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input type="text" placeholder="Search name or company..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#00a8e8]" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills</p>
              <div className="space-y-3">
                {skillFilters.map((skill, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] focus:ring-[#00a8e8]" />
                    <span className="text-sm text-slate-600">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{member.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{member.role}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <p className="text-xs text-slate-600 flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-slate-400" /> {member.company}</p>
                  <p className="text-xs text-slate-600 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {member.loc} · {member.type}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${skill.c}`}>{skill.n}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                    <Users className="w-4 h-4" /> Request Connection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}