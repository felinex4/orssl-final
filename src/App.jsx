import React, { useState } from 'react';
import { 
  Menu, X, Rss, Users, UserPlus, LayoutDashboard, 
  Search, Filter, Check, GraduationCap, Briefcase, 
  TrendingUp, BarChart3, Award, MessageSquare, ThumbsUp, Share2
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [memberTypeFilter, setMemberTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [registerType, setRegisterType] = useState('student');

  // Sample Data for Directory
  const members = [
    { id: 1, name: "Prof. Asitha Bandara", role: "Senior Consultant / Professor", type: "professional", expertise: ["Linear Programming", "Supply Chain"], badge: "Mentor", institution: "University of Peradeniya" },
    { id: 2, name: "Kalpa Dilhara", role: "3rd Year Undergraduate", type: "student", expertise: ["Statistics", "Mathematical Optimization"], badge: "Student Member", institution: "University of Peradeniya" },
    { id: 3, name: "Janitha SOR", role: "Operations Analyst", type: "professional", expertise: ["Queuing Theory", "Data Science"], badge: "Alumni", institution: "MAS Contourline" },
    { id: 4, name: "Anupama Jayasekara", role: "4th Year Research Student", type: "student", expertise: ["Stochastic Processes", "R Programming"], badge: "Research Lead", institution: "University of Peradeniya" },
  ];

  const filteredMembers = members.filter(member => {
    const matchesType = memberTypeFilter === 'all' || member.type === memberTypeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg text-slate-950 font-bold tracking-wider text-xl shadow-lg shadow-cyan-500/20">
                OR
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">ORSSL</span>
                <span className="text-xs block text-slate-400 tracking-widest uppercase font-semibold">Connect Platform</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'feed', label: 'Feed', icon: Rss },
                { id: 'directory', label: 'Network Directory', icon: Users },
                { id: 'register', label: 'Join Society', icon: UserPlus },
                { id: 'admin', label: 'Dashboard', icon: LayoutDashboard },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      currentTab === tab.id 
                        ? 'bg-slate-800 text-cyan-400 shadow-inner border border-slate-700' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
            {[
              { id: 'feed', label: 'Feed', icon: Rss },
              { id: 'directory', label: 'Network Directory', icon: Users },
              { id: 'register', label: 'Join Society', icon: UserPlus },
              { id: 'admin', label: 'Dashboard', icon: LayoutDashboard },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setCurrentTab(tab.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium ${
                    currentTab === tab.id ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TABS 1: FEED / TIMELINE */}
        {currentTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Box: Mini Profile */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-fit p-6">
              <div className="h-20 bg-gradient-to-r from-cyan-600 to-indigo-700 -mx-6 -mt-6 relative">
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-cyan-400 shadow-md">
                  <GraduationCap className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-lg text-slate-100">Kalpa Dilhara</h3>
                <p className="text-sm text-slate-400">Undergraduate at University of Peradeniya</p>
                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                  <span>Connection Views</span>
                  <span className="text-cyan-400 font-bold">142</span>
                </div>
              </div>
            </div>

            {/* Middle Box: Feed Updates */}
            <div className="lg:col-span-2 space-y-6">
              {/* Creator Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                    OR
                  </div>
                  <input 
                    type="text" 
                    placeholder="Share an optimization insight, research update, or event..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Feed Post 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">Operations Research Society of Sri Lanka</h4>
                      <p className="text-xs text-slate-400">Published 2 hours ago</p>
                    </div>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-medium border border-cyan-500/20">Announcement</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We are thrilled to announce our upcoming national workshop on **Advanced Mathematical Optimization & Supply Chain Logistics**. This session will focus on industrial implementations of quadratic programming and mixed-integer linear modeling systems. Registered student members receive full access.
                </p>
                <div className="h-48 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
                  <BarChart3 className="w-12 h-12 text-slate-700 animate-pulse" />
                  <span>Interactive Session Graphics Coming Soon</span>
                </div>
                <div className="flex items-center gap-6 pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"><ThumbsUp className="w-4 h-4" /> 24 Likes</button>
                  <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"><MessageSquare className="w-4 h-4" /> 5 Comments</button>
                  <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABS 2: INTERACTIVE DIRECTORY */}
        {currentTab === 'directory' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Operations Research Member Index</h2>
              <p className="text-sm text-slate-400 mb-6">Connect with academic professors, operations specialists, and research scholars across Sri Lanka.</p>
              
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search by name or skills (e.g. Statistics)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 h-fit">
                  {['all', 'professional', 'student'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMemberTypeFilter(type)}
                      className={`flex-1 text-xs py-2 capitalize font-semibold rounded-lg transition-all ${
                        memberTypeFilter === type ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {type}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-slate-200">{member.name}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          {member.type === 'professional' ? <Briefcase className="w-3 h-3 text-indigo-400" /> : <GraduationCap className="w-3 h-3 text-cyan-400" />}
                          {member.role}
                        </p>
                      </div>
                      <span className="bg-slate-950 text-cyan-400 border border-slate-800 text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider uppercase">
                        {member.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{member.institution}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((exp, idx) => (
                        <span key={idx} className="bg-slate-950 text-slate-400 border border-slate-800 text-xs px-2.5 py-1 rounded-lg">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-end">
                    <button className="text-xs bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/10">
                      Request Connection
                    </button>
                  </div>
                </div>
              ))}
              {filteredMembers.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 text-sm">
                  No registered members fit your current filter parameters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TABS 3: REGISTRATION SCHEME */}
        {currentTab === 'register' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold">Society Membership Enrollment</h2>
                <p className="text-sm text-slate-400 mt-1">Submit your academic details to apply for formal society recognition.</p>
              </div>

              {/* Type Switcher */}
              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button 
                  onClick={() => setRegisterType('student')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                    registerType === 'student' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'
                  }`}
                >
                  Student Track
                </button>
                <button 
                  onClick={() => setRegisterType('professional')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                    registerType === 'professional' ? 'bg-indigo-600 text-slate-100 shadow-md' : 'text-slate-400'
                  }`}
                >
                  Professional Track
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. K.D. Thennakoon" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="yourname@gmail.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">University / Workplace</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. University of Peradeniya" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Interest / Specialty</label>
                  <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g. Stochastic Systems" />
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                registerType === 'student' ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/10 hover:bg-cyan-400' : 'bg-indigo-600 text-slate-100 shadow-indigo-600/10 hover:bg-indigo-500'
              }`}>
                Submit Application For Verification
              </button>
            </div>

            {/* Pricing / Tiers Info */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl"></div>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Tier 01</span>
                <h3 className="text-lg font-bold mt-3 text-slate-100">Student Account</h3>
                <p className="text-xs text-slate-400 mt-1">For currently registered university undergraduate or postgraduate researchers.</p>
                <div className="my-4 text-2xl font-extrabold text-cyan-400">Free <span className="text-xs text-slate-500 font-normal">/ verification required</span></div>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Student Directory Listing</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Access to Society Research Feeds</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Discounted Workshop Tickets</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Tier 02</span>
                <h3 className="text-lg font-bold mt-3 text-slate-100">Corporate Professional</h3>
                <p className="text-xs text-slate-400 mt-1">For active analytics leads, corporate consultants, and engineering faculty.</p>
                <div className="my-4 text-2xl font-extrabold text-indigo-400">LKR 2,500 <span className="text-xs text-slate-500 font-normal">/ annually</span></div>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Certified Professional Badge</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Mentorship Priority Routing</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Executive Council Voting Rights</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TABS 4: ADMIN CONTROLS & CHARTS */}
        {currentTab === 'admin' && (
          <div className="space-y-6">
            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Verified Members", value: "312", change: "+12% this month", icon: Users, color: "text-cyan-400" },
                { title: "Pending Approvals", value: "14", change: "Requires review", icon: UserPlus, color: "text-amber-400" },
                { title: "Active Projects", value: "8", change: "4 university collaborations", icon: TrendingUp, color: "text-indigo-400" },
                { title: "Total Network Reach", value: "1,240", change: "Vistors this week", icon: Award, color: "text-emerald-400" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                      <h3 className="text-2xl font-extrabold text-slate-100 mt-1">{stat.value}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{stat.change}</p>
                    </div>
                    <div className={`p-3 bg-slate-950 rounded-xl border border-slate-800 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CSS Charts Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Growth Analysis Matrix</h3>
                  <p className="text-xs text-slate-400">Total society subscription density by department</p>
                </div>
                <BarChart3 className="w-5 h-5 text-slate-600" />
              </div>
              
              {/* CSS Bar Chart Simulation */}
              <div className="space-y-4 max-w-2xl">
                {[
                  { name: "Statistics & Operations Research", count: 145, pct: "w-[85%]", color: "bg-gradient-to-r from-cyan-500 to-cyan-400" },
                  { name: "Computer Science & Analytics", count: 92, pct: "w-[60%]", color: "bg-gradient-to-r from-indigo-500 to-indigo-400" },
                  { name: "Industrial Engineering", count: 54, pct: "w-[40%]", color: "bg-gradient-to-r from-slate-600 to-slate-500" },
                  { name: "Mathematics Faculty", count: 21, pct: "w-[18%]", color: "bg-gradient-to-r from-slate-700 to-slate-600" },
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{bar.name}</span>
                      <span className="text-slate-400 font-bold">{bar.count} members</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                      <div className={`h-full ${bar.color} ${bar.pct} rounded-full transition-all duration-500`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}