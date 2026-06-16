import React from 'react';
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Zap, 
  Shield, 
  Users 
} from 'lucide-react';
import Image from 'next/image';

export function AlphaTrade() {
  return (
    <div className="h-full overflow-y-auto bg-[#050505] no-scrollbar">
      <div className="max-w-[1400px] mx-auto p-6 md:p-12 lg:p-16">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 min-h-[60vh]">
          
          {/* Left Content */}
          <div className="flex-1 w-full flex flex-col items-start z-10">
            {/* Trust Badge */}
            <div className="flex items-center gap-2 bg-[#0A0C10] border border-[#1a1c20] rounded-full px-4 py-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-medium text-[#8A8E98]">
                Trusted by <span className="text-white font-semibold">12,000+</span> traders
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight mb-6 flex flex-wrap gap-x-4 uppercase">
              <span className="text-white">Alpha</span>
              <span className="text-gradient-teal">Trade</span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-[#34d399] rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span className="text-lg md:text-xl font-medium text-[#c4c8d0]">
                Smart Signals. Real Edge.
              </span>
            </div>

            {/* Description */}
            <p className="text-[15px] md:text-[17px] text-[#8A8E98] leading-relaxed max-w-lg mb-3">
              Long and short tokens together in your Telegram group. Share alpha, copy, and countertrade your friends.
            </p>
            <p className="text-sm font-semibold text-[#3d5059] mb-10">
              Don't get liquidated.
            </p>

            {/* CTA Button */}
            <button className="btn-primary rounded-[14px] px-8 py-3.5 mb-10 shadow-teal text-[15px]">
              <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center mr-2">
                <Send className="w-3 h-3 text-white" />
              </div>
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-[#1a1c20] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=44" alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-[#1a1c20] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-[#1a1c20] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050505] bg-[#0E1F1A] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#34d399]">+12K</span>
                </div>
              </div>
              <p className="text-xs text-[#8A8E98] leading-tight">
                Join <strong className="text-white font-semibold">12,000+</strong> traders<br/>
                growing together
              </p>
            </div>
          </div>

          {/* Right Graphic - Dotted Globe Representation */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative mt-10 lg:mt-0 z-10">
            <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
              {/* Background ambient glow */}
              <div className="absolute w-[60%] h-[60%] bg-[#34d399] rounded-full blur-[140px] opacity-[0.08] pointer-events-none" />
              
              <Image 
                src="/Images/Right_Graphic_Column.png" 
                alt="Alpha Trade Network Globe" 
                width={480} 
                height={480}
                className="object-contain w-full h-full max-w-[480px] max-h-[480px]"
                priority
              />
            </div>
          </div>

        </div>

        {/* Features Bottom Bar */}
        <div className="mt-20 lg:mt-32 w-full card-base bg-[#080A0C] border-[#111418] rounded-[2rem] p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Vertical Dividers (Hidden on mobile) */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[33.33%] w-px bg-gradient-to-b from-transparent via-[#1a1d24] to-transparent" />
            <div className="hidden md:block absolute top-0 bottom-0 left-[66.66%] w-px bg-gradient-to-b from-transparent via-[#1a1d24] to-transparent" />

            {/* Feature 1 */}
            <div className="flex gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0a1010] border border-[#101b1a] flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#34d399]" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-2">Fast Execution</h3>
                <p className="text-[13px] text-[#707885] leading-relaxed">
                  Zero-latency trade signals delivered directly to your Telegram chat.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0a0d14] border border-[#101520] flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-[#60a5fa]" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-2">Non-Custodial</h3>
                <p className="text-[13px] text-[#707885] leading-relaxed">
                  Connect your wallet and trade securely through Hyperliquid's SDK.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0a1410] border border-[#10201a] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#34d399]" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-2">Social Copy</h3>
                <p className="text-[13px] text-[#707885] leading-relaxed">
                  Follow the winners and counter the whales with one click.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
