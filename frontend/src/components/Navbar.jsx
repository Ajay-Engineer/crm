import React from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Sparkles,
  Plus,
  Search,
  Menu,
  X,
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
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useCrm();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-200/80 px-3 sm:px-6 py-2.5 shadow-sm">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="relative group shrink-0">
              <img
                src="/logo.png"
                alt="HIG AI Automation Logo"
                className="h-8 sm:h-9 w-auto rounded border border-brand-300 shadow-sm transition-transform group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                  HIG AI AUTOMATION
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 border border-brand-200">
                  Universal OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                Business Operations & CRM Platform
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads, deals, contacts, custom objects..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-brand-400 focus:bg-white rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all shadow-inner"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 border border-slate-300">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* AWS Live DynamoDB Status Badge */}
          <button
            onClick={() => setActiveTab('aws_hub')}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs text-brand-800 hover:bg-brand-100 transition-all shadow-sm"
            title="Click to view AWS DynamoDB Status"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800 text-[11px] hidden md:inline">AWS DynamoDB</span>
            <span className="text-[10px] text-brand-600 font-mono font-bold">ap-south-1</span>
          </button>

          {/* Quick Create Buttons */}
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-500" />
            <span>Lead</span>
          </button>

          <button
            onClick={() => setIsAddDealModalOpen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden xs:inline">New Deal</span>
          </button>

          {/* AI Copilot Action Button */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-brand-50 border border-brand-300 text-xs font-bold text-brand-700 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
            <span className="hidden sm:inline">HIG Copilot</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center pl-1 sm:pl-2 border-l border-slate-200">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#38b6ff] to-[#0284c7] p-[1px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[11px] sm:text-xs font-extrabold text-brand-700">
                AJ
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
