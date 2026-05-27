import React, { useRef, useState } from 'react';
import { Copy, Share2, Download, Check, ClipboardCheck, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';

interface QuoteCardProps {
  id: string;
  type: 'bible' | 'motivation' | 'wisdom';
  title: string;          // e.g. "VERSE OF THE DAY" or "DAILY WISDOM"
  highlightValue: string; // Bible Reference, Author name, etc.
  quoteText: string;
  bodyExplanation: string;
  subtextLabel?: string;  // e.g. "Reflection", "Actionable Insight", etc.
  subtextContent?: string;
  accentColor?: string;
}

export default function QuoteCard({
  id,
  type,
  title,
  highlightValue,
  quoteText,
  bodyExplanation,
  subtextLabel,
  subtextContent,
  accentColor = 'blue'
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const formattedText = `"${quoteText}"\n— ${highlightValue} (${type.toUpperCase()})\n\nExplanation: ${bodyExplanation}${subtextContent ? `\n\n${subtextLabel}: ${subtextContent}` : ''}\n\nShared via Learn With Me`;
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Learn With Me - Daily ${type}`,
      text: `"${quoteText}" — ${highlightValue}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch (err) {
        // user cancelled or fallback
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    handleCopy();
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current || isDownloading) return;

    try {
      setIsDownloading(true);

      // Create a small delay to allow transition state adjustments if any
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Target options for high-quality export
      const options = {
        backgroundColor: '#ffffff',
        scale: 3, // High DPI resolution multiplier
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDocument: any) => {
          // You can perform visual adjustment modifications on the cloned document if needed.
          // For instance, we can expand custom card borders or ensure shadow opacity displays perfectly.
          const element = clonedDocument.getElementById(`card-download-${id}`);
          if (element) {
            element.style.borderRadius = '24px';
            element.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.08)';
          }
        }
      };

      const canvas = await html2canvas(cardRef.current, options);
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create dummy clickable anchor element to start local filesystem download
      const link = document.createElement('a');
      link.download = `learn-with-me-${type}-${id}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error('Failed to export card as image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Color theme selectors
  const badgeColors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  };

  const activeBadgeColor = badgeColors[accentColor as keyof typeof badgeColors] || badgeColors.blue;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 transition-all duration-300">
      
      {/* Toast Alert popups built directly on the card to bypass iframe alert limits */}
      <div className="h-6 overflow-hidden relative mb-2">
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100/50 px-4 py-0.5 max-w-max mx-auto animate-fade-in-up">
            <ClipboardCheck className="w-3.5 h-3.5 mr-1" /> Copied to clipboard! Ready to share.
          </div>
        )}
        {shared && !copied && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100/50 px-4 py-0.5 max-w-max mx-auto animate-fade-in-up">
            <Share2 className="w-3.5 h-3.5 mr-1" /> Link & Quote copied to clipboard!
          </div>
        )}
      </div>

      {/* The visible printable card */}
      <div
        id={`card-download-${id}`}
        ref={cardRef}
        className="w-full bg-white backdrop-blur-md rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xl shadow-gray-200/40 relative overflow-hidden flex flex-col justify-between"
      >
        {/* Soft background glow accents (hidden in some clean configurations, but gorgeous in glassmorphism) */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />

        {/* Card Header information */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] tracking-widest font-mono font-bold uppercase py-1 px-3 rounded-full border ${activeBadgeColor}`}>
                {title}
              </span>
              <span className="flex items-center text-xs text-gray-400 font-mono">
                <Sparkles className="w-3 h-3 text-amber-400 mr-1 animate-pulse" />
                DAILY REFRESH
              </span>
            </div>
            
            {/* Real-time calculated tag */}
            <h4 className="text-sm font-sans font-semibold text-gray-900 flex items-center gap-1">
              {highlightValue}
            </h4>
          </div>

          {/* Inspirational verse or quotes text inside elegant Serif Font */}
          <blockquote className="text-xl sm:text-2xl font-serif text-gray-950 font-medium leading-relaxed italic mb-6 border-l-4 border-gray-100 pl-4 sm:pl-6">
            “{quoteText}”
          </blockquote>

          {/* Explanation Text */}
          <div className="space-y-4 mb-8">
            <div>
              <h5 className="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                EXPLANATION & INSIGHT
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed font-sans">
                {bodyExplanation}
              </p>
            </div>

            {/* Reflection / Prayer or Actionable insights */}
            {subtextContent && (
              <div className="bg-gray-50/50 rounded-2xl border border-gray-50 p-4 sm:p-5">
                <h5 className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 mb-1.5 flex items-center gap-1">
                  {subtextLabel || 'REFLECTION'}
                </h5>
                <p className="text-gray-700 text-sm leading-relaxed italic font-serif">
                  {subtextContent}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card branding signature layer (Always stays embedded so screenshot contains verification) */}
        <div className="border-t border-gray-50 pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            {/* Custom high-contrast logo badge */}
            <span className="text-xs font-sans tracking-tight font-extrabold text-gray-900">
              Learn With Me
            </span>
            {/* Real blue verified tick badge */}
            <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-3.5 h-3.5" title="Verified Creator">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              | learnwithme.com
            </span>
          </div>

          {/* Interactive controls (Hidden temporarily during screenshot rendering if desired, but we keep them clean and accessible) */}
          <div className="flex items-center gap-2" data-html2canvas-ignore="true">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-full border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-900 bg-white/50 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Copy quote content"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-gray-900 bg-white/50 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Share quotation"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-3 py-2 rounded-full border border-gray-100 hover:border-gray-200 text-gray-700 hover:text-gray-950 bg-white/50 cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
              title="Download card as high-DPI image"
            >
              <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              {isDownloading ? 'Exporting...' : 'Save PNG'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
