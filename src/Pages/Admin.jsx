import React from 'react';

export default function Admin() {
  const councilTiers = [
    {
      title: "Executive Officers",
      roles: [
        { 
          position: "President", 
          name: "Prof. Wasantha Daundasekara", 
          description: "Senior Professor in Mathematics",
          institution: "University of Peradeniya"
        },
        { 
          position: "Vice-President", 
          name: "Dr. Asela Perera", 
          description: "Lead Operations Research Analyst",
          institution: "Corporate Analytics Sector"
        },
        { 
          position: "General Secretary", 
          name: "Dr. Tharindu Dewasurendra", 
          description: "Senior Lecturer in Mathematics",
          institution: "University of Peradeniya"
        },
        { 
          position: "Treasurer", 
          name: "Dr. Ruwan Jayasinghe", 
          description: "Senior Lecturer in Statistics",
          institution: "University of Peradeniya"
        }
      ]
    },
    {
      title: "Operational & Technical Council",
      roles: [
        { 
          position: "Webmaster & Head of Digital Infrastructure", 
          name: "Mr. Kasun Fernando", 
          description: "Senior Software Engineer",
          institution: "Tech Industry"
        },
        { 
          position: "Assistant Secretary", 
          name: "Ms. Chamodhi Silva", 
          description: "Postgraduate Researcher",
          institution: "University of Peradeniya"
        },
        { 
          position: "Assistant Treasurer", 
          name: "Mr. Sithum Bandara", 
          description: "Financial Analyst",
          institution: "Corporate Sector"
        },
        { 
          position: "Editor & Publications Chair", 
          name: "Dr. Menaka Ranasinghe", 
          description: "Senior Lecturer in Computer Science",
          institution: "University of Peradeniya"
        }
      ]
    },
    {
      title: "General Committee Members",
      roles: [
        { 
          position: "General Committee Member", 
          name: "Dr. Chathura Rajapakse", 
          description: "Industrial Mathematics Professional",
          institution: "Manufacturing Sector"
        },
        { 
          position: "General Committee Member", 
          name: "Dr. Nadeesha Wijesinghe", 
          description: "Supply Chain Analytics Lead",
          institution: "Logistics Industry"
        },
        { 
          position: "General Committee Member", 
          name: "Mrs. Dilini Perera", 
          description: "Operations Manager",
          institution: "Corporate Sector"
        },
        { 
          position: "General Committee Member (Student)", 
          name: "Mr. Janitha Bandara", 
          description: "Undergraduate in Operations Research",
          institution: "University of Peradeniya"
        },
        { 
          position: "General Committee Member (Student)", 
          name: "Ms. Dulmini Silva", 
          description: "Undergraduate in Statistics",
          institution: "University of Peradeniya"
        }
      ]
    }
  ];

  // Helper function to extract initials for the static avatar
  const getInitials = (name) => {
    const cleanName = name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '');
    const parts = cleanName.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return cleanName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Clean Header Block */}
        <div className="mb-12 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Governance & Council
          </h1>
        </div>

        {/* Dynamic Tier Rendering Engine */}
        <div className="space-y-12 mb-16">
          {councilTiers.map((tier, index) => (
            <div key={index} className="space-y-6">
              
              {/* Minimalist Section Title */}
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">{tier.title}</h2>
              </div>

              {/* Static Grid Matrix Layout for Individual Officer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {tier.roles.map((role, rIndex) => (
                  <div 
                    key={rIndex} 
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-start gap-4 shadow-sm"
                  >
                    {/* Static, Professional Initial Avatar */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border bg-slate-50 text-slate-500 border-slate-200 font-bold text-sm">
                      {getInitials(role.name)}
                    </div>

                    <div className="min-w-0 w-full flex flex-col gap-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-normal break-words">
                        {role.position}
                      </span>
                      <span className="block text-[15px] font-bold text-slate-900 leading-tight whitespace-normal break-words mt-0.5">
                        {role.name}
                      </span>
                      <span className="block text-xs text-slate-600 mt-1 leading-snug whitespace-normal break-words">
                        {role.description}
                      </span>
                      <span className="block text-[11px] font-medium text-slate-400 leading-snug whitespace-normal break-words mt-0.5">
                        {role.institution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Plain Text Governance Rules Section */}
        <div className="mt-16 pt-8 border-t border-slate-200 max-w-4xl">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Election & Eligibility Guidelines</h3>
          <ul className="space-y-4 text-sm text-slate-600 list-disc pl-5">
            <li className="leading-relaxed">
              <strong className="text-slate-800 font-semibold">Term Limits:</strong> Elected officers serve a standard two-year term aligned with the calendar year (Jan 1 – Dec 31). Members are eligible for immediate re-election up to three consecutive terms.
            </li>
            <li className="leading-relaxed">
              <strong className="text-slate-800 font-semibold">Democratic Elections:</strong> All executive and operational positions are strictly appointed through a democratic secret ballot conducted during the Annual General Meeting (AGM).
            </li>
            <li className="leading-relaxed">
              <strong className="text-slate-800 font-semibold">Student Representation:</strong> While senior executive roles require academic or corporate validation, a minimum of two (2) General Committee seats are permanently reserved for active university students.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}