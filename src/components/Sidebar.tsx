'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store';
import {
  LayoutDashboard,
  LineChart,
  Bell,
  TrendingUp,
  Activity,
  Users,
  Trophy,
  ShoppingCart,
  Globe,
  CheckCircle,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard',         path: '/dashboard',      icon: LayoutDashboard },
  { name: 'Alpha Trade',       path: '/alpha-trade',    icon: Globe },
  { name: 'Trade',             path: '/trade',           icon: LineChart },
  { name: 'Signals',           path: '/social-signals',  icon: TrendingUp },
  { name: 'Agent Marketplace', path: '/marketplace',     icon: ShoppingCart },
  { name: 'Market Radar',      path: '/market-radar',    icon: Activity },
  { name: 'Missions & Referrals', path: '/tasks',       icon: CheckCircle },
  { name: 'Create Alerts',     path: '/alerts',          icon: Bell },
  { name: 'Community',         path: '/community',       icon: Users },
  { name: 'Leaderboard',       path: '/leaderboard',     icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();
  const { streak } = useUserStore();

  return (
    <aside
      style={{
        width: '205px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#191D1E',
        borderRight: '1px solid #141414',
      }}
    >
      <nav
        style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
        }}
        className="no-scrollbar"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                backgroundColor: isActive ? '#121212' : 'transparent',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.025)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Active glow indicator elements (nested inside overflow: hidden container) */}
              {isActive && (
                <>
                  {/* Glowing vertical pill */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3.5px',
                      backgroundColor: '#4dd9c0',
                      boxShadow: '0 0 14px 2px rgba(77, 217, 192, 0.8)',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                      zIndex: 2,
                    }}
                  />
                  {/* Soft rightward gradient flare */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '60px',
                      background: 'linear-gradient(90deg, rgba(77, 217, 192, 0.22) 0%, rgba(77, 217, 192, 0) 100%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}

              {/* Icon */}
              <Icon
                style={{
                  width: '18px',
                  height: '18px',
                  color: isActive ? '#e8e8e8' : '#707885',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 3,
                  transition: 'color 0.15s ease',
                }}
              />

              {/* Label */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', zIndex: 3 }}>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? '#ffffff' : '#707885',
                    letterSpacing: '0.01em',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {item.name}
                </span>

              </div>
            </Link>
          );
        })}
      </nav>

      {/* Streak footer */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid #141414',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: '#3d5059' }}>Daily Streak</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#fb923c' }}>🔥 {streak}</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '4px',
            borderRadius: '99px',
            overflow: 'hidden',
            backgroundColor: '#161616',
          }}
        >
          <div
            style={{
              width: '75%',
              height: '100%',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #34d399, #3ae099)',
            }}
          />
        </div>
      </div>
    </aside>
  );
}
