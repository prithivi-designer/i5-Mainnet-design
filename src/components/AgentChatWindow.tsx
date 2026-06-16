'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

interface AgentChatWindowProps {
  agent: {
    title: string;
    description: string;
    icon: any;
    iconColor: string;
    iconBg: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentChatWindow({ agent, isOpen, onClose }: AgentChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && agent && messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'agent',
          content: `Hi! I'm the ${agent.title}. How can I help you today?`,
        }
      ]);
    }
  }, [isOpen, agent, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I'm an AI simulation. In a real app, I would process your request for "${inputValue}" using real-time blockchain telemetry, social feeds, and market analysis.`,
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen || !agent) return null;

  const Icon = agent.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0c0c0c] border-l border-[#222] z-50 flex flex-col shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#222] bg-[#0c0c0c]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: agent.iconBg }} 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5"
                >
                  <Icon style={{ color: agent.iconColor }} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none">{agent.title}</h3>
                  <span className="text-xs text-[#34d399] font-semibold mt-1 inline-flex items-center gap-1.5">
                    <span className="live-dot" /> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#080808]">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                    message.role === 'user' 
                      ? "bg-[#111] border-[#222] text-[#34d399]" 
                      : "border-white/5"
                  )} style={message.role === 'agent' ? { backgroundColor: agent.iconBg } : undefined}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Icon style={{ color: agent.iconColor }} className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "py-2.5 px-4 rounded-2xl text-[14px] leading-relaxed",
                    message.role === 'user' 
                      ? "bg-[#0f2d2a] border border-[#1b4c47] text-white rounded-tr-sm" 
                      : "bg-[#141414] border border-[#222] text-gray-200 rounded-tl-sm"
                  )}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                   <div 
                     style={{ backgroundColor: agent.iconBg }} 
                     className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/5"
                   >
                      <Icon style={{ color: agent.iconColor }} className="w-4 h-4" />
                   </div>
                   <div className="py-2.5 px-4 rounded-2xl bg-[#141414] border border-[#222] rounded-tl-sm flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-[#34d399] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-1.5 h-1.5 bg-[#34d399] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-1.5 h-1.5 bg-[#34d399] rounded-full animate-bounce"></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-[#0c0c0c] border-t border-[#222]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#34d399]/20 focus:border-[#34d399] transition-all text-white placeholder-gray-600"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 bg-[#34d399] hover:bg-[#3ae099] disabled:opacity-30 disabled:bg-[#1a1a1a] text-black rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2 text-[11px] text-gray-500">
                AI can make mistakes. Verify important information.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
