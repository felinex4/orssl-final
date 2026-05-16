import React, { useState } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';

export default function Register() {
  const [registerType, setRegisterType] = useState('professional');
  const skillFilters = ["Linear Programming", "Integer Programming", "Queuing Theory", "Machine Learning", "Simulation", "Supply Chain Optimization", "Stochastic Modeling", "Financial Analytics"];

  return (
    <div className="flex-grow bg-[#f8fafc] text-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex rounded-xl bg-white border border-slate-200 p-1.5 mb-8 shadow-sm">
          <button onClick={() => setRegisterType('student')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors ${registerType === 'student' ? 'bg-[#00a8e8] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
            <GraduationCap className="w-5 h-5" /> Register as Student
          </button>
          <button onClick={() => setRegisterType('professional')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors ${registerType === 'professional' ? 'bg-[#00a8e8] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Briefcase className="w-5 h-5" /> Register as Professional
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-semibold text-slate-900">Full Name</label><input type="text" placeholder="Jane Perera" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00a8e8]" /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-slate-900">Email</label><input type="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00a8e8]" /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-slate-900">{registerType === 'student' ? 'University / Organization' : 'Company / Employer'}</label><input type="text" placeholder="MAS Holdings" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00a8e8]" /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-slate-900">{registerType === 'student' ? 'Degree Program' : 'Job Title'}</label><input type="text" placeholder="Senior Analyst" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00a8e8]" /></div>
            <div className="space-y-2 sm:col-span-2"><label className="text-sm font-semibold text-slate-900">Password</label><input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00a8e8]" /></div>
          </div>
          <div className="mt-8">
            <label className="text-sm font-semibold text-slate-900 mb-3 block">Expertise Areas</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap gap-2">
              {skillFilters.map((skill, idx) => (
                <button key={idx} className="bg-white border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full hover:border-[#00a8e8] hover:text-[#00a8e8] transition-colors">+ {skill}</button>
              ))}
            </div>
          </div>
          <button className="w-full bg-[#00a8e8] hover:bg-[#0090c7] text-white font-bold py-3.5 rounded-lg mt-8 transition-colors">
            Create Account & Continue
          </button>
        </div>
      </div>
    </div>
  );
}