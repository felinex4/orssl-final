import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Register from './pages/Register';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#00a8e8] selection:text-white">
      
      {/* The Navbar component handles navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area switches based on the currentTab state */}
      <main className="flex-grow flex flex-col">
        {currentTab === 'home' && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === 'directory' && <Directory />}
        {currentTab === 'register' && <Register />}
      </main>

      {/* The Footer component stays at the bottom */}
      <Footer />
      
    </div>
  );
}