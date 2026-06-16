'use client';

import { useState } from 'react';
import { ChevronDown, Code, PlayCircle, HelpCircle } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const generateData = () => {
  const data = [];
  const startTimestamp = new Date().getTime() - 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < 150; i++) {
    const time = startTimestamp + (i * 10 * 60 * 1000);
    if (Math.random() > 0.3) data.push({ time, price: 88200 + Math.random() * 200, type: 'sell', size: Math.random() * 50 });
    if (Math.random() > 0.4) data.push({ time, price: 87800 + Math.random() * 200, type: 'sell', size: Math.random() * 80 });
    if (Math.random() > 0.6) data.push({ time, price: 85500 + Math.random() * 300, type: 'sell', size: Math.random() * 40 });
    if (Math.random() > 0.3) data.push({ time, price: 78300 + Math.random() * 200, type: 'buy', size: Math.random() * 50 });
    if (Math.random() > 0.4) data.push({ time, price: 77900 + Math.random() * 200, type: 'buy', size: Math.random() * 30 });
    if (Math.random() > 0.5) data.push({ time, price: 75900 + Math.random() * 200, type: 'buy', size: Math.random() * 60 });
    data.push({ time, price: 79500 + Math.sin(i / 10) * 1500, type: 'current', size: 10 });
  }
  return data;
};

const mockChartData = generateData();

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.type === 'current') return null;
    return (
      <div className="bg-[#1a1a1a] border border-[#333] p-2 rounded text-[11px] font-mono shadow-xl z-50">
        <div className="text-gray-500 mb-1">{new Date(data.time).toLocaleTimeString()}</div>
        <div className={data.type === 'sell' ? 'text-[#34d399] font-bold' : 'text-[#fa6432] font-bold'}>
          Price: ${data.price.toFixed(2)}
        </div>
        <div className="text-gray-200 mt-0.5">Vol: {data.size.toFixed(2)} BTC</div>
      </div>
    );
  }
  return null;
};

export function MarketRadar() {
  const [activeTab, setActiveTab] = useState('Liquidation');

  const tabs = ['Liquidation', 'Stop Loss', 'Take Profit', 'Limit Order'];
  
  const greenLevels = [
    { vol: '$34.3M', size: 34.3, price: '~88,203', max: 60 },
    { vol: '$59.2M', size: 59.2, price: '~87,895', max: 60 },
    { vol: '', size: 30, price: '', max: 60, hiddenText: true },
    { vol: '', size: 25, price: '', max: 60, hiddenText: true },
    { vol: '', size: 40, price: '', max: 60, hiddenText: true },
    { vol: '', size: 35, price: '', max: 60, hiddenText: true },
    { vol: '$45.5M', size: 45.5, price: '~82,297', max: 60 },
  ];

  const redLevels = [
    { vol: '', size: 20, price: '', max: 60, hiddenText: true },
    { vol: '$43.8M', size: 43.8, price: '~78,326', max: 60 },
    { vol: '$32.2M', size: 32.2, price: '~77,962', max: 60 },
    { vol: '', size: 20, price: '', max: 60, hiddenText: true },
    { vol: '', size: 35, price: '', max: 60, hiddenText: true },
    { vol: '$58.4M', size: 58.4, price: '~75,992', max: 60 },
    { vol: '', size: 15, price: '', max: 60, hiddenText: true },
    { vol: '', size: 25, price: '', max: 60, hiddenText: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300 overflow-hidden relative">
      {/* Grid background effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start px-4 py-3 z-10 shrink-0 border-b border-[#222]">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-wider font-sans text-white">Market Radar</h1>
          <div className="flex items-center gap-4 text-xs font-mono">
            <button className="flex items-center gap-1.5 text-[#fa6432] hover:text-[#ff7f50] transition-colors">
              <Code className="w-3.5 h-3.5" /> Get API Access
            </button>
            <button className="flex items-center gap-1.5 text-brand-cyan hover:text-brand-cyan/80 transition-colors">
              <PlayCircle className="w-3.5 h-3.5" /> Watch Guide
            </button>
          </div>
        </div>
        <div className="flex gap-8 text-right font-mono text-[11px]">
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 uppercase tracking-widest">Positions:</span>
            <span className="font-bold text-white text-xs">275,778</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 uppercase tracking-widest">Open Orders:</span>
            <span className="font-bold text-white text-xs">412,879</span>
          </div>
        </div>
      </div>
      
      {/* Intro text */}
      <div className="px-4 py-2 z-10 text-[11px] text-gray-500 font-mono tracking-wide border-b border-[#222]">
          Surfaces the top three liquidity zones above and below price, within a ±12.5% range. <br/>
          Hover to inspect every zone, or use the table below to compare full cohort breakdowns.
      </div>

      {/* Sub Header / Tabs */}
      <div className="px-4 py-3 z-10 shrink-0 border-b border-[#222] bg-[#0d0d0d] flex items-center justify-between">
        <button className="bg-[#1a1a1a] hover:bg-[#222] text-white px-3 py-1.5 rounded flex items-center justify-between w-24 border border-[#333] transition-colors font-sans font-bold text-xs">
          BTC <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-gray-600 mr-2 uppercase tracking-wide text-[10px]">Levels:</span>
          <div className="flex bg-[#111] border border-[#222] rounded p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded transition-all tracking-wide text-[11px]",
                  activeTab === tab 
                    ? "bg-[#222] text-white border border-[#444]" 
                    : "text-gray-500 hover:text-white hover:bg-[#1a1a1a] border border-transparent"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 z-10">
        
        {/* Left Chart Area */}
        <div className="flex-1 border-r border-[#222] bg-[#0a0a0a] flex flex-col overflow-hidden">
          
          {/* Chart Header Controls */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-[#222] shrink-0 font-mono text-[10px] uppercase tracking-widest text-gray-500">
             <div className="flex items-center gap-3">
                <span>Historical Liquidity:</span>
                <button className="bg-[#111] text-gray-300 border border-[#333] px-2 py-1 rounded flex items-center gap-1.5 hover:bg-[#1a1a1a] transition-colors">
                  5m Candles <ChevronDown className="w-3 h-3" />
                </button>
             </div>
             <button className="bg-[#111] text-gray-300 border border-[#333] px-2 py-1 rounded flex items-center gap-1.5 hover:bg-[#1a1a1a] transition-colors">
                Coloured <ChevronDown className="w-3 h-3" />
             </button>
          </div>

          <div className="flex-1 w-full p-2 relative min-h-0 bg-[#080808]">
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                   <XAxis 
                     type="number" 
                     dataKey="time" 
                     domain={['dataMin', 'dataMax']} 
                     axisLine={false} 
                     tickLine={false} 
                     tickFormatter={(t) => {
                       const d = new Date(t);
                       return `${d.getDate()}/May`;
                     }}
                     stroke="#666"
                     tick={{ fontSize: 11, fill: '#666', fontFamily: 'monospace' }}
                     dy={10}
                   />
                   <YAxis 
                     type="number" 
                     dataKey="price" 
                     domain={[68561, 91550]} 
                     orientation="right"
                     axisLine={false} 
                     tickLine={false}
                     tickFormatter={(val) => '$' + val.toLocaleString()}
                     stroke="#666"
                     tick={{ fontSize: 11, fill: '#666', fontFamily: 'monospace' }}
                     dx={10}
                   />
                   <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#333' }} />
                   
                   <Scatter data={mockChartData.filter(d => d.type === 'sell')} shape="square" fill="#34d399">
                      {mockChartData.filter(d => d.type === 'sell').map((entry, index) => (
                         <Cell key={`cell-sell-${index}`} fill="#34d399" opacity={0.3 + (entry.size / 100)} />
                      ))}
                   </Scatter>
                   
                   <Scatter data={mockChartData.filter(d => d.type === 'buy')} shape="square" fill="#fa6432">
                      {mockChartData.filter(d => d.type === 'buy').map((entry, index) => (
                         <Cell key={`cell-buy-${index}`} fill="#fa6432" opacity={0.3 + (entry.size / 100)} />
                      ))}
                   </Scatter>

                   <Scatter data={mockChartData.filter(d => d.type === 'current')} shape="square" fill="#fff" opacity={0.8} />

                </ScatterChart>
             </ResponsiveContainer>
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid grid-cols-4 divide-x divide-[#222] border-t border-[#222] shrink-0 bg-[#0d0d0d]">
             <div className="px-4 py-3 flex flex-col justify-center items-center">
               <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">Positions</div>
               <div className="font-bold text-sm text-white font-mono">29,332</div>
             </div>
             <div className="px-4 py-3 flex flex-col justify-center items-center">
               <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">Open Interest</div>
               <div className="font-bold text-sm text-white font-mono">$2.254B</div>
             </div>
             <div className="px-4 py-3 flex flex-col justify-center items-center">
               <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">Avg Position Age</div>
               <div className="font-bold text-sm text-white font-mono">1M 20d 5h</div>
             </div>
             <div className="px-4 py-3 flex flex-col justify-center items-center">
               <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-1">Underwater</div>
               <div className="text-[#fa6432] font-bold text-sm font-mono">50.8%</div>
             </div>
          </div>
        </div>

        {/* Right Sidebar - Live Liquidity */}
        <div className="w-[320px] bg-[#0a0a0a] flex flex-col overflow-hidden shrink-0">
           <div className="px-4 py-2 border-b border-[#222] flex justify-between items-center shrink-0 bg-[#0d0d0d] font-mono text-[10px] uppercase tracking-widest text-gray-400">
             <span>Live Liquidity <span className="text-gray-600 font-normal ml-1">(14m ago)</span></span>
           </div>
           
           <div className="flex justify-between items-center px-4 py-2 text-[10px] text-gray-500 border-b border-[#222] shrink-0 uppercase tracking-widest font-mono">
             <span>Size</span>
             <span>+10%</span>
             <span>Price</span>
           </div>

           <div className="flex-1 overflow-y-auto w-full flex flex-col justify-center px-2 py-2">
              {/* Green (Upper) Levels */}
              <div className="w-full flex-1 flex flex-col justify-end space-y-1 pb-2">
                 {greenLevels.map((lvl, idx) => (
                   <div key={`g-${idx}`} className="h-6 relative flex items-center group cursor-pointer text-xs rounded shadow-sm overflow-hidden bg-[#111]">
                      <div 
                         className="absolute right-0 top-0 bottom-0 bg-[#34d399]/20 group-hover:bg-[#34d399]/30 transition-colors border-r-2 border-[#34d399]"
                         style={{ width: `${(lvl.size / lvl.max) * 100}%` }}
                      ></div>
                      {!lvl.hiddenText && (
                        <div className="relative z-10 w-full flex justify-between px-3 items-center font-mono">
                           <span className="text-[#34d399] tracking-tight">{lvl.vol}</span>
                           <span className="text-gray-200 tracking-tight">{lvl.price}</span>
                        </div>
                      )}
                   </div>
                 ))}
              </div>

              {/* Current Price Center element */}
              <div className="relative py-3 shrink-0 flex items-center justify-center">
                 <div className="absolute left-4 right-4 border-t border-dashed border-gray-700 top-1/2"></div>
                 <div className="bg-[#1a1a1a] border border-[#333] px-5 py-2 rounded shadow-md z-10 text-lg font-mono font-bold tracking-tight relative text-white">
                   <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-gray-500"></div>
                   <div className="absolute top-1 right-1 w-1 h-1 border-t border-r border-gray-500"></div>
                   <div className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-gray-500"></div>
                   <div className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-gray-500"></div>
                   $79,578
                 </div>
              </div>

              {/* Red (Lower) Levels */}
              <div className="w-full flex-1 flex flex-col justify-start space-y-1 pt-2">
                 {redLevels.map((lvl, idx) => (
                   <div key={`r-${idx}`} className="h-6 relative flex items-center group cursor-pointer text-xs rounded shadow-sm overflow-hidden bg-[#111]">
                      <div 
                         className="absolute right-0 top-0 bottom-0 bg-[#fa6432]/20 group-hover:bg-[#fa6432]/30 transition-colors border-r-2 border-[#fa6432]"
                         style={{ width: `${(lvl.size / lvl.max) * 100}%` }}
                      ></div>
                      {!lvl.hiddenText && (
                        <div className="relative z-10 w-full flex justify-between px-3 items-center font-mono">
                           <span className="text-[#fa6432] tracking-tight">{lvl.vol}</span>
                           <span className="text-gray-200 tracking-tight">{lvl.price}</span>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="px-4 py-3 border-t border-[#222] flex justify-end shrink-0 bg-[#0d0d0d]">
             <button className="flex items-center gap-1.5 text-gray-300 font-mono text-[10px] uppercase tracking-widest bg-[#1a1a1a] hover:bg-[#222] px-3 py-1.5 rounded border border-[#333] transition-all">
               <HelpCircle className="w-3.5 h-3.5 text-gray-500" /> Help & Info
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
