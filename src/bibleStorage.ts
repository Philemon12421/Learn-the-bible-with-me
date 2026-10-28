// Thin IndexedDB wrapper — no external dependency (not even the small `idb`
// package), since this is the only place in the app that needs it.

import { BIBLE_BOOKS, TOTAL_CHAPTERS } from './bibleBooks';

export type TranslationCode = 'kjv' | 'web';

export interface BibleVerseEntry {
  verse: number;
  text: string;
}

const DB_NAME = 'lwm-bible';
const DB_VERSION = 1;
const STORE_NAME = 'chapters'; // keyPath: `${translation}:${bookId}:${chapter}`

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('translation', 'translation', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function chapterKey(translation: TranslationCode, bookId: string, chapter: number): string {
  return `${translation}:${bookId}:${chapter}`;
}

export async function saveChapter(
  translation: TranslationCode,
  bookId: string,
  chapter: number,
  verses: BibleVerseEntry[]
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({
      key: chapterKey(translation, bookId, chapter),
      translation,
      bookId,
      chapter,
      verses,
    });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getChapter(
  translation: TranslationCode,
  bookId: string,
  chapter: number
): Promise<BibleVerseEntry[] | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(chapterKey(translation, bookId, chapter));
    req.onsuccess = () => resolve(req.result ? req.result.verses : null);
    req.onerror = () => reject(req.error);
  });
}

/** Counts how many chapters of this translation are already stored. */
export async function countDownloadedChapters(translation: TranslationCode): Promise<number> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const index = tx.objectStore(STORE_NAME).index('translation');
    const req = index.count(IDBKeyRange.only(translation));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function isTranslationComplete(translation: TranslationCode): Promise<boolean> {
  const count = await countDownloadedChapters(translation);
  return count >= TOTAL_CHAPTERS;
}

export async function deleteTranslation(translation: TranslationCode): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const index = tx.objectStore(STORE_NAME).index('translation');
    const req = index.openKeyCursor(IDBKeyRange.only(translation));
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        tx.objectStore(STORE_NAME).delete(cursor.primaryKey);
        cursor.continue();
      }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Rough on-device storage usage, for a "X MB used" display. Not all browsers support this. */
export async function getStorageEstimate(): Promise<{ usageMB: number; quotaMB: number } | null> {
  if (!navigator.storage?.estimate) return null;
  const { usage, quota } = await navigator.storage.estimate();
  if (usage == null || quota == null) return null;
  return { usageMB: Math.round((usage / 1024 / 1024) * 10) / 10, quotaMB: Math.round(quota / 1024 / 1024) };
}

export { BIBLE_BOOKS, TOTAL_CHAPTERS };
