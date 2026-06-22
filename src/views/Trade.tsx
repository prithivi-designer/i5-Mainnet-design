'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, Settings, Camera, BookOpen, Scale, Skull, Target,
  Filter, Share2, X, Send, TrendingUp, Bell, Sparkles, Bot, Settings2, ArrowRightLeft, User, Search, SlidersHorizontal, Info, CheckCircle2, ShieldAlert, Wallet, CreditCard, ChevronRight, Play, Check, Zap, Star, Activity, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

// ─── Chart mock data ────────────────────────────────────────────────────────
const mockChartData = Array.from({ length: 150 }).map((_, i) => {
  const isUp = Math.random() > 0.5;
  const base = 20000 + Math.sin(i / 10) * 10000 + i * 100;
  return { time: i, price: base + Math.random() * 2000 * (isUp ? 1 : -1), isUp };
});

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-[#1a1a1a] border border-[#333] p-2 rounded text-xs font-mono shadow-xl">
        <div className={d.isUp ? 'text-[#34d399]' : 'text-[#fa6432]'}>
          Price: ${d.price.toFixed(3)}
        </div>
      </div>
    );
  }
  return null;
};

const mockOrderbookAsks = [
  { price: 42.610, size: '142.5K', total: '422.7K' },
  { price: 42.600, size: '210.7K', total: '280.2K' },
  { price: 42.590, size: '44.0K', total: '69.6K' },
  { price: 42.580, size: '25.1K', total: '25.6K' },
  { price: 42.570, size: '470', total: '470' },
];
const mockOrderbookBids = [
  { price: 42.560, size: '32.8K', total: '32.8K' },
  { price: 42.550, size: '43.7K', total: '76.5K' },
  { price: 42.540, size: '59.7K', total: '136.2K' },
  { price: 42.530, size: '55.3K', total: '191.5K' },
  { price: 42.520, size: '119.0K', total: '310.5K' },
];
const mockPositions = [
  { id: '0x082e...ca88', notional: '$58.94M', entry: '$38.676', liq: '$33.638', pnl: '+$5.56M', funding: '-$2.34M', accountValue: '$14.84M' },
  { id: '0x4f9b...2e3f', notional: '$10.25M', entry: '$35.331', liq: '$29.099', pnl: '+$1.77M', funding: '-$134.19K', accountValue: '$3.62M' },
  { id: '0x051c...693c', notional: '$4.1M', entry: '$26.134', liq: '$3.6253', pnl: '+$1.59M', funding: '-$94.47K', accountValue: '$4.69M' },
  { id: '0xa9b9...3bbd', notional: '$21.08M', entry: '$39.634', liq: '$36.734', pnl: '+$1.52M', funding: '-$182.25K', accountValue: '$4.25M' },
  { id: '0x6666...23f5', notional: '$19.22M', entry: '$39.811', liq: '$32.637', pnl: '+$1.3M', funding: '-$175.32K', accountValue: '$5.27M' },
];

// ─── Chat types & data ───────────────────────────────────────────────────────
interface ChatMsg { id: number; role: 'ai' | 'user'; content: string; }

const INITIAL_MSGS: ChatMsg[] = [{
  id: 1, role: 'ai',
  content: "A&S AI Co-Pilot Online 🟢 — I'm monitoring your trading desk. I can analyze charts, evaluate leverage, plan breakout DCA strategies, or execute commands from your text input!",
}];

const AI_REPLIES = [
  'HYPE/USD shows a bullish engulfing pattern at the $42.50 support zone. RSI is oversold. Consider a long entry with TP at $44.20 and SL at $41.80.',
  'Risk matrix evaluated. Your current leverage is moderate at 10x. I recommend reducing to 8x and tightening your stop to $41.80 to protect margin.',
  'Grid agent ready. Optimal range: $41.00–$44.00 with 12 grids. Expected yield per cycle: ~0.8% based on current 24h volatility.',
  'DCA zones calculated: entry at $42.20 / $41.80 / $41.40 with equal sizing. This reduces your average entry by ~$0.60 vs spot.',
  'Volume spike detected (+340% vs avg) on 1H. Breakout signal toward $45.00. Watch the $43.50 resistance for confirmation.',
  'Funding rate is 0.0013% — neutral. No funding squeeze risk in the next 4h. Good time to hold or add to long.',
];

// ─── Main Trade View ─────────────────────────────────────────────────────────
export function Trade() {
  const [side, setSide] = useState<'Long' | 'Short'>('Long');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'PRO'>('MARKET');

  const [tradeMode, setTradeMode] = useState<'autopilot' | 'copilot' | 'manual'>('manual');
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MSGS);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState('100');
  const [tradeStyle, setTradeStyle] = useState('Day');
  const [strategy, setStrategy] = useState('Max Gain');

  // Autopilot Modals State
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Autopilot Configuration State
  const [selectedStrategy, setSelectedStrategy] = useState('Sharpe Guard V2');
  const [configTab, setConfigTab] = useState<'Introduction' | 'Configuration'>('Introduction');
  const [drawdownLimit, setDrawdownLimit] = useState(50);
  const [overviewAccepted, setOverviewAccepted] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, tradeMode]);

  const sendMsg = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages(p => [...p, { id: Date.now(), role: 'user', content }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, {
        id: Date.now() + 1,
        role: 'ai',
        content: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)],
      }]);
      setTyping(false);
    }, 900 + Math.random() * 700);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div className="h-full bg-[#0a0a0a] text-gray-300 font-mono text-[11px] overflow-hidden flex flex-col pt-2">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-4 pb-2 border-b border-[#222] shrink-0">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-5 h-5 rounded-full bg-[#34d399]/20 flex items-center justify-center border border-[#34d399]/50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
              </div>
              <span className="text-white font-bold text-sm tracking-wider">HYPE</span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-center gap-6">
              {[
                ['Mark', '$42.563', 'text-white'],
                ['24H Change', '+3.336 / +8.50%', 'text-[#34d399]'],
                ['24H Volume', '$426.1M', 'text-white'],
                ['Open Interest', '$925.0M', 'text-white'],
              ].map(([label, value, cls]) => (
                <div key={label}>
                  <div className="text-gray-500 mb-0.5 uppercase text-[10px]">{label}</div>
                  <div className={`font-medium text-sm ${cls}`}>{value}</div>
                </div>
              ))}
              <div>
                <div className="text-gray-500 mb-0.5 uppercase text-[10px]">Funding/Countdown</div>
                <div className="font-medium text-sm">
                  <span className="text-[#34d399]">0.0013%</span> 00:05:28
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] text-gray-300 hover:text-white hover:border-[#444] transition-all text-[11px] font-semibold">
              <Bell className="w-3 h-3" />
              Set Alert
            </button>
          </div>
        </div>

        {/* ── Main Body ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* Chart + Positions */}
          <div className="flex-1 flex flex-col border-r border-[#222] min-w-0">
            {/* Chart header */}
            <div className="h-10 border-b border-[#222] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  {['1m', '5m', '15m', '1h'].map(t => (
                    <button key={t} className="hover:text-white">{t}</button>
                  ))}
                  <button className="text-white font-bold">D</button>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="w-px h-4 bg-[#333]" />
                <div className="flex items-center gap-3">
                  <button className="hover:text-white flex items-center justify-center w-5 h-5">
                    <div className="w-2 h-4 border border-current rounded-sm" />
                  </button>
                  <button className="hover:text-white flex items-center gap-1.5 font-sans text-xs">
                    <span>fx</span> Indicators
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 font-sans text-xs text-gray-400">
                <button className="hover:text-white flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Hide Marks</button>
                <button className="hover:text-white flex items-center gap-1.5"><Camera className="w-3 h-3" /> View as</button>
                <button className="hover:text-white"><Settings className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Chart */}
            <div className="flex-1 relative bg-[#0d0d0d] p-2 min-h-[300px]">
              <div className="absolute top-2 left-4 z-10 flex gap-2 font-mono text-[10px]">
                <span className="text-white">HYPE/USD • 1D</span>
                {[['O', '38.817'], ['H', '42.837'], ['L', '38.164'], ['C', '42.567']].map(([l, v]) => (
                  <span key={l} className="text-gray-500">{l}<span className="text-[#34d399]">{v}</span></span>
                ))}
                <span className="text-[#34d399]">3.7490 (+9.66%)</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fontSize: 10, fill: '#666' }}
                    axisLine={false} tickLine={false} tickFormatter={v => v.toFixed(0)} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="price" stroke="#34d399" fill="url(#cp)" strokeWidth={1.5} fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom tabs */}
            <div className="h-[220px] border-t border-[#222] bg-[#0a0a0a] flex flex-col shrink-0">
              <div className="flex items-center justify-between border-b border-[#222] px-4">
                <div className="flex font-sans text-[11px] font-bold text-gray-500 uppercase tracking-widest gap-6 pt-3 overflow-x-auto no-scrollbar">
                  {['Positions', 'Copytrade', 'Balances', 'Open Orders', 'TWAP', 'History', 'Top Traders', 'Cohorts'].map((t, i) => (
                    <button key={t}
                      className={cn('pb-3 whitespace-nowrap', i === 6 ? 'text-white border-b-2 border-white' : 'hover:text-white')}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pl-4 shrink-0">
                  <div className="flex items-center bg-[#1a1a1a] rounded px-1 py-0.5 text-[10px]">
                    <button className="bg-[#333] text-white px-2 py-0.5 rounded">All</button>
                    <button className="px-2 py-0.5 text-gray-400">Long <span className="text-[#34d399]">7717</span></button>
                    <button className="px-2 py-0.5 text-gray-400">Short <span className="text-[#fa6432]">4532</span></button>
                  </div>
                  <button className="text-gray-400 hover:text-white"><Filter className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-right table-fixed">
                  <thead className="sticky top-0 bg-[#0a0a0a] z-10 text-gray-500 uppercase text-[10px] tracking-wider border-b border-[#222]">
                    <tr>
                      <th className="py-2.5 pl-4 px-2 font-normal text-left w-[140px]">Address</th>
                      <th className="py-2.5 px-2 font-normal">Notional</th>
                      <th className="py-2.5 px-2 font-normal">Entry</th>
                      <th className="py-2.5 px-2 font-normal">Liquidation</th>
                      <th className="py-2.5 px-2 font-normal">Unrealized PNL</th>
                      <th className="py-2.5 px-2 font-normal">Funding</th>
                      <th className="py-2.5 pr-4 px-2 font-normal">Account Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPositions.map((pos, i) => (
                      <tr key={i} className="border-b border-[#1a1a1a] hover:bg-[#111] transition-colors group">
                        <td className="py-2.5 pl-4 px-2 text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                              <Skull className="w-2.5 h-2.5 text-gray-300" />
                            </div>
                            <span className="text-gray-300 group-hover:text-white cursor-pointer">{pos.id}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-[#34d399] font-medium">{pos.notional}</td>
                        <td className="py-2.5 px-2 text-gray-300">{pos.entry}</td>
                        <td className="py-2.5 px-2 text-gray-300">{pos.liq}</td>
                        <td className="py-2.5 px-2 text-[#34d399] font-medium">
                          <div className="flex items-center justify-end gap-1.5">
                            {pos.pnl}
                            <Share2 className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100 cursor-pointer" />
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-[#fa6432]">{pos.funding}</td>
                        <td className="py-2.5 pr-4 px-2 text-gray-300">{pos.accountValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Orderbook */}
          {tradeMode === 'manual' && (
            <div className="w-[240px] border-r border-[#222] flex flex-col shrink-0 bg-[#0d0d0d]">
              <div className="h-12 border-b border-[#222] flex items-center px-3 gap-4 text-gray-500 shrink-0">
                <button className="text-white border-b-2 border-white pb-3 pt-3"><BookOpen className="w-4 h-4" /></button>
                <button className="hover:text-white pb-3 pt-3"><Scale className="w-4 h-4" /></button>
                <button className="hover:text-white pb-3 pt-3"><Skull className="w-4 h-4" /></button>
                <button className="hover:text-white pb-3 pt-3"><Target className="w-4 h-4" /></button>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border-b border-[#222] text-gray-400">
                <button className="flex items-center gap-1 hover:text-white">0.01 <ChevronDown className="w-3 h-3" /></button>
                <span>USD</span>
              </div>
              <div className="flex justify-between px-4 py-1.5 text-gray-500 uppercase tracking-widest text-[10px]">
                <span>Price</span><span>Size</span><span>Total</span>
              </div>
              <div className="flex flex-col-reverse px-1 pt-1 pb-1">
                {mockOrderbookAsks.map((a, i) => (
                  <div key={i} className="flex justify-between px-3 py-0.5 hover:bg-[#1a1a1a] cursor-pointer relative">
                    <div className="absolute right-0 top-0 bottom-0 bg-[#fa6432]/10" style={{ width: `${30 + i * 12}%` }} />
                    <span className="text-[#fa6432] relative z-10 w-1/3">${a.price.toFixed(3)}</span>
                    <span className="text-gray-300 relative z-10 w-1/3 text-right">{a.size}</span>
                    <span className="text-gray-500 relative z-10 w-1/3 text-right">{a.total}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 flex justify-between items-center bg-[#111] border-y border-[#222]">
                <span className="text-gray-400">Spread</span>
                <span className="text-white font-bold">$0.010</span>
                <span className="text-gray-500">(0.023%)</span>
              </div>
              <div className="flex flex-col px-1 pt-1">
                {mockOrderbookBids.map((b, i) => (
                  <div key={i} className="flex justify-between px-3 py-0.5 hover:bg-[#1a1a1a] cursor-pointer relative">
                    <div className="absolute right-0 top-0 bottom-0 bg-[#34d399]/10" style={{ width: `${30 + i * 12}%` }} />
                    <span className="text-[#34d399] relative z-10 w-1/3">${b.price.toFixed(3)}</span>
                    <span className="text-gray-300 relative z-10 w-1/3 text-right">{b.size}</span>
                    <span className="text-gray-500 relative z-10 w-1/3 text-right">{b.total}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-[#222] p-2 flex justify-center text-gray-500 hover:text-white cursor-pointer">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Right Panel (Trade Entry / Chat) */}
          <div className={cn("bg-[#0d0d0d] flex flex-col shrink-0 border-l border-[#222]", tradeMode === 'manual' ? 'w-[320px]' : 'w-[560px]')}>
            {/* Mode Selector */}
            <div className="flex justify-center p-3 bg-[#0a0a0a]">
              <div className="flex w-full max-w-[420px] bg-[#050505] border border-[#222] rounded-xl p-1 gap-1">
                {(['autopilot', 'copilot', 'manual'] as const).map(m => {
                  const active = tradeMode === m;
                  const label = m === 'autopilot' ? 'i5 Autopilot' : m === 'copilot' ? 'i5 Copilot' : 'Manual';
                  return (
                    <button
                      key={m}
                      onClick={() => setTradeMode(m)}
                      className={cn(
                        'flex-1 flex items-center justify-center py-2 relative rounded-lg transition-all text-[11px] font-bold tracking-wide gap-1.5 overflow-hidden',
                        active
                          ? (m === 'autopilot' ? 'bg-[#022c22] border border-[#065f46] text-[#34d399]' : 'bg-[#111] border border-[#333] text-white')
                          : 'text-gray-500 hover:text-gray-300 border border-transparent'
                      )}
                    >
                      {m === 'autopilot' && <Zap className={cn("w-3.5 h-3.5", active ? "text-[#34d399] fill-[#34d399]" : "text-gray-500")} />}
                      {m === 'copilot' && <Bot className="w-3.5 h-3.5" />}
                      {m === 'manual' && <div className="w-3.5 h-3.5 flex items-center justify-center"><Star className={cn("w-3.5 h-3.5", active ? "fill-current" : "")} /></div>}
                      {label}
                      {active && m === 'autopilot' && (
                        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#34d399] rounded-t-full shadow-[0_-2px_8px_rgba(52,211,153,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {tradeMode === 'manual' ? (
              <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
                <div className="p-4 flex gap-2">
                  <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">Cross</button>
                  <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">10x</button>
                </div>
                <div className="flex border-b border-[#222] px-4 text-xs font-sans font-bold text-gray-500 tracking-wider">
                  {(['MARKET', 'LIMIT', 'PRO'] as const).map(t => (
                    <button key={t}
                      onClick={() => setOrderType(t)}
                      className={cn('pb-2 mr-6 transition-colors', orderType === t ? 'text-white border-b-2 border-white' : 'hover:text-white')}>
                      {t}{t === 'PRO' && <ChevronDown className="w-3 h-3 inline ml-0.5" />}
                    </button>
                  ))}
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px]">Available to Trade</span>
                      <span className="text-white font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px]">Current Position</span>
                      <span className="text-white font-medium">0 HYPE</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSide('Long')}
                      className={cn('flex-1 py-2 text-sm font-bold rounded transition-colors',
                        side === 'Long' ? 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30' : 'text-gray-400 border border-transparent hover:text-white')}>
                      Long
                    </button>
                    <button onClick={() => setSide('Short')}
                      className={cn('flex-1 py-2 text-sm font-bold rounded transition-colors',
                        side === 'Short' ? 'bg-[#fa6432]/10 text-[#fa6432] border border-[#fa6432]/30' : 'text-gray-400 border border-transparent hover:text-white')}>
                      Short
                    </button>
                  </div>
                  <div className="flex p-3 bg-[#111] border border-[#333] rounded items-center focus-within:border-gray-400 transition-colors">
                    <span className="text-gray-500 w-16">Size</span>
                    <input type="text" className="bg-transparent flex-1 outline-none text-right text-white font-medium"
                      placeholder="0.00" style={{ border: 'none', padding: 0, borderRadius: 0 }} />
                    <button className="flex items-center gap-1 text-gray-300 ml-4 pl-4 border-l border-[#333]">
                      USD <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-[#1a1a1a] rounded flex items-center relative border border-[#222]">
                      <div className="absolute inset-y-0 left-0 bg-[#fa6432] w-[5%] rounded-l opacity-50" />
                      <div className="absolute left-[5%] -ml-1 w-2 h-4 bg-[#fa6432] rounded-sm" />
                    </div>
                    <div className="bg-[#111] border border-[#333] px-2 py-1 rounded text-gray-400 min-w-[40px] text-center">0%</div>
                  </div>
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300">
                    <div className="w-3.5 h-3.5 border border-gray-600 rounded-sm bg-[#111]" />
                    <span className="font-sans text-xs tracking-wide">Take Profit / Stop Loss</span>
                  </label>
                  <button className="w-full py-4 flex items-center justify-center gap-2 font-bold font-sans tracking-widest uppercase text-[13px] text-white transition-all hover:opacity-95 active:scale-[0.99] mt-2"
                    style={{
                      background: 'linear-gradient(180deg, #025247 0%, #01433a 100%)',
                      border: '1px solid #045a4f',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)',
                      borderRadius: '16px',
                    }}>
                    {side} HYPE
                  </button>
                  <div className="space-y-2 mt-2">
                    {[
                      ['Liquidation Price', 'N/A', 'text-white'],
                      ['Order Value', '$0.00', 'text-white'],
                      ['Margin Required', '$0.00', 'text-white'],
                      ['Slippage', 'Est: 0.00% / Max 8%', 'text-[#fa6432]'],
                      ['Fees', '0.0450% / 0.0150%', 'text-white'],
                    ].map(([label, value, cls]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-500 uppercase tracking-widest text-[10px]">{label}</span>
                        <span className={`font-medium ${cls}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : tradeMode === 'copilot' ? (
              <div className="flex flex-col flex-1 overflow-hidden font-sans bg-[#0d0d0d] px-4">
                <div className="flex flex-col flex-1 w-full mx-auto overflow-hidden">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    <div className="flex items-center justify-center mb-6">
                      <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#34d399] bg-[#34d399]/10 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                        Active Session
                      </span>
                    </div>

                    {messages.map(msg => (
                      <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.role === 'ai' ? (
                          <div className="flex items-start gap-2.5 max-w-[90%]">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-[#34d399]/30"
                              style={{ background: 'rgba(52,211,153,0.1)' }}>
                              <Bot className="w-4 h-4 text-[#34d399]" />
                            </div>
                            <div className="relative px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-[12px] leading-relaxed shadow-sm bg-[#1a1a1a] border border-[#2a2a2a] text-[#e5e7eb]
                          before:content-[''] before:absolute before:top-3 before:-left-1.5 before:w-3 before:h-3 before:bg-[#1a1a1a] before:rotate-45 before:border-l before:border-b before:border-[#2a2a2a]">
                              <div className="font-bold text-[11px] text-[#34d399] mb-1">A&S AI Co-Pilot Online 🟢 —</div>
                              {msg.content}
                            </div>
                          </div>
                        ) : (
                          <div className="px-3.5 py-2.5 rounded-2xl rounded-tr-sm text-[12px] leading-relaxed text-white shadow-sm max-w-[90%]"
                            style={{ background: 'rgba(15,125,110,0.8)', border: '1px solid rgba(52,211,153,0.3)' }}>
                            {msg.content}
                          </div>
                        )}
                      </div>
                    ))}
                    {typing && (
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-[#34d399]/30"
                          style={{ background: 'rgba(52,211,153,0.1)' }}>
                          <Bot className="w-4 h-4 text-[#34d399]" />
                        </div>
                        <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center bg-[#1a1a1a] border border-[#2a2a2a]">
                          {[0, 150, 300].map(d => (
                            <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-bounce"
                              style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Bottom Config & Chat Input */}
                  <div className="p-3 border-t border-[#222] bg-[#0d0d0d] shrink-0">
                    {tradeMode === 'copilot' && (
                      <div className="border border-[#222] rounded-xl p-3 mb-3 bg-[#0d0d0d] relative">
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                          Setup (Optional)
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em]">Margin</span>
                            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-[#0a0a0a] border border-[#222] focus-within:border-gray-500 transition-colors">
                              <span className="text-gray-500 text-[11px] font-bold">$</span>
                              <input type="number" value={margin} onChange={e => setMargin(e.target.value)}
                                className="w-full bg-transparent text-white text-[11px] font-semibold outline-none"
                                style={{ background: 'transparent', border: 'none', padding: 0, borderRadius: 0, boxShadow: 'none' }} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em]">Style</span>
                            <div className="flex items-center justify-between px-2 py-1.5 rounded bg-[#0a0a0a] border border-[#222] cursor-pointer hover:border-gray-500 transition-colors">
                              <span className="text-white text-[11px] font-semibold">{tradeStyle}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em]">Strategy</span>
                            <div className="flex items-center justify-between px-2 py-1.5 rounded bg-[#0a0a0a] border border-[#222] cursor-pointer hover:border-gray-500 transition-colors">
                              <span className="text-white text-[11px] font-semibold">{strategy}</span>
                              <ChevronDown className="w-3 h-3 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Autopilot old start button removed */}

                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all focus-within:border-gray-500"
                      style={{ background: '#111', border: '1px solid #2a2a2a' }}>
                      <Sparkles className="w-4 h-4 text-[#34d399] shrink-0" />
                      <input type="text" value={input} onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMsg()}
                        placeholder="Message AI..."
                        className="flex-1 bg-transparent outline-none text-[12px] text-gray-200 placeholder-gray-600"
                        style={{ background: 'transparent', border: 'none', padding: 0, borderRadius: 0, boxShadow: 'none' }} />
                      <button onClick={() => sendMsg()} disabled={!input.trim()}
                        className="w-7 h-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-30"
                        style={{ background: input.trim() ? '#34d399' : '#111', color: input.trim() ? '#000' : '#666' }}>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar font-sans bg-[#0a0a0a] relative px-4 py-3">
                <div className="flex flex-col w-full mx-auto max-w-[440px] gap-4">

                  {/* 1. Header Area */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#050505] border-[2px] border-[#065f46] flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                        <Bot className="w-6 h-6 text-[#34d399]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-lg leading-tight tracking-wide mb-0.5">i5 Autopilot</span>
                        <span className="text-[#34d399] font-bold text-[13px] leading-tight tracking-wide mb-1">Ready to execute</span>
                        <span className="text-[10px] text-gray-500 tracking-wide mb-1.5">AI is monitoring the market</span>
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-1.5 w-1.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34d399]"></span>
                          </span>
                          <span className="text-[9px] text-[#34d399] font-bold tracking-widest uppercase">LIVE MONITORING</span>
                        </div>
                      </div>
                    </div>

                    {/* BTC Card Widget */}
                    <div className="bg-[#111] border border-[#222] rounded-xl p-3 flex flex-col w-32 relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-[#f7931a] flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">₿</span>
                        </div>
                        <span className="text-white font-bold text-sm">BTC</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#34d399] font-bold text-xs tracking-wide">Bullish</span>
                        <svg className="w-10 h-5" viewBox="0 0 50 20" preserveAspectRatio="none">
                          <path d="M0,15 L10,10 L20,12 L30,5 L40,8 L50,0" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="50" cy="0" r="1.5" fill="#34d399" />
                        </svg>
                      </div>
                      <div className="border-t border-[#222] pt-2 flex items-center gap-1.5">
                        <span className="text-[#34d399] font-bold text-xs">87%</span>
                        <span className="text-[10px] text-gray-400">Confidence</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Mission Status Card */}
                  <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-4 flex flex-col relative mt-1">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">Mission Status</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#065f46] bg-[#022c22]">
                        <span className="text-[#34d399] text-[9px] font-bold tracking-wide">Favorable</span>
                        <CheckCircle2 className="w-3 h-3 text-[#34d399]" />
                      </div>
                    </div>

                    {/* 4x2 Grid */}
                    <div className="grid grid-cols-4 gap-y-4 relative">
                      {/* Horizontal Divider */}
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-[#222] -translate-y-1/2" />

                      {/* Vertical Dividers */}
                      <div className="absolute top-0 bottom-0 left-1/4 w-px bg-[#222]" />
                      <div className="absolute top-0 bottom-0 left-2/4 w-px bg-[#222]" />
                      <div className="absolute top-0 bottom-0 left-3/4 w-px bg-[#222]" />

                      {/* Row 1 */}
                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Portfolio Balance</span>
                        <div className="w-8 h-8 rounded-lg bg-[#022c22] border border-[#065f46] flex items-center justify-center mb-2">
                          <Wallet className="w-4 h-4 text-[#34d399]" />
                        </div>
                        <span className="text-white font-bold text-[13px] whitespace-nowrap">$12,450.00</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Available to Trade</span>
                        <div className="w-8 h-8 rounded-full border border-[#065f46] flex items-center justify-center mb-2">
                          <span className="text-[#34d399] font-bold text-[13px]">$</span>
                        </div>
                        <span className="text-white font-bold text-[13px] whitespace-nowrap">$3,250.00</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Trading Asset</span>
                        <div className="w-8 h-8 rounded-full bg-[#f7931a] flex items-center justify-center mb-2">
                          <span className="text-white font-bold text-[13px]">₿</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-bold text-[13px] whitespace-nowrap">BTC</span>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Execution Strategy</span>
                        <div className="w-8 h-8 flex items-center justify-center mb-2 relative">
                          <div className="absolute w-6 h-6 rounded-full border-[1.5px] border-[#34d399]" />
                          <div className="absolute w-3 h-3 rounded-full border-[1.5px] border-[#34d399]" />
                          <div className="absolute w-1 h-1 rounded-full bg-[#34d399]" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-bold text-[13px] whitespace-nowrap">TWAP</span>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Expected Return</span>
                        <span className="text-[#34d399] font-bold text-lg mb-0.5 whitespace-nowrap">+12.8%</span>
                        <span className="text-[9px] text-gray-500 whitespace-nowrap">Estimated</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Risk Level</span>
                        <div className="w-8 h-8 flex items-center justify-center mb-0.5">
                          <ShieldAlert className="w-5 h-5 text-[#34d399]" />
                        </div>
                        <span className="text-[#34d399] font-bold text-[11px] mb-1.5 whitespace-nowrap">Moderate</span>
                        <div className="flex gap-0.5 w-10">
                          <div className="h-1 flex-1 bg-[#34d399] rounded-full" />
                          <div className="h-1 flex-1 bg-[#34d399] rounded-full" />
                          <div className="h-1 flex-1 bg-[#333] rounded-full" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Confidence</span>
                        <div className="w-10 h-10 relative flex items-center justify-center mb-0.5">
                          <svg className="w-full h-full -rotate-90 absolute">
                            <circle cx="20" cy="20" r="16" fill="none" stroke="#222" strokeWidth="3" />
                            <circle cx="20" cy="20" r="16" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="100" strokeDashoffset="13" className="opacity-90" />
                          </svg>
                          <span className="text-[#34d399] font-bold text-[11px] relative z-10 whitespace-nowrap">87%</span>
                        </div>
                        <span className="text-[9px] text-gray-500 mt-0.5 whitespace-nowrap">High</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3">
                        <span className="text-[9px] text-gray-400 mb-2 whitespace-nowrap">Market Signal</span>
                        <div className="w-8 h-8 flex items-end justify-center gap-1 pb-1">
                          <div className="w-1 h-2.5 bg-[#34d399] rounded-sm opacity-60" />
                          <div className="w-1 h-4 bg-[#34d399] rounded-sm opacity-80" />
                          <div className="w-1 h-5.5 bg-[#34d399] rounded-sm" />
                        </div>
                        <span className="text-[#34d399] font-bold text-[11px] mb-0.5 whitespace-nowrap">Bullish</span>
                        <span className="text-[9px] text-gray-500 whitespace-nowrap">Uptrend</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Engage AI Button */}
                  <button onClick={() => setIsOverviewModalOpen(true)} className="relative w-full py-3.5 rounded-xl overflow-hidden group transition-all active:scale-[0.98] mt-1 shadow-[0_4px_15px_rgba(52,211,153,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f4d38] via-[#1a8561] to-[#0f4d38] group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 shadow-[inset_0_1px_8px_rgba(255,255,255,0.1)] rounded-xl" />
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#050505] flex items-center justify-center shadow-md">
                        <Play className="w-3.5 h-3.5 fill-[#34d399] text-[#34d399] ml-0.5" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-white font-bold text-lg tracking-widest drop-shadow-sm">ACTIVATE AI</span>
                        <span className="text-[#34d399] text-[10px] font-medium tracking-wide">Start automated execution</span>
                      </div>
                    </div>
                  </button>

                  {/* 4. Bottom Action Buttons */}
                  <div className="flex gap-3">
                    <button onClick={() => setIsTransferModalOpen(true)} className="flex-1 bg-[#0a0a0a] border border-[#222] hover:border-[#333] rounded-xl p-3 flex items-center justify-between transition-colors active:scale-[0.98]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg border border-[#222] bg-[#111] flex items-center justify-center">
                          <Download className="w-4 h-4 text-[#34d399]" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-white font-bold text-[13px] tracking-wide">Add Funds</span>
                          <span className="text-gray-500 text-[10px] tracking-wide mt-0.5">Deposit to start</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => setIsSettingsModalOpen(true)} className="flex-1 bg-[#0a0a0a] border border-[#222] hover:border-[#333] rounded-xl p-3 flex items-center justify-between transition-colors active:scale-[0.98]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg border border-[#222] bg-[#111] flex items-center justify-center">
                          <SlidersHorizontal className="w-4 h-4 text-[#34d399]" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-white font-bold text-[13px] tracking-wide">Settings</span>
                          <span className="text-gray-500 text-[10px] tracking-wide mt-0.5">Preferences</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Footer Warning */}
                  <div className="text-center mt-2 pb-2">
                    <span className="text-[10px] text-gray-600 font-medium tracking-wider flex items-center justify-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-[#333]" />
                      <div className="flex flex-col items-start leading-[1.4]">
                        <span>AI-generated trade suggestions.</span>
                        <span>Always review before execution.</span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Autopilot Settings Modal */}
        {isSettingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
            <div className="w-full max-w-4xl bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-2xl flex overflow-hidden max-h-[80vh]">
              {/* Left Sidebar */}
              <div className="w-64 border-r border-[#222] flex flex-col bg-[#050505] shrink-0">
                <div className="p-4 border-b border-[#222] flex justify-between items-center">
                  <span className="font-bold text-white tracking-wide">Strategies</span>
                  <button onClick={() => setIsSettingsModalOpen(false)} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 flex gap-2">
                  <button className="flex-1 pb-1 border-b-2 border-[#34d399] text-white text-xs font-bold uppercase tracking-wider">Official</button>
                  <button className="flex-1 pb-1 border-b-2 border-transparent text-gray-500 hover:text-white text-xs font-bold uppercase tracking-wider">My</button>
                </div>
                <div className="px-4 pb-4">
                  <div className="bg-[#111] border border-[#222] rounded flex items-center px-2 py-1.5 focus-within:border-gray-500 transition-colors">
                    <Search className="w-3.5 h-3.5 text-gray-500 mr-2" />
                    <input type="text" placeholder="Search..." className="bg-transparent text-xs text-white outline-none w-full placeholder-gray-600" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 space-y-2">
                  {['Futures Grid', 'Sharpe Guard V2', 'DCA Bot', 'TWAP'].map(strat => (
                    <div key={strat} onClick={() => setSelectedStrategy(strat)} className={cn('p-3 rounded-xl border cursor-pointer transition-all', selectedStrategy === strat ? 'bg-[#34d399]/10 border-[#34d399]/30' : 'bg-[#111] border-[#222] hover:border-[#333]')}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn('text-sm font-bold', selectedStrategy === strat ? 'text-[#34d399]' : 'text-white')}>{strat}</span>
                        {selectedStrategy === strat && <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />}
                      </div>
                      <span className="text-[10px] text-gray-500">Official Strategy</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane */}
              <div className="flex-1 flex flex-col bg-[#0a0a0a]">
                <div className="p-6 border-b border-[#222] flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">{selectedStrategy}</h2>
                    <span className="text-xs text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded mt-1 inline-block">Pro</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setConfigTab('Introduction')} className={cn('pb-1 text-sm font-bold tracking-wide transition-colors', configTab === 'Introduction' ? 'text-white border-b-2 border-[#34d399]' : 'text-gray-500 hover:text-gray-300')}>Introduction</button>
                    <button onClick={() => setConfigTab('Configuration')} className={cn('pb-1 text-sm font-bold tracking-wide transition-colors', configTab === 'Configuration' ? 'text-white border-b-2 border-[#34d399]' : 'text-gray-500 hover:text-gray-300')}>Configuration</button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                  {configTab === 'Introduction' ? (
                    <div className="space-y-6">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        This strategy systematically scales into positions during high volatility events, dynamically adjusting sizing based on the Sharpe ratio and real-time funding rates to optimize risk-adjusted returns.
                      </p>

                      <div className="grid grid-cols-4 gap-4">
                        {[
                          ['Est. APR', '42.5%', 'text-[#34d399]'],
                          ['Total Return', '+18.2%', 'text-white'],
                          ['Win Rate', '68.4%', 'text-white'],
                          ['Max Drawdown', '-12.1%', 'text-[#fa6432]']
                        ].map(([l, v, c]) => (
                          <div key={l} className="bg-[#111] border border-[#222] p-3 rounded-xl flex flex-col items-center justify-center gap-1">
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest text-center">{l}</span>
                            <span className={`text-lg font-bold font-mono ${c}`}>{v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#111] border border-[#222] rounded-xl p-4 h-48 flex items-end relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#34d399]/5 to-transparent" />
                        {/* Fake Chart Lines */}
                        <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20 L100,100 L0,100 Z" fill="rgba(52,211,153,0.05)" />
                          <path d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20" fill="none" stroke="#34d399" strokeWidth="1" />
                        </svg>
                        <span className="absolute top-4 left-4 text-xs font-bold text-gray-400">Backtest Performance (90D)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-3">Trading Scope</h3>
                        <div className="flex gap-3">
                          <label className="flex items-center gap-2 bg-[#111] border border-[#333] px-4 py-2 rounded-lg cursor-pointer hover:border-gray-500 transition-all">
                            <input type="checkbox" defaultChecked className="accent-[#34d399]" />
                            <span className="text-sm font-bold text-white">BTC</span>
                            <span className="text-xs text-gray-500">$65,028</span>
                          </label>
                          <label className="flex items-center gap-2 bg-[#111] border border-[#222] px-4 py-2 rounded-lg cursor-pointer hover:border-gray-500 transition-all opacity-50">
                            <input type="checkbox" className="accent-[#34d399]" />
                            <span className="text-sm font-bold text-white">ETH</span>
                            <span className="text-xs text-gray-500">$3,421</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                          Risk Control
                          <span className="text-[10px] text-[#fa6432] bg-[#fa6432]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">High Importance</span>
                        </h3>
                        <div className="bg-[#111] border border-[#222] p-4 rounded-xl space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-medium">Initial Equity Drawdown Limit</span>
                            <span className="text-sm font-bold text-white font-mono">{drawdownLimit}%</span>
                          </div>
                          <input type="range" min="30" max="80" step="10" value={drawdownLimit} onChange={(e) => setDrawdownLimit(Number(e.target.value))} className="w-full accent-[#34d399]" />
                          <div className="flex justify-between">
                            {[30, 40, 50, 60, 70, 80].map(val => (
                              <button key={val} onClick={() => setDrawdownLimit(val)} className={cn('text-[10px] font-bold px-2 py-1 rounded transition-colors', drawdownLimit === val ? 'bg-[#34d399]/20 text-[#34d399]' : 'text-gray-500 hover:text-white')}>
                                {val}%
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                          The strategy will automatically halt trading and close all open positions if the account equity falls below the set drawdown limit relative to the initial equity.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-[#222] bg-[#050505] flex items-center justify-between shrink-0">
                  <span className="text-[10px] text-gray-500 tracking-wider">Powered by Minara</span>
                  <button onClick={() => setIsSettingsModalOpen(false)} className="px-8 py-2.5 rounded-xl font-bold text-sm tracking-wide text-[#050505] bg-[#34d399] hover:bg-[#2fb080] shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all active:scale-[0.98]">
                    Apply and Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Autopilot Overview Modal */}
        {isOverviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-2xl p-6 relative">
              <button onClick={() => setIsOverviewModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-[#34d399]" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide mb-3">Autopilot Overview</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                You're about to enable Autopilot, an AI-powered trading mode that automatically manages positions and risk based on market data and signals.
                <br /><br />
                Autopilot trading involves significant risk and does not guarantee profits. By proceeding, you acknowledge that you understand the risks.
              </p>
              <label className="flex items-start gap-3 cursor-pointer group mb-6">
                <div className={cn('w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors', overviewAccepted ? 'bg-[#34d399] border-[#34d399]' : 'border-gray-600 group-hover:border-gray-400')}>
                  {overviewAccepted && <Check className="w-3.5 h-3.5 text-black" />}
                </div>
                <input type="checkbox" className="hidden" checked={overviewAccepted} onChange={(e) => setOverviewAccepted(e.target.checked)} />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">I have read and accept the above warnings.</span>
              </label>
              <div className="flex gap-3">
                <button onClick={() => setIsOverviewModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-[#111] border border-[#333] hover:bg-[#1a1a1a] transition-colors">Cancel</button>
                <button disabled={!overviewAccepted} onClick={() => setIsOverviewModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-sm text-black bg-[#34d399] hover:bg-[#2fb080] disabled:opacity-50 disabled:cursor-not-allowed transition-all">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Perps Wallet Deposit Modal */}
        {isTransferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#222] rounded-2xl shadow-2xl p-6 relative">
              <button onClick={() => setIsTransferModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-white tracking-wide mb-6">Perps Wallet Deposit</h2>

              <div className="space-y-4">
                <div className="bg-[#111] border border-[#222] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-[#333] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]" />
                    <span className="text-sm font-bold text-white">Wallet 1</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                <button className="w-full py-3 rounded-xl font-bold text-sm text-[#050505] bg-white hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Wallet className="w-4 h-4" /> On-chain Deposit
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#222]"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Deposit with Card</span>
                  <div className="flex-grow border-t border-[#222]"></div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-[#111] border border-[#222] hover:border-[#444] rounded-xl p-4 flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#5e38f6] flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-white">MoonPay</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </button>

                  <button className="w-full bg-[#111] border border-[#222] hover:border-[#444] rounded-xl p-4 flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#1cc988] flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold text-white">Banxa Pay</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
