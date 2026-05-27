import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30); // 0 to 100
  const [soundStyle, setSoundStyle] = useState<'chimes' | 'nature'>('chimes');

  // Web Audio Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // HTML5 Nature audio fallback
  const natureAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize standard royalty-free natural stream loop
    natureAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/123/123-200.wav'); // gentle birds and brook
    natureAudioRef.current.loop = true;
    natureAudioRef.current.volume = volume / 100;

    return () => {
      // Clean up sound schedules
      if (schedulerIntervalRef.current) clearInterval(schedulerIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      if (natureAudioRef.current) {
        natureAudioRef.current.pause();
      }
    };
  }, []);

  // Update volume controls
  useEffect(() => {
    const calculatedVolume = isMuted ? 0 : volume / 100;
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(calculatedVolume * 0.15, audioCtxRef.current?.currentTime || 0); // Limit maximum synth loud
    }
    if (natureAudioRef.current) {
      natureAudioRef.current.volume = calculatedVolume * 0.5;
    }
  }, [volume, isMuted]);

  // Procedural Chimes Synthesizer
  // Generates warm, pentatonic ambient frequencies that resolve infinitely
  const playCaliChime = (ctx: AudioContext, destination: AudioNode) => {
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C Maj 7
      [293.66, 349.23, 440.00, 523.25], // D Min 7
      [349.23, 440.00, 523.25, 587.33], // F Maj 7
      [392.00, 493.88, 587.33, 659.25], // G Dom 7
    ];
    
    // Pick a random note from a random peaceful progression
    const currentProgression = chords[Math.floor(Math.random() * chords.length)];
    const frequency = currentProgression[Math.floor(Math.random() * currentProgression.length)];
    
    // Osc 1: Warm Triangle wave
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = frequency;

    // Osc 2: Sub-octave Sine wave for warmth
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = frequency / 2;

    // Local gain envelope for slow fade-in and natural bell decay
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, ctx.currentTime);
    env.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.5); // Slow rise
    env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 8.0); // Long tail decay

    // Filter to sweep off high harsh frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 6.0);

    osc.connect(env);
    subOsc.connect(env);
    env.connect(filter);
    filter.connect(destination);

    osc.start(ctx.currentTime);
    subOsc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 8.5);
    subOsc.stop(ctx.currentTime + 8.5);
  };

  const startPlaying = async () => {
    if (!audioCtxRef.current) {
      // Standard audio context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
      
      // Dynamic master gain node
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.connect(audioCtxRef.current.destination);
      const calculatedVolume = isMuted ? 0 : volume / 100;
      gainNodeRef.current.gain.setValueAtTime(calculatedVolume * 0.15, audioCtxRef.current.currentTime);
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (soundStyle === 'chimes') {
      // Start the chime clock loop
      // Trigger instant notes, then loop every 3.5 seconds
      playCaliChime(audioCtxRef.current, gainNodeRef.current!);
      schedulerIntervalRef.current = setInterval(() => {
        if (audioCtxRef.current && gainNodeRef.current && !isMuted) {
          playCaliChime(audioCtxRef.current, gainNodeRef.current);
        }
      }, 3500);
    } else {
      // Nature soundtrack
      try {
        if (natureAudioRef.current) {
          natureAudioRef.current.play();
        }
      } catch (err) {
        console.warn("Autoplay blocked or link issue, falling back:", err);
      }
    }

    setIsPlaying(true);
  };

  const stopPlaying = () => {
    if (schedulerIntervalRef.current) {
      clearInterval(schedulerIntervalRef.current);
      schedulerIntervalRef.current = null;
    }
    if (natureAudioRef.current) {
      natureAudioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleTogglePlay = async () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      await startPlaying();
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const switchSoundStyle = async (style: 'chimes' | 'nature') => {
    stopPlaying();
    setSoundStyle(style);
    // Auto resume under new sound style
    setTimeout(async () => {
      setSoundStyle(style);
    }, 100);
  };

  return (
    <div id="ambient-audio-player" className="flex items-center gap-3 backdrop-blur-md bg-white/60 border border-gray-100/50 py-1.5 px-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
      {/* Icon and status info */}
      <button 
        onClick={handleTogglePlay}
        className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${isPlaying ? 'bg-blue-50 text-blue-600 scale-105 animate-pulse' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
        title={isPlaying ? "Pause peaceful background music" : "Play peaceful background music"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Audio style switches */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 border-r border-gray-100 pr-2 mr-1">
        <button
          onClick={() => switchSoundStyle('chimes')}
          className={`px-2 py-0.5 rounded-full cursor-pointer font-medium transition-all ${soundStyle === 'chimes' ? 'bg-blue-600/10 text-blue-700' : 'hover:text-gray-900'}`}
        >
          Soft Chimes
        </button>
        <button
          onClick={() => switchSoundStyle('nature')}
          className={`px-2 py-0.5 rounded-full cursor-pointer font-medium transition-all ${soundStyle === 'nature' ? 'bg-blue-600/10 text-blue-700' : 'hover:text-gray-900'}`}
        >
          Forest Birds
        </button>
      </div>

      {/* Frequency bar indicators animation when active */}
      <div className="flex gap-0.5 items-end h-3 px-1 w-6">
        {[1, 2, 3, 4].map((id) => (
          <div 
            key={id}
            className="w-1 bg-blue-500 rounded-full transition-all duration-300"
            style={{
              height: isPlaying && !isMuted ? '100%' : '15%',
              animationName: isPlaying && !isMuted ? 'bounce' : 'none',
              animationDuration: isPlaying && !isMuted ? `1.${id}s` : '0s',
              animationIterationCount: isPlaying && !isMuted ? 'infinite' : 'initial',
              animationTimingFunction: isPlaying && !isMuted ? 'ease-in-out' : 'initial',
              animationDelay: `0.${id * 2}s`
            }}
          />
        ))}
      </div>

      {/* Mute toggle icon */}
      <button 
        onClick={handleToggleMute}
        className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
        title={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Volume slider control */}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => {
          setVolume(Number(e.target.value));
          if (isMuted) setIsMuted(false);
        }}
        className="w-16 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        title={`Volume: ${volume}%`}
      />

      {/* Embedding bounced animation keyframes in standard jsx style block */}
      <style>{`
        @keyframes bounce {
          0%, 100% { height: 15%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
