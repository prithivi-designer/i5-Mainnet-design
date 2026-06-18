'use client';

import React from 'react';
import { 
  Bell, Database, ChevronRight, Flame, 
  CheckCircle2, Circle, Gift, Trophy, ArrowRight, 
  Users, Copy, Shield, ChevronDown, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

const generateSparkline = () => Array.from({ length: 15 }, (_, i) => ({ value: 50 + Math.random() * 50 + (i * 2) }));

const topChampions = [
  { id: 1, address: '0x3b52..d852', points: '1.5M', color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  { id: 2, address: '0x0d1d..01ba', points: '1.3M', color: 'text-gray-300', bg: 'bg-gray-300/20' },
  { id: 3, address: '0x4c7e..f3a2', points: '2.1M', color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { id: 4, address: '0x9a1e..b6ca', points: '1.8M', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 5, address: '0x7f3d..c4f0', points: '2.5M', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 6, address: '0x1a2b..f4d3', points: '1.4M', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 7, address: '0x2c3d..e4f5', points: '1.2M', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 8, address: '0x8e9f..a0b1', points: '1.1M', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 9, address: '0x5d6e..f7a8', points: '950K', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 10, address: '0x3a4b..c5d6', points: '880K', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 11, address: '0x4b5c..d6e7', points: '820K', color: 'text-gray-400', bg: 'bg-gray-800' },
  { id: 12, address: '0x5c6d..e7f8', points: '790K', color: 'text-gray-400', bg: 'bg-gray-800' },
];



export function Dashboard() {
  const sparklineData1 = generateSparkline();
  const sparklineData2 = generateSparkline();

  return (
    <div className="h-full bg-[#050505] text-gray-200 overflow-y-auto p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Trading points */}
          <div className="card-base p-5 flex flex-col justify-between relative overflow-hidden">
             <div className="flex items-center gap-4 mb-2 z-10">
                <div className="w-10 h-10 icon-squircle shrink-0">
                   <Bell className="w-5 h-5 text-[#34d399]" />
                </div>
                <span className="font-semibold text-sm">Trading points</span>
             </div>
             <div className="text-4xl font-bold font-mono z-10 mb-1">23,456</div>
             <div className="text-[#34d399] text-sm font-medium flex items-center gap-1 z-10">
                <ArrowRight className="w-3 h-3 -rotate-45" /> +3 today
             </div>
             <div className="absolute bottom-2 right-2 w-32 h-16 opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={sparklineData1}>
                     <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Season points */}
          <div className="card-base p-5 flex flex-col justify-between relative overflow-hidden">
             <div className="flex items-center gap-4 mb-2 z-10">
                <div className="w-10 h-10 icon-squircle shrink-0">
                   <Database className="w-5 h-5 text-[#34d399]" />
                </div>
                <span className="font-semibold text-sm">Season points</span>
             </div>
             <div className="text-4xl font-bold font-mono z-10 mb-1">14,765</div>
             <div className="text-[#34d399] text-sm font-medium flex items-center gap-1 z-10">
                <ArrowRight className="w-3 h-3 -rotate-45" /> +420 this week
             </div>
             <div className="absolute bottom-2 right-2 w-32 h-16 opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={sparklineData2}>
                     <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Scout -> S2 Progress */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 card-base p-5 relative overflow-hidden flex flex-col justify-center">
             
             {/* Left Side Content Container with safe padding to avoid badge overlap */}
             <div className="pr-24 sm:pr-32 md:pr-40">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Have reached</div>
                      <div className="text-3xl font-bold">Scout</div>
                      <div className="text-sm text-gray-400 mt-1">This level has been exceeded</div>
                   </div>
                </div>
                
                <div className="mt-2">
                   <div className="w-full h-1.5 bg-[#1a2b30] rounded-full overflow-hidden mb-2 relative">
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00d8ff] to-[#34d399] w-[92%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                   </div>
                   <div className="flex justify-between text-[11px] font-mono text-gray-400">
                      <span>Scout</span>
                      <span>S2</span>
                   </div>
                </div>

                <div className="mt-3">
                   <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Current EP</div>
                   <div className="font-mono text-lg"><span className="text-[#34d399]">14,765</span> / 16,000</div>
                </div>
             </div>

             {/* Absolutely positioned badge on the right */}
             <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 opacity-95">
                <img src="/Images/Badges/scout_badge.png" alt="Scout Badge" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_25px_rgba(0,216,255,0.5)]" />
             </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
           
           {/* LEFT COLUMN: TRADING TASKS */}
           <div className="space-y-6">
              
              <div className="card-base overflow-hidden flex flex-col">
                 {/* Header */}
                 <div className="p-5 border-b border-[#1a2b30] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 icon-squircle shrink-0">
                          <Calendar className="w-6 h-6 text-[#34d399]" />
                       </div>
                       <div>
                          <h2 className="text-2xl font-bold">Daily Tasks</h2>
                          <p className="text-sm text-gray-400 mt-0.5">Complete tasks to earn extra rewards</p>
                       </div>
                    </div>

                 </div>

                 {/* Featured Task */}
                 <div className="p-6 pb-2">
                    <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-3">Featured Task</div>
                    <div className="relative bg-gradient-to-r from-[#112420] to-[#0c1a17] border border-teal-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-[0_0_20px_rgba(20,184,166,0.05)]">
                       <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className="w-12 h-12 icon-squircle shrink-0">
                             <div className="text-teal-400 font-bold text-xl font-mono">₿</div>
                          </div>
                          <div>
                             <div className="font-bold text-lg text-white">Trade BTC-PERP</div>
                             <div className="text-sm text-gray-400 mt-0.5">Execute a trade of any size</div>
                             <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-400">Reward</span>
                                <span className="text-xs font-bold font-mono text-[#34d399] border border-[#34d399]/40 bg-[#34d399]/10 px-2 py-0.5 rounded-full">+75 EP</span>
                             </div>
                          </div>
                       </div>
                       <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 font-bold text-sm hover:bg-yellow-500/20 transition-colors flex items-center justify-center gap-2">
                          Start Trading <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>

                 {/* Task Lists */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-2">
                    {/* Daily Tasks */}
                    <div className="p-6 sm:border-r border-[#1a2b30]">
                       <div className="flex justify-between items-center mb-5">
                          <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Daily Tasks</div>
                          <div className="text-[10px] text-teal-400 font-mono">7/10 Completed</div>
                       </div>
                       <div className="space-y-5">
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-200">Complete 1 Trade</div>
                                   <div className="text-xs text-gray-500 mt-0.5">Reward: 50 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-primary text-xs">Claim</button>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-200">Open a Long Position</div>
                                   <div className="text-xs text-gray-500 mt-0.5">Reward: 50 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-primary text-xs">Claim</button>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-200">Trade BTC-PERP</div>
                                   <div className="text-xs text-gray-500 mt-0.5">Reward: 75 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-primary text-xs">Claim</button>
                          </div>
                       </div>

                    </div>

                    {/* Weekly Tasks */}
                    <div className="p-6">
                       <div className="flex justify-between items-center mb-5">
                          <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Weekly Tasks</div>
                          <div className="text-[10px] text-teal-400 font-mono">2/5 Completed</div>
                       </div>
                       <div className="space-y-5">
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-200">Trade for 3 Consecutive Days</div>
                                   <div className="text-xs text-gray-500 mt-0.5">Reward: 300 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-primary text-xs">Claim</button>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <Circle className="w-5 h-5 text-[#1a2b30] shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-400">Complete 25 Trades</div>
                                   <div className="text-xs text-gray-600 mt-0.5">Reward: 500 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-secondary text-xs w-[62px]">Go</button>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex items-start gap-3">
                                <Circle className="w-5 h-5 text-[#1a2b30] shrink-0 mt-0.5" />
                                <div>
                                   <div className="text-sm font-semibold text-gray-400">Reach $5,000 Trading Volume</div>
                                   <div className="text-xs text-gray-600 mt-0.5">Reward: 600 EP</div>
                                </div>
                             </div>
                             <button className="px-4 py-1.5 btn-secondary text-xs w-[62px]">Go</button>
                          </div>
                       </div>

                    </div>
                 </div>

                 {/* Bottom Callout */}
                 <div className="p-5 bg-[#0a0f12] border-t border-[#1a2b30] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 icon-squircle shrink-0">
                          <Gift className="w-6 h-6 text-[#34d399]" />
                       </div>
                       <div>
                          <div className="text-xs text-gray-400 font-semibold mb-0.5">Total EP Available</div>
                          <div className="text-2xl font-bold font-mono text-[#34d399]">450 EP</div>
                       </div>
                    </div>
                    <div className="text-sm text-gray-400 hidden md:block text-center sm:text-left">
                       Complete more tasks to earn EP<br/>and level up faster!
                    </div>
                    <button className="px-6 py-3 btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                       View All Tasks <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              {/* BOTTOM ROW (Referral & X) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Referral Program */}
                 <div className="card-base p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="absolute -top-4 -right-4 w-40 h-40 opacity-30 pointer-events-none">
                       {/* Placeholder for gift image */}
                       <div className="w-full h-full flex items-center justify-center text-teal-400">
                          <Gift className="w-24 h-24" strokeWidth={1} />
                       </div>
                    </div>
                    <div className="relative z-10">
                       <div className="flex items-center gap-2 mb-1.5">
                          <Users className="w-5 h-5 text-teal-400" />
                          <h3 className="font-bold text-lg text-white">Referral Program</h3>
                       </div>
                       <p className="text-xs text-gray-400 mb-5">Invite friends to join and get rewards</p>
                       <div className="flex items-center bg-[#050505] border border-[#1a2b30] rounded-lg p-1.5 pr-2 w-full mb-6">
                          <input type="text" readOnly value="HI5-ALPHA-2026-X92" className="bg-transparent text-sm font-mono text-gray-300 w-full outline-none px-2" />
                          <button className="p-1.5 hover:bg-[#1a2b30] rounded-md transition-colors"><Copy className="w-4 h-4 text-gray-400" /></button>
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-auto relative z-10">
                       <div>
                          <div className="text-[11px] text-gray-500 mb-1">Invited</div>
                          <div className="text-xl font-bold font-mono text-white">12</div>
                       </div>
                       <div>
                          <div className="text-[11px] text-gray-500 mb-1">Active</div>
                          <div className="text-xl font-bold font-mono text-[#34d399]">4</div>
                       </div>
                       <div>
                          <div className="text-[11px] text-gray-500 mb-1">Total Earned</div>
                          <div className="text-xl font-bold font-mono text-[#34d399]">125 EP</div>
                       </div>
                    </div>
                 </div>

                 {/* Share on X */}
                 <div className="card-base p-6 flex flex-col min-h-[220px]">
                    <div className="flex items-center gap-2 mb-1.5">
                       <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.976H5.078z"></path></g></svg>
                       <h3 className="font-bold text-lg text-white">Share on X (Twitter)</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-5 leading-relaxed">Share our latest update on your X profile<br/>and submit the link below.</p>
                    
                    <div className="mt-auto space-y-4">
                       <input type="text" placeholder="Paste X/Twitter URL here..." className="w-full bg-[#050505] border border-[#1a2b30] rounded-lg px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-[#34d399]/50 transition-colors placeholder:text-gray-600" />
                       <div className="flex items-center gap-3">
                          <button className="flex-1 btn-primary py-2.5 text-sm">Submit Link</button>
                          <button className="flex-1 btn-secondary py-2.5 text-sm">Go to Task</button>
                       </div>
                       <div className="text-xs text-gray-400 flex items-center gap-2 pt-1">
                          Reward: <span className="text-[#34d399] font-bold font-mono">+50 EP</span>
                       </div>
                    </div>
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN: LEADERBOARDS */}
           <div className="flex flex-col lg:h-full">
              
              {/* Top Champions */}
              <div className="card-base overflow-hidden flex flex-col lg:flex-1 lg:min-h-0">
                 <div className="p-5 flex justify-between items-center border-b border-[#1a2b30] shrink-0">
                    <div className="flex items-center gap-2.5">
                       <div className="w-8 h-8 icon-squircle shrink-0">
                          <Trophy className="w-4 h-4 text-teal-400" />
                       </div>
                       <h2 className="font-bold text-lg">Top Champions</h2>
                    </div>
                    <button className="text-teal-400 text-xs font-semibold hover:underline flex items-center gap-1">
                       View All <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                 </div>
                 
                 <div className="p-3 space-y-1 overflow-y-auto lg:flex-1 lg:min-h-0 no-scrollbar">
                    {topChampions.map((champ, i) => (
                       <div key={champ.id} className="flex items-center justify-between p-3 hover:bg-white/[0.02] rounded-xl transition-colors">
                          <div className="flex items-center gap-4">
                             {/* Rank shape */}
                             <div className={cn("w-7 h-7 flex items-center justify-center font-bold text-sm", champ.bg, champ.color, i >= 3 ? "rounded-full" : "clip-hexagon")}>
                                {champ.id}
                             </div>
                             <div className="flex items-center gap-3">
                                <img src={`https://i.pravatar.cc/100?u=${champ.address}`} alt="avatar" className="w-8 h-8 rounded-full border border-[#1a2b30]" />
                                <span className="font-mono text-[13px] text-gray-300">{champ.address}</span>
                             </div>
                          </div>
                          <div className={cn("font-bold font-mono text-sm", i === 0 ? "text-yellow-400" : (i === 1 ? "text-[#00d8ff]" : (i === 2 ? "text-orange-400" : "text-white")))}>
                             {champ.points}
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Your Rank - Integrated as a footer */}
                 <div className="bg-[#0b0e13]/80 border-t border-[#15181C] p-5 shrink-0 backdrop-blur-md">
                    <h2 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-400">Your Rank</h2>
                    <div className="flex items-center justify-between">
                       <div className="text-2xl font-bold font-mono text-[#34d399]">#127</div>
                       <div className="flex items-center gap-2">
                          <img src="https://i.pravatar.cc/100?u=stency" alt="Stency" className="w-8 h-8 rounded-full border border-[#1a2b30]" />
                          <span className="font-mono text-xs text-gray-400">0x1a2b..f4d3</span>
                       </div>
                       <div className="text-xl font-bold font-mono text-[#34d399]">1.4M</div>
                    </div>
                 </div>
              </div>

           </div>
        </div>
        
      </div>
    </div>
  );
}
