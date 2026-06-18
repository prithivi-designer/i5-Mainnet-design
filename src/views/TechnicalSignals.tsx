'use client';

import { useState } from 'react';
import { Clock, HelpCircle, FileText, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Settings, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store';

const tabs = ['Top 10 Aggregate', 'By Chart Analyzer', 'By News Analyzer', 'By Telegram Analyzer'];

interface SignalData {
  id: number;
  asset: string;
  assetName: string;
  title: string; // Analyzer title
  name: string; // Signal title
  type: 'Long' | 'Short';
  winRate: string;
  rr: string;
  range: string;
  time: string;
  reqPro?: boolean;
}

const initialSignals: SignalData[] = [
  { id: 1, asset: 'BTC', assetName: 'Bitcoin', title: 'Chart Analyzer', name: 'Bitcoin RSI Oversold Bounce', type: 'Long', winRate: '68%', rr: '12.5', range: '$62,400 - $63,100', time: '4 mins ago' },
  { id: 2, asset: 'ETH', assetName: 'Ethereum', title: 'News Analyzer', name: 'ETF Inflows Spiking heavily', type: 'Long', winRate: '62%', rr: '11.8', range: '$3,450 - $3,380', time: '12 mins ago' },
  { id: 3, asset: 'SOL', assetName: 'Solana', title: 'Telegram Analyzer', name: 'Whale Accumulation Ping locally', type: 'Long', winRate: '71%', rr: '13.0', range: '$142.50 - $148.00', time: '1 hour ago' },
  { id: 4, asset: 'ARB', assetName: 'Arbitrum', title: 'Telegram Analyzer', name: 'Private Alpha: Funding Rates turning', type: 'Short', winRate: '67%', rr: '1:1.23', range: '$0.124 - $0.125', time: '2 hours ago' },
  { id: 5, asset: 'HYPE', assetName: 'Hype', title: 'Chart Analyzer', name: 'Bluechip range breakout prep', type: 'Short', winRate: '65%', rr: '1:4.38', range: '$42.09 - $42.30', time: '3 hours ago' },
  { id: 6, asset: 'PEPE', assetName: 'Pepe', title: 'News Analyzer', name: 'Exchange Listing Rumors detected', type: 'Long', winRate: '54%', rr: '1:5.0', range: '$0.000008 - $0.00001', time: '4 hours ago', reqPro: true },
  { id: 7, asset: 'LINK', assetName: 'Chainlink', title: 'Chart Analyzer', name: 'MACD bullish divergence on 4h', type: 'Long', winRate: '72%', rr: '12.0', range: '$14.20 - $15.50', time: '5 hours ago', reqPro: true },
  { id: 8, asset: 'DOGE', assetName: 'Dogecoin', title: 'Telegram Analyzer', name: 'Sudden Sentiment Spike across 10 groups', type: 'Long', winRate: '58%', rr: '1:3.5', range: '$0.15 - $0.18', time: '6 hours ago', reqPro: true },
  { id: 9, asset: 'AVAX', assetName: 'Avalanche', title: 'Chart Analyzer', name: 'Liquidation cluster approaching - Fade setup', type: 'Short', winRate: '64%', rr: '1:1.5', range: '$35.20 - $34.00', time: '8 hours ago', reqPro: true },
  { id: 10, asset: 'SUI', assetName: 'Sui', title: 'News Analyzer', name: 'Network Upgrade announcement digested', type: 'Long', winRate: '61%', rr: '11.4', range: '$1.45 - $1.60', time: '10 hours ago', reqPro: true }
];

export function TechnicalSignals({ hideHeader, onTradeClick }: { hideHeader?: boolean; onTradeClick?: () => void }) {
  const { tier } = useUserStore();
  const [activeTab, setActiveTab] = useState('Top 10 Aggregate');

  const filteredSignals = initialSignals.filter(s => {
    if (activeTab === 'Top 10 Aggregate') return true;
    return s.title === activeTab.replace('By ', '');
  });

  const getSignalStrength = (rate: string) => {
    const num = parseInt(rate);
    if (num >= 70) return 3;
    if (num >= 60) return 2;
    return 1;
  };

  return (
    <div className="h-full overflow-y-auto bg-[#080808] p-6 font-sans">
      
      {/* Filters & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Sub-tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all",
                  isActive
                    ? "border-[#34d399]/40 bg-transparent text-[#34d399]"
                    : "border-[#1c1c1c] bg-transparent text-gray-400 hover:text-gray-200"
                )}
              >
                {tab === 'Top 10 Aggregate' && (
                  <span className={isActive ? "text-[#34d399]" : "text-gray-400"}>★</span>
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Last updated indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
          <span>Last updated: 2 mins ago</span>
        </div>
      </div>

      {/* Signals Table */}
      <div className="w-full overflow-x-auto no-scrollbar mb-6">
        <div className="min-w-[1000px] flex flex-col gap-2">
          
          {/* Header Row */}
          <div className="flex items-center px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest text-gray-600 border-b border-[#141414]">
            <div className="w-[30%]">Signal</div>
            <div className="w-[10%] text-center">Win %</div>
            <div className="w-[10%] text-center">R/R</div>
            <div className="w-[12%] text-center">Range</div>
            <div className="w-[12%] text-center">Time</div>
            <div className="w-[26%] text-right pr-2">Action</div>
          </div>

          {/* Signal Cards */}
          <div className="space-y-3">
            {filteredSignals.map((signal) => {
              const isLocked = signal.reqPro && tier === 'Free';
              const strength = getSignalStrength(signal.winRate);

              return (
                <div
                  key={signal.id}
                  className={cn(
                    "flex items-center px-6 py-4 rounded-2xl bg-[#0c0c0c] border border-[#141414] hover:border-[#222] transition-all relative overflow-hidden",
                    isLocked && "opacity-60 grayscale-[0.4]"
                  )}
                >
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-20 flex items-center justify-center">
                      <div className="bg-[#111] border border-[#222] px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-2xl text-[12px] text-brand-purple">
                        🔒 PRO ONLY
                      </div>
                    </div>
                  )}

                  {/* Column 1: Signal detail */}
                  <div className="w-[30%] flex items-center gap-4">
                    {/* Coin Rounded Square */}
                    <div className="w-12 h-12 icon-squircle flex-shrink-0">
                      {signal.asset === 'BTC' && (
                        <div className="w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-extrabold text-[12px]">₿</div>
                      )}
                      {signal.asset === 'ETH' && (
                        <div className="w-6 h-6 rounded-full bg-[#3c3c3d] flex items-center justify-center text-white font-extrabold text-[12px]">Ξ</div>
                      )}
                      {signal.asset === 'SOL' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] flex items-center justify-center text-white font-extrabold text-[10px]">S</div>
                      )}
                      {signal.asset === 'ARB' && (
                        <div className="w-6 h-6 rounded-full bg-[#12aaee] flex items-center justify-center text-white font-extrabold text-[11px]">A</div>
                      )}
                      {signal.asset === 'HYPE' && (
                        <div className="w-6 h-6 rounded-full bg-[#025247] border border-[#34d399]/40 flex items-center justify-center text-[#34d399] font-extrabold text-[10px]">H</div>
                      )}
                      {(!['BTC', 'ETH', 'SOL', 'ARB', 'HYPE'].includes(signal.asset)) && (
                        <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-extrabold text-[11px]">{signal.asset.substring(0, 2)}</div>
                      )}
                    </div>
                    
                    {/* Analyzer, Signal Title & Position tag */}
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                        {signal.title === 'Chart Analyzer' && (
                          <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                          </svg>
                        )}
                        {signal.title === 'News Analyzer' && (
                          <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-4-2-4 2-4-2-4 2z" />
                          </svg>
                        )}
                        {signal.title === 'Telegram Analyzer' && (
                          <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                          </svg>
                        )}
                        <span>{signal.title}</span>
                      </div>
                      
                      <h4 className="font-bold text-[14px] leading-tight text-white truncate">{signal.name}</h4>
                      
                      <div>
                        <span className={cn(
                          "inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wide",
                          signal.type === 'Long'
                            ? "bg-[#062e26] border border-[#34d399]/20 text-[#34d399]"
                            : "bg-[#2c120a] border border-[#fa6432]/20 text-[#fa6432]"
                        )}>
                          {signal.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Win % */}
                  <div className="w-[10%] flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-bold text-[#34d399]">{signal.winRate}</span>
                      {/* Signal Strength bars */}
                      <div className="flex items-end gap-[1.5px] h-3">
                        <div className={cn("w-[2px] rounded-full transition-colors", strength >= 1 ? "bg-[#34d399]" : "bg-[#222]")} style={{ height: '5px' }} />
                        <div className={cn("w-[2px] rounded-full transition-colors", strength >= 2 ? "bg-[#34d399]" : "bg-[#222]")} style={{ height: '8px' }} />
                        <div className={cn("w-[2px] rounded-full transition-colors", strength >= 3 ? "bg-[#34d399]" : "bg-[#222]")} style={{ height: '11px' }} />
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-600 mt-1 font-bold">Win %</span>
                  </div>

                  {/* Column 3: R/R */}
                  <div className="w-[10%] flex flex-col items-center justify-center">
                    <span className="text-[14px] font-bold text-[#34d399]">{signal.rr}</span>
                    <span className="text-[10px] text-gray-600 mt-1 font-bold">R/R</span>
                  </div>

                  {/* Column 4: Range */}
                  <div className="w-[12%] flex flex-col items-center justify-center">
                    <span className="text-[12px] font-bold text-gray-300">{signal.range}</span>
                    <span className="text-[10px] text-gray-600 mt-1.5 font-bold">Range</span>
                  </div>

                  {/* Column 5: Time */}
                  <div className="w-[12%] flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-[12px] font-bold text-gray-300">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{signal.time}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 mt-1.5 font-bold">Time</span>
                  </div>

                  {/* Sparkline chart */}
                  <div className="flex items-center justify-center px-4">
                    {signal.type === 'Long' ? (
                      <svg width="60" height="26" viewBox="0 0 60 26" fill="none">
                        <path d="M2 18 L10 16 L18 20 L28 12 L38 18 L48 8 L58 4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 18 L10 16 L18 20 L28 12 L38 18 L48 8 L58 4 L58 26 L2 26 Z" fill="url(#green-spark)" opacity="0.06" />
                        <defs>
                          <linearGradient id="green-spark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ) : (
                      <svg width="60" height="26" viewBox="0 0 60 26" fill="none">
                        <path d="M2 4 L10 8 L18 6 L28 16 L38 12 L48 22 L58 20" stroke="#fa6432" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 4 L10 8 L18 6 L28 16 L38 12 L48 22 L58 20 L58 26 L2 26 Z" fill="url(#red-spark)" opacity="0.06" />
                        <defs>
                          <linearGradient id="red-spark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fa6432" />
                            <stop offset="100%" stopColor="#fa6432" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>

                  {/* Column 6: Action Buttons */}
                  <div className="w-[26%] flex items-center justify-end gap-2 pl-2">
                    <button
                      onClick={onTradeClick}
                      className="px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-[12px] font-bold text-[#34d399] border border-[#34d399]/20 bg-[#34d399]/[0.02] hover:bg-[#34d399]/10 transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Long
                    </button>
                    
                    <button
                      onClick={onTradeClick}
                      className="px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-[12px] font-bold text-[#fa6432] border border-[#fa6432]/20 bg-[#fa6432]/[0.02] hover:bg-[#fa6432]/10 transition-colors shrink-0"
                    >
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      Short
                    </button>

                    <button className="px-3 py-2 rounded-xl flex items-center gap-1.5 text-[12px] font-bold text-gray-300 border border-[#222] bg-transparent hover:bg-[#111] hover:border-gray-500 transition-colors shrink-0">
                      <FileText className="w-3.5 h-3.5 text-gray-500" />
                      View Thesis
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Footer Info disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border border-[#141414] rounded-xl p-4 gap-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-gray-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-400">Signals ranked by aggregate performance across all analyzers</span>
            <span className="text-[10px] text-gray-600 mt-0.5">Data is updated in real-time. Past performance is not indicative of future results.</span>
          </div>
        </div>
        <a href="#" className="flex items-center gap-1 text-[11px] font-bold text-[#34d399] hover:underline shrink-0">
          <span>Learn more about our methodology</span>
          <span className="text-[12px]">&gt;</span>
        </a>
      </div>

    </div>
  );
}
