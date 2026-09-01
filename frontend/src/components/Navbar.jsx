import React from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Sparkles,
  Plus,
  Search,
  Bell,
  CheckCircle2,
  Database,
  Cloud,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const {
    awsStatus,
    setIsAiDrawerOpen,
    setIsAddLeadModalOpen,
    setIsAddDealModalOpen,
    setActiveTab,
    activeTab
  } = useCrm();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-brand-500/20 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative group">
            <img
              src="/logo.png"
              alt="HIG AI Automation Logo"
              className="h-9 w-auto rounded border border-brand-400/40 shadow-glow transition-transform group-hover:scale-105"
            />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">HIG AI AUTOMATION</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Universal OS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Business Operations & CRM Platform</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads, deals, contacts, custom objects..."
              className="w-full bg-slate-950/80 border border-slate-700/70 focus:border-brand-400 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-400 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-2.5">
          {/* AWS Live DynamoDB Status Badge */}
          <button
            onClick={() => setActiveTab('aws_hub')}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950 border border-brand-500/30 text-xs text-slate-300 hover:border-brand-400 hover:text-brand-300 transition-all"
            title="Click to view AWS & Firebase Deployment details"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-200 text-[11px] hidden sm:inline">AWS DynamoDB</span>
            <span className="text-[10px] text-brand-400 font-mono">ap-south-1</span>
          </button>

          {/* Quick Create Buttons */}
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-white transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-400" />
            <span>Lead</span>
          </button>

          <button
            onClick={() => setIsAddDealModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>New Deal</span>
          </button>

          {/* AI Copilot Action Button */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 border border-brand-400/50 text-xs font-semibold text-brand-300 shadow-glow transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
            <span className="hidden md:inline">HIG Copilot</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-brand-300">
                AJ
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
