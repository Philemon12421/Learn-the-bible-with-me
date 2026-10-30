import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BookOpen, Download, ChevronLeft, ChevronRight, Trash2, Loader2, X, CheckCircle2 } from 'lucide-react';
import { BIBLE_BOOKS, TOTAL_CHAPTERS, type BibleBookMeta } from '../bibleBooks';
import {
  getChapter, isTranslationComplete, deleteTranslation,
  getStorageEstimate, type TranslationCode, type BibleVerseEntry,
} from '../bibleStorage';
import { downloadTranslation, type DownloadProgress } from '../bibleDownload';

const TRANSLATION_LABEL: Record<TranslationCode, string> = { kjv: 'King James Version', web: 'World English Bible' };

type ReaderMode = 'loading' | 'download' | 'books' | 'chapters' | 'reading';

export default function BibleReaderView() {
  const [mode, setMode] = useState<ReaderMode>('loading');
  const [downloaded, setDownloaded] = useState<Record<TranslationCode, boolean>>({ kjv: false, web: false });
  const [translation, setTranslation] = useState<TranslationCode>('kjv');

  const [downloadingWhich, setDownloadingWhich] = useState<TranslationCode | null>(null);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [selectedBook, setSelectedBook] = useState<BibleBookMeta | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verses, setVerses] = useState<BibleVerseEntry[] | null>(null);

  const [storageInfo, setStorageInfo] = useState<{ usageMB: number; quotaMB: number } | null>(null);

  const refreshDownloadState = useCallback(async () => {
    const [kjvDone, webDone] = await Promise.all([isTranslationComplete('kjv'), isTranslationComplete('web')]);
    setDownloaded({ kjv: kjvDone, web: webDone });
    getStorageEstimate().then(setStorageInfo);
    return { kjvDone, webDone };
  }, []);

  useEffect(() => {
    refreshDownloadState().then(({ kjvDone, webDone }) => {
      if (kjvDone || webDone) {
        setTranslation(kjvDone ? 'kjv' : 'web');
        setMode('books');
      } else {
        setMode('download');
      }
    });
  }, [refreshDownloadState]);

  const startDownload = useCallback(async (code: TranslationCode) => {
    setDownloadingWhich(code);
    setDownloadError(null);
    setProgress({ done: 0, total: TOTAL_CHAPTERS, percent: 0 });
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await downloadTranslation(code, setProgress, controller.signal);
      await refreshDownloadState();
      setTranslation(code);
      setMode('books');
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setDownloadError((err as Error).message || 'Download failed — check your connection and try again.');
      }
    } finally {
      setDownloadingWhich(null);
      abortRef.current = null;
    }
  }, [refreshDownloadState]);

  const cancelDownload = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const openBook = useCallback((book: BibleBookMeta) => {
    setSelectedBook(book);
    setMode('chapters');
  }, []);

  const openChapter = useCallback(async (chapter: number) => {
    if (!selectedBook) return;
    setSelectedChapter(chapter);
    setVerses(null);
    setMode('reading');
    const v = await getChapter(translation, selectedBook.id, chapter);
    setVerses(v);
  }, [selectedBook, translation]);

  const goToChapter = useCallback(async (delta: number) => {
    if (!selectedBook || selectedChapter == null) return;
    let bookIndex = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
    let nextChapter = selectedChapter + delta;
    let book = selectedBook;

    if (nextChapter < 1) {
      bookIndex = Math.max(0, bookIndex - 1);
      book = BIBLE_BOOKS[bookIndex];
      nextChapter = book.chapters;
    } else if (nextChapter > selectedBook.chapters) {
      bookIndex = Math.min(BIBLE_BOOKS.length - 1, bookIndex + 1);
      book = BIBLE_BOOKS[bookIndex];
      nextChapter = 1;
    }

    setSelectedBook(book);
    setSelectedChapter(nextChapter);
    setVerses(null);
    const v = await getChapter(translation, book.id, nextChapter);
    setVerses(v);
  }, [selectedBook, selectedChapter, translation]);

  const handleDeleteTranslation = useCallback(async (code: TranslationCode) => {
    await deleteTranslation(code);
    const { kjvDone, webDone } = await refreshDownloadState();
    if (!kjvDone && !webDone) setMode('download');
    else if (translation === code) setTranslation(kjvDone ? 'kjv' : 'web');
  }, [refreshDownloadState, translation]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (mode === 'loading') {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-sm text-gray-400">Checking what's already downloaded…</div>;
  }

  // ── Download screen ──────────────────────────────────────────────────────
  if (mode === 'download' || downloadingWhich) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-gray-900 mb-2">Read the Bible Offline</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Download a full translation once (~4–5MB) and read every book and chapter with no connection needed afterward.
          </p>
        </div>

        {downloadingWhich ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-800">Downloading {TRANSLATION_LABEL[downloadingWhich]}</span>
              <button onClick={cancelDownload} aria-label="Cancel" className="text-gray-300 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress?.percent ?? 0}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {progress?.stage === 'fetching'
                ? 'Downloading…'
                : `${progress?.done ?? 0} / ${progress?.total ?? TOTAL_CHAPTERS} chapters saved · ${progress?.percent ?? 0}%`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {(['kjv', 'web'] as TranslationCode[]).map(code => (
              <button
                key={code}
                onClick={() => startDownload(code)}
                className="w-full flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-left"
              >
                <div>
                  <p className="text-sm font-bold text-gray-900">{TRANSLATION_LABEL[code]}</p>
                  <p className="text-xs text-gray-400">{code.toUpperCase()} · public domain</p>
                </div>
                <Download className="w-4 h-4 text-amber-600 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {downloadError && (
          <p className="text-xs text-center text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-4">{downloadError}</p>
        )}
      </div>
    );
  }

  // ── Book list ────────────────────────────────────────────────────────────
  if (mode === 'books') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <ReaderHeader
          translation={translation}
          setTranslation={setTranslation}
          downloaded={downloaded}
          onDownloadMore={() => setMode('download')}
          storageInfo={storageInfo}
          onDelete={handleDeleteTranslation}
        />
        <BookGrid title="Old Testament" books={BIBLE_BOOKS.filter(b => b.testament === 'OT')} onSelect={openBook} />
        <BookGrid title="New Testament" books={BIBLE_BOOKS.filter(b => b.testament === 'NT')} onSelect={openBook} />
      </div>
    );
  }

  // ── Chapter grid ─────────────────────────────────────────────────────────
  if (mode === 'chapters' && selectedBook) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <button onClick={() => setMode('books')} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 mb-4">
          <ChevronLeft className="w-3.5 h-3.5" /> Books
        </button>
        <h2 className="font-serif text-xl font-extrabold text-gray-900 mb-4">{selectedBook.name}</h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
          {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => (
            <button
              key={ch}
              onClick={() => openChapter(ch)}
              className="aspect-square flex items-center justify-center text-sm font-bold rounded-xl border border-gray-100 bg-white hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 text-gray-600 transition-all active:scale-95"
            >
              {ch}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Reading view ─────────────────────────────────────────────────────────
  if (mode === 'reading' && selectedBook && selectedChapter != null) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMode('chapters')} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900">
            <ChevronLeft className="w-3.5 h-3.5" /> Chapters
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">{translation.toUpperCase()}</span>
        </div>

        <h2 className="font-serif text-2xl font-extrabold text-gray-900 mb-5">{selectedBook.name} {selectedChapter}</h2>

        {verses === null ? (
          <div className="space-y-3 animate-pulse">
            {[0, 1, 2, 3, 4].map(i => <div key={i} className="h-4 bg-gray-100 rounded-full w-full" />)}
          </div>
        ) : verses.length === 0 ? (
          <p className="text-sm text-gray-400">Couldn't find this chapter locally — try re-downloading this translation.</p>
        ) : (
          <div className="space-y-3 font-serif text-[17px] leading-relaxed text-gray-800">
            {verses.map(v => (
              <p key={v.verse}>
                <sup className="text-amber-600 font-sans font-bold text-[11px] mr-1.5">{v.verse}</sup>
                {v.text}
              </p>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
          <button onClick={() => goToChapter(-1)} className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95">
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button onClick={() => goToChapter(1)} className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function ReaderHeader({
  translation, setTranslation, downloaded, onDownloadMore, storageInfo, onDelete,
}: {
  translation: TranslationCode;
  setTranslation: (t: TranslationCode) => void;
  downloaded: Record<TranslationCode, boolean>;
  onDownloadMore: () => void;
  storageInfo: { usageMB: number; quotaMB: number } | null;
  onDelete: (t: TranslationCode) => void;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const bothDownloaded = downloaded.kjv && downloaded.web;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-serif text-2xl font-extrabold text-gray-900">Bible</h1>
        <button onClick={() => setShowSettings(s => !s)} className="text-[11px] font-bold text-gray-400 hover:text-gray-600">
          {showSettings ? 'Done' : 'Manage'}
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(['kjv', 'web'] as TranslationCode[]).filter(t => downloaded[t]).map(t => (
          <button
            key={t}
            onClick={() => setTranslation(t)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${translation === t ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-gray-200 text-gray-500'}`}
          >
            {t.toUpperCase()}
          </button>
        ))}
        {!bothDownloaded && (
          <button onClick={onDownloadMore} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-dashed border-gray-200 text-gray-400 hover:text-amber-700 hover:border-amber-200 transition-all">
            <Download className="w-3 h-3" /> Add {downloaded.kjv ? 'WEB' : 'KJV'}
          </button>
        )}
      </div>

      {showSettings && (
        <div className="mt-3 bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2.5">
          {storageInfo && (
            <p className="text-xs text-gray-400">{storageInfo.usageMB} MB used on this device</p>
          )}
          {(['kjv', 'web'] as TranslationCode[]).filter(t => downloaded[t]).map(t => (
            <div key={t} className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {TRANSLATION_LABEL[t]}
              </span>
              <button onClick={() => onDelete(t)} className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-600">
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BookGrid({ title, books, onSelect }: { title: string; books: BibleBookMeta[]; onSelect: (b: BibleBookMeta) => void }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {books.map(book => (
          <button
            key={book.id}
            onClick={() => onSelect(book)}
            className="text-left text-sm font-semibold text-gray-700 bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-800 transition-all active:scale-95"
          >
            {book.name}
          </button>
        ))}
      </div>
    </div>
  );
}
