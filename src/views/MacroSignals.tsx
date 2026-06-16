'use client';

import { useState } from 'react';
import { Clock, Circle, Bitcoin, Gem, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = ['All', 'AI Agents', 'AI', 'Crypto', 'Perpetual'];

const data = [
  { id: 1, title: 'Bitcoin Surges Over $1K in One Minute on Binance', time: '3 hours ago', asset: 'BTC', cat: 'Crypto', icon: Bitcoin, iconColor: 'text-orange-500' },
  { id: 2, title: 'Amazon hires Bitcoin and crypto professionals, offers up to $500,000', time: '10 hours ago', asset: 'BTC', cat: 'Crypto', icon: Bitcoin, iconColor: 'text-orange-500' },
  { id: 3, title: 'CryptoPunks floor price surpasses 30 ETH amid rising demand', time: '14 hours ago', asset: 'ETH', cat: 'Crypto', icon: Gem, iconColor: 'text-blue-500' },
  { id: 4, title: 'Whale deposits 300 Bitcoin worth $23.4M into Binance after 2 years', time: '16 hours ago', asset: 'BTC', cat: 'AI Agents', icon: Bitcoin, iconColor: 'text-orange-500' },
  { id: 5, title: "Ethereum Foundation unstakes $48.9M ETH from Lido's unstETH contract", time: 'a day ago', asset: 'ETH', cat: 'Perpetual', icon: Gem, iconColor: 'text-blue-500' },
  { id: 6, title: '$ASTER whale deposits 34.62M tokens into Aster, price drops 4.4%', time: 'a day ago', asset: 'ASTER', cat: 'AI', icon: Coins, iconColor: 'text-yellow-600' },
  { id: 7, title: 'BlackRock Leads $1.9B Inflows into US Spot Bitcoin ETFs as BTC Nears $79K', time: 'a day ago', asset: 'BTC', cat: 'Crypto', icon: Bitcoin, iconColor: 'text-orange-500' },
  { id: 8, title: 'Trump team wallets dump 15.5M $TRUMP into OKX ahead of conference', time: 'a day ago', asset: 'TRUMP', cat: 'AI', icon: Coins, iconColor: 'text-red-500' },
  { id: 9, title: 'BlackRock clients purchase $167M in Bitcoin', time: '2 days ago', asset: 'BTC', cat: 'Crypto', icon: Bitcoin, iconColor: 'text-orange-500' }
];

export function MacroSignals({ hideHeader, onTradeClick }: { hideHeader?: boolean; onTradeClick?: () => void }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredData = data.filter(item => activeTab === 'All' || item.cat === activeTab);

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8">
      
      {!hideHeader && (
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Macro Signals</h1>
        <p className="text-sm text-muted-foreground">Market-moving events, AI agent alerts, and crypto news.</p>
      </div>
      )}

      <div className="flex items-center gap-8 border-b border-border/50 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(16,185,129,0.5)]" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors flex flex-col justify-between group h-full shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-base font-semibold leading-snug flex-1 group-hover:text-primary transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <Circle className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" />
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 bg-secondary/80 px-2.5 py-1.5 rounded-lg border border-border">
                  <Icon className={cn("w-3.5 h-3.5", item.iconColor)} />
                  <span className="text-xs font-bold leading-none">{item.asset}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => onTradeClick?.()} className="border border-success/30 text-success hover:bg-success/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Long
                  </button>
                  <button onClick={() => onTradeClick?.()} className="border border-destructive/30 text-destructive hover:bg-destructive/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                    Short
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
