import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-blue-50 border border-amber-100/60 rounded-2xl p-6 sm:p-8 text-center space-y-4">
      <div className="inline-flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-700 rounded-xl">
        <Mail className="w-5 h-5" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900">Daily Inspiration in Your Inbox</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Get today's Bible verse, motivational quote, and wise saying delivered every morning.
        </p>
      </div>

      {subscribed ? (
        <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl py-3 px-5 max-w-sm mx-auto">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">You're subscribed! Check your inbox.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button type="submit" disabled={loading}
            className="bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 flex-shrink-0">
            <span>{loading ? 'Joining...' : 'Subscribe'}</span>
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </form>
      )}
      <p className="text-[10px] text-gray-400">Free forever · Unsubscribe anytime · No spam</p>
    </div>
  );
}
