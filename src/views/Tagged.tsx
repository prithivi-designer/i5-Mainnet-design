'use client';

import {
  Tag, ArrowUpDown
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

const mockTaggedTraders = [
  { id: 'VBVIT', icon: 'H', equity: '$38,091,393', pnl: '+$12,717,604.18', assets: ['B', 'E'], score: 0, action: 'Copytrade' },
  { id: 'DV Chain', icon: 'DV', equity: '$0', pnl: '+$12,030,541.09', assets: ['S', 'B'], score: 0, action: 'Copytrade', customIcon: true },
  { id: 'pooltest', icon: 'H', equity: '$34,363,894', pnl: '+$9,596,537.69', assets: ['B', 'E', 'S'], score: 34, action: 'Countertrade' },
  { id: 'Cumberland #1', icon: 'C', equity: '$0', pnl: '+$8,484,453.03', assets: ['B', 'L'], score: 0, action: 'Copytrade', customIcon: true },
  { id: 'Abraxas Capital (Hedged) #1', icon: 'A', equity: '$72,105,820', pnl: '+$4,937,233.23', assets: ['B', 'E'], score: 0, action: 'Countertrade', customIcon: true },
  { id: 'QCP Capital', icon: 'Q', equity: '$0', pnl: '+$4,571,439.16', assets: ['B', 'S'], score: 0, action: 'Countertrade', customIcon: true },
  { id: '0xTiamat', icon: 'H', equity: '$8,835,266', pnl: '+$3,670,698.55', assets: ['B', 'E', 'S'], score: 71, action: 'Copytrade' },
  { id: 'mk4', icon: 'M', equity: '$3,917,536', pnl: '+$2,996,972.34', assets: ['B', 'E', 'L'], score: 44, action: 'Countertrade', customIcon: true },
  { id: 'UnRektCapital', icon: 'H', equity: '$8,288,633', pnl: '+$2,214,065.89', assets: ['B', 'E'], score: 35, action: 'Countertrade' },
  { id: 'yixie10', icon: 'Y', equity: '$5,220,740', pnl: '+$2,156,027.44', assets: ['B', 'S'], score: 35, action: 'Countertrade', customIcon: true },
  { id: 'flo.eth', icon: 'F', equity: '$4,453,155', pnl: '+$1,612,523.42', assets: ['E', 'L'], score: 17, action: 'Countertrade', customIcon: true },
  { id: 'Tummy.hl', icon: 'T', equity: '$8,550,989', pnl: '+$1,565,379.62', assets: ['B', 'E', 'S'], score: 12, action: 'Countertrade', customIcon: true },
  { id: 'bd420', icon: 'H', equity: '$8,081,433', pnl: '+$1,452,326.82', assets: ['B', 'E'], score: 21, action: 'Countertrade' },
  { id: 'gud.hl', icon: 'G', equity: '$0', pnl: '+$1,424,002.02', assets: ['B', 'S', 'L'], score: 0, action: 'Countertrade', customIcon: true },
  { id: '58bro.eth', icon: '5', equity: '$4,671,126', pnl: '+$1,327,977.83', assets: ['B', 'E'], score: 70, action: 'Copytrade', customIcon: true },
  { id: 'Powell #2', icon: 'P', equity: '$3,424,402', pnl: '+$627,733.40', assets: ['B', 'E'], score: 0, action: 'Copytrade', customIcon: true },
  { id: 'Manifold Trading', icon: 'M', equity: '$5,199,943', pnl: '+$617,822.12', assets: ['B', 'S'], score: 24, action: 'Countertrade', customIcon: true },
].map(t => ({ ...t, chartData: generateLineData() }));

export function Tagged() {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#222] shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <h1 className="text-white font-bold text-lg">Tagged</h1>
          </div>
          <TradeNav />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a]">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="sticky top-0 bg-[#0a0a0a] z-10 border-b border-[#222] text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Trader</th>
              <th className="px-6 py-3 font-medium text-right w-[200px]">
                <div className="flex items-center justify-end gap-1">Equity <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-3 font-medium text-right w-[200px]">
                <div className="flex items-center justify-end gap-1">PNL (30D) <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-6 py-3 font-medium text-center w-[120px]">Traded Assets</th>
              <th className="px-6 py-3 font-medium w-[220px]">
                <div className="flex items-center gap-1">Copy Score <ArrowUpDown className="w-3 h-3" /></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {mockTaggedTraders.map((trader, i) => (
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
                  <div className="flex items-center justify-center -space-x-1.5">
                    {trader.assets.map((asset, idx) => (
                      <div key={idx} className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-[#1a1a1a]",
                        asset === 'B' ? "bg-orange-500" :
                        asset === 'E' ? "bg-blue-500" :
                        asset === 'S' ? "bg-purple-500" : "bg-gray-500"
                      )}>
                        {asset}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-mono font-medium text-sm w-6", trader.score > 0 ? (trader.score > 50 ? "text-[#34d399]" : "text-red-400") : "text-gray-600")}>
                        {trader.score}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "w-1 h-3 rounded-sm",
                              idx < (trader.score / 10) 
                                ? (trader.score > 50 ? "bg-[#34d399]" : "bg-red-400") 
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
