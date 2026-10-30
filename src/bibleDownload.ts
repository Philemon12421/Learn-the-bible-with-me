import { BIBLE_BOOKS, TOTAL_CHAPTERS } from './bibleBooks';
import { saveChapter, type TranslationCode, type BibleVerseEntry } from './bibleStorage';

// One complete file per translation — maintained, public-domain Bible text,
// served through jsDelivr's CDN (proper CORS, globally cached, no meaningful
// rate limit for a single file fetch like this).
//
// IMPORTANT — do not swap this back for bible-api.com's per-chapter endpoint:
// that service is explicitly rate-limited to 15 requests/30s and its own
// terms of use say "do not use this API to download an entire bible." This
// file fetches the whole translation in ONE request instead.
const SOURCE_URL: Record<TranslationCode, string> = {
  kjv: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json',
  web: 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_web.json',
};

interface SourceBook {
  book: string;
  chapters: string[][]; // chapters[chapterIndex][verseIndex] = verse text
}

export interface DownloadProgress {
  stage: 'fetching' | 'saving';
  done: number;
  total: number;
  percent: number;
}

/**
 * Downloads a full translation (one network request), then writes every
 * chapter into IndexedDB. Progress is reported per-chapter during the save
 * phase but throttled so it doesn't trigger a React re-render 1,189 times.
 */
export async function downloadTranslation(
  translation: TranslationCode,
  onProgress: (p: DownloadProgress) => void,
  signal?: AbortSignal
): Promise<void> {
  onProgress({ stage: 'fetching', done: 0, total: 1, percent: 0 });

  const res = await fetch(SOURCE_URL[translation], { signal });
  if (!res.ok) {
    throw new Error(`Couldn't download ${translation.toUpperCase()} (server responded ${res.status}). Check your connection and try again.`);
  }

  const data: SourceBook[] = await res.json();
  if (!Array.isArray(data) || data.length !== BIBLE_BOOKS.length) {
    throw new Error('The downloaded Bible data looked different than expected — please try again, or report this if it keeps happening.');
  }

  onProgress({ stage: 'saving', done: 0, total: TOTAL_CHAPTERS, percent: 0 });

  let chaptersSaved = 0;
  const PROGRESS_EVERY = 15; // throttle UI updates — still feels smooth, far fewer re-renders

  for (let i = 0; i < BIBLE_BOOKS.length; i++) {
    if (signal?.aborted) throw new DOMException('Download cancelled', 'AbortError');

    const bookMeta = BIBLE_BOOKS[i];
    const sourceBook = data[i];
    // Books are matched by canonical order (Genesis → Revelation), not by
    // name/abbreviation string — the source's own abbreviations aren't
    // guaranteed to match our book IDs, but the book order is always fixed.
    if (!sourceBook?.chapters) continue;

    for (let c = 0; c < sourceBook.chapters.length; c++) {
      const verses: BibleVerseEntry[] = sourceBook.chapters[c].map((text, idx) => ({
        verse: idx + 1,
        text: text.trim(),
      }));
      await saveChapter(translation, bookMeta.id, c + 1, verses);
      chaptersSaved++;

      if (chaptersSaved % PROGRESS_EVERY === 0 || chaptersSaved === TOTAL_CHAPTERS) {
        onProgress({
          stage: 'saving',
          done: chaptersSaved,
          total: TOTAL_CHAPTERS,
          percent: Math.round((chaptersSaved / TOTAL_CHAPTERS) * 100),
        });
      }
    }
  }
}
