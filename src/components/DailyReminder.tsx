import React, { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff } from 'lucide-react';

const SETTINGS_KEY = 'lwm-reminder-settings'; // { enabled: boolean, time: 'HH:MM' }
const LAST_FIRED_KEY = 'lwm-reminder-last-fired'; // 'YYYY-MM-DD'

interface ReminderSettings {
  enabled: boolean;
  time: string; // 'HH:MM', 24h
}

function loadSettings(): ReminderSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enabled: false, time: '07:00' };
}

function saveSettings(settings: ReminderSettings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}

/**
 * Checks whether today's reminder is due and, if so, fires a local
 * notification with today's verse. Call this once on app load (and
 * optionally on an interval) — see PWA_SETUP_INSTRUCTIONS.md for wiring.
 *
 * Honest limitation: this only fires while/when the app is actually open
 * in a tab (or briefly after, via the service worker). A notification that
 * arrives while the app is fully closed requires a server push service —
 * out of scope for a client-only PWA.
 */
export function checkAndFireDailyReminder(verseReference: string, verseText: string) {
  try {
    const settings = loadSettings();
    if (!settings.enabled) return;
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    if (localStorage.getItem(LAST_FIRED_KEY) === todayStr) return;

    const [h, m] = settings.time.split(':').map(Number);
    const reminderMinutes = h * 60 + m;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (nowMinutes < reminderMinutes) return;

    localStorage.setItem(LAST_FIRED_KEY, todayStr);

    const title = 'Your daily verse is ready';
    const body = `${verseReference} — ${verseText}`;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, { body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', tag: 'daily-verse' });
      }).catch(() => {
        new Notification(title, { body });
      });
    } else {
      new Notification(title, { body });
    }
  } catch {}
}

/** Settings card — drop this anywhere, e.g. your Home page. */
export default function DailyReminder() {
  const [settings, setSettings] = useState<ReminderSettings>(loadSettings);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission
  );

  useEffect(() => { saveSettings(settings); }, [settings]);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') setSettings(s => ({ ...s, enabled: true }));
  }, []);

  const toggle = useCallback(() => {
    if (permission !== 'granted') {
      requestPermission();
      return;
    }
    setSettings(s => ({ ...s, enabled: !s.enabled }));
  }, [permission, requestPermission]);

  if (permission === 'unsupported') return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${settings.enabled && permission === 'granted' ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-400'}`}>
          {settings.enabled && permission === 'granted' ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900">Daily Reminder</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Get a nudge with your verse when you open the app on or after your chosen time.
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={toggle}
              role="switch"
              aria-checked={settings.enabled && permission === 'granted'}
              className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${settings.enabled && permission === 'granted' ? 'bg-amber-600' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.enabled && permission === 'granted' ? 'translate-x-4' : ''}`} />
            </button>

            <input
              type="time"
              value={settings.time}
              onChange={e => setSettings(s => ({ ...s, time: e.target.value }))}
              disabled={permission !== 'granted'}
              className="text-sm rounded-lg border border-gray-200 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-40"
            />
          </div>

          {permission === 'denied' && (
            <p className="text-[11px] text-red-500 mt-2">
              Notifications are blocked for this site in your browser settings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
