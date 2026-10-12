import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, WifiOff, X } from 'lucide-react';
// This import comes from vite-plugin-pwa's virtual module — see PWA_SETUP_INSTRUCTIONS.md.
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';

export default function PWAUpdateToast() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const updateFnRef = useRef<((reload?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() { setNeedsRefresh(true); },
      onOfflineReady() {
        setOfflineReady(true);
        setTimeout(() => setOfflineReady(false), 4000);
      },
    });
    updateFnRef.current = updateSW;
  }, []);

  if (needsRefresh) {
    return (
      <div className="fixed top-20 inset-x-3 sm:inset-x-auto sm:right-5 sm:w-80 z-50 animate-fade-in-up">
        <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 flex-shrink-0 text-amber-300" />
          <p className="text-xs flex-1">A new version is ready.</p>
          <button
            onClick={() => updateFnRef.current?.(true)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all active:scale-95 flex-shrink-0"
          >
            Refresh
          </button>
          <button onClick={() => setNeedsRefresh(false)} aria-label="Dismiss" className="p-1 text-gray-400 hover:text-white flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div className="fixed top-20 inset-x-3 sm:inset-x-auto sm:right-5 sm:w-80 z-50 animate-fade-in-up">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-3.5 flex items-center gap-2.5 text-xs text-gray-600">
          <WifiOff className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          Ready to work offline.
        </div>
      </div>
    );
  }

  return null;
}
