export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  explanation: string;
  reflection: string;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
  insight: string;
}

export interface WiseSaying {
  id: string;
  text: string;
  author: string;
  explanation: string;
}

export type ViewType = 'home' | 'bible' | 'motivation' | 'wisdom' | 'about' | 'contact' | 'privacy' | 'terms';
