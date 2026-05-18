import React from 'react';
import { MapPin, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020a16] border-t border-slate-100/10 text-slate-400 text-sm py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Identity */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg tracking-tight">ORSSL</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Operations Research Society of Sri Lanka. Advancing mathematical optimization, data systems, and algorithmic efficiency nationally.
            </p>
          </div>

          {/* Column 2: Legal Headquarters - Item 2(a) Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Registered Headquarters</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#00a8e8] flex-shrink-0 mt-0.5" />
              <span>
                Department of Mathematics,<br />
                Faculty of Science,<br />
                University of Peradeniya,<br />
                Sri Lanka, 20400.
              </span>
            </div>
          </div>

          {/* Column 3: Digital Access Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Digital Channels</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00a8e8]" />
                <a href="mailto:info@orssl.org.lk" className="hover:text-white transition-colors">info@orssl.org.lk</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#00a8e8]" />
                <a href="https://orssl.org.lk" className="hover:text-white transition-colors">www.orssl.org.lk</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100/5 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500">
          <p>© {currentYear} Operations Research Society of Sri Lanka (ORSSL). All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-slate-600">Formulated for National Registry and APORS/IFORS Compliance.</p>
        </div>
      </div>
    </footer>
  );
}