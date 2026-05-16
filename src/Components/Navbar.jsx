import React from 'react';

export default function Navbar({ currentTab, setCurrentTab }) {
  return (
    <nav className="bg-[#041124] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentTab('home')}>
          {/* THE NEW, FRAMED, ROUND LOGO */}
          {/* We frame your navy logo in a white, rounded-full box to solve the color conflict elegantly. */}
          <img 
            src="/logo.png" 
            alt="ORSSL Logo" 
            className="w-14 h-14 object-contain rounded-full bg-white shadow-md p-1 border border-white/20" 
          />
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">ORSSL</h1>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">Operations Research Society - Sri Lanka</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setCurrentTab('home')} className={`text-sm font-medium transition-colors ${currentTab === 'home' ? 'text-[#00a8e8]' : 'text-slate-300 hover:text-white'}`}>Home</button>
          <button onClick={() => setCurrentTab('directory')} className={`text-sm font-medium transition-colors ${currentTab === 'directory' ? 'text-[#00a8e8]' : 'text-slate-300 hover:text-white'}`}>Directory</button>
          <button onClick={() => setCurrentTab('register')} className={`text-sm font-medium transition-colors ${currentTab === 'register' ? 'text-[#00a8e8]' : 'text-slate-300 hover:text-white'}`}>Register</button>
          <button className="text-sm font-medium text-slate-300 hover:text-white">Admin Panel</button>
          <button onClick={() => setCurrentTab('register')} className="bg-[#00a8e8] hover:bg-[#0090c7] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors ml-2 shadow-md shadow-cyan-500/10">
            Join the Society
          </button>
        </div>
      </div>
    </nav>
  );
}