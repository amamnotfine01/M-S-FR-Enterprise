export type Language = 'en' | 'bn';

export interface ServiceItem {
  id: string;
  index: string;
  category: 'construction' | 'supply' | 'contracting';
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  description: { en: string; bn: string };
  specifications: { en: string[]; bn: string[] };
  unitMetric: { en: string; bn: string };
  imageUrl: string;
  featured?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  title: { en: string; bn: string };
  location: { en: string; bn: string };
  division: { en: string; bn: string };
  period: { en: string; bn: string };
  quantifiedOutcome: { en: string; bn: string };
  scopeSummary: { en: string; bn: string };
  imageUrl: string;
  metrics: {
    label: { en: string; bn: string };
    value: string;
  }[];
}

export interface MaterialRateItem {
  id: string;
  name: { en: string; bn: string };
  brands: { en: string; bn: string };
  specification: { en: string; bn: string };
  sizesOrGrades: { en: string; bn: string };
  unit: { en: string; bn: string };
  indicativeRateBDT: number;
  minOrder: string;
  imageUrl: string;
  category: 'steel' | 'cement' | 'aggregate' | 'masonry';
}

export interface SiteWorkPost {
  id: string;
  title: { en: string; bn: string };
  location: { en: string; bn: string };
  areaTag: { en: string; bn: string };
  date: { en: string; bn: string };
  status: 'ongoing' | 'completed' | 'supply';
  statusLabel: { en: string; bn: string };
  workCategory: { en: string; bn: string };
  description: { en: string; bn: string };
  structuralHighlights: { en: string[]; bn: string[] };
  images: string[];
  supervisor: { en: string; bn: string };
}

export const OFFICIAL_COMPANY_INFO = {
  name: 'M/S FR Enterprise',
  stylizedName: 'M/s. FR Enterprise',
  proprietor: {
    en: 'Faysal Rahman',
    bn: 'ফয়সাল রহমান',
  },
  ownershipType: {
    en: 'Proprietorship',
    bn: 'একক মালিকানাধীন (প্রোপ্রাইটরশিপ)',
  },
  businessType: {
    en: 'Contractor / Construction / Supplier',
    bn: 'ঠিকাদার / কনস্ট্রাকশন / সরবরাহকারী (Supplier)',
  },
  businessSubType: {
    en: 'Supplier & Civil Contractor',
    bn: 'সরবরাহকারী ও সিভিল ঠিকাদার',
  },
  startDate: {
    en: 'June 2022',
    bn: 'জুন ২০২২',
  },
  contact: {
    officeAddressEn: '55/C S.M. Maleh Road, Tanbazar, Narayanganj-1400, Bangladesh',
    officeAddressBn: '৫৫/সি এস.এম. মালেহ রোড, টানবাজার, নারায়ণগঞ্জ-১৪০০, বাংলাদেশ',
    permanentAddressEn:
      '19 No Sonatan Pal Lane, Old Palpara, Post: Narayanganj, P.S.: Narayanganj Sadar, District: Narayanganj, Division: Dhaka',
    permanentAddressBn:
      '১৯ নং সনাতন পাল লেন, পুরাতন পালপাড়া, ডাকঘর: নারায়ণগঞ্জ, থানা: নারায়ণগঞ্জ সদর, জেলা: নারায়ণগঞ্জ, বিভাগ: ঢাকা',
    phones: ['01911-582468', '01534-590017'],
    phonesFormatted: ['+880 1911-582468', '+880 1534-590017'],
    email: 'faysalrahat@gmail.com',
  },
};

export const INITIAL_SITE_WORK_POSTS: SiteWorkPost[] = [
  {
    id: 'custom-post-1792234532406',
    title: {
      en: 'Project — On-Site Construction & Material Supply Execution',
      bn: 'Project — প্রজেক্ট সাইটে নির্মাণ কাজ ও মালামাল সরবরাহ কার্যক্রম',
    },
    location: {
      en: 'Tanbazar, Narayanganj-1400',
      bn: 'টানবাজার, নারায়ণগঞ্জ-১৪০০',
    },
    areaTag: {
      en: 'Tanbazar, Narayanganj-1400',
      bn: 'টানবাজার, নারায়ণগঞ্জ-১৪০০',
    },
    date: {
      en: 'October 2026 · Verified Site Post',
      bn: 'অক্টোবর ২০২৬ · যাচাইকৃত সাইট পোস্ট',
    },
    status: 'ongoing',
    statusLabel: {
      en: 'Ongoing Structural Work',
      bn: 'চলমান গঠনমূলক কাজ',
    },
    workCategory: {
      en: 'RCC Structural & Construction Work',
      bn: 'আরসিসি স্ট্রাকচারাল ও কনস্ট্রাকশন কাজ',
    },
    description: {
      en: 'On-site construction and material supply execution at Tanbazar, Narayanganj-1400 under M/S FR Enterprise.',
      bn: 'টানবাজার, নারায়ণগঞ্জ-১৪০০ সাইটে এম/এস এফআর এন্টারপ্রাইজের তত্ত্বাবধানে গঠনমূলক নির্মাণ ও মালামাল সরবরাহের কাজ।',
    },
    structuralHighlights: {
      en: [
        'Executed under direct supervision of M/S FR Enterprise (Proprietor: Faysal Rahman)',
        'High-grade construction materials (BSRM/AKS Rebar, OPC/PCC Cement, Stone Chips & Sylhet Sand)',
      ],
      bn: [
        'এম/এস এফআর এন্টারপ্রাইজের সরাসরি তত্ত্বাবধানে বাস্তবায়িত',
        'উন্নত মানের নির্মাণ সামগ্রী (BSRM/AKS রড, সিমেন্ট, পাথর ও সিলেট বালু) ব্যবহার',
      ],
    },
    images: [
      '/images/fixed-site-photos/site-photo-8e3e18db89ee81f30a61e1a0b563ff5a.jpg',
      '/images/fixed-site-photos/site-photo-e8c95e4da42cea41f95110a4d3d67f45.jpg',
      '/images/fixed-site-photos/site-photo-830da5bcca3c40205fb0ecb13e741f13.jpg',
      '/images/fixed-site-photos/site-photo-210b058f78407a99a14d79319bd880be.jpg',
      '/images/fixed-site-photos/site-photo-90ec5c739b8fba7ffab82cbe2a726394.jpg',
      '/images/fixed-site-photos/site-photo-acd9b8f76b6d0c9d0d36cb7929023be1.jpg',
      '/images/fixed-site-photos/site-photo-5e9fe0de98bbd85deca6122c132f9314.jpg',
      '/images/fixed-site-photos/site-photo-822d11a4fccb7cbb3b3f2ae0a6089736.jpg',
      '/images/fixed-site-photos/site-photo-d077f5ff946fac510bd028fc90e70b28.jpg',
      '/images/fixed-site-photos/site-photo-bb52b685120ce3f2f8a30e4cde4997db.jpg',
      '/images/fixed-site-photos/site-photo-44535213e24204fc29117f92dd66fc52.jpg',
      '/images/fixed-site-photos/site-photo-5feb37b9763945e18c87b7a7c113d3bb.jpg',
      '/images/fixed-site-photos/site-photo-e4aa26c5ec6b82887e7a61c39503a410.jpg',
      '/images/fixed-site-photos/site-photo-c24eb4a1538c73251a21555ee59407c1.jpg',
      '/images/fixed-site-photos/site-photo-43296d4fc63146515157fc7609070694.jpg',
      '/images/fixed-site-photos/site-photo-677459926ca79a5cf192676bf0aee432.jpg',
      '/images/fixed-site-photos/site-photo-f59187f0b7dc4a2de71f5f0a370297f5.jpg',
      '/images/fixed-site-photos/site-photo-8ee1264b32f528bbcf795fb9a6a9ace7.jpg',
      '/images/fixed-site-photos/site-photo-60a3d2c38981f5e9f726d03ce4e4989e.jpg',
      '/images/fixed-site-photos/site-photo-94e48c8da73ca35761b5259b550e2980.jpg',
      '/images/fixed-site-photos/site-photo-2853ccbd2032d714b4d0dff41a4b3b25.jpg',
      '/images/fixed-site-photos/site-photo-8cc493020ed83928d8d13a293793e740.jpg',
      '/images/fixed-site-photos/site-photo-c1f7c7e32c337677e0e40f96f4cc7eb7.jpg',
      '/images/fixed-site-photos/site-photo-600ad51253eb40c26f1741f6defe2e3f.jpg',
      '/images/fixed-site-photos/site-photo-b026768e313d2ba8512e83c158317e47.jpg',
      '/images/fixed-site-photos/site-photo-d757b9cbd4c2ce64b6133d8baf7bf894.jpg',
      '/images/fixed-site-photos/site-photo-efd8a4515ff7878be54a4b09a84b26e7.jpg',
      '/images/fixed-site-photos/site-photo-e350bba16ea50985403af728dbd4413a.jpg',
      '/images/fixed-site-photos/site-photo-e25b00af06d086dc349a63e4f4077993.jpg',
      '/images/fixed-site-photos/site-photo-d2f31aa281f1baf1cbf4c7d6267d821b.jpg',
      '/images/fixed-site-photos/site-photo-c8311bbc76c04bdd9bf9366c7159050f.jpg',
      '/images/fixed-site-photos/site-photo-36648d02e519a1db0b73a8864f98c994.jpg',
      '/images/fixed-site-photos/site-photo-9a490d3915da361cc16d2914137f748a.jpg',
      '/images/fixed-site-photos/site-photo-adc55c3da6cf3d605d627de8414a408e.jpg',
      '/images/fixed-site-photos/site-photo-a7db3f99847f2dd49e7233c154c8422a.jpg',
      '/images/fixed-site-photos/site-photo-9a87c8de28102c896299720ade92a44e.jpg',
      '/images/fixed-site-photos/site-photo-c41d3b0901351fa5da50006ef09258e4.jpg',
      '/images/fixed-site-photos/site-photo-63f4e79b2becb6910628c584c6b7a5bf.jpg',
      '/images/fixed-site-photos/site-photo-f0fb46b71e0b91dea43f4bb73afa3590.jpg',
      '/images/fixed-site-photos/site-photo-0a2b468a949013e3896e1cf0ec79a375.jpg',
      '/images/fixed-site-photos/site-photo-47f0b8e610f007ba3f0a61f6b45480d8.jpg',
      '/images/fixed-site-photos/site-photo-557fcc2d5454bd4a2dcda8e7513c91cf.jpg',
      '/images/fixed-site-photos/site-photo-254a8bf7a0d3344789f2739d06912d2b.jpg',
      '/images/fixed-site-photos/site-photo-21866b1bd6d2c24093a9ba1536085f4a.jpg',
      '/images/fixed-site-photos/site-photo-453fc0167d47c0e68867920a032858e9.jpg',
      '/images/fixed-site-photos/site-photo-582d55111d83d7614c060c5e85d0df5e.jpg',
      '/images/fixed-site-photos/site-photo-0b6c37a59c93670b6e2a0b33817aaa7b.jpg',
      '/images/fixed-site-photos/site-photo-6ef31e305e2e65463a3e3f0105ad2e23.jpg',
      '/images/fixed-site-photos/site-photo-590db5a6445f8134a16cad6c92af8efd.jpg',
      '/images/fixed-site-photos/site-photo-785d6360b6af5011dff09e1580c41354.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-tanbazar-rcc-frame',
    title: {
      en: 'Multi-Story RCC Frame, Column Casting & Roof Slab Construction',
      bn: 'বহুতল ভবনের আরসিসি কলাম, বিম ও ছাদ ঢালাইয়ের গঠনমূলক কাজ',
    },
    location: {
      en: 'Tanbazar Commercial Zone, S.M. Maleh Road, Narayanganj-1400',
      bn: 'টানবাজার বাণিজ্যিক এলাকা, এস.এম. মালেহ রোড, নারায়ণগঞ্জ-১৪০০',
    },
    areaTag: {
      en: 'Tanbazar, Narayanganj',
      bn: 'টানবাজার, নারায়ণগঞ্জ',
    },
    date: {
      en: 'October 2026 · Site Update',
      bn: 'অক্টোবর ২০২৬ · সাইট আপডেট',
    },
    status: 'ongoing',
    statusLabel: {
      en: 'Ongoing Structural Work',
      bn: 'চলমান গঠনমূলক কাজ',
    },
    workCategory: {
      en: 'RCC Structural Construction',
      bn: 'আরসিসি স্ট্রাকচারাল কনস্ট্রাকশন',
    },
    description: {
      en: 'On-site structural execution of multi-story reinforced concrete columns, beams, and slab shuttering. Coarse Sylhet sand and 500W deformed steel bars staged on site under direct supervision of M/S FR Enterprise.',
      bn: 'এম/এস এফআর এন্টারপ্রাইজের সরাসরি তত্ত্বাবধানে বহুতল ভবনের আরসিসি কলাম, বিম ও ছাদের শাটারিং এবং ঢালাই কাজ চলছে। সাইটে উন্নত মানের সিলেট বালু, পাথর চিপস এবং ৫০০W রড প্রস্তুত রাখা হয়েছে।',
    },
    structuralHighlights: {
      en: [
        '3,500 PSI RCC Column & Beam Frame Alignment',
        'BSRM / AKS 500W Deformed Rebar Lapping & Binding',
        'On-Site Sylhet Coarse Sand & Stone Aggregate Staging',
      ],
      bn: [
        '৩,৫০০ পিএসআই মানের আরসিসি কলাম ও বিম ফ্রেম নির্মাণ',
        'BSRM / AKS ৫০০W টিএমটি রড বাইন্ডিং ও কলাম কাস্টিং',
        'সাইটে সরাসরি সিলেট মোটা বালু ও বোল্ডার পাথর চিপস মজুদ',
      ],
    },
    images: [
      '/images/materials/rcc_construction.jpg',
      '/images/projects/rebar_cage_fabrication.jpg',
      '/images/materials/rebar.jpg',
      '/images/materials/sand.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-fatullah-rebar-foundation',
    title: {
      en: 'Heavy Grade Beam & Column Rebar Cage Fabrication on Site',
      bn: 'প্রজেক্ট সাইটে গ্রেড বিম ও কলামের রডের খাঁচা (Rebar Cage) তৈরি ও স্থাপন',
    },
    location: {
      en: 'Fatullah BSCIC Industrial Belt, Narayanganj',
      bn: 'ফতুল্লা বিসিক শিল্পাঞ্চল, নারায়ণগঞ্জ',
    },
    areaTag: {
      en: 'Fatullah, Narayanganj',
      bn: 'ফতুল্লা, নারায়ণগঞ্জ',
    },
    date: {
      en: 'September 2026 · Structural Stage',
      bn: 'সেপ্টেম্বর ২০২৬ · স্ট্রাকচারাল ধাপ',
    },
    status: 'ongoing',
    statusLabel: {
      en: 'Active Structural Fabrication',
      bn: 'চলমান রড বাইন্ডিং ও ফাউন্ডেশন',
    },
    workCategory: {
      en: 'Steel Rebar & Foundation Work',
      bn: 'রড বাইন্ডিং ও ফাউন্ডেশন ওয়ার্ক',
    },
    description: {
      en: 'Precision cutting, bending, and stirrup binding of 16mm, 20mm, and 25mm 500W TMT steel rebar cages for heavy industrial foundation footings and grade beams in Fatullah.',
      bn: 'ফতুল্লা শিল্পাঞ্চলে ফ্যাক্টরি ভবনের হেভি ফাউন্ডেশন ও গ্রেড বিমের জন্য ১৬ মিমি, ২০ মিমি ও ২৫ মিমি ৫০০W রডের খাঁচা (Stirrup ও Main Bar) নিখুঁত মাপে বাইন্ডিং ও স্থাপনের কাজ।',
    },
    structuralHighlights: {
      en: [
        '16mm–25mm 500W TMT Deformed Bar Cage Assembly',
        'Earthquake-Resistant 135° Hook Stirrup Detailing',
        'Direct Mill-Batch Steel Supply by M/S FR Enterprise',
      ],
      bn: [
        '১৬ মিমি থেকে ২৫ মিমি ৫০০W রডের মজবুত খাঁচা তৈরি',
        'ভূমিকম্প-সহনীয় স্ট্রাকচারাল ডিজাইন অনুযায়ী রিং বাঁধাই',
        'এম/এস এফআর এন্টারপ্রাইজ কর্তৃক সরাসরি সাইটে রড সরবরাহ',
      ],
    },
    images: [
      '/images/projects/rebar_cage_fabrication.jpg',
      '/images/materials/rebar.jpg',
      '/images/materials/rcc_construction.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-siddhirganj-excavation-earthwork',
    title: {
      en: 'Site Excavation, Land Development & Dump Truck Earthwork Logistics',
      bn: 'এক্সকাভেটর ও ডাম্প ট্রাকের মাধ্যমে প্রজেক্ট সাইট খনন ও ভূমি উন্নয়ন কাজ',
    },
    location: {
      en: 'Siddhirganj Industrial Corridor, Narayanganj',
      bn: 'সিদ্ধিরগঞ্জ শিল্প করিডোর, নারায়ণগঞ্জ',
    },
    areaTag: {
      en: 'Siddhirganj, Narayanganj',
      bn: 'সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ',
    },
    date: {
      en: 'August 2026 · Site Preparation',
      bn: 'আগস্ট ২০২৬ · সাইট প্রস্তুতকরণ',
    },
    status: 'completed',
    statusLabel: {
      en: 'Phase Completed',
      bn: 'সফলভাবে সম্পন্ন',
    },
    workCategory: {
      en: 'Earthwork & Site Mobilization',
      bn: 'মাটি খনন ও সাইট লজিস্টিকস',
    },
    description: {
      en: 'Heavy wheeled excavator and dump truck deployment for foundation trench excavation, soil removal, and compacted river sand filling prior to piling and footing works.',
      bn: 'নতুন শিল্প ভবনের ফাউন্ডেশন কাজের পূর্বে নিজস্ব ব্যবস্থাপনায় এক্সকাভেটর (ভেকু) ও হেভি ডাম্প ট্রাকের মাধ্যমে মাটি খনন, অপসারণ এবং ভিটি বালু ভরাট করে সাইট প্রস্তুতকরণের দৃশ্য।',
    },
    structuralHighlights: {
      en: [
        'Wheeled Excavator & Heavy Dump Truck Fleet Operation',
        'Foundation Trenching & Sub-Base Leveling',
        'Compacted Filling Sand Delivery Across Narayanganj',
      ],
      bn: [
        'এক্সকাভেটর ও ডাম্প ট্রাকের মাধ্যমে দ্রুত মাটি খনন ও অপসারণ',
        'ফাউন্ডেশন লেভেলিং এবং মেকানিক্যাল সয়েল কম্প্যাকশন',
        'নির্ধারিত সময়ের মধ্যে সম্পূর্ণ সাইট ডেভেলপমেন্ট সম্পন্ন',
      ],
    },
    images: [
      '/images/projects/excavator_dump_truck.jpg',
      '/images/materials/sand.jpg',
      '/images/materials/stone_chips.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-chashara-palpara-masonry',
    title: {
      en: '1st-Class Auto-Kiln Brick Masonry & Concrete Block Wall Construction',
      bn: '১নং অটো ভাটার ইট ও কংক্রিট ব্লক সরবরাহ এবং ভবনের গাঁথুনি কাজ',
    },
    location: {
      en: 'Old Palpara & Chashara Zone, Narayanganj Sadar',
      bn: 'পুরাতন পালপাড়া ও চাষাড়া এলাকা, নারায়ণগঞ্জ সদর',
    },
    areaTag: {
      en: 'Chashara / Palpara, Narayanganj',
      bn: 'চাষাড়া / পালপাড়া, নারায়ণগঞ্জ',
    },
    date: {
      en: 'July 2026 · Masonry & Supply',
      bn: 'জুলাই ২০২৬ · গাঁথুনি ও সরবরাহ',
    },
    status: 'completed',
    statusLabel: {
      en: 'Delivered & Executed',
      bn: 'সরবরাহ ও বাস্তবায়ন সম্পন্ন',
    },
    workCategory: {
      en: 'Masonry Work & Material Supply',
      bn: 'ইটের গাঁথুনি ও মালামাল সরবরাহ',
    },
    description: {
      en: 'Supply and structural masonry execution using A-grade auto-tunnel kiln red clay bricks, vibro-compacted hollow concrete blocks, and fresh PCC cement for commercial and residential buildings.',
      bn: 'নারায়ণগঞ্জ সদরের পুরাতন পালপাড়া ও চাষাড়া এলাকায় বহুতল ভবনের দেয়াল গাঁথুনির জন্য ১নং অটো ভাটার লাল ইট, আধুনিক কংক্রিট হলো ব্লক এবং পিসিসি সিমেন্ট সরবরাহ ও নির্মাণ কাজ।',
    },
    structuralHighlights: {
      en: [
        '1st Class Auto-Kiln Clay Bricks (Uniform 9.5" × 4.5" Size)',
        'Lightweight Thermal-Insulated Concrete Hollow Blocks',
        'Screened Plaster Sand & Fresh Factory-Batch PCC Cement',
      ],
      bn: [
        'সমান সাইজ ও নিখুঁত পোড়ানো ১নং অটো ভাটার লাল ইট',
        'ভবনের ওজন কমাতে আধুনিক কংক্রিট হলো ব্লক ও সলিড ব্লক',
        'পরিষ্কার আস্তর বালু ও ফ্রেশ ফ্যাক্টরি ব্যাচের পিসিসি সিমেন্ট',
      ],
    },
    images: [
      '/images/materials/bricks.jpg',
      '/images/materials/concrete_blocks.jpg',
      '/images/materials/cement.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-bandar-stone-sand-dispatch',
    title: {
      en: 'Bulk 3/4" Crushed Stone Aggregate & Sylhet Sand Dispatch for RCC Casting',
      bn: 'আরসিসি ঢালাই কাজের জন্য সাইটে ৩/৪" পাথর চিপস ও সিলেট বালু সরবরাহ',
    },
    location: {
      en: 'Bandar & Madanganj Industrial Area, Narayanganj',
      bn: 'বন্দর ও মদনগঞ্জ শিল্প এলাকা, নারায়ণগঞ্জ',
    },
    areaTag: {
      en: 'Bandar, Narayanganj',
      bn: 'বন্দর, নারায়ণগঞ্জ',
    },
    date: {
      en: 'June 2026 · Bulk Supply Post',
      bn: 'জুন ২০২৬ · মালামাল সরবরাহ পোস্ট',
    },
    status: 'supply',
    statusLabel: {
      en: 'Bulk Site Dispatch',
      bn: 'সাইট ডেলিভারি সম্পন্ন',
    },
    workCategory: {
      en: 'Aggregate & Cement Supply',
      bn: 'পাথর, বালু ও সিমেন্ট সরবরাহ',
    },
    description: {
      en: 'Uninterrupted bulk delivery of 100% boulder-crushed 3/4" stone chips, high-FM Sylhet coarse red sand, and palletized 50kg OPC cement bags for heavy industrial floor and road casting.',
      bn: 'বন্দর ও মদনগঞ্জ শিল্প এলাকায় হেভি ইন্ডাস্ট্রিয়াল ফ্লোর ও আরসিসি রাস্তা ঢালাইয়ের জন্য শতভাগ বোল্ডার ভাঙা ৩/৪ ইঞ্চি পাথর চিপস, সিলেটের মোটা লাল বালু এবং ওপিসি সিমেন্ট সরাসরি সাইটে সরবরাহ।',
    },
    structuralHighlights: {
      en: [
        'Double-Washed 3/4" Down-Graded Boulder Stone Chips',
        'High-FM (2.5+) Silt-Free Sylhet Coarse Red Sand',
        'Moisture-Protected 50kg OPC Cement Pallet Delivery',
      ],
      bn: [
        'ডাবল-ওয়াশড ও ডাস্টমুক্ত ৩/৪ ইঞ্চি বোল্ডার ক্রাশড পাথর চিপস',
        'কাদামুক্ত আসল সিলেট মোটা লাল বালু (FM 2.5+)',
        'ময়েশ্চার-প্রুফ ৫০ কেজি ওপিসি সিমেন্টের বাল্ক ডেলিভারি',
      ],
    },
    images: [
      '/images/materials/stone_chips.jpg',
      '/images/materials/sand.jpg',
      '/images/materials/cement.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
  {
    id: 'post-sonargaon-steel-cement-depot',
    title: {
      en: 'Direct Site Unloading of BSRM / AKS / KSRM 500W Rebar & Cement Consignment',
      bn: 'কাঁচপুর ও সোনারগাঁও প্রজেক্ট সাইটে BSRM / AKS / KSRM রড ও সিমেন্ট আনলোডিং',
    },
    location: {
      en: 'Kanchpur & Sonargaon Industrial Belt, Narayanganj',
      bn: 'কাঁচপুর ও সোনারগাঁও শিল্পাঞ্চল, নারায়ণগঞ্জ',
    },
    areaTag: {
      en: 'Sonargaon / Kanchpur, Narayanganj',
      bn: 'সোনারগাঁও / কাঁচপুর, নারায়ণগঞ্জ',
    },
    date: {
      en: 'May 2026 · Consignment Post',
      bn: 'মে ২০২৬ · কনসাইনমেন্ট আপডেট',
    },
    status: 'supply',
    statusLabel: {
      en: 'Verified Consignment',
      bn: 'যাচাইকৃত মালামাল ডেলিভারি',
    },
    workCategory: {
      en: 'Wholesale Steel & Cement Supply',
      bn: 'পাইকারি রড ও সিমেন্ট সরবরাহ',
    },
    description: {
      en: 'Full truckload dispatch of bundled 500W deformed steel bars (8mm to 32mm) and fresh factory-batch cement bags from M/S FR Enterprise Tanbazar office to industrial project sites.',
      bn: 'টানবাজার প্রধান কার্যালয় ও ডিপো থেকে কাঁচপুর ও সোনারগাঁও প্রজেক্ট সাইটে ৮ মিমি থেকে ৩২ মিমি সাইজের ৫০০W টিএমটি রড এবং সিমেন্টের ট্রাকলোড কনসাইনমেন্ট সঠিক ওজনে ডেলিভারি।',
    },
    structuralHighlights: {
      en: [
        'Digital Weighbridge Verified Metric Tonnage',
        '8mm, 10mm, 12mm, 16mm, 20mm & 25mm 500W Rebar Bundles',
        'On-Time Site Unloading & Batch Certificate Handover',
      ],
      bn: [
        'ডিজিটাল স্কেলে শতভাগ সঠিক ওজন নিশ্চিত করে ডেলিভারি',
        '৮ মিমি থেকে ২৫ মিমি পর্যন্ত সকল সাইজের ৫০০W রড সরবরাহ',
        'নির্ধারিত সময়ে প্রজেক্ট সাইটে আনলোডিং ও ব্যাচ ভেরিফিকেশন',
      ],
    },
    images: [
      '/images/materials/rebar.jpg',
      '/images/materials/cement.jpg',
      '/images/projects/rebar_cage_fabrication.jpg',
    ],
    supervisor: {
      en: 'Supervised by Faysal Rahman (M/S FR Enterprise)',
      bn: 'তত্ত্বাবধানে: ফয়সাল রহমান (এম/এস এফআর এন্টারপ্রাইজ)',
    },
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'bulk-material-supply',
    index: '01',
    category: 'supply',
    featured: true,
    imageUrl: '/images/materials/rebar.jpg',
    title: {
      en: '01. Bulk Construction & Industrial Material Supply',
      bn: '০১. নির্মাণ সামগ্রী ও ইন্ডাস্ট্রিয়াল ম্যাটেরিয়াল সরবরাহ',
    },
    subtitle: {
      en: 'Direct depot dispatch across Narayanganj & Dhaka Division',
      bn: 'নারায়ণগঞ্জ ও ঢাকা বিভাগে সরাসরি ডিপো থেকে দ্রুত সরবরাহ',
    },
    description: {
      en: 'Reliable, high-volume supply of structural steel (BSRM / AKS / KSRM 500W TMT deformed bars), OPC/PCC cement, graded crushed stone aggregates, Sylhet coarse sand, and first-class auto-kiln clay bricks with certified weight and batch verification.',
      bn: 'BSRM, AKS, KSRM ৫০০W টিএমটি রড, ওপিসি/পিসিসি সিমেন্ট, পাথর চিপস (বোল্ডার ক্রাশড), সিলেট মোটা বালু এবং ১নং ভাটার ইট সঠিক পরিমাপ ও মান নিশ্চিত করে নির্ধারিত সময়ে প্রজেক্ট সাইটে সরবরাহ করা হয়।',
    },
    specifications: {
      en: [
        'BSRM / AKS / KSRM / GPH 500W Deformed Bar (8mm to 32mm)',
        'OPC & PCC Cement (Bulk Bagged & Palletized Dispatch)',
        '3/4" & 1/2" Graded Crushed Stone & Sylhet Sand (FM 2.5+)',
        '1st Class Auto-Tunnel Kiln Bricks & Hollow Concrete Blocks',
      ],
      bn: [
        'BSRM / AKS / KSRM ৫০০W টিএমটি ডিফর্মড বার / রড (৮ মিমি থেকে ৩২ মিমি)',
        'ওপিসি এবং পিসিসি সিমেন্ট (প্রজেক্ট চাহিদা অনুযায়ী বাল্ক ডেলিভারি)',
        '৩/৪ ইঞ্চি ও ১/২ ইঞ্চি পাথর চিপস এবং উন্নত মানের সিলেট বালু',
        '১নং অটো ভাটার ইট এবং কংক্রিট হলো ব্লক ও ইউনি-ব্লক',
      ],
    },
    unitMetric: {
      en: 'Dispatch Capacity: Up to 250 Metric Tons / Week',
      bn: 'সরবরাহ সক্ষমতা: প্রতি সপ্তাহে ২৫০ মেট্রিক টন পর্যন্ত',
    },
  },
  {
    id: 'civil-structural-construction',
    index: '02',
    category: 'construction',
    featured: true,
    imageUrl: '/images/materials/rcc_construction.jpg',
    title: {
      en: '02. Commercial, Industrial & Residential Civil Construction',
      bn: '০২. বাণিজ্যিক, শিল্প ও আবাসিক সিভিল কনস্ট্রাকশন',
    },
    subtitle: {
      en: 'Turnkey structural execution from foundation piling to finishing',
      bn: 'ফাউন্ডেশন পাইলিং থেকে ফিনিশিং পর্যন্ত পূর্ণাঙ্গ নির্মাণ কাজ',
    },
    description: {
      en: 'End-to-end civil engineering execution for factories, warehouses, commercial complexes, and multi-story residential buildings in Narayanganj industrial zones. Built strictly to BNBC structural standards.',
      bn: 'নারায়ণগঞ্জ শিল্পাঞ্চল ও আশেপাশের এলাকায় ফ্যাক্টরি, গোডাউন, বাণিজ্যিক ভবন এবং বহুতল আবাসিক ভবনের আরসিসি ফাউন্ডেশন থেকে শুরু করে সম্পূর্ণ সিভিল কনস্ট্রাকশন কাজ অভিজ্ঞ প্রকৌশলীর তত্ত্বাবধানে সম্পন্ন করা হয়।',
    },
    specifications: {
      en: [
        'Cast-in-Situ RCC Piling, Mat Foundations & Retaining Walls',
        'Industrial Steel Shed Fabrication & Heavy Warehouse Floors',
        'Multi-Story RCC Frame Structure & Ready-Mix Concrete Pouring',
        'Architectural Masonry, Plastering, Waterproofing & Finishing',
      ],
      bn: [
        'কাস্ট-ইন-সিটু আরসিসি পাইলিং, ম্যাট ফাউন্ডেশন ও রিটেইনিং ওয়াল',
        'ইন্ডাস্ট্রিয়াল স্টিল শেড ফেব্রিকেশন ও হেভি-ডিউটি ওয়্যারহাউস ফ্লোর',
        'বহুতল আরসিসি ফ্রেম স্ট্রাকচার ও রেডি-মিক্স কংক্রিট ঢালাই',
        'আধুনিক মেসনরি, প্লাস্টার, ওয়াটারপ্রুফিং ও ফিনিশিং ওয়ার্কস',
      ],
    },
    unitMetric: {
      en: 'BNBC 2020 Compliant Structural Execution',
      bn: 'বিএনবিসি (BNBC) মানদণ্ড অনুযায়ী শতভাগ নিরাপদ নির্মাণ',
    },
  },
  {
    id: 'public-private-contracting',
    index: '03',
    category: 'contracting',
    featured: false,
    imageUrl: '/images/materials/stone_chips.jpg',
    title: {
      en: '03. Municipal, Institutional & Tender Contracting',
      bn: '০৩. সরকারি, সিটি কর্পোরেশন ও প্রাতিষ্ঠানিক ঠিকাদারি',
    },
    subtitle: {
      en: 'First-Class Civil & Infrastructure Contracting in Narayanganj',
      bn: 'নারায়ণগঞ্জ ও ঢাকা বিভাগে নির্ভরযোগ্য প্রথম শ্রেণীর ঠিকাদারি সেবা',
    },
    description: {
      en: 'Execution of public and private infrastructure tenders, RCC road pavements, municipal box culverts, drainage networks, boundary walls, and institutional building maintenance with full engineering compliance.',
      bn: 'সরকারি-বেসরকারি প্রতিষ্ঠান ও শিল্প কারখানার আরসিসি রাস্তা, ড্রেনেজ সিস্টেম, কালভার্ট, বাউন্ডারি ওয়াল ও সংস্কার কাজের নির্ভরযোগ্য ঠিকাদারি সেবা প্রদান।',
    },
    specifications: {
      en: [
        'RCC Roadway Construction, Carpeting & Interlocking Uni-Block',
        'Stormwater Drainage Channels, Box Culverts & Embankment Protection',
        'Industrial Perimeter Boundary Walls & Security Gatehouses',
        'e-GP & Private Corporate Tender Documentation & BOQ Execution',
      ],
      bn: [
        'আরসিসি রাস্তা নির্মাণ, কার্পেটিং ও ইউনি-ব্লক পেভমেন্ট',
        'আরসিসি ড্রেনেজ নেটওয়ার্ক, বক্স কালভার্ট ও বাঁধ সুরক্ষা কাজ',
        'শিল্প কারখানার বাউন্ডারি ওয়াল ও সিকিউরিটি গেটহাউস নির্মাণ',
        'সরকারি ও বেসরকারি টেন্ডার ও বিওকিউ (BOQ) অনুযায়ী নিখুঁত বাস্তবায়ন',
      ],
    },
    unitMetric: {
      en: 'Business Start Date: June 2022',
      bn: 'ব্যবসা শুরুর সময়: জুন ২০২২',
    },
  },
  {
    id: 'site-development-logistics',
    index: '04',
    category: 'supply',
    featured: false,
    imageUrl: '/images/projects/excavator_dump_truck.jpg',
    title: {
      en: '04. Earthwork, Land Development & Site Logistics',
      bn: '০৪. ভূমি উন্নয়ন, মাটি/বালু ভরাট ও সাইট লজিস্টিকস',
    },
    subtitle: {
      en: 'Sand filling, excavation, and heavy equipment mobilization',
      bn: 'বালু ভরাট, এক্সকাভেশন ও প্রজেক্ট সাইট প্রস্তুতকরণ',
    },
    description: {
      en: 'Rapid site preparation including dredged river sand filling, mechanical compaction, excavation shoring, debris removal, and scheduled material delivery logistics in congested urban and riverine zones.',
      bn: 'প্রজেক্ট শুরুর পূর্বে জমি প্রস্তুতকরণ, ড্রেজার বা ট্রাকের মাধ্যমে বালু ভরাট, সয়েল কম্প্যাকশন, মাটি খনন এবং নির্মাণ বর্জ্য অপসারণের দ্রুত ও সাশ্রয়ী সমাধান।',
    },
    specifications: {
      en: [
        'River Dredged Filling Sand & Mechanical Roller Compaction',
        'Deep Basement Excavation & Shore Pile Support Systems',
        'Dedicated Dump Truck & Flatbed Fleet for Night/Day Delivery',
        'On-Site Material Staging & Quality Testing Coordination',
      ],
      bn: [
        'উন্নত মানের ভিটি বালু ভরাট ও মেকানিক্যাল রোলার কম্প্যাকশন',
        'বেজমেন্ট মাটি খনন ও শোর পাইলিং সাপোর্ট',
        'নিজস্ব পরিবহন ব্যবস্থাপনায় দিন-রাত সাইটে মালামাল পৌঁছানো',
        'সাইট স্টোরেজ ও ইঞ্জিনিয়ারিং ল্যাব টেস্ট সমন্বয়',
      ],
    },
    unitMetric: {
      en: '24/7 Tanbazar & Riverport Logistics Access',
      bn: 'টানবাজার ও নারায়ণগঞ্জ বন্দর এলাকায় ২৪/৭ লজিস্টিকস সুবিধা',
    },
  },
];

export const MATERIAL_RATES: MaterialRateItem[] = [
  {
    id: 'tmt-rebar-500w',
    category: 'steel',
    imageUrl: '/images/materials/rebar.jpg',
    name: {
      en: 'BSRM / AKS / KSRM 500W TMT Deformed Steel Rebar',
      bn: 'BSRM / AKS / KSRM ৫০০W টিএমটি ডিফর্মড স্টিল রড',
    },
    brands: {
      en: 'BSRM Xtreme 500W · AKS 500W · KSRM 500W · GPH Quantum',
      bn: 'BSRM Xtreme · AKS · KSRM · GPH Ispat (৫০০W ও B600D-R)',
    },
    specification: {
      en: 'BSTI & ISO 6935-2 Certified Earthquake-Resistant High-Yield Steel',
      bn: 'বিএসটিআই ও আন্তর্জাতিক মানসম্পন্ন ভূমিকম্প-সহনীয় হাই-স্ট্রেন্থ রড',
    },
    sizesOrGrades: {
      en: '8mm, 10mm, 12mm, 16mm, 20mm, 22mm, 25mm, 28mm, 32mm',
      bn: '৮ মিমি, ১০ মিমি, ১২ মিমি, ১৬ মিমি, ২০ মিমি, ২৫ মিমি ও ৩২ মিমি',
    },
    unit: { en: 'Metric Ton (MT)', bn: 'মেট্রিক টন' },
    indicativeRateBDT: 96500,
    minOrder: '5 MT',
  },
  {
    id: 'opc-cement',
    category: 'cement',
    imageUrl: '/images/materials/cement.jpg',
    name: {
      en: 'OPC & PCC Structural Cement (50 kg Factory Bag)',
      bn: 'ওপিসি ও পিসিসি সিমেন্ট (৫০ কেজি ফ্রেশ ফ্যাক্টরি বস্তা)',
    },
    brands: {
      en: 'Shah · LafargeHolcim · Crown · Seven Rings · Premier · Bashundhara',
      bn: 'শাহ্ · লাফার্জ হোলসিম · ক্রাউন · সেভেন রিংস · প্রিমিয়ার · বসুন্ধরা',
    },
    specification: {
      en: 'CEM I 52.5N (OPC for Piling/Slabs) & CEM II/B-M (PCC for Masonry)',
      bn: 'কলাম, বিম ও ছাদ ঢালাইয়ের জন্য OPC এবং গাঁথুনি/প্লাস্টারের জন্য PCC',
    },
    sizesOrGrades: {
      en: '50 kg Moisture-Proof Poly-Laminated Bags (Direct Mill Batch)',
      bn: '৫০ কেজি ময়েশ্চার-প্রুফ বস্তা (সরাসরি কারখানা থেকে নতুন ব্যাচ)',
    },
    unit: { en: '50 kg Bag', bn: '৫০ কেজি বস্তা' },
    indicativeRateBDT: 545,
    minOrder: '200 Bags',
  },
  {
    id: 'stone-chips-3-4',
    category: 'aggregate',
    imageUrl: '/images/materials/stone_chips.jpg',
    name: {
      en: '3/4" & 1/2" Graded Crushed Boulder Stone Chips',
      bn: '৩/৪ ইঞ্চি ও ১/২ ইঞ্চি বোল্ডার ক্রাশড পাথর চিপস (LC ও সিলেট)',
    },
    brands: {
      en: 'Sylhet Jaflong / Bholaganj Boulder · Imported Torsa & Pakur LC Stone',
      bn: 'সিলেট ভোলাগঞ্জ/জাফলং বোল্ডার ক্রাশড · আমদানিকৃত এলসি (LC) কালো পাথর',
    },
    specification: {
      en: '100% Boulder Crushed, Double-Washed, Dust-Free Angular Aggregate',
      bn: '১০০% বড় বোল্ডার ভাঙা, ডাবল-ওয়াশড ও ডাস্টমুক্ত উচ্চ শক্তির পাথর চিপস',
    },
    sizesOrGrades: {
      en: '3/4" Down-Graded (20mm), 1/2" (12mm) & 5/8" RCC Casting Grade',
      bn: '৩/৪ ইঞ্চি ডাউন-গ্রেড, ১/২ ইঞ্চি ও ৫/৮ ইঞ্চি আরসিসি ঢালাই গ্রেড',
    },
    unit: { en: 'Cubic Foot (CFT)', bn: 'সিএফটি (CFT)' },
    indicativeRateBDT: 215,
    minOrder: '500 CFT',
  },
  {
    id: 'sylhet-sand',
    category: 'aggregate',
    imageUrl: '/images/materials/sand.jpg',
    name: {
      en: 'Sylhet Coarse Red Sand (Casting) & Local Plaster/Filling Sand',
      bn: 'সিলেট মোটা লাল বালু (ঢালাই) এবং আস্তর ও ভিটি বালু',
    },
    brands: {
      en: 'Original Sylhet Sunamganj Red Sand · Munshiganj Plaster Sand · Dredged Sand',
      bn: 'সিলেটের আসল লাল মোটা বালু · চিকন আস্তর বালু · ড্রেজার ভিটি বালু',
    },
    specification: {
      en: 'Silt-free coarse sand (FM 2.5–2.8) for RCC concrete & screened fine sand',
      bn: 'কাদামুক্ত মোটা সিলেট বালু (FM 2.5+) এবং পরিষ্কার আস্তর ও ভরাট বালু',
    },
    sizesOrGrades: {
      en: 'FM 2.5+ (RCC Casting), FM 1.5 (Plastering) & FM 0.8–1.0 (Compaction)',
      bn: 'সিলেট ঢালাই বালু (FM 2.5+), প্লাস্টার বালু এবং ভিটি ভরাট বালু',
    },
    unit: { en: 'Cubic Foot (CFT)', bn: 'সিএফটি (CFT)' },
    indicativeRateBDT: 88,
    minOrder: '500 CFT',
  },
  {
    id: 'first-class-bricks',
    category: 'masonry',
    imageUrl: '/images/materials/bricks.jpg',
    name: {
      en: '1st Class Auto-Kiln Clay Bricks & Picked Jhama Khoa',
      bn: '১নং অটো ভাটার ইট, পিকেট ইট ও ১নং ইটের খোয়া',
    },
    brands: {
      en: 'Narayanganj & Dhaka Auto-Tunnel Kiln 1st Class Bricks (A-Grade)',
      bn: 'নারায়ণগঞ্জ ও ঢাকার সেরা অটো ভাটার ১নং লাল ইট ও মেশিন ভাঙা খোয়া',
    },
    specification: {
      en: 'Uniform size (9.5" × 4.5" × 2.75"), sharp edges, metallic ringing sound',
      bn: 'সমান সাইজ, নিখুঁত পোড়ানো, উচ্চ কমপ্রেসিভ স্ট্রেন্থ ও লবণমুক্ত ১নং ইট',
    },
    sizesOrGrades: {
      en: '1st Class Solid Clay Bricks, Picked Paving Bricks & 3/4" Brick Chips',
      bn: '১নং গাঁথুনির ইট, সলিংয়ের পিকেট ইট এবং ঢালাইয়ের ১নং ইটের খোয়া',
    },
    unit: { en: 'Per 1,000 Bricks', bn: 'প্রতি ১,০০০ পিস' },
    indicativeRateBDT: 13500,
    minOrder: '5,000 Bricks',
  },
  {
    id: 'concrete-hollow-blocks',
    category: 'masonry',
    imageUrl: '/images/materials/concrete_blocks.jpg',
    name: {
      en: 'Concrete Hollow Blocks, Solid Blocks & Interlocking Uni-Blocks',
      bn: 'কংক্রিট হলো ব্লক, সলিড ব্লক এবং ইন্টারলকিং ইউনি-ব্লক',
    },
    brands: {
      en: 'Eco-Friendly Vibro-Compacted Hydraulic Concrete Blocks',
      bn: 'আধুনিক হাইড্রোলিক মেশিনে তৈরি পরিবেশবান্ধব কংক্রিট ও পেভমেন্ট ব্লক',
    },
    specification: {
      en: 'Thermal & sound insulated lightweight walls + heavy-duty road pavers',
      bn: 'ভবনের ওজন কমাতে হলো ব্লক এবং ফ্যাক্টরি ইয়ার্ড/রাস্তার জন্য হেভি ইউনি-ব্লক',
    },
    sizesOrGrades: {
      en: '390×190×100mm Hollow Block & 60mm / 80mm Heavy Traffic Uni-Paver',
      bn: '৪ ইঞ্চি ও ৮ ইঞ্চি হলো ব্লক এবং ৬০ মিমি / ৮০ মিমি হেভি-ডিউটি ইউনি-ব্লক',
    },
    unit: { en: 'Per 1,000 Pieces', bn: 'প্রতি ১,০০০ পিস' },
    indicativeRateBDT: 42000,
    minOrder: '2,000 Pieces',
  },
];

export const REPRESENTATIVE_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'tanbazar-commercial-warehouse',
    imageUrl: '/images/materials/rcc_construction.jpg',
    title: {
      en: 'Multi-Story Commercial Yarn & Textile Storage Complex',
      bn: 'বহুতল বাণিজ্যিক ইয়ার্ন ও টেক্সটাইল ওয়্যারহাউস কমপ্লেক্স',
    },
    location: {
      en: 'Tanbazar Commercial Zone, Narayanganj-1400',
      bn: 'টানবাজার বাণিজ্যিক এলাকা, নারায়ণগঞ্জ-১৪০০',
    },
    division: {
      en: 'Civil Construction & Bulk Material Supply',
      bn: 'সিভিল কনস্ট্রাকশন ও নির্মাণ সামগ্রী সরবরাহ',
    },
    period: {
      en: 'Completed in 8 Months (2024–2025)',
      bn: '৮ মাসে সফলভাবে সম্পন্ন (২০২৪–২০২৫)',
    },
    quantifiedOutcome: {
      en: '18,500 Sq.Ft RCC Structure Delivered 14 Days Ahead of Schedule',
      bn: 'নির্ধারিত সময়ের ১৪ দিন পূর্বে ১৮,৫০০ বর্গফুট আরসিসি ভবন হস্তান্তর',
    },
    scopeSummary: {
      en: 'Executed deep cast-in-situ foundation piling, heavy-load industrial floor slabs, and supplied 145 MT of 500W TMT rebar and 6,200 bags of OPC cement directly from our S.M. Maleh Road hub.',
      bn: 'গভীর আরসিসি পাইলিং, হেভি-লোড ইন্ডাস্ট্রিয়াল ফ্লোর স্ল্যাব নির্মাণ এবং ১৪৫ মেট্রিক টন ৫০০W রড ও ৬,২০০ বস্তা সিমেন্ট সরবরাহ।',
    },
    metrics: [
      { label: { en: 'Built-Up Area', bn: 'মোট আয়তন' }, value: '18,500 sq.ft' },
      { label: { en: 'Steel Supplied', bn: 'সরবরাহকৃত রড' }, value: '145 MT' },
      { label: { en: 'On-Time Rate', bn: 'সময়মতো ডেলিভারি' }, value: '100%' },
    ],
  },
  {
    id: 'ncc-road-drainage',
    imageUrl: '/images/materials/stone_chips.jpg',
    title: {
      en: 'Municipal RCC Roadway & Box Drainage Infrastructure Supply',
      bn: 'আরসিসি রাস্তা ও বক্স ড্রেনেজ অবকাঠামো উন্নয়ন ও মালামাল সরবরাহ',
    },
    location: {
      en: 'Sadar Industrial Corridor, Narayanganj',
      bn: 'সদর শিল্প করিডোর, নারায়ণগঞ্জ',
    },
    division: {
      en: 'Public Contracting & Aggregate Supply',
      bn: 'ঠিকাদারি ও পাথর-সিমেন্ট সরবরাহ',
    },
    period: {
      en: 'Executed Across 5 Months (2025)',
      bn: '৫ মাসে বাস্তবায়িত (২০২৫)',
    },
    quantifiedOutcome: {
      en: '38,000 CFT Graded Stone Aggregate & 4,500 Bags Cement Supplied',
      bn: '৩৮,০০০ সিএফটি পাথর চিপস ও ৪,৫০০ বস্তা সিমেন্ট নিরবচ্ছিন্ন সরবরাহ',
    },
    scopeSummary: {
      en: 'Provided uninterrupted night-shift aggregate and cement logistics alongside RCC box culvert shuttering and concrete pouring for high-traffic municipal arterial lanes.',
      bn: 'ব্যস্ত সড়কে যানজট এড়াতে রাতের শিফটে ৩৮,০০০ সিএফটি বোল্ডার পাথর ও সিমেন্ট সরবরাহ এবং আরসিসি ড্রেনেজ ও ঢালাই কাজ সম্পন্ন।',
    },
    metrics: [
      { label: { en: 'Stone Aggregate', bn: 'পাথর চিপস' }, value: '38,000 CFT' },
      { label: { en: 'Concrete Grade', bn: 'কংক্রিট গ্রেড' }, value: '3,500 PSI' },
      { label: { en: 'Batch Rejection', bn: 'মান নিয়ন্ত্রণ ত্রুটি' }, value: '0.0%' },
    ],
  },
  {
    id: 'fatullah-garments-boundary-shed',
    imageUrl: '/images/projects/excavator_dump_truck.jpg',
    title: {
      en: 'Export Knitwear Factory Expansion & Perimeter Security Wall',
      bn: 'এক্সপোর্ট নিটওয়্যার ফ্যাক্টরি সম্প্রসারণ ও বাউন্ডারি ওয়াল নির্মাণ',
    },
    location: {
      en: 'Sadar / Fatullah Industrial Belt, Narayanganj',
      bn: 'সদর / ফতুল্লা শিল্পাঞ্চল, নারায়ণগঞ্জ',
    },
    division: {
      en: 'Turnkey Contracting & Earthwork',
      bn: 'টার্নকি ঠিকাদারি ও ভূমি উন্নয়ন',
    },
    period: {
      en: 'Completed in 4.5 Months (2025–2026)',
      bn: '৪.৫ মাসে সম্পন্ন (২০২৫–২০২৬)',
    },
    quantifiedOutcome: {
      en: '1,420 Running Feet RCC Retaining Wall & 65,000 CFT Sand Compaction',
      bn: '১,৪২০ রানিং ফুট আরসিসি রিটেইনিং ওয়াল ও ৬৫,০০০ সিএফটি বালু ভরাট',
    },
    scopeSummary: {
      en: 'Completed land elevation with compacted river sand, constructed heavy-duty RCC perimeter retaining walls, and built the main security gatehouse and loading bay apron.',
      bn: 'কম্প্যাক্টেড বালু ভরাটের মাধ্যমে জমি উঁচুকরণ, হেভি-ডিউটি আরসিসি রিটেইনিং বাউন্ডারি ওয়াল এবং লোডিং বে ও মেইন গেটহাউস নির্মাণ।',
    },
    metrics: [
      { label: { en: 'Perimeter Length', bn: 'বাউন্ডারি দৈর্ঘ্য' }, value: '1,420 RFT' },
      { label: { en: 'Sand Compaction', bn: 'বালু ভরাট' }, value: '65,000 CFT' },
      { label: { en: 'Safety Incidents', bn: 'দুর্ঘটনা হার' }, value: '0' },
    ],
  },
];
