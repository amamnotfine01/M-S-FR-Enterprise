import React, { useState } from 'react';
import { Layers, CreditCard, FileText, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Language, OFFICIAL_COMPANY_INFO } from '../data/companyData';

interface HeroArchitecturalShowcaseProps {
  lang: Language;
  onOpenCredentialsModal: (initialTab: 'letterhead' | 'card') => void;
}

export const FREnterpriseEmblem: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="M/S FR Enterprise Official Emblem">
    <circle cx="60" cy="60" r="56" stroke="#14532D" strokeWidth="3.5" fill="#FFFFFF" />
    <circle cx="60" cy="60" r="50" stroke="#166534" strokeWidth="1.5" strokeDasharray="180 12" />
    <path
      d="M30 34H66V44H42V54H60V63H42V82H30V34Z"
      fill="#111827"
    />
    <path
      d="M54 34H78C86.5 34 92 39.2 92 47.5C92 54.2 87.8 58.8 81.2 60.4L93 82H80L69.5 61.5H64V82H54V34ZM64 43.5V53H75.5C79.2 53 81.5 50.8 81.5 48.2C81.5 45.5 79.2 43.5 75.5 43.5H64Z"
      fill="#15803D"
    />
    <path d="M26 68L68 42L72 48L30 74Z" fill="#15803D" />
    <text
      x="60"
      y="98"
      textAnchor="middle"
      fill="#111827"
      fontSize="11.5"
      fontWeight="700"
      fontFamily="Plus Jakarta Sans, sans-serif"
      letterSpacing="0.04em"
    >
      Enterprise
    </text>
  </svg>
);

export const HeroArchitecturalShowcase: React.FC<HeroArchitecturalShowcaseProps> = ({
  lang,
  onOpenCredentialsModal,
}) => {
  const [activeView, setActiveView] = useState<'materials' | 'card'>('materials');

  const heroMaterials = [
    {
      title: lang === 'en' ? 'BSRM / AKS / KSRM 500W Rod' : 'BSRM / AKS / KSRM রড',
      sub: lang === 'en' ? '8mm – 32mm Deformed Bar' : '৮ মিমি – ৩২ মিমি টিএমটি রড',
      img: '/images/materials/rebar.jpg',
    },
    {
      title: lang === 'en' ? 'OPC & PCC Cement (50kg)' : 'ওপিসি ও পিসিসি সিমেন্ট',
      sub: lang === 'en' ? 'Shah · Holcim · Crown · Seven Rings' : 'শাহ্ · হোলসিম · ক্রাউন · সেভেন রিংস',
      img: '/images/materials/cement.jpg',
    },
    {
      title: lang === 'en' ? '3/4" Boulder Stone Chips' : '৩/৪" বোল্ডার পাথর চিপস',
      sub: lang === 'en' ? 'Sylhet & Imported LC Stone' : 'সিলেট ও আমদানিকৃত এলসি পাথর',
      img: '/images/materials/stone_chips.jpg',
    },
    {
      title: lang === 'en' ? 'Sylhet Sand & Auto Bricks' : 'সিলেট বালু ও ১নং ভাটার ইট',
      sub: lang === 'en' ? 'FM 2.5+ Red Sand & A-Grade Bricks' : 'সিলেট লাল বালু ও ১নং অটো ইট',
      img: '/images/materials/bricks.jpg',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-white rounded-xl border border-slate-800 overflow-hidden shadow-sm">
      {/* Top interactive mode selector bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveView('materials')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeView === 'materials'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Materials Showcase' : 'মালামাল গ্যালারি'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('card')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeView === 'card'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Visiting Card' : 'ভিজিটিং কার্ড'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenCredentialsModal(activeView === 'card' ? 'card' : 'letterhead')
          }
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Official Pad' : 'অফিসিয়াল প্যাড'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main viewport canvas */}
      <div className="flex-1 p-5 flex flex-col justify-center relative">
        {activeView === 'materials' && (
          <div className="space-y-4">
            {/* 2x2 High-Impact Real Material Photo Grid */}
            <div className="grid grid-cols-2 gap-3">
              {heroMaterials.map((mat) => (
                <a
                  key={mat.title}
                  href="#materials-gallery"
                  className="group relative rounded-lg overflow-hidden border border-slate-800 aspect-4/3 bg-slate-950 block"
                >
                  <img
                    src={mat.img}
                    alt={mat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-3">
                    <div className="text-xs font-bold text-white leading-tight">
                      {mat.title}
                    </div>
                    <div className="text-[11px] text-emerald-300 mt-0.5 truncate">
                      {mat.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Technical Spec Summary Strip */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
                <div className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Primary Scope' : 'ব্যবসার ধরন'}
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  {lang === 'en' ? 'Contractor & Supplier' : 'ঠিকাদার ও সরবরাহকারী'}
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
                <div className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Proprietor' : 'প্রোপ্রাইটর'}
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  {OFFICIAL_COMPANY_INFO.proprietor[lang]}
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5">
                <div className="text-[11px] text-slate-400">
                  {lang === 'en' ? 'Start Date' : 'ব্যবসা শুরু'}
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                  {OFFICIAL_COMPANY_INFO.startDate[lang]}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'card' && (
          <div className="space-y-4">
            {/* Digital Replica of the Official M/S FR Enterprise Business Card (Page 2 of PDF) */}
            <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 relative">
              <div className="p-6 pb-5 flex items-start justify-between gap-4">
                <FREnterpriseEmblem className="w-20 h-20 shrink-0" />
                <div className="text-right">
                  <div className="text-xl font-bold italic text-rose-950 tracking-tight font-serif">
                    Faysal Rahman
                  </div>
                  <div className="text-sm italic text-slate-700 font-serif mb-2">
                    Proprietor
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 font-mono-num">
                    <Phone className="w-4 h-4 text-rose-700 shrink-0" />
                    <div className="text-right leading-snug">
                      <div>01911-582468</div>
                      <div>01534-590017</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-serif italic">
                  <span className="text-base font-semibold not-italic mr-1.5 text-slate-700">M/s.</span>
                  <span className="text-emerald-950">FR Enterprise</span>
                </div>
              </div>

              <div className="bg-[#84A97C] border-t-4 border-emerald-900 px-6 py-4 flex items-center justify-between gap-4 text-slate-950">
                <div className="space-y-1.5 text-xs sm:text-sm font-semibold">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-800 shrink-0 mt-0.5" />
                    <div>
                      <div>55/C S.M Maleh Road, Tanbazar</div>
                      <div>Narayanganj-1400 Bangladesh.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-800 shrink-0" />
                    <span className="font-mono-num">faysalrahat@gmail.com</span>
                  </div>
                </div>

                <div className="bg-white p-2 rounded border border-slate-300 shrink-0">
                  <svg viewBox="0 0 64 64" className="w-14 h-14" fill="#0F172A">
                    <path d="M4 4h20v20H4V4zm4 4v12h12V8H8zm4 4h4v4h-4v-4zm28-8h20v20H40V4zm4 4v12h12V8H44zm4 4h4v4h-4v-4zM4 40h20v20H4V40zm4 4v12h12V44H8zm4 4h4v4h-4v-4zm16-40h4v4h-4V8zm4 8h4v8h-4v-8zm-4 12h8v4h-8v-4zm12 4h8v4h-8v-4zm-16 8h4v8h-4v-8zm8 4h8v8h-8v-8zm12-4h8v12h-8V40zm12 8h4v12h-4V48zm-16 8h12v4H40v-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                {lang === 'en'
                  ? 'Official M/S FR Enterprise business card'
                  : 'এম/এস এফআর এন্টারপ্রাইজ-এর অফিসিয়াল ভিজিটিং কার্ড'}
              </span>
              <button
                type="button"
                onClick={() => onOpenCredentialsModal('letterhead')}
                className="text-emerald-400 hover:underline font-medium"
              >
                {lang === 'en' ? 'View Official Pad →' : 'অফিসিয়াল প্যাড দেখুন →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar inside Showcase Card */}
      <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-400">
        <span>55/C S.M. Maleh Road, Tanbazar, Narayanganj-1400</span>
        <span className="font-mono-num text-slate-300">
          {lang === 'en' ? 'Since June 2022' : 'জুন ২০২২ হতে'}
        </span>
      </div>
    </div>
  );
};
