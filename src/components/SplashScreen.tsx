import React from 'react';

interface SplashScreenProps {
  /** Controls the fade — set to false to start the exit transition. */
  visible: boolean;
  /** Fired once the fade-out transition finishes, so the parent can unmount. */
  onHidden?: () => void;
}

export default function SplashScreen({ visible, onHidden }: SplashScreenProps) {
  return (
    <div
      aria-hidden={!visible}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'opacity' && !visible) onHidden?.();
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-[#fdf8f0] to-orange-50 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Logo with pulsing "ping" rings */}
      <div className="relative flex items-center justify-center mb-6">
        <span className="splash-ping absolute inline-flex h-20 w-20 rounded-2xl bg-amber-400/30" />
        <span className="splash-ping splash-ping-delay absolute inline-flex h-20 w-20 rounded-2xl bg-amber-400/20" />
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-amber-200/50 splash-logo">
          <img
            src="/cross.jpeg"
            alt="Learn With Me"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              const parent = el.parentElement!;
              parent.style.background = 'linear-gradient(135deg,#b45309,#92400e)';
              parent.innerHTML = '<span style="color:white;font-size:28px;display:flex;align-items:center;justify-content:center;height:100%;line-height:1">✝</span>';
            }}
          />
        </div>
      </div>

      {/* Wordmark */}
      <div className="splash-text text-center">
        <h1 className="font-serif text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Learn With Me
        </h1>
        <p className="text-[10px] text-amber-600 font-medium tracking-widest uppercase mt-1">
          Daily Faith · Wisdom · Growth
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex items-center gap-1.5 mt-8">
        <span className="splash-dot" />
        <span className="splash-dot splash-dot-2" />
        <span className="splash-dot splash-dot-3" />
      </div>

      <style>{`
        @keyframes splashPing {
          0% { transform: scale(0.9); opacity: 0.6; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes splashLogoIn {
          0% { transform: scale(0.6) rotate(-8deg); opacity: 0; }
          60% { transform: scale(1.08) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes splashTextIn {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes splashDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        .splash-ping {
          animation: splashPing 1.8s cubic-bezier(0,0,0.2,1) infinite;
        }
        .splash-ping-delay {
          animation-delay: 0.6s;
        }
        .splash-logo {
          animation: splashLogoIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .splash-text {
          animation: splashTextIn 0.6s ease 0.25s both;
        }
        .splash-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #b45309;
          animation: splashDotBounce 1.2s ease-in-out infinite;
        }
        .splash-dot-2 { animation-delay: 0.15s; }
        .splash-dot-3 { animation-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .splash-ping, .splash-logo, .splash-text, .splash-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
