/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Globe,
  Send,
  CheckCircle2,
  Printer,
  CreditCard,
} from 'lucide-react';
import {
  Language,
  OFFICIAL_COMPANY_INFO,
  SERVICES_LIST,
  REPRESENTATIVE_PROJECTS,
} from './data/companyData';
import {
  HeroArchitecturalShowcase,
  FREnterpriseEmblem,
} from './components/HeroArchitecturalShowcase';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { MaterialEstimator } from './components/MaterialEstimator';
import { CredentialsModal } from './components/CredentialsModal';
import { SiteWorkPostsSection } from './components/SiteWorkPostsSection';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [serviceFilter, setServiceFilter] = useState<
    'all' | 'supply' | 'construction' | 'contracting'
  >('all');

  // Official Pad & Visiting Card Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'letterhead' | 'card'>('letterhead');
  const [estimateForPad, setEstimateForPad] = useState<{
    mode: string;
    items: { name: string; quantity: string; unit: string; subtotalBDT: number }[];
    totalBDT: number;
  } | null>(null);

  // Copy state for phone numbers / email
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Lead Capture / Tender Inquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
    inquiryType: 'Bulk Material Supply Quotation',
    projectLocation: 'Narayanganj',
    details: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const filteredServices =
    serviceFilter === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === serviceFilter);

  const handleOpenCredentialsModal = (tab: 'letterhead' | 'card') => {
    if (tab !== 'letterhead') {
      setEstimateForPad(null);
    }
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleOpenLetterheadWithEstimate = (estimateSummary: {
    mode: string;
    items: { name: string; quantity: string; unit: string; subtotalBDT: number }[];
    totalBDT: number;
  }) => {
    setEstimateForPad(estimateSummary);
    setModalTab('letterhead');
    setModalOpen(true);
  };

  const handleTransferToInquiry = (summaryText: string) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details ? `${prev.details}\n\n${summaryText}` : summaryText,
    }));
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMaterialForQuote = (
    materialName: string,
    selectedBrandOrSize: string,
    unit: string,
    rateBDT: number
  ) => {
    const line = `Material Inquiry: ${materialName} (${selectedBrandOrSize}) — Indicative Rate: BDT ${rateBDT.toLocaleString()} / ${unit}`;
    setFormData((prev) => ({
      ...prev,
      inquiryType: 'Bulk Material Supply Quotation',
      details: prev.details ? `${prev.details}\n${line}` : line,
    }));
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string, category: string) => {
    const typeMap: Record<string, string> = {
      supply: 'Bulk Material Supply Quotation',
      construction: 'Civil Construction & Structural Works',
      contracting: 'Public / Institutional Tender Contracting',
    };
    setFormData((prev) => ({
      ...prev,
      inquiryType: typeMap[category] || 'Bulk Material Supply Quotation',
      details: prev.details
        ? `${prev.details}\nRequested Scope: ${serviceTitle}`
        : `Requested Scope: ${serviceTitle}\nPlease provide current rate schedule and mobilization timeline.`,
    }));
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireLocationWork = (postTitle: string, location: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: 'Civil Construction & Structural Works',
      projectLocation: location,
      details: prev.details
        ? `${prev.details}\nReference Site Work Post: ${postTitle} (${location})`
        : `Reference Site Work Post: ${postTitle} (${location})\nPlease share rate schedule or arrange a site consultation.`,
    }));
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.fullName.trim()) {
      setFormError(
        lang === 'en'
          ? 'Please enter your name or procurement officer title.'
          : 'অনুগ্রহ করে আপনার নাম লিখুন।'
      );
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s()-]/g, '');
    if (cleanPhone.length < 10 || !/^[+0-9]+$/.test(cleanPhone)) {
      setFormError(
        lang === 'en'
          ? 'Please provide a valid 11-digit mobile or telephone number.'
          : 'অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন (যেমন: 01911582468)।'
      );
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormError(
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'অনুগ্রহ করে সঠিক ইমেইল ঠিকানা লিখুন।'
      );
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            M/S FR Enterprise
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#site-posts"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 font-semibold text-emerald-800"
            >
              {lang === 'en' ? 'Site Work Posts' : 'কাজের ছবি ও পোস্ট'}
            </a>
            <a
              href="#materials-gallery"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'Materials' : 'নির্মাণ সামগ্রী'}
            </a>
            <a
              href="#capabilities"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'Capabilities' : 'সেবাসমূহ'}
            </a>
            <a
              href="#estimator"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'BOQ Estimator' : 'মালামাল ক্যালকুলেটর'}
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'Contact' : 'যোগাযোগ'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'Request Quotation' : 'দরপত্র ও কোটেশন'}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="py-10 lg:py-16 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Regional Trust & Language Bar (Placed inside Hero per Top Bar Contract) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="font-semibold text-emerald-900">
                  {lang === 'en'
                    ? 'Business Start Date: June 2022'
                    : 'ব্যবসা শুরুর সময়: জুন ২০২২'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'en'
                    ? 'Proprietor: Faysal Rahman'
                    : 'প্রোপ্রাইটর: ফয়সাল রহমান'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'en'
                    ? '55/C S.M. Maleh Road, Tanbazar, Narayanganj-1400'
                    : '৫৫/সি এস.এম. মালেহ রোড, টানবাজার, নারায়ণগঞ্জ-১৪০০'}
                </span>
              </div>

              {/* Interactive Language Switcher & Document Quick-Open */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenCredentialsModal('letterhead')}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{lang === 'en' ? 'Official Pad' : 'অফিসিয়াল প্যাড'}</span>
                </button>

                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                  <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      lang === 'en'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('bn')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      lang === 'bn'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>
            </div>

            {/* 2-Column Hero Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left 7 Columns: Value Proposition & Primary Action */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <FREnterpriseEmblem className="w-12 h-12 shrink-0" />
                    <div className="text-xs text-slate-600">
                      <div className="font-bold text-slate-900 uppercase tracking-wide">
                        M/s. FR Enterprise
                      </div>
                      <div>
                        {lang === 'en'
                          ? 'First-Class Contractor · Civil Construction · Bulk Material Supplier'
                          : 'ঠিকাদার · সিভিল কনস্ট্রাকশন · নির্মাণ সামগ্রী সরবরাহকারী'}
                      </div>
                    </div>
                  </div>

                  <h1
                    className="font-extrabold tracking-tight text-slate-950 leading-[1.12] text-balance"
                    style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                  >
                    {lang === 'en'
                      ? 'Civil Construction, Public Contracting & Bulk Material Supply in Narayanganj.'
                      : 'নারায়ণগঞ্জে নির্ভরযোগ্য সিভিল কনস্ট্রাকশন, ঠিকাদারি ও নির্মাণ সামগ্রী সরবরাহকারী প্রতিষ্ঠান।'}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {lang === 'en'
                      ? 'Led by Proprietor Faysal Rahman from our Tanbazar hub (55/C S.M. Maleh Road), M/S FR Enterprise executes commercial and municipal construction projects and supplies certified BSRM / AKS / KSRM 500W steel rebar, OPC/PCC cement, crushed boulder stone chips, Sylhet sand, and auto-kiln clay bricks.'
                      : 'প্রোপ্রাইটর ফয়সাল রহমানের নেতৃত্বে টানবাজার (৫৫/সি এস.এম. মালেহ রোড, নারায়ণগঞ্জ-১৪০০) থেকে পরিচালিত এম/এস এফআর এন্টারপ্রাইজ সরকারি-বেসরকারি নির্মাণ কাজ, ঠিকাদারি এবং BSRM / AKS / KSRM ৫০০W রড, সিমেন্ট, পাথর চিপস, সিলেট বালু ও ১নং ভাটার ইট পাইকারি দরে প্রজেক্ট সাইটে সরবরাহ করে থাকে।'}
                  </p>
                </div>

                {/* Primary CTA & Direct Proprietor Hotline */}
                <div className="pt-2 space-y-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#materials-gallery"
                      className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>
                        {lang === 'en'
                          ? 'Explore Materials & Wholesale Rates'
                          : 'রড, সিমেন্ট, পাথর ও ইটের তালিকা দেখুন'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenCredentialsModal('card')}
                      className="px-5 py-3.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-800" />
                      <span>
                        {lang === 'en'
                          ? 'Official Visiting Card & Pad'
                          : 'ভিজিটিং কার্ড ও অফিসিয়াল প্যাড'}
                      </span>
                    </button>
                  </div>

                  {/* Direct Phone & Email Strip */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
                    <a
                      href="tel:+8801911582468"
                      className="font-semibold text-slate-900 hover:text-emerald-800 flex items-center gap-1.5 font-mono-num"
                    >
                      <Phone className="w-4 h-4 text-emerald-800" />
                      <span>01911-582468</span>
                    </a>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <a
                      href="tel:+8801534590017"
                      className="font-semibold text-slate-900 hover:text-emerald-800 flex items-center gap-1.5 font-mono-num"
                    >
                      <Phone className="w-4 h-4 text-emerald-800" />
                      <span>01534-590017</span>
                    </a>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <a
                      href="mailto:faysalrahat@gmail.com"
                      className="font-medium text-slate-700 hover:text-emerald-800 flex items-center gap-1.5 font-mono-num"
                    >
                      <Mail className="w-4 h-4 text-emerald-800" />
                      <span>faysalrahat@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Interactive Material Gallery & Visiting Card Showcase */}
              <div className="lg:col-span-5">
                <HeroArchitecturalShowcase
                  lang={lang}
                  onOpenCredentialsModal={handleOpenCredentialsModal}
                />
              </div>
            </div>

            {/* Full-Width 4-Column Operational KPI Bar Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">
                  {lang === 'en' ? 'Business Start Date' : 'ব্যবসা শুরুর সময়'}
                </div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {lang === 'en' ? 'June 2022' : 'জুন ২০২২'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'en'
                    ? 'Proprietorship · M/S FR Enterprise'
                    : 'প্রোপ্রাইটরশিপ প্রতিষ্ঠান'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">
                  {lang === 'en' ? 'Core Business Scope' : 'ব্যবসার ধরন'}
                </div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {lang === 'en'
                    ? 'Contractor · Construction · Supplier'
                    : 'ঠিকাদার · কনস্ট্রাকশন · সরবরাহকারী'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'en'
                    ? 'Civil Works & Wholesale Material Supply'
                    : 'সিভিল কনস্ট্রাকশন ও পাইকারি মালামাল সরবরাহ'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">
                  {lang === 'en' ? 'Proprietor' : 'প্রোপ্রাইটর'}
                </div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {OFFICIAL_COMPANY_INFO.proprietor[lang]}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'en'
                    ? 'Direct Quality & Dispatch Supervision'
                    : 'সরাসরি মান নিয়ন্ত্রণ ও সরবরাহ তত্ত্বাবধান'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">
                  {lang === 'en' ? 'Registered Headquarters' : 'প্রধান কার্যালয়ের ঠিকানা'}
                </div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  55/C S.M. Maleh Road
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'en'
                    ? 'Tanbazar, Narayanganj-1400'
                    : 'টানবাজার, নারায়ণগঞ্জ-১৪০০'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1B. ON-SITE STRUCTURAL WORK GALLERY & LOCATION-BASED POSTS */}
        <SiteWorkPostsSection
          lang={lang}
          onInquireLocationWork={handleInquireLocationWork}
        />

        {/* 2. DEDICATED CONSTRUCTION MATERIALS VISUAL GALLERY (BSRM/AKS/KSRM Rebar, Cement, Stone, Sand, Bricks, Blocks) */}
        <MaterialsShowcase
          lang={lang}
          onSelectMaterialForQuote={handleSelectMaterialForQuote}
        />

        {/* 3. CORE CAPABILITIES & SERVICES (Asymmetric Bento Grid + Real Photos) */}
        <section id="capabilities" className="py-16 lg:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                  {lang === 'en'
                    ? 'CORE OPERATING DIVISIONS'
                    : 'আমাদের প্রধান সেবা ও কার্যপরিধি'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
                  {lang === 'en'
                    ? 'Execution Across Material Supply, Civil Works & Public Contracting'
                    : 'নির্মাণ সামগ্রী সরবরাহ, সিভিল কনস্ট্রাকশন এবং সরকারি-বেসরকারি ঠিকাদারি সেবা'}
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start">
                {[
                  { id: 'all', labelEn: 'All Divisions (4)', labelBn: 'সকল বিভাগ (৪)' },
                  { id: 'supply', labelEn: 'Material Supplier', labelBn: 'মালামাল সরবরাহ' },
                  { id: 'construction', labelEn: 'Civil Construction', labelBn: 'কনস্ট্রাকশন' },
                  { id: 'contracting', labelEn: 'Tender Contracting', labelBn: 'ঠিকাদারি' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setServiceFilter(
                        tab.id as 'all' | 'supply' | 'construction' | 'contracting'
                      )
                    }
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      serviceFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'en' ? tab.labelEn : tab.labelBn}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, idx) => {
                const isWide =
                  serviceFilter === 'all' ? idx === 0 || idx === 3 : false;
                return (
                  <div
                    key={service.id}
                    className={`${
                      isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                    } bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors`}
                  >
                    <div>
                      {/* Visual Banner Image on Each Service Card */}
                      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt={service.title[lang]}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end justify-between p-5">
                          <span className="text-xs text-slate-200 font-medium">
                            {service.subtitle[lang]}
                          </span>
                          <span className="text-xs font-mono-num font-bold text-emerald-400">
                            {service.category.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 sm:p-7 space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">
                          {service.title[lang]}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description[lang]}
                        </p>

                        {/* Technical Specifications List */}
                        <div className="pt-2">
                          <div className="text-xs font-semibold text-slate-800 mb-2.5">
                            {lang === 'en'
                              ? 'Standard Deliverables & Material Grades:'
                              : 'সরবরাহকৃত মালামাল ও কাজের বিবরণ:'}
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.specifications[lang].map((spec, i) => (
                              <li
                                key={i}
                                className="text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200/80 flex items-start gap-2"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer of Card with Metric & Action */}
                    <div className="px-6 sm:px-7 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs font-mono-num font-medium text-slate-600">
                        {service.unitMetric[lang]}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleSelectServiceForQuote(service.title.en, service.category)
                        }
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>
                          {lang === 'en'
                            ? 'Inquire Rate / Tender'
                            : 'দরপত্র ও বুকিং করুন'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE MATERIAL & BOQ ESTIMATOR */}
        <section id="estimator" className="py-16 lg:py-20 border-b border-slate-200 bg-slate-100/70">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                {lang === 'en'
                  ? 'PROCUREMENT & BOQ PLANNING TOOL'
                  : 'প্রজেক্ট প্রোকিউরমেন্ট ও মালামাল ক্যালকুলেটর'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'en'
                  ? 'Instant Material Volume & Wholesale Budget Estimator'
                  : 'আপনার প্রজেক্টের জন্য প্রয়োজনীয় রড, সিমেন্ট, পাথর ও বালুর হিসাব করুন'}
              </h2>
              <p className="text-sm text-slate-600">
                {lang === 'en'
                  ? 'Select your building or roadwork area—or input direct material quantities—to generate an indicative schedule on M/S FR Enterprise official letterhead or attach it directly to a quotation request.'
                  : 'আপনার ভবন বা রাস্তার আয়তন নির্বাচন করুন অথবা সরাসরি মালামালের পরিমাণ লিখে সম্ভাব্য বাজেট দেখুন এবং অফিসিয়াল প্যাডে প্রিন্ট করুন।'}
              </p>
            </div>

            <MaterialEstimator
              lang={lang}
              onTransferToInquiry={handleTransferToInquiry}
              onOpenLetterheadWithEstimate={handleOpenLetterheadWithEstimate}
            />
          </div>
        </section>

        {/* 5. PROOF OF IMPACT & REPRESENTATIVE EXECUTIONS */}
        <section id="projects" className="py-16 lg:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                  {lang === 'en'
                    ? 'REPRESENTATIVE SUPPLY & CONTRACTING RECORD'
                    : 'সম্পন্নকৃত প্রজেক্ট ও সরবরাহ কাজের নমুনা'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {lang === 'en'
                    ? 'Quantified Delivery Across Narayanganj Industrial & Municipal Zones'
                    : 'নারায়ণগঞ্জ শিল্পাঞ্চল ও আশেপাশের এলাকায় বাস্তবায়িত কাজসমূহ'}
                </h2>
              </div>

              <div className="text-xs text-slate-500 font-mono-num">
                {lang === 'en'
                  ? 'Active Operations Since June 2022 · Zero Batch Rejections'
                  : 'জুন ২০২২ থেকে সুনামের সাথে পরিচালিত'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {REPRESENTATIVE_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                        <div className="flex items-center gap-2 text-xs text-slate-200">
                          <span className="font-mono-num font-bold text-emerald-400">
                            0{index + 1}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.division[lang]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="text-xs text-slate-500 font-mono-num">
                        {project.period[lang]}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {project.title[lang]}
                      </h3>

                      <div className="text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-200 px-3 py-2 rounded-lg">
                        {project.quantifiedOutcome[lang]}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.scopeSummary[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 space-y-4 pt-4 border-t border-slate-200">
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label.en}
                          className="bg-white p-2.5 rounded-lg border border-slate-200"
                        >
                          <div className="text-[11px] text-slate-500 truncate">
                            {m.label[lang]}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono-num mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {project.location[lang]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE TENDER / PROCUREMENT INQUIRY & DIRECT CONTACT */}
        <section id="contact" className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Columns: Direct Office & Proprietor Contact Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-emerald-800 tracking-wide">
                    {lang === 'en'
                      ? 'DIRECT PROCUREMENT & TENDER DESK'
                      : 'সরাসরি যোগাযোগ ও দরপত্র অনুসন্ধান'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {lang === 'en'
                      ? 'Contact Proprietor Faysal Rahman'
                      : 'প্রোপ্রাইটর ফয়সাল রহমানের সাথে সরাসরি যোগাযোগ করুন'}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lang === 'en'
                      ? 'For urgent construction material dispatch, tender schedule discussions, or site visits in Narayanganj and Dhaka Division, call our direct lines or submit a requisition.'
                      : 'জরুরি নির্মাণ সামগ্রী সরবরাহ, টেন্ডার বা প্রজেক্ট সাইট পরিদর্শনের জন্য আমাদের মোবাইল নম্বরে কল করুন অথবা পাশের ফর্মটি পূরণ করুন।'}
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {lang === 'en' ? 'DIRECT HOTLINES (CELL)' : 'মোবাইল নম্বর (সরাসরি)'}
                      </span>
                      <Phone className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <a
                          href="tel:+8801911582468"
                          className="text-lg font-extrabold text-slate-900 hover:text-emerald-800 font-mono-num"
                        >
                          +880 1911-582468
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyText('phone1', '01911-582468')}
                          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                        >
                          {copiedKey === 'phone1' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <a
                          href="tel:+8801534590017"
                          className="text-lg font-extrabold text-slate-900 hover:text-emerald-800 font-mono-num"
                        >
                          +880 1534-590017
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyText('phone2', '01534-590017')}
                          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                        >
                          {copiedKey === 'phone2' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {lang === 'en' ? 'OFFICIAL EMAIL' : 'অফিসিয়াল ইমেইল'}
                      </span>
                      <Mail className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        href="mailto:faysalrahat@gmail.com"
                        className="text-base font-bold text-slate-900 hover:text-emerald-800 font-mono-num"
                      >
                        faysalrahat@gmail.com
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyText('email', 'faysalrahat@gmail.com')}
                        className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                      >
                        {copiedKey === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {lang === 'en'
                          ? 'REGISTERED OFFICE & DEPOT ADDRESS'
                          : 'প্রধান কার্যালয় ও ডিপো ঠিকানা'}
                      </span>
                      <MapPin className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div className="text-sm font-bold text-slate-900 leading-snug">
                      {lang === 'en'
                        ? OFFICIAL_COMPANY_INFO.contact.officeAddressEn
                        : OFFICIAL_COMPANY_INFO.contact.officeAddressBn}
                    </div>
                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {lang === 'en' ? 'Business Start Date: June 2022' : 'ব্যবসা শুরু: জুন ২০২২'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenCredentialsModal('letterhead')}
                        className="text-emerald-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Official Pad' : 'অফিসিয়াল প্যাড'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Validated RFQ / Tender Inquiry Form */}
              <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {lang === 'en'
                      ? 'Submit a Material Requisition or Tender Inquiry'
                      : 'মালামালের দরপত্র বা কাজের জন্য রিকুইজিশন পাঠান'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'en'
                      ? 'Complete the fields below to receive an official quotation on M/S FR Enterprise letterhead.'
                      : 'নিচের ফর্মটি পূরণ করলে আমাদের পক্ষ থেকে দ্রুত আপনার সাথে যোগাযোগ করা হবে।'}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-white rounded-xl border border-emerald-200 p-6 sm:p-8 space-y-5">
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {lang === 'en'
                            ? 'Requisition Logged for M/S FR Enterprise'
                            : 'আপনার রিকুইজিশন সফলভাবে গৃহীত হয়েছে'}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          {lang === 'en'
                            ? `Thank you, ${formData.fullName}. Proprietor Faysal Rahman will review your inquiry for ${formData.inquiryType} and respond at ${formData.phone}.`
                            : `ধন্যবাদ, ${formData.fullName}। প্রোপ্রাইটর ফয়সাল রহমান আপনার রিকুইজিশনটি পর্যালোচনা করে ${formData.phone} নম্বরে যোগাযোগ করবেন।`}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono-num space-y-1.5 text-slate-700">
                      <div>
                        <strong>Applicant:</strong> {formData.fullName}{' '}
                        {formData.organization ? `(${formData.organization})` : ''}
                      </div>
                      <div>
                        <strong>Phone:</strong> {formData.phone}
                      </div>
                      <div>
                        <strong>Category:</strong> {formData.inquiryType} ·{' '}
                        <strong>Site:</strong> {formData.projectLocation}
                      </div>
                      {formData.details && (
                        <div className="pt-2 border-t border-slate-200 whitespace-pre-wrap">
                          {formData.details}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`mailto:faysalrahat@gmail.com?subject=${encodeURIComponent(
                          `RFQ Inquiry: ${formData.inquiryType} - ${formData.fullName}`
                        )}&body=${encodeURIComponent(
                          `Name: ${formData.fullName}\nOrganization: ${formData.organization}\nPhone: ${formData.phone}\nSite Location: ${formData.projectLocation}\n\nDetails:\n${formData.details}`
                        )}`}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'en'
                            ? 'Send Copy via Direct Email (faysalrahat@gmail.com)'
                            : 'ইমেইলে কপি পাঠান'}
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        {lang === 'en' ? 'Edit or Submit Another Inquiry' : 'নতুন অনুসন্ধান পাঠান'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    {formError && (
                      <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en' ? 'Your Name / Officer Title *' : 'আপনার নাম ও পদবী *'}
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder={
                            lang === 'en' ? 'e.g. Engr. Mahmudul Hasan' : 'আপনার নাম লিখুন'
                          }
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="organization"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en'
                            ? 'Company / Organization / Project'
                            : 'প্রতিষ্ঠান বা প্রজেক্টের নাম'}
                        </label>
                        <input
                          id="organization"
                          type="text"
                          placeholder={
                            lang === 'en'
                              ? 'e.g. Knitwear Composite Ltd.'
                              : 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)'
                          }
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, organization: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en' ? 'Mobile / Phone Number *' : 'মোবাইল নম্বর *'}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="01XXXXXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm font-mono-num bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en' ? 'Email Address (Optional)' : 'ইমেইল ঠিকানা (ঐচ্ছিক)'}
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inquiryType"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en' ? 'Requirement Division' : 'সেবার বিভাগ'}
                        </label>
                        <select
                          id="inquiryType"
                          value={formData.inquiryType}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, inquiryType: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        >
                          <option value="Bulk Material Supply Quotation">
                            Bulk Material Supply (Rebar, Cement, Stone, Sand, Bricks)
                          </option>
                          <option value="Civil Construction & Structural Works">
                            Civil Construction & Structural Works (Building / Warehouse)
                          </option>
                          <option value="Public / Institutional Tender Contracting">
                            Municipal / Public Tender Contracting (Road, Drainage, Wall)
                          </option>
                          <option value="Earthwork & Sand Filling Logistics">
                            Earthwork, Sand Filling & Site Preparation
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="projectLocation"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'en' ? 'Delivery / Site Location' : 'প্রজেক্ট বা ডেলিভারি লোকেশন'}
                        </label>
                        <input
                          id="projectLocation"
                          type="text"
                          placeholder="e.g. Tanbazar / Fatullah / Siddhirganj, Narayanganj"
                          value={formData.projectLocation}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, projectLocation: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="details"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        {lang === 'en'
                          ? 'Material Quantities, BOQ Summary or Tender Specifications'
                          : 'প্রয়োজনীয় মালামালের পরিমাণ বা প্রজেক্টের বিস্তারিত বিবরণ'}
                      </label>
                      <textarea
                        id="details"
                        rows={4}
                        placeholder={
                          lang === 'en'
                            ? 'Specify material grades (e.g. 20 MT BSRM/AKS/KSRM 500W Rebar, 1000 Bags OPC Cement, 3000 CFT Stone Aggregate) or construction scope...'
                            : 'যেমন: ২০ টন BSRM/AKS/KSRM রড, ১০০০ বস্তা সিমেন্ট, ৩০০০ সিএফটি পাথর অথবা কনস্ট্রাকশন কাজের বিবরণ লিখুন...'
                        }
                        value={formData.details}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, details: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700"
                      />
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-slate-500">
                        {lang === 'en'
                          ? 'Direct response by Proprietor Faysal Rahman'
                          : 'সরাসরি প্রোপ্রাইটর ফয়সাল রহমান কর্তৃক যাচাইকৃত'}
                      </span>

                      <button
                        type="submit"
                        className="px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>
                          {lang === 'en'
                            ? 'Submit Quotation Request'
                            : 'কোটেশন রিকুইজিশন পাঠান'}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. QUIET CORPORATE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12 no-print">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <FREnterpriseEmblem className="w-10 h-10 shrink-0" />
                <div>
                  <div className="text-base font-extrabold text-white tracking-tight">
                    M/S FR Enterprise
                  </div>
                  <div className="text-xs text-slate-400">
                    Proprietor: Faysal Rahman · Contractor, Construction & Supplier
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                55/C S.M. Maleh Road, Tanbazar, Narayanganj-1400, Bangladesh.
                <br />
                Business Start Date: June 2022.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="font-semibold text-white">Direct Contact</div>
              <div className="font-mono-num">Cell: 01911-582468, 01534-590017</div>
              <div className="font-mono-num">E-mail: faysalrahat@gmail.com</div>
              <div>55/C S.M. Maleh Road, Tanbazar, Narayanganj-1400</div>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <div className="font-semibold text-white">Official Stationery</div>
              <div className="flex flex-col items-start gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenCredentialsModal('letterhead')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Official Letterhead Pad
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenCredentialsModal('card')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Official Visiting Card
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} M/S FR Enterprise. All rights reserved. Proprietor:
              Faysal Rahman.
            </div>
            <div>
              Business Start Date: June 2022 · Tanbazar, Narayanganj-1400
            </div>
          </div>
        </div>
      </footer>

      {/* Official Letterhead Pad & Visiting Card Modal */}
      <CredentialsModal
        isOpen={modalOpen}
        initialTab={modalTab}
        lang={lang}
        estimateData={estimateForPad}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
