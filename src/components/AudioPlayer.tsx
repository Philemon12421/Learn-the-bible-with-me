import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

type SoundStyle = 'chimes' | 'piano' | 'rain' | 'nature';

const SOUND_OPTIONS: { id: SoundStyle; label: string; emoji: string }[] = [
  { id: 'chimes', label: 'Chimes', emoji: '🔔' },
  { id: 'piano', label: 'Piano', emoji: '🎹' },
  { id: 'rain', label: 'Rain', emoji: '🌧' },
  { id: 'nature', label: 'Forest', emoji: '🌿' },
];

// Free loopable audio sources
const AUDIO_URLS: Record<SoundStyle, string> = {
  chimes: '', // Handled by Web Audio API synth
  piano: 'https://cdn.pixabay.com/audio/2024/03/14/audio_8e5e3b4b8f.mp3',
  rain: 'https://cdn.pixabay.com/audio/2022/03/09/audio_112c9c09b3.mp3',
  nature: 'https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749b37f.mp3',
};

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(35);
  const [soundStyle, setSoundStyle] = useState<SoundStyle>('chimes');
  const [showPanel, setShowPanel] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<NodeJS.Timeout | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  const getEffectiveVolume = useCallback(() =>
    isMuted ? 0 : volume / 100, [isMuted, volume]);

  // Sync volume to HTML audio
  useEffect(() => {
    const v = getEffectiveVolume();
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(v * 0.18, audioCtxRef.current.currentTime, 0.1);
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = v * 0.6;
    }
  }, [volume, isMuted, getEffectiveVolume]);

  const stopAll = useCallback(() => {
    if (schedulerRef.current) { clearInterval(schedulerRef.current); schedulerRef.current = null; }
    if (htmlAudioRef.current) { htmlAudioRef.current.pause(); htmlAudioRef.current.currentTime = 0; }
    setIsPlaying(false);
  }, []);

  const playChime = useCallback((ctx: AudioContext, dest: AudioNode) => {
    const PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const base = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
    const freqs = [base, base * 1.5, base / 2];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.value = freq;

      const env = ctx.createGain();
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.8);
      env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 7.0);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.5;

      osc.connect(env); env.connect(filter); filter.connect(dest);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + 7.5);
    });
  }, []);

  const startPlaying = useCallback(async (style: SoundStyle) => {
    stopAll();

    if (style === 'chimes') {
      if (!audioCtxRef.current) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AC();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.connect(audioCtxRef.current.destination);
        gainNodeRef.current.gain.value = getEffectiveVolume() * 0.18;
      }
      if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
      playChime(audioCtxRef.current, gainNodeRef.current!);
      schedulerRef.current = setInterval(() => {
        if (audioCtxRef.current && gainNodeRef.current && !isMuted) {
          playChime(audioCtxRef.current, gainNodeRef.current);
        }
      }, 4000);
    } else {
      const url = AUDIO_URLS[style];
      if (!url) return;
      if (!htmlAudioRef.current || htmlAudioRef.current.src !== url) {
        if (htmlAudioRef.current) htmlAudioRef.current.pause();
        htmlAudioRef.current = new Audio(url);
        htmlAudioRef.current.loop = true;
        htmlAudioRef.current.volume = getEffectiveVolume() * 0.6;
      }
      try { await htmlAudioRef.current.play(); } catch {}
    }
    setIsPlaying(true);
  }, [stopAll, playChime, getEffectiveVolume, isMuted]);

  const handleSoundSwitch = async (style: SoundStyle) => {
    setSoundStyle(style);
    if (isPlaying) await startPlaying(style);
    setShowPanel(false);
  };

  const handleToggle = async () => {
    if (isPlaying) { stopAll(); } else { await startPlaying(soundStyle); }
  };

  const active = SOUND_OPTIONS.find(s => s.id === soundStyle)!;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-gray-200/60 py-1.5 px-2.5 rounded-full shadow-sm">
        
        {/* Play/Pause */}
        <button onClick={handleToggle} aria-label={isPlaying ? 'Pause music' : 'Play ambient music'}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </button>

        {/* Sound label - click to show picker */}
        <button onClick={() => setShowPanel(!showPanel)}
          className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <span>{active.emoji}</span>
          <span>{active.label}</span>
        </button>

        {/* EQ bars */}
        <div className="hidden sm:flex gap-0.5 items-end h-3">
          {[1,2,3,4].map(i => (
            <div key={i} className={`w-0.5 rounded-full transition-all duration-300 ${isPlaying && !isMuted ? 'bg-amber-500' : 'bg-gray-300'}`}
              style={{ height: isPlaying && !isMuted ? `${[60,100,70,85][i-1]}%` : '20%',
                animation: isPlaying && !isMuted ? `eq${i} ${0.8+i*0.2}s ease-in-out infinite alternate` : 'none' }} />
          ))}
        </div>

        {/* Mute */}
        <button onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="text-gray-400 hover:text-gray-700 transition-colors">
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Volume slider */}
        <input type="range" min="0" max="100" value={volume} aria-label="Volume"
          onChange={e => { setVolume(+e.target.value); if (isMuted) setIsMuted(false); }}
          className="w-14 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-600 hidden sm:block" />
      </div>

      {/* Sound style picker panel */}
      {showPanel && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 min-w-[160px]">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Ambient Sound</p>
          {SOUND_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => handleSoundSwitch(opt.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${soundStyle === opt.id ? 'bg-amber-50 text-amber-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}>
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
              {soundStyle === opt.id && isPlaying && <span className="ml-auto text-amber-500 text-[10px]">♪</span>}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes eq1 { to { height: 100%; } } @keyframes eq2 { to { height: 40%; } }
        @keyframes eq3 { to { height: 90%; } } @keyframes eq4 { to { height: 50%; } }
      `}</style>
    </div>
  );
}
