'use client';

import { useState } from 'react';
import { Target, CheckCircle2, Circle, Trophy, Star, Gift, Clock, ShieldCheck, TrendingUp, DollarSign, Award, Lock, Activity, Flame, Layers, Shield, ChevronRight, ChevronDown, Zap, Check, Crown, Users, Copy, Share, UserPlus, Coins, User, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom high-fidelity SVG icons to match mockup
const DraftingCompassIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="5" r="1.5" />
    <path d="M12 6.5 L7 20" />
    <path d="M12 6.5 L17 20" />
    <path d="M9 15 L15 15" />
  </svg>
);

const AlphaIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 8 C16 8, 10 12, 8 14 C6 16, 4 16, 4 12 C4 8, 6 8, 8 10 C10 12, 16 16, 20 16" />
  </svg>
);

// High-fidelity glowing 3D metallic hexagon badge container
function HexagonBadge({
  icon: Icon,
  iconSrc,
  color,
  glowColor,
  locked,
  unlocked,
  size = "w-20 h-20"
}: {
  icon?: any;
  iconSrc?: string;
  color: string;
  glowColor: string;
  locked: boolean;
  unlocked: boolean;
  size?: string;
}) {
  return (
    <div className={cn("relative flex items-center justify-center select-none group", size)}>
      {/* Outer glow ring */}
      {!locked && (
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100 filter blur-md"
          style={{
            color: glowColor,
            filter: `drop-shadow(0 0 12px ${glowColor})`
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current opacity-20">
            <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" />
          </svg>
        </div>
      )}

      {/* Main SVG Badge Frame - only if NOT rendering a custom image badge */}
      {!iconSrc ? (
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          <defs>
            <linearGradient id={`grad-border-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={locked ? "#333" : "#ffffff"} stopOpacity={locked ? 0.3 : 0.8} />
              <stop offset="40%" stopColor={color} stopOpacity={locked ? 0.1 : 0.4} />
              <stop offset="60%" stopColor={color} stopOpacity={locked ? 0.1 : 0.4} />
              <stop offset="100%" stopColor={locked ? "#222" : "#000000"} stopOpacity={locked ? 0.4 : 0.9} />
            </linearGradient>
            <linearGradient id={`grad-bg-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c0e12" />
              <stop offset="100%" stopColor="#040506" />
            </linearGradient>
          </defs>

          {/* Inner Background Fill */}
          <polygon
            points="50,7 87,28.5 87,71.5 50,93 13,71.5 13,28.5"
            fill={`url(#grad-bg-${color.replace('#', '')})`}
          />

          {/* Inner Glow Border */}
          {!locked && (
            <polygon
              points="50,9 85,29.5 85,70.5 50,91 15,70.5 15,29.5"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
          )}

          {/* Main Metallic Outer Hexagon Border */}
          <polygon
            points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"
            fill="none"
            stroke={`url(#grad-border-${color.replace('#', '')})`}
            strokeWidth="3.5"
          />

          {/* Subtle Inner Bevel Hexagon Border */}
          <polygon
            points="50,7 87,28.5 87,71.5 50,93 13,71.5 13,28.5"
            fill="none"
            stroke={locked ? "#1f2937" : "#111827"}
            strokeWidth="1"
          />
        </svg>
      ) : (
        /* Image-based badge (like Scout) - needs to fill container */
        <div className="w-[85%] h-[85%] relative z-10 flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
          <img src={iconSrc} className="w-full h-full object-contain" alt="Badge Image" />
        </div>
      )}

      {/* Render Icon Content Overlay (for non-image badges) */}
      {!iconSrc && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center z-20 transition-transform duration-300 group-hover:scale-110",
          locked ? "opacity-35 grayscale" : "opacity-90"
        )}>
          {Icon ? (
            <Icon
              className="w-[38%] h-[38%]"
              style={{ color: locked ? "#4b5563" : color }}
              strokeWidth={2}
            />
          ) : null}
        </div>
      )}

      {/* Status Indicators overlay (checkmark or lock) at top-right */}
      <div className="absolute top-[2%] right-[2%] z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        {unlocked ? (
          <div className="w-5.5 h-5.5 rounded-full bg-[#00e599] border-2 border-[#0a0c0f] flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0a0c0f]" strokeWidth={3.5} />
          </div>
        ) : locked ? (
          <div className="w-5.5 h-5.5 rounded-full bg-[#161a22] border-2 border-[#0a0c0f] flex items-center justify-center">
            <Lock className="w-3 text-gray-500" strokeWidth={2.5} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
    active: false,
    icon: '/Images/Badges/scout_badge.png',
    color: '#00e599',
    glowColor: 'rgba(0, 229, 153, 0.4)',
    rarity: 'Common' as const,
  },
  {
    id: 'b2',
    name: 'Speculator',
    description: 'Execute your first trade of any size on the platform.',
    requirement: 'Complete 1 trade',
    unlocked: false,
    active: true,
    icon: '/Images/Badges/Speculator.png',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    rarity: 'Common' as const,
  },
  {
    id: 'b3',
    name: 'Risk Taker',
    description: 'Open a position with leverage greater than 10x.',
    requirement: '10x+ leverage trade',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/risk_taker.png',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    rarity: 'Common' as const,
  },
  {
    id: 'b4',
    name: 'Opportunity Hunter',
    description: 'Execute a trade following an AI Trading signal.',
    requirement: '1 AI signal trade',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/opportunity_hunter.png',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    rarity: 'Rare' as const,
  },
  {
    id: 'b5',
    name: 'Position Architect',
    description: 'Set both Stop Loss and Take Profit orders on a single position.',
    requirement: 'Bracket order set',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/position_architect.png',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    rarity: 'Rare' as const,
  },
  {
    id: 'b6',
    name: 'Capital Commander',
    description: 'Reach a lifetime trading volume of over $50,000.',
    requirement: '$50,000 trading volume',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/capital_Commander.png',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    rarity: 'Epic' as const,
  },
  {
    id: 'b7',
    name: 'Volatility Rider',
    description: 'Complete a profitable trade during high-volatility market events.',
    requirement: '1 high-vol volatility trade',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/volatality_rider.png',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    rarity: 'Epic' as const,
  },
  {
    id: 'b8',
    name: 'Alpha Generator',
    description: 'Maintain a weekly profit percentage higher than 95% of active traders.',
    requirement: 'Top 5% weekly PnL',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/alpha_generator.png',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    rarity: 'Epic' as const,
  },
  {
    id: 'b9',
    name: 'Yield Conqueror',
    description: 'Execute 100 successful trades on the platform.',
    requirement: '100 total trades',
    unlocked: false,
    active: false,
    icon: '/Images/Badges/yield_conqueror.png',
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    rarity: 'Legendary' as const,
  },
];

// --- MISSIONS DATA ---
type MissionStatus = 'completed' | 'claim' | 'locked';

interface Mission {
  id: string;
  name: string;
  reward: number;
  status: MissionStatus;
  current: number;
  target: number;
}

const TRADE_MISSIONS: Mission[] = [
  { id: 'tm1', name: 'First Trade', reward: 250, status: 'completed', current: 1, target: 1 },
  { id: 'tm2', name: '10 Trades', reward: 100, status: 'completed', current: 10, target: 10 },
  { id: 'tm3', name: '25 Trades', reward: 250, status: 'claim', current: 25, target: 25 },
  { id: 'tm4', name: '50 Trades', reward: 500, status: 'locked', current: 25, target: 50 },
  { id: 'tm5', name: '100 Trades', reward: 1000, status: 'locked', current: 25, target: 100 },
  { id: 'tm6', name: '250 Trades', reward: 1250, status: 'locked', current: 25, target: 250 },
  { id: 'tm7', name: '500 Trades', reward: 5000, status: 'locked', current: 25, target: 500 },
];

const VOLUME_MISSIONS: Mission[] = [
  { id: 'vm1', name: '$1,000 Volume', reward: 100, status: 'completed', current: 1000, target: 1000 },
  { id: 'vm2', name: '$5,000 Volume', reward: 500, status: 'completed', current: 5000, target: 5000 },
  { id: 'vm3', name: '$10,000 Volume', reward: 1000, status: 'claim', current: 10000, target: 10000 },
  { id: 'vm4', name: '$25,000 Volume', reward: 2500, status: 'locked', current: 10000, target: 25000 },
  { id: 'vm5', name: '$50,000 Volume', reward: 5000, status: 'locked', current: 10000, target: 50000 },
  { id: 'vm6', name: '$100,000 Volume', reward: 10000, status: 'locked', current: 10000, target: 100000 },
  { id: 'vm7', name: '$250,000 Volume', reward: 25000, status: 'locked', current: 10000, target: 250000 },
];

// --- Mission Card Component ---
function MissionCard({ mission }: { mission: Mission }) {
  const progress = Math.min(Math.round((mission.current / mission.target) * 100), 100);
  const isCompleted = mission.status === 'completed';
  const isClaim = mission.status === 'claim';
  const isLocked = mission.status === 'locked';

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5 transition-all duration-300",
        isCompleted
          ? "bg-[#080808] border-[#1a1a1a] opacity-60"
          : isClaim
          ? "bg-[#0c0c0c] border-[#34d399]/50 shadow-[0_0_20px_rgba(52,211,153,0.08)]"
          : "bg-[#0a0a0a] border-[#1a1a1a] opacity-40"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
            isCompleted
              ? "bg-[#111] border-[#222]"
              : isClaim
              ? "bg-[#34d399]/15 border-[#34d399]/40"
              : "bg-[#111] border-[#222]"
          )}>
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-[#34d399]" />
            ) : isLocked ? (
              <Lock className="w-4 h-4 text-gray-600" />
            ) : (
              <Star className="w-5 h-5 text-[#34d399]" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className={cn(
              "text-[15px] font-bold truncate",
              isCompleted ? "text-gray-500 line-through decoration-gray-700" : isLocked ? "text-gray-600" : "text-white"
            )}>
              {mission.name}
            </h4>
            <div className={cn(
              "text-[12px] font-semibold mt-0.5",
              isCompleted ? "text-gray-600" : isClaim ? "text-[#34d399]" : "text-gray-600"
            )}>
              {mission.current.toLocaleString()} / {mission.target.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Right side: reward or status */}
        <div className="shrink-0 flex flex-col items-end gap-1">
          {isCompleted ? (
            <span className="text-[11px] font-semibold text-gray-500 bg-[#111] border border-[#222] px-3 py-1 rounded-lg">
              Claimed
            </span>
          ) : isClaim ? (
            <button className="bg-[#34d399] hover:bg-[#2bb280] text-[#050505] font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all shadow-[0_0_12px_rgba(52,211,153,0.3)] hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]">
              Claim
            </button>
          ) : (
            <Lock className="w-4 h-4 text-gray-600" />
          )}
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold",
            isCompleted ? "text-gray-600" : isLocked ? "text-gray-600" : "text-[#fbbf24]"
          )}>
            <Coins className="w-3 h-3" />
            +{mission.reward.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#111] rounded-full overflow-hidden border border-[#1a1a1a]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative"
          style={{
            width: `${progress}%`,
            background: isCompleted
              ? '#333'
              : isLocked
              ? '#222'
              : 'linear-gradient(90deg, #10b981, #34d399)',
          }}
        />
      </div>
      <div className="flex justify-end mt-1.5">
        <span className={cn(
          "text-[10px] font-bold",
          isCompleted ? "text-gray-700" : isLocked ? "text-gray-700" : "text-[#34d399]"
        )}>
          {progress}%
        </span>
      </div>
    </div>
  );
}

export function Tasks() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'missions' | 'referrals' | 'badges'>('daily');

  const tasks = activeTab === 'daily' ? DAILY_TASKS : WEEKLY_TASKS;
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const completedBadgesCount = BADGES.filter(b => b.unlocked).length;
  const badgesProgressPercent = Math.round((completedBadgesCount / BADGES.length) * 100);

  // Define transitions for the badge journey line path
  const transitions = [
    { start: 0, end: 1, path: "M 100,45 L 300,45" },
    { start: 1, end: 2, path: "M 300,45 L 500,45" },
    { start: 2, end: 3, path: "M 500,45 L 700,45" },
    { start: 3, end: 4, path: "M 700,45 L 900,45" },
    { start: 4, end: 5, path: "M 900,45 L 940,45 A 20,20 0 0 1 960,65 L 960,210 A 20,20 0 0 1 940,230 L 60,230 A 20,20 0 0 1 40,210 L 40,170 A 20,20 0 0 1 60,150 L 300,150" },
    { start: 5, end: 6, path: "M 300,150 L 500,150" },
    { start: 6, end: 7, path: "M 500,150 L 700,150" },
    { start: 7, end: 8, path: "M 700,150 L 900,150" },
  ];

  const firstLockedIndex = BADGES.findIndex(b => !b.unlocked && !b.active);
  const activeLimit = firstLockedIndex === -1 ? BADGES.length - 1 : firstLockedIndex;

  const activePath = transitions
    .filter(t => t.start < activeLimit)
    .map(t => t.path)
    .join(' ');

  const lockedPath = transitions
    .filter(t => t.start >= activeLimit)
    .map(t => t.path)
    .join(' ');

  const connectionDots = [
    { cx: 200, cy: 45, transitionIndex: 0 },
    { cx: 400, cy: 45, transitionIndex: 1 },
    { cx: 600, cy: 45, transitionIndex: 2 },
    { cx: 800, cy: 45, transitionIndex: 3 },
    { cx: 400, cy: 150, transitionIndex: 5 },
    { cx: 600, cy: 150, transitionIndex: 6 },
    { cx: 800, cy: 150, transitionIndex: 7 },
  ];

  return (
    <div className="h-full flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-[#050505] relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#34d399]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#34d399]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto p-4 md:p-6 relative z-10 flex-1 flex flex-col font-sans">

        {/* Navigation Tabs (Moved above Header Section) */}
        <div className="flex w-full md:w-auto p-1 bg-transparent rounded-[14px] border border-[#1a1f26] gap-1 max-w-max mb-4">
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
            onClick={() => setActiveTab('missions')}
            className={cn(
              "flex-1 md:w-[110px] py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap",
              activeTab === 'missions' ? "bg-[#34d399]/10 text-[#34d399]" : "text-gray-400 hover:text-white"
            )}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Missions
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

        {/* Header Section */}
        {activeTab !== 'badges' && activeTab !== 'missions' && (
          <div className="mb-8 flex flex-col xl:flex-row items-start xl:items-start justify-between gap-6">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-3">
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
        )}

        {/* Tabs and Progress (Now just Progress, aligned to Right) */}
        {activeTab !== 'badges' && activeTab !== 'missions' && (
          <div className="mb-6 flex justify-end">
            {/* Progress Bar aligned to the right */}
            <div className="w-full md:w-[320px] flex flex-col gap-2 relative">
              <div className="flex justify-between text-xs font-bold items-center mb-1">
                <span className="text-gray-500 uppercase tracking-widest text-[10px]">Progress</span>
                {activeTab === 'referrals' ? (
                  <span className="text-[#00e599] font-mono">0%</span>
                ) : (
                  <span className="text-[#00e599] font-mono">{completedCount} / {tasks.length} ({progressPercent}%)</span>
                )}
              </div>
              <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden border border-[#222]">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{
                    width: `${activeTab === 'referrals' ? 0 : progressPercent}%`,
                    background: 'linear-gradient(90deg, #10b981, #00e599)'
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:16px_16px] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task List Grid or Referrals */}
        {activeTab === 'missions' ? (
          <div className="pb-12 mt-4">
            {/* Missions Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#00e599] shadow-[0_0_10px_#00e599]" />
                <h1 className="text-3xl md:text-[32px] font-black text-white tracking-tight leading-none">
                  Missions
                </h1>
              </div>
              <p className="text-[#a0a0a0] text-[15px] leading-relaxed">
                Complete trading milestones and volume targets to earn credit rewards. Missions unlock sequentially as you progress.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trade Missions Column */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#34d399]/10 border border-[#34d399]/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#34d399]" />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Trade Missions</h2>
                  <span className="text-[11px] text-gray-500 bg-[#111] border border-[#222] px-2 py-0.5 rounded-full font-semibold">
                    {TRADE_MISSIONS.filter(m => m.status === 'completed').length}/{TRADE_MISSIONS.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {TRADE_MISSIONS.map(mission => (
                    <MissionCard key={mission.id} mission={mission} />
                  ))}
                </div>
              </div>

              {/* Volume Missions Column */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-[#fbbf24]" />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Volume Missions</h2>
                  <span className="text-[11px] text-gray-500 bg-[#111] border border-[#222] px-2 py-0.5 rounded-full font-semibold">
                    {VOLUME_MISSIONS.filter(m => m.status === 'completed').length}/{VOLUME_MISSIONS.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {VOLUME_MISSIONS.map(mission => (
                    <MissionCard key={mission.id} mission={mission} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="mt-8 flex items-center gap-3 p-4 bg-[#050505]/60 rounded-2xl border border-[#1a1f26]">
              <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center shrink-0">
                <span className="text-gray-400 text-xs italic font-serif">i</span>
              </div>
              <p className="text-gray-400 text-xs">Missions unlock sequentially. Complete the current mission to unlock the next one. Credits are awarded upon claiming.</p>
            </div>
          </div>
        ) : activeTab === 'referrals' ? (
          <div className="flex flex-col gap-4 mt-4 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 items-stretch">
              {/* Left Block */}
              <div className="card-base p-8 border border-[#222] bg-[#0c0c0c] rounded-2xl flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-[#34d399]" />
                  <h2 className="text-xl font-bold tracking-tight text-white">i5 Multi-Tier Referrals</h2>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
                  Earn More Together <br />
                  <span className="text-[#34d399]">With i5 Referrals</span>
                </h3>
                
                <p className="text-gray-400 text-[16px] mb-8 leading-relaxed max-w-md">
                  Invite, trade, and build a powerful network. <br />
                  You earn. Your team earns. Everyone wins.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="text-[14px] font-semibold text-white">Your Referral Link</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#050505] border border-[#222] rounded-xl flex items-center justify-between px-4 py-3">
                      <span className="text-[#34d399] font-mono text-[15px] truncate">https://i5.finance/ref?code=ABC123</span>
                      <button className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#050505] border border-[#222] rounded-xl p-5 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                      <User className="w-5 h-5" />
                      <span className="text-[13px]">Total Referrals</span>
                    </div>
                    <div className="text-3xl font-bold text-[#34d399]">128</div>
                  </div>
                  <div className="bg-[#050505] border border-[#222] rounded-xl p-5 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                      <Coins className="w-5 h-5" />
                      <span className="text-[13px]">Total Points Earned</span>
                    </div>
                    <div className="text-3xl font-bold text-[#34d399]">24,750</div>
                  </div>
                </div>

                <button className="w-full bg-[#111] border border-[#222] hover:bg-[#1a1a1a] text-[#34d399] font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-auto shadow-[0_0_20px_rgba(52,211,153,0.05)] hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                  <Share className="w-5 h-5" />
                  Share Now & Earn
                </button>
              </div>

              {/* Right Block */}
              <div className="flex flex-col gap-4 h-full">
                {/* Instant Referral Reward */}
                <div className="card-base p-6 border border-[#222] bg-[#0c0c0c] rounded-2xl flex items-center gap-5 h-[140px]">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6 text-[#34d399]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-white mb-2">Instant Referral Reward</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed">
                      Earn 500 points for every successful referral<br/>when they complete onboarding.
                    </p>
                  </div>
                  <div className="text-right shrink-0 px-2">
                    <div className="text-3xl font-bold text-[#34d399]">500</div>
                    <div className="text-[11px] text-[#34d399] font-semibold tracking-wider uppercase mt-1">POINTS</div>
                  </div>
                </div>

                {/* Multi-Tier Rewards */}
                <div className="card-base p-6 border border-[#222] bg-[#0c0c0c] rounded-2xl flex flex-col md:flex-row gap-6 h-[170px]">
                  <div className="flex-[1.2] flex flex-col justify-center">
                    <h3 className="text-[16px] font-bold text-white mb-3">Multi-Tier Rewards</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed">
                      Earn a percentage of the points your referrals<br/>earn from trading and platform activities.
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-300 text-[14px]">
                        <User className="w-4 h-4 text-[#34d399]" />
                        <span>Tier 1 (Direct)</span>
                      </div>
                      <span className="text-[#34d399] font-bold text-[16px]">5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-300 text-[14px]">
                        <User className="w-4 h-4 text-yellow-400" />
                        <span>Tier 2</span>
                      </div>
                      <span className="text-[#34d399] font-bold text-[16px]">2.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-300 text-[14px]">
                        <User className="w-4 h-4 text-orange-500" />
                        <span>Tier 3</span>
                      </div>
                      <span className="text-[#34d399] font-bold text-[16px]">1%</span>
                    </div>
                  </div>
                </div>

                {/* How It Works */}
                <div className="card-base p-6 border border-[#222] bg-[#0c0c0c] rounded-2xl flex-1">
                  <h3 className="text-[16px] font-bold text-white mb-5">How It Works</h3>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0 border border-[#222]">
                        <UserPlus className="w-4 h-4 text-[#34d399]" />
                      </div>
                      <span className="text-gray-300 text-[14px]">Invite friends using your referral link.</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0 border border-[#222]">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-gray-300 text-[14px]">They trade and earn points through activities.</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#111] flex items-center justify-center shrink-0 border border-[#222]">
                        <Gift className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300 text-[14px]">You earn rewards across 3 tiers automatically!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="card-base p-5 border border-[#222] bg-[#0c0c0c] rounded-2xl flex items-center justify-between mt-1">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#34d399]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#34d399] mb-1">Fair. Transparent. Sustainable.</h3>
                  <p className="text-gray-400 text-[13px]">Rewards are calculated from base points only. No rewards are generated on rewards.</p>
                </div>
              </div>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px] flex items-center gap-1 shrink-0 px-4">
                Learn more <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : activeTab === 'badges' ? (
          <div className="space-y-4 pb-4 mt-2">

            {/* SECTION 1: Current Badge Hero Info (No outer card border) */}
            <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-8 py-2">
              {/* Left Side: Large Scout Badge with glowing rim */}
              <div className="relative shrink-0 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
                <img
                  src="/Images/Badges/scout_badge.png"
                  alt="Scout Badge"
                  className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_35px_rgba(0,229,153,0.45)] relative z-10"
                />
                {/* Decorative glowing rim behind the badge */}
                <div className="absolute inset-0 rounded-full scale-[1.1] bg-[radial-gradient(circle,rgba(0,229,153,0.15)_0%,transparent_75%)] animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Dotted target rings */}
                <div className="absolute inset-0 border border-[#00e599]/15 rounded-full scale-[1.12] border-dashed" />
                <div className="absolute inset-0 border border-[#00e599]/5 rounded-full scale-[1.22] border-dashed" />
              </div>

              {/* Right Side: Badge Info */}
              <div className="flex-1 w-full flex flex-col justify-between">
                <div>
                  {/* CURRENT BADGE Header with dashes */}
                  <div className="flex items-center gap-3 mb-2 text-[#00e599]/85">
                    <span className="w-5 h-[1.5px] bg-[#00e599]/40" />
                    <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase">Current Badge</span>
                    <span className="w-5 h-[1.5px] bg-[#00e599]/40" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 leading-none">
                    Scout
                  </h2>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#00e599]/10 text-[#00e599] border border-[#00e599]/30 px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-[0_0_12px_rgba(0,229,153,0.15)]">
                      Legendary
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-2 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] shadow-[0_0_8px_#00e599]" /> Current Tier
                    </span>
                  </div>

                  <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-md mb-4">
                    Level up past the novice tiers by accumulating EP.
                  </p>
                </div>

                {/* Stats Breakdown Row */}
                <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center border border-[#1a1f26] bg-[#080a0d] rounded-xl p-4 gap-6 relative">
                  {/* XP Earned */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/5 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.08)]">
                      <Star className="w-5 h-5 text-[#fbbf24]" fill="none" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">XP Earned</div>
                      <div className="text-2xl font-black text-white leading-none font-mono">12,450</div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden sm:block h-10 w-[1px] bg-[#1a1f26]" />

                  {/* Next Unlock */}
                  <div className="flex-1 flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      {/* Small Hexagon Badge for Speculator */}
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <HexagonBadge
                          icon={TrendingUp}
                          color="#10b981"
                          glowColor="transparent"
                          locked={false}
                          unlocked={false}
                          size="w-12 h-12"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Next Unlock</div>
                        <div className="text-base font-black text-white group-hover:text-[#00e599] transition-colors leading-none mb-1">Speculator</div>
                        <div className="inline-block text-[8px] font-extrabold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          Common
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Progress to Speculator (Card Box) */}
            <div className="card-base p-5 border border-[#1a1f26] bg-[#0a0c0f]/80 backdrop-blur-md rounded-2xl relative overflow-hidden">
              <h3 className="text-xs font-black text-[#00e599] uppercase tracking-[0.15em] mb-6">
                XP Progress to Speculator
              </h3>

              {/* Progress Bar Container */}
              <div className="flex items-center gap-4 mb-8">
                {/* Current Badge (Scout) */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-6 h-6 rounded-full border-[3px] border-[#00e599] bg-[#00e599]/10 shadow-[0_0_12px_rgba(0,229,153,0.3)]" />
                  <div>
                    <div className="text-[13px] font-bold text-white leading-tight">Scout</div>
                    <div className="text-[10px] text-[#00e599] font-medium leading-tight">Current</div>
                  </div>
                </div>

                {/* Progress Bar Line */}
                <div className="flex-1 relative h-1.5 bg-[#1c232e] rounded-full mx-1">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#00e599] rounded-full shadow-[0_0_10px_#00e599]" style={{ width: '80%' }} />
                  {/* Thumb / Diamond */}
                  <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: '80%' }}>
                    <div className="w-3.5 h-3.5 bg-[#00e599] rotate-45 shadow-[0_0_12px_#00e599]" />
                    <div className="absolute top-5 text-[11px] font-bold text-[#00e599]">80%</div>
                  </div>
                  {/* Small gray circle at the end of the line */}
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-gray-500 bg-[#0a0c0f]" />
                </div>

                {/* Next Badge (Speculator) */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative flex items-center justify-center">
                    <HexagonBadge
                      icon={TrendingUp}
                      color="#10b981"
                      glowColor="transparent"
                      locked={false}
                      unlocked={false}
                      size="w-10 h-10"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white leading-tight">Speculator</div>
                    <div className="text-[10px] text-gray-400 font-medium leading-tight">Unlock</div>
                  </div>
                </div>
              </div>

              {/* Bottom Text Row */}
              <div className="grid grid-cols-3 items-center text-[11px] text-gray-400 border-t border-[#1a1f26]/60 pt-4 px-1">
                <div className="text-left font-medium">
                  <span className="text-[#00e599] font-mono font-bold">12,000 XP</span> / 15,000 XP
                </div>
                <div className="text-center font-medium">
                  <span className="text-[#00e599] font-mono font-bold">3,000 XP</span> remaining
                </div>
                <div className="text-right font-medium">
                  80% to next unlock
                </div>
              </div>
            </div>

            {/* SECTION 3: Badge Journey */}
            <div className="card-base p-4 md:p-5 border border-[#1a1f26] bg-[#0a0c0f]/80 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xs font-black text-[#00e599] uppercase tracking-[0.2em] mb-1">Badge Journey</h3>
                  <p className="text-gray-400 text-xs">Complete badges in order to unlock the next tier.</p>
                </div>
                <div className="flex items-center gap-2 border border-[#1a1f26] bg-[#080a0d] px-3.5 py-2 rounded-xl cursor-pointer hover:bg-[#11161d] transition-colors">
                  <span className="text-xs font-bold text-gray-300">All Status</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Journey Map Layout */}
              <div className="relative max-w-4xl mx-auto py-2">

                {/* Desktop Journey Layout (Visible on Desktop only) */}
                <div className="hidden md:block relative h-[260px] w-full mt-2">
                  {/* Responsive Dotted Connecting Lines Background */}
                  <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 1000 260" preserveAspectRatio="none" style={{ pointerEvents: "none" }}>
                      {/* Active/Completed line */}
                      {activePath && (
                        <path
                          d={activePath}
                          stroke="#00e599"
                          strokeWidth="2.5"
                          strokeDasharray="5, 5"
                          fill="none"
                        />
                      )}
                      {/* Locked line */}
                      {lockedPath && (
                        <path
                          d={lockedPath}
                          stroke="#1c232e"
                          strokeWidth="2"
                          strokeDasharray="5, 5"
                          fill="none"
                        />
                      )}

                      {/* Connection Dots */}
                      {connectionDots.map((dot, idx) => {
                        const isActive = dot.transitionIndex < activeLimit;
                        return (
                          <circle
                            key={idx}
                            cx={dot.cx}
                            cy={dot.cy}
                            r={isActive ? 4.5 : 4}
                            fill="#050505"
                            stroke={isActive ? "#00e599" : "#1c232e"}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Badges Absolute Placement */}
                  {BADGES.map((badge, idx) => {
                    // Helper to calculate center percentages
                    const getBadgePosition = (index: number) => {
                      if (index < 5) {
                        return { left: `${index * 20 + 10}%`, top: '45px' };
                      } else {
                        return { left: `${(index - 5) * 20 + 30}%`, top: '150px' };
                      }
                    };

                    const getRarityColorClasses = (rarity: string) => {
                      switch (rarity.toLowerCase()) {
                        case 'legendary':
                          return 'border-[#00e599]/30 text-[#00e599] bg-[#00e599]/5';
                        case 'epic':
                          return 'border-[#eab308]/30 text-[#eab308] bg-[#eab308]/5';
                        case 'rare':
                          return 'border-[#8b5cf6]/30 text-[#8b5cf6] bg-[#8b5cf6]/5';
                        default:
                          return 'border-[#10b981]/30 text-[#10b981] bg-[#10b981]/5'; // Common
                      }
                    };

                    const pos = getBadgePosition(idx);
                    const isLocked = !badge.unlocked && !badge.active;
                    return (
                      <div
                        key={badge.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center group cursor-pointer z-10 w-32 h-[60px]"
                        style={{ left: pos.left, top: pos.top }}
                      >
                        <HexagonBadge
                          icon={typeof badge.icon !== 'string' ? badge.icon : undefined}
                          iconSrc={typeof badge.icon === 'string' ? badge.icon : undefined}
                          color={badge.color}
                          glowColor={badge.glowColor}
                          locked={isLocked}
                          unlocked={badge.unlocked}
                          size="w-[60px] h-[60px]"
                        />
                        <div className="absolute top-[65px] w-32 flex flex-col items-center text-center">
                          <h4 className={cn(
                            "font-bold text-xs transition-colors tracking-tight truncate w-full px-1",
                            badge.unlocked || badge.active ? "text-white" : "text-gray-400"
                          )}>
                            {badge.name}
                          </h4>
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1.5 transition-colors",
                            badge.unlocked || badge.active
                              ? getRarityColorClasses(badge.rarity)
                              : "text-gray-500 bg-[#161a22]/50 border-gray-800"
                          )}>
                            {badge.rarity}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Journey Layout (Visible on Mobile only) */}
                <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4 py-4 relative z-10">
                  {BADGES.map((badge) => {
                    const isLocked = !badge.unlocked && !badge.active;

                    const getRarityColorClasses = (rarity: string) => {
                      switch (rarity.toLowerCase()) {
                        case 'legendary':
                          return 'border-[#00e599]/30 text-[#00e599] bg-[#00e599]/5';
                        case 'epic':
                          return 'border-[#eab308]/30 text-[#eab308] bg-[#eab308]/5';
                        case 'rare':
                          return 'border-[#8b5cf6]/30 text-[#8b5cf6] bg-[#8b5cf6]/5';
                        default:
                          return 'border-[#10b981]/30 text-[#10b981] bg-[#10b981]/5'; // Common
                      }
                    };

                    return (
                      <div key={badge.id} className="flex flex-col items-center text-center group">
                        <HexagonBadge
                          icon={typeof badge.icon !== 'string' ? badge.icon : undefined}
                          iconSrc={typeof badge.icon === 'string' ? badge.icon : undefined}
                          color={badge.color}
                          glowColor={badge.glowColor}
                          locked={isLocked}
                          unlocked={badge.unlocked}
                          size="w-[60px] h-[60px]"
                        />
                        <h4 className={cn(
                          "font-bold text-xs mt-3 transition-colors",
                          badge.unlocked || badge.active ? "text-white" : "text-gray-400"
                        )}>
                          {badge.name}
                        </h4>
                        <span className={cn(
                          "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1.5",
                          badge.unlocked || badge.active
                            ? getRarityColorClasses(badge.rarity)
                            : "text-gray-500 bg-[#161a22]/50 border-gray-800"
                        )}>
                          {badge.rarity}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Informational Disclaimer */}
              <div className="mt-8 flex items-center gap-3 p-4 bg-[#050505]/60 rounded-2xl border border-[#1a1f26]">
                <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center shrink-0">
                  <span className="text-gray-400 text-xs italic font-serif">i</span>
                </div>
                <p className="text-gray-400 text-xs">Badges must be completed in order. Each badge unlocks the next milestone.</p>
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
