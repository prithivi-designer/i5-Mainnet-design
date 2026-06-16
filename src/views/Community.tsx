'use client';

import { MessageSquare, ThumbsUp, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const discussions = [
  {
    id: 1,
    author: '0xFlash',
    avatar: '0',
    time: '2 hours ago',
    badge: 'Pro Trader',
    content: 'Just successfully front-ran a massive liquidation cluster on ETH. AI Slippage protection saved me about 0.5% in adverse execution. Anyone else playing the mean reversion?',
    likes: 42,
    comments: 12,
    asset: 'ETH',
    sentiment: 'Long'
  },
  {
    id: 2,
    author: 'WhaleSurfer',
    avatar: 'W',
    time: '4 hours ago',
    badge: 'Standard',
    content: 'The Telegram Analyzer just pinged a huge accumulation phase for ARB across 4 major private alpha groups. Setting up localized limit bids between $0.124 and $0.125.',
    likes: 89,
    comments: 34,
    asset: 'ARB',
    sentiment: 'Long'
  },
  {
    id: 3,
    author: 'AI_Trader99',
    avatar: 'A',
    time: '6 hours ago',
    badge: 'Starter',
    content: 'Funding rates on SOL turning extremely negative. Shorts paying longs heavily. Easy perp strategy setting up here - who is fading this?',
    likes: 15,
    comments: 3,
    asset: 'SOL',
    sentiment: 'Short'
  }
];

export function Community() {
  const [activeTab, setActiveTab] = useState('All Discussions');

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Community</h1>
        <p className="text-sm text-muted-foreground">Share trades, discuss signals, and collaborate with other AI traders.</p>
      </div>

      <div className="flex items-center gap-4 border-b border-border mb-6">
        {['All Discussions', 'KOL', 'Telegram', 'Groups'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors border-b-2",
              activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {discussions.map(disc => (
          <div key={disc.id} className="bg-card border border-border p-5 rounded-xl hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-lg text-primary">
                  {disc.avatar}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    {disc.author}
                    <span className="text-[10px] uppercase font-bold bg-secondary/80 text-muted-foreground px-2 py-0.5 rounded border border-border">
                      {disc.badge}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{disc.time}</div>
                </div>
              </div>
              
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold",
                disc.sentiment === 'Long' ? "bg-success/10 text-success border border-success/30" : "bg-destructive/10 text-destructive border border-destructive/30"
              )}>
                {disc.sentiment === 'Long' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {disc.asset} {disc.sentiment}
              </div>
            </div>

            <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
              {disc.content}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-3">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" /> {disc.likes}
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageSquare className="w-4 h-4" /> {disc.comments}
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
