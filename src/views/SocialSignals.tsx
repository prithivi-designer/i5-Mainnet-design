'use client';

import { useState } from 'react';
import { TechnicalSignals } from './TechnicalSignals';
import { MacroSignals } from './MacroSignals';
import { cn } from '@/lib/utils';
import { CopyTradeModal, CopyTradeStep } from '@/components/CopyTradeModal';
import { Settings, SlidersHorizontal } from 'lucide-react';

export function SocialSignals() {
  const [activeTab, setActiveTab] = useState<'technical' | 'macro'>('technical');
  const [copyStep, setCopyStep] = useState<CopyTradeStep>('none');

  const handleTradeClick = () => {
    setCopyStep('incompatible');
  };

  return (
    <div className="flex flex-col h-full bg-[#080808] overflow-hidden relative">
      {/* Top Bar matching screenshot */}
      <div className="flex items-center justify-between border-b border-[#141414] px-6 h-[58px] shrink-0 bg-[#080808]">
        {/* Tabs */}
        <div className="flex items-center h-full gap-8">
          <button
            onClick={() => setActiveTab('technical')}
            className={cn(
              "h-full px-1 text-[13px] font-bold uppercase tracking-wider relative transition-colors font-sans",
              activeTab === 'technical' ? "text-[#34d399]" : "text-gray-500 hover:text-gray-300"
            )}
          >
            Technical Signals
            {activeTab === 'technical' && (
              <div className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#34d399] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('macro')}
            className={cn(
              "h-full px-1 text-[13px] font-bold uppercase tracking-wider relative transition-colors font-sans",
              activeTab === 'macro' ? "text-[#34d399]" : "text-gray-500 hover:text-gray-300"
            )}
          >
            Macro Signals
            {activeTab === 'macro' && (
              <div className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#34d399] rounded-t-full" />
            )}
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Settings Button */}
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#222] bg-[#0c0c0c] hover:border-gray-500 hover:bg-[#121212] transition-all text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
          
          {/* Filters Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222] bg-[#0c0c0c] hover:border-gray-500 hover:bg-[#121212] transition-all text-[12px] font-bold text-gray-300 hover:text-white">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            <span className="w-4 h-4 rounded-full bg-[#34d399] text-[#080808] flex items-center justify-center text-[10px] font-black leading-none">
              2
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'technical' ? (
          <TechnicalSignals hideHeader onTradeClick={handleTradeClick} />
        ) : (
          <MacroSignals hideHeader onTradeClick={handleTradeClick} />
        )}
      </div>

      <CopyTradeModal 
        step={copyStep} 
        onClose={() => setCopyStep('none')} 
        setStep={setCopyStep} 
      />
    </div>
  );
}
