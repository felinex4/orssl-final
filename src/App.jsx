import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Directory from './pages/Directory.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx'; // Imported the new Admin panel file

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#00a8e8] selection:text-white">
      
      {/* Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Switcher */}
      <main className="flex-grow flex flex-col">
        {currentTab === 'home' && <Home setCurrentTab={setCurrentTab} />}
        {currentTab === 'directory' && <Directory />}
        {currentTab === 'register' && <Register />}
        {currentTab === 'admin' && <Admin />} {/* Shows your new clean board registry */}
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}