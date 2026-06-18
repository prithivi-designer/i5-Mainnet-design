'use client';

import { useState } from 'react';
import { Target, CheckCircle2, Circle, Trophy, Star, Gift, Clock, ShieldCheck, TrendingUp, DollarSign, Award, Lock, Activity, Flame, Layers, Shield, ChevronRight, ChevronDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
}

const DAILY_TASKS: Task[] = [
  { id: 'd1', title: 'Complete 1 Trade', xp: 50, completed: true },
  { id: 'd2', title: 'Complete 3 Trades', xp: 150, completed: false },
  { id: 'd3', title: 'Open a Long Position', xp: 50, completed: false },
  { id: 'd4', title: 'Open a Short Position', xp: 50, completed: false },
  { id: 'd5', title: 'Trade BTC-PERP', xp: 100, completed: true },
  { id: 'd6', title: 'Trade ETH-PERP', xp: 100, completed: false },
  { id: 'd7', title: 'Trade 2 Different Markets', xp: 150, completed: false },
  { id: 'd8', title: 'Trade 3 Different Markets', xp: 200, completed: false },
  { id: 'd9', title: 'Reach $100 Trading Volume', xp: 100, completed: true },
  { id: 'd10', title: 'Reach $500 Trading Volume', xp: 250, completed: false },
  { id: 'd11', title: 'Hold a Position for 15 Minutes', xp: 100, completed: false },
  { id: 'd12', title: 'Hold a Position for 1 Hour', xp: 200, completed: false },
  { id: 'd13', title: 'Close a Position', xp: 50, completed: true },
  { id: 'd14', title: 'Close a Profitable Trade', xp: 150, completed: false },
  { id: 'd15', title: 'Set a Stop Loss', xp: 50, completed: true },
  { id: 'd16', title: 'Set a Take Profit', xp: 50, completed: true },
  { id: 'd17', title: 'Set Both Stop Loss and Take Profit', xp: 100, completed: false },
  { id: 'd18', title: 'Modify an Existing Position', xp: 50, completed: false },
  { id: 'd19', title: 'Increase Position Size', xp: 50, completed: false },
  { id: 'd20', title: 'Reduce Position Size', xp: 50, completed: false },
  { id: 'd21', title: 'View Open Positions', xp: 20, completed: true },
  { id: 'd22', title: 'Review Trade History', xp: 20, completed: false },
  { id: 'd23', title: 'Check Portfolio PnL', xp: 20, completed: true },
  { id: 'd24', title: 'Add 3 Markets to Watchlist', xp: 50, completed: false },
  { id: 'd25', title: 'View Market Leaderboard', xp: 20, completed: false },
  { id: 'd26', title: 'View Top Gainers', xp: 20, completed: false },
  { id: 'd27', title: 'View Top Losers', xp: 20, completed: false },
  { id: 'd28', title: 'Read Daily Market Brief', xp: 50, completed: false },
  { id: 'd29', title: 'View 3 AI Trading Signals', xp: 100, completed: false },
  { id: 'd30', title: 'Execute a Trade from an AI Signal', xp: 200, completed: false },
  { id: 'd31', title: 'Maintain Daily Trading Streak', xp: 150, completed: true },
];

const WEEKLY_TASKS: Task[] = [
  { id: 'w1', title: 'Trade for 3 Consecutive Days', xp: 300, completed: true },
  { id: 'w2', title: 'Trade for 7 Consecutive Days', xp: 1000, completed: false },
  { id: 'w3', title: 'Complete 25 Trades', xp: 1000, completed: false },
  { id: 'w4', title: 'Complete 50 Trades', xp: 2500, completed: false },
  { id: 'w5', title: 'Trade 5 Different Markets', xp: 500, completed: false },
  { id: 'w6', title: 'Trade 10 Different Markets', xp: 1500, completed: false },
  { id: 'w7', title: 'Reach $5,000 Trading Volume', xp: 2000, completed: false },
  { id: 'w8', title: 'Reach $10,000 Trading Volume', xp: 5000, completed: false },
  { id: 'w9', title: 'Close 10 Profitable Trades', xp: 2000, completed: false },
  { id: 'w10', title: 'Execute 5 AI Signal Trades', xp: 1500, completed: false },
  { id: 'w11', title: 'Complete All Daily Tasks for 7 Days', xp: 10000, completed: false },
  { id: 'w12', title: 'Maintain a 7-Day Trading Streak', xp: 2000, completed: false },
  { id: 'w13', title: 'Maintain a 14-Day Trading Streak', xp: 5000, completed: false },
  { id: 'w14', title: 'Invite a Friend Who Completes a Trade', xp: 5000, completed: false },
  { id: 'w15', title: 'Reach Top 100 on Arena Leaderboard', xp: 10000, completed: false },
];

const BADGES = [
  {
    id: 'b1',
    name: 'Scout',
    description: 'Level up past the novice tiers by accumulating EP.',
    requirement: 'Reach 10,000 EP',
    unlocked: true,
    icon: '/Images/Badges/scout_badge.png',
    color: '#00d8ff',
    rarity: 'Legendary' as const,
  },
  {
    id: 'b2',
    name: 'Speculator',
    description: 'Execute your first trade of any size on the platform.',
    requirement: 'Complete 1 trade',
    unlocked: true,
    icon: TrendingUp,
    color: '#34d399',
    rarity: 'Common' as const,
  },
  {
    id: 'b3',
    name: 'Risk Taker',
    description: 'Open a position with leverage greater than 10x.',
    requirement: '10x+ leverage trade',
    unlocked: true,
    icon: Flame,
    color: '#fa6432',
    rarity: 'Common' as const,
  },
  {
    id: 'b4',
    name: 'Opportunity Hunter',
    description: 'Execute a trade following an AI Trading signal.',
    requirement: '1 AI signal trade',
    unlocked: true,
    icon: Target,
    color: '#8b5cf6',
    rarity: 'Rare' as const,
  },
  {
    id: 'b5',
    name: 'Position Architect',
    description: 'Set both Stop Loss and Take Profit orders on a single position.',
    requirement: 'Bracket order set',
    unlocked: true,
    icon: Layers,
    color: '#a8a29e',
    rarity: 'Rare' as const,
  },
  {
    id: 'b6',
    name: 'Capital Commander',
    description: 'Reach a lifetime trading volume of over $50,000.',
    requirement: '$50,000 trading volume',
    unlocked: true,
    icon: Shield,
    color: '#facc15',
    rarity: 'Epic' as const,
  },
  {
    id: 'b7',
    name: 'Volatility Rider',
    description: 'Complete a profitable trade during high-volatility market events.',
    requirement: '1 high-vol volatility trade',
    unlocked: false,
    icon: Activity,
    color: '#ec4899',
    rarity: 'Epic' as const,
  },
  {
    id: 'b8',
    name: 'Alpha Generator',
    description: 'Maintain a weekly profit percentage higher than 95% of active traders.',
    requirement: 'Top 5% weekly PnL',
    unlocked: false,
    icon: Trophy,
    color: '#10b981',
    rarity: 'Legendary' as const,
  },
  {
    id: 'b9',
    name: 'Yield Conqueror',
    description: 'Execute 100 successful trades on the platform.',
    requirement: '100 total trades',
    unlocked: false,
    icon: ShieldCheck,
    color: '#3ae099',
    rarity: 'Legendary' as const,
  },
];

export function Tasks() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'referrals' | 'badges'>('daily');

  const tasks = activeTab === 'daily' ? DAILY_TASKS : WEEKLY_TASKS;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const completedBadgesCount = BADGES.filter(b => b.unlocked).length;
  const badgesProgressPercent = Math.round((completedBadgesCount / BADGES.length) * 100);

  // Badge Journey Y positions for connecting lines
  const Y1 = 76;
  const Y2 = 298;
  const Y3 = 520;

  return (
    <div className="h-full flex-1 flex flex-col overflow-y-auto bg-[#050505] relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#34d399]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#34d399]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl w-full mx-auto p-6 md:p-8 relative z-10 flex-1 flex flex-col font-sans">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col xl:flex-row items-start xl:items-start justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#00e599] shadow-[0_0_10px_#00e599]" />
              <h1 className="text-3xl md:text-[32px] font-black text-white tracking-tight leading-none">
                Missions & Referrals
              </h1>
            </div>
            <p className="text-[#a0a0a0] text-[15px] leading-relaxed">
              Complete your daily and weekly trading tasks to earn XP. Accumulate XP to unlock premium tiers, fee discounts, and exclusive AI agent tools, and earn up to 70% fee share by referring users.
            </p>
          </div>
          
          {/* Quick Stats - Distinct Cards */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            {/* Total XP Card */}
            <div className="flex items-center gap-4 bg-[#0a0c0f]/80 backdrop-blur-md border border-[#1a1f26] px-5 py-4 rounded-2xl w-full sm:w-[220px]">
              <div className="w-12 h-12 rounded-full border-2 border-[#fbbf24]/30 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Total XP</div>
                <div className="text-white font-bold text-xl leading-none">12,450</div>
              </div>
            </div>

            {/* Current Tier Card */}
            <div className="flex items-center gap-4 bg-[#0a0c0f]/80 backdrop-blur-md border border-[#1a1f26] px-5 py-4 rounded-2xl w-full sm:w-[220px]">
              <div className="w-12 h-12 rounded-full border-2 border-[#34d399]/30 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-[#34d399]" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Current Tier</div>
                <div className="text-white font-bold text-xl leading-none">Pro Trader</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Progress */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Navigation Tabs */}
          <div className="flex w-full md:w-auto p-1 bg-transparent rounded-[14px] border border-[#1a1f26] gap-1">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                "flex-1 md:w-[110px] py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'daily' ? "bg-[#34d399]/10 text-[#34d399]" : "text-gray-400 hover:text-white"
              )}
            >
              <Clock className="w-3.5 h-3.5" /> Daily Tasks
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={cn(
                "flex-1 md:w-[110px] py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'weekly' ? "bg-[#34d399]/10 text-[#34d399]" : "text-gray-400 hover:text-white"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Weekly Tasks
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={cn(
                "flex-1 md:w-[110px] py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'referrals' ? "bg-[#34d399]/10 text-[#34d399]" : "text-gray-400 hover:text-white"
              )}
            >
              <Gift className="w-3.5 h-3.5" /> Referrals
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={cn(
                "flex-1 md:w-[110px] py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'badges' ? "border border-[#00e599]/30 bg-[#00e599]/10 text-[#00e599]" : "text-gray-400 hover:text-white"
              )}
            >
              <Award className="w-3.5 h-3.5" /> Badges
            </button>
          </div>

          {/* Progress Bar aligned to the right */}
          <div className="w-full md:w-[320px] flex flex-col gap-2 relative">
            <div className="flex justify-between text-xs font-bold items-center mb-1">
              <span className="text-gray-500 uppercase tracking-widest text-[10px]">Progress</span>
              {activeTab === 'badges' ? (
                <span className="text-[#00e599] font-mono">{completedBadgesCount} / {BADGES.length} ({badgesProgressPercent}%)</span>
              ) : activeTab === 'referrals' ? (
                <span className="text-[#00e599] font-mono">0%</span>
              ) : (
                <span className="text-[#00e599] font-mono">{completedCount} / {tasks.length} ({progressPercent}%)</span>
              )}
            </div>
            <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden border border-[#222]">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ 
                  width: `${activeTab === 'badges' ? badgesProgressPercent : activeTab === 'referrals' ? 0 : progressPercent}%`,
                  background: 'linear-gradient(90deg, #10b981, #00e599)'
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:16px_16px] opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Task List Grid or Referrals */}
        {activeTab === 'referrals' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 items-start mt-4">
            <div className="card-base p-8 space-y-6 border border-[#222] bg-[#0c0c0c]">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-[#34d399]" />
                <h2 className="text-2xl font-bold tracking-tight text-white">Refer users</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#34d399] leading-tight tracking-tight">
                Earn up to 70% fee share
              </h3>
              <div className="space-y-2">
                <h4 className="text-[20px] font-semibold text-white leading-snug">
                  Create your custom referral code
                </h4>
                <p className="text-gray-400 text-[15px]">
                  Share this code with friends to start earning your fee share.
                </p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">hi5.com/ref/</span>
                    <input 
                      type="text" 
                      placeholder="YOUR-CODE" 
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl pl-[105px] pr-4 py-3.5 text-white font-mono uppercase outline-none focus:border-[#34d399]/50 transition-colors placeholder:text-gray-700" 
                    />
                  </div>
                  <button className="w-full sm:w-auto bg-gradient-to-r from-[#34d399] to-[#2bb280] text-[#050505] font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shrink-0 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                    Create Link
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Codes must be 4-15 characters long and can only contain letters and numbers.
                </p>
              </div>
              <hr className="border-[#222] my-6" />
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Activate a referral code to get an 8% fee discount for lifetime on trading volume. <br/>
                <a href="#" className="text-[#34d399] hover:underline italic">Learn more.</a>
              </p>
            </div>

            <div className="space-y-4">
              <div className="card-base p-6 hover:border-[#333] transition-colors border border-[#222] bg-[#0c0c0c]">
                <h3 className="text-[18px] font-semibold text-white mb-2 tracking-tight">Create and share a referral link</h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  When a new user is onboarded with your code, they become your active referral.
                </p>
              </div>
              <div className="card-base p-6 hover:border-[#333] transition-colors border border-[#222] bg-[#0c0c0c]">
                <h3 className="text-[18px] font-semibold text-white mb-2 tracking-tight">Gift fee discount to your referrals</h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  Your referrals get an 8% discount on fees for lifetime on their trading volume.
                </p>
              </div>
              <div className="card-base p-6 hover:border-[#333] transition-colors border border-[#222] bg-[#0c0c0c]">
                <h3 className="text-[18px] font-semibold text-white mb-2 tracking-tight">Earn Rewards</h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  You receive up to 70% of the fee share generated by your referrals.
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'badges' ? (
          <div className="space-y-8 pb-12 mt-4">
            
            {/* Badges Hero Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left: Current Badge */}
              <div className="flex-1 card-base p-8 border border-[#1a1f26] bg-[#0a0c0f] relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00e599]/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="w-full flex justify-between items-start md:hidden mb-2">
                  <span className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase">Current Badge</span>
                </div>

                <div className="relative shrink-0 w-48 h-48 md:w-56 md:h-56 z-10">
                  <img src="/badges/scout.png" alt="Scout Badge" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,229,153,0.3)] relative z-10" />
                  {/* Decorative glowing rim behind the badge */}
                  <div className="absolute inset-0 rounded-full border border-[#00e599]/20 scale-[1.15] bg-[radial-gradient(circle,rgba(0,229,153,0.1)_0%,transparent_70%)]" />
                </div>

                <div className="flex-1 w-full z-10 flex flex-col justify-between">
                  <div>
                    <div className="hidden md:block text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-2">Current Badge</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Scout</h2>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-[#00e599]/10 text-[#00e599] border border-[#00e599]/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(0,229,153,0.1)]">
                        Legendary
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500" /> Current Tier
                      </span>
                    </div>
                    <p className="text-[#a0a0a0] text-[15px] leading-relaxed max-w-sm mb-8">
                      Level up past the novice tiers by accumulating EP.
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 mt-auto">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 flex items-center justify-center">
                          <Star className="w-5 h-5 text-[#fbbf24]" />
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">XP Earned</div>
                          <div className="text-xl font-bold text-white leading-none">12,450</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Next Badge</div>
                        <div className="text-lg font-bold text-[#00e599] leading-none">Speculator</div>
                      </div>
                    </div>
                    
                    {/* XP Progress Bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3.5 bg-[#111] rounded-full overflow-hidden border border-[#222]">
                        <div className="h-full bg-gradient-to-r from-[#10b981] to-[#00e599] w-[80%] rounded-full shadow-[0_0_10px_rgba(0,229,153,0.3)]" />
                      </div>
                      <span className="text-xs font-mono font-bold shrink-0">
                        <span className="text-[#00e599]">12,000</span> <span className="text-gray-500">/ 15,000 XP (80%)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Badge Progress */}
              <div className="w-full lg:w-[380px] card-base p-8 border border-[#1a1f26] bg-[#0a0c0f] flex flex-col justify-between">
                <div className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-8">Badge Progress</div>
                
                {/* Circular Chart */}
                <div className="relative w-48 h-48 mx-auto mb-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Ring */}
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#111" strokeWidth="8" />
                    {/* Progress Ring (67% of 283 = 190) */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="url(#progressGradient)" 
                      strokeWidth="8" 
                      strokeDasharray="282.7" 
                      strokeDashoffset="93" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_10px_rgba(0,229,153,0.4)]"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#00e599" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-black text-white font-mono tracking-tighter">67%</span>
                    <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mt-1">Completion</span>
                  </div>
                </div>

                {/* Stat Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1a1f26]">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded border border-[#00e599]/30 bg-[#00e599]/10 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00e599]" />
                      </div>
                      <span className="text-[13px] text-gray-400 font-medium">Badges Unlocked</span>
                    </div>
                    <span className="text-sm font-mono font-bold"><span className="text-white">6</span> <span className="text-gray-500">/ 9</span></span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#1a1f26]">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded border border-gray-700 bg-gray-800/50 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-[13px] text-gray-400 font-medium">Badges Locked</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">3</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded border border-[#fbbf24]/30 bg-[#fbbf24]/10 flex items-center justify-center">
                        <Star className="w-3.5 h-3.5 text-[#fbbf24]" />
                      </div>
                      <span className="text-[13px] text-gray-400 font-medium">Rarest Badge</span>
                    </div>
                    <span className="text-[13px] text-[#00e599] font-bold">Legendary</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Badge Strip */}
            <div className="card-base p-6 border border-[#1a1f26] bg-[#0a0c0f] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#00e599]/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border border-[#00e599]/30 bg-[#00e599]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-8 h-8 text-[#00e599]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-1">Next Badge</div>
                  <h3 className="text-xl font-bold text-white mb-1">Speculator</h3>
                  <p className="text-[#a0a0a0] text-sm">Execute your first trade of any size on the platform.</p>
                </div>
              </div>
              <div className="w-full md:w-[300px] flex items-center gap-6">
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-[#00e599] tracking-widest uppercase mb-2">80% Ready</div>
                  <div className="h-2 bg-[#111] rounded-full overflow-hidden border border-[#222] mb-2">
                    <div className="h-full bg-[#00e599] w-[80%] rounded-full shadow-[0_0_10px_rgba(0,229,153,0.3)]" />
                  </div>
                  <div className="text-[11px] font-mono font-bold text-gray-500">
                    <span className="text-[#00e599]">12,000</span> / 15,000 XP
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Badge Journey Section */}
            <div className="card-base p-8 border border-[#1a1f26] bg-[#0a0c0f] overflow-hidden">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-widest">Badge Journey</h3>
                  <p className="text-[#a0a0a0] text-sm">Complete badges in order to unlock the next tier.</p>
                </div>
                <div className="flex items-center gap-2 border border-[#222] bg-[#111] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                  <span className="text-sm font-medium text-gray-300">All Status</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Journey Map (Simplified Flex Layout for Desktop/Mobile) */}
              <div className="relative max-w-4xl mx-auto py-8">
                
                {/* Responsive Dotted Connecting Lines Background */}
                <div className="absolute inset-0 z-0 hidden md:block">
                  <svg className="w-full h-full" style={{ strokeDasharray: "4, 4" }}>
                    <path d={`M 16.6% ${Y1} L 83.3% ${Y1}`} stroke="#222" strokeWidth="2" fill="none" />
                    <path d={`M 12.5% ${Y2} L 87.5% ${Y2}`} stroke="#222" strokeWidth="2" fill="none" />
                    <path d={`M 33.3% ${Y3} L 66.6% ${Y3}`} stroke="#222" strokeWidth="2" fill="none" />
                    {/* Vertical drops */}
                    <path d={`M 83.3% ${Y1} Q 95% ${Y1} 95% ${Y1 + 40} L 95% ${Y2 - 40} Q 95% ${Y2} 87.5% ${Y2}`} stroke="#222" strokeWidth="2" fill="none" />
                    <path d={`M 12.5% ${Y2} Q 5% ${Y2} 5% ${Y2 + 40} L 5% ${Y3 - 40} Q 5% ${Y3} 33.3% ${Y3}`} stroke="#222" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Row 1 (3 Items) */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between mb-12 md:mb-24 gap-12 md:gap-0">
                  <div className="flex flex-col items-center text-center w-full md:w-1/3 relative group cursor-pointer">
                    <div className="w-20 h-20 mb-3 relative z-10">
                      <img src="/badges/scout.png" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,229,153,0.3)] group-hover:scale-110 transition-transform" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00e599] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]">
                        <CheckCircle2 className="w-3 h-3 text-[#0a0c0f]" />
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">Scout</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00e599] bg-[#00e599]/10 px-2 py-0.5 rounded-full border border-[#00e599]/30">Legendary</span>
                  </div>

                  <div className="flex flex-col items-center text-center w-full md:w-1/3 relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-full border border-[#00e599]/50 bg-[#00e599]/10 flex items-center justify-center mb-3 relative z-10 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,229,153,0.1)]">
                      <TrendingUp className="w-8 h-8 text-[#00e599]" />
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">Speculator</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00e599] bg-[#00e599]/10 px-2 py-0.5 rounded-full border border-[#00e599]/30">Common</span>
                  </div>

                  <div className="flex flex-col items-center text-center w-full md:w-1/3 relative group opacity-50 cursor-not-allowed grayscale hover:grayscale-0 transition-all">
                    <div className="w-20 h-20 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Flame className="w-8 h-8 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]">
                        <Lock className="w-2.5 h-2.5 text-gray-400" />
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">Risk Taker</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Common</span>
                  </div>
                </div>

                {/* Row 2 (4 Items) */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between mb-12 md:mb-24 gap-12 md:gap-0">
                  <div className="flex flex-col items-center text-center w-full md:w-1/4 relative opacity-50 grayscale">
                    <div className="w-16 h-16 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Target className="w-6 h-6 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-[13px] mb-1.5">Opportunity Hunter</h4>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Rare</span>
                  </div>

                  <div className="flex flex-col items-center text-center w-full md:w-1/4 relative opacity-50 grayscale">
                    <div className="w-16 h-16 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Activity className="w-6 h-6 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-[13px] mb-1.5">Position Architect</h4>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Rare</span>
                  </div>

                  <div className="flex flex-col items-center text-center w-full md:w-1/4 relative opacity-50 grayscale">
                    <div className="w-16 h-16 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Shield className="w-6 h-6 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-[13px] mb-1.5">Capital Commander</h4>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Epic</span>
                  </div>

                  <div className="flex flex-col items-center text-center w-full md:w-1/4 relative opacity-50 grayscale">
                    <div className="w-16 h-16 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Zap className="w-6 h-6 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-[13px] mb-1.5">Volatility Rider</h4>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Epic</span>
                  </div>
                </div>

                {/* Row 3 (2 Items) */}
                <div className="relative z-10 flex flex-col md:flex-row justify-center mb-8 gap-12 md:gap-32">
                  <div className="flex flex-col items-center text-center relative opacity-50 grayscale">
                    <div className="w-20 h-20 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <span className="text-2xl font-serif text-gray-500 italic font-bold">α</span>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">Alpha Generator</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Epic</span>
                  </div>

                  <div className="flex flex-col items-center text-center relative opacity-50 grayscale">
                    <div className="w-20 h-20 rounded-full border border-[#333] bg-[#111] flex items-center justify-center mb-3 relative z-10">
                      <Trophy className="w-8 h-8 text-gray-500" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#0a0c0f]"><Lock className="w-2.5 h-2.5 text-gray-400" /></div>
                    </div>
                    <h4 className="text-white font-bold text-base mb-1.5">Yield Conqueror</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333]">Legendary</span>
                  </div>
                </div>

              </div>

              {/* Informational Disclaimer */}
              <div className="mt-8 flex items-center gap-3 p-4 bg-[#050505] rounded-xl border border-[#1a1f26]">
                <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center shrink-0">
                  <span className="text-gray-400 text-xs italic font-serif">i</span>
                </div>
                <p className="text-gray-400 text-sm">Badges must be completed in order. Each badge unlocks the next milestone.</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12">
            {tasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "card-base p-4 md:p-5 flex items-center gap-4 group transition-all duration-300",
                task.completed ? "border-[#34d399]/20 bg-[#34d399]/[0.02]" : "hover:border-[#333] hover:bg-[#111]/50"
              )}
            >
              <div className="shrink-0 relative">
                {task.completed ? (
                  <div className="relative">
                    <CheckCircle2 className="w-7 h-7 text-[#34d399] relative z-10" />
                    <div className="absolute inset-0 bg-[#34d399] blur-md opacity-30 rounded-full" />
                  </div>
                ) : (
                  <Circle className="w-7 h-7 text-gray-700 group-hover:text-gray-500 transition-colors" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-bold text-[15px] truncate transition-colors",
                  task.completed ? "text-gray-300 line-through decoration-gray-600" : "text-gray-200 group-hover:text-white"
                )}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={cn(
                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider",
                    task.completed ? "text-gray-500 bg-[#1a1a1a]" : "text-[#fbbf24] bg-[#fbbf24]/10"
                  )}>
                    <Star className="w-3 h-3" />
                    +{task.xp} XP
                  </div>
                </div>
              </div>

              {!task.completed && (
                <button className="btn-primary py-1.5 px-4 text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Go
                </button>
              )}
            </div>
          ))}
        </div>
        )}

      </div>
    </div>
  );
}
