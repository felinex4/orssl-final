import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { supabase } from './supabaseClient.js';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Pages/Home.jsx';
import Directory from './Pages/Directory.jsx';
import Register from './Pages/Register.jsx';
import Admin from './Pages/Admin.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check if a secure user session token already exists on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen continuously for changes (Log In, Log Out, Session Expired)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#00a8e8] selection:text-white bg-white">
      {/* Navigation Layout - Passing down the user session data */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} user={user} />

      {/* Main Container Core View Switcher */}
      <main className="flex-grow flex flex-col">
        {currentTab === 'home' && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === 'directory' && <Directory />}
        {currentTab === 'register' && <Register />}
        {currentTab === 'admin' && <Admin />}
        {currentTab === 'profile' && <Profile user={user} />}
        {currentTab === 'login' && <Login setCurrentTab={setCurrentTab} />}
      </main>

      {/* Sticky Footer Layout */}
      <Footer />
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}