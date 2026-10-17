import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Camera,
  Check,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  HardHat,
  ArrowRight,
  Lock,
  LayoutGrid,
  ShieldCheck,
} from 'lucide-react';
import {
  Language,
  SiteWorkPost,
  INITIAL_SITE_WORK_POSTS,
} from '../data/companyData';

interface SiteWorkPostsSectionProps {
  lang: Language;
  onInquireLocationWork?: (postTitle: string, location: string) => void;
}

const STORAGE_KEY = 'fr_enterprise_site_work_posts_v1';
const IDB_NAME = 'fr_enterprise_permanent_db';
const IDB_STORE = 'site_posts_store';
const IDB_KEY = 'locked_site_posts_v1';

// IndexedDB helpers for unlimited browser storage
function openPermanentDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function savePostsToIndexedDB(posts: SiteWorkPost[]): Promise<void> {
  try {
    const db = await openPermanentDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(posts, IDB_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // ignore IDB errors
  }
}

async function loadPostsFromIndexedDB(): Promise<SiteWorkPost[] | null> {
  try {
    const db = await openPermanentDB();
    return await new Promise<SiteWorkPost[] | null>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
      req.onsuccess = () => {
        if (Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

// Merge two post lists without ever losing any custom post or attached photo
function mergePostLists(primary: SiteWorkPost[], secondary: SiteWorkPost[]): SiteWorkPost[] {
  const map = new Map<string, SiteWorkPost>();
  for (const p of secondary) {
    if (p && p.id) {
      map.set(p.id, p);
    }
  }
  for (const p of primary) {
    if (p && p.id) {
      const existing = map.get(p.id);
      if (existing) {
        const mergedImages = Array.from(
          new Set([...(p.images || []), ...(existing.images || [])])
        );
        map.set(p.id, {
          ...existing,
          ...p,
          images: mergedImages,
        });
      } else {
        map.set(p.id, p);
      }
    }
  }
  const all = Array.from(map.values());
  const custom = all.filter((p) => p.id.startsWith('custom-post-'));
  const standard = all.filter((p) => !p.id.startsWith('custom-post-'));
  return [...custom, ...standard];
}

export const SiteWorkPostsSection: React.FC<SiteWorkPostsSectionProps> = ({
  lang,
  onInquireLocationWork,
}) => {
  const [posts, setPosts] = useState<SiteWorkPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergePostLists(INITIAL_SITE_WORK_POSTS, parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_SITE_WORK_POSTS;
  });

  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed' | 'supply'>('all');
  const [activeImageIdxByPost, setActiveImageIdxByPost] = useState<Record<string, number>>({});

  // Lightbox & Grid Gallery state
  const [lightboxPost, setLightboxPost] = useState<SiteWorkPost | null>(null);
  const [lightboxImgIndex, setLightboxImgIndex] = useState<number>(0);
  const [gridViewPost, setGridViewPost] = useState<SiteWorkPost | null>(null);

  // Sync with IndexedDB + Backend Disk Storage (/api/site-posts/sync) on mount
  useEffect(() => {
    let mounted = true;
    async function hydrateAndSyncPermanentPosts() {
      let currentMerged = mergePostLists(INITIAL_SITE_WORK_POSTS, posts);

      const idbPosts = await loadPostsFromIndexedDB();
      if (idbPosts && idbPosts.length > 0) {
        currentMerged = mergePostLists(currentMerged, idbPosts);
      }

      try {
        const res = await fetch('/api/site-posts');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.posts) && data.posts.length > 0) {
            currentMerged = mergePostLists(currentMerged, data.posts);
          }
        }
      } catch {
        // ignore network error
      }

      try {
        const syncRes = await fetch('/api/site-posts/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ posts: currentMerged }),
        });
        if (syncRes.ok) {
          const syncData = await syncRes.json();
          if (Array.isArray(syncData?.posts) && syncData.posts.length > 0) {
            currentMerged = mergePostLists(syncData.posts, currentMerged);
          }
        }
      } catch {
        // ignore network error
      }

      if (mounted) {
        setPosts(currentMerged);
        await savePostsToIndexedDB(currentMerged);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMerged));
        } catch {
          // ignore
        }
      }
    }

    hydrateAndSyncPermanentPosts();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts =
    filterStatus === 'all'
      ? posts
      : posts.filter((p) => p.status === filterStatus);

  const totalPhotosCount = posts.reduce((acc, p) => acc + (p.images?.length || 0), 0);

  return (
    <section
      id="site-posts"
      className="py-16 lg:py-20 border-b border-slate-200 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Camera className="w-4 h-4" />
                <span>
                  {lang === 'en'
                    ? 'ON-SITE STRUCTURAL WORK GALLERY & LOCATION POSTS'
                    : 'কাজের গঠনমূলক ছবি ও অবস্থানমূলক পোস্ট (প্রজেক্ট আপডেট)'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-[11px] font-bold text-emerald-900">
                <Lock className="w-3 h-3 text-emerald-800" />
                <span>
                  {lang === 'en'
                    ? `Verified Site Gallery (${totalPhotosCount} Photos)`
                    : `স্থায়ী প্রজেক্ট গ্যালারি (${totalPhotosCount}টি ছবি)`}
                </span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              {lang === 'en'
                ? 'Constructive Site Photography & Location-Based Work Updates'
                : 'আমাদের কাজের গঠনমূলক ছবি এবং প্রজেক্ট সাইটের অবস্থানমূলক পোস্ট'}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'en'
                ? 'Explore verified on-site photographs of RCC column/slab casting, rebar cage fabrication, excavation, brick masonry, and bulk material dispatch across Narayanganj under M/S FR Enterprise.'
                : 'টানবাজার, ফতুল্লা, সিদ্ধিরগঞ্জ, চাষাড়া, বন্দর ও সোনারগাঁওসহ বিভিন্ন লোকেশনে এম/এস এফআর এন্টারপ্রাইজের চলমান ও সম্পন্নকৃত আরসিসি ঢালাই, রড বাইন্ডিং, মাটি খনন, ইটের গাঁথুনি এবং মালামাল সরবরাহের গঠনমূলক ছবি ও অবস্থানমূলক বিবরণ।'}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            {[
              {
                id: 'all',
                labelEn: `All Site Posts (${posts.length})`,
                labelBn: `সকল কাজের পোস্ট (${posts.length})`,
              },
              {
                id: 'ongoing',
                labelEn: 'Ongoing Structural Works',
                labelBn: 'চলমান গঠনমূলক কাজ',
              },
              {
                id: 'completed',
                labelEn: 'Completed Works',
                labelBn: 'সম্পন্ন কাজ',
              },
              {
                id: 'supply',
                labelEn: 'Site Material Dispatch',
                labelBn: 'সাইটে মালামাল সরবরাহ',
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setFilterStatus(tab.id as 'all' | 'ongoing' | 'completed' | 'supply')
                }
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>

          <div className="text-xs text-emerald-900 font-medium flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {lang === 'en'
                ? 'Supervised by Proprietor Faysal Rahman · M/S FR Enterprise'
                : 'প্রোপ্রাইটর ফয়সাল রহমানের সরাসরি তত্ত্বাবধানে পরিচালিত'}
            </span>
          </div>
        </div>

        {/* Grid of Location-Based Structural Work Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post) => {
            const activeIdx = activeImageIdxByPost[post.id] || 0;
            const currentImg = post.images[activeIdx] || post.images[0];

            const statusColorClass =
              post.status === 'ongoing'
                ? 'bg-amber-500/95 text-slate-950'
                : post.status === 'completed'
                ? 'bg-emerald-600/95 text-white'
                : 'bg-sky-600/95 text-white';

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Location Header Bar (কাজের অবস্থানমূলক হেডার) */}
                  <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold truncate" title={post.location[lang]}>
                        {post.location[lang]}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md shrink-0 ${statusColorClass}`}
                    >
                      {post.statusLabel[lang]}
                    </span>
                  </div>

                  {/* Primary Structural Work Image Showcase with Left/Right Navigation */}
                  <div className="relative h-64 w-full bg-slate-950 overflow-hidden group">
                    <img
                      src={currentImg}
                      alt={post.title[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Quick Prev/Next Arrows right on the card for browsing photos easily */}
                    {post.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIdxByPost((prev) => ({
                              ...prev,
                              [post.id]:
                                activeIdx === 0 ? post.images.length - 1 : activeIdx - 1,
                            }))
                          }
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white border border-slate-700 transition-colors cursor-pointer z-10"
                          title={lang === 'en' ? 'Previous Photo' : 'আগের ছবি'}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIdxByPost((prev) => ({
                              ...prev,
                              [post.id]:
                                activeIdx === post.images.length - 1 ? 0 : activeIdx + 1,
                            }))
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white border border-slate-700 transition-colors cursor-pointer z-10"
                          title={lang === 'en' ? 'Next Photo' : 'পরের ছবি'}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Bottom Gradient Overlay with Category & Date */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-between p-4 pointer-events-none">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[11px] font-semibold text-emerald-300 border border-slate-700">
                          {post.workCategory[lang]}
                        </span>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          {post.images.length > 4 && (
                            <button
                              type="button"
                              onClick={() => setGridViewPost(post)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-800/95 hover:bg-emerald-700 text-white text-[11px] font-bold border border-emerald-600 inline-flex items-center gap-1 transition-colors cursor-pointer"
                              title={
                                lang === 'en'
                                  ? `View all ${post.images.length} photos in grid`
                                  : `সবগুলো (${post.images.length}টি) ছবি একসাথে দেখুন`
                              }
                            >
                              <LayoutGrid className="w-3.5 h-3.5" />
                              <span>
                                {lang === 'en'
                                  ? `All ${post.images.length}`
                                  : `সব ছবি (${post.images.length})`}
                              </span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setLightboxPost(post);
                              setLightboxImgIndex(activeIdx);
                            }}
                            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-colors cursor-pointer"
                            title={lang === 'en' ? 'View Fullscreen' : 'বড় করে দেখুন'}
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-xs text-slate-200">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {post.date[lang]}
                        </span>
                        <span className="font-mono-num text-[11px] bg-slate-900/85 px-2.5 py-0.5 rounded border border-slate-700 font-bold">
                          {activeIdx + 1} / {post.images.length}{' '}
                          {lang === 'en' ? 'Photos' : 'টি ছবি'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Photo Thumbnail Strip (Clean Read-Only View) */}
                  <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-x-auto py-0.5 w-full">
                      {post.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setActiveImageIdxByPost((prev) => ({
                              ...prev,
                              [post.id]: idx,
                            }))
                          }
                          className={`relative w-12 h-9 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                            activeIdx === idx
                              ? 'border-emerald-700 ring-1 ring-emerald-700'
                              : 'border-slate-300 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Post Content Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {post.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {post.description[lang]}
                    </p>

                    {/* Structural Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'en'
                          ? 'Structural & Supply Details:'
                          : 'গঠনমূলক কাজ ও মালামালের বিবরণ:'}
                      </div>
                      <ul className="space-y-1.5">
                        {post.structuralHighlights[lang].map((item, i) => (
                          <li
                            key={i}
                            className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Supervisor Attribution & Inquiry Action */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium truncate">
                    <HardHat className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span className="truncate">{post.supervisor[lang]}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {onInquireLocationWork && (
                      <button
                        type="button"
                        onClick={() =>
                          onInquireLocationWork(post.title[lang], post.location[lang])
                        }
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>
                          {lang === 'en' ? 'Order / Inquire' : 'অর্ডার / যোগাযোগ'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Multi-Photo Grid Modal (View All Photos at Once) */}
      {gridViewPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{gridViewPost.location[lang]}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <Lock className="w-3 h-3" />
                    {gridViewPost.images.length} Photos
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-extrabold mt-0.5">
                  {gridViewPost.title[lang]}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setGridViewPost(null)}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 bg-slate-100">
              {gridViewPost.images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setLightboxPost(gridViewPost);
                    setLightboxImgIndex(idx);
                  }}
                  className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-300 cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <img
                    src={imgSrc}
                    alt={`${gridViewPost.title[lang]} - ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute bottom-1.5 right-1.5 bg-slate-900/85 text-white text-[11px] font-mono-num font-bold px-2 py-0.5 rounded">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Inspecting Construction Photos */}
      {lightboxPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4 text-white">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{lightboxPost.location[lang]}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold truncate mt-0.5">
                  {lightboxPost.title[lang]}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setLightboxPost(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black h-[55vh] sm:h-[65vh] flex items-center justify-center">
              <img
                src={lightboxPost.images[lightboxImgIndex] || lightboxPost.images[0]}
                alt={lightboxPost.title[lang]}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />

              {lightboxPost.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImgIndex((prev) =>
                        prev === 0 ? lightboxPost.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImgIndex((prev) =>
                        prev === lightboxPost.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
              <p className="max-w-2xl">{lightboxPost.description[lang]}</p>
              <span className="font-mono-num text-emerald-400 font-bold">
                {lightboxImgIndex + 1} / {lightboxPost.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
