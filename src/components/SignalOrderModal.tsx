import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SignalOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: string;
  initialSide: 'Long' | 'Short';
}

export function SignalOrderModal({ isOpen, onClose, asset, initialSide }: SignalOrderModalProps) {
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'PRO'>('MARKET');
  const [side, setSide] = useState<'Long' | 'Short'>(initialSide);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#0d0d0d] border border-[#222] rounded-2xl w-full max-w-[400px] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header / Close */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#111] hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 mt-2">
          <div className="flex gap-2">
            <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">Cross</button>
            <button className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white py-2 rounded font-sans text-xs font-semibold tracking-wide transition-colors">10x</button>
          </div>
          
          <div className="flex border-b border-[#222] text-xs font-sans font-bold text-gray-500 tracking-wider pt-2">
            {(['MARKET', 'LIMIT', 'PRO'] as const).map(t => (
              <button key={t}
                onClick={() => setOrderType(t)}
                className={cn('pb-2 mr-6 transition-colors', orderType === t ? 'text-white border-b-2 border-white' : 'hover:text-white')}>
                {t}{t === 'PRO' && <ChevronDown className="w-3 h-3 inline ml-0.5" />}
              </button>
            ))}
          </div>
          
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase tracking-widest text-[10px]">Available to Trade</span>
              <span className="text-white font-medium text-xs">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase tracking-widest text-[10px]">Current Position</span>
              <span className="text-white font-medium text-xs">0 {asset}</span>
            </div>
          </div>
          
          <div className="flex gap-2 pt-1">
            <button onClick={() => setSide('Long')}
              className={cn('flex-1 py-2 text-sm font-bold rounded transition-colors',
                side === 'Long' ? 'bg-[#022c22] text-[#34d399] border border-[#065f46]' : 'text-gray-400 border border-transparent hover:text-white')}>
              Long
            </button>
            <button onClick={() => setSide('Short')}
              className={cn('flex-1 py-2 text-sm font-bold rounded transition-colors',
                side === 'Short' ? 'bg-[#451a1a] text-[#fa6432] border border-[#7f1d1d]' : 'text-gray-400 border border-transparent hover:text-white')}>
              Short
            </button>
          </div>
          
          <div className="flex p-3 bg-[#111] border border-[#333] rounded items-center focus-within:border-gray-400 transition-colors">
            <span className="text-gray-500 w-16 text-sm">Size</span>
            <input type="text" className="bg-transparent flex-1 outline-none text-right text-white font-medium text-sm"
              placeholder="0.00" style={{ border: 'none', padding: 0, borderRadius: 0 }} />
            <button className="flex items-center gap-1 text-gray-300 ml-4 pl-4 border-l border-[#333] text-sm">
              USD <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-[#1a1a1a] rounded flex items-center relative border border-[#222]">
              <div className="absolute inset-y-0 left-0 bg-[#fa6432] w-[5%] rounded-l opacity-50" />
              <div className="absolute left-[5%] -ml-1 w-2 h-4 bg-[#fa6432] rounded-sm" />
            </div>
            <div className="bg-[#111] border border-[#333] px-2 py-1 rounded text-gray-400 min-w-[40px] text-center text-xs">0%</div>
          </div>
          
          <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 pt-1">
            <div className="w-3.5 h-3.5 border border-gray-600 rounded-sm bg-transparent" />
            <span className="font-sans text-xs tracking-wide">Take Profit / Stop Loss</span>
          </label>
          
          <button className="w-full py-3.5 flex items-center justify-center gap-2 font-bold font-sans tracking-widest uppercase text-[13px] text-white transition-all hover:opacity-95 active:scale-[0.99] mt-2"
            style={{
              background: side === 'Long' ? 'linear-gradient(180deg, #025247 0%, #01433a 100%)' : 'linear-gradient(180deg, #7f1d1d 0%, #451a1a 100%)',
              border: side === 'Long' ? '1px solid #045a4f' : '1px solid #991b1b',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
            }}>
            {side} {asset}
          </button>
          
          <div className="space-y-2.5 mt-4 pt-4 border-t border-[#1a1a1a]">
            {[
              ['Liquidation Price', 'N/A', 'text-white'],
              ['Order Value', '$0.00', 'text-white'],
              ['Margin Required', '$0.00', 'text-white'],
              ['Slippage', 'Est: 0.00% / Max 8%', 'text-[#fa6432]'],
              ['Fees', '0.0450% / 0.0150%', 'text-white'],
            ].map(([label, value, cls]) => (
              <div key={label} className="flex justify-between items-center text-xs">
                <span className="text-gray-500 uppercase tracking-widest text-[9px]">{label}</span>
                <span className={`font-mono ${cls}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
