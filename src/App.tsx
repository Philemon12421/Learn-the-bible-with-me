import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Facebook } from 'lucide-react';
import { ViewType } from './types';
import { 
  HomeView, 
  BibleView, 
  MotivationView, 
  WisdomView, 
  AboutView, 
  ContactView, 
  PrivacyView, 
  TermsView 
} from './components/Pages';
import BlogView from './components/BlogView';
import AudioPlayer from './components/AudioPlayer';
import SundayView from './components/SundayView';
import SplashScreen from './components/SplashScreen';
import InstallPrompt from './components/InstallPrompt';
import PWAUpdateToast from './components/PWAUpdateToast';
import WidgetVerseCard from './components/WidgetVerseCard';
import MobileNavBar from './components/MobileNavBar';
import PrayerRequestView from './components/PrayerRequestView';
import BibleReaderView from './components/BibleReaderView';
import { checkAndFireDailyReminder } from './components/DailyReminder';
import { getDailyBibleVerse } from './data';

const VALID_VIEWS: ViewType[] = ['home', 'bible', 'motivation', 'wisdom', 'about', 'contact', 'privacy', 'terms', 'blog', 'sunday', 'prayer', 'reader'];

const NAV_LABEL: Partial<Record<ViewType, string>> = { bible: 'Scripture', reader: 'Read Bible', prayer: 'Prayer' };

export default function App() {
  // ?widget=1 → render the standalone embeddable verse card only, with no
  // header/nav/footer/splash. Checked once; this URL is meant to be loaded
  // fresh inside an <iframe>, not navigated within the app.
  const isWidgetMode = useMemo(
    () => new URLSearchParams(window.location.search).get('widget') === '1',
    []
  );

  // ?view=bible (etc.) → used by the PWA manifest's app shortcuts so a
  // long-press on the installed icon can jump straight to a page.
  const initialView = useMemo<ViewType>(() => {
    const requested = new URLSearchParams(window.location.search).get('view');
    return (VALID_VIEWS as string[]).includes(requested || '') ? (requested as ViewType) : 'home';
  }, []);

  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [todayDate] = useState<Date>(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Splash screen: visible controls the fade, mounted keeps it in the DOM
  // until the fade-out transition actually finishes.
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashMounted, setSplashMounted] = useState(true);

  useEffect(() => {
    if (isWidgetMode) return; // no splash in embedded widget mode
    const t = setTimeout(() => setSplashVisible(false), 1500);
    return () => clearTimeout(t);
  }, [isWidgetMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Daily reminder: checked once on load. See components/DailyReminder.tsx
  // for the honest limitation — this fires when the app is opened on/after
  // the chosen time, not as a true background push while fully closed.
  useEffect(() => {
    if (isWidgetMode) return;
    const verse = getDailyBibleVerse(new Date());
    checkAndFireDailyReminder(verse.reference, verse.text);
  }, [isWidgetMode]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={setCurrentView} todayDate={todayDate} />;
      case 'bible': return <BibleView />;
      case 'motivation': return <MotivationView />;
      case 'wisdom': return <WisdomView />;
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'privacy': return <PrivacyView />;
      case 'terms': return <TermsView />;
      case 'blog': return <BlogView />;
      case 'sunday': return <SundayView />;
      case 'prayer': return <PrayerRequestView />;
      case 'reader': return <BibleReaderView />;
      default: return <HomeView onNavigate={setCurrentView} todayDate={todayDate} />;
    }
  };

  // Embeddable widget: a completely separate, minimal render path — no
  // shell, no splash, no nav. Hooks above still ran unconditionally, so
  // this early return is safe.
  if (isWidgetMode) {
    return <WidgetVerseCard />;
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col font-sans pb-20 md:pb-0">

      {splashMounted && (
        <SplashScreen visible={splashVisible} onHidden={() => setSplashMounted(false)} />
      )}

      <InstallPrompt />
      <PWAUpdateToast />

      {/* HEADER */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-amber-100/50' : 'bg-white/70 backdrop-blur-md border-b border-gray-100/40'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* LOGO */}
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-all group flex-shrink-0"
            aria-label="Learn With Me - Home"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-amber-200/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <img 
                src="/cross.jpeg" 
                alt="Learn With Me Bible Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  const parent = el.parentElement!;
                  parent.style.background = 'linear-gradient(135deg,#b45309,#92400e)';
                  parent.innerHTML = '<span style="color:white;font-size:18px;display:flex;align-items:center;justify-content:center;height:100%">✝</span>';
                }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                Learn With Me
              </span>
              <span className="text-[9px] text-amber-600 font-medium tracking-wider uppercase hidden sm:inline mt-0.5">
                Daily Faith · Wisdom · Growth
              </span>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {(['home','bible','reader','motivation','wisdom','sunday','prayer','about'] as ViewType[]).map(v => (
              <button
                key={v}
                onClick={() => setCurrentView(v)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${currentView === v ? 'bg-amber-50 text-amber-800 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {NAV_LABEL[v] ?? v}
              </button>
            ))}
          </nav>

          {/* AUDIO PLAYER */}
          <div className="flex items-center flex-shrink-0">
            <AudioPlayer />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:py-10 relative px-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          {renderActiveView()}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-10 px-4 mt-12 relative z-10" role="contentinfo">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-8 border-b border-gray-100">
            
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="/cross.jpeg" alt="Logo" className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.parentElement!.style.background='#b45309';
                      el.parentElement!.innerHTML='<span style="color:white;font-size:14px;display:flex;align-items:center;justify-content:center;height:100%">✝</span>';
                    }}
                  />
                </div>
                <span className="font-serif text-base font-extrabold text-gray-900">Learn With Me</span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Daily Bible verses, motivational quotes, and timeless wisdom — carefully curated to inspire your faith journey.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Pages</h4>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                {[
                  ['home','Home'],['bible','Scripture'],['reader','Read Bible'],['motivation','Motivation'],
                  ['wisdom','Wisdom'],['sunday','Sunday'],['prayer','Prayer'],['blog','Blog'],
                  ['about','About'],['contact','Contact'],
                  ['privacy','Privacy'],['terms','Terms']
                ].map(([view, label]) => (
                  <button key={view} onClick={() => setCurrentView(view as ViewType)} 
                    className="text-left hover:text-amber-700 transition-colors font-medium py-0.5">
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Community</h4>
              <div className="flex flex-col gap-2">
                <a href="https://whatsapp.com/channel/0029VbBYNsGHAdNUPx90se1q" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.77.47 3.43 1.29 4.9L2 22l5.25-1.34c1.42.77 3.03 1.21 4.74 1.21 5.51 0 10-4.49 10-10C22.004 6.49 17.514 2 12.004 2zm5.82 14.12c-.25.7-1.42 1.3-1.95 1.38-.49.07-1.12.09-2.73-.55-2.07-.82-3.41-2.91-3.51-3.05-.1-.13-.82-1.07-.82-2.04 0-.97.51-1.44.69-1.63.18-.19.39-.24.52-.24.13 0 .26 0 .37.01.12.01.27-.04.42.32.16.38.54 1.31.59 1.41.05.1.08.22.01.36-.07.14-.15.23-.23.32-.08.09-.17.19-.24.27-.08.08-.16.17-.07.33.09.15.41.67.88 1.09.6.53 1.11.7 1.27.78.16.08.25.07.34-.03.09-.1.39-.45.49-.61.1-.16.2-.13.34-.08.14.05.88.41 1.03.49.15.08.25.12.29.18.04.07.04.4-.21.1z"/>
                  </svg>
                  <span>Join WhatsApp Channel</span>
                </a>
                <a href="https://www.facebook.com/share/1EgWqBLG4N/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95">
                  <Facebook className="w-4 h-4 flex-shrink-0" />
                  <span>Follow on Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <span>© {todayDate.getFullYear()} Learn With Me. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Made with love by <span className="font-semibold text-gray-600">Drenchack Tech Company</span></span>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE: glassy 4-tab bar + floating "+" panel for the rest */}
      <MobileNavBar currentView={currentView} setCurrentView={setCurrentView} />

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .animate-fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
        .animate-slide-up { animation: slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
    </div>
  );
}
