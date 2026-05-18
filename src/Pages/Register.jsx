import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust this relative path based on your folder structure
import { User, Mail, Lock, GraduationCap, Loader2, ArrowRight } from 'lucide-react';

export default function Register({ setCurrentTab }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    memberType: 'Ordinary' // Set to the new official baseline category
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Pass custom profile metadata into options.data per Supabase specifications
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            member_type: formData.memberType
          }
        }
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      // Clear form inputs upon successful registration pipeline execution
      setFormData({ fullName: '', email: '', password: '', memberType: 'Ordinary' });
      
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#041124] px-4 py-12 relative overflow-hidden">
      {/* Background Radial Glow Effect matching the Home page hero theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00a8e8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-100/10 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join the Society</h2>
          <p className="text-sm text-slate-500 mt-2">Create your account to join the ORSSL member network</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-sm rounded-2xl flex items-center gap-2">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-2xl">
            <p className="font-bold mb-1">Registration Successful!</p>
            <p className="text-emerald-600/90">Please check your email inbox to verify your account before logging in.</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name Input */}
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
                placeholder="Prof. / Dr. / Mr. / Ms."
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input */}
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
                placeholder="name@example.com"
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Membership Category Selection - Synchronized with Item 5 of the Constitution */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Membership Classification</label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <select
                name="memberType"
                value={formData.memberType}
                onChange={handleInputChange}
                className="w-full bg-slate-50 text-sm text-slate-900 border border-slate-200 rounded-xl pl-10 pr-10 py-3 appearance-none focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="Ordinary">Ordinary Member</option>
                <option value="Life">Life Member</option>
                <option value="Associate">Associate Member</option>
                <option value="Student">Student Member</option>
                <option value="Corporate">Corporate / Institutional Member</option>
                <option value="Honorary">Honorary Fellow</option>
              </select>
              {/* Custom Dropdown Chevron Icon */}
              <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
            </div>
          </div>

          {/* Submit Registration Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a8e8] hover:bg-[#0096d1] text-white font-semibold text-sm rounded-xl py-3 mt-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00a8e8]/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
              </>
            ) : (
              <>
                Register Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* State-Based Routing Toggle Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentTab('login')}
            className="text-[#00a8e8] hover:underline font-semibold focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}