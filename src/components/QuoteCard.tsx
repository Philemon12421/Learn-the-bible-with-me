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

/** Soft, visible off-white paper grain — matches a textured card background. */
function drawPaperTexture(ctx: CanvasRenderingContext2D, size: number) {
  ctx.save();
  ctx.fillStyle = '#f7f7f5';
  ctx.fillRect(0, 0, size, size);

  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 140; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 30 + rand() * 130;
    const dark = rand() > 0.5;
    ctx.globalAlpha = dark ? 0.025 : 0.035;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, dark ? '#7d7d78' : '#ffffff');
    grad.addColorStop(1, 'rgba(125,125,120,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * Splits a quote into a "primary" (plain) clause and a "secondary" (highlighted)
 * clause — the secondary clause is the "punchline" that gets the yellow-highlight
 * treatment. Prefers splitting on natural punctuation (":", ";", ",") past the
 * midpoint of the quote; falls back to an even word-count split.
 */
function splitForEmphasis(text: string): { primary: string; secondary: string } {
  const breakChars = [':', ';', ','];
  let bestIdx = -1;
  for (const ch of breakChars) {
    const idx = text.indexOf(ch);
    if (idx > text.length * 0.35 && idx < text.length * 0.8) {
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

/** Truncates long explanation copy at a word boundary so it never overflows the card. */
function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trim() + '…';
}

/**
 * Word-wraps a quote where a trailing "emphasized" clause gets a yellow highlight
 * behind bold-italic text, while the rest renders as plain serif text — matching
 * the highlighted-phrase style used across the brand's shareable quote cards.
 * Each wrapped line gets its own highlight box, so the highlight breaks naturally
 * at line boundaries instead of stretching across the full width.
 */
function wrapEmphasizedQuote(
  ctx: CanvasRenderingContext2D,
  primary: string,
  secondary: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  fontSize: number,
  highlightHex: string
): number {
  const normalFont = `400 ${fontSize}px Georgia, "Times New Roman", serif`;
  const emphasisFont = `700 italic ${fontSize}px Georgia, "Times New Roman", serif`;

  const words: { text: string; emphasize: boolean }[] = [
    ...primary.split(' ').filter(Boolean).map(w => ({ text: w, emphasize: false })),
    ...secondary.split(' ').filter(Boolean).map(w => ({ text: w, emphasize: true })),
  ];

  let line: typeof words = [];
  let curY = y;

  const widthOf = (w: { text: string; emphasize: boolean }) => {
    ctx.font = w.emphasize ? emphasisFont : normalFont;
    return ctx.measureText(w.text + ' ').width;
  };

  const flushLine = () => {
    if (line.length === 0) return;
    let curX = x;
    const positions = line.map(w => {
      const width = widthOf(w);
      const pos = { w, x: curX, width };
      curX += width;
      return pos;
    });

    // Draw highlight boxes behind consecutive emphasized runs on this line.
    let i = 0;
    while (i < positions.length) {
      if (positions[i].w.emphasize) {
        let j = i;
        let runWidth = 0;
        while (j < positions.length && positions[j].w.emphasize) {
          runWidth += positions[j].width;
          j++;
        }
        ctx.fillStyle = highlightHex;
        ctx.beginPath();
        roundRect(ctx, positions[i].x - 6, curY - fontSize * 0.82, runWidth - 4, fontSize * 1.18, 4);
        ctx.fill();
        i = j;
      } else {
        i++;
      }
    }

    // Draw the words on top of any highlight boxes.
    for (const p of positions) {
      ctx.font = p.w.emphasize ? emphasisFont : normalFont;
      ctx.fillStyle = '#111111';
      ctx.fillText(p.w.text, p.x, curY);
    }
    curY += lineHeight;
  };

  for (const w of words) {
    const testLine = [...line, w];
    const total = testLine.reduce((sum, tw) => sum + widthOf(tw), 0);
    if (total > maxWidth && line.length > 0) {
      flushLine();
      line = [w];
    } else {
      line = testLine;
    }
  }
  flushLine();
  return curY;
}

// ─── Main download function ────────────────────────────────────────────────────

const KICKER_LABEL: Record<QuoteCardProps['type'], string> = {
  bible: 'Inspire Through Bible',
  motivation: 'Daily Motivation',
  wisdom: 'Words of Wisdom',
};

/**
 * Renders a 1080×1080 share-ready PNG of the quote — clean textured background,
 * quote-mark kicker, big serif reference, plain text with a highlighted "punchline"
 * clause, a real explanation paragraph, and a footer link — then triggers a download.
 */
async function downloadQuoteAsImage(props: QuoteCardProps): Promise<void> {
  const SIZE = 1080;
  const PADDING = 88;
  const c = COLOR_MAP[props.accentColor];
  const maxWidth = SIZE - PADDING * 2;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // ── 1. Background: soft paper texture ────────────────────────────────────────
  drawPaperTexture(ctx, SIZE);

  // ── 2. Kicker: quote-mark glyph + label (top-left) ───────────────────────────
  let cursorY = PADDING + 46;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = c.hex;
  ctx.font = '700 74px Georgia, "Times New Roman", serif';
  ctx.fillText('\u201C', PADDING - 6, cursorY + 10);
  ctx.fillStyle = '#6b6b68';
  ctx.font = '500 26px system-ui, -apple-system, sans-serif';
  ctx.fillText(KICKER_LABEL[props.type], PADDING + 58, cursorY - 6);

  // ── 3. Big serif reference / author line ─────────────────────────────────────
  cursorY += 96;
  ctx.fillStyle = '#111111';
  ctx.font = '700 62px Georgia, "Times New Roman", serif';
  ctx.fillText(props.highlightValue.toUpperCase(), PADDING, cursorY);

  // ── 4. Quote — plain serif with the punchline clause highlighted ────────────
  cursorY += 66;
  const { primary, secondary } = splitForEmphasis(props.quoteText);
  cursorY = wrapEmphasizedQuote(ctx, primary, secondary, PADDING, cursorY, maxWidth, 58, 40, c.hexLight);

  // ── 5. Author line for non-scripture quotes ──────────────────────────────────
  if (props.type !== 'bible') {
    cursorY += 6;
    ctx.font = 'italic 400 30px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#666666';
    ctx.fillText(`— ${props.highlightValue}`, PADDING, cursorY);
    cursorY += 20;
  }

  // ── 6. Explanation section ───────────────────────────────────────────────────
  cursorY += 46;
  ctx.font = '700 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = c.hexDark;
  ctx.fillText('WHAT THIS MEANS', PADDING, cursorY);

  cursorY += 40;
  ctx.font = '400 27px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#4a4a47';
  cursorY = wrapText(ctx, truncate(props.bodyExplanation, 260), PADDING, cursorY, maxWidth, 38);

  // ── 7. Footer link ────────────────────────────────────────────────────────────
  ctx.fillStyle = '#9a9a95';
  ctx.font = '500 23px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Follow us here learnthebible.vercel.app', SIZE / 2, SIZE - 60);

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
