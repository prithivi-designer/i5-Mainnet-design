'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Award, Sparkles, Globe, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Cohorts', path: '/cohorts', icon: Users, iconClass: 'text-gray-400 group-hover:text-white transition-colors' },
  { name: 'Copytrading', path: '/copytrading', icon: Award, iconClass: 'text-gray-400 group-hover:text-white transition-colors' },
  { name: 'Tagged', path: '/tagged', icon: Sparkles, iconClass: 'text-yellow-400' },
  { name: 'Global', path: '/global', icon: Globe, iconClass: 'text-gray-400 group-hover:text-white transition-colors' },
];

export function TradeNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 shrink-0 relative">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all text-xs font-semibold group",
              isActive 
                ? "border-[#555] bg-[#1a1a1a] text-white" 
                : "border-[#333] bg-transparent text-gray-300 hover:text-white hover:border-[#444] hover:bg-[#111]"
            )}
          >
            <item.icon className={cn("w-3.5 h-3.5", item.iconClass)} />
            {item.name}
          </Link>
        );
      })}
      
      {/* Set Alert Button */}
      <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#333] bg-transparent text-gray-300 hover:text-white hover:border-[#444] hover:bg-[#111] transition-all text-xs font-semibold group">
        <Bell className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
        Set Alert
      </button>
    </div>
  );
}
