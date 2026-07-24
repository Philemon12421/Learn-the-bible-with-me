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
  if (!text) return y;
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
  if (line) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
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

/** Subtle off-white paper texture — soft mottling, no heavy watermark. */
function drawPaperTexture(ctx: CanvasRenderingContext2D, size: number) {
  ctx.save();
  ctx.fillStyle = '#fdfdfb';
  ctx.fillRect(0, 0, size, size);

  ctx.globalAlpha = 0.03;
  // deterministic-ish scatter (seeded by index) so re-renders don't jitter wildly
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 70; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 60 + rand() * 160;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, '#8a8a86');
    grad.addColorStop(1, 'rgba(138,138,134,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Blue "verified" style brand badge with a checkmark. */
function drawVerifiedBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.fillStyle = '#2f7dea';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = r * 0.22;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.45, cy + r * 0.02);
  ctx.lineTo(cx - r * 0.08, cy + r * 0.38);
  ctx.lineTo(cx + r * 0.5, cy - r * 0.35);
  ctx.stroke();
  ctx.restore();
}

/** Small circular cross icon, matching the site's brand iconography. */
function drawCrossBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#eee8de';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#9a6b45';
  const barW = r * 0.24;
  roundRect(ctx, cx - barW / 2, cy - r * 0.55, barW, r * 1.1, barW / 2);
  ctx.fill();
  roundRect(ctx, cx - r * 0.4, cy - r * 0.14, r * 0.8, barW, barW / 2);
  ctx.fill();
  ctx.restore();
}

/** Small circular book icon, matching the site's brand iconography. */
function drawBookBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#eee8de';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  const w = r * 1.15;
  const h = r * 0.95;
  ctx.fillStyle = '#4a3323';
  ctx.beginPath();
  roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 5);
  ctx.fill();
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(cx - w * 0.1, cy - h / 2, w * 0.2, h);
  ctx.restore();
}

/**
 * Splits a quote into a "primary" (black) clause and a "secondary" (accent-colored)
 * clause, mirroring the two-tone emphasis style used across the brand's quote cards.
 * Prefers splitting on natural punctuation (":", ";", ",") near the middle of the
 * quote; falls back to an even word-count split.
 */
function splitForEmphasis(text: string): { primary: string; secondary: string } {
  const breakChars = [':', ';', ','];
  let bestIdx = -1;
  for (const ch of breakChars) {
    const idx = text.indexOf(ch);
    if (idx > text.length * 0.25 && idx < text.length * 0.8) {
      bestIdx = idx;
      break;
    }
  }
  if (bestIdx === -1) {
    const words = text.split(' ');
    if (words.length < 4) return { primary: text, secondary: '' };
    const mid = Math.ceil(words.length / 2);
    return {
      primary: words.slice(0, mid).join(' '),
      secondary: words.slice(mid).join(' '),
    };
  }
  return {
    primary: text.slice(0, bestIdx + 1).trim(),
    secondary: text.slice(bestIdx + 1).trim(),
  };
}

// ─── Main download function ────────────────────────────────────────────────────

/**
 * Renders a 1080×1080 share-ready PNG of the quote — clean paper background,
 * brand mark, reference/author line, two-tone quote text, and a footer link —
 * and triggers a download.
 */
async function downloadQuoteAsImage(props: QuoteCardProps): Promise<void> {
  const SIZE = 1080;
  const PADDING = 88;
  const c = COLOR_MAP[props.accentColor];

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // ── 1. Background: soft paper texture ────────────────────────────────────────
  drawPaperTexture(ctx, SIZE);

  // ── 2. Brand row: badge + wordmark (top-left) ────────────────────────────────
  const brandY = PADDING + 26;
  drawVerifiedBadge(ctx, PADDING + 26, brandY, 26);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '800 32px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  try { (ctx as any).letterSpacing = '2px'; } catch {}
  ctx.fillText('LEARN WITH ME', PADDING + 26 + 26 + 16, brandY);
  try { (ctx as any).letterSpacing = '0px'; } catch {}

  // ── 3. Reference / author (top-right, italic serif) ─────────────────────────
  const refY = brandY + 90;
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'italic 500 36px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(props.highlightValue, SIZE - PADDING, refY);

  // ── 4. Quote — two-tone: black clause, then accent-colored clause ───────────
  const { primary, secondary } = splitForEmphasis(props.quoteText);
  const maxWidth = SIZE - PADDING * 2;
  const lineHeight = 66;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '800 52px system-ui, -apple-system, "Segoe UI", sans-serif';

  let cursorY = refY + 90;
  ctx.fillStyle = '#111111';
  cursorY = wrapText(ctx, primary, PADDING, cursorY, maxWidth, lineHeight);

  if (secondary) {
    ctx.fillStyle = c.hex;
    cursorY = wrapText(ctx, secondary, PADDING, cursorY, maxWidth, lineHeight);
  }

  // ── 5. Author line for non-scripture quotes ──────────────────────────────────
  if (props.type !== 'bible') {
    ctx.font = 'italic 400 30px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#666666';
    cursorY += 8;
    ctx.fillText(`— ${props.highlightValue}`, PADDING, cursorY);
  }

  // ── 6. Icon badges (cross + book), centered near the bottom ─────────────────
  const iconY = SIZE - 210;
  const iconR = 44;
  const gap = 26;
  drawCrossBadge(ctx, SIZE / 2 - iconR - gap / 2, iconY, iconR);
  drawBookBadge(ctx, SIZE / 2 + iconR + gap / 2, iconY, iconR);

  // ── 7. Footer link ────────────────────────────────────────────────────────────
  ctx.fillStyle = '#8a8a86';
  ctx.font = '500 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Follow us here learnthebible.vercel.app', SIZE / 2, SIZE - 90);

  // ── 8. Trigger download ───────────────────────────────────────────────────────
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
      await downloadQuoteAsImage(props);
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
        {/* ↓ Download as shareable PNG */}
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
