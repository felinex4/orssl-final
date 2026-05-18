import React from 'react';
import { Shield, User, Users, Cpu, Calendar, MapPin, CheckCircle } from 'lucide-react';

export default function Admin() {
  // Council matrix data structured into the 3 constitutional tiers
  const councilTiers = [
    {
      title: "Executive Officers",
      description: "Primary administrative and financial custody officials of the society.",
      roles: [
        { position: "President", name: "Prof. Wasantha Daundasekara", status: "Active" },
        { position: "Vice-President", name: "Vacant", status: "Elections Pending" },
        { position: "General Secretary", name: "Dr. Tharindu Dewasurendra", status: "Active" },
        { position: "Treasurer", name: "Vacant", status: "Elections Pending" }
      ]
    },
    {
      title: "Operational & Technical Council",
      description: "Heads of digital infrastructure, publications, and administrative support pipelines.",
      roles: [
        { position: "Webmaster & Head of Digital Infrastructure", name: "Vacant (Appointed)", status: "Active" },
        { position: "Assistant Secretary", name: "Vacant", status: "Elections Pending" },
        { position: "Assistant Treasurer", name: "Vacant", status: "Elections Pending" },
        { position: "Editor & Publications Chair", name: "Vacant", status: "Elections Pending" }
      ]
    },
    {
      title: "General Committee Members",
      description: "Five operational seats managing event logistics and community engagement.",
      roles: [
        { position: "General Committee Member 1", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member 2", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member 3", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member (Student Representative)", name: "Vacant", status: "Reserved for Student" },
        { position: "General Committee Member (Student Representative)", name: "Vacant", status: "Reserved for Student" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#041124] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center sm:text-left mb-12 border-b border-slate-100/10 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-[#00a8e8] bg-clip-text text-transparent">
            Governance & Council
          </h1>
          <p className="mt-3 text-lg text-slate-400 max-w-3xl">
            Official structural chart of the Executive Committee of the Operations Research Society of Sri Lanka.
          </p>
          
          {/* Constitutional Meta Framework Badges */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start text-xs font-semibold">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-100/10 px-3 py-2 rounded-xl">
              <Calendar className="w-4 h-4 text-[#00a8e8]" />
              <span>Tenure: <span className="text-white">2 Calendar Years (Jan 1 – Dec 31)</span></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-100/10 px-3 py-2 rounded-xl">
              <MapPin className="w-4 h-4 text-[#00a8e8]" />
              <span>HQ: <span className="text-white">Department of Mathematics, UoP</span></span>
            </div>
          </div>
        </div>

        {/* Dynamic Tier Rendering Engine */}
        <div className="space-y-12">
          {councilTiers.map((tier, index) => (
            <div key={index} className="bg-white/[0.02] border border-slate-100/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-1">
                  <Shield className="w-5 h-5 text-[#00a8e8]" />
                  <h2 className="text-2xl font-bold text-white tracking-tight">{tier.title}</h2>
                </div>
                <p className="text-sm text-slate-400">{tier.description}</p>
              </div>

              {/* Grid Matrix Setup for Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tier.roles.map((role, rIndex) => (
                  <div 
                    key={rIndex} 
                    className="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between shadow-sm hover:border-[#00a8e8]/20 transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-[#00a8e8]/5 transition-colors">
                        <User className="w-4 h-4 text-slate-500 group-hover:text-[#00a8e8]" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {role.position}
                        </span>
                        <span className="block text-base font-bold text-slate-900 mt-0.5 truncate">
                          {role.name}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      role.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : role.status === 'Reserved for Student'
                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {role.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legally Bound Institutional Footnote */}
        <div className="mt-12 p-5 bg-blue-500/5 border border-[#00a8e8]/20 rounded-2xl flex items-start gap-3 max-w-4xl mx-auto">
          <CheckCircle className="w-5 h-5 text-[#00a8e8] mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200 block mb-1">Constitutional Continuity Mandate (Item 7 & 9):</span>
            As a registered academic professional body, all senior executive candidacies remain bound to university faculty validation parameters. To preserve balanced organizational integration, a minimum structural floor of <span className="text-white font-semibold">two (2) General Committee seats</span> remains permanently reserved for active, verified Student Members.
          </div>
        </div>

      </div>
    </div>
  );
}