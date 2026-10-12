import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square } from 'lucide-react';

interface ReadAloudButtonProps {
  text: string;
  label?: string;
  className?: string;
}

/**
 * Reads the given text aloud using the browser's built-in SpeechSynthesis
 * API. No audio files, no dependencies, no network call for most voices —
 * pairs naturally with the daily verse and Sunday reflection pages.
 */
export default function ReadAloudButton({ text, label = 'Read Aloud', className = '' }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Stop playback if the component unmounts (e.g. navigating away mid-read).
    return () => { if (supported) window.speechSynthesis.cancel(); };
  }, [supported]);

  const toggle = () => {
    if (!supported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel(); // clear anything already queued
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      aria-pressed={speaking}
      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
        speaking
          ? 'bg-amber-600 border-amber-600 text-white'
          : 'bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100'
      } ${className}`}
    >
      {speaking ? <Square className="w-3 h-3" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>{speaking ? 'Stop' : label}</span>
    </button>
  );
}
