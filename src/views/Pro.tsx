'use client';

import { Zap, Check, Key, Cpu, Code } from 'lucide-react';
import { useUserStore, Tier } from '@/store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Free',
    price: '₹0',
    description: 'Perfect to explore the AI Agent platform.',
    features: [
      '10 messages/day',
      'Top 10 daily aggregate signals',
      'Delayed signals (15m)',
      'Community marketplace access'
    ]
  },
  {
    name: 'Starter',
    price: '₹199',
    period: '/month',
    description: 'For active traders seeking AI edge.',
    features: [
      '100 messages/day',
      'Smart Slippage Protection AI',
      'Telegram & News Analyzers (Real-time)',
      'Basic Perp Alerts (Funding rates)',
      'Earn 2x Points (Missions)'
    ]
  },
  {
    name: 'Pro',
    price: '₹799',
    period: '/month',
    description: 'Full unmetered access to advanced AI models.',
    features: [
      'Unlimited messaging & Execution',
      'Advanced Perp Alerts (Liq clusters)',
      'All Signal Analyzers & Chart AI',
      'Unlimited AI Smart Execution',
      'Whale Tracking alerts',
      'Early access to new agents'
    ],
    highlight: true
  }
];

const creditPacks = [
  { credits: 50, price: '₹20', bonus: 0 },
  { credits: 300, price: '₹100', bonus: 50 },
  { credits: 1000, price: '₹300', bonus: 200 },
];

export function Pro() {
  const { tier, setTier, credits, addCredits } = useUserStore();
  const [activeTab, setActiveTab] = useState<'subs' | 'credits' | 'api'>('subs');

  const handleUpgrade = (newTier: Tier) => {
    setTier(newTier);
    alert(`Successfully activated ${newTier} plan! (Simulated)`);
  };

  const handleBuyCredits = (amount: number) => {
    addCredits(amount);
    alert(`Purchased ${amount} credits! (Simulated)`);
  };

  return (
    <div className="h-full overflow-y-auto p-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-primary flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Upgrade Your Agent</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Unlock premium AI models, advanced trading execution, and real-time market data to dominate the market.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-secondary/50 p-1 rounded-xl flex gap-1 border border-border">
          <button 
            onClick={() => setActiveTab('subs')}
            className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'subs' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary")}
          >
            Subscriptions
          </button>
          <button 
            onClick={() => setActiveTab('credits')}
            className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'credits' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary")}
          >
            Credit Wallet
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all", activeTab === 'api' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary")}
          >
            Developer API
          </button>
        </div>
      </div>

      {/* Subscriptions Tab */}
      {activeTab === 'subs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div 
              key={t.name}
              className={cn(
                "relative rounded-2xl p-6 flex flex-col border",
                t.highlight 
                  ? "bg-secondary/30 border-primary/50 shadow-xl shadow-primary/10" 
                  : "bg-card border-border",
                tier === t.name && "ring-2 ring-brand-cyan border-brand-cyan/50"
              )}
            >
              {t.highlight && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <span className="bg-gradient-to-r from-brand-cyan to-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              {tier === t.name && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded-full">
                  <Check className="w-3 h-3" /> Current
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold">{t.price}</span>
                {t.period && <span className="text-muted-foreground text-sm">{t.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6 h-10">{t.description}</p>
              
              <ul className="flex-1 space-y-3 mb-6">
                {t.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm items-start">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleUpgrade(t.name as Tier)}
                disabled={tier === t.name}
                className={cn(
                  "w-full py-2.5 rounded-lg font-medium transition-all",
                  tier === t.name ? "bg-secondary/50 text-muted-foreground cursor-not-allowed" :
                  t.highlight ? "bg-primary text-white hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
              >
                {tier === t.name ? 'Active Plan' : `Upgrade to ${t.name}`}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Credits Tab */}
      {activeTab === 'credits' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 rounded-2xl p-6 border border-border flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Your AI Credits</h3>
              <p className="text-sm text-muted-foreground">Used for premium pay-per-use features (Deep portfolio signals, custom strategy generation).</p>
            </div>
            <div className="text-right flex items-center gap-3 bg-background/50 py-3 px-6 rounded-xl border border-border/50">
               <Zap className="w-6 h-6 text-yellow-500" />
               <span className="text-3xl font-black">{credits}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Recharge Wallet</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {creditPacks.map((pack) => (
                <div key={pack.credits} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleBuyCredits(pack.credits + pack.bonus)}>
                  <div className="text-2xl font-bold flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    {pack.credits}
                  </div>
                  {pack.bonus > 0 && <div className="text-xs text-success font-medium mb-3">+{pack.bonus} Bonus Credits</div>}
                  {pack.bonus === 0 && <div className="text-xs text-muted-foreground mb-3">Standard Pack</div>}
                  <div className="text-xl font-medium mb-4">{pack.price}</div>
                  <button className="w-full bg-secondary hover:bg-primary/20 hover:text-primary transition-colors py-2 rounded-lg text-sm font-medium">Buy Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Dev Tab */}
      {activeTab === 'api' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">API Access</h3>
                <p className="text-sm text-muted-foreground">Integrate Alerts and signals trading and chat into your own dApps.</p>
              </div>
              <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20">Generate New Key</button>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between border border-border">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Production Key</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1 tracking-wider">aich_test_************************9b2x</div>
                  </div>
                </div>
                <button className="text-xs bg-background border border-border px-3 py-1.5 rounded hover:bg-secondary">Copy</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-brand-cyan" /> Usage This Month</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold">45.2k</span>
                <span className="text-sm text-muted-foreground">/ 100k requests</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-brand-cyan w-[45%]" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2"><Code className="w-4 h-4 text-brand-purple" /> Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary hover:underline">Authentication Headers</a></li>
                <li><a href="#" className="text-primary hover:underline">Init Trading Agent /v1/agent/trade</a></li>
                <li><a href="#" className="text-primary hover:underline">Get Signals /v1/market/signals</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
