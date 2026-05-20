import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this path matches your project structure
import { Search, ShieldCheck, Mail, Filter, Loader2, ShieldAlert } from 'lucide-react';

export default function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New Cascading Checkbox Filter States
  const [selectedMemberships, setSelectedMemberships] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedAcademicLevels, setSelectedAcademicLevels] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [executiveOnly, setExecutiveOnly] = useState(false);
  
  // Search and Institution filters (kept from before)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('All');

  // Official Constitutional Membership Types
  const membershipTypes = ['Ordinary', 'Life', 'Associate', 'Student', 'Corporate', 'Honorary'];
  const executiveMembers = ['Ordinary', 'Life', 'Corporate'];

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

        // Fetch additional profile data
        let enrichedData = data || [];
        if (data && data.length > 0) {
          const { data: memberData, error: memberError } = await supabase
            .from('member_profiles')
            .select('user_id, sector, academic_year, description, profile_data');
          
          if (!memberError && memberData) {
            const memberMap = {};
            memberData.forEach(m => {
              memberMap[m.user_id] = {
                sector: m.sector,
                academic_year: m.academic_year,
                description: m.description,
                institution: m.profile_data?.institution || m.profile_data?.university || m.profile_data?.affiliation || m.profile_data?.company || null,
              };
            });
            
            enrichedData = enrichedData.map(user => ({
              ...user,
              ...memberMap[user.id],
            }));
          }
        }

        if (fetchError) throw fetchError;
        setMembers(enrichedData);
      } catch (err) {
        setError(err.message || 'Failed to load the member directory.');
      } finally {
        setLoading(false);
      }
    }

    fetchDirectory();
  }, []);

  // Derive active universities from members (with duplicates removed and sorted)
  const activeUniversities = Array.from(new Set(
    members
      .map(m => m.institution)
      .filter(inst => inst && inst.trim() !== '')
  )).sort();

  // ─── CASCADING CHECKBOX HANDLERS ───────────────────────────────────────────
  
  // Handle "All Membership Types" checkbox
  const handleAllMemberships = (checked) => {
    if (checked) {
      setSelectedMemberships([...membershipTypes]);
    } else {
      setSelectedMemberships([]);
    }
  };

  // Handle individual membership type checkbox
  const handleMembershipChange = (type, checked) => {
    let updated;
    if (checked) {
      updated = [...selectedMemberships, type];
    } else {
      updated = selectedMemberships.filter(m => m !== type);
    }
    setSelectedMemberships(updated);
  };

  // Check if all memberships are selected
  const allMembershipsChecked = selectedMemberships.length === membershipTypes.length;

  // ─── SECTOR & ACADEMIC LEVEL CASCADING LOGIC ──────────────────────────────
  
  // Academic years array
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  
  // Handle "All Academia" checkbox
  const handleAllAcademia = (checked) => {
    if (checked) {
      // Select all academia-related levels and all years
      setSelectedSectors(['Academia']);
      setSelectedAcademicLevels(['Undergraduate', 'Postgraduate', 'Senior Academic']);
      setSelectedYears([...years]);
    } else {
      // Only deselect academia sector
      setSelectedSectors(selectedSectors.filter(s => s !== 'Academia'));
      // Keep individual levels/years if manually set
    }
  };

  // Handle "All Undergraduates" checkbox
  const handleAllUndergraduates = (checked) => {
    let updatedLevels = [...selectedAcademicLevels];
    if (checked) {
      if (!updatedLevels.includes('Undergraduate')) {
        updatedLevels.push('Undergraduate');
      }
      setSelectedAcademicLevels(updatedLevels);
      // Select all years
      setSelectedYears([...years]);
    } else {
      updatedLevels = updatedLevels.filter(l => l !== 'Undergraduate');
      setSelectedAcademicLevels(updatedLevels);
      // Keep years as they are (don't auto-deselect)
    }
  };

  // Handle individual academic level (Postgraduate, Senior Academic)
  const handleAcademicLevelChange = (level, checked) => {
    let updated;
    if (checked) {
      updated = [...selectedAcademicLevels, level];
    } else {
      updated = selectedAcademicLevels.filter(l => l !== level);
    }
    setSelectedAcademicLevels(updated);
  };

  // Handle individual year checkbox
  const handleYearChange = (year, checked) => {
    let updated;
    if (checked) {
      updated = [...selectedYears, year];
    } else {
      updated = selectedYears.filter(y => y !== year);
    }
    setSelectedYears(updated);

    // Auto-check "All Undergraduates" if all years are selected
    if (updated.length === years.length && !selectedAcademicLevels.includes('Undergraduate')) {
      setSelectedAcademicLevels([...selectedAcademicLevels, 'Undergraduate']);
    }
    // Auto-uncheck "All Undergraduates" if not all years are selected
    if (updated.length < years.length && selectedAcademicLevels.includes('Undergraduate')) {
      setSelectedAcademicLevels(selectedAcademicLevels.filter(l => l !== 'Undergraduate'));
    }
  };

  // Handle "Industry" checkbox
  const handleIndustryChange = (checked) => {
    let updated = [...selectedSectors];
    if (checked) {
      if (!updated.includes('Industry')) {
        updated.push('Industry');
      }
    } else {
      updated = updated.filter(s => s !== 'Industry');
    }
    setSelectedSectors(updated);
  };

  // Check if "All Academia" should be checked
  const allAcademiaChecked = selectedSectors.includes('Academia') &&
    selectedAcademicLevels.includes('Undergraduate') &&
    selectedAcademicLevels.includes('Postgraduate') &&
    selectedAcademicLevels.includes('Senior Academic') &&
    selectedYears.length === years.length;

  // Check if "All Undergraduates" should be checked (must include Undergraduate level AND all years)
  const allUndergraduatesChecked = selectedAcademicLevels.includes('Undergraduate') && selectedYears.length === years.length && selectedYears.length > 0;

  // Filtering Logic Engine with cascading array logic
  const filteredMembers = members.filter((member) => {
    // If searchTerm is empty, show all; otherwise filter by name/email
    const matchesSearch = !searchTerm || 
      member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Membership type: if array is empty, show all; otherwise check if member type is in array
    const matchesMembership = selectedMemberships.length === 0 || selectedMemberships.includes(member.member_type);
    
    // Sector logic: handle Academia with academic levels/years
    let matchesSectorAndLevel = true;
    if (selectedSectors.length > 0 || selectedAcademicLevels.length > 0 || selectedYears.length > 0) {
      matchesSectorAndLevel = false;
      
      // Check Academia path
      if (selectedSectors.includes('Academia')) {
        const inUndergrad = selectedAcademicLevels.includes('Undergraduate') && selectedYears.includes(member.academic_year);
        const inPostgrad = selectedAcademicLevels.includes('Postgraduate') && member.academic_year === 'Postgraduate';
        const inSenior = selectedAcademicLevels.includes('Senior Academic') && member.academic_year === 'Senior Academic';
        if (inUndergrad || inPostgrad || inSenior) {
          matchesSectorAndLevel = true;
        }
      }
      
      // Check Industry path
      if (selectedSectors.includes('Industry') && member.sector === 'Industry') {
        matchesSectorAndLevel = true;
      }
    }
    
    const matchesInstitution = selectedInstitution === 'All' || member.institution === selectedInstitution;
    
    const matchesExecutive = !executiveOnly || executiveMembers.includes(member.member_type);
    
    return matchesSearch && matchesMembership && matchesSectorAndLevel && matchesInstitution && matchesExecutive;
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

              {/* Membership Type Cascading Checkboxes */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Membership Types</label>
                <div className="space-y-2">
                  {/* "All Membership Types" Parent */}
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={allMembershipsChecked}
                      onChange={(e) => handleAllMemberships(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                    />
                    <span className="text-sm font-bold text-[#041124]">All Membership Types</span>
                  </label>
                  
                  {/* Individual Membership Type Children */}
                  <div className="pl-4 space-y-1.5 border-l-2 border-slate-200">
                    {membershipTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={selectedMemberships.includes(type)}
                          onChange={(e) => handleMembershipChange(type, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                        />
                        <span className="text-sm text-slate-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sector & Academic Level Cascading Checkboxes */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Sector & Academic Level</label>
                <div className="space-y-2.5">
                  
                  {/* "All Academia" Parent */}
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={allAcademiaChecked}
                      onChange={(e) => handleAllAcademia(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                    />
                    <span className="text-sm font-bold text-[#041124]">All Academia</span>
                  </label>

                  {/* Academia Children - Indented */}
                  <div className="pl-4">
                    
                    {/* "All Undergraduates" Sub-Parent */}
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={allUndergraduatesChecked}
                        onChange={(e) => handleAllUndergraduates(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">All Undergraduates</span>
                    </label>

                    {/* Academic Years - Double Indented */}
                    <div className="pl-4 space-y-1.5 border-l border-slate-200">
                      {years.map((year) => (
                        <label key={year} className="flex items-center gap-3 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={(e) => handleYearChange(year, e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                          />
                          <span className="text-sm text-slate-600">{year}</span>
                        </label>
                      ))}
                    </div>

                    {/* Postgraduate */}
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 mt-1.5">
                      <input
                        type="checkbox"
                        checked={selectedAcademicLevels.includes('Postgraduate')}
                        onChange={(e) => handleAcademicLevelChange('Postgraduate', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                      />
                      <span className="text-sm text-slate-600">Postgraduate</span>
                    </label>

                    {/* Senior Academic */}
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={selectedAcademicLevels.includes('Senior Academic')}
                        onChange={(e) => handleAcademicLevelChange('Senior Academic', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                      />
                      <span className="text-sm text-slate-600">Senior Academic</span>
                    </label>
                  </div>

                  {/* Industry Parent */}
                  <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border-t border-slate-200 mt-2 pt-2">
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes('Industry')}
                      onChange={(e) => handleIndustryChange(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#00a8e8] cursor-pointer"
                    />
                    <span className="text-sm font-bold text-[#041124]">Industry</span>
                  </label>
                </div>
              </div>

              {/* Institution Filter - Shows when at least one student has institution data */}
              {activeUniversities.length > 0 && (
                <div className="mb-8 border-t border-slate-300 pt-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">📍 Filter by Institution</label>
                  <select
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    className="w-full bg-blue-50 text-sm border-2 border-[#00a8e8] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00a8e8] transition-colors font-medium"
                  >
                    <option value="All">All Institutions</option>
                    {activeUniversities.map((uni) => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Executive Committee Only Checkbox */}
              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={executiveOnly}
                    onChange={(e) => setExecutiveOnly(e.target.checked)}
                    className="w-4 h-4 text-[#00a8e8] border-slate-200 rounded cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-600">Executive Committee Only</span>
                </label>
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
                          <div className="flex items-start gap-4 mb-5">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 border border-slate-200 font-bold text-sm flex-shrink-0">
                              {getInitials(member.full_name)}
                            </div>
                            <div className="min-w-0 flex-grow">
                              <h3 className="text-base font-bold text-[#041124] leading-tight truncate">
                                {member.full_name || 'Anonymous Member'}
                              </h3>
                              <span className="text-xs text-slate-500 mt-1 block">{member.member_type} Affiliate</span>
                            </div>
                          </div>

                          {/* Info Rows */}
                          <div className="space-y-2.5 mt-4">
                            <div className="flex items-center gap-2.5 text-sm text-slate-600">
                              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            
                            {/* Institution */}
                            {member.institution && (
                              <div className="text-sm text-slate-600 pl-6">
                                <span className="font-medium">{member.institution}</span>
                                {member.member_type === 'Student' && member.academic_year && (
                                  <span className="text-slate-500"> • {member.academic_year}</span>
                                )}
                              </div>
                            )}

                            {/* Description */}
                            {member.description && (
                              <div className="text-sm text-slate-600 pl-6">
                                <p className="italic text-slate-700">{member.description}</p>
                              </div>
                            )}
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