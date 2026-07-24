import React, { useState, useCallback } from 'react';
import { Copy, Share2, Check, ChevronDown, ChevronUp, Download } from 'lucide-react';

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
    hex: '#378ADD',
    hexLight: '#E6F1FB',
    hexDark: '#185FA5',
  },
  amber: {
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
    accent: 'text-amber-700',
    border: 'border-l-amber-500',
    button: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-100',
    dot: 'bg-amber-500',
    tag: 'bg-amber-50 text-amber-700',
    hex: '#BA7517',
    hexLight: '#FAEEDA',
    hexDark: '#854F0B',
  },
  indigo: {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    accent: 'text-indigo-700',
    border: 'border-l-indigo-500',
    button: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-100',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-50 text-indigo-700',
    hex: '#534AB7',
    hexLight: '#EEEDFE',
    hexDark: '#3C3489',
  },
};

// ─── Canvas helpers ────────────────────────────────────────────────────────────

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + (line ? ' ' : '') + words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = words[i];
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, curY);
  return curY + lineHeight;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── Main download function ────────────────────────────────────────────────────

/**
 * Renders a 1080×1080 Instagram-ready PNG of the quote and triggers download.
 *
 * @param logoUrl  Optional URL/path to your logo image for the watermark.
 *                 If omitted, a text monogram ("LWM") is used instead.
 */
async function downloadQuoteAsImage(
  props: QuoteCardProps,
  logoUrl?: string
): Promise<void> {
  const SIZE = 1080;
  const PADDING = 80;
  const c = COLOR_MAP[props.accentColor];

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // ── 1. White background ──────────────────────────────────────────────────────
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── 2. Watermark (logo image OR monogram fallback) ───────────────────────────
  ctx.save();
  ctx.globalAlpha = 0.06;

  if (logoUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const logoSize = 500;
        ctx.drawImage(img, (SIZE - logoSize) / 2, (SIZE - logoSize) / 2, logoSize, logoSize);
        resolve();
      };
      img.onerror = () => resolve(); // silently fall through
      img.src = logoUrl;
    });
  } else {
    // Fallback: "LWM" monogram watermark
    ctx.font = 'bold 320px Georgia, serif';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LWM', SIZE / 2, SIZE / 2);
  }

  ctx.restore();

  // ── 3. Accent left bar ───────────────────────────────────────────────────────
  const accentX = PADDING;
  const accentY = 170;
  const accentH = 340;
  ctx.fillStyle = c.hex;
  ctx.beginPath();
  roundRect(ctx, accentX, accentY, 7, accentH, 3.5);
  ctx.fill();

  // ── 4. Type badge (top-right) ────────────────────────────────────────────────
  ctx.font = '500 26px system-ui, -apple-system, sans-serif';
  const badgeW = ctx.measureText(props.highlightValue).width + 48;
  const badgeH = 46;
  const badgeX = SIZE - PADDING - badgeW;
  const badgeY = PADDING + 16;
  ctx.fillStyle = c.hexLight;
  ctx.beginPath();
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 23);
  ctx.fill();
  ctx.fillStyle = c.hexDark;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(props.highlightValue, badgeX + badgeW / 2, badgeY + badgeH / 2);

  // ── 5. Section label ─────────────────────────────────────────────────────────
  ctx.fillStyle = c.hex;
  ctx.font = '500 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(props.title.toUpperCase(), PADDING + 26, PADDING + 52);

  // ── 6. Quote (serif italic) ──────────────────────────────────────────────────
  ctx.fillStyle = '#111111';
  ctx.font = 'italic 500 46px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const quoteEndY = wrapText(
    ctx,
    `"${props.quoteText}"`,
    PADDING + 30,
    accentY + 12,
    SIZE - PADDING * 2 - 40,
    66
  );

  // ── 7. Explanation ───────────────────────────────────────────────────────────
  const explanationStartY = Math.max(quoteEndY + 36, 580);
  ctx.fillStyle = '#555555';
  ctx.font = '400 29px system-ui, -apple-system, sans-serif';
  const afterExplain = wrapText(
    ctx,
    props.bodyExplanation,
    PADDING,
    explanationStartY,
    SIZE - PADDING * 2,
    44
  );

  // ── 8. Subtext box (optional) ────────────────────────────────────────────────
  if (props.subtextLabel && props.subtextContent) {
    const boxY = Math.max(afterExplain + 24, 780);
    const boxH = 110;
    ctx.fillStyle = c.hexLight;
    ctx.beginPath();
    roundRect(ctx, PADDING, boxY, SIZE - PADDING * 2, boxH, 12);
    ctx.fill();

    ctx.fillStyle = c.hexDark;
    ctx.font = '500 20px system-ui, -apple-system, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(props.subtextLabel.toUpperCase(), PADDING + 24, boxY + 18);

    ctx.font = '500 26px system-ui, -apple-system, sans-serif';
    ctx.fillText(props.subtextContent, PADDING + 24, boxY + 52);
  }

  // ── 9. Bottom branding bar ───────────────────────────────────────────────────
  const barY = SIZE - 96;
  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, barY, SIZE, 96);

  // Optional: accent line above bar
  ctx.fillStyle = c.hex;
  ctx.fillRect(0, barY, SIZE, 3);

  ctx.fillStyle = c.hexDark;
  ctx.font = '500 26px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Learn With Me · learnthebible.vercel.app', SIZE / 2, barY + 48);

  // ── 10. Trigger download ─────────────────────────────────────────────────────
  const filename = `quote-${props.highlightValue.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ─── QuoteCard component ───────────────────────────────────────────────────────

export default function QuoteCard(props: QuoteCardProps) {
  const {
    type, title, highlightValue, quoteText, bodyExplanation,
    subtextLabel, subtextContent, accentColor,
  } = props;

  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const c = COLOR_MAP[accentColor];

  const copyText = useCallback(async () => {
    const text = `"${quoteText}" — ${highlightValue}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [quoteText, highlightValue]);

  const shareContent = useCallback(async () => {
    const text = `"${quoteText}" — ${highlightValue}\n\nLearn With Me · learnthebible.vercel.app`;
    if (navigator.share) {
      try { await navigator.share({ text, title: 'Learn With Me' }); } catch {}
    } else {
      await copyText();
    }
  }, [quoteText, highlightValue, copyText]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      // Pass your logo URL here, e.g. '/logo.png' or a hosted URL.
      // Leave undefined to use the "LWM" monogram watermark instead.
      await downloadQuoteAsImage(props, undefined /* '/logo.png' */);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  }, [props]);

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
        <div className="px-6 pb-4 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">{bodyExplanation}</p>
          {subtextLabel && subtextContent && (
            <div className={`p-4 rounded-xl ${c.tag} border ${c.badge.split(' ')[2]}`}>
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1.5 opacity-60">
                {subtextLabel}
              </p>
              <p className="text-xs leading-relaxed font-medium">{subtextContent}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-5 pt-2 flex items-center gap-2 border-t border-gray-50 flex-wrap">
        {/* ↓ Download as Instagram PNG */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          aria-label="Download quote as image"
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${c.button}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? 'Generating…' : 'Download Image'}</span>
        </button>

        <button
          onClick={copyText}
          aria-label="Copy quote"
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${c.button}`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          onClick={shareContent}
          aria-label="Share quote"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}
