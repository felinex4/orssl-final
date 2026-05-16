import React from 'react';
import { Sparkles, ChevronRight, Beaker, Factory, Users, Check } from 'lucide-react';

export default function Home({ setCurrentTab }) {
  return (
    <div className="flex-grow flex flex-col w-full">
      
      {/* 1. HERO SECTION (Dark Navy - FIXED: Now fully center-aligned) */}
      <div className="bg-[#041124] text-white relative overflow-hidden flex flex-col py-24 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00a8e8] rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full">
          <div className="max-w-3xl space-y-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00a8e8]/30 text-[#00a8e8] text-xs font-medium bg-[#00a8e8]/10">
              <Sparkles className="w-3 h-3" /> IFORS · APORS affiliated
            </span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-2xl">
              Operations Research Society of Sri Lanka
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Bridging mathematical optimization, data analytics, and industrial excellence on a global stage.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <button onClick={() => setCurrentTab('directory')} className="bg-[#00a8e8] hover:bg-[#0090c7] text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 transition-colors">
                Explore Directory <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentTab('register')} className="bg-transparent border border-white/20 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Join the Society
              </button>
            </div>
          </div>

          {/* Stats Bottom Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 border-t border-white/10 pt-8 w-full max-w-4xl mx-auto">
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">240+</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Qualified Members</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">35</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Industry Partners</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">12</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Universities</p></div>
            <div><h3 className="text-3xl font-bold text-[#00a8e8]">IFORS</h3><p className="text-xs text-slate-400 tracking-wider uppercase mt-1">Affiliated</p></div>
          </div>
        </div>
      </div>

      {/* 2. ABOUT SECTION (Light Gray) */}
      <div className="bg-[#f8fafc] text-slate-900 py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#00a8e8] font-bold text-sm tracking-wider uppercase mb-4">About ORSSL</p>
          <h2 className="text-4xl font-bold text-[#041124] mb-8 leading-tight">
            From a university foundation to a national scientific body.
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              ORSSL began as a university-level chapter dedicated to the rigorous study of operations research. Today it has matured into a national organization affiliated with the <strong className="text-slate-900">International Federation of Operational Research Societies (IFORS)</strong> and the Asia-Pacific regional body <strong className="text-slate-900">APORS</strong>.
            </p>
            <p>
              Our mission is twofold: empower the next generation of Sri Lankan students with applied optimization skills, and provide industries — from apparel and logistics to banking and energy — with the analytical expertise required to compete globally.
            </p>
          </div>
        </div>
      </div>

      {/* 3. THREE PILLARS SECTION (White) */}
      <div className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#041124] mb-16">Three Pillars of ORSSL</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00a8e8] mb-6">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#041124] mb-4">Scientific Advancement</h3>
              <p className="text-slate-600 leading-relaxed">
                Maintain IFORS-aligned research standards, curate a public repository, and publish indexed Sri Lankan OR scholarship.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00a8e8] mb-6">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#041124] mb-4">Industrial Optimization</h3>
              <p className="text-slate-600 leading-relaxed">
                Apply linear programming, stochastic modeling and simulation to logistics, supply-chain, energy and financial challenges.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00a8e8] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#041124] mb-4">Professional Ecosystem</h3>
              <p className="text-slate-600 leading-relaxed">
                Run mentorship pipelines connecting students to senior practitioners, and open direct career pathways into top employers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MEMBERSHIP SECTION (Light Gray - FIXED: Cards are now compact and smaller) */}
      <div className="bg-[#f8fafc] py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#041124] mb-4">Membership</h2>
            <p className="text-slate-600 text-sm md:text-base">
              Two tiers — one community. One-time dues fund IFORS contributions, student workshops and the national research repository.
            </p>
          </div>

          {/* Cards Container with maximum sizing */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 max-w-4xl mx-auto w-full">
            
            {/* Student Tier Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm max-w-sm w-full flex flex-col">
              <h3 className="text-lg font-semibold text-[#041124] mb-3">Student Membership</h3>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-black text-[#041124]">LKR 500</span>
                <span className="text-xs text-slate-500 font-medium">/ one-time</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {['Mentorship pipeline access', 'Online resume hosting on directory', 'Free webinar & workshop entries', 'Research repository read access'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <Check className="w-4 h-4 text-[#00a8e8] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setCurrentTab('register')} className="w-full py-3 rounded-xl font-bold text-white bg-[#041124] hover:bg-slate-800 transition-colors text-sm">
                Get Started
              </button>
            </div>

            {/* Professional Tier Card */}
            <div className="bg-white border-2 border-[#00a8e8] rounded-3xl p-6 shadow-md relative max-w-sm w-full flex flex-col mt-4 md:mt-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00a8e8] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-[#041124] mb-3 mt-1">Professional Membership</h3>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-black text-[#041124]">LKR 3,000</span>
                <span className="text-xs text-slate-500 font-medium">/ one-time</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {['Full directory mapping & visibility', 'Voting rights at AGM', 'Eligibility for IFORS individual listing', 'Access to industry consulting network', 'Sponsor student mentees'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <Check className="w-4 h-4 text-[#00a8e8] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setCurrentTab('register')} className="w-full py-3 rounded-xl font-bold text-white bg-[#00a8e8] hover:bg-[#0090c7] transition-colors shadow-lg shadow-cyan-500/10 text-sm">
                Get Started
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}