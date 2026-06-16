'use client';

import { useState } from 'react';
import { 
  Bell,
  Bitcoin,
  ChevronDown,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Mail,
  MessageSquare,
  Send,
  Phone,
  Monitor,
  Link,
  Activity,
  Percent,
  Clock,
  BarChart2,
  PieChart,
  Building2,
  TrendingUp,
} from 'lucide-react';

export function AlertSetup() {
  const [direction, setDirection] = useState('Above');
  const [notifyVia, setNotifyVia] = useState('Email');
  const [cooldown, setCooldown] = useState('24h');
  const [activeTab, setActiveTab] = useState('Price');
  const [oneTime, setOneTime] = useState(false);

  const notifyOptions = [
    { id: 'Email', icon: Mail },
    { id: 'SMS', icon: MessageSquare },
    { id: 'Telegram', icon: Send },
    { id: 'Discord', icon: MessageSquare },
    { id: 'Slack', icon: MessageSquare }, // Could use Hash
    { id: 'Webhook', icon: Link },
    { id: 'Phone call', icon: Phone },
    { id: 'Browser', icon: Monitor },
  ];

  const cooldownOptions = ['5m', '15m', '30m', '1h', '6h', '24h', '7d'];

  const tabs = [
    { id: 'Price', icon: TrendingUp },
    { id: 'Percent', icon: Percent },
    { id: 'Periodic', icon: Clock },
    { id: 'Volume', icon: BarChart2 },
    { id: 'Funding', icon: DollarSign },
    { id: 'Marketcap', icon: PieChart },
    { id: 'Dominance', icon: Activity },
    { id: 'Stocks', icon: Building2 },
  ];

  const tabConfig = {
    Price: {
      title: 'Price Alert',
      description: 'Get notified when a coin crosses your target.',
      badgeText: 'BTC',
      badgeValue: '$78,123.05',
    },
    Percent: {
      title: 'Percentage Alert',
      description: 'Get notified when an asset changes by a specific percent.',
      badgeText: 'ETH',
      badgeValue: '+5.24%',
    },
    Periodic: {
      title: 'Periodic Alert',
      description: 'Receive price updates at regular time intervals.',
      badgeText: 'SOL',
      badgeValue: '$142.10',
    },
    Volume: {
      title: 'Volume Alert',
      description: 'Get notified of unusual trading volume.',
      badgeText: 'DOGE',
      badgeValue: 'Vol: 2.1B',
    },
    Funding: {
      title: 'Funding Rates Alert',
      description: 'Get notified when funding rates shift significantly.',
      badgeText: 'BTC-PERP',
      badgeValue: '0.01%',
    },
    Marketcap: {
      title: 'MarketCap Alert',
      description: 'Monitor the total crypto market capitalization.',
      badgeText: 'GLOBAL',
      badgeValue: '$2.3T',
    },
    Dominance: {
      title: 'Dominance Alert',
      description: 'Track Bitcoin dominance percentage vs altcoins.',
      badgeText: 'BTC.D',
      badgeValue: '51.2%',
    },
    Stocks: {
      title: 'Stock Market Alert',
      description: 'Get notified when a stock price crosses your target.',
      badgeText: 'AAPL',
      badgeValue: '$189.50',
    }
  };

  const config = tabConfig[activeTab as keyof typeof tabConfig];

  return (
    <div className="h-full overflow-y-auto p-6 md:p-8 flex flex-col items-center bg-transparent no-scrollbar">
      
      {/* Main Card */}
      <div className="w-full max-w-[650px] card-base p-6 md:p-8 shadow-2xl transition-all">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#14161A] border border-[#212429] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white mb-1 transition-all">{config.title}</h1>
              <p className="text-sm text-[#8A8E98] transition-all">{config.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary/40 border border-[#1D3C2F] rounded-full px-3 py-1.5 shrink-0 transition-all">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] text-[#8A8E98] font-bold uppercase">{config.badgeText}</span>
            <span className="text-sm text-primary font-bold">{config.badgeValue}</span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Coin</label>
            <button className="w-full bg-[#14161A] border border-[#212429] rounded-lg p-3 flex items-center justify-between text-white text-sm hover:border-[#3A3E46] transition-colors">
              <div className="flex items-center gap-2">
                <Bitcoin className="w-4 h-4 text-[#8A8E98]" />
                <span>Bitcoin (BTC)</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#8A8E98]" />
            </button>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Exchange</label>
            <button className="w-full bg-[#14161A] border border-[#212429] rounded-lg p-3 flex items-center justify-between text-white text-sm hover:border-[#3A3E46] transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-[#8A8E98] flex items-center justify-center text-[8px] text-[#8A8E98]">C</div>
                <span>Coinbase</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#8A8E98]" />
            </button>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Currency</label>
            <button className="w-full bg-[#14161A] border border-[#212429] rounded-lg p-3 flex items-center justify-between text-white text-sm hover:border-[#3A3E46] transition-colors">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#8A8E98]" />
                <span>USD — Dollar</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#8A8E98]" />
            </button>
          </div>
        </div>

        {/* Direction and Target Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Direction</label>
            <div className="bg-[#14161A] border border-[#212429] rounded-lg flex p-1">
              <button 
                onClick={() => setDirection('Above')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-colors ${direction === 'Above' ? 'bg-[#2A2E36] text-white' : 'text-[#8A8E98] hover:text-white'}`}
              >
                <ArrowUp className="w-4 h-4" />
                Above
              </button>
              <button 
                onClick={() => setDirection('Below')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-colors ${direction === 'Below' ? 'bg-[#2A2E36] text-white' : 'text-[#8A8E98] hover:text-white'}`}
              >
                <ArrowDown className="w-4 h-4" />
                Below
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Target Price</label>
            <div className="bg-[#14161A] border border-[#212429] rounded-lg p-3 flex items-center gap-2 text-white hover:border-[#3A3E46] transition-colors focus-within:border-[#3A3E46]">
              <span className="text-[#8A8E98]">$</span>
              <input type="text" placeholder="0.00" className="bg-transparent border-none outline-none w-full text-white placeholder:text-[#3A3E46]" />
            </div>
          </div>
        </div>

        {/* Notify Via */}
        <div className="mb-8">
          <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Notify Via</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {notifyOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = notifyVia === opt.id;
              return (
                <button 
                  key={opt.id}
                  onClick={() => setNotifyVia(opt.id)}
                  className={`border rounded-lg p-2.5 flex items-center gap-2 text-sm transition-colors ${isActive ? 'bg-[#2A2E36] border-[#2A2E36] text-white' : 'bg-[#14161A] border-[#212429] text-[#8A8E98] hover:border-[#3A3E46] hover:text-white'}`}
                >
                  <Icon className="w-4 h-4" />
                  {opt.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cooldown and Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Cooldown</label>
            <div className="grid grid-cols-4 gap-2">
              {cooldownOptions.map((cd) => (
                <button 
                  key={cd}
                  onClick={() => setCooldown(cd)}
                  className={`border py-2 rounded-lg text-sm transition-colors ${cooldown === cd ? 'bg-[#2A2E36] border-[#2A2E36] text-white' : 'bg-[#14161A] border-[#212429] text-[#8A8E98] hover:border-[#3A3E46] hover:text-white'}`}
                >
                  {cd}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#8A8E98] italic mt-3">Wait time between alerts</p>
          </div>
          <div>
            <label className="block text-[10px] uppercase text-[#8A8E98] font-semibold tracking-wider mb-2">Note (Optional)</label>
            <div className="relative">
              <textarea 
                placeholder="e.g. ATH breakout watch..." 
                className="w-full bg-[#14161A] border border-[#212429] rounded-lg p-3 text-white h-[90px] resize-none text-sm outline-none hover:border-[#3A3E46] focus:border-[#3A3E46] transition-colors placeholder:text-[#3A3E46]"
              />
              <span className="absolute bottom-3 right-3 text-[#3A3E46] text-[10px]">0/100</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#212429] mt-2 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOneTime(!oneTime)}
              className={`w-10 h-5 rounded-full flex items-center transition-colors p-0.5 ${oneTime ? 'bg-[#34D399]' : 'bg-[#2A2E36]'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${oneTime ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <div>
              <div className="text-white text-sm font-semibold mb-0.5">One-time alert</div>
              <div className="text-[#8A8E98] text-[10px]">Get notified only once when this alert triggers.</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#3A3E46] text-[10px]">0 active alerts</span>
            <button className="btn-primary rounded-full">
              <span>Set alert</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#0A0C10] border border-[#212429] rounded-full p-1.5 flex items-center text-[#8A8E98] text-sm mt-8 w-fit mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full whitespace-nowrap transition-colors ${isActive ? 'bg-primary text-black font-semibold shadow-teal-sm' : 'hover:text-white'}`}
            >
              <Icon className="w-4 h-4" />
              {tab.id}
            </button>
          )
        })}
      </div>
      
    </div>
  );
}

