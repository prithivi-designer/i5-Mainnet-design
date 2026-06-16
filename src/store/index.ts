import { create } from 'zustand';

export type Tier = 'Free' | 'Starter' | 'Pro';

export interface UserState {
  tier: Tier;
  credits: number;
  tokens: number;
  xp: number;
  streak: number;
  messagesRemaining: number;
  setTier: (tier: Tier) => void;
  addCredits: (amount: number) => void;
  useCredit: (amount?: number) => boolean;
  addXP: (amount: number) => void;
  useMessage: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  tier: 'Free',
  credits: 50, // Starting credits for demo
  tokens: 1000, // Starting Alerts and signals Token balance
  xp: 1250,
  streak: 5,
  messagesRemaining: 10,
  setTier: (tier) => set({ 
    tier, 
    messagesRemaining: tier === 'Free' ? 10 : tier === 'Starter' ? 100 : 9999 
  }),
  addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
  useCredit: (amount = 1) => {
    if (get().credits >= amount) {
      set((state) => ({ credits: state.credits - amount }));
      return true;
    }
    return false;
  },
  addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
  useMessage: () => {
    const state = get();
    if (state.tier === 'Pro' || state.messagesRemaining > 0) {
      set((state) => ({ messagesRemaining: Math.max(0, state.messagesRemaining - 1) }));
      return true;
    }
    return false;
  }
}));
