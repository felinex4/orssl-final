import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { Mail, Lock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export default function Login({ setCurrentTab }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data?.user) {
        setSuccess(true);
        // Briefly pause to show success animation, then redirect to home view
        setTimeout(() => {
          setCurrentTab('home');
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password combination.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-[#f8fafc] flex items-center justify-center py-20 px-4">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-8 shadow-sm space-y-6">
        
        {/* Header Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900">Member Portal Sign-In</h2>
          <p className="text-slate-400 text-sm mt-1">Access your ORSSL society account profile</p>
        </div>

        {/* Status Responses */}
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
              <p className="font-bold">Access Granted!</p>
              <p className="text-emerald-600/90 text-xs mt-0.5">Syncing secure user session tokens...</p>
            </div>
          </div>
        )}

        {/* Input Interactive Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Block */}
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

          {/* Password Block */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <button 
                type="button"
                onClick={() => alert("Password reset workflow is initialized via secure cloud links.")}
                className="text-xs font-semibold text-[#00a8e8] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot?
              </button>
            </div>
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

          {/* Action Login Submission Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-[#00a8e8] hover:bg-[#0090c7] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-cyan-500/5 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Alternative Route Navigation Toggle */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentTab('register')}
              className="text-[#00a8e8] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}