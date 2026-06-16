'use client';

import Link from 'next/link';
import { Search, Sun, Bell } from 'lucide-react';

export function TopNav() {
  return (
    <header
      data-topnav
      className="h-[52px] flex items-center justify-between px-4 shrink-0"
      style={{
        backgroundColor: '#0d0d0d',
        borderBottom: '1px solid #1a2b30',
      }}
    >
      {/* Left — i5 Logo mark matching screenshots */}
      <Link href="/dashboard" className="flex items-center select-none shrink-0">
        <img
          src="/i5Logo.png"
          alt="i5 Logo"
          className="h-[28px] w-auto object-contain"
        />
      </Link>

      {/* Center — Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[220px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            style={{ color: '#526b75' }}
          />
          <input
            type="text"
            placeholder="Search here"
            className="w-full pl-8 pr-3 py-[5px] text-[13px] rounded-lg"
            style={{
              background: '#111',
              border: '1px solid #1a2b30',
              color: '#f5f5f5',
            }}
          />
        </div>
      </div>

      {/* Right — Icons + User */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: '#526b75' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#34d399')}
          onMouseLeave={e => (e.currentTarget.style.color = '#526b75')}
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg relative transition-colors"
          style={{ color: '#526b75' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#34d399')}
          onMouseLeave={e => (e.currentTarget.style.color = '#526b75')}
        >
          <Bell className="w-4 h-4" />
        </button>

        <Link href="/pro" className="flex items-center gap-2 ml-2 rounded-lg px-2 py-1 transition-colors hover:bg-[#121f24]">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden shrink-0"
            style={{ border: '1px solid #23353c', background: '#121f24' }}
          >
            <img
              src="https://i.pravatar.cc/100?u=stency"
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <span className="text-[13px] font-medium hidden sm:block" style={{ color: '#f5f5f5' }}>
            Stency Albert
          </span>
        </Link>
      </div>
    </header>
  );
}
