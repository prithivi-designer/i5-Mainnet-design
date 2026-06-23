'use client';

import { useState } from 'react';
import {
  BookOpen, ChevronDown, Filter, LayoutGrid, LayoutList, Clock, 
  ArrowUpDown, DollarSign, Percent, Copy
} from 'lucide-react';
import { TradeNav } from '@/components/TradeNav';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data generator for sparklines
const generateSparkline = (trend: 'up' | 'down' | 'mixed') => {
  let val = 100;
  return Array.from({ length: 40 }).map((_, i) => {
    if (trend === 'up') val += Math.random() * 10 - 2;
    else if (trend === 'down') val -= Math.random() * 10 - 2;
    else val += Math.random() * 20 - 10;
    return { value: val };
  });
};

const mockTraders = [
  { id: '0x1f7a...dbd4', time: '17H AGO', roi: '+$26,124', equity: '$141,616', score: 87, trend: 'up', color: '#34d399' },
  { id: '0xcb02...1f8b', time: '1D AGO', roi: '+$93,653', equity: '$1,007,345', score: 86, trend: 'up', color: '#34d399' },
  { id: '0xd2b2...11ed', time: '2D AGO', roi: '+$6,583', equity: '$219,673', score: 86, trend: 'up', color: '#34d399' },
  { id: '0x02fb...cda9', time: '2D AGO', roi: '+$9,709', equity: '$585,853', score: 86, trend: 'up', color: '#34d399' },
  { id: '0xe2f8...275a', time: '1MO AGO', roi: '+$269,738', equity: '$5,514,859', score: 86, trend: 'mixed', color: '#34d399' },
  { id: '0xac26...a9c7', time: '7D AGO', roi: '+$368,727', equity: '$2,588,993', score: 85, trend: 'mixed', color: '#34d399' },
  { id: '0x6417...082f', time: '6D AGO', roi: '+$3,772', equity: '$1,479,050', score: 85, trend: 'mixed', color: '#34d399' },
  { id: '0x5661...cbf5', time: '1MO AGO', roi: '+$115,099', equity: '$671,667', score: 84, trend: 'up', color: '#34d399' },
  { id: '0x2823...1f43', time: '3D AGO', roi: '+$39,594', equity: '$1,487,664', score: 83, trend: 'mixed', color: '#34d399' },
  { id: '0x6d6d...5089', time: '15H AGO', roi: '+$92,666', equity: '$430,236', score: 83, trend: 'up', color: '#34d399' },
  { id: 'Cerbero', time: '3D AGO', roi: '+$18,764', equity: '$277,449', score: 83, trend: 'mixed', color: '#34d399' },
  { id: '0x7d5c...5d48', time: '2D AGO', roi: '+$71,605', equity: '$165,502', score: 83, trend: 'up', color: '#34d399' },
].map(t => ({ ...t, data: generateSparkline(t.trend as any) }));

export function Copytrading() {
  const [activeTab, setActiveTab] = useState('Top 100');

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#222] shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <h1 className="text-white font-bold text-lg">Copytrading</h1>
          </div>
          <TradeNav />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm font-semibold">
            {['Top 100', 'Equities Focused', 'Top BTC Traders', 'Top HYPE Traders', 'Top CL Traders'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-2 transition-colors", 
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222] text-xs font-semibold hover:bg-[#111] transition-colors">
              Highest copy score <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
            <div className="flex items-center bg-[#111] border border-[#222] rounded-lg p-0.5">
              <button className="p-1 px-2.5 rounded bg-[#222] text-white shadow"><DollarSign className="w-3.5 h-3.5" /></button>
              <button className="p-1 px-2.5 rounded text-gray-500 hover:text-gray-300"><Percent className="w-3.5 h-3.5" /></button>
            </div>
            <button className="p-1.5 rounded-lg border border-[#222] hover:bg-[#111] transition-colors text-gray-400">
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex items-center bg-[#111] border border-[#222] rounded-lg p-0.5">
              <button className="p-1.5 rounded bg-[#222] text-white shadow"><LayoutGrid className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded text-gray-500 hover:text-gray-300"><LayoutList className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="px-6 py-3 border-b border-[#222] flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        {['Account Value', 'PNL', 'All styles', 'Copy Score'].map((filter, i) => (
          <button key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors text-xs font-medium text-gray-400">
            {i === 0 && <DollarSign className="w-3 h-3" />}
            {i === 1 && <Percent className="w-3 h-3" />}
            {i === 2 && <Filter className="w-3 h-3" />}
            {i === 3 && <Copy className="w-3 h-3" />}
            {filter}
            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockTraders.map((trader, idx) => (
            <div key={idx} className="bg-[#111] border border-[#222] rounded-xl p-4 flex flex-col hover:border-[#333] transition-colors relative overflow-hidden group">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-lg border border-[#333] flex items-center justify-center font-bold text-white relative">
                    H
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#fa6432] rounded-sm border border-black"></div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm tracking-wide">{trader.id}</div>
                    <div className="flex items-center gap-0.5 mt-1 opacity-70">
                      <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[6px] text-white">B</div>
                      <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-[6px] text-white">E</div>
                      <div className="w-3 h-3 rounded-full bg-orange-500 flex items-center justify-center text-[6px] text-white">B</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-mono tracking-widest font-semibold uppercase">
                  {trader.time}
                  <Clock className="w-3 h-3" />
                </div>
              </div>

              {/* Stats & Chart Container */}
              <div className="flex justify-between items-end mb-4 relative h-20">
                <div className="flex flex-col gap-3 relative z-10">
                  <div>
                    <div className="text-[#34d399] font-mono font-bold text-sm">{trader.roi}</div>
                    <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">ROI 30D</div>
                  </div>
                  <div>
                    <div className="text-white font-mono font-bold text-sm">{trader.equity}</div>
                    <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">Equity</div>
                  </div>
                </div>
                
                {/* Background Chart */}
                <div className="absolute right-0 bottom-0 top-0 left-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trader.data}>
                      <defs>
                        <linearGradient id={`color-\${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={trader.color} stopOpacity={0.2}/>
                          <stop offset="95%" stopColor={trader.color} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={trader.color} 
                        fillOpacity={1} 
                        fill={`url(#color-\${idx})`} 
                        strokeWidth={2}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#222]">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold font-mono text-sm">{trader.score}</span>
                  <span className="text-gray-500 font-mono text-xs">/100</span>
                  <div className="flex gap-0.5 ml-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-1 h-3 rounded-sm",
                          i < (trader.score / 10) ? "bg-[#34d399]" : "bg-[#222]"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-[#022c22] text-[#34d399] rounded-lg text-xs font-semibold hover:bg-[#34d399] hover:text-black transition-colors border border-[#065f46] hover:border-transparent">
                  Copytrade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
