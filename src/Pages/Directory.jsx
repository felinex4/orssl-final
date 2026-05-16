import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { Search, UserCheck, ShieldAlert, Loader2, Filter } from 'lucide-react';

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        setLoading(true);
        // Direct query to pull records from our newly automated public table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('full_name', { ascending: true });

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectory();
  }, []);

  // Filter and search logic combined
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || member.member_type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-grow bg-[#f8fafc] text-slate-900 py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Heading */}
        <div>
          <p className="text-[#00a8e8] font-bold text-sm tracking-wider uppercase">ORSSL Network</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">Member Directory</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl">
            Verify active memberships and discover academic and corporate research profiles registered within the society.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by member name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00a8e8] cursor-pointer w-full sm:w-auto"
            >
              <option value="All">All Classifications</option>
              <option value="Student">Undergraduates</option>
              <option value="Postgraduate">Postgraduates</option>
              <option value="Professional">Professionals / Academics</option>
              <option value="Life">Life Members</option>
            </select>
          </div>
        </div>

        {/* Dynamic State Engine Layout */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#00a8e8]" />
            <p className="text-sm font-medium">Syncing live registry database...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl flex items-start gap-3 max-w-xl mx-auto">
            <ShieldAlert className="w-6 h-6 shrink-0 text-rose-500" />
            <div>
              <h4 className="font-bold">Sync Error Encountered</h4>
              <p className="text-xs text-rose-600 mt-1">{error}</p>
            </div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-sm">No registered members found matching those search criteria.</p>
          </div>
        ) : (
          /* Cards Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="space-y-4">
                  {/* Avatar Circle Badge */}
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[#00a8e8] font-black text-lg rounded-xl flex items-center justify-center uppercase">
                    {member.full_name ? member.full_name.charAt(0) : 'O'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-[#00a8e8] transition-colors">{member.full_name}</h4>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">{member.email}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    member.member_type === 'Professional' ? 'bg-purple-50 text-purple-700' :
                    member.member_type === 'Life' ? 'bg-amber-50 text-amber-700' :
                    member.member_type === 'Postgraduate' ? 'bg-blue-50 text-blue-700' :
                    'bg-emerald-50 text-emerald-700'
                  }`}>
                    {member.member_type} Member
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded-md">
                    <UserCheck className="w-3.5 h-3.5" /> Verified
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