'use client';

import {
  Crown, Diamond, Coins, Ghost, Flame, Skull, 
  ArrowDownRight, ArrowRight, ArrowUpRight, Anchor, Fish, Ship
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { TradeNav } from '@/components/TradeNav';

const generateLineData = (trend: 'up' | 'down' | 'mixed') => {
  let val = 50;
  return Array.from({ length: 30 }).map((_, i) => {
    if (trend === 'up') val += Math.random() * 10 - 2;
    else if (trend === 'down') val -= Math.random() * 10 - 2;
    else val += Math.random() * 20 - 10;
    return { value: val };
  });
};

const mockCohortsPNL = [
  { icon: Crown, title: 'Extremely Profitable', sub: '+$1M+ PNL', badge: 'Bearish', badgeColor: 'text-[#fa6432]', arrow: ArrowDownRight, wallets: '253 Wallets', long: '$661.35M', short: '$1,256.33M', longPct: 34, color: '#fa6432', trend: 'down' },
  { icon: Diamond, title: 'Very Profitable', sub: '+$100K to +$1M PNL', badge: 'Neutral', badgeColor: 'text-gray-400', arrow: ArrowRight, wallets: '1,063 Wallets', long: '$374.92M', short: '$414.44M', longPct: 48, color: '#34d399', trend: 'mixed' },
  { icon: Coins, title: 'Profitable', sub: '$0 to +$100K PNL', badge: 'Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '56,951 Wallets', long: '$332.20M', short: '$269.21M', longPct: 55, color: '#34d399', trend: 'up' },
  { icon: Ghost, title: 'Unprofitable', sub: '$0 to -$100K PNL', badge: 'Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '117,540 Wallets', long: '$395.57M', short: '$264.04M', longPct: 60, color: '#34d399', trend: 'up' },
  { icon: Flame, title: 'Very Unprofitable', sub: '-$100K to -$1M PNL', badge: 'Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '1,835 Wallets', long: '$450.23M', short: '$309.66M', longPct: 59, color: '#34d399', trend: 'mixed' },
  { icon: Skull, title: 'Rekt', sub: '-$1M+ PNL', badge: 'Very Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '278 Wallets', long: '$783.44M', short: '$336.25M', longPct: 70, color: '#fa6432', trend: 'up' },
].map(c => ({ ...c, chartData: generateLineData(c.trend as any) }));

const mockCohortsSize = [
  { icon: Anchor, title: 'Apex', sub: '$5M+ Equity', badge: 'Neutral', badgeColor: 'text-gray-400', arrow: ArrowRight, wallets: '190 Wallets', long: '$1,257.24M', short: '$1,386.59M', longPct: 47, color: '#fa6432', trend: 'mixed' },
  { icon: Ship, title: 'Whale', sub: '$1M - $5M Equity', badge: 'Slightly Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '651 Wallets', long: '$696.52M', short: '$668.10M', longPct: 51, color: '#34d399', trend: 'mixed' },
  { icon: Fish, title: 'Large', sub: '$100K - $1M Equity', badge: 'Slightly Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '4,604 Wallets', long: '$649.88M', short: '$532.43M', longPct: 55, color: '#34d399', trend: 'down' },
  { icon: Fish, title: 'Medium', sub: '$10K - $100K Equity', badge: 'Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '15,391 Wallets', long: '$287.18M', short: '$202.74M', longPct: 58, color: '#34d399', trend: 'up' },
  { icon: Fish, title: 'Small', sub: '$0 - $10K Equity', badge: 'Bullish', badgeColor: 'text-[#34d399]', arrow: ArrowUpRight, wallets: '157,084 Wallets', long: '$112.50M', short: '$65.20M', longPct: 63, color: '#34d399', trend: 'up' },
].map(c => ({ ...c, chartData: generateLineData(c.trend as any) }));

export function Cohorts() {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 font-sans overflow-auto p-6 space-y-8">
      
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-medium mb-4">All-Time PNL</h2>
        <TradeNav />
      </div>
      
      {/* All-Time PNL Section */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockCohortsPNL.map((cohort, idx) => (
            <div key={idx} className="bg-[#111] border border-[#222] rounded-xl flex flex-col p-4 relative overflow-hidden group hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
                    <cohort.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{cohort.title}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{cohort.sub}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6 relative">
                <div className="relative z-10">
                  <div className={cn("flex items-center gap-1 text-[11px] font-bold", cohort.badgeColor)}>
                    {cohort.badge} <cohort.arrow className="w-3 h-3" />
                  </div>
                  <div className="text-gray-500 text-[10px] mt-1">{cohort.wallets}</div>
                </div>
                
                <div className="absolute right-0 bottom-0 top-[-30px] w-2/3 h-[60px] opacity-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cohort.chartData}>
                      <Line type="monotone" dataKey="value" stroke={cohort.color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-auto">
                <div className="w-full h-0.5 flex bg-[#222] mb-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399]" style={{ width: `\${cohort.longPct}%` }} />
                  <div className="h-full bg-[#fa6432]" style={{ width: `\${100 - cohort.longPct}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                  <div className="text-[#34d399]">
                    {cohort.long} <span className="text-gray-500 ml-1">LONG<span className="w-1.5 h-1.5 inline-block bg-[#34d399] ml-0.5" /></span>
                  </div>
                  <div className="text-[#fa6432]">
                    {cohort.short} <span className="text-gray-500 ml-1"><span className="w-1.5 h-1.5 inline-block bg-[#fa6432] mr-0.5" />SHORT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Size Section */}
      <div>
        <h2 className="text-white text-lg font-medium mb-4">Account Size</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockCohortsSize.map((cohort, idx) => (
            <div key={idx} className="bg-[#111] border border-[#222] rounded-xl flex flex-col p-4 relative overflow-hidden group hover:border-[#333] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
                    <cohort.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{cohort.title}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{cohort.sub}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6 relative">
                <div className="relative z-10">
                  <div className={cn("flex items-center gap-1 text-[11px] font-bold", cohort.badgeColor)}>
                    {cohort.badge} <cohort.arrow className="w-3 h-3" />
                  </div>
                  <div className="text-gray-500 text-[10px] mt-1">{cohort.wallets}</div>
                </div>
                
                <div className="absolute right-0 bottom-0 top-[-30px] w-2/3 h-[60px] opacity-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cohort.chartData}>
                      <Line type="monotone" dataKey="value" stroke={cohort.color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-auto">
                <div className="w-full h-0.5 flex bg-[#222] mb-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399]" style={{ width: `\${cohort.longPct}%` }} />
                  <div className="h-full bg-[#fa6432]" style={{ width: `\${100 - cohort.longPct}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                  <div className="text-[#34d399]">
                    {cohort.long} <span className="text-gray-500 ml-1">LONG<span className="w-1.5 h-1.5 inline-block bg-[#34d399] ml-0.5" /></span>
                  </div>
                  <div className="text-[#fa6432]">
                    {cohort.short} <span className="text-gray-500 ml-1"><span className="w-1.5 h-1.5 inline-block bg-[#fa6432] mr-0.5" />SHORT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
