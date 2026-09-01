import React from 'react';
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
  Layers,
  Settings,
  Sparkles,
  X,
  Building
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    leads,
    deals,
    tickets,
    workflows,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useCrm();

  const openDealsCount = deals.filter((d) => d.status === 'open').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const openTicketsCount = tickets.filter((t) => t.status !== 'resolved').length;

  const navigationSections = [
    {
      title: 'CORE CRM',
      items: [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'deals', label: 'Deal Pipeline', icon: Kanban, badge: openDealsCount, badgeColor: 'bg-brand-100 text-brand-700 border-brand-200' },
        { id: 'leads', label: 'Lead Engine', icon: UserCheck, badge: newLeadsCount, badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { id: 'contacts', label: 'Contacts & 360', icon: Users },
        { id: 'companies', label: 'Companies & Accounts', icon: Building2 },
      ],
    },
    {
      title: 'INTELLIGENCE & OPS',
      items: [
        { id: 'communications', label: 'Omnichannel Hub', icon: MessageSquare },
        { id: 'workflows', label: 'Workflow Automations', icon: Zap, badge: `${workflows.length} Active`, badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
        { id: 'custom_objects', label: 'Custom Objects Studio', icon: Boxes },
        { id: 'support', label: 'Support & SLA Helpdesk', icon: LifeBuoy, badge: openTicketsCount, badgeColor: 'bg-rose-100 text-rose-700 border-rose-200' },
        { id: 'ai_analyst', label: 'AI Business Analyst', icon: Bot, isAi: true },
      ],
    },
    {
      title: 'ANALYTICS & MANAGEMENT',
      items: [
        { id: 'analytics', label: 'Analytics & Forecasts', icon: BarChart3 },
        { id: 'aws_hub', label: 'Integrations & Apps', icon: Layers },
        { id: 'settings', label: 'Settings & Governance', icon: Settings },
      ],
    },
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const sidebarContent = (
    <div className="flex-1 flex flex-col h-full bg-white border-r border-slate-200 overflow-y-auto justify-between">
      <div>
        {/* Mobile Drawer Header */}
        <div className="lg:hidden p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HIG Logo" className="h-7 w-auto rounded border border-brand-300" />
            <span className="font-extrabold text-sm text-slate-900">HIG CRM</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="py-4 px-3 space-y-5">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1 rounded-lg ${
                            isActive
                              ? 'text-brand-600 bg-white shadow-xs'
                              : 'text-slate-400 group-hover:text-brand-500'
                          } ${item.isAi ? 'text-brand-500 animate-pulse' : ''}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {item.isAi && (
                        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Workspace Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70">
        <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shrink-0">
            <Building className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">HIG Enterprise</h4>
            <p className="text-[10px] text-slate-500 font-medium truncate">Universal Workspace</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Slide-out */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative w-4/5 max-w-xs h-full bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
