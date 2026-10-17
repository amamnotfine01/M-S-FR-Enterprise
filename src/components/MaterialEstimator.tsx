import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, RotateCcw, Check, Printer } from 'lucide-react';
import { Language, MATERIAL_RATES } from '../data/companyData';

interface MaterialEstimatorProps {
  lang: Language;
  onTransferToInquiry: (summaryText: string) => void;
  onOpenLetterheadWithEstimate: (estimateSummary: {
    mode: string;
    items: { name: string; quantity: string; unit: string; subtotalBDT: number }[];
    totalBDT: number;
  }) => void;
}

type EstimatorMode = 'area' | 'custom';
type StructureType = 'commercial_rcc' | 'industrial_shed' | 'municipal_road';

export const MaterialEstimator: React.FC<MaterialEstimatorProps> = ({
  lang,
  onTransferToInquiry,
  onOpenLetterheadWithEstimate,
}) => {
  const [mode, setMode] = useState<EstimatorMode>('area');
  const [structureType, setStructureType] = useState<StructureType>('commercial_rcc');
  const [areaSqFt, setAreaSqFt] = useState<number>(5000);
  const [floors, setFloors] = useState<number>(3);
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);

  // Custom quantities per material ID
  const [customQty, setCustomQty] = useState<Record<string, number>>({
    'tmt-rebar-500w': 15,
    'opc-cement': 800,
    'stone-chips-3-4': 3500,
    'sylhet-sand': 2000,
    'first-class-bricks': 15,
    'concrete-hollow-blocks': 0,
  });

  const calculatedItems = useMemo(() => {
    if (mode === 'custom') {
      return MATERIAL_RATES.map((mat) => {
        const qty = customQty[mat.id] ?? 0;
        return {
          id: mat.id,
          name: mat.name[lang],
          brands: mat.brands[lang],
          specification: mat.specification[lang],
          imageUrl: mat.imageUrl,
          unit: mat.unit[lang],
          quantity: qty,
          rateBDT: mat.indicativeRateBDT,
          subtotalBDT: Math.round(qty * mat.indicativeRateBDT),
        };
      });
    }

    // Engineering rule-of-thumb BOQ per Sq.Ft for Bangladesh BNBC construction
    const totalBuiltArea =
      structureType === 'municipal_road' ? areaSqFt : areaSqFt * Math.max(1, floors);

    let steelFactorMTPer1000SqFt = 4.2;
    let cementBagsPer1000SqFt = 420;
    let stoneCftPer1000SqFt = 880;
    let sandCftPer1000SqFt = 560;
    let bricksThousandsPer1000SqFt = 14;
    let blocksThousandsPer1000SqFt = 0;

    if (structureType === 'industrial_shed') {
      steelFactorMTPer1000SqFt = 2.8;
      cementBagsPer1000SqFt = 290;
      stoneCftPer1000SqFt = 650;
      sandCftPer1000SqFt = 420;
      bricksThousandsPer1000SqFt = 6.5;
      blocksThousandsPer1000SqFt = 1.5;
    } else if (structureType === 'municipal_road') {
      steelFactorMTPer1000SqFt = 1.9;
      cementBagsPer1000SqFt = 340;
      stoneCftPer1000SqFt = 950;
      sandCftPer1000SqFt = 480;
      bricksThousandsPer1000SqFt = 3.0;
      blocksThousandsPer1000SqFt = 2.0;
    }

    const scale = totalBuiltArea / 1000;
    const computedMap: Record<string, number> = {
      'tmt-rebar-500w': Number((scale * steelFactorMTPer1000SqFt).toFixed(1)),
      'opc-cement': Math.round(scale * cementBagsPer1000SqFt),
      'stone-chips-3-4': Math.round(scale * stoneCftPer1000SqFt),
      'sylhet-sand': Math.round(scale * sandCftPer1000SqFt),
      'first-class-bricks': Number((scale * bricksThousandsPer1000SqFt).toFixed(1)),
      'concrete-hollow-blocks': Number((scale * blocksThousandsPer1000SqFt).toFixed(1)),
    };

    return MATERIAL_RATES.map((mat) => {
      const qty = computedMap[mat.id] ?? 0;
      return {
        id: mat.id,
        name: mat.name[lang],
        brands: mat.brands[lang],
        specification: mat.specification[lang],
        imageUrl: mat.imageUrl,
        unit: mat.unit[lang],
        quantity: qty,
        rateBDT: mat.indicativeRateBDT,
        subtotalBDT: Math.round(qty * mat.indicativeRateBDT),
      };
    });
  }, [mode, structureType, areaSqFt, floors, customQty, lang]);

  const totalEstimatedBDT = useMemo(
    () => calculatedItems.reduce((acc, item) => acc + item.subtotalBDT, 0),
    [calculatedItems]
  );

  const handleApplyToForm = () => {
    const header =
      mode === 'area'
        ? `Project BOQ Estimate (${structureType.replace('_', ' ').toUpperCase()} — ${areaSqFt.toLocaleString()} sq.ft × ${
            structureType === 'municipal_road' ? 1 : floors
          } level(s)):`
        : `Custom Bulk Material Supply Inquiry:`;

    const lines = calculatedItems
      .filter((i) => i.quantity > 0)
      .map(
        (i) =>
          `- ${i.name}: ${i.quantity.toLocaleString()} (${i.unit}) @ Est. ${i.subtotalBDT.toLocaleString()} BDT`
      );

    const summary = `${header}\n${lines.join('\n')}\nIndicative Material Value: BDT ${totalEstimatedBDT.toLocaleString()}`;
    onTransferToInquiry(summary);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2500);
  };

  const handleOpenPrintableEstimate = () => {
    onOpenLetterheadWithEstimate({
      mode:
        mode === 'area'
          ? `${
              structureType === 'commercial_rcc'
                ? 'Commercial / Residential RCC Building'
                : structureType === 'industrial_shed'
                ? 'Industrial Warehouse / Factory Shed'
                : 'Municipal RCC Roadway & Drainage'
            } (${areaSqFt.toLocaleString()} Sq.Ft × ${
              structureType === 'municipal_road' ? 1 : floors
            } Floor(s))`
          : 'Custom Bulk Material Requisition',
      items: calculatedItems
        .filter((i) => i.quantity > 0)
        .map((i) => ({
          name: i.name,
          quantity: i.quantity.toLocaleString(),
          unit: i.unit,
          subtotalBDT: i.subtotalBDT,
        })),
      totalBDT: totalEstimatedBDT,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/70">
        <div>
          <div className="text-xs font-medium text-emerald-800">
            {lang === 'en'
              ? 'INTERACTIVE BOQ & SUPPLY CALCULATOR'
              : 'ইন্টারঅ্যাক্টিভ নির্মাণ সামগ্রী ও বিওকিউ ক্যালকুলেটর'}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {lang === 'en'
              ? 'Estimate Structural Materials & Procurement Budget'
              : 'প্রজেক্টের মালামালের পরিমাণ ও সম্ভাব্য বাজেট হিসাব করুন'}
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMode('area')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              mode === 'area'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'By Project Area (Sq.Ft)' : 'প্রজেক্ট আয়তন অনুযায়ী'}
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              mode === 'custom'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'Direct Material Quantities' : 'সরাসরি মালামালের পরিমাণ'}
          </button>
        </div>
      </div>

      {/* Controls & Output Split */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Columns: Input Parameters */}
        <div className="lg:col-span-5 space-y-5">
          {mode === 'area' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {lang === 'en' ? '1. Select Construction Typology' : '১. নির্মাণের ধরন নির্বাচন করুন'}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      id: 'commercial_rcc' as StructureType,
                      labelEn: 'Multi-Story RCC Commercial / Residential Building',
                      labelBn: 'বহুতল আরসিসি বাণিজ্যিক / আবাসিক ভবন',
                      descEn: 'Standard BNBC column-beam frame & slab casting',
                    },
                    {
                      id: 'industrial_shed' as StructureType,
                      labelEn: 'Industrial Factory Shed & Heavy Warehouse Floor',
                      labelBn: 'ইন্ডাস্ট্রিয়াল ফ্যাক্টরি শেড ও গোডাউন ফ্লোর',
                      descEn: 'High-load RCC floor apron + perimeter retaining wall',
                    },
                    {
                      id: 'municipal_road' as StructureType,
                      labelEn: 'Municipal RCC Roadway, Pavement & Box Drainage',
                      labelBn: 'আরসিসি রাস্তা, পেভমেন্ট ও ড্রেনেজ ওয়ার্কস',
                      descEn: 'Heavy stone aggregate base & 3500+ PSI concrete slab',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStructureType(item.id)}
                      className={`text-left p-3.5 rounded-lg border transition-colors ${
                        structureType === item.id
                          ? 'bg-emerald-50/70 border-emerald-700 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-sm font-semibold">
                        {lang === 'en' ? item.labelEn : item.labelBn}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.descEn}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="area-range" className="text-xs font-semibold text-slate-700">
                    {lang === 'en' ? '2. Footprint Area per Floor (Sq.Ft)' : '২. প্রতি তলার আয়তন (বর্গফুট)'}
                  </label>
                  <span className="text-sm font-bold text-emerald-800 font-mono-num">
                    {areaSqFt.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  id="area-range"
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono-num mt-1">
                  <span>1,000 sq.ft</span>
                  <span>25,000 sq.ft</span>
                  <span>50,000 sq.ft</span>
                </div>
              </div>

              {structureType !== 'municipal_road' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      {lang === 'en' ? '3. Number of Stories / Slabs' : '৩. তলার সংখ্যা (ছাদ)'}
                    </label>
                    <span className="text-sm font-bold text-slate-900 font-mono-num">
                      {floors} {lang === 'en' ? 'Floor(s)' : 'তলা'} (
                      {(areaSqFt * floors).toLocaleString()} sq.ft total)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFloors(num)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-md border font-mono-num transition-colors ${
                          floors === num
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        G+{num - 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {lang === 'en'
                    ? 'Enter Required Bulk Quantities'
                    : 'প্রয়োজনীয় মালামালের পরিমাণ লিখুন'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCustomQty({
                      'tmt-rebar-500w': 15,
                      'opc-cement': 800,
                      'stone-chips-3-4': 3500,
                      'sylhet-sand': 2000,
                      'first-class-bricks': 15,
                      'concrete-hollow-blocks': 0,
                    })
                  }
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Reset' : 'রিসেট'}</span>
                </button>
              </div>

              {MATERIAL_RATES.map((mat) => (
                <div
                  key={mat.id}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={mat.imageUrl}
                      alt={mat.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover shrink-0 border border-slate-200 bg-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {mat.name[lang]}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-num">
                        {mat.unit[lang]} · Min: {mat.minOrder}
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={0}
                    step={mat.id === 'tmt-rebar-500w' ? 1 : 50}
                    value={customQty[mat.id] ?? 0}
                    onChange={(e) =>
                      setCustomQty((prev) => ({
                        ...prev,
                        [mat.id]: Math.max(0, Number(e.target.value)),
                      }))
                    }
                    className="w-24 px-2.5 py-1.5 text-right text-sm font-semibold font-mono-num bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-700 shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 7 Columns: Live Tabular BOQ Breakdown */}
        <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span className="text-sm font-bold text-slate-900">
                  {lang === 'en'
                    ? 'Estimated Material Schedule (BOQ)'
                    : 'সম্ভাব্য নির্মাণ সামগ্রীর তালিকা (BOQ)'}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono-num">
                Tanbazar Depot Wholesale Rates
              </span>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-2 font-medium">
                      {lang === 'en' ? 'Material & Brand' : 'মালামালের বিবরণ ও ব্র্যান্ড'}
                    </th>
                    <th className="py-2 font-medium text-right">
                      {lang === 'en' ? 'Est. Quantity' : 'পরিমাণ'}
                    </th>
                    <th className="py-2 font-medium text-right">
                      {lang === 'en' ? 'Unit Rate' : 'একক দর'}
                    </th>
                    <th className="py-2 font-medium text-right">
                      {lang === 'en' ? 'Subtotal (BDT)' : 'মোট (টাকা)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-sm">
                  {calculatedItems
                    .filter((item) => mode === 'custom' || item.quantity > 0)
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-white/60 transition-colors">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded-lg object-cover shrink-0 border border-slate-200 bg-slate-200 hidden sm:block"
                            />
                            <div>
                              <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-emerald-800 font-medium">
                                {item.brands}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-mono-num font-semibold text-slate-900 whitespace-nowrap">
                          {item.quantity.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                        </td>
                        <td className="py-3 px-2 text-right font-mono-num text-xs text-slate-600 whitespace-nowrap">
                          ৳{item.rateBDT.toLocaleString()}
                        </td>
                        <td className="py-3 pl-2 text-right font-mono-num font-semibold text-slate-900 whitespace-nowrap">
                          ৳{item.subtotalBDT.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Bar & Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'en'
                  ? 'Indicative Wholesale Material Value (Excl. VAT/Transport)'
                  : 'সম্ভাব্য মোট মালামালের মূল্য (পরিবহন ও ভ্যাট ব্যতীত)'}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono-num mt-0.5">
                BDT {totalEstimatedBDT.toLocaleString()}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleOpenPrintableEstimate}
                className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>{lang === 'en' ? 'View on Official Pad' : 'অফিসিয়াল প্যাডে দেখুন'}</span>
              </button>

              <button
                type="button"
                onClick={handleApplyToForm}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                {copiedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>
                      {lang === 'en' ? 'Added to Quote Form' : 'কোটেশন ফর্মে যুক্ত হয়েছে'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {lang === 'en' ? 'Request Official Quotation' : 'চূড়ান্ত দরপত্র চান'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
