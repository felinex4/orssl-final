import React from 'react';
import { Shield, User, Users, Calendar, MapPin, CheckCircle, HelpCircle } from 'lucide-react';

export default function Admin() {
  // Council matrix data structured into the 3 constitutional tiers [cite: 63]
  const councilTiers = [
    {
      title: "Executive Officers",
      description: "Primary administrative and financial custody officials of the society[cite: 64].",
      roles: [
        { position: "President", name: "Prof. Wasantha Daundasekara", status: "Active" },
        { position: "Vice-President", name: "Vacant", status: "Elections Pending" },
        { position: "General Secretary", name: "Dr. Tharindu Dewasurendra", status: "Active" },
        { position: "Treasurer", name: "Vacant", status: "Elections Pending" }
      ]
    },
    {
      title: "Operational & Technical Council",
      description: "Heads of digital infrastructure, publications, and administrative support pipelines[cite: 69].",
      roles: [
        { position: "Webmaster & Head of Digital Infrastructure", name: "Vacant (Appointed)", status: "Active" },
        { position: "Assistant Secretary", name: "Vacant", status: "Elections Pending" },
        { position: "Assistant Treasurer", name: "Vacant", status: "Elections Pending" },
        { position: "Editor & Publications Chair", name: "Vacant", status: "Elections Pending" }
      ]
    },
    {
      title: "General Committee Members",
      description: "Operational seats managing event logistics and community engagement[cite: 74].",
      roles: [
        { position: "General Committee Member 1", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member 2", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member 3", name: "Vacant", status: "Elections Pending" },
        { position: "General Committee Member", name: "Vacant", status: "Reserved for Student" },
        { position: "General Committee Member", name: "Vacant", status: "Reserved for Student" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#041124] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Radial Glow Matching Home/Register Page Vibe */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00a8e8]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#00a8e8]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center sm:text-left mb-16 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-[#00a8e8] bg-clip-text text-transparent">
            Governance & Council
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Official structural chart of the Executive Committee of the Operations Research Society of Sri Lanka.
          </p>
          
          {/* Constitutional Meta Framework Badges */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start text-xs font-semibold">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-white/5 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-[#00a8e8]" />
              <span className="text-slate-400">Tenure: <span className="text-slate-200">2 Calendar Years (Jan 1 – Dec 31) [cite: 99, 100]</span></span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-white/5 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-[#00a8e8]" />
              <span className="text-slate-400">HQ: <span className="text-slate-200">Department of Mathematics, UoP [cite: 14]</span></span>
            </div>
          </div>
        </div>

        {/* Dynamic Tier Rendering Engine */}
        <div className="space-y-16">
          {councilTiers.map((tier, index) => (
            <div key={index} className="space-y-6">
              {/* Section Title */}
              <div className="border-l-2 border-[#00a8e8] pl-4">
                <div className="flex items-center gap-2.5 mb-1">
                  <Shield className="w-5 h-5 text-[#00a8e8]" />
                  <h2 className="text-xl font-bold text-white tracking-tight">{tier.title}</h2>
                </div>
                <p className="text-xs text-slate-400">{tier.description}</p>
              </div>

              {/* Grid Matrix Layout for Individual Officer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {tier.roles.map((role, rIndex) => (
                  <div 
                    key={rIndex} 
                    className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md hover:border-[#00a8e8]/30 transition-all group relative overflow-hidden"
                  >
                    {/* Top Section of Card */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl group-hover:bg-[#00a8e8]/10 group-hover:border-[#00a8e8]/20 transition-colors">
                          <User className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8]" />
                        </div>
                        
                        {/* Inline Status Badge */}
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          role.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : role.status === 'Reserved for Student'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {role.status === 'Reserved for Student' ? 'Student Slot' : role.status}
                        </span>
                      </div>

                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {role.position}
                      </span>
                      <span className="block text-base font-bold text-white mt-1.5 group-hover:text-[#00a8e8] transition-colors leading-tight">
                        {role.name}
                      </span>
                    </div>

                    {/* Subtle design element at bottom of cards if vacant */}
                    {role.name === 'Vacant' && (
                      <div className="mt-4 pt-3 border-t border-white/[0.03] flex items-center gap-1.5 text-[11px] text-slate-500">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Awaiting Session AGM</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legally Bound Institutional Footnote */}
        <div className="mt-16 p-5 bg-[#00a8e8]/5 border border-[#00a8e8]/20 rounded-2xl flex items-start gap-3 max-w-4xl mx-auto backdrop-blur-sm">
          <CheckCircle className="w-5 h-5 text-[#00a8e8] mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200 block mb-1">Constitutional Continuity Mandate (Item 7 & 9):</span>
            As a registered academic professional body, all senior executive candidacies remain bound to university faculty validation parameters[cite: 65, 67]. To preserve balanced organizational integration, a minimum structural floor of <span className="text-[#00a8e8] font-semibold">two (2) General Committee seats</span> remains permanently reserved for active, verified Student Members[cite: 75].
          </div>
        </div>

      </div>
    </div>
  );
}