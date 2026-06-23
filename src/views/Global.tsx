'use client';

import {
  Calendar, ChevronDown, Filter, Globe, DollarSign, Percent, Copy,
  ArrowUpDown
} from 'lucide-react';
import { TradeNav } from '@/components/TradeNav';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

const generateLineData = () => {
  let val = 50;
  return Array.from({ length: 20 }).map((_, i) => {
    val += Math.random() * 10 - 4;
    return { value: val };
  });
};

const mockGlobalTraders = [
  { id: 'pension-usdt.eth', icon: 'H', equity: '$74,531,088', pnl: '+$20,194,266.29', score: 38, action: 'Countertrade' },
  { id: '0x082e...ca88', icon: 'H', equity: '$47,486,981', pnl: '+$15,882,818.23', score: 0, action: 'Countertrade' },
  { id: 'VBVIT', icon: 'H', equity: '$38,091,393', pnl: '+$12,717,604.18', score: 0, action: 'Copytrade' },
  { id: 'DV Chain', icon: 'DV', equity: '$0', pnl: '+$12,030,541.09', score: 0, action: 'Copytrade', customIcon: true },
  { id: 'Fasanara Capital', icon: 'F', equity: '$29,446,072', pnl: '+$10,467,872.87', score: 0, action: 'Copytrade', customIcon: true },
  { id: 'pooltest', icon: 'H', equity: '$34,363,894', pnl: '+$9,596,537.69', score: 34, action: 'Countertrade' },
  { id: 'Wintermute #1', icon: 'W', equity: '$47,973,656', pnl: '+$9,392,916.58', score: 0, action: 'Copytrade', customIcon: true },
  { id: 'Cumberland #1', icon: 'C', equity: '$0', pnl: '+$8,484,453.03', score: 0, action: 'Copytrade', customIcon: true },
  { id: '0xa9b9...3bbd', icon: 'H', equity: '$11,796,035', pnl: '+$8,233,234.41', score: 11, action: 'Countertrade' },
  { id: '0x577a...5fd2', icon: 'H', equity: '$331', pnl: '+$6,865,662.16', score: 0, action: 'Countertrade' },
  { id: '0xf822...e01a', icon: 'H', equity: '$36,260,382', pnl: '+$6,796,885.70', score: 0, action: 'Copytrade' },
  { id: '0x50b3...9f20', icon: 'H', equity: '$18,547,216', pnl: '+$6,462,495.85', score: 20, action: 'Countertrade' },
  { id: '0x77ee...2902', icon: 'H', equity: '$12,223,996', pnl: '+$5,364,296.87', score: 66, action: 'Copytrade' },
  { id: 'Abraxas Capital (Hedged) #1', icon: 'A', equity: '$72,105,820', pnl: '+$4,937,233.23', score: 0, action: 'Countertrade', customIcon: true },
  { id: '0x9dcf...302d', icon: 'H', equity: '$40,200,728', pnl: '+$4,928,231.24', score: 57, action: 'Copytrade' },
  { id: 'QCP Capital', icon: 'Q', equity: '$0', pnl: '+$4,571,439.16', score: 0, action: 'Countertrade', customIcon: true },
  { id: '0xa2e8...1468', icon: 'H', equity: '$0', pnl: '+$4,273,595.17', score: 0, action: 'Countertrade' },
  { id: 'Cumberland #2', icon: 'C', equity: '$22,000,651', pnl: '+$4,192,747.75', score: 0, action: 'Copytrade', customIcon: true },
  { id: '0xd62d...7d91', icon: 'H', equity: '$8,359,155', pnl: '+$3,815,326.07', score: 0, action: 'Countertrade' },
].map(t => ({ ...t, chartData: generateLineData() }));

export function Global() {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#222] shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <h1 className="text-white font-bold text-lg">Global</h1>
          </div>
          <TradeNav />
        </div>

        {/* Filters Row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0 pb-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#222] bg-[#111] hover:bg-[#1a1a1a] transition-colors text-xs font-medium text-gray-400">
            <Calendar className="w-3 h-3" />
            30d
            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
          </button>
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
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a]">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="sticky top-0 bg-[#0a0a0a] z-10 border-b border-[#222] text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Trader</th>
              <th className="px-6 py-3 font-medium text-right">
                <div className="flex items-center justify-end gap-1">Equity <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-3 font-medium text-right">
                <div className="flex items-center justify-end gap-1">PNL (30D) <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-3 font-medium">
                <div className="flex items-center gap-1">Copy Score <ArrowUpDown className="w-3 h-3" /></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {mockGlobalTraders.map((trader, i) => (
              <tr key={i} className="hover:bg-[#111] transition-colors group">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    {trader.customIcon ? (
                      <div className="w-6 h-6 rounded bg-[#222] border border-[#333] flex items-center justify-center text-[8px] font-bold text-white">
                        {trader.icon}
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-black rounded border border-[#333] flex items-center justify-center font-bold text-white text-[10px] relative">
                        {trader.icon}
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#fa6432] rounded-sm border border-black"></div>
                      </div>
                    )}
                    <span className="text-white font-medium text-sm">{trader.id}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-white font-mono text-sm">{trader.equity}</span>
                    <div className="w-16 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trader.chartData}>
                          <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-right">
                  <span className="text-[#34d399] font-mono font-medium text-sm">{trader.pnl}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-mono font-medium text-sm w-6", trader.score > 0 ? (trader.score > 50 ? "text-yellow-400" : "text-red-400") : "text-gray-600")}>
                        {trader.score}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "w-1 h-3 rounded-sm",
                              idx < (trader.score / 10) 
                                ? (trader.score > 50 ? "bg-yellow-400" : "bg-red-400") 
                                : "bg-[#222]"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <button 
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors w-28",
                        trader.action === 'Copytrade' 
                          ? "bg-[#022c22] text-[#34d399] border-[#065f46] hover:bg-[#34d399] hover:text-black hover:border-transparent" 
                          : "bg-[#451a1a] text-[#fa6432] border-[#7f1d1d] hover:bg-[#fa6432] hover:text-white hover:border-transparent"
                      )}
                    >
                      {trader.action}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
