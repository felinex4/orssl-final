import React from 'react';
import { Sparkles, ChevronRight, Beaker, Factory, Users } from 'lucide-react';

export default function Home({ setCurrentTab }) {
  return (
    <div className="flex-grow flex flex-col w-full">
      
      {/* 1. HERO SECTION (Navy & Cyan) */}
      <div className="bg-[#041124] text-white relative overflow-hidden flex flex-col py-24 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00a8e8] rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full relative z-10">
          <div className="max-w-3xl space-y-6 flex flex-col items-center">
            
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00a8e8]/30 text-[#00a8e8] text-xs font-medium bg-[#00a8e8]/10">
              <Sparkles className="w-3 h-3" /> Formulated for IFORS & APORS Compliance
            </span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-2xl">
              Operations Research Society of Sri Lanka
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Bridging mathematical optimization, data analytics, and industrial excellence on a national stage.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <button onClick={() => setCurrentTab('directory')} className="bg-[#00a8e8] hover:bg-[#0090c7] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                Explore Directory <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentTab('register')} className="bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Join the Society
              </button>
            </div>
          </div>

          {/* Stats Bottom Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 border-t border-white/10 pt-8 w-full max-w-4xl mx-auto">
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">240+</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Active Profiles</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">35</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Industry Partners</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">12</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Universities</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">6</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Official Tiers</p></div>
          </div>
        </div>
      </div>

      {/* 2. ABOUT SECTION */}
      <div className="bg-[#f8fafc] text-slate-900 py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00a8e8] font-bold text-sm tracking-wider uppercase mb-4">About ORSSL</p>
          <h2 className="text-4xl font-bold text-[#041124] mb-8 leading-tight">
            From a university foundation to a national scientific body.
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              ORSSL operates as a registered national organization, structured in strict compliance with the global governance standards of the <strong className="text-[#041124]">International Federation of Operational Research Societies (IFORS)</strong> and the Asia-Pacific regional body <strong className="text-[#041124]">APORS</strong>.
            </p>
            <p>
              Our mission is twofold: empower the next generation of Sri Lankan students with applied optimization skills, and provide industries — from apparel and logistics to banking and energy — with the analytical expertise required to compete globally.
            </p>
          </div>
        </div>
      </div>

      {/* 3. THREE PILLARS SECTION (Minimalist Cyan Accents) */}
      <div className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#041124] mb-16">Three Pillars of ORSSL</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-[#00a8e8]/30 transition-colors">
              <Beaker className="w-8 h-8 text-[#00a8e8] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#041124] mb-3">Scientific Advancement</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maintain high research standards, curate a public repository, and publish indexed Sri Lankan OR scholarship.
              </p>
            </div>

            <div className="border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-[#00a8e8]/30 transition-colors">
              <Factory className="w-8 h-8 text-[#00a8e8] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#041124] mb-3">Industrial Optimization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Apply linear programming, stochastic modeling and simulation to logistics, supply-chain, energy and financial challenges.
              </p>
            </div>

            <div className="border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-[#00a8e8]/30 transition-colors">
              <Users className="w-8 h-8 text-[#00a8e8] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#041124] mb-3">Professional Ecosystem</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Run mentorship pipelines connecting students to senior practitioners, and open direct career pathways into top employers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CONSTITUTIONAL MEMBERSHIP SECTION (Clean Typography with Brand Colors) */}
      <div className="bg-[#f8fafc] py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 border-b border-slate-200 pb-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#041124] mb-4">Official Classifications</h2>
            <p className="text-slate-600 text-base">
              The society is composed of six distinct constitutional tiers. Admission is granted via executive verification to ensure academic and industrial integrity.
            </p>
          </div>

          {/* Subtle Cyan Top Border for each item to match the theme cleanly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            
            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Ordinary Member</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For academics in OR and active corporate analysts. Includes full voting privileges and executive candidacy.
              </p>
            </div>

            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Life Member</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lifelong participation secured via authorized package. Retains all governance and voting rights of Ordinary members.
              </p>
            </div>

            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Associate Member</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For industry enthusiasts with a verified interest in optimization. Eligible for technical council seats.
              </p>
            </div>

            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Student Member</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Subsidized access for active undergrad and postgrad students. Eligible for assistant council positions.
              </p>
            </div>

            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Corporate Member</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For commercial firms and government agencies. Allows two official reps and access to the student recruitment directory.
              </p>
            </div>

            <div className="border-t-2 border-[#00a8e8] pt-5">
              <h3 className="text-lg font-bold text-[#041124] mb-2">Honorary Fellow</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The highest tier of recognition, exclusively conferred by the EC to distinguished pioneers in the field.
              </p>
            </div>

          </div>
          
          {/* Branded Call to Action */}
          <div className="mt-16">
            <button onClick={() => setCurrentTab('register')} className="bg-[#00a8e8] hover:bg-[#0090c7] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm">
              Apply for Membership
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}