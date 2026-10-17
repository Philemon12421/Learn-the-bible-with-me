import React, { useState, useCallback } from 'react';
import {
  Home, BookOpen, Church, Compass, Sparkles, Newspaper,
  HelpCircle, Mail, Shield, Scale, Plus,
} from 'lucide-react';
import { ViewType } from '../types';

interface NavItem {
  view: ViewType;
  icon: React.ReactNode;
  label: string;
}

// The 4 primary tabs — adjust this list if you'd rather feature different
// pages; everything else lands in the floating "+" panel.
const PRIMARY: NavItem[] = [
  { view: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { view: 'bible', icon: <BookOpen className="w-5 h-5" />, label: 'Bible' },
  { view: 'sunday', icon: <Church className="w-5 h-5" />, label: 'Sunday' },
  { view: 'wisdom', icon: <Compass className="w-5 h-5" />, label: 'Wisdom' },
];

const SECONDARY: NavItem[] = [
  { view: 'motivation', icon: <Sparkles className="w-5 h-5" />, label: 'Growth' },
  { view: 'blog', icon: <Newspaper className="w-5 h-5" />, label: 'Blog' },
  { view: 'about', icon: <HelpCircle className="w-5 h-5" />, label: 'About' },
  { view: 'contact', icon: <Mail className="w-5 h-5" />, label: 'Contact' },
  { view: 'privacy', icon: <Shield className="w-5 h-5" />, label: 'Privacy' },
  { view: 'terms', icon: <Scale className="w-5 h-5" />, label: 'Terms' },
];

interface MobileNavBarProps {
  currentView: ViewType;
  setCurrentView: (v: ViewType) => void;
}

export default function MobileNavBar({ currentView, setCurrentView }: MobileNavBarProps) {
  const [panelVisible, setPanelVisible] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);

  const openPanel = useCallback(() => {
    setPanelMounted(true);
    // next frame, so the mount's initial (closed) styles apply before the
    // transition to "open" starts — otherwise it would just snap open.
    requestAnimationFrame(() => requestAnimationFrame(() => setPanelVisible(true)));
  }, []);

  const closePanel = useCallback(() => setPanelVisible(false), []);

  const go = useCallback((v: ViewType) => {
    setCurrentView(v);
    closePanel();
  }, [setCurrentView, closePanel]);

  const isSecondaryActive = SECONDARY.some(i => i.view === currentView);

  const renderTab = (item: NavItem) => {
    const active = currentView === item.view;
    return (
      <button
        key={item.view}
        onClick={() => go(item.view)}
        className="relative flex flex-col items-center justify-center w-full h-full gap-0.5"
        aria-current={active ? 'page' : undefined}
      >
        {active && <span className="nav-pill" aria-hidden="true" />}
        <span className={`relative transition-all duration-300 ${active ? 'text-amber-700 -translate-y-0.5' : 'text-gray-400'}`}>
          {item.icon}
        </span>
        <span className={`relative text-[8.5px] font-bold transition-colors duration-300 ${active ? 'text-amber-700' : 'text-gray-400'}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* GLASSY 4-TAB BAR */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-3 inset-x-3 h-16 z-40 glass-bar rounded-[28px]"
      >
        <div className="relative h-full flex items-stretch px-1">
          <div className="flex-1 grid grid-cols-2">
            {PRIMARY.slice(0, 2).map(renderTab)}
          </div>
          <div className="w-16 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1 grid grid-cols-2">
            {PRIMARY.slice(2, 4).map(renderTab)}
          </div>
        </div>
      </nav>

      {/* FLOATING 3D GLASS FAB */}
      <div className="md:hidden fixed bottom-11 inset-x-0 z-50 flex justify-center pointer-events-none">
        <button
          onClick={() => (panelVisible ? closePanel() : openPanel())}
          aria-label={panelVisible ? 'Close menu' : 'More pages'}
          aria-expanded={panelVisible}
          className={`pointer-events-auto fab-glass ${isSecondaryActive ? 'fab-glass--active' : ''}`}
        >
          <Plus className={`w-6 h-6 text-white transition-transform duration-300 ${panelVisible ? 'rotate-45' : ''}`} strokeWidth={2.5} />
        </button>
      </div>

      {/* BACKDROP + EXPANDING GLASS PANEL */}
      {panelMounted && (
        <>
          <div
            className={`md:hidden fixed inset-0 z-40 bg-black/10 transition-opacity duration-300 ${panelVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={closePanel}
          />
          <div
            onTransitionEnd={(e) => {
              if (e.propertyName === 'transform' && !panelVisible) setPanelMounted(false);
            }}
            className={`md:hidden fixed bottom-24 inset-x-5 z-50 glass-panel ${panelVisible ? 'glass-panel--open' : ''}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
              More Pages
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {SECONDARY.map((item, i) => {
                const active = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => go(item.view)}
                    style={{ transitionDelay: panelVisible ? `${80 + i * 35}ms` : '0ms' }}
                    className={`dial-item flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl border transition-all active:scale-95 ${
                      active
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-white/70 border-white/60 text-gray-600 hover:bg-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <style>{`
        .glass-bar {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow:
            0 10px 32px rgba(17,17,17,0.10),
            0 2px 8px rgba(17,17,17,0.06),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .nav-pill {
          position: absolute;
          top: 1px;
          width: 42px;
          height: 42px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(251,191,36,0.22), rgba(251,191,36,0.08));
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(180,83,9,0.12);
        }
        .fab-glass {
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(155deg, #f2b65e 0%, #d9820f 45%, #b45309 100%);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow:
            0 10px 22px rgba(180,83,9,0.40),
            0 3px 8px rgba(180,83,9,0.30),
            inset 0 1.5px 2px rgba(255,255,255,0.55),
            inset 0 -2px 4px rgba(120,53,15,0.35);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
        }
        .fab-glass:active {
          transform: scale(0.92);
        }
        .fab-glass--active {
          box-shadow:
            0 10px 22px rgba(180,83,9,0.55),
            0 3px 8px rgba(180,83,9,0.4),
            inset 0 1.5px 2px rgba(255,255,255,0.6),
            inset 0 -2px 4px rgba(120,53,15,0.4),
            0 0 0 4px rgba(251,191,36,0.25);
        }
        .glass-panel {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 26px;
          padding: 18px 16px;
          box-shadow:
            0 20px 50px rgba(17,17,17,0.18),
            inset 0 1px 0 rgba(255,255,255,0.8);
          transform-origin: bottom center;
          transform: scale(0.35) translateY(16px);
          opacity: 0;
          transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
        }
        .glass-panel--open {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
        .dial-item {
          opacity: 0;
          transform: translateY(10px) scale(0.85);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .glass-panel--open .dial-item {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .fab-glass, .glass-panel, .dial-item, .nav-pill { transition: none; }
        }
      `}</style>
    </>
  );
}
