import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  User, Mail, Lock, GraduationCap, Loader2, ArrowRight, ArrowLeft,
  CheckCircle2, AlertCircle, Sparkles, ChevronDown, Building2,
  Briefcase, BookOpen, Award, Users, CreditCard, Shield
} from 'lucide-react';

// ─── MEMBERSHIP CONFIG ───────────────────────────────────────────────────────
const MEMBER_TYPES = [
  {
    value: 'Student',
    label: 'Student Member',
    price: 200,
    period: '/year',
    icon: BookOpen,
    color: '#0ea5e9',
    description: 'Undergrad & postgrad students in OR-related fields.',
    perks: ['Access to student workshops', 'Mentorship pairing', 'Assistant council eligibility'],
  },
  {
    value: 'Associate',
    label: 'Associate Member',
    price: 2500,
    period: '/year',
    icon: Users,
    color: '#06b6d4',
    description: 'Industry enthusiasts with verified interest in optimization.',
    perks: ['Technical council seats', 'Industry event access', 'OR journal digest'],
  },
  {
    value: 'Ordinary',
    label: 'Ordinary Member',
    price: 5000,
    period: '/year',
    icon: Briefcase,
    color: '#00a8e8',
    description: 'Academics in OR and active corporate analysts.',
    perks: ['Full voting privileges', 'Executive candidacy', 'All publications access'],
    popular: true,
  },
  {
    value: 'Life',
    label: 'Life Member',
    price: 25000,
    period: 'one-time',
    icon: Shield,
    color: '#0284c7',
    description: 'Lifelong participation with all Ordinary member rights.',
    perks: ['Permanent membership', 'Full voting & governance', 'All future benefits included'],
  },
  {
    value: 'Corporate',
    label: 'Corporate Member',
    price: 50000,
    period: '/year',
    icon: Building2,
    color: '#0369a1',
    description: 'Commercial firms and government agencies.',
    perks: ['Two official representatives', 'Student recruitment directory', 'Brand visibility at events'],
  },
  {
    value: 'Honorary',
    label: 'Honorary Fellow',
    price: 10000,
    period: 'one-time',
    icon: Award,
    color: '#041124',
    description: 'Exclusively conferred by EC to distinguished pioneers.',
    perks: ['Highest society recognition', 'Lifetime honorary status', 'EC nomination required'],
  },
];

// ─── TYPE-SPECIFIC FIELDS ─────────────────────────────────────────────────────
const TYPE_FIELDS = {
  Student: [
    { name: 'university',   label: 'University / Institution',        placeholder: 'e.g. University of Moratuwa',        type: 'text',     required: true  },
    { name: 'degree',       label: 'Degree Programme',                placeholder: 'e.g. BSc Engineering (OR)',           type: 'text',     required: true  },
    { name: 'year',         label: 'Year of Study',                   placeholder: '',                                    type: 'select',   required: true,  options: ['Year 1','Year 2','Year 3','Year 4','Postgraduate'] },
    { name: 'student_id',   label: 'Student ID',                      placeholder: 'e.g. 20001234',                       type: 'text',     required: true  },
    { name: 'supervisor',   label: 'Supervisor / Lecturer (Optional)', placeholder: 'Name of your academic supervisor',    type: 'text',     required: false },
  ],
  Associate: [
    { name: 'company',      label: 'Organisation / Company',          placeholder: 'e.g. Dialog Axiata PLC',              type: 'text',     required: true  },
    { name: 'job_title',    label: 'Job Title',                       placeholder: 'e.g. Data Analyst',                   type: 'text',     required: true  },
    { name: 'industry',     label: 'Industry Sector',                 placeholder: '',                                    type: 'select',   required: true,  options: ['Logistics & Supply Chain','Banking & Finance','Energy & Utilities','Healthcare','Telecommunications','Manufacturing','Government','Consulting','Other'] },
    { name: 'experience',   label: 'Years of Experience',             placeholder: '',                                    type: 'select',   required: true,  options: ['0–2 years','3–5 years','6–10 years','10+ years'] },
    { name: 'linkedin',     label: 'LinkedIn Profile (Optional)',     placeholder: 'https://linkedin.com/in/...',          type: 'url',      required: false },
  ],
  Ordinary: [
    { name: 'affiliation',     label: 'University / Organisation',    placeholder: 'e.g. University of Colombo',          type: 'text',     required: true  },
    { name: 'designation',     label: 'Designation / Title',          placeholder: 'e.g. Senior Lecturer',                type: 'text',     required: true  },
    { name: 'specialisation',  label: 'OR Specialisation',            placeholder: '',                                    type: 'select',   required: true,  options: ['Linear Programming','Simulation','Stochastic Modelling','Machine Learning / AI','Network Optimisation','Game Theory','Multi-Criteria Decision Making','Other'] },
    { name: 'publications',    label: 'No. of OR Publications',       placeholder: '',                                    type: 'select',   required: true,  options: ['None','1–5','6–15','16+'] },
    { name: 'orcid',           label: 'ORCID / ResearchGate (Optional)', placeholder: 'https://orcid.org/...',            type: 'url',      required: false },
  ],
  Life: [
    { name: 'affiliation',     label: 'University / Organisation',    placeholder: 'e.g. University of Peradeniya',       type: 'text',     required: true  },
    { name: 'designation',     label: 'Designation / Title',          placeholder: 'e.g. Professor',                      type: 'text',     required: true  },
    { name: 'specialisation',  label: 'OR Specialisation',            placeholder: '',                                    type: 'select',   required: true,  options: ['Linear Programming','Simulation','Stochastic Modelling','Machine Learning / AI','Network Optimisation','Game Theory','Multi-Criteria Decision Making','Other'] },
    { name: 'years_in_field',  label: 'Years in OR Field',            placeholder: '',                                    type: 'select',   required: true,  options: ['1–5 years','6–10 years','11–20 years','20+ years'] },
    { name: 'prev_membership', label: 'Previous ORSSL Membership?',   placeholder: '',                                    type: 'select',   required: false, options: ['No','Yes – Ordinary','Yes – Associate','Yes – Other'] },
  ],
  Corporate: [
    { name: 'org_name',    label: 'Organisation Name',                placeholder: 'e.g. MAS Holdings (Pvt) Ltd',         type: 'text',     required: true  },
    { name: 'reg_number',  label: 'Registration Number',              placeholder: 'e.g. PV 00012345',                    type: 'text',     required: true  },
    { name: 'sector',      label: 'Industry Sector',                  placeholder: '',                                    type: 'select',   required: true,  options: ['Apparel & Textiles','Logistics & Supply Chain','Banking & Finance','Energy & Utilities','Healthcare','Telecommunications','Manufacturing','Government / SOE','Consulting','Other'] },
    { name: 'rep1_name',   label: 'Representative 1 – Name',          placeholder: 'Full name',                           type: 'text',     required: true  },
    { name: 'rep1_email',  label: 'Representative 1 – Email',         placeholder: 'email@company.com',                   type: 'email',    required: true  },
    { name: 'rep2_name',   label: 'Representative 2 – Name (Optional)', placeholder: 'Full name',                         type: 'text',     required: false },
    { name: 'rep2_email',  label: 'Representative 2 – Email (Optional)', placeholder: 'email@company.com',                type: 'email',    required: false },
  ],
  Honorary: [
    { name: 'affiliation',   label: 'Institution / Organisation',     placeholder: 'e.g. University of Kelaniya',         type: 'text',     required: true  },
    { name: 'designation',   label: 'Designation / Title',            placeholder: 'e.g. Emeritus Professor',             type: 'text',     required: true  },
    { name: 'contribution',  label: 'Key Contribution to OR',         placeholder: 'Describe your significant contribution to OR in Sri Lanka', type: 'textarea', required: true },
    { name: 'nominated_by',  label: 'Nominated by (EC Member)',       placeholder: 'Name of EC member nominating you',    type: 'text',     required: true  },
  ],
};

// ─── PAYHERE PLACEHOLDERS — replace these when you integrate ─────────────────
const PAYHERE_CONFIG = {
  merchantId:  'YOUR_MERCHANT_ID',   // TODO: replace with your PayHere Merchant ID
  notifyUrl:   'YOUR_NOTIFY_URL',    // TODO: e.g. https://yourdomain.com/api/payhere-notify
  returnUrl:   'YOUR_RETURN_URL',    // TODO: e.g. https://yourdomain.com/register/success
  cancelUrl:   'YOUR_CANCEL_URL',    // TODO: e.g. https://yourdomain.com/register/cancel
  sandbox:     true,                 // TODO: set to false in production
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
* { box-sizing: border-box; }

.reg-input, .reg-select, .reg-textarea {
  width: 100%; background: #fff; color: #0f172a;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-size: 0.875rem; font-family: 'DM Sans', sans-serif;
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.reg-input, .reg-select { padding: 10px 14px 10px 40px; }
.reg-select { appearance: none; cursor: pointer; padding-right: 36px; }
.reg-textarea { padding: 10px 14px; resize: vertical; min-height: 80px; }
.reg-input::placeholder, .reg-textarea::placeholder { color: #94a3b8; }
.reg-input:focus, .reg-select:focus, .reg-textarea:focus {
  border-color: #00a8e8; box-shadow: 0 0 0 3px rgba(0,168,232,0.10);
}
.reg-label {
  display: block; font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin-bottom: 5px;
}
.input-wrap { position: relative; }
.input-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: #94a3b8; pointer-events: none; transition: color 0.2s;
}
.input-wrap:focus-within .input-icon { color: #00a8e8; }
.select-wrap { position: relative; }
.select-wrap::after {
  content: ''; position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
  width: 0; height: 0; pointer-events: none;
  border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 5px solid #94a3b8;
}

.plan-card {
  border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px;
  cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  background: #fff; position: relative;
}
.plan-card:hover { border-color: #00a8e8; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,168,232,0.10); }
.plan-card.selected { border-color: #00a8e8; box-shadow: 0 0 0 3px rgba(0,168,232,0.12); }
.plan-card.popular::before {
  content: 'Popular'; position: absolute; top: -10px; right: 14px;
  background: #00a8e8; color: #fff; font-size: 0.6rem; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 10px; border-radius: 20px;
}

.step-dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 800; border: 2px solid #e2e8f0;
  background: #fff; color: #94a3b8; transition: all 0.3s; flex-shrink: 0;
}
.step-dot.active { border-color: #00a8e8; background: #00a8e8; color: #fff; }
.step-dot.done   { border-color: #00a8e8; background: #e0f4fd; color: #00a8e8; }
.step-line { flex: 1; height: 2px; background: #e2e8f0; transition: background 0.3s; }
.step-line.done  { background: #00a8e8; }

.primary-btn {
  background: #00a8e8; color: #fff; font-family: 'DM Sans', sans-serif;
  font-weight: 700; font-size: 0.875rem; border: none; border-radius: 11px;
  padding: 12px 24px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(0,168,232,0.22);
}
.primary-btn:hover:not(:disabled) { background: #0090c7; transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0,168,232,0.28); }
.primary-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.ghost-btn {
  background: transparent; color: #64748b; font-family: 'DM Sans', sans-serif;
  font-weight: 600; font-size: 0.875rem; border: 1.5px solid #e2e8f0;
  border-radius: 11px; padding: 12px 20px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;
}
.ghost-btn:hover { border-color: #00a8e8; color: #00a8e8; }

.payhere-btn {
  width: 100%; background: #041124; color: #fff; font-family: 'DM Sans', sans-serif;
  font-weight: 700; font-size: 0.9rem; border: none; border-radius: 11px;
  padding: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(4,17,36,0.20);
}
.payhere-btn:hover:not(:disabled) { background: #0a2040; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(4,17,36,0.28); }
.payhere-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.left-panel { background: linear-gradient(160deg, #041124 0%, #082040 100%); position: relative; overflow: hidden; }
.glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; background: #00a8e8; }

.summary-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 0.82rem;
}
.summary-row:last-child { border-bottom: none; }

.notice-box {
  background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px;
  padding: 12px 16px; font-size: 0.8rem; color: #92400e; display: flex; gap: 10px; align-items: flex-start;
}
`;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Register({ setCurrentTab }) {
  const [step, setStep]               = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [account, setAccount]         = useState({ fullName: '', email: '', password: '' });
  const [profile, setProfile]         = useState({});
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const plan   = MEMBER_TYPES.find(t => t.value === selectedType);
  const fields = TYPE_FIELDS[selectedType] || [];

  const handleAccountChange = e => setAccount(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleProfileChange = e => setProfile(p => ({ ...p, [e.target.name]: e.target.value }));

  // Validate account form then move to step 3 — NO Supabase call yet
  const handleAccountNext = (e) => {
    e.preventDefault();
    if (account.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError(null);
    setStep(3);
  };

  // Validate profile then move to step 4 — still NO Supabase call
  const handleProfileNext = (e) => {
    e.preventDefault();
    setError(null);
    setStep(4);
  };

  // ── Called AFTER PayHere confirms payment ─────────────────────────────────
  // This is where we finally create the Supabase auth account + insert the profile row.
  // Wire this up inside your payhere.onCompleted callback.
  const saveToDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create auth account
      const { data, error: authErr } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: {
            full_name:   account.fullName,
            member_type: selectedType,
          }
        }
      });
      if (authErr) throw authErr;

      const userId = data?.user?.id;

      // 2. Insert profile row — table must exist (see SQL in README)
      const { error: dbErr } = await supabase
        .from('member_profiles')
        .insert({
          user_id:     userId,
          full_name:   account.fullName,
          email:       account.email,
          member_type: selectedType,
          payment_status: 'paid',
          ...profile,
        });
      if (dbErr) throw dbErr;

      setStep(5); // success screen
    } catch (err) {
      setError('Payment succeeded but we could not save your profile: ' + err.message + '. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  // ── PayHere trigger ───────────────────────────────────────────────────────
  const handlePayHere = () => {
    if (!plan) return;
    setError(null);

    const orderId = `ORSSL-${Date.now()}`;

    const payment = {
      sandbox:     PAYHERE_CONFIG.sandbox,
      merchant_id: PAYHERE_CONFIG.merchantId,
      return_url:  PAYHERE_CONFIG.returnUrl,
      cancel_url:  PAYHERE_CONFIG.cancelUrl,
      notify_url:  PAYHERE_CONFIG.notifyUrl,
      order_id:    orderId,
      items:       `ORSSL ${plan.label}`,
      amount:      plan.price.toFixed(2),
      currency:    'LKR',
      first_name:  account.fullName.split(' ')[0] || account.fullName,
      last_name:   account.fullName.split(' ').slice(1).join(' ') || '.',
      email:       account.email,
      phone:       profile.phone || '0700000000',
      address:     'Sri Lanka',
      city:        'Colombo',
      country:     'Sri Lanka',
    };

    if (window.payhere) {
      window.payhere.onCompleted = async function() {
        // Payment confirmed → NOW save everything to Supabase
        await saveToDatabase();
      };
      window.payhere.onDismissed = function() {
        setError('Payment was cancelled. Your account has not been created. You can try again.');
      };
      window.payhere.onError = function(err) {
        setError('PayHere error: ' + err + '. Please try again or contact support.');
      };
      window.payhere.startPayment(payment);
    } else {
      // TODO: remove this block once PayHere script is added to index.html
      setError('PayHere is not yet integrated. Add <script src="https://www.payhere.lk/lib/payhere.js"></script> to your index.html, then replace the placeholders in PAYHERE_CONFIG.');
    }
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="flex-grow w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{CSS}</style>

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* ── LEFT PANEL ── */}
        <div className="left-panel hidden lg:flex flex-col justify-between w-[360px] flex-shrink-0 px-10 py-14">
          <div className="glow w-64 h-64 opacity-10" style={{ top: -60, left: -40 }} />
          <div className="glow w-48 h-48 opacity-[0.06]" style={{ bottom: 40, right: -30 }} />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00a8e8]/30 text-[#00a8e8] text-xs font-bold bg-[#00a8e8]/10 mb-10">
              <Sparkles className="w-3 h-3" /> IFORS & APORS Compliant
            </span>
            <h2 className="text-2xl font-extrabold text-white leading-snug mb-3">
              Join the Operations Research Society of Sri Lanka
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-10">
              Complete the steps on the right to secure your ORSSL membership.
            </p>

            {[
              { n: 1, label: 'Choose your plan' },
              { n: 2, label: 'Create account' },
              { n: 3, label: 'Profile details' },
              { n: 4, label: 'Payment' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-start gap-3 pb-5">
                <div className="flex flex-col items-center">
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${step > s.n ? '#00a8e8' : step === s.n ? '#00a8e8' : 'rgba(255,255,255,0.15)'}`,
                    background: step > s.n ? '#00a8e8' : step === s.n ? 'rgba(0,168,232,0.15)' : 'transparent',
                    color: step >= s.n ? '#00a8e8' : 'rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800, transition: 'all 0.3s',
                  }}>
                    {step > s.n ? <CheckCircle2 style={{ width: 13, height: 13, color: '#fff' }} /> : s.n}
                  </div>
                  {i < 3 && <div style={{ width: 2, height: 28, background: step > s.n ? '#00a8e8' : 'rgba(255,255,255,0.08)', marginTop: 2 }} />}
                </div>
                <div style={{ paddingTop: 3 }}>
                  <p style={{
                    fontSize: '0.82rem', fontWeight: 600,
                    color: step === s.n ? '#fff' : step > s.n ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)',
                  }}>{s.label}</p>
                  {step === s.n && plan && s.n > 1 && (
                    <p style={{ fontSize: '0.7rem', color: '#00a8e8', marginTop: 2 }}>{plan.label}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[['240+','Members'],['12','Universities'],['6','Tiers']].map(([v,l]) => (
              <div key={l}>
                <p className="text-xl font-extrabold text-[#00a8e8]">{v}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — FORM ── */}
        <div className="flex-grow bg-[#f8fafc] px-4 py-12 overflow-y-auto">
          <div className="w-full max-w-[600px] mx-auto">

            {/* Step indicator */}
            {step < 5 && (
              <div className="flex items-center gap-0 mb-8">
                {[1,2,3,4].map((n, i) => (
                  <React.Fragment key={n}>
                    <div className={`step-dot ${step === n ? 'active' : step > n ? 'done' : ''}`}>
                      {step > n ? <CheckCircle2 style={{ width: 13, height: 13 }} /> : n}
                    </div>
                    {i < 3 && <div className={`step-line ${step > n ? 'done' : ''}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* ── STEP 1: PLAN ── */}
            {step === 1 && (
              <div>
                <p className="text-[#00a8e8] text-xs font-bold uppercase tracking-widest mb-2">Step 1 of 4</p>
                <h1 className="text-2xl font-extrabold text-[#041124] mb-1">Choose your membership</h1>
                <p className="text-sm text-slate-500 mb-8">All prices are in Sri Lankan Rupees (LKR).</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {MEMBER_TYPES.map(t => {
                    const Icon = t.icon;
                    return (
                      <div key={t.value}
                        className={`plan-card ${t.popular ? 'popular' : ''} ${selectedType === t.value ? 'selected' : ''}`}
                        onClick={() => setSelectedType(t.value)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon style={{ width: 18, height: 18, color: t.color }} strokeWidth={1.8} />
                          </div>
                          {selectedType === t.value && <CheckCircle2 style={{ width: 18, height: 18, color: '#00a8e8' }} />}
                        </div>
                        <p className="text-sm font-bold text-[#041124] mb-0.5">{t.label}</p>
                        <p className="text-xs text-slate-500 mb-3 leading-relaxed">{t.description}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-[#041124]">Rs {t.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-400">{t.period}</span>
                        </div>
                        <ul className="mt-3 space-y-1">
                          {t.perks.map(p => (
                            <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button className="primary-btn" disabled={!selectedType}
                    onClick={() => { setError(null); setStep(2); }}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: ACCOUNT ── */}
            {step === 2 && (
              <form onSubmit={handleAccountNext}>
                <p className="text-[#00a8e8] text-xs font-bold uppercase tracking-widest mb-2">Step 2 of 4</p>
                <h1 className="text-2xl font-extrabold text-[#041124] mb-1">Create your account</h1>
                <p className="text-sm text-slate-500 mb-2">
                  Signing up as <strong className="text-[#041124]">{plan?.label}</strong> —{' '}
                  <span style={{ color: '#00a8e8', fontWeight: 700 }}>Rs {plan?.price.toLocaleString()} {plan?.period}</span>
                </p>

                {/* Notice: account created only after payment */}
                <div className="notice-box mb-6">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <span>Your account will only be created in our system <strong>after payment is completed.</strong> No data is stored until then.</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="reg-label">Full Name</label>
                    <div className="input-wrap">
                      <User className="input-icon w-4 h-4" />
                      <input type="text" name="fullName" required value={account.fullName}
                        onChange={handleAccountChange} placeholder="Prof. / Dr. / Mr. / Ms." className="reg-input" />
                    </div>
                  </div>
                  <div>
                    <label className="reg-label">Email Address</label>
                    <div className="input-wrap">
                      <Mail className="input-icon w-4 h-4" />
                      <input type="email" name="email" required value={account.email}
                        onChange={handleAccountChange} placeholder="name@example.com" className="reg-input" />
                    </div>
                  </div>
                  <div>
                    <label className="reg-label">Password</label>
                    <div className="input-wrap">
                      <Lock className="input-icon w-4 h-4" />
                      <input type="password" name="password" required value={account.password}
                        onChange={handleAccountChange} placeholder="Min. 8 characters" className="reg-input" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button type="button" className="ghost-btn" onClick={() => { setError(null); setStep(1); }}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="mt-5 text-center text-sm text-slate-500">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setCurrentTab('login')}
                    className="text-[#00a8e8] hover:underline font-semibold">Sign In</button>
                </p>
              </form>
            )}

            {/* ── STEP 3: PROFILE ── */}
            {step === 3 && (
              <form onSubmit={handleProfileNext}>
                <p className="text-[#00a8e8] text-xs font-bold uppercase tracking-widest mb-2">Step 3 of 4</p>
                <h1 className="text-2xl font-extrabold text-[#041124] mb-1">Your profile details</h1>
                <p className="text-sm text-slate-500 mb-8">
                  Provide your {plan?.label} information for EC verification.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {fields.map(f => (
                    <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                      <label className="reg-label">{f.label}</label>
                      {f.type === 'select' ? (
                        <div className="select-wrap">
                          <select name={f.name} required={f.required} value={profile[f.name] || ''}
                            onChange={handleProfileChange} className="reg-select" style={{ paddingLeft: 14 }}>
                            <option value="">Select…</option>
                            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      ) : f.type === 'textarea' ? (
                        <textarea name={f.name} required={f.required} value={profile[f.name] || ''}
                          onChange={handleProfileChange} placeholder={f.placeholder} className="reg-textarea" />
                      ) : (
                        <div className="input-wrap">
                          <User className="input-icon w-3.5 h-3.5" />
                          <input type={f.type} name={f.name} required={f.required}
                            value={profile[f.name] || ''} onChange={handleProfileChange}
                            placeholder={f.placeholder} className="reg-input" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button type="button" className="ghost-btn" onClick={() => { setError(null); setStep(2); }}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 4: PAYMENT ── */}
            {step === 4 && plan && (
              <div>
                <p className="text-[#00a8e8] text-xs font-bold uppercase tracking-widest mb-2">Step 4 of 4</p>
                <h1 className="text-2xl font-extrabold text-[#041124] mb-1">Complete payment</h1>
                <p className="text-sm text-slate-500 mb-8">
                  Review your order below. Your account will be created once payment is confirmed.
                </p>

                {/* Order summary */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Order Summary</p>
                  <div className="summary-row"><span className="text-slate-500">Membership</span><span className="font-semibold text-[#041124]">{plan.label}</span></div>
                  <div className="summary-row"><span className="text-slate-500">Billing</span><span className="font-semibold text-[#041124]">{plan.period === 'one-time' ? 'One-time payment' : 'Annual'}</span></div>
                  <div className="summary-row"><span className="text-slate-500">Name</span><span className="font-semibold text-[#041124]">{account.fullName}</span></div>
                  <div className="summary-row"><span className="text-slate-500">Email</span><span className="font-semibold text-[#041124]">{account.email}</span></div>
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100">
                    <span className="text-sm font-bold text-[#041124]">Total Due</span>
                    <span className="text-2xl font-extrabold text-[#041124]">
                      Rs {plan.price.toLocaleString()}
                      <span className="text-sm font-normal text-slate-400 ml-1">{plan.period}</span>
                    </span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center gap-3 py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#00a8e8]" />
                    <p className="text-sm text-slate-500">Saving your membership details…</p>
                  </div>
                ) : (
                  <>
                    <button className="payhere-btn" onClick={handlePayHere}>
                      <CreditCard className="w-4 h-4" />
                      Pay Rs {plan.price.toLocaleString()} via PayHere
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                      <Shield className="w-3.5 h-3.5" />
                      Secured by PayHere · SSL encrypted · Account created only after payment
                    </div>
                  </>
                )}

                <div className="flex justify-start mt-6">
                  <button className="ghost-btn" onClick={() => { setError(null); setStep(3); }} disabled={loading}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 5: SUCCESS ── */}
            {step === 5 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#041124] mb-2">You're registered!</h1>
                <p className="text-sm text-slate-500 mb-2">
                  Your <strong className="text-[#041124]">{plan?.label}</strong> membership has been activated.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                  Check your email at <strong className="text-[#041124]">{account.email}</strong> to verify your account.
                </p>
                <button className="primary-btn mx-auto" onClick={() => setCurrentTab('login')}>
                  Go to Sign In <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}