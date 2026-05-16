import React from 'react';

export default function Navbar({ currentTab, setCurrentTab }) {
  // Navigation tabs config mapping to the state identifiers in App.jsx
  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'register', label: 'Register' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  return (
    <nav className="bg-[#041124] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Group */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden p-1 transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="ORSSL Logo" className="object-contain w-full h-full" />
            </div>
            <div>
              <span className="font-black tracking-wider text-lg block leading-none">ORSSL</span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase block mt-1">
                Operations Research Society - Sri Lanka
              </span>
            </div>
          </div>

          {/* Navigation Links Switcher Menu */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`text-sm font-semibold transition-colors relative py-2 ${
                    currentTab === item.id ? 'text-[#00a8e8]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {currentTab === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a8e8] rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </div>

            {/* Action Join Button */}
            <button 
              onClick={() => setCurrentTab('register')}
              className="bg-[#00a8e8] hover:bg-[#0090c7] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-cyan-500/10 active:scale-95"
            >
              Join the Society
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}