import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  LayoutDashboard,
  Kanban,
  UserCheck,
  Users,
  Building2,
  MessageSquare,
  Zap,
  Boxes,
  LifeBuoy,
  Bot,
  BarChart3,
  Cloud,
  Settings,
  ChevronRight,
  Sparkles,
  Flame,
  ChevronLeft
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, leads, deals, tickets, workflows } = useCrm();
  const [collapsed, setCollapsed] = useState(false);

  const openDealsCount = deals.filter((d) => d.status === 'open').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const openTicketsCount = tickets.filter((t) => t.status !== 'resolved').length;

  const navigationSections = [
    {
      title: 'CORE CRM',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'deals', label: 'Deal Pipeline', icon: Kanban, badge: openDealsCount, badgeColor: 'bg-brand-500/20 text-brand-300' },
        { id: 'leads', label: 'Lead Engine', icon: UserCheck, badge: newLeadsCount, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
        { id: 'contacts', label: 'Contacts & 360', icon: Users },
        { id: 'companies', label: 'Companies & Accounts', icon: Building2 },
      ],
    },
    {
      title: 'INTELLIGENCE & OPS',
      items: [
        { id: 'communications', label: 'Omnichannel Hub', icon: MessageSquare },
        { id: 'workflows', label: 'Workflow Automations', icon: Zap, badge: `${workflows.length} Active`, badgeColor: 'bg-amber-500/20 text-amber-300' },
        { id: 'custom_objects', label: 'Custom Objects Studio', icon: Boxes },
        { id: 'support', label: 'Support & SLA Helpdesk', icon: LifeBuoy, badge: openTicketsCount, badgeColor: 'bg-rose-500/20 text-rose-300' },
        { id: 'ai_analyst', label: 'AI Business Analyst', icon: Bot, isAi: true },
      ],
    },
    {
      title: 'ENTERPRISE & CLOUD',
      items: [
        { id: 'analytics', label: 'Analytics & Forecasts', icon: BarChart3 },
        { id: 'aws_hub', label: 'AWS & Firebase Deploy', icon: Cloud },
        { id: 'settings', label: 'Settings & RBAC', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`relative bg-slate-900/95 border-r border-brand-500/15 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Navigation Groups */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-300 border border-brand-400/40 shadow-glow font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-1 rounded ${
                          isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-brand-300'
                        } ${item.isAi ? 'text-brand-400 animate-pulse' : ''}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-current/20 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!collapsed && item.isAi && (
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud & Platform Status Card */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="p-2.5 rounded-lg border border-brand-500/20 bg-slate-900/80">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">AWS Infrastructure</span>
              <span className="text-[10px] text-emerald-400 font-mono">100% OK</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full w-full"></div>
            </div>
            <p className="text-[10px] text-slate-400">
              DynamoDB Serverless (ap-south-1)
            </p>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-slate-800 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
