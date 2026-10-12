import React, { useState, useEffect, useCallback } from 'react';
import { Download, X } from 'lucide-react';

const DISMISS_KEY = 'lwm-install-dismissed';

// The browser doesn't ship a type for this event yet.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone(): boolean {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true // iOS Safari
  );
}

export default function InstallPrompt() {
  const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISS_KEY)) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);

    const onInstalled = () => { setVisible(false); setDeferredEvent(null); };
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredEvent) return;
    await deferredEvent.prompt();
    await deferredEvent.userChoice; // resolves once the user accepts/dismisses the native dialog
    setVisible(false);
    setDeferredEvent(null);
  }, [deferredEvent]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(DISMISS_KEY, '1'); } catch {}
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-5 inset-x-3 sm:inset-x-auto sm:right-5 sm:w-80 z-50 animate-fade-in-up">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-lg"
          style={{ background: 'linear-gradient(135deg,#b45309,#92400e)' }}
        >
          ✝
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900">Install Learn With Me</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            Add it to your home screen for one-tap access, even offline.
          </p>
          <div className="flex items-center gap-2 mt-2.5">
            <button
              onClick={handleInstall}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
            >
              Not now
            </button>
          </div>
        </div>
        <button onClick={handleDismiss} aria-label="Dismiss" className="p-1 rounded-full hover:bg-gray-100 text-gray-300 flex-shrink-0">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
