import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  DollarSign,
  TrendingUp,
  UserPlus,
  Flame,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DashboardView() {
  const { kpis, deals, leads, activities, setActiveTab, setIsAddDealModalOpen } = useCrm();

  const totalPipelineValue = kpis?.summary?.totalPipelineValue || 315000;
  const wonValue = kpis?.summary?.wonValue || 175000;
  const winRate = kpis?.summary?.winRate || 68;
  const totalLeads = kpis?.summary?.totalLeads || leads.length;

  const hotDeals = deals.filter((d) => d.status === 'open' && (d.aiWinProbability >= 70 || d.value >= 50000));
  const stalledDeals = deals.filter((d) => d.stageId === 'stg_proposal' || d.aiRiskAlert?.includes('Risk') || d.aiRiskAlert?.includes('Action'));

  const monthlyRevenue = kpis?.monthlyRevenue || [
    { month: 'Apr', revenue: 42000, target: 40000 },
    { month: 'May', revenue: 68000, target: 55000 },
    { month: 'Jun', revenue: 95000, target: 80000 },
    { month: 'Jul', revenue: 130000, target: 110000 },
    { month: 'Aug', revenue: 175000, target: 150000 },
    { month: 'Sep (Forecast)', revenue: 220000, target: 180000 },
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* AI Daily Executive Briefing Hero Card (Pure White & Sky Blue) */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-white p-5 sm:p-6 shadow-card">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 w-60 h-60 rounded-full bg-brand-100/60 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              <span>HIG AI Autonomous Intelligence Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, <span className="text-gradient">Ajai</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Sales velocity is up <strong className="text-emerald-600 font-bold">+28%</strong> this month. There are{' '}
              <strong className="text-brand-600 font-bold">{hotDeals.length} high-probability enterprise deals</strong> ready for closing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('ai_analyst')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-xs font-bold text-brand-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-brand-500" />
              <span>Ask AI Analyst</span>
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-glow transition-all"
            >
              <span>View Deal Kanban</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Pipeline Value */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-brand-300 transition-all shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Pipeline</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Closed Won Revenue */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-brand-300 transition-all shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Closed Won Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
            ${wonValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Target exceeded by $25k</span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-brand-300 transition-all shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Win Rate</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
            {winRate}%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-brand-600 font-semibold">
            <span>Industry average: 34%</span>
          </div>
        </div>

        {/* Active Leads */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-brand-300 transition-all shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Leads</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
            {totalLeads} Leads
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-600 font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>3 High-intent AI flagged</span>
          </div>
        </div>
      </div>

      {/* Main Revenue Chart & Stage Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Velocity Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Revenue Growth & AI Forecast</h2>
              <p className="text-xs text-slate-500">Monthly actual vs target pipeline projections</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-brand-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38b6ff]"></span> Actual
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Target
              </span>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="brandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38b6ff" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#38b6ff" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#38b6ff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -2px rgba(56, 182, 255, 0.2)',
                    fontSize: '12px',
                    color: '#0f172a'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#brandGradient)" />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hot Opportunities Radar */}
        <div className="glass-panel p-5 rounded-2xl space-y-3.5 flex flex-col justify-between shadow-card">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Hot Opportunities</span>
              </h2>
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Top Priority
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2.5">Highest AI win rate & deal size</p>

            <div className="space-y-2">
              {hotDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => setActiveTab('deals')}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50/70 border border-slate-200 hover:border-brand-300 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors truncate">
                      {deal.title}
                    </span>
                    <span className="font-black text-emerald-600 font-mono shrink-0">
                      ${Number(deal.value).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate">{deal.companyName}</span>
                    <span className="text-brand-600 font-bold shrink-0">{deal.aiWinProbability}% Win</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('deals')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition-all border border-slate-200"
          >
            <span>Open Kanban Board</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action-Required Alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Deal Risk Radar */}
        <div className="glass-panel p-5 rounded-2xl space-y-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>AI Risk Alerts & Stalled Deals</span>
            </h2>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Needs Action
            </span>
          </div>

          <div className="space-y-2.5">
            {stalledDeals.map((deal) => (
              <div key={deal.id} className="p-3 rounded-xl bg-rose-50/50 border border-rose-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">{deal.title}</span>
                  <span className="text-xs font-extrabold text-slate-700 font-mono shrink-0">
                    ${Number(deal.value).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-rose-700 bg-white p-2 rounded-lg border border-rose-200 font-medium">
                  ⚠️ {deal.aiRiskAlert || 'No activity detected in the last 7 days.'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Omnichannel Activity Timeline */}
        <div className="glass-panel p-5 rounded-2xl space-y-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-500" />
              <span>Omnichannel Activity Feed</span>
            </h2>
            <button
              onClick={() => setActiveTab('communications')}
              className="text-xs text-brand-600 hover:underline font-bold"
            >
              View Inbox
            </button>
          </div>

          <div className="space-y-2.5">
            {activities.slice(0, 3).map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#38b6ff] shrink-0"></span>
                    <span className="truncate">{act.title}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{act.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
