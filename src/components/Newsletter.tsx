import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [allSubscribers, setAllSubscribers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Load subscriptions locally on startup to feel highly interactive
  useEffect(() => {
    const saved = localStorage.getItem('learn_with_me_subscribers');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        setAllSubscribers(list);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please type a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email format (e.g. name@domain.com).');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (allSubscribers.includes(cleanEmail)) {
      // Already registered here
      setIsSubscribed(true);
      return;
    }

    const updatedList = [...allSubscribers, cleanEmail];
    localStorage.setItem('learn_with_me_subscribers', JSON.stringify(updatedList));
    setAllSubscribers(updatedList);
    setIsSubscribed(true);
    setEmail('');
  };

  const handleReset = () => {
    // Unsubscribe helper
    const filtered = allSubscribers.filter(item => item !== email.trim().toLowerCase());
    localStorage.setItem('learn_with_me_subscribers', JSON.stringify(filtered));
    setAllSubscribers(filtered);
    setIsSubscribed(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-12 backdrop-blur-md bg-white/70 border border-gray-100 p-8 rounded-3xl shadow-lg relative overflow-hidden">
      
      {/* Soft color touch */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />

      {isSubscribed ? (
        <div className="text-center py-4 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-sans font-bold text-gray-950">
            You're on the list!
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Thank you for subscribing to **Learn With Me**. We will send beautiful daily quotes, scriptures, and motivational thoughts straight to your inbox each morning.
          </p>
          
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 border border-green-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Checked & active subscription
            </span>
            <button 
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer font-medium"
            >
              Cancel or change email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-bold tracking-tight">
              Get daily inspiration
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Join thousands of learners receiving quiet faith, wisdom, and daily motivational strength directly in their inbox.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative flex items-center rounded-2xl border border-gray-100 bg-white shadow-inner p-1.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
              <div className="pl-3.5 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full pl-3 pr-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-5 rounded-xl cursor-pointer transition-all flex items-center gap-1 hover:shadow-lg active:scale-95"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {errorMessage && (
              <p className="text-xs text-rose-500 font-medium pl-2 animate-pulse">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 border-t border-gray-50 pt-4 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-500" />
              Zero spam policy
            </span>
            <span>•</span>
            <span>Unsubscribe with 1 click</span>
            <span>•</span>
            <span>No ads</span>
          </div>
        </form>
      )}
    </div>
  );
}
