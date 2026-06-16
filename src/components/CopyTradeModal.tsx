'use client';

import { useState } from 'react';
import { AlertCircle, Building2, Bot, CheckCircle2, Copy, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CopyTradeStep = 'none' | 'incompatible' | 'dex' | 'account_type' | 'setup' | 'created';

export function CopyTradeModal({
  step,
  onClose,
  setStep
}: {
  step: CopyTradeStep;
  onClose: () => void;
  setStep: (step: CopyTradeStep) => void;
}) {
  const [selectedDex, setSelectedDex] = useState<string>('');
  const [selectedAccountType, setSelectedAccountType] = useState<'Agent' | 'Manual' | ''>('');

  if (step === 'none') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-border">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          
          {step === 'incompatible' && (
            <>
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold mb-4">Incompatible Account Type</h2>
              <p className="text-muted-foreground text-sm mb-6">
                You're trying to perform an action that this account type doesn't support.
              </p>
              <p className="text-sm italic text-muted-foreground/80 mb-8 max-w-xs">
                Tip: Agent trading accounts are used for strategy trading, while Manual accounts are for terminal trading.
              </p>
              <button 
                onClick={() => setStep('dex')}
                className="w-full bg-[#fa6432] text-white font-bold rounded-xl py-3.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                + Setup New Agent Account
              </button>
            </>
          )}

          {step === 'dex' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#fa6432]/10 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-[#fa6432]" />
              </div>
              <h2 className="text-xl font-bold mb-4">Choose Your DEX</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Select your trading platform.
                <br/><br/>
                Currently we support:
              </p>
              <div className="flex flex-wrap justify-center gap-3 w-full mb-8">
                {['Hyperliquid', 'Pacifica', 'Extended'].map(dex => (
                  <button
                    key={dex}
                    onClick={() => setSelectedDex(dex)}
                    className={cn(
                      "px-4 py-3 rounded-xl border flex items-center gap-2 text-sm font-medium transition-all",
                      selectedDex === dex ? "border-[#fa6432] bg-[#fa6432]/10 text-[#fa6432]" : "border-border bg-card hover:bg-secondary text-muted-foreground"
                    )}
                  >
                    <div className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    {dex}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setStep('account_type')}
                disabled={!selectedDex}
                className={cn(
                  "w-full font-bold rounded-xl py-3.5 transition-all text-white",
                  selectedDex ? "bg-[#fa6432] hover:opacity-90 cursor-pointer" : "bg-secondary cursor-not-allowed opacity-50 text-muted-foreground"
                )}
              >
                Next
              </button>
            </>
          )}

          {step === 'account_type' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#fa6432]/10 flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-[#fa6432]" />
              </div>
              <h2 className="text-xl font-bold mb-6">Choose Your Account Type</h2>
              
              <div className="space-y-4 w-full mb-8 text-left">
                <button 
                  onClick={() => setSelectedAccountType('Agent')}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left flex flex-col gap-2",
                    selectedAccountType === 'Agent' ? "border-[#fa6432] bg-[#fa6432]/5" : "border-border bg-card hover:bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-3">
                     <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", selectedAccountType === 'Agent' ? "border-[#fa6432]" : "border-muted-foreground")}>
                        {selectedAccountType === 'Agent' && <div className="w-2 h-2 rounded-full bg-[#fa6432]" />}
                     </div>
                     <span className="font-bold">Agent Trading</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                    Mirror top-performing traders automatically. The system copies and executes their trades on your behalf.
                  </p>
                </button>

                <button 
                  onClick={() => setSelectedAccountType('Manual')}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left flex flex-col gap-2",
                    selectedAccountType === 'Manual' ? "border-[#fa6432] bg-[#fa6432]/5" : "border-border bg-card hover:bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-3">
                     <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", selectedAccountType === 'Manual' ? "border-[#fa6432]" : "border-muted-foreground")}>
                        {selectedAccountType === 'Manual' && <div className="w-2 h-2 rounded-full bg-[#fa6432]" />}
                     </div>
                     <span className="font-bold">Manual Trading</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                    Receive alerts and place each trade yourself via Terminal. Full control over every decision.
                  </p>
                </button>
              </div>

              <button 
                onClick={() => setStep('setup')}
                disabled={!selectedAccountType}
                className={cn(
                  "w-full font-bold rounded-xl py-3.5 transition-all text-white",
                  selectedAccountType ? "bg-[#fa6432] hover:opacity-90 cursor-pointer" : "bg-secondary cursor-not-allowed opacity-50 text-muted-foreground"
                )}
              >
                Next
              </button>
            </>
          )}

          {step === 'setup' && (
            <>
              <div className="w-16 h-16 rounded-full bg-[#fa6432]/10 flex items-center justify-center mb-6">
                <Copy className="w-8 h-8 text-[#fa6432]" />
              </div>
              <h2 className="text-xl font-bold mb-6">Set Up {selectedAccountType} Account</h2>
              
              <div className="w-full bg-secondary/30 rounded-xl p-5 border border-border mb-8">
                <div className="flex justify-between items-center py-2 border-b border-border/50 text-sm">
                   <span className="text-muted-foreground">DEX:</span>
                   <span className="font-medium">{selectedDex}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm">
                   <span className="text-muted-foreground">Account Type:</span>
                   <span className="font-medium">{selectedAccountType}</span>
                </div>
              </div>

              <button 
                onClick={() => setStep('created')}
                className="w-full bg-[#fa6432] text-white font-bold rounded-xl py-3.5 hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>
            </>
          )}

          {step === 'created' && (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold mb-8">Strategy Account Created</h2>
              
              <div className="w-full text-left mb-8">
                <div className="text-sm text-muted-foreground border-border font-medium mb-2">Address:</div>
                <div className="flex bg-secondary/50 p-4 rounded-xl border border-border justify-between items-center w-full">
                   <span className="font-mono text-sm">0xf4272c..c79a0c</span>
                   <button className="text-muted-foreground hover:text-foreground">
                     <Copy className="w-4 h-4" />
                   </button>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-full bg-[#fa6432] text-white font-bold rounded-xl py-3.5 hover:opacity-90 transition-opacity mb-4"
              >
                Fund Your Account to Get Started
              </button>
              <p className="text-sm text-muted-foreground">Min $50 needed to get started</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
