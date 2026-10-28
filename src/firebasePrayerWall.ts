// Shared prayer wall — optional layer on top of the private prayer requests
// in prayerStorage.ts. Requires a Firebase project (Firestore enabled).
// Everything in this file degrades gracefully: until firebaseConfig below is
// filled in, isPrayerWallConfigured() returns false and the UI shows a
// friendly "not set up yet" message instead of crashing.
//
// Setup: npm install firebase
// Then fill in the six fields below from Firebase Console →
// Project settings → General → Your apps → SDK setup and configuration.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit,
  getDocs, doc, updateDoc, increment, type Firestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function isPrayerWallConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

function getDb(): Firestore {
  if (!isPrayerWallConfigured()) {
    throw new Error('Prayer wall is not configured yet.');
  }
  if (!app) app = initializeApp(firebaseConfig);
  if (!db) db = getFirestore(app);
  return db;
}

export interface SharedPrayer {
  id: string;
  text: string;
  category: string;
  createdAt: number | null;
  prayerCount: number;
}

/** Posts a request to the public wall. Always anonymous — no name field. */
export async function shareToWall(text: string, category: string): Promise<string> {
  const database = getDb();
  const ref = await addDoc(collection(database, 'prayers'), {
    text: text.trim(),
    category,
    createdAt: serverTimestamp(),
    prayerCount: 0,
  });
  return ref.id;
}

export async function listWallPrayers(max = 50): Promise<SharedPrayer[]> {
  const database = getDb();
  const q = query(collection(database, 'prayers'), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as Record<string, any>;
    return {
      id: d.id,
      text: data.text ?? '',
      category: data.category ?? 'Other',
      createdAt: data.createdAt?.toMillis?.() ?? null,
      prayerCount: data.prayerCount ?? 0,
    };
  });
}

const PRAYED_FOR_KEY = 'lwm-prayed-for-ids';

function getPrayedForSet(): Set<string> {
  try {
    const raw = localStorage.getItem(PRAYED_FOR_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function savePrayedForSet(set: Set<string>) {
  try { localStorage.setItem(PRAYED_FOR_KEY, JSON.stringify([...set])); } catch {}
}

/** Whether this device has already tapped "praying for this" on a request. */
export function hasPrayedFor(id: string): boolean {
  return getPrayedForSet().has(id);
}

/** Increments the request's prayer count — once per device, enforced locally. */
export async function prayForRequest(id: string): Promise<void> {
  if (hasPrayedFor(id)) return;
  const database = getDb();
  await updateDoc(doc(database, 'prayers', id), { prayerCount: increment(1) });
  const set = getPrayedForSet();
  set.add(id);
  savePrayedForSet(set);
}
