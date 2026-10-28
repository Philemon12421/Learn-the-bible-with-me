// Private prayer requests — stored entirely in localStorage. Works with no
// setup at all. Sharing a request to the public wall (see
// firebasePrayerWall.ts) is a separate, optional step the user takes per-item.

export type PrayerCategory = 'Health' | 'Family' | 'Guidance' | 'Thanksgiving' | 'Other';
export type PrayerStatus = 'praying' | 'answered';

export interface PrayerRequest {
  id: string;
  text: string;
  category: PrayerCategory;
  status: PrayerStatus;
  createdAt: number; // epoch ms
  answeredAt?: number;
  sharedWallId?: string; // set once shared to the public wall; absence = private only
}

const STORAGE_KEY = 'lwm-prayer-requests';

function readAll(): PrayerRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items: PrayerRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function listPrayers(): PrayerRequest[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function addPrayer(text: string, category: PrayerCategory): PrayerRequest {
  const item: PrayerRequest = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: text.trim(),
    category,
    status: 'praying',
    createdAt: Date.now(),
  };
  const all = readAll();
  all.push(item);
  writeAll(all);
  return item;
}

export function updatePrayerStatus(id: string, status: PrayerStatus) {
  const all = readAll();
  const item = all.find(p => p.id === id);
  if (!item) return;
  item.status = status;
  if (status === 'answered') item.answeredAt = Date.now();
  else delete item.answeredAt;
  writeAll(all);
}

export function markShared(id: string, sharedWallId: string) {
  const all = readAll();
  const item = all.find(p => p.id === id);
  if (!item) return;
  item.sharedWallId = sharedWallId;
  writeAll(all);
}

export function deletePrayer(id: string) {
  writeAll(readAll().filter(p => p.id !== id));
}

export const PRAYER_CATEGORIES: PrayerCategory[] = ['Health', 'Family', 'Guidance', 'Thanksgiving', 'Other'];
