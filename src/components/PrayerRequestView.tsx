import React, { useState, useEffect, useCallback } from 'react';
import { HandHeart, Lock, Users, Trash2, Check, Share2, Loader2 } from 'lucide-react';
import {
  listPrayers, addPrayer, updatePrayerStatus, deletePrayer, markShared,
  PRAYER_CATEGORIES, type PrayerRequest, type PrayerCategory,
} from '../prayerStorage';
import {
  isPrayerWallConfigured, shareToWall, listWallPrayers, prayForRequest, hasPrayedFor,
  type SharedPrayer,
} from '../firebasePrayerWall';

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString();
}

export default function PrayerRequestView() {
  const [tab, setTab] = useState<'mine' | 'wall'>('mine');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mb-3">
          <HandHeart className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Prayer Requests</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Keep a private list, and share any of them to the prayer wall when you're ready.
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-6 bg-gray-50 rounded-2xl p-1 max-w-xs mx-auto">
        <button
          onClick={() => setTab('mine')}
          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl transition-all ${tab === 'mine' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500'}`}
        >
          <Lock className="w-3.5 h-3.5" /> My Prayers
        </button>
        <button
          onClick={() => setTab('wall')}
          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl transition-all ${tab === 'wall' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500'}`}
        >
          <Users className="w-3.5 h-3.5" /> Prayer Wall
        </button>
      </div>

      {tab === 'mine' ? <MyPrayersTab /> : <PrayerWallTab />}
    </div>
  );
}

// ─── My Prayers (private, localStorage) ─────────────────────────────────────

function MyPrayersTab() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<PrayerCategory>('Other');
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => { setPrayers(listPrayers()); }, []);

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;
    addPrayer(text, category);
    setText('');
    setPrayers(listPrayers());
  }, [text, category]);

  const handleStatusToggle = useCallback((p: PrayerRequest) => {
    updatePrayerStatus(p.id, p.status === 'praying' ? 'answered' : 'praying');
    setPrayers(listPrayers());
  }, []);

  const handleDelete = useCallback((id: string) => {
    deletePrayer(id);
    setPrayers(listPrayers());
  }, []);

  const handleShare = useCallback(async (p: PrayerRequest) => {
    setShareError(null);
    if (!isPrayerWallConfigured()) {
      setShareError('The prayer wall isn\u2019t set up yet \u2014 this request stays private for now.');
      return;
    }
    setSharingId(p.id);
    try {
      const wallId = await shareToWall(p.text, p.category);
      markShared(p.id, wallId);
      setPrayers(listPrayers());
    } catch {
      setShareError('Couldn\u2019t share right now \u2014 try again in a moment.');
    } finally {
      setSharingId(null);
    }
  }, []);

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value.slice(0, 500))}
          placeholder="What's on your heart today?"
          rows={3}
          className="w-full text-sm rounded-xl border border-gray-200 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all resize-none"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={category}
            onChange={e => setCategory(e.target.value as PrayerCategory)}
            className="text-xs font-semibold rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
          >
            {PRAYER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className="ml-auto text-xs font-bold px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Prayer
          </button>
        </div>
      </div>

      {shareError && (
        <p className="text-xs text-center text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">{shareError}</p>
      )}

      {prayers.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-8">Nothing here yet \u2014 add your first prayer above.</p>
      ) : (
        <div className="space-y-3">
          {prayers.map(p => (
            <div key={p.id} className={`bg-white border rounded-2xl p-4 ${p.status === 'answered' ? 'border-emerald-100 bg-emerald-50/30' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{p.category}</span>
                    {p.status === 'answered' && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Answered
                      </span>
                    )}
                    {p.sharedWallId && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">Shared</span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${p.status === 'answered' ? 'text-gray-500 line-through decoration-emerald-300' : 'text-gray-800'}`}>
                    {p.text}
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1.5">{timeAgo(p.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <button
                  onClick={() => handleStatusToggle(p)}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95"
                >
                  {p.status === 'praying' ? 'Mark Answered' : 'Still Praying'}
                </button>
                {!p.sharedWallId && (
                  <button
                    onClick={() => handleShare(p)}
                    disabled={sharingId === p.id}
                    className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {sharingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Share2 className="w-3 h-3" />}
                    Share to Wall
                  </button>
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  aria-label="Delete"
                  className="ml-auto p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Prayer Wall (shared, Firebase) ─────────────────────────────────────────

function PrayerWallTab() {
  const [loading, setLoading] = useState(true);
  const [wall, setWall] = useState<SharedPrayer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [prayingId, setPrayingId] = useState<string | null>(null);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    if (!isPrayerWallConfigured()) {
      setLoading(false);
      return;
    }
    listWallPrayers()
      .then(setWall)
      .catch(() => setError('Couldn\u2019t load the prayer wall right now.'))
      .finally(() => setLoading(false));
  }, []);

  const handlePray = useCallback(async (id: string) => {
    setPrayingId(id);
    try {
      await prayForRequest(id);
      setWall(prev => prev.map(p => (p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p)));
      forceRerender(n => n + 1);
    } catch {}
    setPrayingId(null);
  }, []);

  if (!isPrayerWallConfigured()) {
    return (
      <div className="text-center py-12 px-6">
        <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-bold text-gray-600 mb-1">The prayer wall isn't set up yet</p>
        <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
          This needs a one-time backend setup. Your private prayers in "My Prayers" work fine either way.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 animate-pulse space-y-2">
            <div className="h-2.5 w-20 bg-gray-200 rounded-full" />
            <div className="h-3 w-full bg-gray-200 rounded-full" />
            <div className="h-3 w-2/3 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-sm text-gray-400 py-8">{error}</p>;
  }

  if (wall.length === 0) {
    return <p className="text-center text-sm text-gray-400 py-8">No shared requests yet \u2014 be the first.</p>;
  }

  return (
    <div className="space-y-3">
      {wall.map(p => {
        const prayed = hasPrayedFor(p.id);
        return (
          <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{p.category}</span>
              {p.createdAt && <span className="text-[10px] text-gray-300">{timeAgo(p.createdAt)}</span>}
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">{p.text}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-[11px] text-gray-400">
                {p.prayerCount} {p.prayerCount === 1 ? 'person' : 'people'} praying
              </span>
              <button
                onClick={() => handlePray(p.id)}
                disabled={prayed || prayingId === p.id}
                className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
                  prayed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                } disabled:cursor-default`}
              >
                {prayingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <HandHeart className="w-3 h-3" />}
                {prayed ? 'Praying for this' : "I'm praying for this"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
