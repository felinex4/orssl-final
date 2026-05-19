import React from 'react';
import { supabase } from '../supabaseClient.js';
import { LogOut, User } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, user }) {
  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setCurrentTab('home');
  };

  return (
    <nav className="bg-[#041124] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity Group (Left Side) */}
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
                Operations Research Society of Sri Lanka
              </span>
            </div>
          </div>

          {/* Center Links & Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 mr-2">
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
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a8e8] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Right Action Block */}
            <div className="flex items-center gap-4">
              {user ? (
                /* AUTHENTICATED STATE: Profile block mirroring the ORSSL logo layout */
                <div className="flex items-center gap-4 border-l border-white/10 pl-5 ml-2">
                  <div className="flex items-center gap-3 cursor-default">
                    {/* Round Circular Avatar */}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
                      <span className="font-black text-[#041124] text-lg uppercase">
                        {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0) : <User className="w-5 h-5 text-[#041124]" />}
                      </span>
                    </div>
                    {/* Name and Member Status */}
                    <div className="text-left hidden md:block">
                      <span className="font-black tracking-wider text-base block leading-none text-white">
                        {user.user_metadata?.full_name || user.email.split('@')[0]}
                      </span>
                      <span className="text-[10px] text-[#00a8e8] font-bold tracking-widest uppercase block mt-1">
                        {user.user_metadata?.member_type ? `${user.user_metadata.member_type} Member` : 'Active Session'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Log Out Button */}
                  <button
                    onClick={handleLogOut}
                    className="ml-2 text-slate-400 hover:text-rose-400 p-2.5 rounded-full hover:bg-white/5 transition-all bg-transparent border-none cursor-pointer flex items-center justify-center group"
                    title="Sign Out of Account"
                  >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              ) : (
                /* UNAUTHENTICATED STATE: Login and Register buttons */
                <>
                  <button 
                    onClick={() => setCurrentTab('login')}
                    className={`text-sm font-semibold transition-colors py-2 ${
                      currentTab === 'login' ? 'text-[#00a8e8]' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>

                  <button 
                    onClick={() => setCurrentTab('register')}
                    className="bg-[#00a8e8] hover:bg-[#0090c7] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
                  >
                    Join the Society
                  </button>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}