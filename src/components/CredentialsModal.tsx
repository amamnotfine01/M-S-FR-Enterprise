import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText, CreditCard, Phone, Mail, MapPin } from 'lucide-react';
import { Language } from '../data/companyData';
import { FREnterpriseEmblem } from './HeroArchitecturalShowcase';

interface CredentialsModalProps {
  isOpen: boolean;
  initialTab: 'letterhead' | 'card';
  lang: Language;
  estimateData?: {
    mode: string;
    items: { name: string; quantity: string; unit: string; subtotalBDT: number }[];
    totalBDT: number;
  } | null;
  onClose: () => void;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({
  isOpen,
  initialTab,
  lang,
  estimateData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'letterhead' | 'card'>(initialTab);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Official Letterhead Pad and Visiting Card"
    >
      <div className="bg-white rounded-xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('letterhead')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'letterhead'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'en' ? 'Official Letterhead Pad' : 'অফিসিয়াল লেটারহেড প্যাড'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'card'
                  ? 'bg-emerald-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{lang === 'en' ? 'Official Visiting Card' : 'অফিসিয়াল ভিজিটিং কার্ড'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Print / Save PDF' : 'প্রিন্ট / পিডিএফ'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50 flex-1">
          {activeTab === 'letterhead' && (
            /* Digital Replica of Page 1 of the PDF: Official M/s. FR Enterprise Letterhead Pad */
            <div className="bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-sm min-h-[640px] flex flex-col justify-between relative overflow-hidden">
              {/* Top Official Letterhead Header */}
              <div className="border-b-2 border-emerald-900/20 pb-5 flex items-start justify-between gap-4 relative z-10">
                <FREnterpriseEmblem className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" />
                <div className="text-right">
                  <div className="text-2xl sm:text-4xl font-extrabold italic font-serif tracking-tight text-emerald-950">
                    <span className="text-sm sm:text-base font-bold not-italic text-slate-800 mr-2">
                      M/s.
                    </span>
                    FR Enterprise
                  </div>
                  <div className="mt-1.5 inline-block border-t border-b border-slate-800 py-0.5 px-1 text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase">
                    PROPRIETOR : FAYSAL RAHMAN
                  </div>
                </div>
              </div>

              {/* Letterhead Body Content (Either Estimate or Official Company Profile Statement) */}
              <div className="my-8 space-y-5 text-sm text-slate-800 relative z-10 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-num text-slate-600 border-b border-slate-200 pb-3">
                  <span>Ref: FRE/NGJ/PRO-01</span>
                  <span>Business Start Date: June 2022</span>
                  <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
                </div>

                {estimateData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 uppercase">
                        Subject: Provisional Material & Contracting BOQ Estimate
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Configuration: {estimateData.mode}
                      </p>
                    </div>

                    <table className="w-full text-left border-collapse border border-slate-300 text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300">
                          <th className="p-2.5 border-r border-slate-300">Material Description</th>
                          <th className="p-2.5 border-r border-slate-300 text-right">Quantity</th>
                          <th className="p-2.5 text-right">Indicative Amount (BDT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {estimateData.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 border-r border-slate-300 font-medium">
                              {item.name}
                            </td>
                            <td className="p-2.5 border-r border-slate-300 text-right font-mono-num">
                              {item.quantity} ({item.unit})
                            </td>
                            <td className="p-2.5 text-right font-mono-num font-semibold">
                              {item.subtotalBDT.toLocaleString()} /-
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                          <td colSpan={2} className="p-2.5 border-r border-slate-300 text-right">
                            Total Indicative Material Estimate
                          </td>
                          <td className="p-2.5 text-right font-mono-num text-emerald-900">
                            BDT {estimateData.totalBDT.toLocaleString()} /-
                          </td>
                        </tr>
                      </tfoot>
                    </table>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      * Note: Final rates are subject to daily mill/depot dispatch pricing and site
                      delivery distance. Please contact Proprietor Faysal Rahman (01911-582468) for
                      formal signed quotation submission.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 leading-relaxed">
                    <h3 className="text-base font-bold text-slate-900 uppercase">
                      Official Corporate Profile & Supply Capability Statement
                    </h3>
                    <p>
                      <strong>M/S FR Enterprise</strong> (Business Start Date:{' '}
                      <strong>June 2022</strong>) is a premier Civil Contracting, Construction, and
                      Bulk Material Supply proprietorship firm headquartered at 55/C S.M. Maleh
                      Road, Tanbazar, Narayanganj-1400, Bangladesh.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                      <div>
                        <div className="font-bold text-slate-900 mb-1">
                          Core Construction & Contracting
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          <li>Commercial, Industrial & Residential RCC Buildings</li>
                          <li>Cast-in-Situ Piling, Retaining Walls & Warehouses</li>
                          <li>Municipal Roads, Box Culverts & Drainage Works</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 mb-1">
                          Bulk Construction Material Supply
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          <li>BSRM / AKS / KSRM 500W Deformed Steel Rebar (TMT)</li>
                          <li>Ordinary & Portland Composite Cement (OPC/PCC)</li>
                          <li>Crushed Stone Aggregates, Sylhet Sand & 1st Class Bricks</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <div className="text-center border-t border-slate-400 pt-2 px-6">
                        <div className="font-bold text-slate-900">Faysal Rahman</div>
                        <div className="text-xs text-slate-600">
                          Proprietor, M/S FR Enterprise
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exact Official Letterhead Footer matching Page 1 of the PDF */}
              <div className="border-t-2 border-slate-800 pt-3 text-center text-xs sm:text-sm font-medium text-slate-800 relative z-10">
                <div>
                  55/C S.M. Maleh Road, Narayanganj-1400. Cell: 01911-582468, 01534-590017,
                </div>
                <div>E-mail: faysalrahat@gmail.com</div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-6">
              {/* High-resolution Business Card Display */}
              <div className="max-w-xl mx-auto bg-white text-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-300">
                <div className="p-8 pb-6 flex items-start justify-between gap-4">
                  <FREnterpriseEmblem className="w-24 h-24 shrink-0" />
                  <div className="text-right">
                    <div className="text-2xl font-bold italic text-rose-950 font-serif">
                      Faysal Rahman
                    </div>
                    <div className="text-base italic text-slate-700 font-serif mb-3">
                      Proprietor
                    </div>
                    <div className="inline-flex items-center gap-2.5 text-base font-bold text-slate-900 font-mono-num">
                      <Phone className="w-5 h-5 text-rose-700 shrink-0" />
                      <div className="text-right leading-snug">
                        <div>01911-582468</div>
                        <div>01534-590017</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-5 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-serif italic">
                    <span className="text-lg font-semibold not-italic mr-2 text-slate-700">
                      M/s.
                    </span>
                    <span className="text-emerald-950">FR Enterprise</span>
                  </div>
                </div>

                <div className="bg-[#84A97C] border-t-4 border-emerald-900 px-8 py-5 flex items-center justify-between gap-4 text-slate-950">
                  <div className="space-y-2 text-sm font-semibold">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-rose-800 shrink-0 mt-1" />
                      <div>
                        <div>55/C S.M Maleh Road, Tanbazar</div>
                        <div>Narayanganj-1400 Bangladesh.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-rose-800 shrink-0" />
                      <span className="font-mono-num">faysalrahat@gmail.com</span>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded border border-slate-300 shrink-0">
                    <svg viewBox="0 0 64 64" className="w-16 h-16" fill="#0F172A">
                      <path d="M4 4h20v20H4V4zm4 4v12h12V8H8zm4 4h4v4h-4v-4zm28-8h20v20H40V4zm4 4v12h12V8H44zm4 4h4v4h-4v-4zM4 40h20v20H4V40zm4 4v12h12V44H8zm4 4h4v4h-4v-4zm16-40h4v4h-4V8zm4 8h4v8h-4v-8zm-4 12h8v4h-8v-4zm12 4h8v4h-8v-4zm-16 8h4v8h-4v-8zm8 4h8v8h-8v-8zm12-4h8v12h-8V40zm12 8h4v12h-4V48zm-16 8h12v4H40v-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Quick Copy Controls */}
              <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 no-print">
                {[
                  { label: 'Primary Phone', value: '01911-582468' },
                  { label: 'Secondary Phone', value: '01534-590017' },
                  { label: 'Official Email', value: 'faysalrahat@gmail.com' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleCopy(item.label, item.value)}
                    className="p-3 bg-white border border-slate-200 rounded-lg hover:border-emerald-600 transition-colors flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      <div className="text-xs font-bold text-slate-900 font-mono-num mt-0.5">
                        {item.value}
                      </div>
                    </div>
                    {copiedField === item.label ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
