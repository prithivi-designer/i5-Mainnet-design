'use client';

import { useState } from 'react';
import { Waves, TrendingUp, Newspaper, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentChatWindow } from '@/components/AgentChatWindow';

const agents = [
  {
    id: 1,
    title: 'Whale Detection Agent',
    description: 'Monitors on-chain wallet movements in real time to alert you on large token inflows and outflows that may signal upcoming price action or market manipulation.',
    icon: Waves,
    iconColor: '#60a5fa',
    iconBg: 'rgba(96, 165, 250, 0.08)',
    iconBorder: 'rgba(96, 165, 250, 0.2)',
    borderTop: 'from-transparent via-blue-500/80 to-transparent',
    stats: [
      { label: 'Accuracy', value: '94.8%' },
      { label: 'Latency', value: '25ms' },
      { label: 'Type', value: 'On-chain' }
    ]
  },
  {
    id: 2,
    title: 'Social Sentiment Agent',
    description: 'Analyses Twitter/X, Reddit and Telegram in real time to gauge crowd sentiment and identify narrative shifts before they move the market.',
    icon: TrendingUp,
    iconColor: '#c084fc',
    iconBg: 'rgba(192, 132, 252, 0.08)',
    iconBorder: 'rgba(192, 132, 252, 0.2)',
    borderTop: 'from-transparent via-purple-500/80 to-transparent',
    stats: [
      { label: 'Accuracy', value: '89.2%' },
      { label: 'Latency', value: '120ms' },
      { label: 'Type', value: 'NLP AI' }
    ]
  },
  {
    id: 3,
    title: 'News Agent',
    description: 'Aggregates top crypto news feeds and summarises breaking headlines that could impact your open positions, so you never miss a market-moving event.',
    icon: Newspaper,
    iconColor: '#f97316',
    iconBg: 'rgba(249, 115, 22, 0.08)',
    iconBorder: 'rgba(249, 115, 22, 0.2)',
    borderTop: 'from-transparent via-orange-500/80 to-transparent',
    stats: [
      { label: 'Speed', value: 'Instant' },
      { label: 'Feeds', value: '80+' },
      { label: 'Type', value: 'LLM Agent' }
    ]
  }
];

export function Marketplace() {
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);

  return (
    <div className="h-full overflow-y-auto bg-[#080808] text-gray-200 p-8 bg-grid bg-teal-glow no-scrollbar">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-[#141414] pb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient-teal mb-3">
            AI Trading Assistants
          </h1>
          <p className="text-gray-400 text-[15px] max-w-2xl leading-relaxed">
            Deploy specialized, autonomous AI agents to monitor blockchain activity, analyze crowdsourced sentiment, and filter news alerts in real time.
          </p>
        </div>
        
        {/* Grid of Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map(agent => {
            const Icon = agent.icon;
            return (
              <div 
                key={agent.id} 
                className="relative card-base p-8 flex flex-col justify-between group overflow-hidden"
              >
                {/* The subtle gradient top border */}
                <div className={cn("absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r", agent.borderTop)} />

                <div>
                  {/* Status Indicator & Category */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-[#34d399] uppercase bg-[#34d399]/5 px-2.5 py-1 rounded-md border border-[#34d399]/15">
                      Autonomous
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="live-dot" />
                      <span className="text-[11px] font-medium text-gray-400">Online</span>
                    </div>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      style={{ 
                        backgroundColor: agent.iconBg, 
                        borderColor: agent.iconBorder 
                      }} 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                    >
                      <Icon style={{ color: agent.iconColor }} className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient-teal transition-all">
                      {agent.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-8 text-[14px] min-h-[72px]">
                    {agent.description}
                  </p>

                  {/* Performance stats row */}
                  <div className="grid grid-cols-3 gap-2 py-4 px-4 bg-black/40 rounded-xl border border-[#141414] mb-8">
                    {agent.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                          {stat.label}
                        </div>
                        <div className="text-[13px] font-bold text-white font-mono">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedAgent(agent)}
                  className="w-full btn-primary py-3.5 px-4 rounded-xl text-white font-bold text-sm cursor-pointer shadow-teal flex items-center justify-center gap-2"
                >
                  <MessageSquareText className="w-4 h-4" />
                  Start Chat
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <AgentChatWindow 
        agent={selectedAgent} 
        isOpen={selectedAgent !== null} 
        onClose={() => setSelectedAgent(null)} 
      />
    </div>
  );
}
