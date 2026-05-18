import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Adjust this relative path based on your folder structure
import { Search, Filter, UserCheck, Mail, Loader2, User, Building, Award, ShieldAlert } from 'lucide-react';

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Fetch verified profiles from the Supabase public table on component mount
  useEffect(() => {
    async function fetchDirectory() {
      try {
        setLoading(true);
        setError(null);

        // Queries the profiles table protected by Row Level Security (RLS)
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('id, full_name, email, member_type, created_at')
          .order('full_name', { ascending: true });

        if (fetchError) throw fetchError;
        setMembers(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load the member directory.');
      } finally {
        setLoading(false);
      }
    }

    fetchDirectory();
  }, []);

  // Sophisticated client-side engine filtering by text query and dropdown category
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'All' || member.member_type === filterType;

    return matchesSearch && matchesFilter;
  });

  // Helper function to return relevant icons per classification tier
  const getMemberIcon = (type) => {
    switch (type) {
      case 'Corporate': return <Building className="w-5 h-5 text-blue-500" />;
      case 'Honorary': return <Award className="w-5 h-5 text-rose-500" />;
      default: return <User className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#041124] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-[#00a8e8] bg-clip-text text-transparent">
            Member Network
          </h1>
          <p className="mt-3 text-lg text-slate-400 max-w-2xl">
            Official registry of the Operations Research Society of Sri Lanka. Search and filter through our certified academic and corporate directory.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white/5 border border-slate-100/10 rounded-2xl p-4 mb-8 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 shadow-xl">
          {/* Text Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 text-sm text-white border border-slate-100/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00a8e8] focus:bg-slate-900 transition-colors placeholder-slate-500"
            />
          </div>

          {/* Classification Selection Dropdown - Synchronized with Item 5 of the Constitution */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-900 text-sm text-slate-200 border border-slate-100/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a8e8] cursor-pointer w-full sm:w-auto hover:bg-slate-800 transition-colors"
            >
              <option value="All">All Classifications</option>
              <option value="Ordinary">Ordinary Members</option>
              <option value="Life">Life Members</option>
              <option value="Associate">Associate Members</option>
              <option value="Student">Student Members</option>
              <option value="Corporate">Corporate / Institutional</option>
              <option value="Honorary">Honorary Fellows</option>
            </select>
          </div>
        </div>

        {/* Core Content Layout Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-[#00a8e8] animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Querying secure database registry...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl text-center max-w-xl mx-auto flex flex-col items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
            <p className="font-semibold">Database Error Connection Refused</p>
            <p className="text-xs text-rose-400/80">{error}</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-slate-100/10 rounded-2xl">
            <p className="text-slate-400 font-medium">No society members found matching your criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your keyword query or registry filter type.</p>
          </div>
        ) : (
          /* Grid Matrix Display */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Card Header Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-[#00a8e8]/20 transition-colors">
                      {getMemberIcon(member.member_type)}
                    </div>
                  </div>

                  {/* Profile Typography Block */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-[#00a8e8] transition-colors">
                    {member.full_name || 'Anonymous Member'}
                  </h3>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                </div>

                {/* Constitutional Member Status Badge Wrapper */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase ${
                    member.member_type === 'Ordinary' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                    member.member_type === 'Life' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    member.member_type === 'Associate' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                    member.member_type === 'Student' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    member.member_type === 'Corporate' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    'bg-rose-50 text-rose-700 border border-rose-100' // Default fallback color mappings match 'Honorary'
                  }`}>
                    {member.member_type} {member.member_type === 'Honorary' ? 'Fellow' : 'Member'}
                  </span>
                  
                  {/* Verification Checkmark */}
                  <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    <UserCheck className="w-3 h-3" /> Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}