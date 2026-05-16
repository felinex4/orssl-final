import React, { useState } from 'react';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Pages/Home.jsx';
import Directory from './Pages/Directory.jsx';
import Register from './Pages/Register.jsx';
import Admin from './Pages/Admin.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#00a8e8] selection:text-white bg-white">
      {/* Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Switcher */}
      <main className="flex-grow flex flex-col">
        {currentTab === 'home' && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === 'directory' && <Directory />}
        {currentTab === 'register' && <Register />}
        {currentTab === 'admin' && <Admin />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}