import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { LogOut, User } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, user }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    setCurrentTab('home');
  };

  return (
    <nav className="bg-[#041124] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
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
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((value) => !value)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                    aria-label="Open profile menu"
                  >
                    {user.user_metadata?.full_name ? (
                      <span className="font-black text-[#041124] text-lg uppercase">
                        {user.user_metadata.full_name.charAt(0)}
                      </span>
                    ) : (
                      <User className="w-5 h-5 text-[#041124]" />
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#08172e] border border-white/10 shadow-2xl text-white z-50">
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#041124] text-lg font-black">
                            {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0) : <User className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm">
                              {user.user_metadata?.full_name || user.email.split('@')[0]}
                            </p>
                            <p className="text-[11px] text-slate-300 mt-1">
                              {user.user_metadata?.member_type ? `${user.user_metadata.member_type} Member` : 'Active Session'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 text-sm text-slate-200">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Email</p>
                          <p className="mt-1 break-words">{user.email}</p>
                        </div>
                        {user.user_metadata?.department && (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-500">Department</p>
                            <p className="mt-1">{user.user_metadata.department}</p>
                          </div>
                        )}
                        {user.user_metadata?.role && (
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-500">Role</p>
                            <p className="mt-1">{user.user_metadata.role}</p>
                          </div>
                        )}
                      </div>

                      <div className="p-4 pt-0 space-y-3">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            setCurrentTab('profile');
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 hover:bg-slate-900 text-white font-semibold py-2 transition-all"
                        >
                          <User className="w-4 h-4" /> View Profile
                        </button>
                        <button
                          onClick={handleLogOut}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold py-2 transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
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