import { BIBLE_BOOKS } from './bibleBooks';
import { saveChapter, getChapter, type TranslationCode, type BibleVerseEntry } from './bibleStorage';

const CONCURRENCY = 6;

interface ChapterJob {
  bookId: string;
  chapter: number;
}

function buildJobList(): ChapterJob[] {
  const jobs: ChapterJob[] = [];
  for (const book of BIBLE_BOOKS) {
    for (let c = 1; c <= book.chapters; c++) jobs.push({ bookId: book.id, chapter: c });
  }
  return jobs;
}

interface BibleApiChapterResponse {
  verses: Array<{ verse: number; text: string }>;
}

async function fetchChapter(translation: TranslationCode, bookId: string, chapter: number, signal?: AbortSignal): Promise<BibleVerseEntry[]> {
  const res = await fetch(`https://bible-api.com/data/${translation}/${bookId}/${chapter}`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch ${bookId} ${chapter}: ${res.status}`);
  const data: BibleApiChapterResponse = await res.json();
  return data.verses.map(v => ({ verse: v.verse, text: v.text.trim() }));
}

export interface DownloadProgress {
  done: number;
  total: number;
  percent: number;
}

/**
 * Downloads every chapter of a translation, skipping any already stored
 * (so a resumed/retried download doesn't re-fetch what's already there).
 * Reports progress after each chapter. Throws if aborted via `signal`, or
 * after a handful of consecutive failures (likely a network outage) rather
 * than silently giving up partway with no explanation.
 */
export async function downloadTranslation(
  translation: TranslationCode,
  onProgress: (p: DownloadProgress) => void,
  signal?: AbortSignal
): Promise<void> {
  const allJobs = buildJobList();
  const total = allJobs.length;

  // Skip chapters already downloaded (resuming a previously interrupted download).
  const jobs: ChapterJob[] = [];
  for (const job of allJobs) {
    const existing = await getChapter(translation, job.bookId, job.chapter);
    if (!existing) jobs.push(job);
  }

  let done = total - jobs.length;
  onProgress({ done, total, percent: Math.round((done / total) * 100) });

  let consecutiveFailures = 0;
  let cursor = 0;

  async function worker() {
    while (cursor < jobs.length) {
      if (signal?.aborted) throw new DOMException('Download cancelled', 'AbortError');
      const job = jobs[cursor++];
      try {
        const verses = await fetchChapter(translation, job.bookId, job.chapter, signal);
        await saveChapter(translation, job.bookId, job.chapter, verses);
        consecutiveFailures = 0;
        // Only count real successes — a retried chapter must not be counted
        // twice (once on its failed attempt, once on its retry).
        done++;
        onProgress({ done, total, percent: Math.round((done / total) * 100) });
      } catch (err) {
        if ((err as Error).name === 'AbortError') throw err;
        consecutiveFailures++;
        if (consecutiveFailures >= 10) {
          throw new Error('Too many failed requests in a row — check your connection and try again.');
        }
        // Put it back at the end of the queue to retry once more later.
        jobs.push(job);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
}
