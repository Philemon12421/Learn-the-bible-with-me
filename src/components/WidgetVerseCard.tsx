import React from 'react';
// Adjust this import path if your constants file lives somewhere else —
// this assumes src/constants.ts and src/components/WidgetVerseCard.tsx.
import { getDailyBibleVerse } from '../constants';

/**
 * A minimal, self-contained "verse of the day" card meant to be embedded on
 * other sites via <iframe src="https://learnthebible.vercel.app/?widget=1">.
 * Deliberately has no header, nav, or footer — just the verse and a link back.
 * This is the realistic web equivalent of a home-screen widget: true OS
 * widgets need native code, which a web app can't provide.
 */
export default function WidgetVerseCard() {
  const verse = getDailyBibleVerse(new Date());

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4 font-sans"
      style={{ background: '#f7f7f5' }}
    >
      <a
        href="https://learnthebible.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow no-underline"
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#b45309,#92400e)' }}
          >
            ✝
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
            Verse of the Day
          </span>
        </div>

        <p className="font-serif text-base text-gray-900 leading-relaxed italic mb-2">
          "{verse.text}"
        </p>
        <p className="text-xs font-bold text-gray-500">— {verse.reference}</p>

        <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] text-gray-400">
          Learn With Me · learnthebible.vercel.app
        </div>
      </a>
    </div>
  );
}
