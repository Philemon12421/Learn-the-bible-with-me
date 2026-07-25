import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, Sparkles, Compass, HelpCircle, Mail, Shield, Scale, 
  Menu, X, Heart, Facebook
} from 'lucide-react';
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

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [todayDate] = useState<Date>(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      default: return <HomeView onNavigate={setCurrentView} todayDate={todayDate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col font-sans pb-20 md:pb-0">

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
            {(['home','bible','motivation','wisdom','about','contact'] as ViewType[]).map(v => (
              <button
                key={v}
                onClick={() => setCurrentView(v)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${currentView === v ? 'bg-amber-50 text-amber-800 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {v === 'bible' ? 'Scripture' : v}
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
                  ['home','Home'],['bible','Scripture'],['motivation','Motivation'],
                  ['wisdom','Wisdom'],['blog','Blog'],['about','About'],['contact','Contact'],
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

      {/* MOBILE BOTTOM NAV */}
      <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-3 inset-x-3 h-16 bg-white/85 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl flex items-center justify-around px-2 z-40">
        {[
          { view: 'home', icon: <Home className="w-4 h-4" />, label: 'Home' },
          { view: 'bible', icon: <BookOpen className="w-4 h-4" />, label: 'Bible' },
          { view: 'motivation', icon: <Sparkles className="w-4 h-4" />, label: 'Growth' },
          { view: 'wisdom', icon: <Compass className="w-4 h-4" />, label: 'Wisdom' },
        ].map(({ view, icon, label }) => (
          <button key={view} onClick={() => setCurrentView(view as ViewType)}
            className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all ${currentView === view ? 'text-amber-700 bg-amber-50 scale-105' : 'text-gray-400 hover:text-gray-700'}`}>
            {icon}
            <span className="text-[9px] font-bold mt-0.5">{label}</span>
          </button>
        ))}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all ${isMobileMenuOpen ? 'text-amber-700 bg-amber-50 scale-105' : 'text-gray-400'}`}>
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="text-[9px] font-bold mt-0.5">More</span>
        </button>
      </nav>

      {/* MOBILE MORE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-35 flex items-end" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-full bg-white rounded-t-3xl border-t border-gray-100 p-5 space-y-4 shadow-2xl pb-28" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">More Pages</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { view: 'about', icon: <HelpCircle className="w-4 h-4" />, title: 'About Us', desc: 'Our vision & mission' },
                { view: 'contact', icon: <Mail className="w-4 h-4" />, title: 'Contact', desc: 'Send a message' },
                { view: 'privacy', icon: <Shield className="w-4 h-4" />, title: 'Privacy', desc: 'How we protect you' },
                { view: 'terms', icon: <Scale className="w-4 h-4" />, title: 'Terms', desc: 'Service guidelines' },
              ].map(({ view, icon, title, desc }) => (
                <button key={view} onClick={() => setCurrentView(view as ViewType)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${currentView === view ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-800'}`}>
                  <span className="mt-0.5 text-gray-400">{icon}</span>
                  <div>
                    <h4 className="text-xs font-bold">{title}</h4>
                    <p className="text-[9px] text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
