import React, { useState } from 'react';
import { ArrowRight, Check, Layers, ShieldCheck, Truck } from 'lucide-react';
import { Language, MATERIAL_RATES, MaterialRateItem } from '../data/companyData';

interface MaterialsShowcaseProps {
  lang: Language;
  onSelectMaterialForQuote: (materialName: string, selectedBrandOrSize: string, unit: string, rateBDT: number) => void;
}

export const MaterialFallbackGraphic: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'tmt-rebar-500w':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
          <rect width="400" height="260" fill="#0F172A" />
          {[45, 85, 125, 165, 205].map((y, idx) => (
            <g key={y}>
              <rect x="30" y={y} width="340" height="20" rx="10" fill={idx % 2 === 0 ? '#475569' : '#64748B'} />
              {[60, 100, 140, 180, 220, 260, 300, 340].map((x) => (
                <line key={x} x1={x} y1={y} x2={x - 8} y2={y + 20} stroke="#1E293B" strokeWidth="3" />
              ))}
            </g>
          ))}
          <rect x="24" y="20" width="170" height="28" rx="4" fill="#065F46" />
          <text x="34" y="38" fill="#ECFDF5" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">
            500W TMT DEFORMED BAR
          </text>
        </svg>
      );
    case 'opc-cement':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
          <rect width="400" height="260" fill="#1E293B" />
          <rect x="60" y="50" width="130" height="165" rx="8" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          <rect x="75" y="85" width="100" height="50" fill="#065F46" rx="4" />
          <text x="125" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
            OPC 52.5N
          </text>
          <rect x="210" y="65" width="130" height="150" rx="8" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
          <rect x="225" y="95" width="100" height="50" fill="#1E3A8A" rx="4" />
          <text x="275" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
            PCC 42.5N
          </text>
        </svg>
      );
    case 'stone-chips-3-4':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
          <rect width="400" height="260" fill="#1E293B" />
          <polygon points="60,210 140,90 230,210" fill="#64748B" />
          <polygon points="150,210 250,70 350,210" fill="#475569" />
          <polygon points="90,220 200,110 310,220" fill="#94A3B8" />
        </svg>
      );
    case 'sylhet-sand':
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
          <rect width="400" height="260" fill="#451A03" />
          <path d="M20 220 Q200 60 380 220 Z" fill="#D97706" />
          <path d="M80 220 Q240 95 390 220 Z" fill="#B45309" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 260" className="w-full h-full" fill="none">
          <rect width="400" height="260" fill="#431407" />
          {[60, 110, 160].map((y, row) =>
            [50, 145, 240].map((x) => (
              <rect
                key={`${x}-${y}`}
                x={x + (row % 2 === 1 ? 25 : 0)}
                y={y}
                width="85"
                height="40"
                rx="3"
                fill="#B91C1C"
                stroke="#7F1D1D"
                strokeWidth="2"
              />
            ))
          )}
        </svg>
      );
  }
};

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({
  lang,
  onSelectMaterialForQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'steel' | 'cement' | 'aggregate' | 'masonry'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredMaterials =
    activeCategory === 'all'
      ? MATERIAL_RATES
      : MATERIAL_RATES.filter((m) => m.category === activeCategory);

  const handleQuickQuote = (item: MaterialRateItem) => {
    onSelectMaterialForQuote(
      item.name.en,
      item.brands.en,
      item.unit.en,
      item.indicativeRateBDT
    );
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2200);
  };

  return (
    <section id="materials-gallery" className="py-16 lg:py-20 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Section Header & Interactive Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-emerald-800 tracking-wide">
              {lang === 'en'
                ? 'CONSTRUCTION MATERIALS & WHOLESALE SUPPLY CATALOG'
                : 'নির্মাণ সামগ্রী ও পাইকারি সরবরাহ ক্যাটালগ'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {lang === 'en'
                ? 'BSRM / AKS / KSRM Rebar, Cement, Crushed Stone, Sylhet Sand & Auto-Kiln Bricks'
                : 'BSRM / AKS / KSRM রড, সিমেন্ট, পাথর চিপস, সিলেট বালু ও ১নং ভাটার ইট সরবরাহ'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'en'
                ? 'Every batch is dispatched directly from authorized mill depots and our Tanbazar hub (55/C S.M. Maleh Road, Narayanganj-1400) with digital weighbridge verification.'
                : 'নারায়ণগঞ্জের টানবাজার ডিপো (৫৫/সি এস.এম. মালেহ রোড) এবং অনুমোদিত কারখানা থেকে ডিজিটাল স্কেলে শতভাগ সঠিক ওজন ও মান নিশ্চিত করে প্রজেক্ট সাইটে সরবরাহ করা হয়।'}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start">
            {[
              { id: 'all', labelEn: 'All Materials (6)', labelBn: 'সকল মালামাল (৬)' },
              { id: 'steel', labelEn: 'BSRM / AKS / KSRM Rod', labelBn: 'রড (BSRM/AKS/KSRM)' },
              { id: 'cement', labelEn: 'OPC & PCC Cement', labelBn: 'সিমেন্ট (OPC/PCC)' },
              { id: 'aggregate', labelEn: 'Stone Chips & Sand', labelBn: 'পাথর চিপস ও বালু' },
              { id: 'masonry', labelEn: 'Bricks & Blocks', labelBn: 'ভাটার ইট ও ব্লক' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    tab.id as 'all' | 'steel' | 'cement' | 'aggregate' | 'masonry'
                  )
                }
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Visual Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => {
            const isFailed = failedImages[item.id];
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* 4:3 Image Container with Measured Scrim & Resilient Fallback */}
                  <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                    {!isFailed ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name[lang]}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <MaterialFallbackGraphic id={item.id} />
                    )}

                    {/* Bottom Measured Contrast Scrim for Quantitative Rate Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-end justify-between gap-2 text-white">
                        <div>
                          <div className="text-[11px] text-slate-300 font-medium">
                            {lang === 'en' ? 'Indicative Depot Rate' : 'সম্ভাব্য পাইকারি দর'}
                          </div>
                          <div className="text-lg font-extrabold font-mono-num text-emerald-400">
                            ৳{item.indicativeRateBDT.toLocaleString()}{' '}
                            <span className="text-xs font-normal text-slate-200">
                              / {item.unit[lang]}
                            </span>
                          </div>
                        </div>
                        <div className="text-right font-mono-num text-xs text-slate-200">
                          Min: {item.minOrder}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 space-y-3.5">
                    {/* Unboxed Metadata: Brands */}
                    <div className="text-xs font-semibold text-emerald-800 leading-snug">
                      {item.brands[lang]}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.name[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.specification[lang]}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-start gap-2 text-slate-700">
                        <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900">
                            {lang === 'en' ? 'Sizes / Grades:' : 'সাইজ ও গ্রেড:'}
                          </strong>{' '}
                          {item.sizesOrGrades[lang]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>
                          {lang === 'en'
                            ? '100% Digital Weighbridge & Quality Verified'
                            : 'ডিজিটাল স্কেলে সঠিক পরিমাপ ও মান পরীক্ষিত'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lang === 'en' ? 'Site Delivery Available' : 'সাইটে ডেলিভারি সুবিধা'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuickQuote(item)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Added to Quote' : 'যুক্ত হয়েছে'}</span>
                      </>
                    ) : (
                      <>
                        <span>{lang === 'en' ? 'Order / Get Rate' : 'দরপত্র ও অর্ডার'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
