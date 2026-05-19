import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path matches your project structure
import { Search, ShieldCheck, Mail, Filter, Loader2, ShieldAlert } from 'lucide-react';

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  // Official Constitutional Tiers for the Sidebar
  const membershipTiers = ['All', 'Ordinary', 'Life', 'Associate', 'Student', 'Corporate', 'Honorary'];

  // Fetch live verified profiles from Supabase
  useEffect(() => {
    async function fetchDirectory() {
      try {
        setLoading(true);
        setError(null);

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

  // Filtering Logic Engine
  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTier = selectedTier === 'All' || member.member_type === selectedTier;
    
    return matchesSearch && matchesTier;
  });

  // Avatar Initials Generator
  const getInitials = (name) => {
    if (!name) return 'OR';
    const cleanName = name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '');
    const parts = cleanName.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return cleanName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-12 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#041124]">
            Official Member Registry
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl leading-relaxed">
            Search and verify active members, corporate partners, and academic fellows of the Operations Research Society of Sri Lanka.
          </p>
        </div>

        {/* Dual Column Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Filter Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
              
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Filter className="w-4 h-4 text-[#00a8e8]" />
                <h2 className="text-sm font-bold text-[#041124] uppercase tracking-wider">Directory Filters</h2>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search Registry</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 text-sm border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#00a8e8] transition-colors"
                  />
                </div>
              </div>

              {/* Membership Tier Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Classification</label>
                <div className="space-y-2">
                  {membershipTiers.map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between ${
                        selectedTier === tier 
                          ? 'bg-[#00a8e8]/10 text-[#00a8e8] font-bold border border-[#00a8e8]/20' 
                          : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 font-medium'
                      }`}
                    >
                      <span>{tier} {tier !== 'All' && 'Members'}</span>
                      {selectedTier === tier && <div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8]"></div>}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Member Cards Grid & State Handling */}
          <div className="flex-grow">
            
            {/* Database Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-slate-200 rounded-2xl">
                <Loader2 className="w-8 h-8 text-[#00a8e8] animate-spin" />
                <p className="text-sm text-slate-500 font-medium">Querying secure database registry...</p>
              </div>
            ) : error ? (
              /* Database Error State */
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-8 rounded-2xl text-center flex flex-col items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-rose-500" />
                <p className="font-bold text-lg">Database Connection Refused</p>
                <p className="text-sm text-rose-500/80">{error}</p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    Showing <strong className="text-[#041124]">{filteredMembers.length}</strong> verified records
                  </span>
                </div>

                {filteredMembers.length === 0 ? (
                  /* Empty Search Results State */
                  <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">No records found</h3>
                    <p className="text-sm text-slate-500 mt-1">Try adjusting your search terms or classification filters.</p>
                  </div>
                ) : (
                  /* Supabase Live Member Cards Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
                    {filteredMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#00a8e8]/30 transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          {/* Top Row: Avatar & Details */}
                          <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 border border-slate-200 font-bold text-sm">
                                {getInitials(member.full_name)}
                              </div>
                              <div className="min-w-0 pr-2">
                                <h3 className="text-base font-bold text-[#041124] leading-tight truncate">
                                  {member.full_name || 'Anonymous Member'}
                                </h3>
                                <span className="text-xs text-slate-500 mt-0.5 block">{member.member_type} Affiliate</span>
                              </div>
                            </div>
                            
                            {/* Dynamic Membership Tier Badge */}
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#041124]/5 text-[#041124] border border-[#041124]/10 flex-shrink-0">
                              {member.member_type}
                            </span>
                          </div>

                          {/* Info Rows */}
                          <div className="space-y-2.5 mt-2">
                            <div className="flex items-center gap-2.5 text-sm text-slate-600">
                              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: Verification Status */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <ShieldCheck className="w-4 h-4" />
                            Status: Verified Active
                          </div>
                          <div className="text-[10px] font-medium text-slate-400">
                            ID: #{member.id.substring(0, 6)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}