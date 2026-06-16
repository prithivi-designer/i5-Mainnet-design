'use client';

import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Search, ArrowUpDown, Medal, Filter } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

const MOCK_LEADERBOARD = Array.from({ length: 50 }).map((_, i) => ({
  id: `trader-${i + 1}`,
  rank: i + 1,
  name: i === 0 ? "CryptoWhale_99" : i === 1 ? "AlphaSeeker" : i === 2 ? "DeFi_Degen" : `Trader_${Math.floor(Math.random() * 10000)}`,
  pnl: (Math.random() * 100000) * (Math.random() > 0.2 ? 1 : -1) * (50 - i) / 10,
  winRate: 40 + Math.random() * 50,
  volume: 10000 + Math.random() * 5000000 * (50 - i) / 50,
  trades: Math.floor(Math.random() * 500) + 10,
  avatar: `https://i.pravatar.cc/150?u=${i}`
})).sort((a, b) => b.pnl - a.pnl).map((user, index) => ({ ...user, rank: index + 1 }));

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly' | 'All Time'>('Weekly');
  const [metric, setMetric] = useState<'PNL' | 'Volume'>('PNL');
  
  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="h-full overflow-y-auto bg-[#050505] text-[#f5f5f5] p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-[#facc15]" />
              <h1 className="text-3xl font-bold tracking-tight text-white">Leaderboard</h1>
            </div>
            <p className="text-gray-400 text-sm">Top performing traders on the platform by PNL and Volume.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#111] p-1.5 rounded-lg border border-[#222]">
            <div className="flex space-x-1">
              {(['Daily', 'Weekly', 'Monthly', 'All Time'] as const).map(tf => (
                 <button
                   key={tf}
                   onClick={() => setTimeframe(tf)}
                   className={cn(
                     "px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200",
                     timeframe === tf 
                       ? "bg-[#222] text-white shadow-sm border border-[#333]" 
                       : "text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]"
                   )}
                 >
                   {tf}
                 </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-4">
           {/* 2nd Place */}
           <div className="order-2 md:order-1 flex flex-col items-center justify-end mt-8 relative">
              <div className="absolute -top-12 bg-[#cbd5e1] text-[#0f172a] text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#050505] shadow-lg z-10">2</div>
              <div className="bg-[#111] border border-[#222] rounded-t-2xl w-full p-6 text-center shadow-lg relative overflow-hidden group hover:border-[#cbd5e1]/50 transition-colors">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-[#cbd5e1] overflow-hidden">
                  <img src={top3[1]?.avatar} alt={top3[1]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-white mb-1 truncate">{top3[1]?.name}</div>
                <div className="text-[#34d399] font-mono font-bold text-lg">${formatNumber(top3[1]?.pnl || 0)}</div>
                <div className="text-gray-500 text-xs mt-2 uppercase tracking-wider">{top3[1]?.trades} Trades</div>
              </div>
           </div>

           {/* 1st Place */}
           <div className="order-1 md:order-2 flex flex-col items-center justify-end relative z-10">
              <div className="absolute -top-12 bg-[#facc15] text-[#0f172a] text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#050505] shadow-xl z-20">
                <Medal className="w-5 h-5" />
              </div>
              <div className="bg-gradient-to-b from-[#222] to-[#111] border border-[#facc15]/30 rounded-t-2xl w-full p-8 text-center shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#facc15] to-transparent opacity-50"></div>
                <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#facc15] overflow-hidden ring-4 ring-[#facc15]/10">
                  <img src={top3[0]?.avatar} alt={top3[0]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-xl text-white mb-1 truncate">{top3[0]?.name}</div>
                <div className="text-[#34d399] font-mono font-bold text-2xl">${formatNumber(top3[0]?.pnl || 0)}</div>
                <div className="text-gray-400 text-xs mt-3 uppercase tracking-wider bg-[#0a0a0a] inline-block px-3 py-1 rounded-full border border-[#333]">{top3[0]?.trades} Trades • {top3[0]?.winRate.toFixed(1)}% WR</div>
              </div>
           </div>

           {/* 3rd Place */}
           <div className="order-3 flex flex-col items-center justify-end mt-12 relative">
              <div className="absolute -top-12 bg-[#b45309] text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#050505] shadow-lg z-10">3</div>
              <div className="bg-[#111] border border-[#222] rounded-t-2xl w-full p-5 text-center shadow-lg relative overflow-hidden group hover:border-[#b45309]/50 transition-colors">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 border-2 border-[#b45309] overflow-hidden">
                  <img src={top3[2]?.avatar} alt={top3[2]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-white mb-1 truncate">{top3[2]?.name}</div>
                <div className="text-[#34d399] font-mono font-bold text-base">${formatNumber(top3[2]?.pnl || 0)}</div>
                <div className="text-gray-500 text-[10px] mt-2 uppercase tracking-wider">{top3[2]?.trades} Trades</div>
              </div>
           </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0d0d0d] p-4 rounded-xl border border-[#222]">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search trader..." 
              className="w-full bg-[#111] border border-[#333] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
             <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Rank By:</span>
             <div className="flex bg-[#111] border border-[#333] rounded-lg p-1">
                <button
                  onClick={() => setMetric('PNL')}
                  className={cn("px-3 py-1.5 text-xs font-semibold rounded uppercase tracking-wider", metric === 'PNL' ? "bg-[#222] text-white" : "text-gray-500")}
                >
                  PNL
                </button>
                <button
                  onClick={() => setMetric('Volume')}
                  className={cn("px-3 py-1.5 text-xs font-semibold rounded uppercase tracking-wider", metric === 'Volume' ? "bg-[#222] text-white" : "text-gray-500")}
                >
                  Volume
                </button>
             </div>
             <button className="bg-[#111] border border-[#333] hover:bg-[#1a1a1a] p-2 rounded-lg transition-colors">
               <Filter className="w-4 h-4 text-gray-400" />
             </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111] border-b border-[#222] text-xs uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-6 font-medium">Rank</th>
                  <th className="py-4 px-6 font-medium">Trader</th>
                  <th className="py-4 px-6 font-medium text-right cursor-pointer hover:text-white transition-colors group">
                    <div className="flex items-center justify-end gap-1">
                      PNL <ArrowUpDown className="w-3 h-3 group-hover:text-primary" />
                    </div>
                  </th>
                  <th className="py-4 px-6 font-medium text-right">Win Rate</th>
                  <th className="py-4 px-6 font-medium text-right cursor-pointer hover:text-white transition-colors group">
                    <div className="flex items-center justify-end gap-1">
                      Volume <ArrowUpDown className="w-3 h-3 group-hover:text-primary" />
                    </div>
                  </th>
                  <th className="py-4 px-6 font-medium text-right">Trades (30D)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {rest.map((trader) => (
                  <tr key={trader.id} className="hover:bg-[#111] transition-colors group">
                    <td className="py-4 px-6 text-sm text-gray-400 font-mono">
                      #{trader.rank}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={trader.avatar} alt={trader.name} className="w-8 h-8 rounded-full border border-[#333]" />
                        <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{trader.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={cn(
                        "font-mono font-bold flex items-center justify-end gap-1",
                        trader.pnl >= 0 ? "text-[#34d399]" : "text-[#ef4444]"
                      )}>
                        {trader.pnl >= 0 ? '+' : '-'}${formatNumber(Math.abs(trader.pnl))}
                        {trader.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-block px-2 py-1 rounded bg-[#1a1a1a] text-xs font-mono text-gray-300 border border-[#222]">
                        {trader.winRate.toFixed(1)}%
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-300 font-mono">
                      ${formatNumber(trader.volume)}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-500 font-mono">
                      {trader.trades}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-[#222] bg-[#0d0d0d] flex items-center justify-center">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Load More Traders
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
