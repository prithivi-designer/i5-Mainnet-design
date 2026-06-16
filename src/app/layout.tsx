import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/TopNav';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Alerts & Signals v2.0 — AI-Powered Crypto Trading',
  description:
    'Real-time crypto alerts, AI trading signals, market radar, leaderboard, and more. Powered by Alerts & Signals v2.0.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-background text-foreground antialiased"
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
        <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
          <TopNav />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-hidden relative" style={{ backgroundColor: '#0a0a0a' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
