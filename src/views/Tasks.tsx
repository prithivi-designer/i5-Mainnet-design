'use client';

import { useState } from 'react';
import { Target, CheckCircle2, Circle, Trophy, Star, Gift, Clock, ShieldCheck, TrendingUp, DollarSign, Award, Lock, Activity, Flame, Layers, Shield } from 'lucide-react';
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

  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar bg-[#050505] relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#34d399]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#34d399]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl w-full mx-auto p-6 md:p-8 relative z-10 flex-1 flex flex-col font-sans">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#34d399]/10 border border-[#34d399]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#34d399]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8e8e8] to-[#999] tracking-tight">
                Missions & Referrals
              </h1>
            </div>
            <p className="text-gray-400 text-[15px] max-w-lg mt-3 leading-relaxed">
              Complete your daily and weekly trading tasks to earn XP. Accumulate XP to unlock premium tiers, fee discounts, and exclusive AI agent tools, and earn up to 70% fee share by referring users.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4 bg-[#0a0a0a] border border-[#1a1a1a] p-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 px-3 border-r border-[#222]">
              <div className="w-8 h-8 rounded-full bg-[#fbbf24]/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#fbbf24]" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total XP</div>
                <div className="text-white font-bold text-lg">12,450</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 rounded-full bg-[#34d399]/10 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[#34d399]" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Tier</div>
                <div className="text-white font-bold text-lg">Pro Trader</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Progress */}
        <div className="mb-6 card-base p-1 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap w-full md:w-auto p-1 bg-[#050505] rounded-xl border border-[#1a1a1a] gap-1">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                "flex-1 md:w-[110px] lg:w-[125px] py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'daily' ? "bg-[#34d399]/10 text-[#34d399] shadow-sm" : "text-gray-500 hover:text-white"
              )}
            >
              <Clock className="w-3.5 h-3.5" /> Daily Tasks
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={cn(
                "flex-1 md:w-[110px] lg:w-[125px] py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'weekly' ? "bg-[#34d399]/10 text-[#34d399] shadow-sm" : "text-gray-500 hover:text-white"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Weekly Tasks
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={cn(
                "flex-1 md:w-[110px] lg:w-[125px] py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'referrals' ? "bg-[#34d399]/10 text-[#34d399] shadow-sm" : "text-gray-500 hover:text-white"
              )}
            >
              <Gift className="w-3.5 h-3.5" /> Referrals
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={cn(
                "flex-1 md:w-[110px] lg:w-[125px] py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
                activeTab === 'badges' ? "bg-[#34d399]/10 text-[#34d399] shadow-sm" : "text-gray-500 hover:text-white"
              )}
            >
              <Award className="w-3.5 h-3.5" /> Badges
            </button>
          </div>

          <div className="w-full md:w-[260px] flex flex-col gap-2 px-4 md:px-0">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-400 uppercase tracking-wider">Progress</span>
              {activeTab === 'badges' ? (
                <span className="text-[#34d399]">{completedBadgesCount} / {BADGES.length} ({badgesProgressPercent}%)</span>
              ) : activeTab === 'referrals' ? (
                <span className="text-[#34d399]">0%</span>
              ) : (
                <span className="text-[#34d399]">{completedCount} / {tasks.length} ({progressPercent}%)</span>
              )}
            </div>
            <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden border border-[#222]">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ 
                  width: `${activeTab === 'badges' ? badgesProgressPercent : activeTab === 'referrals' ? 0 : progressPercent}%`,
                  background: 'linear-gradient(90deg, #10b981, #34d399)'
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:16px_16px] animate-[shimmer_2s_linear_infinite]" />
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
                  Reach $10K in trading volume on HyperLiquid
                </h4>
                <p className="text-gray-400 text-[15px]">
                  to create a referral link
                </p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#111] border border-[#222] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#34d399] h-full rounded-full w-[0%]" />
                  </div>
                  <span className="text-white text-xl font-medium shrink-0">$10K</span>
                </div>
                <p className="text-gray-400 text-[15px]">
                  $10,000.00 left to unlock this feature
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
            
            {/* Stats header card */}
            <div className="card-base p-6 border border-[#222] bg-[#0c0c0c] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Your Achievements & Badges</h3>
                <p className="text-sm text-gray-400">Unlock unique status badges by completing milestones and trading.</p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Badges Unlocked</div>
                  <div className="text-3xl font-black text-[#34d399] font-mono">{completedBadgesCount} <span className="text-gray-600 text-lg">/ {BADGES.length}</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Completion</div>
                  <div className="text-3xl font-black text-white font-mono">{badgesProgressPercent}%</div>
                </div>
              </div>
            </div>

            {/* Badges grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BADGES.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <div 
                    key={badge.id}
                    className={cn(
                      "card-base p-6 flex flex-col items-center text-center transition-all duration-300 relative group overflow-hidden border",
                      badge.unlocked 
                        ? "border-[#15181C] bg-[#0b0e13]/40 hover:border-[#34d399]/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.05)]" 
                        : "border-[#15181C]/50 bg-[#0a0a0a]/20 opacity-55 hover:opacity-75"
                    )}
                  >
                    
                    {/* Glow effect for unlocked */}
                    {badge.unlocked && (
                      <div 
                        className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] blur-[40px] rounded-full opacity-20 pointer-events-none transition-transform group-hover:scale-125"
                        style={{ backgroundColor: badge.color }}
                      />
                    )}

                    {/* Badge Icon container */}
                    <div className="relative mb-5 flex items-center justify-center">
                      {typeof BadgeIcon === 'string' ? (
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105"
                          style={{
                            background: badge.unlocked ? `radial-gradient(circle, ${badge.color}15 0%, transparent 70%)` : 'none',
                          }}
                        >
                          <img 
                            src={BadgeIcon} 
                            alt={badge.name} 
                            className={cn(
                              "w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(0,216,255,0.4)]",
                              !badge.unlocked && "grayscale opacity-40"
                            )} 
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: badge.unlocked ? `${badge.color}10` : '#111',
                            borderColor: badge.unlocked ? `${badge.color}40` : '#222',
                            boxShadow: badge.unlocked ? `0 0 15px ${badge.color}15` : 'none'
                          }}
                        >
                          <BadgeIcon 
                            className="w-8 h-8 transition-transform duration-300"
                            style={{ color: badge.unlocked ? badge.color : '#555' }}
                          />
                        </div>
                      )}

                      {/* Lock indicator */}
                      {!badge.unlocked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shadow-lg">
                          <Lock className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span 
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: badge.unlocked ? `${badge.color}15` : '#111',
                              color: badge.unlocked ? badge.color : '#666'
                            }}
                          >
                            {badge.rarity}
                          </span>
                          {badge.unlocked && (
                            <span className="text-[10px] text-gray-500 font-medium">Unlocked</span>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                          {badge.name}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed px-2">
                          {badge.description}
                        </p>
                      </div>

                      {/* Requirement/Footer */}
                      <div className="mt-4 pt-3 border-t border-[#15181C] w-full text-[11px] font-mono text-gray-500">
                        {badge.unlocked ? (
                          <span className="text-[#34d399]">Completed</span>
                        ) : (
                          <span>Req: {badge.requirement}</span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
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
