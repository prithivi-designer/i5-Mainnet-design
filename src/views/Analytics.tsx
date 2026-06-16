'use client';

import { useUserStore } from '@/store';
import { Activity, TrendingUp, AlertTriangle, Clock, Eye, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const trendingTokens = [
  { symbol: 'WIF', name: 'dogwifhat', change: '+14.2%', vol: '$1.2B', chart: [1, 3, 2, 5, 4, 8, 7] },
  { symbol: 'PEPE', name: 'Pepe', change: '+8.4%', vol: '$980M', chart: [2, 2, 3, 4, 4, 6, 5] },
  { symbol: 'SOL', name: 'Solana', change: '-2.1%', vol: '$3.4B', chart: [8, 7, 5, 6, 4, 3, 2] },
];

const mockSignals = [
  { id: 1, type: 'Whale Alert', asset: 'ETH', action: 'Transfer', size: '12,500 ETH', from: 'Unknown Wallet', to: 'Binance', time: 'Just now', premium: true },
  { id: 2, type: 'AI Signal', asset: 'SOL', action: 'Buy', confidence: '89%', target: '$165.00', time: '12 mins ago', premium: true },
  { id: 3, type: 'Smart Money', asset: 'LINK', action: 'Accumulating', detail: '3 top wallets buying', time: '45 mins ago', premium: false },
  { id: 4, type: 'Whale Alert', asset: 'BTC', action: 'Transfer', size: '1,200 BTC', from: 'Coinbase', to: 'Unknown Wallet', time: '1 hr ago', premium: false },
];

export function Analytics() {
  const { tier } = useUserStore();

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Market Analytics</h1>
          <p className="text-sm text-muted-foreground">AI-driven insights and whale tracking data.</p>
        </div>
        {tier === 'Free' && (
          <div className="bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" /> Delayed data (15m). Upgrade for real-time.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trending Tokens */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-brand-purple" /> Trending Agents & Tokens</h3>
          <div className="space-y-4">
            {trendingTokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <div className="font-bold">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                
                <div className="h-10 w-24 hidden md:block">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={token.chart.map((val, i) => ({ val, i }))}>
                      <Line type="monotone" dataKey="val" stroke={token.change.startsWith('+') ? 'var(--color-success)' : 'var(--color-destructive)'} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-right">
                  <div className={cn("font-medium", token.change.startsWith('+') ? "text-success" : "text-destructive")}>{token.change}</div>
                  <div className="text-xs text-muted-foreground">Vol: {token.vol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Stats */}
        <div className="space-y-6">
           <div className="bg-card border border-border rounded-2xl p-6">
             <h3 className="text-sm font-medium text-muted-foreground mb-4">Fear & Greed Index</h3>
             <div className="flex items-end gap-3 mb-2">
               <span className="text-4xl font-bold text-success">72</span>
               <span className="text-lg font-medium text-success pb-1">Greed</span>
             </div>
             <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
               <div className="h-full bg-gradient-to-r from-destructive via-yellow-500 to-success w-[72%]" />
             </div>
           </div>

           <div className="bg-gradient-to-br from-brand-purple/10 to-transparent border border-brand-purple/20 rounded-2xl p-6">
             <h3 className="font-semibold mb-2 flex items-center gap-2 text-brand-purple"><BarChart2 className="w-4 h-4" /> AI Sentiment</h3>
             <p className="text-sm text-muted-foreground mb-4">Overall market sentiment analyzed from 2.4M tweets and news articles.</p>
             <div className="flex justify-between items-center text-sm font-medium">
               <span>Bullish</span>
               <span>68%</span>
             </div>
           </div>
        </div>
        
        {/* Live Signals & Whale Tracker */}
        <div className="col-span-1 lg:col-span-3 bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><Activity className="w-4 h-4 text-brand-cyan" /> Live Signals & Whale Tracker</h3>
          
          <div className="space-y-3">
             {mockSignals.map((signal) => (
                <div key={signal.id} className="flex relative justify-between items-center p-4 rounded-xl bg-secondary/30 border border-border/50">
                  {signal.premium && tier === 'Free' && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-10 border border-border">
                       <span className="text-sm font-medium flex items-center gap-2"><Eye className="w-4 h-4" /> Pro Signal Locked</span>
                    </div>
                  )}
                  <div className="flex gap-4 items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      signal.type === 'Whale Alert' ? "bg-blue-500/10 text-blue-500" :
                      signal.type === 'AI Signal' ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-cyan/10 text-brand-cyan"
                    )}>
                       {signal.type === 'Whale Alert' ? <AlertTriangle className="w-5 h-5"/> : <Activity className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{signal.asset}</span>
                        <span className={cn("text-xs px-2 py-0.5 rounded-md font-medium", 
                           signal.action === 'Buy' ? "bg-success/20 text-success" : 
                           signal.action === 'Transfer' ? "bg-muted text-muted-foreground" : "bg-yellow-500/20 text-yellow-500"
                        )}>{signal.action}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {(signal as any).size || (signal as any).detail || `Confidence: ${(signal as any).confidence} Target: ${(signal as any).target}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {signal.time}
                  </div>
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
