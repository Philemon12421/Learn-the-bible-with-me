import React, { useState, useCallback, useEffect } from 'react';
import { Download, Share2, Copy, Check, Church, X } from 'lucide-react';

const MAX_REFERENCES = 6;

// ─── Date helpers ───────────────────────────────────────────────────────────

/** Returns the most recent Sunday (today, if today is Sunday). */
function getMostRecentSunday(): Date {
  const now = new Date();
  const result = new Date(now);
  result.setDate(now.getDate() - now.getDay());
  result.setHours(0, 0, 0, 0);
  return result;
}

function formatSundayLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// ─── Canvas helpers (self-contained — no cross-file imports) ───────────────

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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

function drawPaperTexture(ctx: CanvasRenderingContext2D, size: number) {
  ctx.save();
  ctx.fillStyle = '#f7f7f5';
  ctx.fillRect(0, 0, size, size);
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 140; i++) {
    const x = rand() * size, y = rand() * size, r = 30 + rand() * 130, dark = rand() > 0.5;
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

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines?: number): number {
  if (!text) return y;
  const words = text.split(' ');
  let line = '';
  let curY = y;
  let lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line + (line ? ' ' : '') + words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = words[i];
      curY += lineHeight;
      lines++;
      if (maxLines && lines >= maxLines - 1) {
        const remaining = words.slice(i).join(' ');
        let last = line;
        while (ctx.measureText(last + '…').width > maxWidth && last.length > 0) {
          last = last.slice(0, -1).trim();
        }
        ctx.fillText(remaining === line ? line : last + '…', x, curY);
        return curY + lineHeight;
      }
    } else {
      line = test;
    }
  }
  if (line) { ctx.fillText(line, x, curY); curY += lineHeight; }
  return curY;
}

/**
 * Lays out a row of small pill "chips" (used for scripture references),
 * centered, wrapping onto additional rows as needed so any number of
 * references stays readable instead of overflowing or shrinking to fit.
 */
function drawChipsRow(
  ctx: CanvasRenderingContext2D,
  items: string[],
  centerX: number,
  y: number,
  maxWidth: number,
  font: string,
  textColor: string,
  bgColor: string
): number {
  if (items.length === 0) return y;
  const chipHeight = 42;
  const gap = 10;
  const padX = 20;

  ctx.font = font;
  const chips = items.map(text => ({ text, width: ctx.measureText(text).width + padX * 2 }));

  const rows: typeof chips[] = [];
  let currentRow: typeof chips = [];
  let currentWidth = 0;
  for (const chip of chips) {
    const addWidth = chip.width + (currentRow.length > 0 ? gap : 0);
    if (currentWidth + addWidth > maxWidth && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [chip];
      currentWidth = chip.width;
    } else {
      currentRow.push(chip);
      currentWidth += addWidth;
    }
  }
  if (currentRow.length) rows.push(currentRow);

  let curY = y;
  for (const row of rows) {
    const rowWidth = row.reduce((sum, c) => sum + c.width, 0) + gap * (row.length - 1);
    let curX = centerX - rowWidth / 2;
    for (const chip of row) {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      roundRect(ctx, curX, curY, chip.width, chipHeight, chipHeight / 2);
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(chip.text, curX + chip.width / 2, curY + chipHeight / 2 + 1);
      curX += chip.width + gap;
    }
    curY += chipHeight + gap;
  }
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  return curY - gap + 18;
}

/** Attempts to load the app's real logo file. Resolves to null on failure
 * (missing file, load error) so the caller can fall back gracefully instead
 * of the share image breaking or showing a blank gap. */
function loadLogoImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = '/cross.jpeg';
  });
}

/** Draws the app's brand mark. Uses the real /cross.jpeg logo when it loaded
 * successfully (clipped to a rounded square to match the header/footer
 * treatment); otherwise falls back to a hand-drawn amber cross mark so the
 * share image still looks intentional rather than broken. */
function drawLogoBadge(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, logoImg: HTMLImageElement | null) {
  ctx.save();
  if (logoImg) {
    ctx.beginPath();
    roundRect(ctx, x, y, size, size, size * 0.22);
    ctx.clip();
    const scale = Math.max(size / logoImg.width, size / logoImg.height);
    const drawW = logoImg.width * scale;
    const drawH = logoImg.height * scale;
    ctx.drawImage(logoImg, x + (size - drawW) / 2, y + (size - drawH) / 2, drawW, drawH);
    ctx.restore();
    return;
  }

  const grad = ctx.createLinearGradient(x, y, x + size, y + size);
  grad.addColorStop(0, '#b45309');
  grad.addColorStop(1, '#92400e');
  ctx.fillStyle = grad;
  ctx.beginPath();
  roundRect(ctx, x, y, size, size, size * 0.22);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  const barW = size * 0.14;
  ctx.beginPath();
  roundRect(ctx, x + size / 2 - barW / 2, y + size * 0.18, barW, size * 0.64, barW / 2);
  ctx.fill();
  ctx.beginPath();
  roundRect(ctx, x + size * 0.22, y + size * 0.42, size * 0.56, barW, barW / 2);
  ctx.fill();
  ctx.restore();
}

/** A static "3D medallion" echoing the page's rotating CSS emblem — a glossy
 * sphere-like disc with a cross, rendered with gradients and shadow to read
 * as dimensional in a still image. */
function drawMedallion(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.shadowColor = 'rgba(146, 64, 14, 0.35)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 14;

  const sphere = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
  sphere.addColorStop(0, '#f2b65e');
  sphere.addColorStop(0.45, '#d9820f');
  sphere.addColorStop(1, '#8a4a0b');
  ctx.fillStyle = sphere;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  const highlight = ctx.createRadialGradient(cx - r * 0.38, cy - r * 0.42, 0, cx - r * 0.38, cy - r * 0.42, r * 0.55);
  highlight.addColorStop(0, 'rgba(255,255,255,0.55)');
  highlight.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = highlight;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  const barW = r * 0.16;
  ctx.beginPath();
  roundRect(ctx, cx - barW / 2, cy - r * 0.48, barW, r * 0.96, barW / 2);
  ctx.fill();
  ctx.beginPath();
  roundRect(ctx, cx - r * 0.34, cy - barW * 0.9, r * 0.68, barW, barW / 2);
  ctx.fill();
  ctx.restore();
}

// ─── Share image generator ──────────────────────────────────────────────────

interface SundayShareData {
  sundayLabel: string;
  topic: string;
  preacher: string;
  references: string[];
  reflection: string;
}

async function downloadSundayShareImage(data: SundayShareData): Promise<void> {
  const SIZE = 1080;
  const PADDING = 88;
  const maxWidth = SIZE - PADDING * 2;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  drawPaperTexture(ctx, SIZE);

  // Logo + wordmark, top-left
  const logoImg = await loadLogoImage();
  drawLogoBadge(ctx, PADDING, PADDING, 52, logoImg);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '800 30px Georgia, "Times New Roman", serif';
  ctx.fillText('Learn With Me', PADDING + 52 + 16, PADDING + 26);

  // Medallion, centered
  const medallionCy = PADDING + 190;
  drawMedallion(ctx, SIZE / 2, medallionCy, 92);

  // Kicker + date
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#b45309';
  ctx.font = '700 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('WHAT I LEARNED THIS SUNDAY', SIZE / 2, medallionCy + 150);
  ctx.fillStyle = '#6b6b68';
  ctx.font = 'italic 400 28px Georgia, "Times New Roman", serif';
  ctx.fillText(data.sundayLabel, SIZE / 2, medallionCy + 190);

  let cursorY = medallionCy + 250;

  // Topic — the sermon title, if given
  if (data.topic) {
    ctx.fillStyle = '#1a1a1a';
    ctx.font = '700 32px Georgia, "Times New Roman", serif';
    ctx.fillText(data.topic, SIZE / 2, cursorY);
    cursorY += 40;
  }

  // "by {preacher}", if given
  if (data.preacher) {
    ctx.fillStyle = '#8a8a85';
    ctx.font = 'italic 400 24px Georgia, "Times New Roman", serif';
    ctx.fillText(`by ${data.preacher}`, SIZE / 2, cursorY);
    cursorY += 38;
  }

  if (data.topic || data.preacher) cursorY += 10;

  // Scripture reference chips — any number, wrapping cleanly
  if (data.references.length > 0) {
    cursorY = drawChipsRow(
      ctx,
      data.references,
      SIZE / 2,
      cursorY,
      maxWidth,
      '700 21px system-ui, -apple-system, sans-serif',
      '#854f0b',
      '#faeeda'
    );
    cursorY += 26;
  } else {
    cursorY += 10;
  }

  // Reflection text — the heart of the card
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '400 36px Georgia, "Times New Roman", serif';
  wrapText(ctx, `“${data.reflection}”`, PADDING, cursorY, maxWidth, 50, 6);

  // Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#9a9a95';
  ctx.font = '500 23px system-ui, -apple-system, sans-serif';
  ctx.fillText('Shared from learnthebible.vercel.app', SIZE / 2, SIZE - 60);

  const filename = `sunday-learning-${data.sundayLabel.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ─── Page component ─────────────────────────────────────────────────────────

const DRAFT_KEY = 'lwm-sunday-draft';

export default function SundayView() {
  const sunday = getMostRecentSunday();
  const sundayLabel = formatSundayLabel(sunday);

  const [topic, setTopic] = useState('');
  const [preacher, setPreacher] = useState('');
  const [references, setReferences] = useState<string[]>([]);
  const [referenceInput, setReferenceInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore an in-progress draft so a refresh mid-week doesn't lose it.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sundayLabel === sundayLabel) {
          setTopic(parsed.topic || '');
          setPreacher(parsed.preacher || '');
          setReferences(Array.isArray(parsed.references) ? parsed.references : []);
          setReflection(parsed.reflection || '');
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ sundayLabel, topic, preacher, references, reflection }));
    } catch {}
  }, [sundayLabel, topic, preacher, references, reflection]);

  const addReference = useCallback(() => {
    const trimmed = referenceInput.trim();
    if (!trimmed) return;
    if (references.length >= MAX_REFERENCES) return;
    if (references.includes(trimmed)) { setReferenceInput(''); return; }
    setReferences(prev => [...prev, trimmed]);
    setReferenceInput('');
  }, [referenceInput, references]);

  const removeReference = useCallback((idx: number) => {
    setReferences(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleReferenceKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addReference();
    } else if (e.key === 'Backspace' && referenceInput === '' && references.length > 0) {
      removeReference(references.length - 1);
    }
  }, [addReference, referenceInput, references, removeReference]);

  const canShare = reflection.trim().length > 0;

  const handleDownload = useCallback(async () => {
    if (!canShare) return;
    setGenerating(true);
    try {
      await downloadSundayShareImage({
        sundayLabel,
        topic: topic.trim(),
        preacher: preacher.trim(),
        references,
        reflection: reflection.trim(),
      });
    } finally {
      setGenerating(false);
    }
  }, [canShare, sundayLabel, topic, preacher, references, reflection]);

  const shareText = useCallback(() => {
    const refLine = references.length > 0 ? `\n${references.join(' · ')}` : '';
    const byLine = preacher ? ` — ${preacher}` : '';
    return `What I learned this Sunday (${sundayLabel}):\n\n"${reflection.trim()}"${refLine}${byLine}\n\nLearn With Me · learnthebible.vercel.app`;
  }, [sundayLabel, reflection, references, preacher]);

  const handleCopy = useCallback(async () => {
    if (!canShare) return;
    try {
      await navigator.clipboard.writeText(shareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [canShare, shareText]);

  const handleShare = useCallback(async () => {
    if (!canShare) return;
    if (navigator.share) {
      try { await navigator.share({ text: shareText(), title: 'What I Learned This Sunday' }); } catch {}
    } else {
      await handleCopy();
    }
  }, [canShare, shareText, handleCopy]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up">
      {/* 3D rotating emblem */}
      <div className="flex flex-col items-center mb-6">
        <div className="coin-3d">
          <div className="coin-inner">
            <div className="coin-face coin-front">
              <span className="coin-cross" aria-hidden="true">✝</span>
            </div>
            <div className="coin-face coin-back">
              <Church className="w-9 h-9 text-white" strokeWidth={1.75} />
            </div>
          </div>
          <div className="coin-shadow" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          What Did You Learn This Sunday?
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Capture a thought from {sundayLabel}'s service while it's still fresh, then share it as a card.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
              Sermon topic <span className="font-normal normal-case text-gray-300">(optional)</span>
            </label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Walking in Faith"
              maxLength={60}
              className="w-full text-sm rounded-xl border border-gray-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
              Sermon by <span className="font-normal normal-case text-gray-300">(optional)</span>
            </label>
            <input
              value={preacher}
              onChange={e => setPreacher(e.target.value)}
              placeholder="e.g. Pastor John Mensah"
              maxLength={60}
              className="w-full text-sm rounded-xl border border-gray-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 flex items-center justify-between">
            <span>Scripture reference(s) <span className="font-normal normal-case text-gray-300">(optional)</span></span>
            <span className="font-normal normal-case text-gray-300">{references.length}/{MAX_REFERENCES}</span>
          </label>

          {references.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {references.map((ref, i) => (
                <span key={ref + i} className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100 rounded-full pl-3 pr-1.5 py-1">
                  {ref}
                  <button
                    type="button"
                    onClick={() => removeReference(i)}
                    aria-label={`Remove ${ref}`}
                    className="p-0.5 rounded-full hover:bg-amber-100 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={referenceInput}
              onChange={e => setReferenceInput(e.target.value)}
              onKeyDown={handleReferenceKeyDown}
              onBlur={addReference}
              disabled={references.length >= MAX_REFERENCES}
              placeholder={references.length >= MAX_REFERENCES ? 'Maximum reached' : 'e.g. Hebrews 11:1 — press Enter to add'}
              maxLength={40}
              className="flex-1 text-sm rounded-xl border border-gray-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all disabled:bg-gray-50 disabled:text-gray-300"
            />
            <button
              type="button"
              onClick={addReference}
              disabled={!referenceInput.trim() || references.length >= MAX_REFERENCES}
              className="text-xs font-bold px-4 rounded-xl border border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
            What you learned
          </label>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value.slice(0, 400))}
            placeholder="Write a sentence or two about what stood out to you today..."
            rows={5}
            className="w-full text-sm rounded-xl border border-gray-200 px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all resize-none"
          />
          <div className="text-right text-[10px] text-gray-300 mt-1">{reflection.length}/400</div>
        </div>

        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <button
            onClick={handleDownload}
            disabled={!canShare || generating}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-amber-100 bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{generating ? 'Creating…' : 'Download Share Image'}</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!canShare}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={handleCopy}
            disabled={!canShare}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .coin-3d {
          width: 112px;
          height: 112px;
          perspective: 900px;
        }
        .coin-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: coinSpin 7s linear infinite;
        }
        .coin-face {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          box-shadow: 0 10px 24px rgba(146,64,14,0.28), inset 0 2px 6px rgba(255,255,255,0.25);
        }
        .coin-front {
          background: radial-gradient(circle at 35% 30%, #f2b65e, #d9820f 55%, #8a4a0b 100%);
          transform: translateZ(10px);
        }
        .coin-back {
          background: radial-gradient(circle at 35% 30%, #e0a04a, #b4660f 55%, #78350f 100%);
          transform: rotateY(180deg) translateZ(10px);
        }
        .coin-cross {
          color: white;
          font-size: 38px;
          line-height: 1;
          text-shadow: 0 2px 3px rgba(0,0,0,0.25);
        }
        .coin-shadow {
          width: 70%;
          height: 14px;
          margin: 10px auto 0;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.18), transparent 70%);
          animation: coinShadow 7s linear infinite;
        }
        @keyframes coinSpin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes coinShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.6; }
          50% { transform: scaleX(0.7); opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .coin-inner, .coin-shadow { animation: none; }
        }
      `}</style>
    </div>
  );
}
