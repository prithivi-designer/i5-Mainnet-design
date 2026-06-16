'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, Settings, Camera, BookOpen, Scale, Skull, Target,
  Filter, Share2, X, Send, TrendingUp, Bell, Sparkles, Bot
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
  { price: 42.590, size: '44.0K',  total: '69.6K'  },
  { price: 42.580, size: '25.1K',  total: '25.6K'  },
  { price: 42.570, size: '470',    total: '470'     },
];
const mockOrderbookBids = [
  { price: 42.560, size: '32.8K',  total: '32.8K'  },
  { price: 42.550, size: '43.7K',  total: '76.5K'  },
  { price: 42.540, size: '59.7K',  total: '136.2K' },
  { price: 42.530, size: '55.3K',  total: '191.5K' },
  { price: 42.520, size: '119.0K', total: '310.5K' },
];
const mockPositions = [
  { id: '0x082e...ca88', notional: '$58.94M', entry: '$38.676', liq: '$33.638', pnl: '+$5.56M',  funding: '-$2.34M',    accountValue: '$14.84M' },
  { id: '0x4f9b...2e3f', notional: '$10.25M', entry: '$35.331', liq: '$29.099', pnl: '+$1.77M',  funding: '-$134.19K',  accountValue: '$3.62M'  },
  { id: '0x051c...693c', notional: '$4.1M',   entry: '$26.134', liq: '$3.6253', pnl: '+$1.59M',  funding: '-$94.47K',   accountValue: '$4.69M'  },
  { id: '0xa9b9...3bbd', notional: '$21.08M', entry: '$39.634', liq: '$36.734', pnl: '+$1.52M',  funding: '-$182.25K',  accountValue: '$4.25M'  },
  { id: '0x6666...23f5', notional: '$19.22M', entry: '$39.811', liq: '$32.637', pnl: '+$1.3M',   funding: '-$175.32K',  accountValue: '$5.27M'  },
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
  const [side, setSide]           = useState<'Long' | 'Short'>('Long');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'PRO'>('MARKET');
  
  const [tradeMode, setTradeMode] = useState<'autopilot' | 'copilot' | 'manual'>('manual');
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MSGS);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [margin, setMargin]     = useState('100');
  const [tradeStyle, setTradeStyle] = useState('Day');
  const [strategy, setStrategy] = useState('Max Gain');

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
              ['Mark',              '$42.563',           'text-white'],
              ['24H Change',        '+3.336 / +8.50%',   'text-[#34d399]'],
              ['24H Volume',        '$426.1M',            'text-white'],
              ['Open Interest',     '$925.0M',            'text-white'],
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
                {['1m','5m','15m','1h'].map(t => (
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
              {[['O','38.817'],['H','42.837'],['L','38.164'],['C','42.567']].map(([l,v]) => (
                <span key={l} className="text-gray-500">{l}<span className="text-[#34d399]">{v}</span></span>
              ))}
              <span className="text-[#34d399]">3.7490 (+9.66%)</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#34d399" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto','auto']} orientation="right" tick={{ fontSize: 10, fill: '#666' }}
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
                {['Positions','Copytrade','Balances','Open Orders','TWAP','History','Top Traders','Cohorts'].map((t, i) => (
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

        {/* Right Panel (Trade Entry / Chat) */}
        <div className="w-[320px] bg-[#0d0d0d] flex flex-col shrink-0 border-l border-[#222]">
          {/* Mode Selector */}
          <div className="flex p-2 gap-1 border-b border-[#222] bg-[#0a0a0a]">
            {(['autopilot', 'copilot', 'manual'] as const).map(m => {
              const active = tradeMode === m;
              const label = m === 'autopilot' ? '15 AI Autopilot' : m === 'copilot' ? 'i5 Copilot' : 'Manual';
              const icon = m === 'autopilot' ? '⚡' : m === 'copilot' ? '🤖' : '✦';
              return (
                <button
                  key={m}
                  onClick={() => setTradeMode(m)}
                  className={cn(
                    'flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all border text-[10px] font-bold tracking-wide gap-1',
                    active ? 'bg-[#34d399]/10 border-[#34d399]/40 text-[#34d399]' : 'border-transparent text-gray-500 hover:text-white hover:bg-[#111]'
                  )}
                >
                  <span className="text-sm">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>

          {tradeMode === 'manual' ? (
            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
              <div className="p-4 flex gap-2">
                <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">Cross</button>
                <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">10x</button>
              </div>
              <div className="flex border-b border-[#222] px-4 text-xs font-sans font-bold text-gray-500 tracking-wider">
                {(['MARKET','LIMIT','PRO'] as const).map(t => (
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
                    ['Liquidation Price', 'N/A',                    'text-white'],
                    ['Order Value',       '$0.00',                   'text-white'],
                    ['Margin Required',   '$0.00',                   'text-white'],
                    ['Slippage',          'Est: 0.00% / Max 8%',    'text-[#fa6432]'],
                    ['Fees',              '0.0450% / 0.0150%',      'text-white'],
                  ].map(([label, value, cls]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px]">{label}</span>
                      <span className={`font-medium ${cls}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden font-sans">
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
                
                {tradeMode === 'autopilot' && (
                  <button className="w-full py-3 flex items-center justify-center gap-2 font-bold text-[13px] text-white transition-all hover:opacity-95 active:scale-[0.99] mb-3 rounded-xl"
                    style={{
                      background: 'linear-gradient(180deg, #025247 0%, #01433a 100%)',
                      border: '1px solid #045a4f',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)',
                    }}>
                    Start Autopilot <Bot className="w-4 h-4 ml-1" />
                  </button>
                )}

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
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
