import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  DollarSign,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function AnalyticsView() {
  const { kpis, deals } = useCrm();

  const monthlyRevenue = kpis?.monthlyRevenue || [
    { month: 'Apr', revenue: 42000, target: 40000 },
    { month: 'May', revenue: 68000, target: 55000 },
    { month: 'Jun', revenue: 95000, target: 80000 },
    { month: 'Jul', revenue: 130000, target: 110000 },
    { month: 'Aug', revenue: 175000, target: 150000 },
    { month: 'Sep (Forecast)', revenue: 220000, target: 180000 },
  ];

  const stageDistribution = kpis?.stageDistribution || [
    { stage: 'New Inbound', count: 4, value: 35000 },
    { stage: 'Discovery', count: 3, value: 36000 },
    { stage: 'Proposal Sent', count: 2, value: 120000 },
    { stage: 'Negotiation', count: 1, value: 84000 },
    { stage: 'Closed Won', count: 2, value: 175000 },
  ];

  const leadSources = kpis?.leadSources || [
    { name: 'Website Demo Request', count: 7, color: '#38b6ff' },
    { name: 'WhatsApp Inbound', count: 5, color: '#10b981' },
    { name: 'LinkedIn Ads', count: 4, color: '#6366f1' },
    { name: 'Referral / Direct', count: 3, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-white">Reporting & Revenue Analytics</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Real-time Telemetry
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Comprehensive business intelligence across pipeline conversion, win/loss rates & lead sources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Stage Distribution */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-400" />
            <span>Pipeline Value by Stage</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38b6ff', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Pipeline Value']}
                />
                <Bar dataKey="value" fill="#38b6ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Breakdown Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            <span>Lead Acquisition Attribution</span>
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38b6ff', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val, name, entry) => [`${val} Leads (${entry.payload.name})`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {leadSources.map((src) => (
              <div key={src.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }}></span>
                <span className="text-slate-300 truncate">{src.name}:</span>
                <span className="font-bold text-white">{src.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
