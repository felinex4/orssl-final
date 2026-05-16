import React from 'react';
import { Mail, FileText, Globe, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030b17] border-t border-white/10 pt-12 pb-6 text-slate-300 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4 pr-8">
            <h4 className="text-white font-bold text-lg">Operations Research Society of Sri Lanka</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              A national scientific body advancing mathematical optimization, analytics and industrial decision science — affiliated with IFORS and APORS.
            </p>
          </div>
          <div>
            <h4 className="text-[#00a8e8] font-semibold text-sm mb-4">Contact</h4>
            <p className="text-sm text-slate-400 flex items-center gap-2"><Mail className="w-4 h-4" /> secretary@orssl.org.lk</p>
          </div>
          <div>
            <h4 className="text-[#00a8e8] font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2 hover:text-[#00a8e8] cursor-pointer"><FileText className="w-4 h-4" /> Constitution & Bylaws</li>
              <li className="flex items-center gap-2 hover:text-[#00a8e8] cursor-pointer"><Globe className="w-4 h-4" /> IFORS Listing</li>
              <li className="flex items-center gap-2 hover:text-[#00a8e8] cursor-pointer"><Building2 className="w-4 h-4" /> Research Repository</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © 2026 ORSSL — All rights reserved. orssl.org.lk
        </div>
      </div>
    </footer>
  );
}