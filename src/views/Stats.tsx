'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowDownUp } from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

const days = Array.from({ length: 30 }).map((_, i) => `Apr ${i + 1}`);

const volumeData = days.map((day) => ({
  name: day,
  USOIL: Math.random() * 20 + 5,
  US500: Math.random() * 30 + 10,
  SILVER: Math.random() * 10 + 2,
  USTECH: Math.random() * 15 + 5,
}));

const cumVolumeData = volumeData.reduce((acc, curr) => {
  const prev = acc.length > 0 ? acc[acc.length - 1] : { USOIL: 0, US500: 0, SILVER: 0, USTECH: 0 };
  acc.push({
    name: curr.name,
    USOIL: prev.USOIL + curr.USOIL,
    US500: prev.US500 + curr.US500,
    SILVER: prev.SILVER + curr.SILVER,
    USTECH: prev.USTECH + curr.USTECH,
  });
  return acc;
}, [] as any[]);

const marketDynamicsData = days.map(day => ({
  name: day,
  oi: Math.random() * 15 + 10,
  fund1: (Math.random() - 0.5) * 500,
  fund2: (Math.random() - 0.5) * 300,
  fund3: (Math.random() - 0.5) * 200,
}));

const slippageData = days.map(day => ({
  name: day,
  spread1: Math.random() * 50,
  spread2: Math.random() * 100,
  spread3: Math.random() * 20,
}));

const tradesData = days.map(day => ({
  name: day,
  trades: Math.floor(Math.random() * 60000 + 40000),
  unique: Math.floor(Math.random() * 800 + 400),
}));

const pieData = [
  { name: 'USOIL', value: 22.7, color: '#c2410c' },
  { name: 'SILVER', value: 16.4, color: '#94a3b8' },
  { name: 'US500', value: 16.6, color: '#2563eb' },
  { name: 'USTECH', value: 5.8, color: '#0ea5e9' },
  { name: 'SMALL2000', value: 6.7, color: '#8b5cf6' },
  { name: 'USBOND', value: 5.0, color: '#10b981' },
];

const liquidityData = [
  { asset: 'US500', icon: 'US', sub: '500', type: 'pill', vol: 12.35, oi: 2.97, s: 0.09, s1: 0.17, s10: 0.57, s30: 0.95, s100: 1.74, s1m: 5.61 },
  { asset: 'USBOND', icon: 'US', sub: 'BOND', type: 'pill', vol: 0.536, oi: 0.922, s: 0.20, s1: 0.30, s10: 1.17, s30: 1.52, s100: 3.63, s1m: 31.56 },
  { asset: 'USTECH', icon: 'US', sub: 'TECH', type: 'pill', vol: 4.10, oi: 1.10, s: 0.32, s1: 0.71, s10: 1.42, s30: 1.85, s100: 2.90, s1m: 5.20 },
  { asset: 'GOLD', icon: 'GOLD', sub: '', type: 'gold', vol: 0.243, oi: 0.286, s: 0.96, s1: 1.04, s10: 1.18, s30: 1.85, s100: 3.22, s1m: 8.07 },
  { asset: 'EUR', icon: 'EUR', sub: '', type: 'blue', vol: 2.85, oi: 0.355, s: 0.87, s1: 1.01, s10: 1.87, s30: 2.37, s100: 7.35, s1m: 43.92 },
  { asset: 'SMALL2000', icon: 'SMALL', sub: '2000', type: 'pill_purple', vol: 0.613, oi: 1.24, s: 1.65, s1: 1.83, s10: 2.28, s30: 2.63, s100: 4.12, s1m: 11.47 },
  { asset: 'SILVER', icon: 'SILVER', sub: '', type: 'silver', vol: 5.51, oi: 2.96, s: 1.45, s1: 1.95, s10: 2.38, s30: 3.26, s100: 6.42, s1m: 56.42 },
];

const AssetIcon = ({ asset }: { asset: any }) => {
  if (asset.type === 'pill') return <div className="text-[8px] bg-red-900/40 border border-red-500/50 text-red-200 w-6 h-6 rounded-full flex flex-col items-center justify-center font-bold font-mono leading-none tracking-tighter"><div className="scale-75">{asset.icon}</div><div className="scale-75 -mt-1">{asset.sub}</div></div>;
  if (asset.type === 'pill_purple') return <div className="text-[8px] bg-purple-900/40 border border-purple-500/50 text-purple-200 w-6 h-6 rounded-full flex flex-col items-center justify-center font-bold font-mono leading-none tracking-tighter"><div className="scale-75">{asset.icon}</div><div className="scale-75 -mt-1">{asset.sub}</div></div>;
  if (asset.type === 'gold') return <div className="text-xs bg-yellow-600 border border-yellow-400 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono leading-none tracking-tighter origin-center"><div className="scale-50">{asset.icon}</div></div>;
  if (asset.type === 'silver') return <div className="text-xs bg-slate-400 border border-slate-300 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono leading-none tracking-tighter origin-center"><div className="scale-50">{asset.icon}</div></div>;
  if (asset.type === 'blue') return <div className="text-xs bg-blue-600 border border-blue-400 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono leading-none tracking-tighter origin-center"><div className="scale-50">★</div></div>;
  return <div className="text-[8px] bg-sky-900/40 border border-sky-500/50 text-sky-200 w-6 h-6 rounded-full flex flex-col items-center justify-center font-bold font-mono leading-none tracking-tighter"><div className="scale-75">{asset.icon}</div></div>;
}

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-[#0e181c] border border-[#1b2a30] rounded-xl overflow-hidden", className)}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-medium text-white text-center my-10">{children}</h2>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0e181c] border border-[#1b2a30] p-3 rounded-lg shadow-xl !font-mono text-xs">
        <p className="text-gray-400 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="text-white font-medium">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Stats() {
  return (
    <div className="h-full overflow-y-auto bg-[#070f12] text-[#f5f5f5] font-sans pb-24">
      <div className="max-w-[1400px] mx-auto p-6 lg:p-10 space-y-8">
        
        <h1 className="text-4xl lg:text-[44px] font-medium tracking-tight text-white text-center mt-6 mb-12">Stats</h1>

        {/* TOP SUMMARY BAR */}
        <Card className="px-8 py-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Users</span>
              <span className="text-[28px] font-medium text-white tracking-tight">8,232</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Volume</span>
              <span className="text-[28px] font-medium text-white tracking-tight">$3.39B</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Trades</span>
              <span className="text-[28px] font-medium text-white tracking-tight">6,511,252</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Liquidated</span>
              <span className="text-[28px] font-medium text-white tracking-tight">$24.5M</span>
            </div>
            <div className="flex items-center ml-auto">
              <button className="bg-[#121f24] hover:bg-[#1a2b30] border border-[#23353c] text-sm text-gray-300 px-4 py-2 rounded flex items-center gap-2 transition-colors">
                All time <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </Card>

        {/* VOLUME & TRADING */}
        <SectionTitle>Volume & trading</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[26px] font-medium tracking-tight text-white">Daily volume</h3>
              <div className="flex items-center gap-3">
                <button className="bg-[#121f24] hover:bg-[#1a2b30] border border-[#23353c] text-xs text-gray-300 px-3 py-1.5 rounded flex items-center gap-2 transition-colors">
                  <div className="flex -space-x-1"><div className="w-4 h-4 rounded-full bg-red-900 border border-red-500"/><div className="w-4 h-4 rounded-full bg-blue-900 border border-blue-500"/></div>
                  23/23 $3.39B <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
                <button className="bg-[#121f24] hover:bg-[#1a2b30] border border-[#23353c] text-xs text-gray-300 px-3 py-1.5 rounded flex items-center gap-2 transition-colors">
                  Last 12 months <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                  <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff10'}} />
                  <Bar dataKey="USOIL" stackId="a" fill="#c2410c" />
                  <Bar dataKey="US500" stackId="a" fill="#2563eb" />
                  <Bar dataKey="SILVER" stackId="a" fill="#94a3b8" />
                  <Bar dataKey="USTECH" stackId="a" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[26px] font-medium tracking-tight text-white">Cumulative volume</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumVolumeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                  <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="USOIL" stackId="1" stroke="#c2410c" fill="#c2410c" />
                  <Area type="monotone" dataKey="US500" stackId="1" stroke="#2563eb" fill="#2563eb" />
                  <Area type="monotone" dataKey="SILVER" stackId="1" stroke="#94a3b8" fill="#94a3b8" />
                  <Area type="monotone" dataKey="USTECH" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* TRADES AND TRADERS */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[26px] font-medium tracking-tight text-white">Trades and traders</h3>
            <button className="bg-[#121f24] hover:bg-[#1a2b30] border border-[#23353c] text-xs text-gray-300 px-3 py-1.5 rounded flex items-center gap-2 transition-colors">
              Last 12 months <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
          </div>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tradesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis yAxisId="left" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}K`} />
                <YAxis yAxisId="right" orientation="right" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val/1000).toFixed(1)}K`} />
                <Tooltip content={<CustomTooltip />} contentStyle={{ backgroundColor: '#0e181c', border: '1px solid #1b2a30' }} />
                <Line yAxisId="right" type="monotone" dataKey="unique" stroke="#6366f1" strokeWidth={2} dot={false} name="Unique traders" />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 pointer-events-none opacity-80 pt-1 pb-4 pr-[35px] pl-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tradesData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar yAxisId="left" dataKey="trades" fill="#06b6d4" barSize={10} radius={[2, 2, 0, 0]} name="Trades" />
                    <YAxis yAxisId="left" domain={[0, 'dataMax']} hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#06b6d4]" /> <span className="text-gray-400">Trades</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#6366f1]" /> <span className="text-gray-400">Unique traders</span></div>
          </div>
        </Card>

        {/* MARKET DYNAMICS */}
        <SectionTitle>Market dynamics</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-[26px] font-medium tracking-tight text-white">Open interest</h3>
                <div className="text-sm text-gray-300 mt-1 font-mono tracking-tight">$18.47M</div>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketDynamicsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                  <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="oi" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[26px] font-medium tracking-tight text-white">Funding rates</h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketDynamicsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                  <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="fund1" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="fund2" stroke="#10b981" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="fund3" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* MARKET SHARE */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[26px] font-medium tracking-tight text-white">Market share</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 pt-4">
            <div className="w-[300px] h-[300px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {pieData.map(item => (
                <div key={item.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-900 border border-red-500 overflow-hidden text-[8px] flex justify-center items-center font-bold">US</div>
                      <span className="font-mono text-gray-200">{item.name}</span>
                    </div>
                    <span className="font-mono text-gray-300">{item.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1b2a30] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* RISK & LIQUIDATIONS */}
        <SectionTitle>Risk & liquidations</SectionTitle>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-[26px] font-medium tracking-tight text-white mb-1">Liquidations</h3>
              <div className="text-red-500 text-sm font-mono tracking-tight">$24.5M</div>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1b2a30" />
                <XAxis dataKey="name" stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis stroke="#526b75" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v/10}M`} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff10'}} />
                <Bar dataKey="USOIL" stackId="a" fill="#b45309" />
                <Bar dataKey="US500" stackId="a" fill="#1d4ed8" />
                <Bar dataKey="SILVER" stackId="a" fill="#475569" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* LIQUIDITY TABLE */}
        <SectionTitle>Liquidity</SectionTitle>
        <Card className="p-0 overflow-x-auto">
          <table className="w-full text-left min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-[#1b2a30] text-xs text-gray-400 font-medium">
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4 text-right">Volume</th>
                <th className="px-6 py-4 text-right">Open interest</th>
                <th className="px-6 py-4 text-right">Spread</th>
                <th className="px-6 py-4 text-right tracking-tight">Slippage $1k</th>
                <th className="px-6 py-4 text-right tracking-tight">Slippage $10k</th>
                <th className="px-6 py-4 text-right tracking-tight">Slippage $30k</th>
                <th className="px-6 py-4 text-right tracking-tight">Slippage $100k</th>
                <th className="px-6 py-4 text-right tracking-tight">Slippage $1m</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2a30]">
              {liquidityData.map((row, i) => (
                <tr key={i} className="hover:bg-[#162227] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <AssetIcon asset={row} />
                      <span className="font-mono text-gray-200">{row.asset}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300">
                    ${row.vol}{row.vol > 10 ? 'M' : row.vol > 1 ? 'M' : 'K'}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300">
                    ${row.oi}{row.oi > 10 ? 'M' : row.oi > 1 ? 'M' : 'K'}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-white">{row.s.toFixed(2)} bps</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400 group-hover:text-gray-300">{row.s1.toFixed(2)} bps</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400 group-hover:text-gray-300">{row.s10.toFixed(2)} bps</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400 group-hover:text-gray-300">{row.s30.toFixed(2)} bps</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400 group-hover:text-gray-300">{row.s100.toFixed(2)} bps</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-400 group-hover:text-gray-300">{row.s1m.toFixed(2)} bps</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* ASSETS TABLE */}
        <SectionTitle>Assets</SectionTitle>
        <Card className="p-0 overflow-x-auto mb-10">
          <table className="w-full text-left min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-[#1b2a30] text-xs text-gray-400 font-medium">
                <th className="px-6 py-4 w-1/2">Asset <ArrowDownUp className="w-3 h-3 inline-block ml-1 opacity-50" /></th>
                <th className="px-6 py-4 text-right">24h volume <ArrowDownUp className="w-3 h-3 inline-block ml-1 opacity-50" /></th>
                <th className="px-6 py-4 text-right w-32">Share <ArrowDownUp className="w-3 h-3 inline-block ml-1 opacity-50" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2a30]">
              {liquidityData.sort((a,b) => b.vol - a.vol).map((row, i) => {
                const total = liquidityData.reduce((acc, curr) => acc + curr.vol, 0);
                const share = (row.vol / total) * 100;
                return (
                  <tr key={i} className="hover:bg-[#162227] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AssetIcon asset={row} />
                        <span className="font-mono text-gray-200">{row.asset}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-gray-300">
                      ${row.vol}{row.vol > 10 ? 'M' : row.vol > 1 ? 'M' : 'K'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-gray-400 text-sm font-mono">
                        {share.toFixed(1)}% <div className="w-2 h-1 rounded-full bg-blue-500" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

      </div>
    </div>
  );
}
