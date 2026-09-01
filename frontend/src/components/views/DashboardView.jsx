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
  MessageSquare,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function DashboardView() {
  const { kpis, deals, leads, activities, setActiveTab, openCustomer360, setIsAddDealModalOpen } = useCrm();

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
    <div className="space-y-6 pb-12">
      {/* AI Daily Executive Briefing Hero Card */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-400/40 bg-gradient-to-r from-navy-900 via-slate-900 to-slate-950 p-6 shadow-glow">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/40 text-brand-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-400" />
              <span>HIG AI Autonomous Intelligence Active</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Good morning, <span className="text-gradient">Ajai</span>
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Your sales velocity is up <strong className="text-emerald-400">+28%</strong> this month. There are{' '}
              <strong className="text-brand-300">{hotDeals.length} high-probability enterprise deals</strong> ready for closing signature.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ai_analyst')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-brand-400/30 text-xs font-semibold text-brand-300 flex items-center gap-2 shadow-sm transition-all"
            >
              <Zap className="w-4 h-4 text-brand-400" />
              <span>Ask AI Analyst</span>
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-glow transition-all"
            >
              <span>View Deal Kanban</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pipeline Value */}
        <div className="glass-panel p-5 rounded-xl relative group hover:border-brand-400/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Pipeline</span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Closed Won Revenue */}
        <div className="glass-panel p-5 rounded-xl relative group hover:border-brand-400/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Closed Won Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            ${wonValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Target exceeded by $25k</span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="glass-panel p-5 rounded-xl relative group hover:border-brand-400/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Win Rate</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            {winRate}%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-brand-300 font-medium">
            <span>Industry benchmark: 34%</span>
          </div>
        </div>

        {/* High-Intent Leads */}
        <div className="glass-panel p-5 rounded-xl relative group hover:border-brand-400/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Leads</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            {totalLeads} Leads
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-medium">
            <Flame className="w-3.5 h-3.5" />
            <span>3 High-intent AI flagged</span>
          </div>
        </div>
      </div>

      {/* Main Revenue Chart & Stage Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Velocity Chart (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Revenue Growth & AI Forecast</h2>
              <p className="text-xs text-slate-400">Monthly actual vs target pipeline projections</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-brand-400">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400"></span> Actual
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> Target
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="brandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38b6ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38b6ff" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#38b6ff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38b6ff"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#brandGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#64748b"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hot Opportunities Radar (1 col) */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Hot Opportunities</span>
              </h2>
              <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Top Priority
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Highest AI win rate & deal size</p>

            <div className="space-y-2.5">
              {hotDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  onClick={() => setActiveTab('deals')}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-400/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-brand-300 transition-colors">
                      {deal.title}
                    </span>
                    <span className="font-extrabold text-emerald-400">
                      ${Number(deal.value).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{deal.companyName}</span>
                    <span className="text-brand-400 font-semibold">{deal.aiWinProbability}% Win Prob</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('deals')}
            className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1 transition-all border border-slate-700"
          >
            <span>Open Kanban Board</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Action-Required Alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Risk & Bottleneck Radar */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>AI Risk Alerts & Stalled Deals</span>
            </h2>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              Needs Action
            </span>
          </div>

          <div className="space-y-3">
            {stalledDeals.map((deal) => (
              <div key={deal.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{deal.title}</span>
                  <span className="text-xs font-extrabold text-slate-300">
                    ${Number(deal.value).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-rose-300 bg-rose-950/40 p-2 rounded-lg border border-rose-800/30">
                  ⚠️ {deal.aiRiskAlert || 'No activity detected in the last 7 days.'}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">{deal.contactName}</span>
                  <button
                    onClick={() => setActiveTab('communications')}
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <span>Draft WhatsApp/Email</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Omnichannel Relationship Timeline */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-400" />
              <span>Omnichannel Activity Feed</span>
            </h2>
            <button
              onClick={() => setActiveTab('communications')}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
            >
              View Inbox
            </button>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 3).map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-400"></span>
                    {act.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{act.content}</p>
                <div className="text-[10px] text-brand-400 font-medium uppercase tracking-wider">
                  Channel: {act.metadata?.channel || act.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
