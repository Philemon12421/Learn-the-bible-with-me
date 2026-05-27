import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, Sparkles, Compass, HelpCircle, Mail, Shield, Scale, 
  Menu, X, Heart, MessageSquare, ExternalLink, Calendar, Facebook
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
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Drawer control
  const [todayDate] = useState<Date>(new Date());

  // Automatically scroll to top on redirecting views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentView]);

  // Map the active page component
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} todayDate={todayDate} />;
      case 'bible':
        return <BibleView />;
      case 'motivation':
        return <MotivationView />;
      case 'wisdom':
        return <WisdomView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      default:
        return <HomeView onNavigate={setCurrentView} todayDate={todayDate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between font-sans subpixel-antialiased selection:bg-blue-100 selection:text-blue-900 pb-20 md:pb-0">
      
      {/* ================= HEADER AND NAVIGATION ================= */}
      <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-gray-100/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* LOGO & Tagline Area */}
          <div 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-all group"
          >
            {/* Soft Icon Badge logo */}
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:rotate-6 transition-all">
              <span className="font-serif font-bold text-base">L</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-extrabold text-gray-950 tracking-tight">
                  Learn With Me
                </span>
                
                {/* Verified Badge */}
                <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-3.5 h-3.5" title="Verified Website">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
              <span className="text-[9px] text-gray-400 font-medium tracking-wider uppercase font-mono hidden sm:inline">
                Learn the world with me
              </span>
            </div>
          </div>

          {/* DESKTOP TOP MENU ROW */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'home' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('bible')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'bible' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Bible
            </button>
            <button
              onClick={() => setCurrentView('motivation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'motivation' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Motivation
            </button>
            <button
              onClick={() => setCurrentView('wisdom')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'wisdom' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Wisdom
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'about' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${currentView === 'contact' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              Contact
            </button>
          </nav>

          {/* RIGHT ACTION: Ambient Audio toggler */}
          <div className="flex items-center">
            <AudioPlayer />
          </div>

        </div>
      </header>

      {/* ================= MAIN CONTENT WINDOW ================= */}
      <main className="flex-grow max-w-7xl w-full mx-auto py-8 sm:py-12 relative">
        <div className="absolute inset-0 max-w-full overflow-hidden pointer-events-none z-0">
          {/* Subtle decoration vector clouds */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <div className="relative z-10">
          {renderActiveView()}
        </div>
      </main>

      {/* ================= FOOTER COMPONENT ================= */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-100 py-12 px-6 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Brand + Tagline + Social Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-50">
            
            {/* Logo box */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-extrabold text-gray-950">
                  Learn With Me
                </span>
                <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-3.5 h-3.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
              <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                Learn the world with me. Discover and share premium Bible scriptures, motivational quote keys, and wisdom proverbs.
              </p>
            </div>

            {/* Quick footer Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                DIRECTORY
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-semibold">
                <button onClick={() => setCurrentView('home')} className="text-left hover:text-blue-600 hover:underline">Home</button>
                <button onClick={() => setCurrentView('bible')} className="text-left hover:text-blue-600 hover:underline">Bible readings</button>
                <button onClick={() => setCurrentView('motivation')} className="text-left hover:text-blue-600 hover:underline">Motivation</button>
                <button onClick={() => setCurrentView('wisdom')} className="text-left hover:text-blue-600 hover:underline">Wisdom portal</button>
                <button onClick={() => setCurrentView('about')} className="text-left hover:text-blue-600 hover:underline">About us</button>
                <button onClick={() => setCurrentView('contact')} className="text-left hover:text-blue-600 hover:underline">Contact studio</button>
                <button onClick={() => setCurrentView('privacy')} className="text-left hover:text-blue-600 hover:underline">Privacy policy</button>
                <button onClick={() => setCurrentView('terms')} className="text-left hover:text-blue-600 hover:underline">Terms & Service</button>
              </div>
            </div>

            {/* Verification & Socials */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                SOCIAL ENGAGEMENT
              </h4>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {/* 1. Join WhatsApp Channel */}
                <a 
                  href="https://whatsapp.com/channel/0592063645" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                  title="Join our WhatsApp Inspirational Channel"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.77.47 3.43 1.29 4.9L2 22l5.25-1.34c1.42.77 3.03 1.21 4.74 1.21 5.51 0 10-4.49 10-10C22.004 6.49 17.514 2 12.004 2zm5.82 14.12c-.25.7-1.42 1.3-1.95 1.38-.49.07-1.12.09-2.73-.55-2.07-.82-3.41-2.91-3.51-3.05-.1-.13-.82-1.07-.82-2.04 0-.97.51-1.44.69-1.63.18-.19.39-.24.52-.24.13 0 .26 0 .37.01.12.01.27-.04.42.32.16.38.54 1.31.59 1.41.05.1.08.22.01.36-.07.14-.15.23-.23.32-.08.09-.17.19-.24.27-.08.08-.16.17-.07.33.09.15.41.67.88 1.09.6.53 1.11.7 1.27.78.16.08.25.07.34-.03.09-.1.39-.45.49-.61.1-.16.2-.13.34-.08.14.05.88.41 1.03.49.15.08.25.12.29.18.04.07.04.4-.21.1z"/>
                  </svg>
                  <span>Join WhatsApp Channel</span>
                </a>

                {/* 2. Follow on Facebook */}
                <a 
                  href="https://facebook.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-650 hover:bg-blue-700 bg-blue-600 text-white text-[11px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Follow on Facebook</span>
                </a>
              </div>
            </div>

          </div>

          {/* Copyright parameters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
            <div>
              © {todayDate.getFullYear()} **Learn With Me**. All resources reserved.
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500 animate-pulse" />
              <span>Made with love by</span>
              <span className="font-bold text-gray-700">Drenchack Tech Company</span>
            </div>
          </div>

        </div>
      </footer>

      {/* =======================================================
          MOBILE BOTTOM NAVIGATION (Fixed, transparent, glassmorphic)
          ======================================================= */}
      <nav id="mobile-navigation-bar" className="md:hidden fixed bottom-4 inset-x-4 h-15 bg-white/75 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl flex items-center justify-around px-2 z-40">
        
        {/* Navigation Item : Home */}
        <button
          onClick={() => {
            setCurrentView('home');
            setIsMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
            currentView === 'home' ? 'text-blue-600 bg-blue-50/50 scale-105' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span className="text-[9px] font-mono mt-0.5 font-bold">Home</span>
        </button>

        {/* Navigation Item : Bible */}
        <button
          onClick={() => {
            setCurrentView('bible');
            setIsMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
            currentView === 'bible' ? 'text-blue-600 bg-blue-50/50 scale-105' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span className="text-[9px] font-mono mt-0.5 font-bold">Scripture</span>
        </button>

        {/* Navigation Item : Motivation */}
        <button
          onClick={() => {
            setCurrentView('motivation');
            setIsMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
            currentView === 'motivation' ? 'text-blue-600 bg-blue-50/50 scale-105' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4.5 h-4.5" />
          <span className="text-[9px] font-mono mt-0.5 font-bold">Growth</span>
        </button>

        {/* Navigation Item : Wisdom */}
        <button
          onClick={() => {
            setCurrentView('wisdom');
            setIsMobileMenuOpen(false);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
            currentView === 'wisdom' ? 'text-blue-600 bg-blue-50/50 scale-105' : 'text-gray-400 hover:text-gray-900'
          }`}
        >
          <Compass className="w-4.5 h-4.5" />
          <span className="text-[9px] font-mono mt-0.5 font-bold">Wisdom</span>
        </button>

        {/* Navigation Item : More Menu triggering dynamic Drawer (About, Contact, Privacy, Terms) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
            isMobileMenuOpen ? 'text-blue-700 bg-blue-100/50 scale-105' : 'text-gray-400'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-4.5 h-4.5 text-blue-600" /> : <Menu className="w-4.5 h-4.5" />}
          <span className="text-[9px] font-mono mt-0.5 font-bold">More</span>
        </button>

      </nav>

      {/* ==========================================
          MOBILE MORE DRAWER DROPDOWN
          ========================================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-xs z-35 flex items-end animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="w-full bg-white rounded-t-3xl border-t border-gray-100 p-6 space-y-4 shadow-2xl animate-slide-up pb-24"
            onClick={(e) => e.stopPropagation()} // Prevent bubble closure on selecting actual buttons
          >
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                Additional pages
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* About link */}
              <button
                onClick={() => {
                  setCurrentView('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                  currentView === 'about' ? 'bg-blue-50/50 border-blue-200 text-blue-700' : 'bg-white border-gray-50 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <HelpCircle className="w-4 h-4 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold">About Us</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">Our vision and mission</p>
                </div>
              </button>

              {/* Contact link */}
              <button
                onClick={() => {
                  setCurrentView('contact');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                  currentView === 'contact' ? 'bg-blue-50/50 border-blue-200 text-blue-700' : 'bg-white border-gray-50 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <Mail className="w-4 h-4 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold">Contact Us</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">Send a message or dial</p>
                </div>
              </button>

              {/* Privacy Policy link */}
              <button
                onClick={() => {
                  setCurrentView('privacy');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                  currentView === 'privacy' ? 'bg-blue-50/50 border-blue-200 text-blue-700' : 'bg-white border-gray-50 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <Shield className="w-4 h-4 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold">Privacy Policy</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">How we secure subscribers</p>
                </div>
              </button>

              {/* Terms Link */}
              <button
                onClick={() => {
                  setCurrentView('terms');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                  currentView === 'terms' ? 'bg-blue-50/50 border-blue-200 text-blue-700' : 'bg-white border-gray-50 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <Scale className="w-4 h-4 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold">Terms & Conditions</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">Service guidelines and rules</p>
                </div>
              </button>

            </div>

            {/* Micro branding signature at bottom of mobile drawer */}
            <div className="pt-3 text-center border-t border-gray-50">
              <span className="text-[9px] font-mono text-gray-405 font-bold text-gray-400">
                Made with love by Drenchack Tech Company
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Embedding necessary CSS animation utilities for layout transitions */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
