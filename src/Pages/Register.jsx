import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { User, Mail, Lock, GraduationCap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Register() {
  // Form input track states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    memberType: 'Student'
  });

  // Operational system process states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      // Direct sign-up execution call to Supabase Authentication
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // Attaches profile metadata automatically to the user account
          data: {
            full_name: formData.fullName,
            member_type: formData.memberType
          }
        }
      });

      if (error) throw error;

      // Registration successful state trigger
      if (data?.user) {
        setSuccess(true);
        setFormData({ fullName: '', email: '', password: '', memberType: 'Student' });
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex items-center justify-center py-16 px-4">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-8 shadow-sm space-y-6">
        
        {/* Header Block */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900">Create Society Account</h2>
          <p className="text-slate-400 text-sm mt-1">Join the Operations Research Society of Sri Lanka portal</p>
        </div>

        {/* Dynamic Status Notifications */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Registration Initiated!</p>
              <p className="text-emerald-600/90 text-xs mt-0.5">Please check your inbox for a secure verification link to activate your access profile.</p>
            </div>
          </div>
        )}

        {/* Input Interface Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g., Prof / Dr / Mr / Ms"
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="yourname@domain.com"
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Member Classification Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Membership Classification</label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <select
                name="memberType"
                value={formData.memberType}
                onChange={handleInputChange}
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 appearance-none focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="Student">Undergraduate Student Member</option>
                <option value="Postgraduate">Postgraduate Researcher</option>
                <option value="Professional">Academic / Corporate Professional</option>
                <option value="Life">Life Member</option>
              </select>
              <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
            </div>
          </div>

          {/* Submit Action Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a8e8] hover:bg-[#0090c7] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-cyan-500/5 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Registry...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>

        </form>
      </div>
    </div>
  );
}