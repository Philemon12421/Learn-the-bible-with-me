import React, { useState, useCallback } from 'react';
import { Copy, Share2, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface QuoteCardProps {
  id: string;
  type: 'bible' | 'motivation' | 'wisdom';
  title: string;
  highlightValue: string;
  quoteText: string;
  bodyExplanation: string;
  subtextLabel?: string;
  subtextContent?: string;
  accentColor: 'blue' | 'amber' | 'indigo';
}

const COLOR_MAP = {
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
    accent: 'text-blue-700',
    border: 'border-l-blue-500',
    button: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100',
    dot: 'bg-blue-500',
    tag: 'bg-blue-50 text-blue-700',
  },
  amber: {
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
    accent: 'text-amber-700',
    border: 'border-l-amber-500',
    button: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-100',
    dot: 'bg-amber-500',
    tag: 'bg-amber-50 text-amber-700',
  },
  indigo: {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    accent: 'text-indigo-700',
    border: 'border-l-indigo-500',
    button: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-100',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-50 text-indigo-700',
  },
};

export default function QuoteCard({
  id, type, title, highlightValue, quoteText, bodyExplanation,
  subtextLabel, subtextContent, accentColor
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const c = COLOR_MAP[accentColor];

  const copyText = useCallback(async () => {
    const text = type === 'bible'
      ? `"${quoteText}" — ${highlightValue}`
      : `"${quoteText}" — ${highlightValue}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [quoteText, highlightValue, type]);

  const shareContent = useCallback(async () => {
    const text = `"${quoteText}" — ${highlightValue}\n\nLearn With Me · learnthebible.vercel.app`;
    if (navigator.share) {
      try { await navigator.share({ text, title: 'Learn With Me' }); } catch {}
    } else {
      await copyText();
    }
  }, [quoteText, highlightValue, copyText]);

  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Card header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between gap-3 border-b border-gray-50">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
          <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${c.accent}`}>
            {title}
          </span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border flex-shrink-0 ${c.badge}`}>
          {highlightValue}
        </span>
      </div>

      {/* Main quote */}
      <div className={`px-6 py-6 border-l-4 ml-6 mr-6 mt-5 rounded-r-xl bg-gray-50/60 ${c.border}`}>
        <blockquote className="text-lg sm:text-xl font-serif text-gray-900 leading-relaxed font-medium italic">
          "{quoteText}"
        </blockquote>
      </div>

      {/* Explanation toggle */}
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${c.accent}`}
          aria-expanded={showExplanation}
        >
          <span>{showExplanation ? 'Hide' : 'Show'} Explanation</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showExplanation && (
        <div className="px-6 pb-4 space-y-4 animate-fade-in">
          <p className="text-sm text-gray-600 leading-relaxed">
            {bodyExplanation}
          </p>

          {subtextLabel && subtextContent && (
            <div className={`p-4 rounded-xl ${c.tag} border ${c.badge.split(' ')[2]}`}>
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1.5 opacity-60">
                {subtextLabel}
              </p>
              <p className="text-xs leading-relaxed font-medium">
                {subtextContent}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-5 pt-2 flex items-center gap-2 border-t border-gray-50">
        <button onClick={copyText} aria-label="Copy quote"
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${c.button}`}>
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <button onClick={shareContent} aria-label="Share quote"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}
